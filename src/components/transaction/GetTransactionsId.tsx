import FormStatus from 'components/FormStatus'
import useGetTransactionsIdQuery from 'hooks/transaction/useGetTransactionsIdQuery'
import { HTTPError } from 'ky'
import React, { useEffect, useState } from 'react'
import validateAccountId from 'utils/validateAccountId'

const GetTransactionsId = () => {
  const [accountId, setAccountId] = useState('')
  const [submittedAccountId, setSubmittedAccountId] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const getTransactionsForId = useGetTransactionsIdQuery(submittedAccountId)

  useEffect(() => {
    if (getTransactionsForId.isError) {
      if (getTransactionsForId.error instanceof HTTPError) {
        const errorResponse = getTransactionsForId.error.response.clone()
        errorResponse.json().then((e) => setErrorMessage(e.message))
      } else if (getTransactionsForId.error instanceof Error) {
        setErrorMessage(getTransactionsForId.error.message)
      }
    }
  }, [getTransactionsForId.isError])

  return (
    <>
      <div className="sectionContainer">
        <h3>Search for transactions for an account</h3>
        <input
          type="text"
          value={accountId}
          placeholder="ccc3a91d-449c-41ff-a6fe-d79001431e4f"
          onChange={(e) => setAccountId(e.target.value)}
        />
        <button
          onClick={() => {
            const validateInput = validateAccountId(accountId)
            if (validateInput) {
              setErrorMessage(validateInput)

              //to prevent fetching/refetching with invalid uuid
              setSubmittedAccountId('')
            } else {
              setSubmittedAccountId(accountId)
              //must refetch since transaction won't show up if it is searched for,
              //created, then searched for again; stays stuck on
              //"No transactions found" unless manually refetched
              getTransactionsForId.refetch()
              setErrorMessage(null)
            }
          }}
        >
          Search
        </button>

        <div className="requestStatus">
          {/* {requestStatus === 'fetching' || requestStatus === 'error' ? (
            <FormStatus
              request={{ status: requestStatus, message: errorMessage }}
            />
          ) : null} */}
          {getTransactionsForId.isLoading ? (
            <div className="loading">Please wait...</div>
          ) : errorMessage != null ? (
            <div className="error">An error occurred: {errorMessage}</div>
          ) : null}
        </div>

        {getTransactionsForId.isSuccess ? (
          <div>
            {getTransactionsForId.data?.map((transaction, i) => (
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
        {getTransactionsForId.data?.length === 0 &&
        getTransactionsForId.isSuccess ? (
          <h4>No transactions found</h4>
        ) : null}
      </div>
    </>
  )
}

export default GetTransactionsId
