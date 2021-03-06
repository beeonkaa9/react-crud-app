import { useMutation, useQueryClient } from 'react-query'
import api from 'utils/api'
import handleAPIError from 'utils/handleAPIError'

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
}: {
  setMessage?: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  const queryClient = useQueryClient()

  return useMutation(transferMoney, {
    onError: (err) => {
      if (setMessage) handleAPIError(err, setMessage)
    },
    onSuccess: (_, formInput) => {
      queryClient.invalidateQueries('transactions')
      queryClient.invalidateQueries(['transaction', formInput.id])
      setMessage?.('Transfer successfully submitted!')
    },
  })
}

export default useCreateTransferMutation
