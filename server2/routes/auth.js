import { Router } from "express"; 
import { use } from "passport";
import { validate } from "uuid";
import authenticate from "../middleware/auth";
const { OAuth2Client } = require("google-auth-library");
import User from "../models/user";
const router = Router();

const CLIENT_ID =
  "184015328165-dindbo15qghjuurut7bou2t65ioi9itu.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

function verify(token) {
  return client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then((ticket) => ticket.getPayload());
}

function getOrCreateGoogleUser(user) {
  // the "sub" field means "subject", which is a unique identifier for each user
  return User.findOne({ googleId: user.sub,email:user.email }).then((existingUser) => {
    if (existingUser) {
      existingUser.getJwtToken();
      return existingUser;
    }

    const newUser = new User({
      fullname: user.name,
      email: user.email,
      googleId: user.sub,
      avatar:user.picture
    });

    newUser.getJwtToken();

    return newUser.save();
  });
}

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    return next({
      message: "Please Provide email and password",
      statusCode: 400,
    });

  let user = await User.findOne({ email: username });
  user = user ? user : await User.findOne({ username });
  console.log(user);
  const match = user ? await user.checkPassword(password) : false;

  if (!user || !match) {
    return next({
      message: "The email and password don't match",
      statusCode: 400,
    });
  }

  user.getJwtToken();
  res.status(200).json({ success: true, user });
});

router.post("/register", async (req, res, next) => {
  try {
    const { fullname, username, password, email } = req.body;
    console.log(fullname, username, password, email);
    const user = User({ fullname, username, password, email });

    user.save((err) => {
      if (err) next(err);
      else {
        user.getJwtToken();

        res.status(200).json({ success: true, user });
      }
    });
  } catch (err) {
    next({ statusCode: 400, message: "something went wrong" });
  }
});

router.post("/googleAuth", async (req, res, next) => {
  try {
    const { token } = req.body;
    verify(token).then((user) => {
      console.log(user);
      getOrCreateGoogleUser(user).then((user) => {
        res.send(user);
      });
    });
  } catch (err) {
    next({ statusCode: 400, message: "something went wrong" });
  }
});

router.post('/updateUser', authenticate, async (req, res, next) => {
  try {
    const {updatedUser} = req.body;
    const {username,email,team,role,info} = updatedUser;
    //TODO check for username and team

    const exsistUser = await User.findOne({ username })
    if (exsistUser && username!=exsistUser.username) return res.status(403).json({ message: 'username taken' })


    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'user not found' });

    user.username = username || user.username;
    user.team = team || user.team;
    user.role = role || user.role;
    user.info = info || user.info;
    
    await user.save();

    return res.status(200).json({ success: true, user });

  } catch (err) {
    next({ statusCode: 400, message: "something went wrong" });
  }
})

export default router;
