import useAccountIdQuery from 'hooks/account/useAccountIdQuery'
import React, { useState } from 'react'
import validateAccountId from 'utils/validateAccountId'

const GetAccountId = () => {
  const [accountId, setAccountId] = useState('')
  const [submittedAccountId, setSubmittedAccountId] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const getAccountId = useAccountIdQuery(submittedAccountId, setErrorMessage)

  return (
    <div className="sectionContainer">
      <h3>Search for an account</h3>
      <input
        type="text"
        value={accountId}
        placeholder="9e28507a-632f-44a6-99a7-98695cf2adcf"
        onChange={(e) => setAccountId(e.target.value)}
      />
      <button
        onClick={() => {
          const validateInput = validateAccountId(accountId)
          if (validateInput) {
            setErrorMessage(validateInput)

            //to prevent fetching/refetching with invalid uuid
            setSubmittedAccountId('')
          } else {
            setSubmittedAccountId(accountId)
            setErrorMessage(null)
          }
        }}
      >
        Search
      </button>

      <div className="requestStatus">
        {getAccountId.isLoading ? (
          <div className="loading">Please wait...</div>
        ) : errorMessage !== null ? (
          <div className="error">An error occurred: {errorMessage}</div>
        ) : null}
      </div>

      {getAccountId.isSuccess ? (
        <div className="singleAccount">
          <div>Id: {getAccountId.data?.id}</div>
          <div>
            Name: {getAccountId.data?.given_name}{' '}
            {getAccountId.data?.family_name}
          </div>
          <div>Email: {getAccountId.data?.email_address}</div>
          <div>
            Balance: {getAccountId.data?.balance.amount}{' '}
            {getAccountId.data?.balance.currency}
          </div>
          <div>Note: {getAccountId.data?.note}</div>
        </div>
      ) : null}
    </div>
  )
}

export default GetAccountId
