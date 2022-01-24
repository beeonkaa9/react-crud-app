import { HTTPError } from 'ky'

const handleAPIError = (
  err: unknown,
  setMessage: React.Dispatch<React.SetStateAction<string | null>>
) => {
  if (err instanceof HTTPError) {
    const errorResponse = err.response.clone()
    errorResponse.json().then((e) => setMessage(e.message))
  } else if (err instanceof Error) {
    setMessage(err.message)
  }
}

export default handleAPIError
