import { useQuery } from 'react-query'
import api from 'utils/api'
import handleAPIError from 'utils/handleAPIError'

const getTransactionsForId = (accountId: string) =>
  api
    .get(`accounts/${accountId}/transactions`)
    .json<Array<TransactionResponse>>()

const useTransactionsIdQuery = (
  accountId: string,
  setErrorMessage?: React.Dispatch<React.SetStateAction<string | null>>
) => {
  return useQuery(
    ['transaction', accountId],
    () => getTransactionsForId(accountId),
    {
      enabled: !!accountId,
      onError: (err) => {
        if (setErrorMessage) handleAPIError(err, setErrorMessage)
      },
      onSuccess: () => {
        if (setErrorMessage) setErrorMessage(null)
      },
    }
  )
}

export default useTransactionsIdQuery
