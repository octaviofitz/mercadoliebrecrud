const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = require('../utils/toThousand')
const finalPrice= require('../utils/finalPrice')

const controller = {
	index: (req, res) => {
	return res.render('index',{
		visited: products.filter(product => product.category=== "visited"),
		inSale: products.filter(product => product.category=== "in-sale"),
		toThousand,
		finalPrice,
	})
	},
	search: (req, res) => {
		if (req.query.keywords.trim() != "") {
			let results= products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase().trim())) /* el includes es un método que permite determinar si una cadena de caractéres está incluida dentro de otra */ /* el keywords se llama así porque así está puesto en el input de la búsqueda (en el header */
				/* el toLowerCase es para que la búsqueda no distinga entre mayúsculas y minúsculas */
				/* el trim elimina los espacios en las búsquedas */
			return res.render('results',{
				results,
				finalPrice,
				toThousand,
				keywords: req.query.keywords.trim() /* para capturar la palabra buscada */
			})
		} else {
			res.redirect("/")
		}

		
	},
};

module.exports = controller;
