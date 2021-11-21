# SimpleImageSocialPlatform
Simple Image Upload Social Platform

# How to get started?
## Set up postgres
Install postgres here: https://www.postgresql.org/download/

run these:
```
npm run initdb
```

## Set up the application

### Using node
Install nodejs here: https://nodejs.org/en/download/

run these:
```
npm i
npm run start
```

### Using Docker
Install docker here: https://docs.docker.com/get-docker/

run these:
```
docker build -t sisp_be .
docker run --net=host sisp_be
```

## Using postman collection
Until a swaggerAPI documentation is done, you can make use of the Postman collection in this repository. Simply import the collections to Postman.
Install Postman here: https://www.postman.com/downloads/