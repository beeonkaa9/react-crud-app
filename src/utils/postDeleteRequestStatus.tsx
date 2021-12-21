import React from 'react'

const postDeleteRequestStatus = (
  requestStatus: string,
  message?: string | null,
  formErrors?: string[]
) => {
  let status = null
  if (requestStatus === 'fetching') {
    status = <div className="loading">Please wait...</div>
  } else if (requestStatus === 'success') {
    status = <div className="success">{message}</div>
  } else if (requestStatus === 'error') {
    status = <div className="error">An error occurred: {message}</div>
  } else if (requestStatus === 'validationerror') {
    status = formErrors?.map((error, i) => (
      <div key={i} className="formErrors">
        <div>{error}</div>
      </div>
    ))
  }
  return status
}

export default postDeleteRequestStatus
