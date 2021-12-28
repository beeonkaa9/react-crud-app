import React from 'react'
type RequestStatusProps = {
  requestStatus: RequestStatusOptions
  message?: string | null
  validationErrors?: string[] | null
}

const RequestStatus = ({
  requestStatus,
  message,
  validationErrors,
}: RequestStatusProps) => {
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
    success: <div className="success">{message}</div>,
    error: <div className="error">An error occurred: {message}</div>,
  }[requestStatus]
}

export default RequestStatus
