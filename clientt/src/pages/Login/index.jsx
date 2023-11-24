/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect, useDispatch } from 'react-redux'
import PropTypes from 'prop-types';

import { createStructuredSelector } from 'reselect';
import { selectError, selectUser } from '@containers/Client/selectors';
import { loginRequest } from '@containers/Client/actions';

import classes from './style.module.scss';

const Login = ({ userData, errorData }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleLogin = () => {
    dispatch(loginRequest(formData))
  }

  return (
    <div className={classes.login}>
      <div className={classes.login__container}>
        <div className={classes.form_title}>
          <FormattedMessage id='app_login' />
        </div>
        <div className={classes.login__container__form}>
          <div className={classes.subTitle}>
            <FormattedMessage id='app_login_email' />
          </div>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errorData && <div className={classes.error}> {errorData} </div>}

          <div className={classes.subTitle}>
            <FormattedMessage id='app_login_password' />
          </div>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {/* <a href='/login'> Forgot Password </a> */}

          <button className={classes.button} onClick={handleLogin}>
            <FormattedMessage id='app_login_button' />
          </button>
          <div className={classes.signup}>
            <FormattedMessage id='app_login_registered' />
            <a href='/register' className={classes.signup__click}>
              <FormattedMessage id='app_login_here' />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  userData: PropTypes.object,
  errorData: PropTypes.string,
}

const mapStateToProps = createStructuredSelector({
  userData: selectUser,
  errorData: selectError,
})

export default connect(mapStateToProps)(Login);
