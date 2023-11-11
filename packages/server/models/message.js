const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema(
	{
		author: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			minlength: 1,
			maxlength: 255,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);


const Message = mongoose.model('Message', messageSchema);

module.exports = Message;