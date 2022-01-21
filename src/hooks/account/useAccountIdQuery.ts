import { useQuery } from 'react-query'
import api from 'utils/api'

const getAccountById = (accountId: string) =>
  api.get(`accounts/${accountId}`).json<AccountResponse>()

const useAccountIdQuery = (accountId: string) => {
  return useQuery(['account', accountId], () => getAccountById(accountId), {
    enabled: !!accountId,
  })
}

export default useAccountIdQuery
