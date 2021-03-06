import { useMutation, useQueryClient } from 'react-query'
import api from 'utils/api'
import handleAPIError from 'utils/handleAPIError'

type WithdrawMoneyFormInput = {
  id: string
  note: string
  amount: string
  currency: string
}

const withdrawMoney = (formInput: WithdrawMoneyFormInput) =>
  api
    .post(`accounts/${formInput.id}/transactions/withdraw`, {
      json: {
        id: formInput.id,
        note: formInput.note,
        amount_money: {
          amount: parseInt(formInput.amount),
          currency: formInput.currency,
        },
      },
    })
    //201 HTTP code results in 'unexpected end of JSON input' error, so it must be text
    .text()

const useCreateWithdrawalMutation = ({
  setMessage,
}: {
  setMessage?: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  const queryClient = useQueryClient()

  return useMutation(withdrawMoney, {
    onError: (err) => {
      if (setMessage) handleAPIError(err, setMessage)
    },
    onSuccess: (_, formInput) => {
      queryClient.invalidateQueries('transactions')
      queryClient.invalidateQueries(['transaction', formInput.id])
      setMessage?.('Withdrawal successfully submitted!')
    },
  })
}

export default useCreateWithdrawalMutation
