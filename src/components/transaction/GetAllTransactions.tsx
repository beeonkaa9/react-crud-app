import RequestStatus from 'components/RequestStatus'
import React, { useState } from 'react'

const GetAllTransactions = () => {
  const [transactions, setTransactions] = useState<Array<TransactionResponse>>()

  const [requestStatus, setRequestStatus] =
    useState<RequestStatusOptions>('idle')

  const [errorMessage, setErrorMessage] = useState(null)

  return (
    <div className="sectionContainer">
      <h2>View all transactions</h2>
      <button
        className="getTransactionsButton"
        onClick={() => {
          setRequestStatus('fetching')
          fetch('https://nestjs-bank-app.herokuapp.com/transactions')
            .then((res) => {
              if (!res.ok) {
                setRequestStatus('error')
                throw Error(res.statusText)
              }
              setRequestStatus('success')
              return res.json()
            })
            .then((data) => setTransactions(data))
            .catch((e) => setErrorMessage(e.message))
        }}
      >
        Get transactions
      </button>
      <div className="requestStatus">
        {requestStatus === 'fetching' || requestStatus === 'error' ? (
          <RequestStatus requestStatus={requestStatus} message={errorMessage} />
        ) : null}
      </div>
      <div>
        {transactions && requestStatus === 'success'
          ? transactions?.map((transaction, i) => (
              <div key={i} className="singleTransaction">
                <div>Id: {transaction.id}</div>
                <div>Note: {transaction.note}</div>
                {transaction.target_account_id ? (
                  <div>Target account: {transaction.target_account_id}</div>
                ) : null}
                <div>Amount: {transaction.amount_money.amount}</div>
                <div>{transaction.amount_money.currency}</div>
              </div>
            ))
          : null}
        {transactions?.length === 0 && requestStatus === 'success' ? (
          <h4>No transactions found</h4>
        ) : null}
      </div>
    </div>
  )
}

export default GetAllTransactions
