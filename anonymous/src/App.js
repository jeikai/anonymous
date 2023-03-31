import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './login/Login';
import Logup from './login/Logup';
import Header from './main/header/Header'
import Home from './main/body/Home/Home'
import Setting from './main/body/Settings/Setting';
import ChatBox from './main/body/Chat/Chatbox';


function App() {

  const [active, setActive] = useState(false);
  let upDateMyContainerActive = (my_active) => {
    setActive(my_active);
  }
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/logup' element={<Logup />} />
      </Routes>

        {/* <Header myActive={active} updateActive={upDateMyContainerActive} />
        <div className={active ? 'my-container mainBodyActive' : 'my-container'} id="light">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/setting' element={<Setting />} />
            <Route path='/message' element={<ChatBox />} />
          </Routes>
        </div> */}
    </>

  );
}

export default App;
