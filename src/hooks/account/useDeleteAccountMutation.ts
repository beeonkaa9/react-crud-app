import { useMutation } from 'react-query'
import api from 'utils/api'

const deleteAccount = (accountId: string) =>
  api
    .delete(`accounts/${accountId}`)
    //200 HTTP code for delete results in 'unexpected end of JSON input' error, so it must be text
    .text()

const useDeleteAccountMutation = () => {
  return useMutation(deleteAccount)
}

export default useDeleteAccountMutation
