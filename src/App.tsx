import React from 'react'
import './App.css'
import BankLogo from './BankLogo.png'
import { Outlet, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <header className="Header">
          <div className="BankLogoContainer">
            <img src={BankLogo} className="bankLogo" alt="logo" />
          </div>
          <nav className="NavLinks">
            <Link to="/account">Account Center</Link>
            <Link to="/transaction">Transactions</Link>
            <Link to="/about">About Us</Link>
          </nav>
        </header>
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  )
}

export default App
