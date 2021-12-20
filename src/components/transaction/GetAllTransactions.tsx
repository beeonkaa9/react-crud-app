import React, { useState } from 'react'

const GetAllTransactions = () => {
  const [transactions, setTransactions] = useState<Array<TransactionProps>>()
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isFetchingData, setIsFetchingData] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false)

  return (
    <div className="sectionContainer">
      <h2>View all transactions</h2>
      <button
        className="getTransactionsButton"
        onClick={() => {
          setIsFetchingData(true)
          fetch('https://nestjs-bank-app.herokuapp.com/transactions')
            .then((res) => {
              setIsFetchingData(false)
              if (!res.ok) {
                setIsSuccessful(false)
                setError(true)
                throw Error(res.statusText)
              }
              setIsSuccessful(true)
              setError(false)
              return res.json()
            })
            .then((data) => setTransactions(data))
            .catch((e) => setErrorMessage(e.message))
        }}
      >
        Get transactions
      </button>
      {isFetchingData ? <div className="loading">Please wait...</div> : null}
      {error ? <div>An error occurred: {errorMessage}</div> : null}
      <div>
        {transactions && isSuccessful ? (
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
        ) : null}
        {transactions?.length === 0 && isSuccessful ? (
          <h4>No transactions found</h4>
        ) : null}
      </div>
    </div>
  )
}

export default GetAllTransactions
