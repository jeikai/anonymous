import { Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './login/Login';
import Logup from './login/Logup';
import Fill_Post from './login/Fill_Post';
import Home from './main/body/Home/Home';
import { useState } from 'react';
import Header from './main/header/Header';
import ChatBox from './main/body/Chat/Chatbox';
import About_us from './main/body/About_us/About_us';
function App() {
  const [login, setLogin] = useState({
    user: localStorage.getItem('user')
  })
  console.log(JSON.parse(login.user))
  const [active, setActive] = useState(false);
  let upDateMyContainerActive = (my_active) => {
    setActive(my_active);
  }
  return (
    <>
      {JSON.parse(login.user) == null ?
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/logup' element={<Logup />} />
          <Route path='/fill' element={<Fill_Post/>}></Route>
        </Routes>
        :
        <>
          <Header myActive={active} updateActive={upDateMyContainerActive} />
          <div className={active ? 'my-container mainBodyActive' : 'my-container'} id="light">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/about_us' element={<About_us />} />
              <Route path='/message' element={<ChatBox />} />
            </Routes>
          </div>
        </>
      }
    </>
  );
}

export default App;
