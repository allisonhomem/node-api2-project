//imports
const express = require('express');
const router = express.Router();
const Posts = require('./posts-model.js');

//invoking the express function
const server = express();

//ENDPOINTS
//Returns **an array of all the post objects** contained in the database 
server.get('/api/posts', async (req,res) => {
    try{
        const posts = await Posts.find()

        if(!posts){
            res.status(500).json({message: "The posts information could not be retrieved"})
        }
        else{
            res.status(200).json(posts)
        }
    }
    catch(err){
        res.status(500).json({
            message: err.message,
            customMessage: "The posts information could not be retrieved" 
        })
    }
})

//Returns **the post object with the specified id** 
server.get('/api/posts/:id', async (req,res) => {
    try{
        const {id} = req.params
        const post = await Posts.findById(id)

        if(!post){
            res.status(404).json({message: "The post with the specified ID does not exist"})
        }
        else{
            res.status(200).json(post)
        }
    }
    catch(err){
        res.status(500).json({
            message: err.message,
            customMessage: "The post information could not be retrieved" 
        })
    }
})

//Creates a post using the information sent inside the request body and returns **the newly created post object** 
server.post('/api/posts', async (req,res) => {
    try{
        const {id, title, contents} = req.body

        if(!title || !contents){
            res.status(400).json({message: "Please provide title and contents for the post" })
        }
        else{
            const newPost = await Posts.insert({id, title, contents})
            res.status(201).json(newPost)
        }
    }
    catch(err){
        res.status(500).json({
            message: err.message,
            customMessage: "There was an error while saving the post to the database" 
        })
    }
})

//Updates the post with the specified id using data from the request body and **returns the modified document**, not the original
server.put('/api/posts/:id', async (req,res) => {
    try{

    }
    catch(err){

    }
})

//Removes the post with the specified id and returns the **deleted post object**
server.delete('/api/posts/:id', async (req,res) => {
    try{

    }
    catch(err){

    }
})

//Returns an **array of all the comment objects** associated with the post with the specified id  
server.get('/api/posts/:id/comments', async (req,res) => {
    try{

    }
    catch(err){

    }
})


//exports
module.exports = router;
