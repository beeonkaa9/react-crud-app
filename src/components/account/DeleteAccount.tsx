import RequestStatus from 'components/RequestStatus'
import React, { useState } from 'react'
import validateAccountId from 'utils/validateAccountId'

const DeleteAccount = () => {
  const [accountId, setAccountId] = useState('')

  //for error and success messages
  const [message, setMessage] = useState<string | null>(null)

  const [requestStatus, setRequestStatus] =
    useState<RequestStatusOptions>('idle')

  return (
    <div className="sectionContainer">
      <h3>Delete an account</h3>
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
            setMessage(validateInput)
            setRequestStatus('error')
          } else {
            setRequestStatus('fetching')
            fetch(
              `https://nestjs-bank-app.herokuapp.com/accounts/${accountId}`,
              {
                method: 'DELETE',
              }
            )
              .then((res) => {
                if (!res.ok) {
                  setRequestStatus('error')
                  throw Error(res.statusText)
                }
                setRequestStatus('success')
                setMessage('Deletion successful!')
              })
              .catch((e) => {
                setMessage(e.message)
              })
          }
        }}
      >
        Delete account
      </button>

      <div className="requestStatus">
        <RequestStatus request={{ status: requestStatus, message: message }} />
      </div>
    </div>
  )
}

export default DeleteAccount
