const http = require('http');
// ============================
const {Server} = require('socket.io');
// ============================
const app = require('./app');
const { Message } = require('./models');
const {SOCKET_EVENTS} = require('../client/src/constant/constants')

const PORT = 5000;

const httpServer = http.createServer(app);

const ioOptions = {
	cors: {
		origin: 'http://localhost:3000'
	}
}

const io = new Server(httpServer, ioOptions);

io.on('connect', (socket) => {
	console.log('User has been connected')
	console.log(`User id is ${socket.id}`)

	socket.on(SOCKET_EVENTS.NEW_MESSAGE, async (message) => {
		// console.log('User has been connected')
		try {
			const messageInstance = new Message(message);
			const createdMessage = await messageInstance.save();
			console.log(createdMessage)
			io.emit(SOCKET_EVENTS.NEW_MESSAGE, createdMessage);
		} catch (error) {
			socket.emit(SOCKET_EVENTS.MESSAGE_ERROR, error.message);
		}
		socket.on('disconnect', () => {
			console.log('User has been disconnected');
		});
	});
})

httpServer.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`);
});
