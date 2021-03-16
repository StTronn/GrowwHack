import React from "react";
import { FaUserFriends, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getPoster } from "../utils/Movie";
import { formatTime } from "../utils/room";
import {
  FlickingEvent,
  SelectEvent,
  ChangeEvent,
  NeedPanelEvent,
} from "@egjs/flicking";
import Flicking from "@egjs/react-flicking";

const backgroundUrl =
  "https://image.tmdb.org/t/p/w500//sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg";

const RoomCointainer = styled.div`
  background-color: red;
  height: 140px;
  width: 270px;
  background-image: ${(props) => `url(${props.background || backgroundUrl});`};
  background-size: cover;
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;

`;

const MessageCointainer = styled.div`
  height: 140px;
  display: grid;
  justify-items: center;
  align-items: center;
`;

export const Room = ({ roomObj }) => {
  if (roomObj) {
    const { movieObj, dateTime, users, id } = roomObj;
    return (
      <div className="rounded-t-md">
        <Link to={`room?id=${id}`}>
          <RoomCointainer background={getPoster(movieObj)}>
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

const Flick = ({ list }) => {
  return (
    <div className="px-8">
      {list && list.length !== 0 && (
        <FlickingConfig>
          {list && list.map((e) => <Room roomObj={e} key={e.id} />)}
        </FlickingConfig>
      )}

      {!list ||
        (list.length === 0 && (
          <MessageCointainer> Create or Join Rooms </MessageCointainer>
        ))}
    </div>
  );
};

const FlickingConfig = ({ children }) => {
  return (
    <Flicking
      tag="div"
      gap={20}
      viewportTag="div"
      cameraTag="div"
      onNeedPanel={(e) => { }}
      onMoveStart={(e) => { }}
      onMove={(e) => { }}
      onMoveEnd={(e) => { }}
      onHoldStart={(e) => { }}
      onHoldEnd={(e) => { }}
      onRestore={(e) => { }}
      onSelect={(e) => { }}
      onChange={(e) => { }}
      classPrefix="eg-flick"
      deceleration={0.0075}
      horizontal={true}
      circular={false}
      infinite={false}
      infiniteThreshold={0}
      lastIndex={Infinity}
      threshold={40}
      duration={100}
      panelEffect={(x) => 1 - Math.pow(1 - x, 3)}
      defaultIndex={0}
      inputType={["touch", "mouse"]}
      thresholdAngle={45}
      bounce={10}
      autoResize={false}
      adaptive={false}
      zIndex={2000}
      bound={true}
      overflow={false}
      hanger={"0%"}
      anchor={"50%"}
      moveType={{ type: "freeScroll" }}
      collectStatistics={true}
    >
      {children}
    </Flicking>
  );
};

const InfoCointaiers = ({ children }) => (
  <div className=" text-gray-400 pt-16 text-sm text-semibold sm:mt-5  sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
    {children}
  </div>
);
export default Flick;
