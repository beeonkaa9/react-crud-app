import React, { useState } from 'react'

const GetTransactionsId = () => {
  const [accountId, setAccountId] = useState('')
  const [transactionsForId, setTransactionsForId] =
    useState<Array<TransactionProps>>()
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const getTransactionsById = () => {
    fetch(
      `https://nestjs-bank-app.herokuapp.com/accounts/${accountId}/transactions`
    )
      .then((res) => {
        if (!res.ok) {
          setError(true)
          throw Error(res.statusText)
        }
        return res.json()
      })
      .then((data) => setTransactionsForId(data))
      .catch((e) => setErrorMessage(e.message))
  }

  return (
    <>
      <div className="GetTransactionsIdSection">
        <h3>Search for transactions for an account</h3>
        <input
          type="text"
          value={accountId}
          placeholder="ccc3a91d-449c-41ff-a6fe-d79001431e4f"
          onChange={(e) => setAccountId(e.target.value)}
        ></input>
        <button
          className="getTransactionsAccountBtn"
          onClick={getTransactionsById}
        >
          Search
        </button>
        {error ? (
          <div>An error occurred: {errorMessage}</div>
        ) : (
          <div>
            {transactionsForId?.map((transaction, i) => (
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
    </>
  )
}

export default GetTransactionsId
