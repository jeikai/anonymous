import { useState } from 'react'
import './Home.css'
import Tinder_Card from './TinderCard'

function Home(props) {
    const initdb = [
        {
            name: 'Bùi Đức Huy',
            url: './assets/images/buiHuy.png',
            age: 26,
            gender: true,
            favorite: 'Ăn, ngủ, code',
            description: 'Yêu màu tím ghét sự giả dối. Thích tâm hồn đẹp'
        },
        {
            name: 'Doãn Ngọc Hà',
            url: './assets/images/ngocHa.png',
            age: 16,
            gender: false,
            favorite: 'Thích đánh người',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
    ]
    const [db, SetDb] = useState(initdb);
    return (
        <>
            <Tinder_Card db={db} />      
        </>
    )
}
export default Home;