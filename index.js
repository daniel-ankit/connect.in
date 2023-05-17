const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const server = http.createServer(app);
const port = process.env.port || 3000;
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

const io = require('socket.io')(server);
var users = {};
io.on("connection", (socket)=>{
    socket.on("new_user_joined", (username)=>{
        users[socket.id] = username;
        socket.broadcast.emit('user-joined', username);
        io.emit("user-list", users);
    })
    socket.on("disconnect", ()=>{
        socket.broadcast.emit('user-disconnect', user=users[socket.id]);
        delete users[socket.id];
        io.emit("user-list", users);
    })
    socket.on('message', (data)=>{
        socket.broadcast.emit("message", data);
    })
});

server.listen(port, ()=>{
    console.log("Listening on port", port);
});