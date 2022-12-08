const asyncHandler = require( 'express-async-handler');
const Product = require('../models/product-model.js');
const cloudinary = require('cloudinary')
const jwt = require('jsonwebtoken');

cloudinary.config({ 
    cloud_name: 'dljukr69h', 
    api_key: '552912956895165', 
    api_secret: 'oBhJZnaA09Hbk7jjcBSHgyxeQVk' 
  });


exports.getProducts = asyncHandler(async (req, res) => {
	const pageSize = 10;
	const page =  Number(req.query.pageNumber) || 1
	var products;
	if(req.query.id)
	{ 
		const ct = await Product.countDocuments({user:req.query.id});
		products = await Product.find({user:req.query.id})
		.limit(pageSize)
		.skip(pageSize * (page - 1));
		res.json({
			products,
			page,
			pages: Math.ceil(ct / pageSize),
		});
	}
	else
	{ 
		const keyword = req.query.keyword
		? { 
			$or: [
				{
				title: {
					$regex: req.query.keyword,
					$options: 'i',
				},
				},
				{
				description: {
					$regex: req.query.keyword,
					$options: 'i',
				},
				},
			],
		}
		: {}
		const count = await Product.countDocuments({ ...keyword });
		products = await Product.find({ ...keyword })
			.limit(pageSize)
			.skip(pageSize * (page - 1));
		res.json({
			products,
			page,
			pages: Math.ceil(count / pageSize),
		});
	};
	

	
});

exports.getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

exports.deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({ message: 'Product removed' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

exports.createProduct = asyncHandler(async (req, res) => {
	token = req.headers.authorization.split(' ')[1];
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	console.log(decoded.id);
	console.log('creating product');
	const obj = JSON.parse(req.body.myFile);
	var img = "";
	if(req.file)
		img = await cloudinary.uploader.upload(req.file.path);
	const product = new Product({
		title: obj.title,
		price: obj.price,
		user: decoded.id,
		picture: img.url,
		type: obj.type,
		location: obj.location,
		address: obj.address,
		description: obj.description,
	});
	console.log(product);

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

exports.updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		description,
		image,
		brand,
		category,
		countInStock,
	} = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

exports.createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		);

		if (alreadyReviewed) {
			res.status(400);
			throw new Error('Product already reviewed');
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);
		product.numReviews = product.reviews.length;
		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json({ message: 'Review added' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

exports.getTopProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(3);

	res.json(products);
});


