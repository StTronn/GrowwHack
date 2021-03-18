import React from "react";
import { FaUserFriends } from "react-icons/fa";

import { Link } from "react-router-dom";
import styled from "styled-components";

import backgroundImage from "../back2.jpg"

// const MessageCointainer = styled.div`
//   height: 140px;
//   display: grid;
//   justify-items: center;
//   align-items: center;
// `;

const RoomCard = ({ roomObj }) => {

  if (roomObj) {
    const { users, id } = roomObj;

    return (
      <div className="rounded-t-md">
        <Link to={`room?id=${id}`}>
          <RoomCointainer background={backgroundImage}>
            <div className="pt-4 px-4 w-full h-full text-sp-green opacity-0 hover:opacity-100 transition-opacity">
              <InfoCointaiers>
                {" "}
                <FaUserFriends className="inline mr-1 text-sp-green" /> {users.length} Members
                <br />
              </InfoCointaiers>
            </div>
          </RoomCointainer>
        </Link>
      </div>
    );
  }

  return <RoomCointainer />;
};

const RoomCointainer = styled.div`
  background-color: red;
  height: 140px;
  width: 270px;
  background-image: ${(props) => `url(${props.background || backgroundImage});`};
  background-size: cover;
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
`;

const InfoCointaiers = ({ children }) => (
  <div className=" text-gray-400 pt-16 text-sm text-semibold sm:mt-5  sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
    {children}
  </div>
);

export default RoomCard;