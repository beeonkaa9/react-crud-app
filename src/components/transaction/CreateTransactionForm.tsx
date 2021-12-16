import React, { useState } from 'react'
import validateCreateTransaction from '../../utils/validateCreateTransaction'

const formInitialState = {
  id: '',
  note: '',
  targetAccount: '',
  amount: '',
  currency: '',
}

const CreateTransactionForm = ({
  buttonClicked,
}: {
  buttonClicked: string
}) => {
  const [formInput, setFormInput] = useState(formInitialState)
  const [isFetchingData, setIsFetchingData] = useState(false)

  //error handling
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [formErrors, setFormErrors] = useState([''])

  const transactionRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: formInput.id,
      note: formInput.note,
      amount_money: {
        amount: parseInt(formInput.amount),
        currency: formInput.currency,
      },
    }),
  }

  const sendMoneyRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: formInput.id,
      note: formInput.note,
      target_account_id: formInput.targetAccount,
      amount_money: {
        amount: parseInt(formInput.amount),
        currency: formInput.currency,
      },
    }),
  }

  const addTransaction = () => {
    const validateForm = validateCreateTransaction(formInput)
    const validationErrors = Object.values(validateForm).filter(
      (error) => error != ''
    )
    console.log({ validationErrors })
    if (validationErrors.length != 0) {
      setFormErrors(validationErrors)
      console.log({ formErrors })
    } else {
      setIsFetchingData(true)
      fetch(
        `https://nestjs-bank-app.herokuapp.com/accounts/${formInput.id}/transactions/add`,
        transactionRequestOptions
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

  const withdrawTransaction = () => {
    setIsFetchingData(true)
    fetch(
      `https://nestjs-bank-app.herokuapp.com/accounts/${formInput.id}/transactions/withdraw`,
      transactionRequestOptions
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

  const sendMoneyTransaction = () => {
    setIsFetchingData(true)
    fetch(
      `https://nestjs-bank-app.herokuapp.com/accounts/${formInput.id}/transactions/send`,
      sendMoneyRequestOptions
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
  return (
    <>
      <div className="TransactionForm">
        <form className="transactionCreationForm">
          <label>Account Id</label>
          <input
            type="text"
            value={formInput.id}
            placeholder="9e28507a-632f-44a6-99a7-98695cf2adcf"
            onChange={(e) => setFormInput({ ...formInput, id: e.target.value })}
          ></input>

          <label>Note</label>
          <input
            type="text"
            value={formInput.note}
            placeholder="rent money"
            onChange={(e) =>
              setFormInput({ ...formInput, note: e.target.value })
            }
          ></input>
          {buttonClicked === 'send' ? (
            <>
              <label>Account to send money to</label>
              <input
                type="text"
                value={formInput.targetAccount}
                placeholder="ccc3a91d-449c-41ff-a6fe-d79001431e4f"
                onChange={(e) =>
                  setFormInput({ ...formInput, targetAccount: e.target.value })
                }
              ></input>
            </>
          ) : null}

          <label>Amount</label>
          <input
            type="text"
            value={formInput.amount}
            placeholder="300"
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
        </form>
        {buttonClicked === 'add' ? (
          <button className="addMoneyButton" onClick={addTransaction}>
            Add money
          </button>
        ) : null}

        {buttonClicked === 'withdraw' ? (
          <button className="withdrawalButton" onClick={withdrawTransaction}>
            Make withdrawal
          </button>
        ) : null}

        {buttonClicked === 'send' ? (
          <button className="sendMoneyButton" onClick={sendMoneyTransaction}>
            Transfer money
          </button>
        ) : null}
      </div>

      <div className="transactionFormStatus">
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
          <div className="success">Transaction successfully created!</div>
        ) : null}
      </div>
    </>
  )
}

export default CreateTransactionForm
