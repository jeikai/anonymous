import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { loginRoute } from '../utils/APIRoutes';
function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        console.log(values)

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        navigate("/");
        window.location.reload();
      }
    }
  };
  return (
    <>
      <div className='loginContainer'>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
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
                id='username'
                name="username"
                autoComplete='off'
                onChange={(e) => handleChange(e)}></input>
              <label for='name'>
                UserName
              </label>
            </div>
            <div className='group'>
              <i className='fa-solid fa-lock'></i>
              <input type='password'
                id='password'
                name='password'
                autoComplete='off'
                placeholder=''
                onChange={(e) => handleChange(e)}></input>
              <label for='password'>
                Password
              </label>
            </div>
            <div className='group'>
              <Link className='log_up' to={`/Logup`}>Don't have an account ?</Link>
            </div>
            <div className='loginBtn'>
              <button type='submit'>
                <i className='fa-solid fa-arrow-right'></i>
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
