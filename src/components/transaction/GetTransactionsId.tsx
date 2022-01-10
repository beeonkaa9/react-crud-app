import FormStatus from 'components/FormStatus'
import { HTTPError } from 'ky'
import React, { useState } from 'react'
import api from 'utils/api'
import validateAccountId from 'utils/validateAccountId'

const GetTransactionsId = () => {
  const [accountId, setAccountId] = useState('')
  const [transactionsForId, setTransactionsForId] =
    useState<Array<TransactionResponse>>()

  const [requestStatus, setRequestStatus] =
    useState<RequestStatusOptions>('idle')

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  return (
    <>
      <div className="sectionContainer">
        <h3>Search for transactions for an account</h3>
        <input
          type="text"
          value={accountId}
          placeholder="ccc3a91d-449c-41ff-a6fe-d79001431e4f"
          onChange={(e) => setAccountId(e.target.value)}
        ></input>
        <button
          onClick={() => {
            const validateInput = validateAccountId(accountId)
            if (validateInput) {
              setErrorMessage(validateInput)
              setRequestStatus('error')
            } else {
              setRequestStatus('fetching')
              api
                .get(`accounts/${accountId}/transactions`)
                .json<Array<TransactionResponse>>()
                .then((data) => {
                  setTransactionsForId(data)
                  setRequestStatus('success')
                })
                .catch((e) => {
                  setRequestStatus('error')
                  if (e instanceof HTTPError) {
                    e.response.json().then((e) => setErrorMessage(e.message))
                  }
                  setErrorMessage(e.message)
                })
            }
          }}
        >
          Search
        </button>

        <div className="requestStatus">
          {requestStatus === 'fetching' || requestStatus === 'error' ? (
            <FormStatus
              request={{ status: requestStatus, message: errorMessage }}
            />
          ) : null}
        </div>
        {transactionsForId && requestStatus === 'success' ? (
          <div>
            {transactionsForId?.map((transaction, i) => (
              <div key={i} className="singleTransaction">
                <div>Id: {transaction?.id}</div>
                <div>Note: {transaction?.note}</div>
                {transaction?.target_account_id ? (
                  <div>Target account: {transaction.target_account_id}</div>
                ) : null}
                <div>Amount: {transaction?.amount_money.amount}</div>
                <div>{transaction?.amount_money.currency}</div>
              </div>
            ))}
          </div>
        ) : null}
        {transactionsForId?.length === 0 && requestStatus === 'success' ? (
          <h4>No transactions found</h4>
        ) : null}
      </div>
    </>
  )
}

export default GetTransactionsId
