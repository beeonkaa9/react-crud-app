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
          console.log('response', res.json())
          throw Error(res.statusText)
        }
        setError(false)

        return res.json()
      })
      .then((data) => setAccountIdResult(data))
      .catch((e) => {
        console.log('error', e.json())
        setErrorMessage(e.message)
      })
  }

  return (
    <div className="AccountByIdSection">
      <h3>Search for an account</h3>
      <input
        type="text"
        value={accountId}
        placeholder="9e28507a-632f-44a6-99a7-98695cf2adcf"
        onChange={(e) => setAccountId(e.target.value)}
      ></input>
      <button className="getAccountIdButton" onClick={getAccountById}>
        Search
      </button>

      {error ? (
        <div className="error">An error occurred: {errorMessage}</div>
      ) : accountIdResult ? (
        <div className="singleAccount">
          <div>Id: {accountIdResult?.id}</div>
          <div>
            Name: {accountIdResult?.given_name} {accountIdResult?.family_name}
          </div>
          <div>Email: {accountIdResult?.email_address}</div>
          <div>
            Balance: {accountIdResult?.balance.amount}{' '}
            {accountIdResult?.balance.currency}
          </div>
          <div>Note: {accountIdResult?.note}</div>
        </div>
      ) : null}
    </div>
  )
}

export default GetAccountId
