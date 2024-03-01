import './Search.scss'
import { searchRoute } from '../../../utils/APIRoutes'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TinderCard from '../Home/TinderCard'
export default function Search() {
    const [search, setSearch] = useState("")
    const [post, setPost] = useState()
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const handleChange = (e) => {
        setSearch(e.target.value)
        console.log(search)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await axios.post(searchRoute, { search })
        if (data.data.status === false) {
            toast.error(data.data.msg, toastOptions);
        }
        if (data.data.status === true) {
            setPost(data.data.posts)
        }
    }
    return (
        <>
            {post == null ?
                <div className='search-container'>
                    <form className='search-bar' onSubmit={(event) => handleSubmit(event)}>
                        <input type='text' name='search' placeholder='Tìm theo tên...'
                            onChange={(e) => handleChange(e)}></input>
                        <button type='submit'><i className="fas fa-search"></i></button>
                    </form>
                </div>
                :
                <>
                    <TinderCard post={post}></TinderCard>
                </>
            }
            <ToastContainer />
        </>
    )
}