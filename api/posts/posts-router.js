//imports
const express = require('express');
const router = express.Router();
const Posts = require('./posts-model.js');


//ENDPOINTS
//Returns **an array of all the post objects** contained in the database 
router.get('/', async (req,res) => {
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
router.get('/:id', async (req,res) => {
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
router.post('/', async (req,res) => {
    const {title, contents} = req.body

    if(!title || !contents){
        res.status(400).json({message: "Please provide title and contents for the post" })
    }
    else{
        Posts.insert({title, contents})
             .then(({id}) => {
                return Posts.findById(id)
             })
             .then(post => {
                res.status(201).json(post)
             })
             .catch((err) => {
                res.status(500).json({
                    message: err.message,
                    customMessage: "There was an error while saving the post to the database" 
                })
            })
    }
})

//Updates the post with the specified id using data from the request body and **returns the modified document**, not the original
router.put('/:id', async (req,res) => {
        const {id} = req.params
        const{title, contents} = req.body

        if (!title || !contents){
            res.status(400).json({message: "Please provide title and contents for the post"})
        }
        else {
            Posts.findById(id)
                 .then(post => {
                     if(!post){
                      res.status(404).json({message: "The post with the specified ID does not exist" })
                     }
            })

            Posts.update(id, {title, contents})
                 .then(data => {
                     if(data){
                         return Posts.findById(id)
                     }
                 })
                 .then(post => {
                     res.status(200).json(post)
                 })
                 .catch((err) => {
                     res.status(500).json({
                         message: err.message,
                         customMessage: "The post information could not be modified" 
                     })
                 })
        }
})

//Removes the post with the specified id and returns the **deleted post object**
router.delete('/:id', async (req,res) => {
    try{

    }
    catch(err){

    }
})

//Returns an **array of all the comment objects** associated with the post with the specified id  
router.get('/:id/comments', async (req,res) => {
    try{

    }
    catch(err){

    }
})


//exports
module.exports = router;
