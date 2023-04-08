import React, { useState } from "react";
import "./ChatInput.scss"
import { IoMdSend } from "react-icons/io";

export default function ChatInput({ handleSendMsg }) {
    const [msg, setMsg] = useState("");
    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
          handleSendMsg(msg);
          setMsg("");
        }
      };
    return (
        <div className="input_container">
            <div className="button-container">
                <div className="emoji">
                   
                </div>
            </div>

            <form className="form_container" onSubmit={(event) => sendChat(event)}>
                <input type="text" placeholder="Nhắn tin..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}></input>
                <button className="submit">
                    <IoMdSend></IoMdSend>
                </button>
            </form>
        </div>
    )
}