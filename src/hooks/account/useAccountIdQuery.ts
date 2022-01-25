import { useQuery } from 'react-query'
import api from 'utils/api'
import handleAPIError from 'utils/handleAPIError'

const getAccountById = (accountId: string) =>
  api.get(`accounts/${accountId}`).json<AccountResponse>()

const useAccountIdQuery = (
  accountId: string,
  setErrorMessage?: React.Dispatch<React.SetStateAction<string | null>>
) => {
  return useQuery(['account', accountId], () => getAccountById(accountId), {
    enabled: !!accountId,
    onError: (err) => {
      if (setErrorMessage) handleAPIError(err, setErrorMessage)
    },
    onSuccess: () => {
      setErrorMessage?.(null)
    },
  })
}

export default useAccountIdQuery
