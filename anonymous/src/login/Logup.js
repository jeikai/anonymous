import './login.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from '../utils/APIRoutes';
function Logup() {
    // let password = document.getElementById('password');
    // let power = document.getElementById('power-point');

    // password.oninput = function () {
    //     // ám chỉ độ bảo mật của mật khẩu
    //     let point = 0;
    //     // nội dung người dung đang nhập
    //     let value = password.value;
    //     let widthPower = ['1%', '25%', '50%', '75%', '100%'];
    //     let colorPower = ['red', 'red', 'orange', 'yellow', 'green'];
    //     let array = [
    //         /[0-9]/,
    //         /[a-z]/,
    //         /[A-Z]/,
    //         /[^0-9a-zA-Z]/
    //     ];
    //     if (value.length >= 6) {
    //         array.forEach(item => {
    //             if (item.test(value)) {
    //                 point += 1
    //             }
    //         })
    //     }
    //     power.style.width = widthPower[point];
    //     power.style.backgroundColor = colorPower[point];
    // }


    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const [values, setValues] = useState({
        userName: "",
        password: "",
        repass: ""
    })
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }
    const handleValidation = () => {
        const { password, repass, userName } = values;
        if (password != repass) {
            toast.error(
                "Password and confirm password should be same.",
                toastOptions
            );
            return false
        }else if (userName.length < 3) {
            toast.error(
              "Username should be greater than 3 characters.",
              toastOptions
            );
            return false;
          } else if (password.length < 8) {
            toast.error(
              "Password should be equal or greater than 8 characters.",
              toastOptions
            );
            return false;
          }
      
          return true;
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (handleValidation() ) {
            const { password, repass, userName } = values;
            //call API
            const {data} = await axios.post(registerRoute, {
                userName,
                password
            })
        }
    }

    return (
        <>
            <div className='loginContainer'>
                <form onSubmit={(event) => handleSubmit(event)}>
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
                                name='userName'
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
                                onChange={(e) => handleChange(e)}
                            ></input>
                            <label for='password'>
                                Password
                            </label>
                        </div>
                        <div className='group'>
                            <label for="">Power password</label>
                            <div className="power-container">
                                <div id="power-point">

                                </div>
                            </div>
                        </div>
                        <div className='group '>
                            <i className='fa-solid fa-lock'></i>
                            <input type='password'
                                name='repass'
                                id='password'
                                autoComplete='off'
                                placeholder=''
                                onChange={(e) => handleChange(e)}></input>
                            <label for='password'>
                                Repeat your password
                            </label>
                        </div>

                        <Link className='log_up' to='/'><i class="fa-solid fa-arrow-left"></i></Link>

                        <div className='loginBtn'>
                            <button type='submit'>
                                GET START
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    );

}

export default Logup;
