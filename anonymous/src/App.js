import { Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './login/Login';
import Logup from './login/Logup';
import Home from './main/body/Home/Home';
import Setting from './main/body/Settings/Setting';
import ChatBox from './main/body/Chat/Chatbox';
import { useState } from 'react';
import Header from './main/header/Header';
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
          <Route exact path='/login' element={<Login />} />
          <Route path='/logup' element={<Logup />} />
        </Routes>
        :
        <>
          <Header myActive={active} updateActive={upDateMyContainerActive} />
          <div className={active ? 'my-container mainBodyActive' : 'my-container'} id="light">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/setting' element={<Setting />} />
              <Route path='/message' element={<ChatBox />} />
            </Routes>
          </div>
        </>
      }
    </>
  );
}

export default App;
