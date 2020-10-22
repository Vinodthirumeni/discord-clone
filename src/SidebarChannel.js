import React from "react";
import "./SidebarChannel.css";
import { useDispatch } from "react-redux"; //redux
import { setChannelInfo } from "./features/appSlice"; //redux

function SidebarChannel({ id, channel }) {
  const dispatch = useDispatch(); //redux
  return (
    <div
      className="sidebarChannel"
      onClick={() =>
        dispatch(
          setChannelInfo({
            channelId: id,
            channelName: channel,
          })
        )
      } //redux
    >
      <h4>
        <span className="sidebarChannel__hash">#</span>
        {channel}
      </h4>
    </div>
  );
}

export default SidebarChannel;
