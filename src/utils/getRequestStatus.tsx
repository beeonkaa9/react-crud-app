import React from 'react'

const getRequestStatus = (requestStatus: string, message?: string | null) => {
  let status = null
  if (requestStatus === 'fetching') {
    status = <div className="loading">Please wait...</div>
  } else if (requestStatus === 'error') {
    status = <div className="error">An error occurred: {message}</div>
  }
  return status
}

export default getRequestStatus
