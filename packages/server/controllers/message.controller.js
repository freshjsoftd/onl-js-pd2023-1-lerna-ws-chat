const { Message } = require('../models');

module.exports.getMessages = async (req, res, next) => {
	try {
		const allMessages = await Message.find()
			.sort({ createdAt: 1 })
			.limit(20);
		console.log(allMessages);
		res.status(200).send(allMessages);
	} catch (error) {
		next(error.message);
	}
};
