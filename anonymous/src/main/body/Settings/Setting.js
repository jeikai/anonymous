import './Setting.css';
import { useState } from 'react';
function Setting() {
    const [active, setActive] = useState(false);
    return (
        <>
                <ul className='setting'>
                    <li>Hello</li>
                </ul>
        </>
    )
}

export default Setting;