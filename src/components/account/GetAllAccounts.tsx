import React, { useState } from 'react'
import getRequestStatus from '../../utils/getRequestStatus'

const GetAllAccounts = () => {
  const [accounts, setAccounts] = useState<Array<AccountProps>>()

  const [requestStatus, setRequestStatus] = useState<
    'fetching' | 'error' | 'idle' | 'success'
  >('idle')

  const [errorMessage, setErrorMessage] = useState(null)

  const getAccounts = () => {
    setRequestStatus('fetching')
    fetch('https://nestjs-bank-app.herokuapp.com/accounts')
      .then((res) => {
        if (!res.ok) {
          setRequestStatus('error')
          throw Error(res.statusText)
        }
        setRequestStatus('success')
        return res.json()
      })
      .then((data) => {
        setAccounts(data)
      })
      .catch((e) => {
        setErrorMessage(e.message)
      })
  }

  return (
    <div className="sectionContainer">
      <h3>View all accounts</h3>
      <button className="accountGetButton" onClick={getAccounts}>
        Get all accounts
      </button>
      <div>
        <div className="requestStatus">
          {getRequestStatus(requestStatus, errorMessage)}
        </div>
        <div>
          {accounts != undefined && accounts.length === 0 ? (
            <h4>No accounts found</h4>
          ) : (
            <>
              {accounts?.map((account, i) => (
                <div key={i} className="singleAccount">
                  <div>Id: {account.id}</div>
                  <div>
                    Name: {account.given_name} {account.family_name}
                  </div>
                  <div>Email: {account.email_address}</div>
                  <div>
                    Balance: {account.balance.amount} {account.balance.currency}
                  </div>
                  <div>Note: {account.note}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default GetAllAccounts
