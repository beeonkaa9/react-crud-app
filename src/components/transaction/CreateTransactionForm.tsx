import useCreateDepositMutation from 'hooks/transaction/useCreateDepositMutation'
import useCreateTransferMutation from 'hooks/transaction/useCreateTransferMutation'
import useCreateWithdrawalMutation from 'hooks/transaction/useCreateWithdrawalMutation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TransactionType } from './Transaction'

type FormData = {
  id: string
  firstName: string
  lastName: string
  targetId?: string
  email: string
  amount: string
  currency: string
  note: string
}

const CreateTransactionForm = ({
  buttonClicked,
}: {
  buttonClicked: Exclude<TransactionType, 'none'>
}) => {
  //for error and success messages
  const [message, setMessage] = useState<string | null>(null)
  const [formValidationErrors, setFormValidationErrors] = useState<
    string[] | null
  >(null)

  //since all the transactions share one form, it must be reset before doing another form (ex. withdraw then add)
  useEffect(() => {
    reset()
    setFormValidationErrors(null)
    addMoney.reset()
    withdrawMoney.reset()
    transferMoney.reset()
  }, [buttonClicked])

  const addMoney = useCreateDepositMutation({ setMessage })
  const withdrawMoney = useCreateWithdrawalMutation({ setMessage })
  const transferMoney = useCreateTransferMutation({ setMessage })

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
    <div className="TransactionForm">
      <form className="transactionCreationForm">
        <label>Account Id</label>
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

        <label>Note</label>
        <input
          {...register('note', { required: 'Note is required' })}
          placeholder="savings account"
        />
        {errors.note && (
          <div className="formValidationError">{errors.note.message}</div>
        )}

        {buttonClicked === 'send' ? (
          <>
            <label>Account to send money to</label>
            <input
              {...register('targetId', {
                required: 'Account id is required',
                pattern: {
                  value:
                    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
                  message: 'Target account id must be UUID',
                },
              })}
              placeholder="914e8480-263e-4f99-8ce5-6e0a0f3621a7"
            />
            {errors.targetId && (
              <div className="formValidationError">
                {errors.targetId.message}
              </div>
            )}
          </>
        ) : null}

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
      </form>

      {buttonClicked === 'add' ? (
        <button
          onClick={() => {
            if (isValid) {
              addMoney.mutate(
                {
                  id: values.id,
                  note: values.note,
                  amount: values.amount,
                  currency: values.currency,
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
          Add money
        </button>
      ) : null}

      {buttonClicked === 'withdraw' ? (
        <button
          onClick={() => {
            if (isValid) {
              withdrawMoney.mutate(
                {
                  id: values.id,
                  note: values.note,
                  amount: values.amount,
                  currency: values.currency,
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
          Make withdrawal
        </button>
      ) : null}

      {buttonClicked === 'send' ? (
        <button
          onClick={() => {
            if (isValid && values.targetId) {
              transferMoney.mutate(
                {
                  id: values.id,
                  note: values.note,
                  targetAccount: values.targetId,
                  amount: values.amount,
                  currency: values.currency,
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
          Transfer money
        </button>
      ) : null}

      <div className="transactionFormStatus">
        {(addMoney.isLoading ||
          withdrawMoney.isLoading ||
          transferMoney.isLoading) && (
          <div className="loading">Please wait...</div>
        )}
        {(addMoney.isSuccess ||
          withdrawMoney.isSuccess ||
          transferMoney.isSuccess) && <div className="success">{message}</div>}

        {(addMoney.isError ||
          withdrawMoney.isError ||
          transferMoney.isError) && (
          <div className="error">An error occurred: {message}</div>
        )}
        {formValidationErrors ? (
          <>
            {formValidationErrors.map((error, i) => (
              <div key={i} className="formErrors">
                <div>{error}</div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  )
}

export default CreateTransactionForm
