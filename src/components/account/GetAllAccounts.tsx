import React, { useEffect, useState } from 'react'

const GetAllAccounts = () => {
  const [accounts, setAccounts] = useState<Array<AccountProps>>()
  // const [fetchingData, setFetchingData] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const getAccounts = () => {
    // setFetchingData(true)
    fetch('https://nestjs-bank-app.herokuapp.com/accounts')
      .then((res) => {
        if (!res.ok) {
          setError(true)
          throw Error(res.statusText)
        }
        return res.json()
      })
      .then((data) => {
        // setFetchingData(false)
        setError(false)
        setAccounts(data)
      })
      .catch((e) => {
        setErrorMessage(e.message)
      })
  }

  return (
    <div className="GetAccountsSection">
      <h3>View all accounts</h3>
      <button className="accountGetButton" onClick={getAccounts}>
        Get all accounts
      </button>
      <div>
        {error ? (
          <div>
            An error occurred while getting the accounts: {errorMessage}
          </div>
        ) : (
          <div>
            {accounts != undefined && accounts.length === 0 ? (
              <h4>No accounts found</h4>
            ) : (
              <>
                {accounts?.map((account, i) => (
                  <div key={i} className="singleAccount">
                    <div>Id: {account.id}</div>
                    <div>
                      Name: {account.given_name} {account.family_name}
                    </div>
                    <div>Email: {account.email_address}</div>
                    <div>
                      Balance: {account.balance.amount}{' '}
                      {account.balance.currency}
                    </div>
                    <div>Note: {account.note}</div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default GetAllAccounts
