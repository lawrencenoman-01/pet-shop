const { verifyToken } = require('../utils/jwt')
const { User } = require('../models')
const handleServerError = require('../helpers/serverError')
const handleClientError = require('../helpers/clientError')

const authentication = async (req, res, next) => {
  try {
    const authHeader= req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
      return handleClientError(res, 404, 'Unauthenticated')
    }
    
    const data = verifyToken(token)
    const { email } = data
    const foundUser = await User.findOne({ where: { email }})
    if (!foundUser) {
      return handleClientError(res, 404, `User dengan email ${email} tidak tersedia.`)
    } else {
      req.loggedUser = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role
      }
      next()
    }

  } catch (err) {
    console.log(err)
    handleServerError(res)
  }
}

const authorization = (roles) => {
  return async (req, res, next) => {
    try {
      const { role } = req.loggedUser
      if(!role) {
        return handleClientError(res, 404, 'Your role does not match')
      }

      if(!roles.includes(role)) {
        return handleClientError(res, 404, 'Forbidden access this route')
      }

      next()

    } catch (err) {
      console.log(err);
      handleServerError(res)
    }
  }
}

module.exports = {
  authentication,
  authorization
}