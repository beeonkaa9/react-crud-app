import React, { useState } from 'react'
import CreateTransactionForm from './CreateTransactionForm'
import GetAllTransactions from './GetAllTransactions'
import GetTransactionsId from './GetTransactionsId'

const Transaction = () => {
  const [buttonClicked, setButtonClicked] = useState('none')

  return (
    <>
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
          Transfer from one account to another
        </button>
      </div>

      {buttonClicked != 'none' ? (
        <CreateTransactionForm buttonClicked={buttonClicked} />
      ) : null}

      <div className="searchTransactionsRow">
        <GetAllTransactions />
        <GetTransactionsId />
      </div>
    </>
  )
}
export default Transaction
