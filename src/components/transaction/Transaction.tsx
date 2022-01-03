import React, { useState } from 'react'
import CreateTransactionForm from './CreateTransactionForm'
import GetAllTransactions from './GetAllTransactions'
import GetTransactionsId from './GetTransactionsId'

export type TransactionType = 'none' | 'add' | 'withdraw' | 'send'

const Transaction = () => {
  const [buttonClicked, setButtonClicked] = useState<TransactionType>('none')

  return (
    <div className="PageSection">
      <h1 className="sectionHeader">Transactions</h1>
      <h2>Create a transaction</h2>
      <div className="transactionBtnRow">
        <button onClick={() => setButtonClicked('add')}>
          Add money to balance
        </button>

        <button onClick={() => setButtonClicked('withdraw')}>
          Make a withdrawal
        </button>

        <button onClick={() => setButtonClicked('send')}>
          Transfer money to an account
        </button>
      </div>

      {buttonClicked !== 'none' ? (
        <CreateTransactionForm buttonClicked={buttonClicked} />
      ) : null}

      <GetAllTransactions />
      <GetTransactionsId />
    </div>
  )
}
export default Transaction
