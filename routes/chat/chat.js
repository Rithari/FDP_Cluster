module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Main server room
        socket.join('main');

        socket.on('chat message', (data) => {
            const timestamp = new Date().toISOString();
            console.log(data);
            const msg = data;
            const user = data.user || `Anonymous${Math.floor(Math.random() * 1000)}`;
            console.log(`[${timestamp}] Message from ${user}: ${msg}`);
            io.to('main').emit('chat message', { user, msg, timestamp });
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    
    
};  