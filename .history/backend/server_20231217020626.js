const express = require('express');
const helper = require('./apis/helper');
const status-updates = require('./apis/status-updates')
const user = require('./apis/user')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser');


const mongoDBEndpoint = process.env.MONGODB_URI || 'mongodb+srv://tianjie6688:<Wtj-8853044>@tianjiewebdev.oklaw3e.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDBEndpoint, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/status-udpates/', status);
app.use('/api/user/', users)



let frontend_dir = path.join(__dirname, '..', 'frontend', 'dist')

app.use(express.static(frontend_dir));
app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(frontend_dir, "index.html"));
});



app.listen(process.env.PORT || 8000, function () {
    console.log("Starting server now...")
})



// const http = require('http');

// const server = http.createServer(function (request, response) {

//     response.writeHead(200, { 'Content-Type': 'text/plain' });
//     response.end('Hello web dev!');

// })

// // 127.0.0.1 === localhost
// server.listen(8000, "127.0.0.1", function() {
//     console.log("The server has started!")
// })