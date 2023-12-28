const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const app = express()
const port = 3001

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
  socket.on("send_notif", () => {
    socket.emit('load_notif')    
  })
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})