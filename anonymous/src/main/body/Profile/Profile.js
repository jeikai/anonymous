import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Profile.scss'
import axios from "axios";
import { usersRoute, updateRoute } from "../../../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Profile() {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(undefined);
    const [data, setData] = useState([])
    const [post, setPost] = useState({
        title: '',
        favorite: '',
        description: ''
    })
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    };
    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate("/login");
        } else {
            const user = JSON.parse(localStorage.getItem('user'))
            setCurrentUser(
                user.userName
            );
        }
    }, []);
    useEffect(() => {
        async function Data() {
            if (currentUser) {
                const data = await axios.get(`${usersRoute}/${currentUser}`)
                console.log(data.data[0])
                setData(data.data[0]);
            }
        }
        Data()
    }, [currentUser]);

    const handleChange = (event) => {
        setPost(values => ({ ...values, [event.target.name]: event.target.value }));
        console.log(post)
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if ( post.title == '') {
            post.title = data.title
            console.log(post)
        }
        if ( post.favorite == '') {
            post.favorite = data.favorite
        }
        if ( post.description == '') {
            post.description = data.description
        }
        const result = await axios.post(`${updateRoute}/${currentUser}`, post)
        if (result.data.status == true) {
            toast.error("Cập nhật thành công", toastOptions);
        }
    }
    return (
        <>
            <div className='cardContainer'>
                <div className="card" style={{ width: '28em' }}>
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <>
                            <img className="card-img-top" src={"./assets/uploads/" + data.postImg} alt="Card image cap" />
                            <div className="card-body">
                                <input type="text" className="card-title" defaultValue={data.title} name="title"
                                    onChange={(event) => handleChange(event)}></input>
                                <p className="card-text">{data.userName}, {data.age}</p>
                                <textarea className="card-text" defaultValue={data.favorite} name="favorite"
                                    onChange={(event) => handleChange(event)}></textarea>
                                <textarea className="card-text" defaultValue={data.description} name="description"
                                    onChange={(event) => handleChange(event)}></textarea>
                                <button className="btn btn-primary">Save</button>
                            </div>
                        </>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )




}