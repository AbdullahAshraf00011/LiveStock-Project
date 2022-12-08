const User = require('../models/person')
const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")
const jwt = require('jsonwebtoken')

const generateToken = (id, t=18000) => { //300mint initial
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: t });
  };

exports.registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	const pas = await bcrypt.hash(password,10)
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await User.create({
		name,
		email,
		password:pas,
	});

	if (user) {
		console.log('User Created');
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

exports.authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	auth = await bcrypt.compare(password,user.password);
	if (user && auth) {
		console.log('User Authorized');
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

exports.getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.send(404);
		throw new Error('User not found');
	}
});

exports.refreshToken = asyncHandler(async (req, res) => {
	try {
			const token = req.headers.authorization.split(' ')[1];
			const user = await User.findOne( req.user._id );
			if (!user)
				return
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const timeRemaining = decoded.exp-(Date.now()/1000)
			if(timeRemaining < 300){//5 mint
				res.json({
					_id: user._id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
					token: generateToken(req.user._id,1200),
				});
			} 
		} catch (error) {
			console.error("error");
		}
});