/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import classes from './style.module.scss';
import { addProductRequest } from './actions';

const AddProduct = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    description: '',
    price: '',
    stock: '',
  });

  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('categoryId', formData.categoryId);
    formDataObj.append('description', formData.description);
    formDataObj.append('price', formData.price);
    formDataObj.append('stock', formData.stock);
    formDataObj.append('image', file);
    dispatch(addProductRequest(formDataObj));
    // console.log(formDataObj, '<<<<<DATA');
  };

  return (
    <div className={classes.container}>
      <div className={classes.container__title}>
        <FormattedMessage id="app_add_product_data" />
      </div>
      <div className={classes.container__content}>
        <form className={classes.form} onSubmit={handleSubmit} encType="multipart/form-data">
          <div className={classes.name}>
            <FormattedMessage id="app_form_name" />
            <FormControl sx={{ width: '70ch' }}>
              <TextField
                name="name"
                id="name"
                variant="outlined"
                placeholder="Gunting Kuku"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
          </div>
          <div className={classes.category}>
            <FormattedMessage id="app_form_category" />
            <FormControl sx={{ width: '70ch' }}>
              <Select
                value={formData.categoryId}
                onChange={handleChange}
                name="categoryId"
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="">
                  <em>Category</em>
                </MenuItem>
                <MenuItem value={1}>Aksesoris Anjing</MenuItem>
                <MenuItem value={2}>Makanan Anjing</MenuItem>
                <MenuItem value={3}>Aksesoris Kucing</MenuItem>
                <MenuItem value={4}>Makanan Kucing</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.description}>
            <FormattedMessage id="app_form_description" />
            <FormControl sx={{ width: '70ch' }}>
              <TextField
                name="description"
                id="description"
                variant="outlined"
                placeholder="Bahannya sangat tajam"
                value={formData.description}
                onChange={handleChange}
              />
            </FormControl>
          </div>
          <div className={classes.image}>
            <FormattedMessage id="app_form_image" />
            <FormControl sx={{ width: '70ch' }}>
              <TextField
                id="image"
                name="image"
                autoComplete="current-image"
                value={formData.image}
                onChange={handleFileChange}
                type="file"
              />
            </FormControl>
          </div>
          <div className={classes.price}>
            <FormattedMessage id="app_form_price" />
            <FormControl sx={{ width: '70ch' }}>
              <TextField name="price" id="price" type="number" value={formData.price} onChange={handleChange} />
            </FormControl>
          </div>
          <div className={classes.quantity}>
            <FormattedMessage id="app_form_quantity" />
            <FormControl sx={{ width: '70ch' }}>
              <TextField name="stock" id="stock" type="number" value={formData.stock} onChange={handleChange} />
            </FormControl>
          </div>
          <div className={classes.containButton}>
            <button className={classes.buttonSubmit} type="submit">
              <FormattedMessage id="app_button_product" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
