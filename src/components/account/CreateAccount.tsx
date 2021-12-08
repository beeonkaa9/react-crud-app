import React from 'react'

type InputBalance = {
  amount: string
  currency: string
}

type CreateAccountProps = {
  id: string
  firstName: string
  lastName: string
  email: string
  balance: InputBalance
  note: string
}

const CreateAccount = ({
  id,
  firstName,
  lastName,
  email,
  balance,
  note,
}: CreateAccountProps) => {
  const postRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      given_name: firstName,
      family_name: lastName,
      email_address: email,
      id: id,
      balance: {
        amount: parseInt(balance.amount),
        currency: balance.currency,
      },
      note: note,
    }),
  }

  const postAccount = () => {
    fetch('https://nestjs-bank-app.herokuapp.com/accounts', postRequestOptions)
  }

  return (
    <button className="CreateAccountBtn" onClick={postAccount}>
      Create Account
    </button>
  )
}

export default CreateAccount
