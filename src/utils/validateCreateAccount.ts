type FormInput = {
  id: string
  firstName: string
  lastName: string
  email: string
  amount: string
  currency: string
  note: string
}

const validateCreateAccount = (formInput: FormInput) => {
  const errors = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    amount: '',
    currency: '',
    note: '',
  }

  const uuidValidate =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

  const nameValidate = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i
  const emailValidate = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  const numberValidate = /^[0-9]+$/
  const alphaValidate = /^[a-zA-Z]+$/

  if (!formInput.id) {
    errors.id = 'Account id is required'
  } else if (!uuidValidate.test(formInput.id)) {
    errors.id = 'Account id must be uuid'
  }

  if (!formInput.firstName) {
    errors.firstName = 'First name is required'
  } else if (!nameValidate.test(formInput.firstName)) {
    errors.firstName =
      'First name can only contain letters, spaces, and hyphens'
  }

  if (!formInput.lastName) {
    errors.lastName = 'Last name is required'
  } else if (!nameValidate.test(formInput.lastName)) {
    errors.lastName = 'Last name can only contain letters, spaces, and hyphens'
  }

  if (!formInput.email) {
    errors.email = 'Email is required'
  } else if (!emailValidate.test(formInput.email)) {
    errors.email = 'Email is invalid'
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

  if (!formInput.note) {
    errors.note = 'Note is required'
  }

  return errors
}

export default validateCreateAccount
