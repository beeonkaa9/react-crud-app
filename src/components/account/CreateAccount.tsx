import React, { useState } from 'react'
import validateCreateAccount from 'utils/validateCreateAccount'
import useCreateAccountMutation from 'hooks/account/useCreateAccountMutation'
import FormStatus from 'components/FormStatus'

const formInitialState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  amount: '',
  currency: '',
  note: '',
}

const CreateAccount = () => {
  const [formInput, setFormInput] = useState(formInitialState)

  //for error and success messages
  const [message, setMessage] = useState<string | null>(null)
  const [formValidationErrors, setFormValidationErrors] = useState<
    string[] | null
  >(null)

  const createAccount = useCreateAccountMutation({
    setMessage,
    successMessage: 'Account successfully created!',
  })

  return (
    <div className="CreateAccount">
      <h2>Create An Account</h2>
      <form className="accountCreationForm">
        <label>Account id</label>
        <input
          type="text"
          value={formInput.id || ''}
          placeholder="914e8480-263e-4f99-8ce5-6e0a0f3621a7"
          onChange={(e) => setFormInput({ ...formInput, id: e.target.value })}
        />

        <label>First name</label>
        <input
          type="text"
          value={formInput.firstName}
          placeholder="Jane"
          onChange={(e) =>
            setFormInput({ ...formInput, firstName: e.target.value })
          }
        />

        <label>Last name</label>
        <input
          type="text"
          value={formInput.lastName}
          placeholder="Johnson"
          onChange={(e) =>
            setFormInput({ ...formInput, lastName: e.target.value })
          }
        />

        <label>Email address</label>
        <input
          type="text"
          value={formInput.email}
          placeholder="janejo@mailator.com"
          onChange={(e) =>
            setFormInput({ ...formInput, email: e.target.value })
          }
        />

        <label>Amount</label>
        <input
          type="text"
          value={formInput.amount}
          placeholder="400"
          onChange={(e) =>
            setFormInput({ ...formInput, amount: e.target.value })
          }
        />

        <label>Currency</label>
        <input
          type="text"
          value={formInput.currency}
          placeholder="USD"
          onChange={(e) =>
            setFormInput({ ...formInput, currency: e.target.value })
          }
        />

        <label>Note</label>
        <input
          type="text"
          value={formInput.note}
          placeholder="a customer"
          onChange={(e) => setFormInput({ ...formInput, note: e.target.value })}
        />
      </form>

      <button
        type="submit"
        className="createAccountBtn"
        onClick={() => {
          createAccount.reset()
          const validateForm = validateCreateAccount(formInput)
          const validationErrors = Object.values(validateForm).filter(
            (error) => error !== ''
          )
          if (validationErrors.length !== 0) {
            setFormValidationErrors(validationErrors)
          } else {
            setFormValidationErrors(null)
            createAccount.mutate(
              {
                firstName: formInput.firstName,
                lastName: formInput.lastName,
                email: formInput.email,
                id: formInput.id,
                amount: formInput.amount,
                currency: formInput.currency,
                note: formInput.note,
              },
              {
                onSuccess: () => {
                  setFormInput(formInitialState)
                },
              }
            )
          }
        }}
      >
        Create Account
      </button>

      <div className="requestStatus">
        <FormStatus
          request={{ status: createAccount.status, message }}
          validationErrors={formValidationErrors}
        />
      </div>
    </div>
  )
}

export default CreateAccount
