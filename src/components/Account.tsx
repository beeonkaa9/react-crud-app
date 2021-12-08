import React, { useState } from 'react'

type Balance = {
  amount: number
  currency: string
}

type AccountProps = {
  id: string
  given_name: string
  family_name: string
  email_address: string
  balance: Balance
  note: string
}

const Account = () => {
  const [accounts, setAccounts] = useState<Array<AccountProps>>()
  const [accountId, setAccountId] = useState('')
  const [accountIdResult, setAccountIdResult] = useState<AccountProps>()

  const postRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      given_name: 'Lia',
      family_name: 'Hart',
      email_address: 'lia.hart@example.com',
      id: 'ccc3a91d-449c-41ff-a6fe-d79001431e4f',
      balance: {
        amount: 500,
        currency: 'USD',
      },
      note: 'a customer example',
    }),
  }

  const postAccount = () => {
    fetch('https://nestjs-bank-app.herokuapp.com/accounts', postRequestOptions)
  }

  const getAccounts = () => {
    fetch('https://nestjs-bank-app.herokuapp.com/accounts')
      .then((response) => response.json())
      .then((data) => setAccounts(data))
  }

  const getAccountById = () => {
    fetch(`https://nestjs-bank-app.herokuapp.com/accounts/${accountId}`)
      .then((res) => res.json())
      .then((data) => setAccountIdResult(data))
  }

  return (
    <>
      <button className="accountPostButton" onClick={postAccount}>
        Create an account
      </button>

      <button className="accountGetButton" onClick={getAccounts}>
        Get all accounts
      </button>
      <div>
        <h3>Accounts in system</h3>
        {accounts?.map((account, i) => (
          <p key={i}>
            Id: {account.id}
            Name: {account.given_name} {account.family_name} Email:{' '}
            {account.email_address} Balance: {account.balance.amount}{' '}
            {account.balance.currency} Note: {account.note}
          </p>
        ))}
      </div>

      <div>
        <h3>Search for an account</h3>
        <input
          type="text"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
        ></input>
        <button className="getAccountIdButton" onClick={getAccountById}>
          Search
        </button>
        <p>
          Id: {accountIdResult?.id}
          Name: {accountIdResult?.given_name} {accountIdResult?.family_name}{' '}
          Email: {accountIdResult?.email_address} Balance:{' '}
          {accountIdResult?.balance.amount} {accountIdResult?.balance.currency}{' '}
          Note: {accountIdResult?.note}
        </p>
      </div>
    </>
  )
}

export default Account