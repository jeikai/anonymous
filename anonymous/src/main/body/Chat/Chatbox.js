import './ChatBox.css'
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatContainer from './ChatContainer/ChatContainer';
import Welcome from './Welcome/Welcome';
import Contacts from './Contact/Contacts';
import axios from "axios";
import { allUsersRoute, host } from '../../../utils/APIRoutes';
import {io} from "socket.io-client"
function ChatBox() {
  const socket = useRef() 
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);


  //Lấy ra thông tin của người dùng hiện tại nếu ko có trong local Storage thì quay về login
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate("/login");
    } else {
      const user = JSON.parse(localStorage.getItem('user'))
      setCurrentUser(
        user
      );
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  //Lấy ra Contact theo Id của người dùng
  useEffect(() => {
    async function Data() {
      if (currentUser) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
        setContacts(data.data);
      }
    }
    Data()
  }, [currentUser]);
  console.log(contacts)

  return (
    <>
      <div className="chat_container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
        )}
      </div>
    </>
  )
}
export default ChatBox;