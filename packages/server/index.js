const http = require('http');
// ============================
const {Server} = require('socket.io')
// ============================
const app = require('./app');
const { Message } = require('./models');

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

	socket.on('New message', async () => {
		console.log('User has been connected')
	})
})

httpServer.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`);
});
