import './ChatContainer.scss'
import ChatInput from '../ChatInput/ChatInput'
import React, { useState, useEffect, useRef } from 'react'
import { sendMessageRoute, recieveMessageRoute } from '../../../../utils/APIRoutes'
import axios from "axios"
import { v4 as uuidv4 } from "uuid";
function ChatContainer({ currentChat, currentUser, socket }) {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();
    useEffect(() => {
        async function getData() {
            const data = await JSON.parse(
                localStorage.getItem("user")
            );
            const response = await axios.post(recieveMessageRoute, {
                from: data._id,
                to: currentChat._id,
            });
            setMessages(response.data);
        }
        getData()
    }, [currentChat]);

    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        })
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            msg,
        });
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    }
    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, []);
    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    return (
        <div className="chatcontainer">
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img src={"./assets/images/" + currentChat.avatarImage}></img>
                    </div>
                    <div className="username">
                        {currentChat.userName}
                    </div>
                </div>
            </div>
            <div className="chat-messages">
                {messages.map((message) => {
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div
                                className={`message ${message.fromSelf ? "sended" : "recieved"
                                    }`}
                            >
                                <div className="content ">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <ChatInput handleSendMsg={handleSendMsg}></ChatInput>
        </div>
    )
}
export default ChatContainer