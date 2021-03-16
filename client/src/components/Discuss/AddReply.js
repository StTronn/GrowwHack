import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import authRequest from "../../utils/authRequest";

const AddReply = ({
  setShowAddReply,
  commentId,
  stateReplies,
  setStateReplies,
}) => {
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const AddReply = async () => {
    // commentId, user, text
    try {
      setLoading(true);
      const newReply = await authRequest("/comment/createReply", {
        commentId,
        text: reply,
      });
      const newReplies = [...stateReplies, newReply];
      setStateReplies(newReplies);
      setLoading(false);
      setReply("");
      setShowAddReply(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <span className="mt-2 flex items-center border-b border-sp-green py-2">
        <input
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          className="appearance-none bg-transparent border-none w-80 text-white mr-3 py-1  leading-tight focus:outline-none"
          type="text"
          placeholder="Add a Reply"
          aria-label="Full name"
        />
      </span>

      <div className=" w-full grid justify-items-end my-2 inline-flex rounded shadow">
        <div>
          <span
            onClick={() => setShowAddReply(false)}
            className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-semibold rounded-xs text-white  "
          >
            Cancel
          </span>
          <span
            onClick={() => {
              AddReply();
            }}
            className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-semibold rounded text-white bg-nt-gray hover:bg-nt-gray"
          >
            {loading ? <ClipLoader color="#1db954" size={20} /> : "Reply"}
          </span>
        </div>
      </div>
    </>
  );
};

export default AddReply;
