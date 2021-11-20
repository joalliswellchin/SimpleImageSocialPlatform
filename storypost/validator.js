// file ext
validFileExt = (filename) => {
    const ext = filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;

    return ['jpg', 'png', 'bmp'].includes(ext) 
}

// file size
validFileSize = (dir) => {
    const size = document.getElementById(dir).files[0].size
    return size < 100000000 
}

