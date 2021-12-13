import React, { useState } from 'react'

const GetAccountId = () => {
  const [accountId, setAccountId] = useState('')
  const [accountIdResult, setAccountIdResult] = useState<AccountProps>()
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const getAccountById = () => {
    fetch(`https://nestjs-bank-app.herokuapp.com/accounts/${accountId}`)
      .then((res) => {
        if (!res.ok) {
          setError(true)
          throw Error(res.statusText)
        }
        setError(false)
        return res.json()
      })
      .then((data) => setAccountIdResult(data))
      .catch((e) => setErrorMessage(e.message))
  }

  return (
    <div className="accountById">
      <h3>Search for an account</h3>
      <input
        type="text"
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
      ></input>
      <button className="getAccountIdButton" onClick={getAccountById}>
        Search
      </button>

      {error ? (
        <h3>An error occurred: {errorMessage}</h3>
      ) : accountIdResult ? (
        <>
          <div>Id: {accountIdResult?.id}</div>
          <div>
            Name: {accountIdResult?.given_name}
            {accountIdResult?.family_name}
          </div>
          <div>Email: {accountIdResult?.email_address}</div>
          <div>
            Balance: {accountIdResult?.balance.amount}
            {accountIdResult?.balance.currency}
          </div>
          <div>Note: {accountIdResult?.note}</div>
        </>
      ) : null}
    </div>
  )
}

export default GetAccountId
