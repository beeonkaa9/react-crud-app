import React from 'react'
type FormStatusProps = {
  request: {
    status: QueryMutationStatus
    message?: string | null
  }
  validationErrors?: string[] | null
}

const FormStatus = ({ request, validationErrors }: FormStatusProps) => {
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
    loading: <div className="loading">Please wait...</div>,
    success: <div className="success">{request.message}</div>,
    error: <div className="error">An error occurred: {request.message}</div>,
  }[request.status]
}

export default FormStatus
