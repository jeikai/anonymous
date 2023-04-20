import React, { useRef, useState } from 'react'
import ChatInput from '../Chat/ChatInput/ChatInput'
import '../Chat/ChatContainer/ChatContainer.scss'
import { IoMdSend } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const API_KEY = "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";
const systemMessage = {
  "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}

export default function ChatContainer() {
  const scrollRef = useRef();
  const navigate = useNavigate()
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
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
    setIsTyping(false)
    });
  }

  const handleChange = (e) => {
    setInput(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    handleSend(input)
    if ( input.length > 0) {
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
