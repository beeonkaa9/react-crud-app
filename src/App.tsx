import React from 'react'
import './App.css'
import BankLogo from './BankLogo.png'
import { Outlet, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="Header">
        <img src={BankLogo} className="bankLogo" alt="logo" />
        <nav className="NavLinks">
          <Link to="/account">Account Center</Link>
          <Link to="/transaction">Transactions</Link>
          <Link to="/about">About Us</Link>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}

export default App
