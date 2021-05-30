import React from "react";

import "./card.css";

const Card = ({ img, name, pos, username, info }) => {
  return (
    <div className="card">
      <div
        className="cardImg"
        style={{
          background:
            `url(${img})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="cardDesc">
        <span className="cardTitle">{name}</span>
        <br />
        <span className="cardAlbum">{username}</span>
        <br />
        <span className="cardAlbum">{pos}</span>
        <br />
        <span className="cardAlbuminfo">{info}</span>
      </div>
    </div>
  );
};

export default Card;
