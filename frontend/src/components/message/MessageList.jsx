import React from "react";
import "../message/MessageList.css"
export default function MessageList() {
  return (
    <div className="msg-box">
      <div className="msger-detail">
        <p>Mahesh ray</p>
        {/* <p>gmail</p> */}
      </div>
      <p className="msg">my message</p>
    </div>
  );
}
