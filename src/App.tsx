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
      <Account />
      <Transaction />
    </div>
  )
}

export default App
