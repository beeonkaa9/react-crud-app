import FormStatus from 'components/FormStatus'
import { HTTPError } from 'ky'
import React, { useState } from 'react'
import api from 'utils/api'

const GetAllAccounts = () => {
  const [accounts, setAccounts] = useState<Array<AccountResponse>>()

  const [requestStatus, setRequestStatus] =
    useState<RequestStatusOptions>('idle')

  const [errorMessage, setErrorMessage] = useState(null)

  const getAccounts = () => {
    setRequestStatus('fetching')
    api
      .get('accounts')
      .json<Array<AccountResponse>>()
      .then((data) => {
        setAccounts(data)
        setRequestStatus('success')
      })
      .catch((e) => {
        setRequestStatus('error')
        if (e instanceof HTTPError) {
          e.response.json().then((e) => setErrorMessage(e.message))
        }
        setErrorMessage(e.message)
      })
  }

  return (
    <div className="sectionContainer">
      <h3>View all accounts</h3>
      <button onClick={getAccounts}>Get all accounts</button>
      <div>
        <div className="requestStatus">
          {requestStatus === 'fetching' || requestStatus === 'error' ? (
            <FormStatus
              request={{ status: requestStatus, message: errorMessage }}
            />
          ) : null}
        </div>
        <div>
          {accounts !== undefined && accounts.length === 0 ? (
            <h4>No accounts found</h4>
          ) : (
            accounts?.map((account, i) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default GetAllAccounts
