import React, { useEffect, useState } from 'react'
import './Home.css'
import TinderCard from './TinderCard'
import { allPostsRoute } from '../../../utils/APIRoutes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home(props) {
    const navigate = useNavigate()
    const [post, setPost] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate("/login");
        } else {
            const user = JSON.parse(localStorage.getItem('user'))
            setCurrentUser(
                user
            );
        }
    }, []); 
    // console.log(currentUser.userName)
    useEffect(() => {
        async function Data() {
            if (currentUser) {
                const data = await axios.get(`${allPostsRoute}/${currentUser.userName}`)
                setPost(data.data);
               
            }
        }
        Data()
    }, [currentUser])
    return (
        <>
            <TinderCard post={post} />
        </>
    )
}
export default Home;