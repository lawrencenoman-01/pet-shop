/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import BackgroundImage from '@static/images/carousel.png'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import CardProduct from '@components/CardProduct';
import { selectRole } from '@containers/Client/selectors';

import classes from './style.module.scss';
import { getProductRequest } from './actions';
import { selectProduct } from './selectors';

const Home = ({ products, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchProduct, setSearchProduct] = useState('')
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    dispatch(getProductRequest())
  }, [dispatch])

  const handleAddProduct = () => {
    navigate('/addProduct')
  }

  const handleSearch = () => {
    const filteredProduct = products.filter(product =>
      product.name.toLowerCase().includes(searchProduct.toLowerCase()))
    setFiltered(filteredProduct)
  }

  const handleInputChange = (e) => {
    setSearchProduct(e.target.value)
    handleSearch()
  }

  const displayedProducts = searchProduct ? filtered : products
  const role = user;

  const scrollToCard = () => {
    const cardContainer = document.getElementById('cardContainer');
    if (cardContainer) {
      cardContainer.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.container__background}>
        <div className={classes.backgroundColor}>
          <div className={classes.title}>
            <p className={classes.title__top}> We Only Have One Products For Your Pets </p>
            <p className={classes.title__bottom}> The care we give all the difference for lifelong health and happiness </p>
            <Button className={classes.shop} variant="contained" color="success" onClick={scrollToCard}>
              SHOP NOW
            </Button>
          </div>
          <img src={BackgroundImage} alt='' />
        </div>
      </div>
      {role === 'admin' ? (
        <div className={classes.container__header}>
          <Button variant="contained" color="success" onClick={handleAddProduct}>
            <FormattedMessage id='app_button_add_product' />
          </Button>
          <TextField
            id="outlined-search"
            label="Search Product"
            type="search"
            value={searchProduct}
            onChange={handleInputChange}
          // onBlur={handleSearch}
          />
        </div>
      ) : (
        <div className={classes.search}>
          <TextField
            id="outlined-search"
            label="Search Product"
            type="search"
            value={searchProduct}
            onChange={handleInputChange}
          />
        </div>
      )}
      <div id="cardContainer" className={classes.ourProduct}>
        Our Product
      </div>
      <div className={classes.container__card}>
        {displayedProducts.map((product) => (
          <CardProduct
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
            stock={product.stock}
          />
        ))}
      </div>

    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  products: selectProduct,
  user: selectRole,
})

export default connect(mapStateToProps)(Home);
