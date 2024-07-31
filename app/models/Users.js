const mongoose = require("mongoose");
const crypto = require("node:crypto");

const userSchema = new mongoose.Schema(
	{
		username: String,
		password: String, // md5 hashed
	},
	{
		methods: {
			auth: function (password) {
				const hash_password = crypto
					.createHash("md5")
					.update(password)
					.digest("hex");
				return this.password === hash_password;
			},
		},
	},
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
