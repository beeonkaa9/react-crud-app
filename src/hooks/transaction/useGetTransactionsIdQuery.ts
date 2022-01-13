import { useQuery } from 'react-query'
import api from 'utils/api'

const getTransactionsForId = async (accountId: string) => {
  return await api
    .get(`accounts/${accountId}/transactions`)
    .json<Array<TransactionResponse>>()
}

const useGetTransactionsIdQuery = (accountId: string) => {
  return useQuery(
    ['transaction', accountId],
    () => getTransactionsForId(accountId),
    {
      enabled: !!accountId,
    }
  )
}

export default useGetTransactionsIdQuery
