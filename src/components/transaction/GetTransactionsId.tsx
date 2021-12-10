import React, { useState } from 'react'

const GetTransactionsId = () => {
  const [accountId, setAccountId] = useState('')
  const [transactionsForId, setTransactionsForId] =
    useState<Array<TransactionProps>>()

  const getTransactionsById = () => {
    fetch(
      `https://nestjs-bank-app.herokuapp.com/accounts/${accountId}/transactions`
    )
      .then((res) => res.json())
      .then((data) => setTransactionsForId(data))
  }

  return (
    <>
      <div>
        <h3>Search for transactions for an account</h3>
        <input
          type="text"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
        ></input>
        <button
          className="getTransactionsAccountBtn"
          onClick={getTransactionsById}
        >
          Search
        </button>
        <div>
          <h3>Transactions for account</h3>
          {transactionsForId?.map((transaction, i) => (
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
      </div>
    </>
  )
}

export default GetTransactionsId