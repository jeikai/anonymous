import './Fill_Post.scss';
import { Link, useNavigate } from 'react-router-dom';
export default function Fill_Post() {
    return (
        <section>
            <div className='fill_container'>
                <form action=''>
                    <h2>Anonymous</h2>
                    <img src='./assets/images/logo.png' alt='logo'></img>
                    <div className="inputbox">
                        <i class="fa-regular fa-user"></i>
                        <input type="text" name="username" id="username"></input>
                        <label for="username">Tiêu đề bài đăng</label>
                    </div>

                    <div className="inputbox">
                        <i class="fa-solid fa-lock"></i>
                        <input type="password" name="password" id="password" ></input>
                        <label for="password">Mật khẩu</label>
                    </div>
                    <button type="button" id="login-button">
                        Hoàn tất
                    </button>
                </form>
            </div>
        </section>
    )
}