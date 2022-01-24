import { HTTPError } from 'ky'
import { useMutation, useQueryClient } from 'react-query'
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
}: {
  setMessage?: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  const queryClient = useQueryClient()

  return useMutation(createAccount, {
    onError: (err) => {
      if (err instanceof HTTPError) {
        const errorResponse = err.response.clone()
        if (setMessage) errorResponse.json().then((e) => setMessage(e.message))
      } else if (err instanceof Error) {
        if (setMessage) setMessage(err.message)
      }
    },
    onSuccess: (_, formInput) => {
      queryClient.invalidateQueries('accounts')
      queryClient.invalidateQueries(['account', formInput.id])
      if (setMessage) setMessage('Account successfully created!')
    },
  })
}

export default useCreateAccountMutation
