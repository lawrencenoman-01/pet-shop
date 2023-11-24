/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import { selectCart, selectMidtrans } from './selectors';
import classes from './style.module.scss';
import { decreaseItemQuantity, increaseItemQuantity, midtransRequest, removeFromCartRequest } from './actions';

const CartProduct = ({ cartItems, removeFromCart, midtransRequest, midtrans }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.stock, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseItemQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseItemQuantity(itemId));
  };

  const handleRemove = (itemId) => {
    const itemToRemove = cartItems.find((item) => item.id === itemId);
    if (itemToRemove) {
      removeFromCart(itemToRemove);
    }
  };

  const handlePayment = () => {
    dispatch(midtransRequest({ cartItems }));
  };

  return (
    <div className={classes.container}>
      <div className={classes.cart}>
        <FormattedMessage id="app_cart_title" />
      </div>
      <div className={classes.container__content}>
        {cartItems.map((item) => (
          <div key={item.id} className={classes.cartItem}>
            <img className={classes.cartItem__image} src={item.image} alt="" />
            <p className={classes.cartItemName}>{item.name}</p>
            <p className={classes.cartItemPrice}>{item.price}</p>
            <div className={classes.quantityControl}>
              <button onClick={() => handleDecreaseQuantity(item.id)}> - </button>
              <span className={classes.quantity}> {item.stock} </span>
              <button onClick={() => handleIncreaseQuantity(item.id)}> + </button>
            </div>
            <p className={classes.cartItemPrice}> {item.price * item.stock} </p>
            <button onClick={() => handleRemove(item.id)}> Remove </button>
          </div>
        ))}
      </div>
      <div className={classes.totalPayment}>
        <p className={classes.orderTotal}> Order Total: {totalPrice} </p>
        <button onClick={handlePayment}> Pay </button>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCart,
  midtrans: selectMidtrans,
});
const mapDispatchToProps = {
  removeFromCart: removeFromCartRequest,
  midtransRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartProduct);
