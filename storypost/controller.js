const { createStorypostSQL , createStorycommentSQL , getStorypostById , getStorycommentById } = require('./storypost');

// create post
createStorypost = async (req, res, next) => {
    const storypost = await createStorypostSQL(req);
    
    try {
        res.status(201).send({
            data: storypost
        });
    } catch (error) {
        console.log(error);
        next(Error(error.message));
    }
}

// create post
// updateStorypost = async (req, res, next) => {
//     const storypost = await putImgFile(req.body);
    
//     try {
//         res.status(201).send({
//             data: storypost
//         });
//     } catch (error) {
//         console.log(error);
//         next(Error(error.message));
//     }
// }

// create comment
createStorycomment = async (req, res, next) => {
    const storypost = await createStorycommentSQL(req.params.getStorypostId, req.body);
    
    try {
        res.status(201).send({
            data: storypost
        });
    } catch (error) {
        console.log(error);
        next(Error(error.message));
    }
}


// get all post
getStorypost = async (req, res, next) => {
    const storypost = await getStorypostById(req.params.getStorypostId);
    
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
    const storycomment = await getStorycommentById(req.params.getStorycommentId);
    
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
    console.log(req.params.getStorypostId);
    const storycomment = await getStorycommentByStorypost(req.params.getStorypostId);
    
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
    createStorycomment,
    getStorypost,
    getStorycomment,
    getStorycommentFromStorypost
}