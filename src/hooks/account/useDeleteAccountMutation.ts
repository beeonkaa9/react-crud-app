import { HTTPError } from 'ky'
import { useMutation } from 'react-query'
import api from 'utils/api'

const deleteAccount = (accountId: string) =>
  api
    .delete(`accounts/${accountId}`)
    //200 HTTP code for delete results in 'unexpected end of JSON input' error, so it must be text
    .text()

const useDeleteAccountMutation = ({
  setMessage,
  successMessage,
}: {
  setMessage?: React.Dispatch<React.SetStateAction<string | null>>
  successMessage?: string
}) => {
  return useMutation(deleteAccount, {
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

export default useDeleteAccountMutation
