import { useQuery } from 'react-query'
import api from 'utils/api'

const getAllAccounts = async () => {
  return await api.get('accounts').json<Array<AccountResponse>>()
}

const useGetAllAccountsQuery = () => {
  return useQuery('account', () => getAllAccounts(), { enabled: false })
}

export default useGetAllAccountsQuery
