import React from 'react'
import { useContext } from 'react'
import { TransactionContext } from '../../../context/TransactionContext';
import './History.scss'
import { shortenAddress } from '../../../utils/shortenAddress'
export default function History() {
    const { transactions, currentAccount, connectWallet } = useContext(TransactionContext);
    console.log(transactions)
    return (
        <div className='table_container'>

            <table class="table">
                <caption>Anonymous Bank</caption>
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Địa chỉ nhận</th>
                        <th scope="col">Địa chỉ gửi</th>
                        <th scope="col">Số tiền</th>
                        <th scope="col">Tin nhắn</th>
                        <th scope="col">Thời gian</th>
                    </tr>
                </thead>
                {!currentAccount ?
                    <>
                        <button type="button" id="login-button" onClick={connectWallet}>
                            Connect wallet
                        </button>
                    </>
                    :
                    transactions.length == 0 ?
                        <>
                            <p>Không có thông tin</p>
                        </>
                        :
                        <tbody>
                            {transactions.map((transaction, i) => {
                                return (
                                    <tr>
                                        <td scope="row">{shortenAddress(transaction.addressTo)}</td>
                                        <td>{shortenAddress(transaction.addressFrom)}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{transaction.message}</td>
                                        <td>{transaction.timestamp}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                }
            </table>

        </div>
    )
}
