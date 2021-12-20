import React, { useState } from 'react'
import validateAccountId from '../../utils/validateAccountId'

const DeleteAccount = () => {
  const [accountId, setAccountId] = useState('')
  const [isFetchingData, setIsFetchingData] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false)

  //errors
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  return (
    <div className="sectionContainer">
      <h3>Delete an account</h3>
      <input
        type="text"
        value={accountId}
        placeholder="9e28507a-632f-44a6-99a7-98695cf2adcf"
        onChange={(e) => setAccountId(e.target.value)}
      ></input>
      <button
        className="deleteAccountBtn"
        onClick={() => {
          const validateInput = validateAccountId(accountId)
          if (validateInput) {
            setErrorMessage(validateInput)
            setError(true)
            setIsSuccessful(false)
          } else {
            setIsFetchingData(true)
            fetch(
              `https://nestjs-bank-app.herokuapp.com/accounts/${accountId}`,
              {
                method: 'DELETE',
              }
            )
              .then((res) => {
                setIsFetchingData(false)
                if (!res.ok) {
                  setError(true)
                  setIsSuccessful(false)
                  throw Error(res.statusText)
                }
                setIsSuccessful(true)
                setError(false)
              })
              .catch((e) => {
                setErrorMessage(e.message)
              })
          }
        }}
      >
        Delete account
      </button>

      {isFetchingData ? <div className="loading">Please wait...</div> : null}
      {error && !isFetchingData ? (
        <div className="error"> An error occurred: {errorMessage}</div>
      ) : null}
      {!error && !isFetchingData && isSuccessful ? (
        <div className="success">Deletion successful!</div>
      ) : null}
    </div>
  )
}

export default DeleteAccount
