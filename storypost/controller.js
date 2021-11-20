const express = require('express');
const { nextTick } = require('process');
const { getStorypostById , getStorycommentById } = require('./storypost');

// create post
createStorypost = async (req, res, next) => {
    console.log('in here 2')
    const storypost = await createStorypost(req.body)
    
    try {
        res.send({
            data: storypost
        });
    } catch (error) {
        console.log(error);
        next(Error(error.message));
    }
}

// create comment

// get all post
getStorypost = async (req, res, next) => {
    const storypost = await getStorypostById(req.params.getStorypostId)
    
    try {
        res.send({
            data: storypost
        });
    } catch (error) {
        console.log(error);
        next(Error(error.message));
    }
}

// get post comments
getStorycomment = async (req, res, next) => {
    const storycomment = await getStorycommentById(req.params.getStorycommentId)
    
    try {
        res.send({
            data: storycomment
        });
    } catch (error) {
        console.log(error);
        next(Error(error.message));
    }
}


getStorycommentFromStorypost = async (req, res, next) => {
    console.log(req.params.getStorypostId)
    const storycomment = await getStorycommentByStorypost(req.params.getStorypostId)
    
    try {
        res.send({
            data: storycomment
        });
    } catch (error) {
        console.log(error);
        next(Error(error.message));
    }
}


module.exports = {
    createStorypost,
    getStorypost,
    getStorycomment,
    getStorycommentFromStorypost
}