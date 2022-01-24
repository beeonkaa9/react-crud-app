import { HTTPError } from 'ky'
import { useQuery } from 'react-query'
import api from 'utils/api'

const getAllTransactions = () =>
  api.get('transactions').json<Array<TransactionResponse>>()

const useAllTransactionsQuery = (
  setErrorMessage?: React.Dispatch<React.SetStateAction<string | null>>
) => {
  return useQuery('transactions', () => getAllTransactions(), {
    enabled: false,
    onError: (err) => {
      if (err instanceof HTTPError) {
        const errorResponse = err.response.clone()
        if (setErrorMessage)
          errorResponse.json().then((e) => setErrorMessage(e.message))
      } else if (err instanceof Error) {
        if (setErrorMessage) setErrorMessage(err.message)
      }
    },
  })
}

export default useAllTransactionsQuery
