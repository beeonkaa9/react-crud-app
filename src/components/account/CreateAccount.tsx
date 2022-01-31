import React, { useState } from 'react'
import useCreateAccountMutation from 'hooks/account/useCreateAccountMutation'
import FormStatus from 'components/FormStatus'
import { useForm } from 'react-hook-form'

type FormData = {
  id: string
  firstName: string
  lastName: string
  email: string
  amount: string
  currency: string
  note: string
}

const CreateAccount = () => {
  //for error and success messages
  const [message, setMessage] = useState<string | null>(null)

  const createAccount = useCreateAccountMutation({ setMessage })

  const {
    register,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onBlur',
  })
  const values = getValues()

  return (
    <div className="CreateAccount">
      <h2>Create An Account</h2>
      <form className="accountCreationForm">
        <label>Account id</label>
        <input
          {...register('id', {
            required: 'Account id is required',
            pattern: {
              value:
                /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
              message: 'Account id must be UUID',
            },
          })}
          placeholder="914e8480-263e-4f99-8ce5-6e0a0f3621a7"
        />
        {errors.id && (
          <div className="formValidationError">{errors.id.message}</div>
        )}

        <label>First name</label>
        <input
          {...register('firstName', {
            required: 'First name is required',
            pattern: {
              value: /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i,
              message:
                'First name must only contain letters, hyphens, and spaces',
            },
          })}
          placeholder="Peter"
        />
        {errors.firstName && (
          <div className="formValidationError">{errors.firstName.message}</div>
        )}

        <label>Last name</label>
        <input
          {...register('lastName', {
            required: 'Last name is required',
            pattern: {
              value: /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i,
              message:
                'Last name must only contain letters, hyphens, and spaces',
            },
          })}
          placeholder="Kent"
        />
        {errors.lastName && (
          <div className="formValidationError">{errors.lastName.message}</div>
        )}

        <label>Email</label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Email is not valid',
            },
          })}
          placeholder="peterk@mailinator.com"
        />
        {errors.email && (
          <div className="formValidationError">{errors.email.message}</div>
        )}

        <label>Amount</label>
        <input
          {...register('amount', {
            required: 'Amount is required',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Amount must be a number',
            },
            min: {
              value: 1,
              message: 'Amount must be more than 0',
            },
          })}
          placeholder="399"
        />
        {errors.amount && (
          <div className="formValidationError">{errors.amount.message}</div>
        )}

        <label>Currency</label>
        <input
          {...register('currency', {
            required: 'Currency is required',
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: 'Currency must only contain letters',
            },
          })}
          placeholder="USD"
        />
        {errors.currency && (
          <div className="formValidationError">{errors.currency.message}</div>
        )}

        <label>Note</label>
        <input
          {...register('note', { required: 'Note is required' })}
          placeholder="savings account"
        />
        {errors.note && (
          <div className="formValidationError">{errors.note.message}</div>
        )}
      </form>

      <button
        type="submit"
        className="createAccountBtn"
        onClick={() => {
          if (isValid) {
            createAccount.mutate(
              {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                id: values.id,
                amount: values.amount,
                currency: values.currency,
                note: values.note,
              },
              {
                onSuccess: () => {
                  reset()
                },
              }
            )
          }
        }}
      >
        Create Account
      </button>

      <div className="requestStatus">
        <FormStatus request={{ status: createAccount.status, message }} />
      </div>
    </div>
  )
}

export default CreateAccount
