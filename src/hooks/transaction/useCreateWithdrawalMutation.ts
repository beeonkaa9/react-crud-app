import { HTTPError } from 'ky'
import { useMutation, useQueryClient } from 'react-query'
import api from 'utils/api'

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
      if (setMessage) setMessage('Withdrawal successfully submitted!')
    },
  })
}

export default useCreateWithdrawalMutation
