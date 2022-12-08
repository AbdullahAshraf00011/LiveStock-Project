const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		picture: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model('Product', productSchema);
module.exports = User;
