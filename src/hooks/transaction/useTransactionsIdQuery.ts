import { useQuery } from 'react-query'
import api from 'utils/api'

const getTransactionsForId = (accountId: string) =>
  api
    .get(`accounts/${accountId}/transactions`)
    .json<Array<TransactionResponse>>()

const useTransactionsIdQuery = (accountId: string) => {
  return useQuery(
    ['transaction', accountId],
    () => getTransactionsForId(accountId),
    {
      enabled: !!accountId,
    }
  )
}

export default useTransactionsIdQuery
