import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from '../utils/APIRoutes';
import PasswordStrength from './PasswordStrength';

function Logup() {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const [values, setValues] = useState({
        userName: "",
        repass: "",
        age: 0,
        gender: 1,
        avatarImage: "default.jpg",
    })
    const handleChange = (event, a) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        if (a) {
            setPassword(event.target.value)
        }
    }
    const handleValidation = () => {
        const { password, repass, userName, age, gender, avatarImage } = values;
        if (password != repass) {
            toast.error(
                "Mật khẩu không khớp",
                toastOptions
            );
            return false
        } else if (userName.length < 3) {
            toast.error(
                "Tên người dùng quá ngắn",
                toastOptions
            );
            return false;
        } else if (password.length < 6) {
            toast.error(
                "Độ dài mật khẩu phải lớn hơn hoặc bằng 6 kí tự",
                toastOptions
            );
            return false;
        } else if (age < 18) {
            toast.error(
                "Tuổi của bạn phải lớn hơn 18",
                toastOptions
            );
            return false;
        } else if (avatarImage.substr(-3).toLowerCase() != "jpg" && avatarImage.substr(-3).toLowerCase() != "png") {
            toast.error(
                "Sai định dạng ảnh",
                toastOptions
            );
            return false;
        }

        return true;
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (handleValidation()) {
            const { password, repass, userName, age, gender, avatarImage } = values;
            //call API
            const { data } = await axios.post(registerRoute, {
                userName,
                password,
                age,
                gender,
                avatarImage
            })
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            } else if (data.status === true) {
                navigate("/login")
            }
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
                            <Link className='log_up' to='/login'><i class="fa-solid fa-arrow-left"></i></Link>
                        </div>
                        <div className='group'>
                            <i className='fa-regular fa-user'></i>
                            <input type='text' placeholder=''
                                id='name'
                                name='userName'
                                autoComplete='off'
                                onChange={(e) => handleChange(e, false)}></input>
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
                                onChange={(e) => handleChange(e, true)}
                            ></input>
                            <label for='password'>
                                Password
                            </label>
                        </div>
                        <PasswordStrength password={password} />
                        <div className='group '>
                            <i class="fa-solid fa-repeat"></i>
                            <input type='password'
                                name='repass'
                                id='password'
                                autoComplete='off'
                                placeholder=''
                                onChange={(e) => handleChange(e, false)}></input>
                            <label for='password'>
                                Repeat your password
                            </label>
                        </div>
                        <div className='group '>
                            <i class="fa-solid fa-cake-candles"></i>
                            <input type='number'
                                name='age'
                                id='age'
                                autoComplete='off'
                                placeholder=''
                                onChange={(e) => handleChange(e, false)}></input>
                            <label for='age'>
                                Age
                            </label>
                        </div>
                        <div className='group '>
                            <i class="fa-solid fa-venus-mars"></i>
                            <select name="gender" id="gender" onChange={(e) => handleChange(e, false)}>
                                <option value="1" selected>Male</option>
                                <option value="0" >Female</option>
                            </select>
                            <label >
                                Gender
                            </label>
                        </div>
                        <div className='group'>
                            <i class="fa-solid fa-image"></i>
                            <input type='file' name='avatarImage' onChange={(e) => handleChange(e, false)}></input>
                            <label>
                                Your avatar
                            </label>
                        </div>

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
