import React, { useState } from 'react'
import validateCreateAccount from '../../utils/validateCreateAccount'

const formInitialState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  amount: '',
  currency: '',
  note: '',
}

const CreateAccount = () => {
  //for form
  const [formInput, setFormInput] = useState(formInitialState)
  const [isFetchingData, setIsFetchingData] = useState(false)

  //error handling
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState([''])

  const postRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      given_name: formInput.firstName,
      family_name: formInput.lastName,
      email_address: formInput.email,
      id: formInput.id,
      balance: {
        amount: parseInt(formInput.amount),
        currency: formInput.currency,
      },
      note: formInput.note,
    }),
  }

  const postAccount = () => {
    const validateForm = validateCreateAccount(formInput)
    const validationErrors = Object.values(validateForm).filter(
      (error) => error != ''
    )
    if (validationErrors.length != 0) {
      setFormErrors(validationErrors)
    } else {
      setIsFetchingData(true)
      fetch(
        'https://nestjs-bank-app.herokuapp.com/accounts',
        postRequestOptions
      )
        .then((res) => {
          setIsFetchingData(false)
          if (!res.ok) {
            setError(true)
            throw Error(res.statusText)
          }
          setError(false)
          setFormInput(formInitialState)
        })
        .catch((e) => {
          setErrorMessage(e.message)
        })
    }
  }

  return (
    <div className="CreateAccount">
      <h2>Create An Account</h2>
      <form className="accountCreationForm">
        <label>Account id</label>
        <input
          type="text"
          value={formInput.id || ''}
          placeholder="914e8480-263e-4f99-8ce5-6e0a0f3621a7"
          onChange={(e) => setFormInput({ ...formInput, id: e.target.value })}
        ></input>

        <label>First name</label>
        <input
          type="text"
          value={formInput.firstName}
          placeholder="Jane"
          onChange={(e) =>
            setFormInput({ ...formInput, firstName: e.target.value })
          }
        ></input>

        <label>Last name</label>
        <input
          type="text"
          value={formInput.lastName}
          placeholder="Johnson"
          onChange={(e) =>
            setFormInput({ ...formInput, lastName: e.target.value })
          }
        ></input>

        <label>Email address</label>
        <input
          type="text"
          value={formInput.email}
          placeholder="janejo@mailator.com"
          onChange={(e) =>
            setFormInput({ ...formInput, email: e.target.value })
          }
        ></input>

        <label>Amount</label>
        <input
          type="text"
          value={formInput.amount}
          placeholder="400"
          onChange={(e) =>
            setFormInput({ ...formInput, amount: e.target.value })
          }
        ></input>

        <label>Currency</label>
        <input
          type="text"
          value={formInput.currency}
          placeholder="USD"
          onChange={(e) =>
            setFormInput({ ...formInput, currency: e.target.value })
          }
        ></input>

        <label>Note</label>
        <input
          type="text"
          value={formInput.note}
          placeholder="a customer"
          onChange={(e) => setFormInput({ ...formInput, note: e.target.value })}
        ></input>
      </form>
      <input
        type="submit"
        className="createAccountBtn"
        onClick={postAccount}
        value="Create account"
      ></input>
      <div className="formStatus">
        {error ? (
          <div className="error">An error occurred: {errorMessage}</div>
        ) : null}
        {isFetchingData ? <div className="loading">Please wait...</div> : null}

        {formErrors ? (
          <>
            {formErrors.map((error, i) => (
              <div key={i} className="formErrors">
                <div>{error}</div>
              </div>
            ))}
          </>
        ) : null}
        {!isFetchingData && formErrors.length === 0 && !error ? (
          <div className="success">Account successfully created!</div>
        ) : null}
      </div>
    </div>
  )
}

export default CreateAccount
