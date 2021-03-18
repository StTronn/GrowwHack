import React, { useState, useEffect } from "react";
import styled from "styled-components";

import authRequest from "../utils/authRequest";

import { FaUserFriends } from "react-icons/fa";
import backgroundImage from "../back2.jpg";


const RoomBanner = ({ obj }) => {
  const [teamName, setTeamName] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (obj) {
      if (obj.title) setTitle(obj.title);
      if (obj.teamName) setTeamName(obj.teamName);
      if (obj.desc) setDesc(obj.desc);
    }
  }, [obj]);

  useEffect(() => {
    //can we call it when the element is going out of focus
    const roomObj = { ...obj, teamName, title, desc, };
    updateRoom(roomObj)
  }, [teamName, title, desc, obj])


  const HandleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const imageUrl = backgroundImage;

  return (
    <Header imageUrl={imageUrl}>
      <BannerContents className="text-white px-4 md:px-16 ">
        <div className="mb-8">
          <TitleInput
            placeholder="Project Name"
            value={title}
            onChange={(e) => {
              HandleTitleChange(e);
            }}
          />
        </div>
        <div>
          <DescInput value={desc} onChange={(e) => { setDesc(e.target.value) }} placeholder="Project Description" />
          <DescInput value={teamName} onChange={(e) => { setTeamName(e.target.value) }} placeholder="Team Name" />
          <InfoCointaiers>
            <FaUserFriends className="inline mr-2" />
            {obj ? obj.users.length : 0} Members
              <br />
          </InfoCointaiers>
        </div>
      </BannerContents>
    </Header>
  );
};

const Header = ({ children, imageUrl }) => (
  <header
    className="object-contain bg-white white"
    style={{
      height: "70vh",
      color: "black",
      backgroundSize: "cover",
      backgroundImage: `url(
        ${imageUrl}
        )`,
      backgroundPosition: "center center",
    }}
  >
    {children}
  </header>
);

const BannerContents = styled.div`
  padding-top: 100px;
  height: 100%;
  z-index: 5;
  width: 100%;

  background: linear-gradient(
    to right,
    rgba(29, 185, 84,0.6) 0%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const TitleInput = (props) => (
  <input
    className="text-4xl bg-transparent tracking-tight font-extrabold text-white sm:text-5xl border-none focus:outline-none md:text-6xl max-w-full"
    {...props}
  />
);

const DescInput = (props) => (
  <div>
    <input
      className="text-base text-white text-semibold my-2 bg-transparent tracking-tight font-extrabold text-white border-none focus:outline-none max-w-full"
      {...props}
    />
  </div>
);


const InfoCointaiers = ({ children }) => (
  <div className=" text-white text-md text-semibold mt-16 sm:mx-auto lg:mx-0">
    {children}
  </div>
);

const updateRoom = async (roomObj) => {
  //prevent empty updates due to network or other issues
  //bug
  const retObj = { id: roomObj.id };

  //can we write a general method or eliminate the need
  if (roomObj.title) retObj.title = roomObj.title;
  if (roomObj.desc) retObj.desc = roomObj.desc;
  if (roomObj.teamName) retObj.teamName = roomObj.teamName;
  await authRequest("/room/update", retObj);
};

export default RoomBanner;
