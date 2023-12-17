import express, { json, urlencoded, static } from 'express';
import helper from './api/helper';
import statusUpdates from './api/statusUpdates';
import user from './api/user';
const app = express();
import { connect, connection } from 'mongoose';
import cors from 'cors';
import { join } from 'path';
import cookieParser from 'cookie-parser';


const mongoDBEndpoint = process.env.MONGODB_URI || 'mongodb+srv://tianjie6688:Wtj-8853044@tianjiewebdev.oklaw3e.mongodb.net/?retryWrites=true&w=majority';
// const mongoDBEndpoint = 'mongodb://127.0.0.1/collection_name';

connect(mongoDBEndpoint, { useNewUrlParser: true });

const db = connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/statusUpdates', statusUpdates);
app.use('/api/user', user)



let frontend_dir = join(__dirname, '..', 'frontend', 'dist')

app.use(static(frontend_dir));
app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(join(frontend_dir, "index.html"));
});



app.listen(process.env.PORT || 8000, function () {
    console.log("Starting server now...")
})



// const http = require('http');

// const server = http.createServer(function (request, response) {

//     response.writeHead(200, { 'Content-Type': 'text/plain' });
//     response.end('Hello web dev!');

// })

// 127.0.0.1 === localhost
// server.listen(8000, "127.0.0.1", function () {
//     console.log("The server has started!")
// })