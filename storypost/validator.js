const pool = require('../db/db')

// file ext
validFileExt = (filename) => {
    const ext = filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;

    return ['jpg', 'png', 'bmp'].includes(ext);
}

// file size
validFileSize = (dir) => {
    const size = document.getElementById(dir).files[0].size;
    return size < 100000000 ;
}

// valid storypost id
validStorypostId = async (storyId) => {
    const client = await pool.connect();
    let qry = 'SELECT * FROM storypost WHERE id=$1'
    client.query(qry, [
        storyId
    ])
        .then(res => res.rows)
        .catch(err => {
          client.release()
          console.log(err)
        })
        .finally(() => client.release());
    return res
}

module.exports = {
    validStorypostId
}