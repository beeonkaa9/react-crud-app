import { HTTPError } from 'ky'
import { useQuery } from 'react-query'
import api from 'utils/api'

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
        if (err instanceof HTTPError) {
          const errorResponse = err.response.clone()
          if (setErrorMessage)
            errorResponse.json().then((e) => setErrorMessage(e.message))
        } else if (err instanceof Error) {
          if (setErrorMessage) setErrorMessage(err.message)
        }
      },
      onSuccess: () => {
        if (setErrorMessage) setErrorMessage(null)
      },
    }
  )
}

export default useTransactionsIdQuery
