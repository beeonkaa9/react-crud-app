import { useQuery } from 'react-query'
import api from 'utils/api'

const getAllTransactions = () =>
  api.get('transactions').json<Array<TransactionResponse>>()

const useAllTransactionsQuery = () => {
  return useQuery('transactions', () => getAllTransactions(), {
    enabled: false,
  })
}

export default useAllTransactionsQuery
