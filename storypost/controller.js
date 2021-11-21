const { createStorypostSQL , 
    createStorycommentSQL , 
    getStorypostById , 
    getStorycommentById ,
    getStorypostImgAsJPG } = require('./storypost');

// create post
createStorypost = async (req, res) => {
    try {
        const storypost = await createStorypostSQL(req);
        res.status(201).send({
            data: storypost
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            desciption: error
        });
    }
}

// create comment
createStorycomment = async (req, res) => {
    try {
        const storypost = await createStorycommentSQL(req.params.getStorypostId, req.body);
        res.status(201).send({
            data: storypost
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            desciption: error
        });
    }
}


// get all post
getStorypost = async (req, res) => {
    try {
        const storypost = await getStorypostById(req.params.getStorypostId);
        res.send({
            data: storypost
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            desciption: error
        });
    }
}

// get post comments
getStorycomment = async (req, res) => {
    try {
        const storycomment = await getStorycommentById(req.params.getStorycommentId);
        res.send({
            data: storycomment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            desciption: error
        });
    }
}


getStorycommentFromStorypost = async (req, res) => {
    try {
        const storycomment = await getStorycommentByStorypost(req.params.getStorypostId);
        res.send({
            data: storycomment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            desciption: error
        });
    }
}

getStorypostImg = async (req, res, next) => {
    try {
        const storycomment = await getStorypostImgAsJPG(req.params.getStorypostId);
        
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.write(storycomment.Body, 'binary');
        res.end(null, 'binary');
    } catch (error) {
        console.log(error);
        res.status(500).json({
            desciption: error
        });
    }
}


module.exports = {
    createStorypost,
    createStorycomment,
    getStorypost,
    getStorycomment,
    getStorycommentFromStorypost,
    getStorypostImg
}