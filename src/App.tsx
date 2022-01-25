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
          <img src={BankLogo} className="bankLogo" alt="logo" />
          <div className="NavLinks">
            <Link to="/account" className="HeaderLink">
              Account Center
            </Link>
            <Link to="/transaction" className="HeaderLink">
              Transactions
            </Link>
            <Link to="/about" className="HeaderLink">
              About Us
            </Link>
          </div>
        </header>
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  )
}

export default App
