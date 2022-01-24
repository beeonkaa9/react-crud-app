import { useQuery } from 'react-query'
import api from 'utils/api'
import handleAPIError from 'utils/handleAPIError'

const getAllAccounts = () => api.get('accounts').json<Array<AccountResponse>>()

const useAllAccountsQuery = (
  setErrorMessage?: React.Dispatch<React.SetStateAction<string | null>>
) => {
  return useQuery('accounts', () => getAllAccounts(), {
    enabled: false,
    onError: (err) => {
      if (setErrorMessage) handleAPIError(err, setErrorMessage)
    },
  })
}

export default useAllAccountsQuery
