import FormStatus from 'components/FormStatus'
import useGetAllTransactionsQuery from 'hooks/transaction/useGetAllTransactionsQuery'
import { HTTPError } from 'ky'
import React, { useEffect, useState } from 'react'

const GetAllTransactions = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const getAllTransactions = useGetAllTransactionsQuery()

  useEffect(() => {
    if (getAllTransactions.isError) {
      if (getAllTransactions.error instanceof HTTPError) {
        // getAccountId.error.response
        //   .json()
        //   .then((e) => setErrorMessage(e.message))
        setErrorMessage(getAllTransactions.error.message)
      } else if (getAllTransactions.error instanceof Error) {
        setErrorMessage(getAllTransactions.error.message)
      }
    }
  }, [getAllTransactions.isError])

  return (
    <div className="sectionContainer">
      <h2>View all transactions</h2>
      <button onClick={() => getAllTransactions.refetch()}>
        Get transactions
      </button>
      <div className="requestStatus">
        {/* {requestStatus === 'fetching' || requestStatus === 'error' ? (
          <FormStatus
            request={{ status: requestStatus, message: errorMessage }}
          />
        ) : null} */}
        {getAllTransactions.isLoading ? (
          <div className="loading">Please wait...</div>
        ) : errorMessage != null ? (
          <div className="error">An error occurred: {errorMessage}</div>
        ) : null}
      </div>

      <div>
        {getAllTransactions.isSuccess ? (
          <div>
            {getAllTransactions.data?.map((transaction, i) => (
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
        {getAllTransactions.data?.length === 0 &&
        getAllTransactions.isSuccess ? (
          <h4>No transactions found</h4>
        ) : null}
      </div>
    </div>
  )
}

export default GetAllTransactions
