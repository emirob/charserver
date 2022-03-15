const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express()
const server = http.createServer(app)

const io = new Server(server)

app.get('/', (req, res) => {
    console.log("in root dir ./")
    res.sendFile(__dirname + "/index.html")
})

io.on('connection', (socket) => {
    console.log("user connected")
    
    socket.on("chat message", (msg) => {
        io.emit('chat message', msg)
        console.log("message from client->" + msg)
    })

    socket.on('disconnect', (socket) =>{
        console.log("user disconnected")
    })
})

server.listen(3000, (req, res) =>{
    console.log("connection open for server")
})