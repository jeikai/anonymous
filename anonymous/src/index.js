import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { TransactionsProvider } from './context/TransactionContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TransactionsProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TransactionsProvider>
);

