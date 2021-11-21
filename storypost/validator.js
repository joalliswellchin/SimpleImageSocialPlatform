const pool = require('../db/db')
require('dotenv').config({path: '../.env'});

// file ext
validFileExt = (type) => {
    return ['image/jpeg', 'image/png', 'image/bmp'].includes(type);
}

// file size
validFileSize = (size) => {
    return size < process.env.MAX_FILE_LIMIT;
}

module.exports = {
    validFileExt,
    validFileSize
}