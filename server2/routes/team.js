import { Router } from "express";
import authenticate from "../middleware/auth";
import room from "../models/room";
import user from "../models/user";

import User from "../models/user";

const TEAMS = ['web', 'app', 'other']

const router = Router();


router.get("/get", authenticate, async (req, res, next) => {

  const team = req.query.team;
  console.log(req.query);

  if(!team || !TEAMS.includes(team))
    return next({ statusCode: 404, message: "Not a valid Team" });
  
  const users = await User.find({
    team,
  }) 
  if (users) return res.status(200).json(users);
  else return next({statusCode:404, message:"No users found for the Team"})
});

export default router;