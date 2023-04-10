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
    const [upload, setUpload] = useState("")
    const [values, setValues] = useState({
        userName: "",
        repass: "",
        age: 0,
        gender: 1,
        avatarImage: "default.jpg",
    })
    const handleChange = (event, a) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        if (a == "pass") {
            setPassword(event.target.value)
        } else if ( a == "file") {
            setUpload(event.target.value)
            setValues({ ...values, [event.target.name]: event.target.files[0] });
        }
        console.log(values)
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
        } 
        else if (upload.substr(-3).toLowerCase() != "jpg" && upload.substr(-3).toLowerCase() != "png") {
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

            const formData = new FormData()
            formData.append("userName", values.userName)
            formData.append("password", values.password)
            formData.append("age", values.age)
            formData.append("gender", values.gender)
            formData.append("avatarImage", values.avatarImage)
            formData.append("upload", upload)
            //call API
            const { data } = await axios.post(registerRoute, formData)
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            } else if (data.status === true) {
                setTimeout( navigate("/login"), 2000)           
            }
        }
    }

    return (
        <>
            <div className='loginContainer'>
                <form onSubmit={(event) => handleSubmit(event)} encType='multipart/form-data'>
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
                                onChange={(e) => handleChange(e, "name")}></input>
                            <label for='name'>
                                Tên người dùng
                            </label>
                        </div>
                        <div className='group'>
                            <i className='fa-solid fa-lock'></i>
                            <input type='password'
                                id='password'
                                name='password'
                                autoComplete='off'
                                placeholder=''
                                onChange={(e) => handleChange(e, "pass")}
                            ></input>
                            <label for='password'>
                                Mật khẩu
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
                                onChange={(e) => handleChange(e, "repass")}></input>
                            <label for='password'>
                                Lặp lại mật khẩu
                            </label>
                        </div>
                        <div className='group '>
                            <i class="fa-solid fa-cake-candles"></i>
                            <input type='number'
                                name='age'
                                id='age'
                                autoComplete='off'
                                placeholder=''
                                onChange={(e) => handleChange(e, "age")}></input>
                            <label for='age'>
                                Tuổi
                            </label>
                        </div>
                        <div className='group '>
                            <i class="fa-solid fa-venus-mars"></i>
                            <select name="gender" id="gender" onChange={(e) => handleChange(e, "gender")}>
                                <option value="1" selected>Male</option>
                                <option value="0" >Female</option>
                            </select>
                            <label >
                                Giới tính
                            </label>
                        </div>
                        <div className='group'>
                            <i class="fa-solid fa-image"></i>
                            <input type='file' name='avatarImage' onChange={(e) => handleChange(e, "file")}></input>
                            <label>
                                Ảnh đại diện
                            </label>
                        </div>

                        <div className='loginBtn'>
                            <button type='submit'>
                                Bắt đầu
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