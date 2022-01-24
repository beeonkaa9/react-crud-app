import { HTTPError } from 'ky'
import { useMutation, useQueryClient } from 'react-query'
import api from 'utils/api'

type AddMoneyFormInput = {
  id: string
  note: string
  amount: string
  currency: string
}

const addMoney = (formInput: AddMoneyFormInput) =>
  api
    .post(`accounts/${formInput.id}/transactions/add`, {
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

const useCreateDepositMutation = ({
  setMessage,
}: {
  setMessage?: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  const queryClient = useQueryClient()

  return useMutation(addMoney, {
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
      if (setMessage) setMessage('Deposit successfully submitted!')
    },
  })
}

export default useCreateDepositMutation
