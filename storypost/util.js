const AWS = require("aws-sdk");
require('dotenv').config({path: '../.env'});

// convert file to jpg

// upload to s3
const BUCKET_NAME = process.env.S3_FOLDER ||  "sisp1";
const bucketRegion = process.env.AWS_REGION || "ap-southeast-1";
const IdentityPoolId = process.env.COGNITO_POOL_ID || "7fe15099-1a93-4042-b906-39229a3f27b2";

AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IdentityPoolId
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

module.exports = {
    uploadFileToS3
}