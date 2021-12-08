import React from 'react'
import './App.css'
import Account from './components/account/Account'
import Transaction from './components/transaction/Transaction'

function App() {
  return (
    <div className="App">
      <header className="Header">
        <h1>Bank Portal</h1>
      </header>
      <h1>Account Actions</h1>
      <Account />
      <h1>Transactions</h1>
      <Transaction />
    </div>
  )
}

export default App
