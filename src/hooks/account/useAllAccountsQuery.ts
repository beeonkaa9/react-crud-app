import { useQuery } from 'react-query'
import api from 'utils/api'

const getAllAccounts = () => api.get('accounts').json<Array<AccountResponse>>()

const useAllAccountsQuery = () => {
  return useQuery('accounts', () => getAllAccounts(), { enabled: false })
}

export default useAllAccountsQuery
