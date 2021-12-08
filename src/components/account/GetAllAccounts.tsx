import React, { useState } from 'react'

const GetAllAccounts = () => {
  const [accounts, setAccounts] = useState<Array<AccountProps>>()

  const getAccounts = () => {
    fetch('https://nestjs-bank-app.herokuapp.com/accounts')
      .then((response) => response.json())
      .then((data) => setAccounts(data))
  }

  return (
    <div className="getAccounts">
      <button className="accountGetButton" onClick={getAccounts}>
        Get all accounts
      </button>
      <div>
        <h3>Accounts in system</h3>
        {accounts?.map((account, i) => (
          <div key={i} className="singleAccount">
            <div>Id: {account.id}</div>
            <div>
              Name: {account.given_name}
              {account.family_name}
            </div>
            <div>Email: {account.email_address}</div>
            <div>
              Balance: {account.balance.amount} {account.balance.currency}
            </div>
            <div>Note: {account.note}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GetAllAccounts
