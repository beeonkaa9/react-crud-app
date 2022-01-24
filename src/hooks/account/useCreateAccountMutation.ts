import { HTTPError } from 'ky'
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

const useCreateAccountMutation = ({
  setMessage,
  successMessage,
}: {
  setMessage?: React.Dispatch<React.SetStateAction<string | null>>
  successMessage?: string
}) => {
  return useMutation(createAccount, {
    onError: (err) => {
      if (err instanceof HTTPError) {
        const errorResponse = err.response.clone()
        if (setMessage) errorResponse.json().then((e) => setMessage(e.message))
      } else if (err instanceof Error) {
        if (setMessage) setMessage(err.message)
      }
    },
    onSuccess: () => {
      if (setMessage && successMessage) setMessage(successMessage)
    },
  })
}

export default useCreateAccountMutation
