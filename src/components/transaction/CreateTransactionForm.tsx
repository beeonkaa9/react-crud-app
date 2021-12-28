import FormStatus from 'components/FormStatus'
import React, { useEffect, useState } from 'react'
import validateCreateTransaction from 'utils/validateCreateTransaction'
import { TransactionType } from './Transaction'

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
  buttonClicked: Exclude<TransactionType, 'none'>
}) => {
  const [formInput, setFormInput] = useState(formInitialState)

  const [requestStatus, setRequestStatus] =
    useState<RequestStatusOptions>('idle')

  //for error and success messages
  const [message, setMessage] = useState<string | null>(null)

  const [formValidationErrors, setFormValidationErrors] = useState<
    string[] | null
  >(null)

  //since all the transactions share one form, it must be reset before doing another form (ex. withdraw then add)
  useEffect(() => {
    setFormInput(formInitialState)
    setRequestStatus('idle')
    setFormValidationErrors(null)
  }, [buttonClicked])

  return (
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
          onChange={(e) => setFormInput({ ...formInput, note: e.target.value })}
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
          onClick={() => {
            const validateForm = validateCreateTransaction(
              formInput,
              buttonClicked
            )
            const validationErrors = Object.values(validateForm).filter(
              (error) => error !== ''
            )
            if (validationErrors.length !== 0) {
              setFormValidationErrors(validationErrors)
            } else {
              setFormValidationErrors(null)
              setRequestStatus('fetching')
              fetch(
                `https://nestjs-bank-app.herokuapp.com/accounts/${formInput.id}/transactions/add`,
                {
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
              )
                .then((res) => {
                  if (!res.ok) {
                    setRequestStatus('error')
                    throw Error(res.statusText)
                  }
                  setFormInput(formInitialState)
                  setMessage('Transaction successfully submitted!')
                  setRequestStatus('success')
                })
                .catch((e) => {
                  setMessage(e.message)
                })
            }
          }}
        >
          Add money
        </button>
      ) : null}

      {buttonClicked === 'withdraw' ? (
        <button
          onClick={() => {
            const validateForm = validateCreateTransaction(
              formInput,
              buttonClicked
            )
            const validationErrors = Object.values(validateForm).filter(
              (error) => error !== ''
            )
            if (validationErrors.length !== 0) {
              setFormValidationErrors(validationErrors)
            } else {
              setFormValidationErrors(null)
              setRequestStatus('fetching')
              fetch(
                `https://nestjs-bank-app.herokuapp.com/accounts/${formInput.id}/transactions/withdraw`,
                {
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
              )
                .then((res) => {
                  if (!res.ok) {
                    setRequestStatus('error')
                    throw Error(res.statusText)
                  }
                  setFormInput(formInitialState)
                  setMessage('Transaction successfully submitted!')
                  setRequestStatus('success')
                })
                .catch((e) => {
                  setMessage(e.message)
                })
            }
          }}
        >
          Make withdrawal
        </button>
      ) : null}

      {buttonClicked === 'send' ? (
        <button
          onClick={() => {
            const validateForm = validateCreateTransaction(
              formInput,
              buttonClicked
            )
            const validationErrors = Object.values(validateForm).filter(
              (error) => error !== ''
            )
            if (validationErrors.length !== 0) {
              setFormValidationErrors(validationErrors)
            } else {
              setFormValidationErrors(null)
              setRequestStatus('fetching')
              fetch(
                `https://nestjs-bank-app.herokuapp.com/accounts/${formInput.id}/transactions/send`,
                {
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
              )
                .then((res) => {
                  if (!res.ok) {
                    setRequestStatus('error')
                    throw Error(res.statusText)
                  }
                  setFormInput(formInitialState)
                  setMessage('Transaction successfully submitted!')
                  setRequestStatus('success')
                })
                .catch((e) => {
                  setMessage(e.message)
                })
            }
          }}
        >
          Transfer money
        </button>
      ) : null}

      <div className="transactionFormStatus">
        <FormStatus
          request={{ status: requestStatus, message }}
          validationErrors={formValidationErrors}
        />
      </div>
    </div>
  )
}

export default CreateTransactionForm
