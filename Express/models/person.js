const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		// favorites: [favoriteSchema],
	},
	{
		timestamps: true,
	}
);

// userSchema.methods.matchPassword = async function (enteredPassword) {
// 	return await bcrypt.compare(enteredPassword, this.password);
// };

// // before save encrypt the password - encryption middleware
// userSchema.pre('save', async function (next) {
// 	// if it is not modifed than move on, if modifed than encrypt it
// 	if (!this.isModified('password')) {
// 		next();
// 	}

// 	const salt = await bcrypt.genSalt(10);
// 	this.password = await bcrypt.hash(this.password, salt);
// });

// exports.User = mongoose.model('User', userSchema);
const User = mongoose.model('User', userSchema);
module.exports = User;
// export default User;
