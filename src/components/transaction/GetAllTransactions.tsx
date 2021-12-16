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
        console.log('response', res.json())
        return res.json()
      })
      .then((data) => setTransactions(data))
      .catch((e) => setErrorMessage(e.message))
  }

  return (
    <div className="GetAllTransactionsSection">
      <h2>View all transactions</h2>
      <button className="getTransactionsButton" onClick={getTransactions}>
        Get transactions
      </button>
      {error ? <div>An error occurred: {errorMessage}</div> : null}
      <div>
        {!transactions ? (
          <h4>No transactions found</h4>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}

export default GetAllTransactions
