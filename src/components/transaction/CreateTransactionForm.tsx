import useCreateDepositMutation from 'hooks/transaction/useCreateDepositMutation'
import useCreateTransferMutation from 'hooks/transaction/useCreateTransferMutation'
import useCreateWithdrawalMutation from 'hooks/transaction/useCreateWithdrawalMutation'
import React, { useEffect, useState } from 'react'
import validateCreateTransaction from 'utils/validateCreateTransaction'
import { TransactionType } from './Transaction'

const formInitialState = {
  id: '',
  note: '',
  targetAccount: '',
  amount: '',
  currency: '',
}

const CreateTransactionForm = ({
  buttonClicked,
}: {
  buttonClicked: Exclude<TransactionType, 'none'>
}) => {
  const [formInput, setFormInput] = useState(formInitialState)
  //for error and success messages
  const [message, setMessage] = useState<string | null>(null)
  const [formValidationErrors, setFormValidationErrors] = useState<
    string[] | null
  >(null)

  //since all the transactions share one form, it must be reset before doing another form (ex. withdraw then add)
  useEffect(() => {
    setFormInput(formInitialState)
    setFormValidationErrors(null)
    addMoney.reset()
    withdrawMoney.reset()
    transferMoney.reset()
  }, [buttonClicked])

  const addMoney = useCreateDepositMutation({
    setMessage,
    successMessage: 'Deposit successfully submitted!',
  })
  const withdrawMoney = useCreateWithdrawalMutation({
    setMessage,
    successMessage: 'Withdrawal successfully submitted!',
  })
  const transferMoney = useCreateTransferMutation({
    setMessage,
    successMessage: 'Transfer successfully submitted!',
  })

  return (
    <div className="TransactionForm">
      <form className="transactionCreationForm">
        <label>Account Id</label>
        <input
          type="text"
          value={formInput.id}
          placeholder="9e28507a-632f-44a6-99a7-98695cf2adcf"
          onChange={(e) => setFormInput({ ...formInput, id: e.target.value })}
        ></input>

        <label>Note</label>
        <input
          type="text"
          value={formInput.note}
          placeholder="rent money"
          onChange={(e) => setFormInput({ ...formInput, note: e.target.value })}
        ></input>
        {buttonClicked === 'send' ? (
          <>
            <label>Account to send money to</label>
            <input
              type="text"
              value={formInput.targetAccount}
              placeholder="ccc3a91d-449c-41ff-a6fe-d79001431e4f"
              onChange={(e) =>
                setFormInput({ ...formInput, targetAccount: e.target.value })
              }
            ></input>
          </>
        ) : null}

        <label>Amount</label>
        <input
          type="text"
          value={formInput.amount}
          placeholder="300"
          onChange={(e) =>
            setFormInput({ ...formInput, amount: e.target.value })
          }
        ></input>

        <label>Currency</label>
        <input
          type="text"
          value={formInput.currency}
          placeholder="USD"
          onChange={(e) =>
            setFormInput({ ...formInput, currency: e.target.value })
          }
        ></input>
      </form>

      {buttonClicked === 'add' ? (
        <button
          onClick={() => {
            addMoney.reset()
            const validateForm = validateCreateTransaction(
              formInput,
              buttonClicked
            )
            const validationErrors = Object.values(validateForm).filter(
              (error) => error !== ''
            )
            if (validationErrors.length !== 0) {
              setFormValidationErrors(validationErrors)
            } else {
              setFormValidationErrors(null)
              addMoney.mutate(
                {
                  id: formInput.id,
                  note: formInput.note,
                  amount: formInput.amount,
                  currency: formInput.currency,
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
          Add money
        </button>
      ) : null}

      {buttonClicked === 'withdraw' ? (
        <button
          onClick={() => {
            withdrawMoney.reset()
            const validateForm = validateCreateTransaction(
              formInput,
              buttonClicked
            )
            const validationErrors = Object.values(validateForm).filter(
              (error) => error !== ''
            )
            if (validationErrors.length !== 0) {
              setFormValidationErrors(validationErrors)
            } else {
              setFormValidationErrors(null)
              withdrawMoney.mutate(
                {
                  id: formInput.id,
                  note: formInput.note,
                  amount: formInput.amount,
                  currency: formInput.currency,
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
          Make withdrawal
        </button>
      ) : null}

      {buttonClicked === 'send' ? (
        <button
          onClick={() => {
            transferMoney.reset()
            const validateForm = validateCreateTransaction(
              formInput,
              buttonClicked
            )
            const validationErrors = Object.values(validateForm).filter(
              (error) => error !== ''
            )
            if (validationErrors.length !== 0) {
              setFormValidationErrors(validationErrors)
            } else {
              setFormValidationErrors(null)
              transferMoney.mutate(
                {
                  id: formInput.id,
                  note: formInput.note,
                  targetAccount: formInput.targetAccount,
                  amount: formInput.amount,
                  currency: formInput.currency,
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
