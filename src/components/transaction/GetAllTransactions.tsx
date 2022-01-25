import FormStatus from 'components/FormStatus'
import useAllTransactionsQuery from 'hooks/transaction/useAllTransactionsQuery'
import React, { useState } from 'react'

const GetAllTransactions = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const getAllTransactions = useAllTransactionsQuery(setErrorMessage)

  return (
    <div className="sectionContainer">
      <h2>View all transactions</h2>
      <button onClick={() => getAllTransactions.refetch()}>
        Get transactions
      </button>
      <div className="requestStatus">
        {getAllTransactions.isLoading || getAllTransactions.isError ? (
          <FormStatus
            request={{
              status: getAllTransactions.status,
              message: errorMessage,
            }}
          />
        ) : null}
      </div>

      <div>
        {getAllTransactions.isSuccess &&
        getAllTransactions.isFetchedAfterMount ? (
          getAllTransactions.data?.length === 0 ? (
            <h4>No transactions found</h4>
          ) : (
            getAllTransactions.data?.map((transaction, i) => (
              <div key={i} className="singleTransaction">
                <div>Id: {transaction?.id}</div>
                <div>Note: {transaction?.note}</div>
                {transaction?.target_account_id ? (
                  <div>Target account: {transaction.target_account_id}</div>
                ) : null}
                <div>Amount: {transaction?.amount_money.amount}</div>
                <div>{transaction?.amount_money.currency}</div>
              </div>
            ))
          )
        ) : null}
      </div>
    </div>
  )
}

export default GetAllTransactions
