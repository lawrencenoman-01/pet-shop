/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl'
import { connect, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';

import { createStructuredSelector } from 'reselect';
import { selectError, selectUser } from '@containers/Client/selectors';
import { registerRequest } from '@containers/Client/actions';

import classes from './style.module.scss';

const Register = ({ userData, errorData }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleRegister = () => {
    dispatch(registerRequest(formData))
  }

  return (
    <div className={classes.register}>
      <div className={classes.register__container}>
        <div className={classes.form_title}>
          <FormattedMessage id='app_signup' />
        </div>
        <div className={classes.register__container__form}>
          <div className={classes.subTitle}>
            <FormattedMessage id='app_signup_email' />
          </div>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {/* {errorData && <div className={classes.error}> {errorData} </div>} */}

          <div className={classes.subTitle}>
            <FormattedMessage id='app_signup_firstName' />
          </div>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
          />

          <div className={classes.subTitle}>
            <FormattedMessage id='app_signup_lastName' />
          </div>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />

          <div className={classes.subTitle}>
            <FormattedMessage id='app_signup_password' />
          </div>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <button className={classes.button} onClick={handleRegister}>
            <FormattedMessage id='app_signup_button' />
          </button>
          <div className={classes.registered}>
            <FormattedMessage id='app_signup_registered' />
            <a href='/login' className={classes.registered__click}>
              <FormattedMessage id='app_signup_here' />
            </a>
          </div>
          {/* <p> Already Registered? Click <a href='/login'> Here </a> </p> */}
        </div>
      </div>
    </div>
  )
};

Register.propTypes = {
  userData: PropTypes.object,
  errorData: PropTypes.string,
}

const mapStateToProps = createStructuredSelector({
  userData: selectUser,
  errorData: selectError,
})

export default connect(mapStateToProps)(Register);
