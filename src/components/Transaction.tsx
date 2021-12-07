import React, { useState } from 'react'

type AmountMoney = {
  amount: number
  currency: string
}

type TransactionProps = {
  id: string
  note: string
  target_account_id?: string
  amount_money: AmountMoney
}

const Transaction = () => {
  const [transactions, setTransactions] = useState<Array<TransactionProps>>()
  const [accountId, setAccountId] = useState('')
  const [transactionsForId, setTransactionsForId] =
    useState<Array<TransactionProps>>()
  useState<Array<TransactionProps>>()

  const transactionRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: '9e28507a-632f-44a6-99a7-98695cf2adcf',
      note: 'this is a test',
      amount_money: {
        amount: 300,
        currency: 'USD',
      },
    }),
  }

  const sendMoneyRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: 'ccc3a91d-449c-41ff-a6fe-d79001431e4f',
      note: 'this is a test',
      target_account_id: '9e28507a-632f-44a6-99a7-98695cf2adcf',
      amount_money: {
        amount: 100,
        currency: 'USD',
      },
    }),
  }

  //TODO - accept props instead of hardcoding the account id (possibly add text boxes)
  const addTransaction = () => {
    fetch(
      'https://nestjs-bank-app.herokuapp.com/accounts/9e28507a-632f-44a6-99a7-98695cf2adcf/transactions/add',
      transactionRequestOptions
    )
  }

  const withdrawTransaction = () => {
    fetch(
      'https://nestjs-bank-app.herokuapp.com/accounts/9e28507a-632f-44a6-99a7-98695cf2adcf/transactions/withdraw',
      transactionRequestOptions
    )
  }

  const sendMoneyTransaction = () => {
    fetch(
      'https://nestjs-bank-app.herokuapp.com/accounts/ccc3a91d-449c-41ff-a6fe-d79001431e4f/transactions/send',
      sendMoneyRequestOptions
    )
  }

  const getTransactions = () => {
    fetch('https://nestjs-bank-app.herokuapp.com/transactions')
      .then((res) => res.json())
      .then((data) => setTransactions(data))
  }

  const getTransactionsById = () => {
    fetch(
      `https://nestjs-bank-app.herokuapp.com/accounts/${accountId}/transactions`
    )
      .then((res) => res.json())
      .then((data) => setTransactionsForId(data))
  }

  return (
    <>
      <button className="addMoneyButton" onClick={addTransaction}>
        Add money to balance
      </button>

      <button className="withdrawalButton" onClick={withdrawTransaction}>
        Make a withdrawal
      </button>

      <button className="sendMoneyButton" onClick={sendMoneyTransaction}>
        Transfer from one account to another
      </button>

      <button className="getTransactionsButton" onClick={getTransactions}>
        Get transactions
      </button>
      <div>
        <h3>Transactions in system</h3>
        {transactions?.map((transaction, i) => (
          <p key={i}>
            Id: {transaction.id}
            Note: {transaction.note}
            {transaction.target_account_id ? (
              <p>Target account: {transaction.target_account_id}</p>
            ) : null}
            Amount: {transaction.amount_money.amount}{' '}
            {transaction.amount_money.currency}
          </p>
        ))}
      </div>
      <div>
        <h3>Search for transactions for an account</h3>
        <input
          type="text"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
        ></input>
        <button
          className="getTransactionsAccountBtn"
          onClick={getTransactionsById}
        >
          Search
        </button>
        <div>
          <h3>Transactions for account</h3>
          {transactionsForId?.map((transaction, i) => (
            <p key={i}>
              Id: {transaction.id}
              Note: {transaction.note}
              {transaction.target_account_id ? (
                <p>Target account: {transaction.target_account_id}</p>
              ) : null}
              Amount: {transaction.amount_money.amount}
              {transaction.amount_money.currency}
            </p>
          ))}
        </div>
      </div>
    </>
  )
}

export default Transaction
