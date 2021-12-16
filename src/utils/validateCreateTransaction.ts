type FormInput = {
  id: string
  note: string
  targetAccount?: string
  amount: string
  currency: string
}

const validateCreateTransaction = (formInput: FormInput) => {
  const errors = {
    id: '',
    note: '',
    targetAccount: '',
    amount: '',
    currency: '',
  }

  const uuidValidate =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
  const numberValidate = /^[0-9]+$/
  const alphaValidate = /^[a-zA-Z]+$/

  if (!formInput.id) {
    errors.id = 'Account id is required'
  } else if (!uuidValidate.test(formInput.id)) {
    errors.id = 'Account id must be uuid'
  }

  if (!formInput.note) {
    errors.note = 'Note is required'
  }

  if (formInput.id && !formInput.targetAccount) {
    errors.targetAccount = 'Account id to send money to is required'
  } else if (
    formInput.targetAccount &&
    !uuidValidate.test(formInput.targetAccount)
  ) {
    errors.targetAccount = 'Account id to send money to must be uuid'
  }

  if (!formInput.amount) {
    errors.amount = 'Amount is required'
  } else if (!numberValidate.test(formInput.amount)) {
    errors.amount = 'Amount must be a number and greater than 0'
  }

  if (!formInput.currency) {
    errors.currency = 'Currency is required'
  } else if (!alphaValidate.test(formInput.currency)) {
    errors.currency = 'Currency may only contain alphabetic characters'
  }

  return errors
}

export default validateCreateTransaction
