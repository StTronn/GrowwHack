import React from "react";
import Room from "./pages/Room";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import JoinRoom from "./pages/JoinRoom";
import NavBar from "./components/NavBar";
import ProjectRoom from "./pages/ProjectRoom";
import Books from "./pages/Books";
import UpdateUser from "./pages/UpdateUser";
import Landing from "./pages/Landing";
import WebTeam from "./pages/WebTeam";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div>
          <Switch>
            <Route path="/room">
              <Room />
            </Route>
            <Route path="/join">
              <JoinRoom />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/updateUser">
              <UpdateUser />
            </Route>
            <Route path="/web">
              <WebTeam />
            </Route>
            <Route path="/books">
              <Books />
            </Route>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
