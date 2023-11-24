/* eslint-disable prettier/prettier */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';

import { selectDetail, selectPayment } from '@pages/Home/selectors';
import { createStructuredSelector } from 'reselect';
import { getProductIdRequest, paymentRequest } from '@pages/Home/actions';

import classes from './style.module.scss';

const Detail = ({ product, payment }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(getProductIdRequest(id));
    }
  }, [id, dispatch]);

  const detail = product?.data;

  const handlePayment = () => {
    dispatch(paymentRequest(detail.price));
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const total = product?.data?.price * quantity;

  return (
    <div className={classes.container}>
      <div className={classes.container__content}>
        <div className={classes.form}>
          <img className={classes.image} src={product?.data?.image} alt="" />
          <div className={classes.form__content}>
            <p className={classes.name}> Product Name: {product?.data?.name} </p>
            <p className={classes.price}> Price: {product?.data?.price} </p>
            <p className={classes.description}> Description: {product?.data?.description} </p>
            {/* <p className={classes.stock}> Stock: {product?.data?.stock} </p> */}
            {/* <div className={classes.quantityControl}>
              <button onClick={handleDecrement}> - </button>
              <span className={classes.quantity}>{quantity}</span>
              <button onClick={handleIncrement}> + </button>
            </div> */}
            {/* <p className={classes.total}> Total Price: {total} </p> */}
            <div className={classes.btn}>
              <button className={classes.btnPayment} onClick={handlePayment}> Pay </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  product: selectDetail,
  payment: selectPayment,
});

export default connect(mapStateToProps)(Detail);
