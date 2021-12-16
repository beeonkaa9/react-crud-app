import React, { useEffect, useState } from 'react'
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
  const [isSuccessful, setIsSuccessful] = useState(false)

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

  //since all the transactions share one form, it must be reset before doing another operation
  useEffect(() => {
    setFormErrors([''])
    setFormInput(formInitialState)
    setError(false)
    setErrorMessage(null)
    setIsSuccessful(false)
  }, [buttonClicked])

  useEffect(() => {
    if (isSuccessful) setFormErrors([''])
    setError(false)
    setErrorMessage(null)
  }, [isSuccessful])

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
          <button
            className="addMoneyButton"
            onClick={() => {
              const validateForm = validateCreateTransaction(
                formInput,
                buttonClicked
              )
              const validationErrors = Object.values(validateForm).filter(
                (error) => error != ''
              )
              if (validationErrors.length != 0) {
                setFormErrors(validationErrors)
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
                    setIsSuccessful(true)
                  })
                  .catch((e) => {
                    setErrorMessage(e.message)
                  })
              }
            }}
          >
            Add money
          </button>
        ) : null}

        {buttonClicked === 'withdraw' ? (
          <button
            className="withdrawalButton"
            onClick={() => {
              const validateForm = validateCreateTransaction(
                formInput,
                buttonClicked
              )
              const validationErrors = Object.values(validateForm).filter(
                (error) => error != ''
              )
              if (validationErrors.length != 0) {
                setFormErrors(validationErrors)
                setIsSuccessful(false)
              } else {
                setIsFetchingData(true)
                fetch(
                  `https://nestjs-bank-app.herokuapp.com/accounts/${formInput.id}/transactions/withdraw`,
                  transactionRequestOptions
                )
                  .then((res) => {
                    setIsFetchingData(false)
                    if (!res.ok) {
                      setError(true)
                      setIsSuccessful(false)
                      throw Error(res.statusText)
                    }
                    setError(false)
                    setFormInput(formInitialState)
                    setIsSuccessful(true)
                  })
                  .catch((e) => {
                    setErrorMessage(e.message)
                  })
              }
            }}
          >
            Make withdrawal
          </button>
        ) : null}

        {buttonClicked === 'send' ? (
          <button
            className="sendMoneyButton"
            onClick={() => {
              const validateForm = validateCreateTransaction(
                formInput,
                buttonClicked
              )
              const validationErrors = Object.values(validateForm).filter(
                (error) => error != ''
              )
              if (validationErrors.length != 0) {
                setFormErrors(validationErrors)
                setIsSuccessful(false)
              } else {
                setIsFetchingData(true)
                fetch(
                  `https://nestjs-bank-app.herokuapp.com/accounts/${formInput.id}/transactions/send`,
                  sendMoneyRequestOptions
                )
                  .then((res) => {
                    setIsFetchingData(false)
                    if (!res.ok) {
                      setIsSuccessful(false)
                      setError(true)
                      throw Error(res.statusText)
                    }
                    setError(false)
                    setFormInput(formInitialState)
                    setIsSuccessful(true)
                  })
                  .catch((e) => {
                    setErrorMessage(e.message)
                  })
              }
            }}
          >
            Transfer money
          </button>
        ) : null}
      </div>

      <div className="transactionFormStatus">
        {isFetchingData ? <div className="loading">Please wait...</div> : null}
        {error ? (
          <div className="error">An error occurred: {errorMessage}</div>
        ) : null}
        {formErrors ? (
          <>
            {formErrors.map((error, i) => (
              <div key={i} className="formErrors">
                <div>{error}</div>
              </div>
            ))}
          </>
        ) : null}
        {isSuccessful ? (
          <div className="success">Transaction successfully created!</div>
        ) : null}
      </div>
    </>
  )
}

export default CreateTransactionForm
