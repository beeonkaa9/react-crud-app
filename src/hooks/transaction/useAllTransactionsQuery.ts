import { useQuery } from 'react-query'
import api from 'utils/api'
import handleAPIError from 'utils/handleAPIError'

const getAllTransactions = () =>
  api.get('transactions').json<Array<TransactionResponse>>()

const useAllTransactionsQuery = (
  setErrorMessage?: React.Dispatch<React.SetStateAction<string | null>>
) => {
  return useQuery('transactions', () => getAllTransactions(), {
    enabled: false,
    onError: (err) => {
      if (setErrorMessage) handleAPIError(err, setErrorMessage)
    },
  })
}

export default useAllTransactionsQuery
