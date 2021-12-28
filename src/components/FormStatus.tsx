import React from 'react'
type RequestStatusProps = {
  request: {
    status: RequestStatusOptions
    message?: string | null
  }
  validationErrors?: string[] | null
}

const FormStatus = ({ request, validationErrors }: RequestStatusProps) => {
  if (validationErrors !== null && validationErrors !== undefined) {
    return (
      <>
        {validationErrors?.map((error, i) => (
          <div key={i} className="formErrors">
            <div>{error}</div>
          </div>
        ))}
      </>
    )
  }

  return {
    idle: null,
    fetching: <div className="loading">Please wait...</div>,
    success: <div className="success">{request.message}</div>,
    error: <div className="error">An error occurred: {request.message}</div>,
  }[request.status]
}

export default FormStatus
