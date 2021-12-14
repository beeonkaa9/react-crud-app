import React, { useState } from 'react'

const GetAllTransactions = () => {
  const [transactions, setTransactions] = useState<Array<TransactionProps>>()
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const getTransactions = () => {
    fetch('https://nestjs-bank-app.herokuapp.com/transactions')
      .then((res) => {
        if (!res.ok) {
          setError(true)
          throw Error(res.statusText)
        }
        return res.json()
      })
      .then((data) => setTransactions(data))
      .catch((e) => setErrorMessage(e.message))
  }

  return (
    <div className="GetAllTransactionsSection">
      <h3>View all transactions</h3>
      <button className="getTransactionsButton" onClick={getTransactions}>
        Get transactions
      </button>
      {error ? (
        <div>An error occurred: {errorMessage}</div>
      ) : (
        <div>
          {transactions?.map((transaction, i) => (
            <div key={i} className="singleTransaction">
              <div>Id: {transaction.id}</div>
              <div>Note: {transaction.note}</div>
              {transaction.target_account_id ? (
                <div>Target account: {transaction.target_account_id}</div>
              ) : null}
              <div>Amount: {transaction.amount_money.amount}</div>
              <div>{transaction.amount_money.currency}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default GetAllTransactions
