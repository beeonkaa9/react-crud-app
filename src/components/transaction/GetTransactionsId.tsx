import React, { useState } from 'react'
import validateAccountId from '../../utils/validateAccountId'

const GetTransactionsId = () => {
  const [accountId, setAccountId] = useState('')
  const [transactionsForId, setTransactionsForId] =
    useState<Array<TransactionProps>>()
  const [isFetchingData, setIsFetchingData] = useState(false)

  //for errors
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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
          onClick={() => {
            const validateInput = validateAccountId(accountId)
            if (validateInput) {
              setErrorMessage(validateInput)
              setError(true)
            } else {
              setIsFetchingData(true)
              fetch(
                `https://nestjs-bank-app.herokuapp.com/accounts/${accountId}/transactions`
              )
                .then((res) => {
                  setIsFetchingData(false)
                  if (!res.ok) {
                    setError(true)
                    throw Error(res.statusText)
                  }
                  setError(false)
                  return res.json()
                })
                .then((data) => setTransactionsForId(data))
                .catch((e) => setErrorMessage(e.message))
            }
          }}
        >
          Search
        </button>
        {isFetchingData ? <div className="loading">Please wait...</div> : null}
        {error ? (
          <div className="error">An error occurred: {errorMessage}</div>
        ) : transactionsForId ? (
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
        ) : null}
      </div>
    </>
  )
}

export default GetTransactionsId
