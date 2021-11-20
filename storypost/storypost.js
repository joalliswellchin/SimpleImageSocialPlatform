const pool = require('../db/db')
require('dotenv').config({path: '../.env'});

// create post
createStorypost = async (body) => {
    const client = await pool.connect();
    // parameterised to prevent injection
    let qry = 'INSERT INTO storypost (img, caption, restriction, created_at, updated_at, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7);'

    return client.query(qry, [
        body.img,
        body.caption,
        body.restriction,
        Date.now(),
        Date.now(),
        body.created_by,
        body.updated_by
    ])
        .then(res => res.rows)
        .catch(err => {
          client.release()
          console.log(err)
        })
        .finally(() => client.release());
}

// upload image file
putImgFile = async (storyId) => {
    const client = await pool.connect();
    // parameterised to prevent injection
    let qry = 'UPDATE storypost set img VALUES $1 WHERE id = $2;'

    return client.query(qry, [ , storyId])
        .then(res => res.rows)
        .catch(err => {
          client.release()
          console.log(err)
        })
        .finally(() => client.release());

}

// create comment
createStorycomment = async (storyId, body) => {
    const client = await pool.connect();
    // parameterised to prevent injection
    let qry = 'INSERT INTO storypostcomment(storypost_id, comment, created_at, updated_at, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6);'

    return client.query(qry)
        .then(res => res.rows)
        .catch(err => {
          client.release()
          console.log(err)
        })
        .finally(() => client.release());
}

// get all post
getStorypostById = async (storyId) => {
    const client = await pool.connect();
    let qry = 'SELECT * FROM storypost'
    if (storyId != null) {
        qry += ' WHERE storypost.id = $1'
        results = client.query(qry, [storyId])
    } else {
        results = client.query(qry)
    }
    
    return results.then(res => res.rows)
        .catch(err => {
          client.release()
          console.log(err)
        })
        .finally(() => client.release());
}

// get post comments
getStorycommentById = async (storyCommentId) => {
    const client = await pool.connect();
    let qry = 'SELECT storypostcomment.*'+ 
    ' FROM storypostcomment, storypost'+
    ' WHERE storypostcomment.storypost_id = storypost.id '
    qry_end = ' ORDER BY storypostcomment.updated_at DESC LIMIT '+ process.env.COMMENT_LIMIT
    if (storyCommentId != null) {
        qry += ' AND storypostcomment.id = $1'
        results = client.query(qry + qry_end, [storyCommentId])
    } else {
        results = client.query(qry + qry_end)
    }
    return results.then(res => res.rows)
        .catch(err => {
          client.release()
          console.log(err.stack)
        })
        .finally(() => client.release());
}

getStorycommentByStorypost = async (storyId) => {
    const client = await pool.connect();
    let qry = 'SELECT storypostcomment.*'+ 
    ' FROM storypostcomment, storypost'+
    ' WHERE storypostcomment.storypost_id = storypost.id '
    qry_end = ' ORDER BY storypostcomment.updated_at DESC LIMIT '+ process.env.COMMENT_LIMIT
    if (storyId != null) {
        qry += ' AND storypost.id = $1'
        results = client.query(qry + qry_end, [storyId])
    } else {
        results = client.query(qry + qry_end)
    }
    return results.then(res => res.rows)
        .catch(err => {
          client.release()
          console.log(err.stack)
        })
        .finally(() => client.release());
}

module.exports = {
    createStorypost,
    getStorypostById,
    getStorycommentById,
    getStorycommentByStorypost
}