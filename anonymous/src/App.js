import { Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './login/Login/Login';
import Logup from './login/Logup/Logup';
import Home from './main/body/Home/Home';
import { useState } from 'react';
import Header from './main/header/Header';
import ChatBox from './main/body/Chat/Chatbox';
import About_us from './main/body/About_us/About_us';
import Profile from './main/body/Profile/Profile';
import Search from './main/body/Search/Search';
import AI from './main/body/AI/AI';
import Bill from './main/body/Bill/Bill';
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
        </Routes>
        :
        <>
          <Header myActive={active} updateActive={upDateMyContainerActive} />
          <div className={active ? 'my-container mainBodyActive' : 'my-container'} id="light">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/ai' element={<AI />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/search' element={<Search />} />       
              <Route path='/bill' element={<Bill />} />       
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
