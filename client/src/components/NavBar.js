import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { MdAccountCircle, MdExitToApp } from 'react-icons/md'
// import dropdownMenu from 'react-bootstrap/Dropdown'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Divider } from "@material-ui/core";
import UpdateIcon from '@material-ui/icons/Update';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { withStyles } from '@material-ui/core/styles';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    backgroundColor: "#151515",
    color: "white"
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: "#737e86",
      color: "white",
      '& .MuiMenu-paper': {
        // backgroundColor: "black"
      },
    },
    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
      color: theme.palette.common.white,
    },
  },
}))(MenuItem);

const NavBar = () => {
  const userProfile = JSON.parse(localStorage.getItem('user'));
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const history = useHistory();
  const logOutAccount = () => {
    localStorage.clear("token");
    window.location.href = "/signin";
  };

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const moveToSignInPage = () => {
    history.push("/signin")
  }
  const updateUserInfo = () => {
    history.push("/updateuser")
  }

  return (
    <div className="fixed bg-transparent py-4 z-50" style={{ width: "100vw" }}>
      <div className="grid text-base font-semibold text-white  justify-items-end px-8 ">
        <div className="grid w-auto grid-flow-col gap-x-4 ">
          <Link to="/area120">
            <span className="cursor-pointer"> Area120</span>
          </Link>
          <Link to="/web">
            <span className="cursor-pointer"> Web</span>
          </Link>
          <Link to="/app">
            <span className="cursor-pointer"> App</span>
          </Link>
          <Link to="/dev">
            <span className="cursor-pointer"> Dev</span>
          </Link>
          <Link to="/">
            <span className="cursor-pointer"> Home</span>
          </Link>

          {userProfile == null ? <span className="cursor-pointer" onClick={moveToSignInPage}> Sign In </span> :
            <img src={userProfile.avatar} style={{ width: "25px", borderRadius: "50%" }} onClick={openMenu} />}
          <StyledMenu
            id="simple-menu"
            anchorEl={anchorEl}
            style={{ top: "10px", left: "-12px", padding: "0px" }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem
              // style={{ background: "#1db954", color: "white", height: "50px", width: "200px" }}
              onClick={handleClose}>
              <PermIdentityIcon style={{ margin: "0px 10px 0px 10px" }} />
              {userProfile == null ? "Not logged In" : userProfile.fullname}
              <br />
              {userProfile == null ? "Not logged In" : userProfile.email}
            </StyledMenuItem>

            <StyledMenuItem
              // style={{ background: "#1db954", color: "white", height: "50px" }}
              onClick={updateUserInfo}>
              <UpdateIcon style={{ margin: "0px 10px 0px 10px" }} />
                            Update Info
              </StyledMenuItem>

            <StyledMenuItem
              // style={{ background: "#1db954", color: "white", height: "50px" }}
              onClick={logOutAccount}>
              <ExitToAppIcon style={{ margin: "0px 12px 0px 10px" }} />
              Logout
              </StyledMenuItem>

          </StyledMenu>

        </div>
      </div>
    </div>
  );
};

export default NavBar;
