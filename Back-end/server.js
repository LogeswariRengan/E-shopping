const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
var cors = require('cors');
const app = express();

var url = require("url");
 var swagger = require("swagger-node-express");
// API file for interacting with MongoDB
const baseRouting = require('./router/baserouting.js');

// Parsers
// app.use(bodyParser({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb'}));
// app.use(bodyParser.json());

app.use(bodyParser.urlencoded({limit: '150mb'}));
app.use(bodyParser.json({limit: '150mb'}));

app.use(bodyParser.urlencoded({ extended: true}));

//cors
app.use(cors());

// Base Routing location
app.use('/baserouting', baseRouting);

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

//testing msa
app.get('/test',(req,res)=>{
    res.send("kkkkk");
})

swagger.setAppHandler(app);


const server = http.createServer(app);

server.listen(port, () => console.log(`Running on :${port}`));