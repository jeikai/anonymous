import React, { useRef, useState } from 'react'
import ChatInput from '../Chat/ChatInput/ChatInput'
import '../Chat/ChatContainer/ChatContainer.scss'
import { IoMdSend } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { aiRoutes } from '../../../utils/APIRoutes';

const API_KEY = "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";
const systemMessage = {
  "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}

export default function ChatContainer() {
  const scrollRef = useRef();
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Anonymous! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [input, setInput] = useState("")
  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };
    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setIsTyping(true)
    await processMessageToChatGPT(newMessages);
  }

  async function processMessageToChatGPT(chatMessages) {
    const response = await axios.post(`${aiRoutes}`, { "prompt": chatMessages[chatMessages.length - 1].message })
    console.log(response)
    setMessages([...chatMessages, {
      message: response["data"],
      sender: "ChatGPT"
    }]);
    setIsTyping(false)
  }

  const handleChange = (e) => {
    setInput(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    handleSend(input)
    if (input.length > 0) {
      setInput("")
    }
  }
  return (
    <div className='chatcontainer'>
      <div className="chat-header">
        <div className="user-details">
          <div className="username">
            Anonymous
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => {
          return (
            <div ref={scrollRef} key={index}>
              <div className={`message ${message.sender == "user" ? "sended" : "recieved"}`}>
                <div className='content'>
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          )
        })}
        <div>
          {isTyping ? "Anonymous is typing..." : ""}
        </div>
      </div>

      <div className="input_container">
        <div className="button-container">
          <div className="emoji">

          </div>
        </div>

        <form className="form_container" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" placeholder="Nhắn tin..."
            value={input}
            onChange={(e) => handleChange(e)}></input>
          <button className="submit">
            <IoMdSend></IoMdSend>
          </button>
        </form>
      </div>
    </div>
  )
}
