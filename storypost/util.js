const AWS = require("aws-sdk");
require('dotenv').config({path: '../.env'});

// convert file to jpg

// upload to s3
const BUCKET_NAME = process.env.S3_FOLDER ||  "sisp1";
const region = process.env.AWS_REGION || "ap-southeast-1";
const IdentityPoolId = process.env.COGNITO_POOL_ID || "7fe15099-1a93-4042-b906-39229a3f27b2";

AWS.config.update({
    region: region,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: `${region}:${IdentityPoolId}`
    })
  });
const S3 = new AWS.S3({});
  
uploadFileToS3 = (filename, buffer) => {
    const uploadParams = {
        Body: buffer,
        Bucket: BUCKET_NAME,
        Key: filename
    };
    return new Promise((resolve, reject) =>
        S3.upload( uploadParams, (err , data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        }
      )
    );
}

downloadFileFromS3 = (filename) => {
    if (!filename.includes(`s3://${BUCKET_NAME}`)) {
        throw 'Not a S3 directory'
    }
    else {
        filename = filename.substring(`s3://${BUCKET_NAME}/`.length)
    }

    const params = {
        Bucket: BUCKET_NAME,
        Key: filename
    };
    return new Promise((resolve, reject) =>
        S3.getObject( params, (err , data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        }
      )
    );
}


module.exports = {
    uploadFileToS3,
    downloadFileFromS3
}