import React from 'react'
type RequestStatusProps = {
  request: {
    status: RequestStatusOptions
    message?: string | null
  }
  formStatus?: string[] | null
}

const RequestStatus = ({ request, formStatus }: RequestStatusProps) => {
  if (formStatus !== null && formStatus !== undefined) {
    return (
      <>
        {formStatus?.map((error, i) => (
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

export default RequestStatus
