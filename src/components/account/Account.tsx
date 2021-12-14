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
      <div className="CreateAccount">
        <h2>Create An Account</h2>
        <form className="accountCreationForm">
          <label>Account id</label>
          <input
            type="text"
            value={id}
            placeholder="914e8480-263e-4f99-8ce5-6e0a0f3621a7"
            onChange={(e) => setId(e.target.value)}
          ></input>

          <label>First name</label>
          <input
            type="text"
            value={firstName}
            placeholder="Jane"
            onChange={(e) => setFirstName(e.target.value)}
          ></input>

          <label>Last name</label>
          <input
            type="text"
            value={lastName}
            placeholder="Johnson"
            onChange={(e) => setLastName(e.target.value)}
          ></input>

          <label>Email address</label>
          <input
            type="text"
            value={email}
            placeholder="janejo@mailator.com"
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <label>Amount</label>
          <input
            type="text"
            value={balance.amount}
            placeholder="400"
            onChange={(e) => setBalance({ ...balance, amount: e.target.value })}
          ></input>

          <label>Currency</label>
          <input
            type="text"
            value={balance.currency}
            placeholder="USD"
            onChange={(e) =>
              setBalance({ ...balance, currency: e.target.value })
            }
          ></input>

          <label>Note</label>
          <input
            type="text"
            value={note}
            placeholder="a customer"
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

      <div className="searchAccountsBtns">
        <GetAccountId />
        <GetAllAccounts />
      </div>
    </>
  )
}

export default Account
