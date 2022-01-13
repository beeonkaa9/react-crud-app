import { useQuery } from 'react-query'
import api from 'utils/api'

const getAccountById = async (accountId: string) => {
  return await api.get(`accounts/${accountId}`).json<AccountResponse>()
}

const useGetAccountIdQuery = (accountId: string) => {
  return useQuery(['account', accountId], () => getAccountById(accountId), {
    enabled: !!accountId,
  })
}

export default useGetAccountIdQuery
