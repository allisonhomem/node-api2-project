//imports
const express = require('express');
const postsRouter = require('./posts/posts-router.js');

//invoking the express function
const server = express();

//Global Middleware - teaches express to parse request bodies as json
server.use(express.json());
server.use('/api/posts/', postsRouter);


//exporting server
module.exports = server; 