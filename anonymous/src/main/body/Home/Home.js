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
            description: 'Yêu màu tím ghét sự giả dối'
        },
        {
            name: 'Doãn Ngọc Hà',
            url: './assets/images/ngocHa.png',
            age: 16,
            gender: false,
            favorite: 'Thích đánh người',
            description: 'Tìm sugar daddy'
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