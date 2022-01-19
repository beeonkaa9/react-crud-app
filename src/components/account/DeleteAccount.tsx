// import FormStatus from 'components/FormStatus'
import useDeleteAccountMutation from 'hooks/account/useDeleteAccountMutation'
import { HTTPError } from 'ky'
import React, { useState } from 'react'
import validateAccountId from 'utils/validateAccountId'

const DeleteAccount = () => {
  const [accountId, setAccountId] = useState('')

  //for error and success messages
  const [message, setMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const deleteAccount = useDeleteAccountMutation()

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
            setErrorMessage(validateInput)
          } else {
            setErrorMessage('')
            deleteAccount.mutate(accountId, {
              onError: (err) => {
                if (err instanceof HTTPError) {
                  const errorResponse = err.response.clone()
                  errorResponse.json().then((e) => setErrorMessage(e.message))
                } else if (err instanceof Error) {
                  setErrorMessage(err.message)
                }
              },
              onSuccess: () => {
                setMessage('Account successfully deleted!')
              },
            })
          }
        }}
      >
        Delete account
      </button>

      <div className="requestStatus">
        {/* <FormStatus request={{ status: requestStatus, message }} /> */}
        {deleteAccount.isLoading && (
          <div className="loading">Please wait...</div>
        )}
        {deleteAccount.isSuccess && <div className="success">{message}</div>}

        {errorMessage != '' && (
          <div className="error">An error occurred: {errorMessage}</div>
        )}
      </div>
    </div>
  )
}

export default DeleteAccount
