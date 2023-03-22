import './login.css';
import { useState } from 'react';

function Logup() {
    let password = document.getElementById('password');
    let power = document.getElementById('power-point');

    password.oninput = function () {
        // ám chỉ độ bảo mật của mật khẩu
        let point = 0;
        // nội dung người dung đang nhập
        let value = password.value;
        let widthPower = ['1%', '25%', '50%', '75%', '100%'];
        let colorPower = ['red', 'red', 'orange', 'yellow', 'green'];
        let array = [
            /[0-9]/,
            /[a-z]/,
            /[A-Z]/,
            /[^0-9a-zA-Z]/
        ];
        if (value.length >= 6) {
            array.forEach(item => {
                if (item.test(value)) {
                    point += 1
                }
            })
        }
        power.style.width = widthPower[point];
        power.style.backgroundColor = colorPower[point];
    }
    const[password_1, setPassword] = useState("")
    const handleChangePass = (e) => {
        setPassword(e.target.value)
    }
    return (
        <>
            <div className='loginContainer'>
                <div className='logo'>
                    <img src='./assets/images/logo.png' />
                </div>
                <div className='form'>
                    <div className='group'>
                        <h1>Anonymous</h1>
                    </div>
                    <div className='group'>
                        <i className='fa-regular fa-user'></i>
                        <input type='text' placeholder=''
                            id='name'
                            autoComplete='off'></input>
                        <label for='name'>
                            UserName
                        </label>
                    </div>
                    <div className='group'>
                        <i className='fa-solid fa-lock'></i>
                        <input type='password'
                            id='password'
                            autoComplete='off'
                            placeholder=''
                            onChange={e => setPassword(e.target.value) }
                        ></input>
                        <label for='password'>
                            Password
                        </label>
                    </div>
                    <div className='group'>
                        <label for="">Power password</label>
                        <div className="power-container">
                            <div id="power-point">

                            </div>
                        </div>
                    </div>
                    <div className='group '>
                        <i className='fa-solid fa-lock'></i>
                        <input type='password'
                            id='password'
                            autoComplete='off'
                            placeholder=''></input>
                        <label for='password'>
                            Repeat your password
                        </label>
                    </div>
                    <div className='loginBtn'>
                        <button>
                            GET START
                        </button>
                    </div>
                </div>
            </div>
            
        </>
    );
    
}

export default Logup;
