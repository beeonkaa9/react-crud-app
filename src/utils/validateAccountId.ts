const validateAccountId = (accountId: string) => {
  let error = ''

  if (!accountId) {
    error = 'Account id is required for this action'
  } else if (
    !new RegExp(
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
    ).test(accountId)
  ) {
    error = 'Account id must be a uuid'
  }
  return error
}

export default validateAccountId
