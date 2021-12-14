import React, { useState } from 'react'

type InputBalance = {
  amount: string
  currency: string
}

const CreateAccount = () => {
  //for form
  const [id, setId] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [balance, setBalance] = useState<InputBalance>({
    amount: '',
    currency: '',
  })
  const [note, setNote] = useState<string>('')

  //error handling
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
    <div className="CreateAccount">
      <h2>Create An Account</h2>
      <form className="accountCreationForm">
        <label>Account id</label>
        <input
          type="text"
          value={id}
          placeholder="914e8480-263e-4f99-8ce5-6e0a0f3621a7"
          onChange={(e) => setId(e.target.value)}
        ></input>

        <label>First name</label>
        <input
          type="text"
          value={firstName}
          placeholder="Jane"
          onChange={(e) => setFirstName(e.target.value)}
        ></input>

        <label>Last name</label>
        <input
          type="text"
          value={lastName}
          placeholder="Johnson"
          onChange={(e) => setLastName(e.target.value)}
        ></input>

        <label>Email address</label>
        <input
          type="text"
          value={email}
          placeholder="janejo@mailator.com"
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label>Amount</label>
        <input
          type="text"
          value={balance.amount}
          placeholder="400"
          onChange={(e) => setBalance({ ...balance, amount: e.target.value })}
        ></input>

        <label>Currency</label>
        <input
          type="text"
          value={balance.currency}
          placeholder="USD"
          onChange={(e) => setBalance({ ...balance, currency: e.target.value })}
        ></input>

        <label>Note</label>
        <input
          type="text"
          value={note}
          placeholder="a customer"
          onChange={(e) => setNote(e.target.value)}
        ></input>
      </form>
      <input
        type="submit"
        className="createAccountBtn"
        onClick={postAccount}
        value="Create account"
      ></input>
      {error ? <div className="error">{errorMessage}</div> : null}
    </div>
  )
}

export default CreateAccount
