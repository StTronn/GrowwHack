import React, { useState, useEffect } from "react";
import InviteModal from "../../components/InviteModal";
import authRequest from "../../utils/authRequest";
import DeleteRoom from "./DeleteRoom";
import LeaveRoom from "./LeaveRoom";
import SetRoomMode from "./SetRoomMode";
import User from "./User";

const Lobby = ({ obj, isAdmin, belongsToRoom }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editLink, setEditLink] = useState(false);
  const [link, setLink] = useState("");
  useEffect(() => {
    if (obj) setLink(obj.link);
  }, []);

  const submit = async (e) => {
    if (e.keyCode === 13 && link && obj) {
      await authRequest("/room/update", { id: obj.id, link });
      setEditLink(false);
    }
  };

  return (
    <div className=" min-h-auto flex-1  p-4 mt-16 flex justify-center ">
      <div className=" w-full  md:max-w-4xl rounded shadow">
        <div className=" h-12   flex justify-between items-center border-b border-sp-green m-4 pb-2">
          <div>
            <div className="text-xl  font-bold text-white">Lobby</div>
          </div>
          {isAdmin && <SetRoomMode />}
        </div>
        <div className="px-6">
          {obj &&
            obj.users &&
            obj.users.map((e, i) => (
              <User user={e} isAdmin={isAdmin} key={i} admin={i == 0} />
            ))}
          <div className="flex bg-gray-200 justify-center items-center h-16 p-4 my-6  rounded  shadow-inner">
            <div className="flex items-center border border-gray-400 p-2 border-dashed rounded cursor-pointer">
              <div>
                <svg
                  className="text-gray-500 w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="{2}"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div
                className="ml-1 text-gray-500 font-medium"
                onClick={(e) => {
                  setIsOpen(true);
                }}
              >
                {" "}
                Invite a friend
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 ">
          {isAdmin && (
            <>
              {" "}
              {editLink && (
                <span className="flex items-center border-b border-sp-green py-2">
                  <input
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    onKeyDown={submit}
                    className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 text-base leading-tight focus:outline-none"
                    type="text"
                    placeholder="Enter room id"
                    aria-label="Full name"
                  />
                </span>
              )}
              <DeleteRoom id={obj.id} />
            </>
          )}
          {!isAdmin && belongsToRoom && <LeaveRoom id={obj.id} />}
        </div>
      </div>
      <InviteModal
        id={obj.id || ""}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default Lobby;
