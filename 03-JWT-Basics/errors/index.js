const BadRequestError = require('./bed-request')
const CustomAPIError = require('./custom-error')
const UnauthenticatedError = require('./unauthenticated')

module.exports = {
  BadRequestError,
  CustomAPIError,
  UnauthenticatedError,
}
