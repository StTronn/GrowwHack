import React, { useContext } from 'react';
import { User } from "../../context/user";
import GoogleLogin from 'react-google-login';
import { URL } from "../../utils/Routes";
import axios from "axios";

const clientID = '184015328165-dindbo15qghjuurut7bou2t65ioi9itu.apps.googleusercontent.com';


const GoogleAuth = () => {

  const { user, dispatch } = useContext(User);

  const responseGoogle = async (res) => {
    const userToken = res.tokenObj.id_token;
    console.log(userToken);
    axios.post(URL + "/auth/googleAuth", { token: userToken }).then((user) => {
      console.log(user.data);
      dispatch({ type: "SET_USER", payload: user.data });
      user.data.role === "" ? window.location.href = "/updateuser" : window.location.href = "/";

    });

  }

  return (
    <div className="App">
      <GoogleLogin
        clientId={clientID}
        buttonText="Login or Sign Up With Google"
        onSuccess={responseGoogle}
        onFailure={() => { }}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default GoogleAuth;
