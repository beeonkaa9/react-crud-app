import FormStatus from 'components/FormStatus'
import { HTTPError } from 'ky'
import React, { useState } from 'react'
import api from 'utils/api'
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
            api
              .delete(`accounts/${accountId}`)
              //200 HTTP code for delete results in 'unexpected end of JSON input' error, so it must be text
              .text()
              .then(() => {
                setRequestStatus('success')
                setMessage('Deletion successful!')
                setAccountId('')
              })
              .catch((e) => {
                setRequestStatus('error')
                if (e instanceof HTTPError) {
                  e.response.json().then((e) => setMessage(e.message))
                }
                setMessage(e.message)
              })
          }
        }}
      >
        Delete account
      </button>

      <div className="requestStatus">
        <FormStatus request={{ status: requestStatus, message }} />
      </div>
    </div>
  )
}

export default DeleteAccount
