import FormStatus from 'components/FormStatus'
import { HTTPError } from 'ky'
import React, { useEffect, useState } from 'react'
import api from 'utils/api'
import validateAccountId from 'utils/validateAccountId'

const GetAccountId = () => {
  const [accountId, setAccountId] = useState('')
  const [accountIdResult, setAccountIdResult] =
    useState<AccountResponse | null>()

  const [requestStatus, setRequestStatus] =
    useState<RequestStatusOptions>('idle')

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
        onClick={() => {
          const validateInput = validateAccountId(accountId)
          if (validateInput) {
            setErrorMessage(validateInput)
            setRequestStatus('error')
          } else {
            setRequestStatus('fetching')
            api
              .get(`accounts/${accountId}`)
              .json<AccountResponse>()
              .then((data) => {
                setAccountIdResult(data)
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
        }}
      >
        Search
      </button>

      <div className="requestStatus">
        {requestStatus === 'fetching' || requestStatus === 'error' ? (
          <FormStatus
            request={{ status: requestStatus, message: errorMessage }}
          />
        ) : null}
      </div>
      {accountIdResult ? (
        <div className="singleAccount">
          <div>Id: {accountIdResult.id}</div>
          <div>
            Name: {accountIdResult.given_name} {accountIdResult.family_name}
          </div>
          <div>Email: {accountIdResult.email_address}</div>
          <div>
            Balance: {accountIdResult.balance.amount}{' '}
            {accountIdResult.balance.currency}
          </div>
          <div>Note: {accountIdResult.note}</div>
        </div>
      ) : null}
    </div>
  )
}

export default GetAccountId
