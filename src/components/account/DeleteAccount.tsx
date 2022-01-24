import FormStatus from 'components/FormStatus'
import useDeleteAccountMutation from 'hooks/account/useDeleteAccountMutation'
import React, { useState } from 'react'
import validateAccountId from 'utils/validateAccountId'

const DeleteAccount = () => {
  const [accountId, setAccountId] = useState('')

  //for error and success messages from mutation
  const [message, setMessage] = useState<string | null>(null)
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  )

  const deleteAccount = useDeleteAccountMutation({
    setMessage,
    successMessage: 'Account successfully deleted!',
  })

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
          deleteAccount.reset()
          const validateInput = validateAccountId(accountId)
          if (validateInput) {
            setValidationMessage(validateInput)
          } else {
            setValidationMessage(null)
            deleteAccount.mutate(accountId)
          }
        }}
      >
        Delete account
      </button>

      <div className="requestStatus">
        <FormStatus request={{ status: deleteAccount.status, message }} />
        {validationMessage !== null && (
          <div className="error">{validationMessage}</div>
        )}
      </div>
    </div>
  )
}

export default DeleteAccount
