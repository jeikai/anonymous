import './logup.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute, addPostRoute } from '../../utils/APIRoutes';

function Logup() {
    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const [uploadAva, setUploadAva] = useState("")
    const [uploadPost, setUploadPost] = useState("")
    const [values, setValues] = useState({
        userName: "",
        password: "",
        age: 0,
        gender: 1,
        avatarImage: "",
        title: "",
        favorite: "",
        description: "",
        postImage: "",
    })
    const handleChange = (event, a) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        if (a == "avatarImage") {
            setUploadAva(event.target.file[0])
        }
        else if (a == "postImage") {
            setUploadPost(event.target.file[0])
        }
        console.log(values)
    }
    const handleValidation = () => {
        const { password, repass, userName, age, title, favorite, description } = values;
        if (userName.length < 3) {
            toast.error(
                "Tên người dùng quá ngắn",
                toastOptions
            );
            return false;
        }
        else if (password != repass) {
            toast.error(
                "Mật khẩu không khớp",
                toastOptions
            );
            return false
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
        } else if ( title == "" || favorite == "" || description == "" ) {
            toast.error(
                "Không được để trống tiêu đề, sở thích hoặc mô tả bản thân bạn",
                toastOptions
            );
            return false;
        }
        return true;
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (handleValidation()) {

            const userData = new FormData()
            userData.append("userName", values.userName)
            userData.append("password", values.password)
            userData.append("age", values.age)
            userData.append("gender", values.gender)
            userData.append("avatarImage", values.avatarImage)
            userData.append("uploadAva", uploadAva)

            const postData = new FormData()
            postData.append("title", values.title)
            postData.append("userName", values.userName)
            postData.append("favorite", values.favorite)
            postData.append("description", values.description)
            postData.append("postImage", values.postImage)
            postData.append("uploadPost", uploadPost)
            //call API
            const { user } = await axios.post(registerRoute, userData)
            const { post } = await axios.post(addPostRoute, postData)
            if (user.status === false) {
                toast.error(user.msg, toastOptions);
            } else if (user.status === true) {
                setTimeout(navigate("/login"), 2000)
            }
        }
    }

    return (
        <>
            <div className="log_container">
                <Link className='log_up' to='/login'><i class="fa-solid fa-arrow-left"></i></Link>
                <h1 className="form-title">Anonymous</h1>
                <form onSubmit={(event) => handleSubmit(event)} encType='multipart/form-data'>
                    <div className="main-user-info">
                        <div className="user-input-box">
                            <label for="userName">Tên người dùng</label>
                            <input type="text"
                                id="userName"
                                name="userName"
                                placeholder="Enter Name"
                                onChange={(e) => handleChange(e, "userName")} />
                        </div>
                        <div className="user-input-box">
                            <label for="age">Tuổi</label>
                            <input type="number"
                                id="age"
                                name="age"
                                placeholder="Enter Age"
                                onChange={(e) => handleChange(e, "age")} />
                        </div>

                        <div className="user-input-box">
                            <label for="password">Mật khẩu</label>
                            <input type="password"
                                id="password"
                                name="password"
                                placeholder="Enter password"
                                onChange={(e) => handleChange(e, "password")} />
                        </div>
                        <div className="user-input-box">
                            <label for="repass">Nhập lại mật khẩu</label>
                            <input type="password"
                                id="repass"
                                name="repass"
                                placeholder="Enter password again"
                                onChange={(e) => handleChange(e, "repass")} />
                        </div>
                        <div className="user-input-box">
                            <label for="password">Giới tính</label>
                            <select name="gender" id="gender" onChange={(e) => handleChange(e, "gender")}>
                                <option value="1" selected>Male</option>
                                <option value="0" >Female</option>
                            </select>
                        </div>
                        <div className="user-input-box">
                            <label for="avatarImage">Ảnh đại diện của bạn</label>
                            <input type="file"
                                id="avatarImage"
                                name="avatarImage"
                                onChange={(e) => handleChange(e, "avatarImage")}
                                accept='image/png, image/jpeg, image/jpg'
                            />
                        </div>
                        <div className="user-input-box">
                            <label for="title">Tiêu đề bài đăng</label>
                            <input type="text"
                                id="title"
                                name="title"
                                placeholder="Enter title"
                                onChange={(e) => handleChange(e, "title")} />
                        </div>
                        <div className="user-input-box">
                            <label for="favorite">Sở thích của bạn</label>
                            <textarea type="text" name="favorite" id="favorite" placeholder='Fill here' 
                            onChange={(e) => handleChange(e, "favorite")}></textarea>
                        </div>
                        <div className="user-input-box">
                            <label for="description">Mô tả bản thân</label>
                            <textarea type="text" name="description" id="description" placeholder='Fill here' 
                            onChange={(e) => handleChange(e, "description")}></textarea>
                        </div>
                        <div className="user-input-box">
                            <label for="postImage">Ảnh bài đăng</label>
                            <input type="file"
                                id="postImage"
                                name="postImage"
                                onChange={(e) => handleChange(e, "postImage")}
                                accept='image/png, image/jpeg, image/jpg'
                            />
                        </div>
                    </div>
                    <div className='form-submit-btn'>
                        <input type='submit' value='Đăng kí'></input>
                    </div>
                </form>
            </div>

            <ToastContainer />
        </>
    );

}

export default Logup;