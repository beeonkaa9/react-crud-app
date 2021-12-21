import React, { useEffect, useState } from 'react'
import getRequestStatus from 'utils/getRequestStatus'
import validateAccountId from 'utils/validateAccountId'

const GetAccountId = () => {
  const [accountId, setAccountId] = useState('')
  const [accountIdResult, setAccountIdResult] =
    useState<AccountResponse | null>()

  const [requestStatus, setRequestStatus] = useState<
    'fetching' | 'error' | 'idle' | 'success'
  >('idle')

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (requestStatus !== 'success') setAccountIdResult(null)
  }, [requestStatus])

  return (
    <div className="sectionContainer">
      <h3>Search for an account</h3>
      <input
        type="text"
        value={accountId}
        placeholder="9e28507a-632f-44a6-99a7-98695cf2adcf"
        onChange={(e) => setAccountId(e.target.value)}
      ></input>
      <button
        className="getAccountIdButton"
        onClick={() => {
          const validateInput = validateAccountId(accountId)
          if (validateInput) {
            setErrorMessage(validateInput)
            setRequestStatus('error')
          } else {
            setRequestStatus('fetching')
            fetch(`https://nestjs-bank-app.herokuapp.com/accounts/${accountId}`)
              .then((res) => {
                if (!res.ok) {
                  setRequestStatus('error')
                  throw Error(res.statusText)
                }
                setRequestStatus('success')
                return res.json()
              })
              .then((data) => setAccountIdResult(data))
              .catch((e) => {
                setErrorMessage(e.message)
              })
          }
        }}
      >
        Search
      </button>

      <div className="requestStatus">
        {getRequestStatus(requestStatus, errorMessage)}
      </div>
      {accountIdResult ? (
        <div className="singleAccount">
          <div>Id: {accountIdResult?.id}</div>
          <div>
            Name: {accountIdResult?.given_name} {accountIdResult?.family_name}
          </div>
          <div>Email: {accountIdResult?.email_address}</div>
          <div>
            Balance: {accountIdResult?.balance.amount}{' '}
            {accountIdResult?.balance.currency}
          </div>
          <div>Note: {accountIdResult?.note}</div>
        </div>
      ) : null}
    </div>
  )
}

export default GetAccountId
