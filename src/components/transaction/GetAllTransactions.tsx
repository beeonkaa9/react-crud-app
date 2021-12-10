import React, { useState } from 'react'

const GetAllTransactions = () => {
  const [transactions, setTransactions] = useState<Array<TransactionProps>>()

  const getTransactions = () => {
    fetch('https://nestjs-bank-app.herokuapp.com/transactions')
      .then((res) => res.json())
      .then((data) => setTransactions(data))
  }

  return (
    <div>
      <button className="getTransactionsButton" onClick={getTransactions}>
        Get transactions
      </button>
      <h3>Transactions in system</h3>
      {transactions?.map((transaction, i) => (
        <div key={i}>
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
  )
}

export default GetAllTransactions
