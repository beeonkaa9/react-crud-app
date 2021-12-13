import React, { useState } from 'react'

type InputBalance = {
  amount: string
  currency: string
}

type CreateAccountProps = {
  id: string
  firstName: string
  lastName: string
  email: string
  balance: InputBalance
  note: string
}

const CreateAccount = ({
  id,
  firstName,
  lastName,
  email,
  balance,
  note,
}: CreateAccountProps) => {
  // const [fetchingData, setFetchingData] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const postRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      given_name: firstName,
      family_name: lastName,
      email_address: email,
      id: id,
      balance: {
        amount: parseInt(balance.amount),
        currency: balance.currency,
      },
      note: note,
    }),
  }

  const postAccount = () => {
    // setFetchingData(true)
    fetch('https://nestjs-bank-app.herokuapp.com/accounts', postRequestOptions)
      .then((res) => {
        if (!res.ok) {
          setError(true)
          // setFetchingData(false)
          throw Error(res.statusText)
        }
        setError(false)
        // setFetchingData(false)
      })
      .catch((e) => {
        setErrorMessage(e.message)
      })
  }

  return (
    <>
      <input
        type="submit"
        className="createAccountBtn"
        onClick={postAccount}
        value="Create account"
      ></input>
      {error ? <h3>{errorMessage}</h3> : null}
    </>
  )
}

export default CreateAccount
