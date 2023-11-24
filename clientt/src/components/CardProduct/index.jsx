/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Stack from '@mui/material/Stack';

import { deleteProductRequest, getProductRequest } from '@pages/Home/actions';
import { selectProduct } from '@pages/Home/selectors';
import { selectRole } from '@containers/Client/selectors';
import { selectCart } from '@pages/CartProduct/selectors';
import { addToCart } from '@pages/CartProduct/actions';

import classes from './style.module.scss';

const CardProduct = ({ id, image, name, description, price, stock, user, cartItems }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getProductRequest())
  }, [dispatch])

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure to delete this product?',
      text: 'You won\'t be able to revert this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'blue',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProductRequest({ id }));
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  }

  const handleAddToCart = () => {
    const isProductInCart = cartItems.some((item) => item.id === id);

    if (isProductInCart) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Product already exists in the cart!',
      });
    } else {
      dispatch(addToCart({ id, name, description, price, image, stock }));
      Swal.fire('Added to Cart!', 'Product added to your cart.', 'success');
      navigate('/cart')
    }
  };

  const handleUpdateProduct = () => {
    navigate(`/updateProduct/${id}`)
  }

  const role = user
  const handleDetail = () => {
    navigate(`/detail/${id}`)
  }
  const detailLink = `/detail/${id}`;

  return (
    <div className={classes.card} >
      <img className={classes.image} src={image} alt='' />
      <div className={classes.card__content}>
        <p className={classes.name}> {name} </p>
        {/* <p className={classes.description}> {description} </p> */}
        <p className={classes.price}> {price} </p>
        {/* <p className={classes.stock}> {stock} </p> */}
      </div>
      {role === 'admin' ? (
        <div className={classes.action}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleUpdateProduct}>
              <UpdateIcon />
            </Button>
            <Button variant="contained" color='error' onClick={handleDelete}>
              <DeleteIcon />
            </Button>
          </Stack>
        </div>
      ) : (
        <div className={classes.cartButton}>
        {/* <Button variant="contained" color="primary" startIcon={<ShoppingCartIcon />} onClick={handleAddToCart}>
          Add to Cart
        </Button> */}
        <Button variant="contained" color="primary" onClick={handleDetail}>
          Detail
        </Button>
      </div>
      )}
      {/* <Link to={detailLink} className={classes.cardLink}>
        
      </Link> */}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectRole,
  cartItems: selectCart,
})

export default connect(mapStateToProps)(CardProduct);
