import React, { useState } from 'react'

const DeleteAccount = () => {
  const [accountId, setAccountId] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const deleteAccount = () => {
    fetch(`https://nestjs-bank-app.herokuapp.com/accounts/${accountId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          setError(true)
          throw Error(res.statusText)
        }
        setError(false)
      })
      .catch((e) => {
        setErrorMessage(e.message)
      })
  }

  return (
    <div className="DeleteAccount">
      <h3>Delete an account</h3>
      <input
        type="text"
        value={accountId}
        placeholder="9e28507a-632f-44a6-99a7-98695cf2adcf"
        onChange={(e) => setAccountId(e.target.value)}
      ></input>
      <button className="deleteAccountBtn" onClick={deleteAccount}>
        Delete account
      </button>

      {/* TODO: useEffect() to determine if loading */}
      {error ? (
        <div className="error"> An error occurred: {errorMessage}</div>
      ) : (
        <div className="requestSuccess">Deletion successful!</div>
      )}
    </div>
  )
}

export default DeleteAccount
