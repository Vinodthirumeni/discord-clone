import React from "react";
import "./Message.css";
import { Avatar } from "@material-ui/core";
import db from "./firebase";

function Message({ id, channelId, timestamp, message, user }) {
  const MsgDelete = (e) => {
    db.collection("channels")
      .doc(channelId)
      .collection("messages")
      .doc(id)
      .delete();
  };
 
 // console.log("id",id)

// const deleteChat = (e) => {
//   e.preventDefault();
//   const chatId = e.target.id;
//   alert(chatId);
//   if (chatId) {
//     db.collection("rooms")
//       .doc(roomId)
//       .collection("messages")
//       .doc(chatId)
//       .delete();
//   }
// };


  return (
    <div className="message">
      <Avatar src={user?.photo} alt="#Avatar" />
      <div className="message__info">
        <h4>
          {user?.displayName}
          <span className="message__timestamp">
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </h4>
        <p>{message}</p>
      </div>
      <button onClick={MsgDelete}>DELETE</button>
    </div>
  );
}

export default Message;
