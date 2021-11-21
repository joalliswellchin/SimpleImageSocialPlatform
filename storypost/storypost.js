const { readFileSync } = require('fs');
const pool = require('../db/db')
require('dotenv').config({path: '../.env'});
const { uploadFileToS3 } = require('./util')

// create post
createStorypostSQL = async (req) => {
    const client = await pool.connect();
    // parameterised to prevent injection
    let qry = 'INSERT INTO storypost (img, caption, restriction, created_at, updated_at, created_by, updated_by) VALUES ($1, $2, $3, to_timestamp($4), to_timestamp($5), $6, $7);'

    restriction = req.body.restriction
    if (!restriction){
        restriction = null
    }
    if (!req.file) {
        return client.query(qry, [
            '',
            req.body.caption,
            restriction,
            Date.now(),
            Date.now(),
            req.body.created_by,
            req.body.updated_by
        ])
            .then(res => res.rows)
            .catch(err => {
              client.release()
              console.log(err)
            })
            .finally(() => client.release());
    }

    // validate image file
    // validate file size
    // upload to aws S3. Avoiding local storage due to high potential
    // to exceed volume
    console.log(req.file.path)
    uploadFileToS3(req.file.path, readFileSync(req.file.path))

    return client.query(qry, [
        `s3://${process.env.S3_FOLDER}/${req.file.filename}`,
        req.body.caption,
        restriction,
        Date.now(),
        Date.now(),
        req.body.created_by,
        req.body.updated_by
    ])
        .then(res => res.rows)
        .catch(err => {
          client.release()
          console.log(err)
        })
        .finally(() => client.release());
}

// upload image file
// putImgFile = async (storyId) => {
//     const client = await pool.connect();
//     let qry = 'UPDATE storypost set img VALUES $1 WHERE id = $2;'

//     return client.query(qry, [ , storyId])
//         .then(res => res.rows)
//         .catch(err => {
//           client.release()
//           console.log(err)
//         })
//         .finally(() => client.release());

// }

// create comment
createStorycommentSQL = async (storyId, body) => {
    const client = await pool.connect();
    // parameterised to prevent injection
    let qry = 'INSERT INTO storypostcomment(storypost_id, comment, created_at, updated_at, created_by, updated_by) VALUES ($1, $2, to_timestamp($3), to_timestamp($4), $5, $6);'

    return client.query(qry, [
        storyId,
        body.comment,
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
    createStorypostSQL,
    createStorycommentSQL,
    // putImgFile,
    getStorypostById,
    getStorycommentById,
    getStorycommentByStorypost
}