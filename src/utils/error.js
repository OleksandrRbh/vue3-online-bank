const ERROR_CODES = {
  EMAIL_NOT_FOUND: 'User with this email is not found',
  INVALID_PASSWORD: 'Password is invalid',
  auth: 'Please login to system'
}

export function error(code) {
  return ERROR_CODES[code] ? ERROR_CODES[code] : 'Unknown error'
}
