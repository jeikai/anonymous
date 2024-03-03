import React from 'react'
import '../Chat/ChatBox.css'
import ChatContainer from './ChatContainer'
export default function AI() {
  return (
    <div className='chat_container'>
       <div className="contact_container">
        <div className="brand">
          <img src="./assets/images/logo.png" />
          <h4>Anonymous</h4>
        </div>
        <div className="contacts">
          <div className='AI'>AI</div>
        </div>
        <div className="current-user">
          <div className="username"> 
            <h2>Our assistant</h2>
          </div>
        </div>
      </div>
        <ChatContainer/>
    </div>
  )
}
