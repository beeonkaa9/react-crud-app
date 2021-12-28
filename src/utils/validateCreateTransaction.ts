type FormInput = {
  id: string
  note: string
  targetAccount: string
  amount: string
  currency: string
}

const validateCreateTransaction = (
  formInput: FormInput,
  buttonClicked: string
) => {
  const errors = {
    id: '',
    note: '',
    targetAccount: '',
    amount: '',
    currency: '',
  }

  if (!formInput.id) {
    errors.id = 'Account id is required'
  } else if (
    !new RegExp(
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
    ).test(formInput.id)
  ) {
    errors.id = 'Account id must be uuid'
  }

  if (!formInput.note) {
    errors.note = 'Note is required'
  }

  if (buttonClicked === 'send') {
    if (!formInput.targetAccount)
      errors.targetAccount = 'Account id to send money to is required'
    else if (
      !new RegExp(
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
      ).test(formInput.targetAccount)
    )
      errors.targetAccount = 'Account id to send money to must be uuid'
  }

  if (!formInput.amount) {
    errors.amount = 'Amount is required'
  } else if (!new RegExp(/^[0-9]+$/).test(formInput.amount)) {
    errors.amount = 'Amount must be a number and greater than 0'
  }

  if (!formInput.currency) {
    errors.currency = 'Currency is required'
  } else if (!new RegExp(/^[a-zA-Z]+$/).test(formInput.currency)) {
    errors.currency = 'Currency may only contain alphabetic characters'
  }

  return errors
}

export default validateCreateTransaction
