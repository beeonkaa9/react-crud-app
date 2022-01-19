import { useMutation } from 'react-query'
import api from 'utils/api'

type TransferMoneyFormInput = {
  id: string
  note: string
  targetAccount: string
  amount: string
  currency: string
}

const transferMoney = async (formInput: TransferMoneyFormInput) => {
  return await api
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
}

const useCreateTransferMutation = () => {
  return useMutation(transferMoney)
}

export default useCreateTransferMutation
