type Balance = {
  amount: number
  currency: string
}

type AccountResponse = {
  id: string
  given_name: string
  family_name: string
  email_address: string
  balance: Balance
  note: string
}

type TransactionAmount = {
  amount: number
  currency: string
}

type TransactionResponse = {
  id: string
  note: string
  target_account_id?: string
  amount_money: TransactionAmount
}
