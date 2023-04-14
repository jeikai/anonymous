import React, { useEffect, useState, useContext } from 'react'
import './Bill.scss'
import { TransactionContext } from '../../../context/TransactionContext';
export default function Bill() {
    const { connectWallet, currentAccount, sendTransaction } = useContext(TransactionContext)
    const [values, setValues] = useState({
        addressTo: '',
        amount: '',
        message: ''
    })
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        console.log(values)
    }
    const handleSubmit = (e) => {
  
        e.preventDefault();
        console.log(values)
        if (!values.addressTo || !values.amount || !values.message) return;

        sendTransaction(values);
        
    }
    return (
        <section>
            <div className='bill_container'>
                <form action=''>
                    <h2>Anonymous</h2>
                    <img src='./assets/images/logo.png' alt='logo'></img>
                    <div className="inputbox">
                        <i class="fa-regular fa-user"></i>
                        <input type="text" name="addressTo" id="username"
                            onChange={(e) => handleChange(e)}></input>
                        <label for="username">Mã người nhận</label>
                    </div>

                    <div className="inputbox">
                        <i class="fa-solid fa-money-bill-trend-up"></i>
                        <input type="number" name="amount" id="amount"
                            onChange={(e) => handleChange(e)}
                            min="0.0001"></input>
                        <label for="amount">Số tiền</label>
                    </div>
                    <div className="inputbox">
                        <i class="fa-solid fa-message"></i>
                        <input type="text" name="message" id="msg"
                            onChange={(e) => handleChange(e)}></input>
                        <label for="msg">Lời nhắn</label>
                    </div>
                    <button type="button" id="login-button" onClick={handleSubmit}>
                        Xác nhận
                    </button>
                    {!currentAccount &&
                        (
                            <button type="button" id="login-button" onClick={connectWallet}>
                                Connect wallet
                            </button>
                        )
                    }

                </form>

            </div>
        </section>
    )
}
