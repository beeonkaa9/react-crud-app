import { useMutation } from 'react-query'
import api from 'utils/api'

type WithdrawMoneyFormInput = {
  id: string
  note: string
  amount: string
  currency: string
}

const withdrawMoney = async (formInput: WithdrawMoneyFormInput) => {
  return await api
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
}

const useCreateWithdrawalMutation = () => {
  return useMutation(withdrawMoney)
}

export default useCreateWithdrawalMutation
