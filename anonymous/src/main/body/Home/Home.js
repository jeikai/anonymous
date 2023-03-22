import { useState } from 'react'
import './Home.css'
import Tinder_Card from './TinderCard'

function Home(props) {
    const initdb = [
        {
            name: 'Bùi Đức Huy',
            url: './assets/images/buiHuy.png'
        },
        {
            name: 'Doãn Ngọc Hà',
            url: './assets/images/ngocHa.png'
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