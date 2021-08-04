const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = require('../utils/toThousand') /* sirve para ponerle los puntos a los miles */
const finalPrice= require('../utils/finalPrice')

const controller = {
	// Root - Show all products
	index: (req, res) => {
		return res.render('products',{
			products,
			toThousand,
			finalPrice,
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product= products.find(product => product.id === +req.params.id)
		return res.render('detail',{
			product,
			finalPrice,
			toThousand,
		})
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		/* return res.send(req.body) */ /* cersioro que la información que estoy mandando en el formulario me está llegando al controlador */
		const {name, price, discount, category, description}= req.body;
		let product= {
			id: (products[products.length-1].id+1), /* se accede al Array, se toma la última posición y se le agrega uno */
			name,
			price: +price,
			discount: +discount,
			category,
			description,
			image: "default-image.png",
		}
		

		products.push(product) /* traigo la variente productos y le pusheo product */

		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2),'utf-8') /* guardo en la base de datos el producto nuevo */
		
		return res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;