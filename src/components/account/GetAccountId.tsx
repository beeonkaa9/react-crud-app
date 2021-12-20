import React, { useState } from 'react'
import validateAccountId from '../../utils/validateAccountId'

const GetAccountId = () => {
  const [accountId, setAccountId] = useState('')
  const [accountIdResult, setAccountIdResult] = useState<AccountProps>()
  const [isFetchingData, setIsFetchingData] = useState(false)

  //for errors
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  return (
    <div className="sectionContainer">
      <h3>Search for an account</h3>
      <input
        type="text"
        value={accountId}
        placeholder="9e28507a-632f-44a6-99a7-98695cf2adcf"
        onChange={(e) => setAccountId(e.target.value)}
      ></input>
      <button
        className="getAccountIdButton"
        onClick={() => {
          const validateInput = validateAccountId(accountId)
          if (validateInput) {
            setErrorMessage(validateInput)
            setError(true)
          } else {
            setIsFetchingData(true)
            fetch(`https://nestjs-bank-app.herokuapp.com/accounts/${accountId}`)
              .then((res) => {
                setIsFetchingData(false)
                if (!res.ok) {
                  setError(true)
                  throw Error(res.statusText)
                }
                setError(false)
                return res.json()
              })
              .then((data) => setAccountIdResult(data))
              .catch((e) => {
                setErrorMessage(e.message)
              })
          }
        }}
      >
        Search
      </button>

      {isFetchingData ? <div className="loading">Please wait...</div> : null}
      {error && !isFetchingData ? (
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
