const { User } = require('../models')
const handleServerError = require('../helpers/serverError')
const handleClientError = require('../helpers/clientError')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/jwt')
const midtransClient = require('midtrans-client')

// Register User
exports.register = async (req, res) => {
  try {
    const newData = req.body
    const email = req.body.email

    const registerScheme = Joi.object({
      email: Joi.string().email({ tlds: { allow: false }}).required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      password: Joi.string().min(6).required(),
      role: Joi.string().valid('admin', 'customer'),
    })

    const { error } = registerScheme.validate(newData)
    if(error) {
      return handleClientError(res, 400, error.details[0].message)
    }

    const emailExist = await User.findOne({ where: { email }})
    if(emailExist) {
      return handleClientError(res, 404, 'Email does not same')
    }

    const register = await User.create(newData)
    return res.status(201).json({
      data: register,
      message: 'Successfully Register User Account'
    })

  } catch (err) {
    handleServerError(res)
  }
}

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const loginScheme = Joi.object({
      email: Joi.string().email({ tlds: { allow: false }}).required(),
      password: Joi.string().required(),
    })

    const { error } = loginScheme.validate({email, password})
    if(error) {
      return handleClientError(res, 400, error.details[0].message) 
    }

    const findUser = await User.findOne({ where: { email }})
    if(!findUser) {
      return handleClientError(res, 404, `User with this email ${email} does not exist.`)
    }

    const comparePassword = bcrypt.compareSync(password, findUser.password)
    if(!comparePassword) {
      return handleClientError(res, 404, 'Your Password does not correct.')
    }

    if(comparePassword) {
      const accessToken = generateToken({
        id: findUser.id,
        email: findUser.email,
        role: findUser.role
      })

      res.status(200).json({
        email: findUser.email,
        role: findUser.role,
        token: accessToken,
        status: 'Successfully Login Account'
      })
    }

  } catch (err) {
    handleServerError(res)
  }
}

// AUNTHENTICATED ROUTES
// Get All User
exports.getUser = async (req, res) => {
  try {
    const user = await User.findAll({})

    return res.status(200).json({
      data: user,
      message: 'Success Get All Data User'
    })
    
  } catch (err) {
    handleServerError(res)
  }
}