import React from 'react'
import CreateAccount from './CreateAccount'
import DeleteAccount from './DeleteAccount'
import GetAccountId from './GetAccountId'
import GetAllAccounts from './GetAllAccounts'

const Account = () => {
  return (
    <div className="PageSection">
      <h1 className="sectionHeader">Account Actions</h1>
      <CreateAccount />
      <GetAccountId />
      <GetAllAccounts />
      <DeleteAccount />
    </div>
  )
}

export default Account
