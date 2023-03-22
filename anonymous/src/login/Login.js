import './login.css';
import { Link, NavLink } from 'react-router-dom';
import React from "react";
function Login() {

  return (
    <> 
      <form>
        <div className='loginContainer'>
          <div className='logo'>
            <img src='./assets/images/logo.png' />
          </div>
          <div className='form'>
            <div className='group'>
              <h1>Anonymous</h1>
            </div>
            <div className='group'>
              <i className='fa-regular fa-user'></i>
              <input type='text' placeholder=''
                id='name'
                autoComplete='off'
                ></input>
              <label for='name'>
                UserName
              </label>
            </div>
            <div className='group'>
              <i className='fa-solid fa-lock'></i>
              <input type='password'
                id='password'
                autoComplete='off'
                placeholder=''
                ></input>
              <label for='password'>
                Password
              </label>
            </div>
            <div className='group'>
              <Link className='log_up' to={`Logup`}>Don't have an account ?</Link>
            </div>
            <div className='loginBtn'>
                <button>
                  <i className='fa-solid fa-arrow-right'></i>
                </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
