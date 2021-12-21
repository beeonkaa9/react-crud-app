import React, { useState } from 'react'
import CreateTransactionForm from './CreateTransactionForm'
import GetAllTransactions from './GetAllTransactions'
import GetTransactionsId from './GetTransactionsId'

const Transaction = () => {
  const [buttonClicked, setButtonClicked] = useState('none')

  return (
    <div className="TransactionSection">
      <h1 className="transactionHeader">Transactions</h1>
      <h2>Create a transaction</h2>
      <div className="transactionBtnRow">
        <button
          className="addMoneyButton"
          onClick={() => setButtonClicked('add')}
        >
          Add money to balance
        </button>

        <button
          className="withdrawalButton"
          onClick={() => setButtonClicked('withdraw')}
        >
          Make a withdrawal
        </button>

        <button
          className="sendMoneyButton"
          onClick={() => setButtonClicked('send')}
        >
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
