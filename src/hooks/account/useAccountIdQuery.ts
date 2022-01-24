import { HTTPError } from 'ky'
import { useQuery } from 'react-query'
import api from 'utils/api'

const getAccountById = (accountId: string) =>
  api.get(`accounts/${accountId}`).json<AccountResponse>()

const useAccountIdQuery = (
  accountId: string,
  setErrorMessage?: React.Dispatch<React.SetStateAction<string | null>>
) => {
  return useQuery(['account', accountId], () => getAccountById(accountId), {
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
  })
}

export default useAccountIdQuery
