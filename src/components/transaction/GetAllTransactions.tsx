import FormStatus from 'components/FormStatus'
import { HTTPError } from 'ky'
import React, { useState } from 'react'
import api from 'utils/api'

const GetAllTransactions = () => {
  const [transactions, setTransactions] = useState<Array<TransactionResponse>>()

  const [requestStatus, setRequestStatus] =
    useState<RequestStatusOptions>('idle')

  const [errorMessage, setErrorMessage] = useState(null)

  return (
    <div className="sectionContainer">
      <h2>View all transactions</h2>
      <button
        onClick={() => {
          setRequestStatus('fetching')
          api
            .get('transactions')
            .json<Array<TransactionResponse>>()
            .then((data) => {
              setTransactions(data)
              setRequestStatus('success')
            })
            .catch((e) => {
              setRequestStatus('error')
              if (e instanceof HTTPError) {
                e.response.json().then((e) => setErrorMessage(e.message))
              }
              setErrorMessage(e.message)
            })
        }}
      >
        Get transactions
      </button>
      <div className="requestStatus">
        {requestStatus === 'fetching' || requestStatus === 'error' ? (
          <FormStatus
            request={{ status: requestStatus, message: errorMessage }}
          />
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
