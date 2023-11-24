const Joi = require('joi');
const fs = require('fs')
const path = require('path')
const handleClientError = require('../helpers/clientError');
const handleServerError = require('../helpers/serverError');
const { Product, User } = require('../models')
const midtransClient = require('midtrans-client')

// Get All Product
exports.getAll = async (req, res) => {
  try {
    const product = await Product.findAll({})

    return res.status(200).json({
      data: product,
      message: 'Success Get All Product',
    })

  } catch (err) {
    console.log(err);
    handleServerError(res)
  }
}

// Get Product By Id
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
      return handleClientError(res, 404, 'Product with the specified ID does not exists.')
    }

    return res.status(200).json({
      data: product,
      message: `Success Get Category with id ${id}`,
    })

  } catch (err) {
    console.log(err);
    handleServerError(res)
  }
}

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const newData = req.body
    const name = req.body.name
    const { id: userId } = req.loggedUser

    if (req.file) {
      const imageURL = req.file.path.replace(/\\/g, "/");
      newData.image = `http://localhost:8080/${imageURL}`;
    }

    const productScheme = Joi.object({
      name: Joi.string().min(5).required(),
      categoryId: Joi.number().required(),
      description: Joi.string().min(5).required(),
      image: Joi.string().uri().required(),
      price: Joi.number().required(),
      stock: Joi.number().required(),
    })

    const { error } = productScheme.validate(newData)
    if(error) {
      if(req.file) {
        fs.unlinkSync(req.file.path)
      }
      return handleClientError(res, 400, error.details[0].message)
    }

    const nameExist = await Product.findOne({ where: { name }})
    if(nameExist) {
      if(req.file) {
        fs.unlinkSync(req.file.path)
      }
      return handleClientError(res, 404, 'Name does not same')
    }

    const createProduct = await Product.create({
      ...newData,
      createdBy: userId,
    })

    return res.status(201).json({
      data: createProduct,
      message: 'Successfully Added Product',
    })

  } catch (err) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.log(err);
    handleServerError(res)
  }
}

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body

    const productUpdateScheme = Joi.object({
      name: Joi.string().min(5).required(),
      categoryId: Joi.number().required(),
      description: Joi.string().min(5).required(),
      // image: Joi.string().uri().required(),
      price: Joi.number().required(),
      stock: Joi.number().required(),
    })

    const { error } = productUpdateScheme.validate(newData)
    if (error) {
      if(req.file) {
        fs.unlinkSync(req.file.path)
      }
      return handleClientError(res, 404, error.details[0].message)
    }

    const { id: userId, role } = req.loggedUser
    if(role !== 'admin') {
      if(req.file) {
        fs.unlinkSync(req.file.path)
      }
      return handleClientError(res, 404, 'Forbidden access this route');
    }

    const product = await Product.findByPk(id)
    if (!product) {
      if(req.file) {
        fs.unlinkSync(req.file.path)
      }
      return handleClientError(res, 404, 'Product with the specified ID does not exists')
    }

    if (req.file) {
      const imageURL = req.file.path.replace(/\\/g, "/");
      newData.image = `http://localhost:8080/${imageURL}`;
      if (product.image) {
        const lastImage = path.join(__dirname, "..", "uploads", product.image.split("/").pop());
        fs.unlinkSync(lastImage);
      }
    }

    await product.update({
      ...newData,
      updatedBy: userId,
    });
    const updateProduct = await Product.findByPk(id);

    res.status(200).json({ data: updateProduct, message: "Product successfully updated." });

  } catch (err) {
    if(req.file) {
      fs.unlinkSync(req.file.path)
    }
    console.log(err);
    handleServerError(res)
  }
}

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByPk(id)

    if (!findProduct) {
      return handleClientError(res, 404, 'Product with the specified ID does not exists')
    }

    if (findProduct.image) {
      const lastImage = path.join(__dirname, "..", "uploads", findProduct.image.split("/").pop());
      if (fs.existsSync(lastImage)) {
        fs.unlinkSync(lastImage);
      }
    }

    const { role } = req.loggedUser
    if (role !== 'admin') {
      return handleClientError(res, 404, 'Forbidden access this route')
    }

    await findProduct.destroy()
    return res.status(200).json({
      message: `Product deleted`,
    })

  } catch (err) {
    console.log(err);
    handleServerError(res)
  }
}

// Midtrans
exports.midtrans = async (req, res) => {
  try {
    const { payload } = req.body
    const findUser = await User.findByPk(req.loggedUser.id);
    // console.log(findUser.email, '<<<<< ID');
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-TvgS5N9HpYGj8lgx3hvFPSFh",
      // clientKey: "SB-Mid-client-RGH1GALHJ5YF5uma",
      // serverKey: "Basic " + Buffer.from("Mid-server-79120h_cKCHdyJpkkZhXLF91").toString('base64'),
    });
    let parameter = {
      transaction_details: {
        order_id: Math.floor(Math.random() * 100000),
        gross_amount: parseInt(payload),
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        email: findUser.email,
      },
    };
    const midtrans_token = await snap.createTransaction(parameter);
    res.status(201).json(midtrans_token);
    // console.log(midtrans_token);
  } catch (err) {
    console.log(err);
    return handleServerError(res);
  }
}