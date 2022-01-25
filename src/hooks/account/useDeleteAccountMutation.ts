import { useMutation } from 'react-query'
import api from 'utils/api'
import handleAPIError from 'utils/handleAPIError'

const deleteAccount = (accountId: string) =>
  api
    .delete(`accounts/${accountId}`)
    //200 HTTP code for delete results in 'unexpected end of JSON input' error, so it must be text
    .text()

const useDeleteAccountMutation = ({
  setMessage,
}: {
  setMessage?: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  return useMutation(deleteAccount, {
    onError: (err) => {
      if (setMessage) handleAPIError(err, setMessage)
    },
    onSuccess: () => {
      setMessage?.('Account successfully deleted!')
    },
  })
}

export default useDeleteAccountMutation
