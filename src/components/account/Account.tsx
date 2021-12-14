import React, { useState } from 'react'
import CreateAccount from './CreateAccount'
import DeleteAccount from './DeleteAccount'
import GetAccountId from './GetAccountId'
import GetAllAccounts from './GetAllAccounts'

const Account = () => {
  // for form

  return (
    <div className="AccountSection">
      <h1 className="accountHeader">Account Actions</h1>
      <CreateAccount />
      <GetAccountId />
      <GetAllAccounts />
      <DeleteAccount />
    </div>
  )
}

export default Account
