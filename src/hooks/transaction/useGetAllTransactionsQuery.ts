import { useQuery } from 'react-query'
import api from 'utils/api'

const getAllTransactions = async () => {
  return api.get('transactions').json<Array<TransactionResponse>>()
}

const useGetAllTransactionsQuery = () => {
  return useQuery('transaction', () => getAllTransactions(), { enabled: false })
}

export default useGetAllTransactionsQuery
