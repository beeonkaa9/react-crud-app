import RequestStatus from 'components/RequestStatus'
import React, { useEffect, useState } from 'react'
import validateAccountId from 'utils/validateAccountId'

const GetTransactionsId = () => {
  const [accountId, setAccountId] = useState('')
  const [transactionsForId, setTransactionsForId] =
    useState<Array<TransactionResponse | null>>()

  const [requestStatus, setRequestStatus] =
    useState<RequestStatusOptions>('idle')

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (requestStatus !== 'success') setTransactionsForId([null])
  }, [requestStatus])

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
          className="getTransactionsAccountBtn"
          onClick={() => {
            const validateInput = validateAccountId(accountId)
            if (validateInput) {
              setErrorMessage(validateInput)
              setRequestStatus('error')
            } else {
              setRequestStatus('fetching')
              fetch(
                `https://nestjs-bank-app.herokuapp.com/accounts/${accountId}/transactions`
              )
                .then((res) => {
                  if (!res.ok) {
                    setRequestStatus('error')
                    throw Error(res.statusText)
                  }
                  setRequestStatus('success')
                  return res.json()
                })
                .then((data) => setTransactionsForId(data))
                .catch((e) => setErrorMessage(e.message))
            }
          }}
        >
          Search
        </button>

        <div className="requestStatus">
          {requestStatus === 'fetching' || requestStatus === 'error' ? (
            <RequestStatus
              requestStatus={requestStatus}
              message={errorMessage}
            />
          ) : null}
        </div>
        {transactionsForId?.[0] !== null ? (
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
      </div>
    </>
  )
}

export default GetTransactionsId
