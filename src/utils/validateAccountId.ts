const validateAccountId = (accountId: string) => {
  let error = ''
  const uuidValidate =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

  if (!accountId) {
    error = 'Account id is required for this action'
  } else if (!uuidValidate.test(accountId)) {
    error = 'Account id must be a uuid'
  }
  return error
}

export default validateAccountId
