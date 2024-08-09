const mongoose = require('mongoose');

mongoose
	.connect(`mongodb://localhost:27017/chat-onl-js-pd2023-2`)
	.then(() => console.log(`Connect to db chat-onl-js-pd2023-2 is successful`))
	.catch((err) => {
		console.log(`Error is ${err.message}`);
	});

module.exports.Message = require('./message');
