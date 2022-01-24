import { HTTPError } from 'ky'
import { useMutation, useQueryClient } from 'react-query'
import api from 'utils/api'

type TransferMoneyFormInput = {
  id: string
  note: string
  targetAccount: string
  amount: string
  currency: string
}

const transferMoney = async (formInput: TransferMoneyFormInput) =>
  api
    .post(`accounts/${formInput.id}/transactions/send`, {
      json: {
        id: formInput.id,
        note: formInput.note,
        target_account_id: formInput.targetAccount,
        amount_money: {
          amount: parseInt(formInput.amount),
          currency: formInput.currency,
        },
      },
    })
    //201 HTTP code results in 'unexpected end of JSON input' error, so it must be text
    .text()

const useCreateTransferMutation = ({
  setMessage,
  successMessage,
}: {
  setMessage?: React.Dispatch<React.SetStateAction<string | null>>
  successMessage?: string
}) => {
  const queryClient = useQueryClient()

  return useMutation(transferMoney, {
    onError: (err) => {
      if (err instanceof HTTPError) {
        const errorResponse = err.response.clone()
        if (setMessage) errorResponse.json().then((e) => setMessage(e.message))
      } else if (err instanceof Error) {
        if (setMessage) setMessage(err.message)
      }
    },
    onSuccess: (_, formInput) => {
      queryClient.invalidateQueries('transactions')
      queryClient.invalidateQueries(['transaction', formInput.id])
      if (setMessage && successMessage) setMessage(successMessage)
    },
  })
}

export default useCreateTransferMutation
