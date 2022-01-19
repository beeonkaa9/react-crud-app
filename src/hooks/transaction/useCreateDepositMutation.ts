import { useMutation } from 'react-query'
import api from 'utils/api'

type AddMoneyFormInput = {
  id: string
  note: string
  amount: string
  currency: string
}

const addMoney = async (formInput: AddMoneyFormInput) => {
  return await api
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
}

const useCreateDepositMutation = () => {
  return useMutation(addMoney)
}

export default useCreateDepositMutation
