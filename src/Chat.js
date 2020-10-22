import React, { useState, useEffect } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Message from "./Message";
import { useSelector } from "react-redux"; //redux
import { selectChannelId, selectChannelName } from "./features/appSlice"; //redux
import { selectUser } from "./features/userSlice"; //redux
import db from "./firebase";
import firebase from "firebase";

function Chat() {
  const user = useSelector(selectUser); //redux
  const channelId = useSelector(selectChannelId); //redux
  const channelName = useSelector(selectChannelName); //redux
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input) {
      db.collection("channels").doc(channelId).collection("messages").add({
        message: input,
        user: user,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
    }
  };

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [channelId]);

  return (
    <div className="chat">
      <ChatHeader name={channelName} />

      <div className="chat__messages">
        {messages?.map((message) => (
          <Message
            id={message.id}
            timestamp={message.data.timestamp}
            message={message.data.message}
            user={message.data.user}
            channelId={channelId}
          />
        ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            value={input}
            disable={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <button
            type="submit"
            onClick={sendMessage}
            className="chat__inputButton"
          >
            Send Message
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
