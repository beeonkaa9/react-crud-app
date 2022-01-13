import FormStatus from 'components/FormStatus'
import RequestStatus from 'components/RequestStatus'
import useGetAccountIdQuery from 'hooks/account/useGetAccountIdQuery'
import { HTTPError } from 'ky'
import React, { useEffect, useState } from 'react'
import validateAccountId from 'utils/validateAccountId'

const GetAccountId = () => {
  const [accountId, setAccountId] = useState('')
  const [submittedAccountId, setSubmittedAccountId] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const getAccountId = useGetAccountIdQuery(submittedAccountId)

  useEffect(() => {
    if (getAccountId.isError) {
      if (getAccountId.error instanceof HTTPError) {
        // getAccountId.error.response
        //   .json()
        //   .then((e) => setErrorMessage(e.message))
        setErrorMessage(getAccountId.error.message)
      } else if (getAccountId.error instanceof Error) {
        setErrorMessage(getAccountId.error.message)
      }
    }
  }, [getAccountId.isError])

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
        ) : errorMessage != null ? (
          <div className="error">An error occurred: {errorMessage}</div>
        ) : null}
        {/* {getAccountId.isLoading ||
        errorMessage != null ||
        getAccountId.isError ? (
          <RequestStatus
            request={{ status: getAccountId.status, message: errorMessage }}
          />
        ) : null} */}
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
