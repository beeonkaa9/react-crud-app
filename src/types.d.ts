type Balance = {
  amount: number
  currency: string
}

type AccountProps = {
  id: string
  given_name: string
  family_name: string
  email_address: string
  balance: Balance
  note: string
}
