import { useMutation } from 'react-query'
import api from 'utils/api'

type FormInput = {
  id: string
  firstName: string
  lastName: string
  email: string
  amount: string
  currency: string
  note: string
}

const createAccount = (formInput: FormInput) =>
  api
    .post('accounts', {
      json: {
        given_name: formInput.firstName,
        family_name: formInput.lastName,
        email_address: formInput.email,
        id: formInput.id,
        balance: {
          amount: parseInt(formInput.amount),
          currency: formInput.currency,
        },
        note: formInput.note,
      },
    })
    .text()

const useCreateAccountMutation = () => {
  return useMutation(createAccount)
}

export default useCreateAccountMutation
