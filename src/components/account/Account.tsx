import React, { useState } from 'react'
import CreateAccount from './CreateAccount'
import GetAccountId from './GetAccountId'
import GetAllAccounts from './GetAllAccounts'

const Account = () => {
  // for form
  const [id, setId] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [balance, setBalance] = useState({ amount: '', currency: '' })
  const [note, setNote] = useState('')

  return (
    <>
      <div className="accountForm">
        <form className="accountCreationForm">
          <label>Account id</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          ></input>

          <label>First name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></input>

          <label>Last name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></input>

          <label>Email address</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <label>Balance</label>
          <label>Amount</label>
          <input
            type="text"
            value={balance.amount}
            onChange={(e) => setBalance({ ...balance, amount: e.target.value })}
          ></input>

          <label>Currency</label>
          <input
            type="text"
            value={balance.currency}
            onChange={(e) =>
              setBalance({ ...balance, currency: e.target.value })
            }
          ></input>

          <label>Note</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></input>
        </form>

        <CreateAccount
          id={id}
          firstName={firstName}
          lastName={lastName}
          email={email}
          balance={balance}
          note={note}
        />
      </div>

      <GetAllAccounts />

      <GetAccountId />
    </>
  )
}

export default Account
