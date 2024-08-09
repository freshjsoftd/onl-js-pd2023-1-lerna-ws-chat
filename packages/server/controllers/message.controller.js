const { Message } = require('../models');

module.exports.getMessages = async (req, res, next) => {
	try {
		const allMessages = await Message.find()
			.sort({ createdAt: 1 })
			.limit(30);
		// console.log(allMessages);
		res.status(200).json(allMessages);
	} catch (error) {
		console.log(error.message)
		next(error);
	}
};
