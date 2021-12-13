import React, { useState } from 'react'

const CreateTransactionForm = ({
  buttonClicked,
}: {
  buttonClicked: string
}) => {
  const [id, setId] = useState('')
  const [note, setNote] = useState('')
  const [targetAccount, setTargetAccount] = useState('')
  const [amount, setAmount] = useState({ amount: '', currency: '' })

  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const transactionRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: id,
      note: note,
      amount_money: {
        amount: parseInt(amount.amount),
        currency: amount.currency,
      },
    }),
  }

  const sendMoneyRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: id,
      note: note,
      target_account_id: targetAccount,
      amount_money: {
        amount: parseInt(amount.amount),
        currency: amount.currency,
      },
    }),
  }

  const addTransaction = () => {
    fetch(
      `https://nestjs-bank-app.herokuapp.com/accounts/${id}/transactions/add`,
      transactionRequestOptions
    )
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

  const withdrawTransaction = () => {
    fetch(
      `https://nestjs-bank-app.herokuapp.com/accounts/${id}/transactions/withdraw`,
      transactionRequestOptions
    )
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

  const sendMoneyTransaction = () => {
    fetch(
      `https://nestjs-bank-app.herokuapp.com/accounts/${id}/transactions/send`,
      sendMoneyRequestOptions
    )
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
    <>
      <h2>Create a Transaction</h2>
      <div className="transactionForm">
        <form className="transactionCreationForm">
          <label>Account Id</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          ></input>

          <label>Note</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></input>
          {buttonClicked === 'send' ? (
            <>
              <label>Account to send money to</label>
              <input
                type="text"
                value={targetAccount}
                onChange={(e) => setTargetAccount(e.target.value)}
              ></input>
            </>
          ) : null}

          <label>Amount</label>
          <input
            type="text"
            value={amount.amount}
            onChange={(e) => setAmount({ ...amount, amount: e.target.value })}
          ></input>

          <label>Currency</label>
          <input
            type="text"
            value={amount.currency}
            onChange={(e) => setAmount({ ...amount, currency: e.target.value })}
          ></input>
        </form>
      </div>

      {buttonClicked === 'add' ? (
        <button className="addMoneyButton" onClick={addTransaction}>
          Add money to balance
        </button>
      ) : null}

      {buttonClicked === 'withdraw' ? (
        <button className="withdrawalButton" onClick={withdrawTransaction}>
          Make a withdrawal
        </button>
      ) : null}

      {buttonClicked === 'send' ? (
        <button className="sendMoneyButton" onClick={sendMoneyTransaction}>
          Transfer from one account to another
        </button>
      ) : null}

      {error ? <div>An error occurred: {errorMessage}</div> : null}
    </>
  )
}

export default CreateTransactionForm
