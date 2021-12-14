import React from 'react'
import './App.css'
import Account from './components/account/Account'
import Transaction from './components/transaction/Transaction'
import BankLogo from './BankLogo.png'

function App() {
  return (
    <div className="App">
      <header className="Header">
        <img src={BankLogo} className="bankLogo" alt="logo" />
      </header>
      <h1>Account Actions</h1>
      <Account />
      <h1>Transactions</h1>
      <Transaction />
    </div>
  )
}

export default App
