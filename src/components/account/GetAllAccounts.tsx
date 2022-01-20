import FormStatus from 'components/FormStatus'
import useGetAllAccountsQuery from 'hooks/account/useGetAllAccountsQuery'
import { HTTPError } from 'ky'
import React, { useEffect, useState } from 'react'

const GetAllAccounts = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const getAllAccounts = useGetAllAccountsQuery()

  useEffect(() => {
    if (getAllAccounts.isError) {
      if (getAllAccounts.error instanceof HTTPError) {
        const errorResponse = getAllAccounts.error.response.clone()
        errorResponse.json().then((e) => setErrorMessage(e.message))
      } else if (getAllAccounts.error instanceof Error) {
        setErrorMessage(getAllAccounts.error.message)
      }
    }
  }, [getAllAccounts.isError])

  return (
    <div className="sectionContainer">
      <h3>View all accounts</h3>
      <button onClick={() => getAllAccounts.refetch()}>Get all accounts</button>
      <div>
        <div className="requestStatus">
          {getAllAccounts.isLoading || getAllAccounts.isError ? (
            <FormStatus
              request={{ status: getAllAccounts.status, message: errorMessage }}
            />
          ) : null}
        </div>
        <div>
          {getAllAccounts.isSuccess ? (
            getAllAccounts.data !== undefined &&
            getAllAccounts.data.length === 0 ? (
              <h4>No accounts found</h4>
            ) : (
              getAllAccounts.data?.map((account, i) => (
                <div key={i} className="singleAccount">
                  <div>Id: {account.id}</div>
                  <div>
                    Name: {account.given_name} {account.family_name}
                  </div>
                  <div>Email: {account.email_address}</div>
                  <div>
                    Balance: {account.balance.amount} {account.balance.currency}
                  </div>
                  <div>Note: {account.note}</div>
                </div>
              ))
            )
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default GetAllAccounts
