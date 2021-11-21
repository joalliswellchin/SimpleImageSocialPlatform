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

## How can this be improved
1. SQL is not ideal, but because of lack of experience in NoSQL, This project sticks with SQL for the time being
2. To ship to production, you can use whichever orchestrator you desire.  Kubernetes is ideal, thus dockerfile is available. Set up Kubes to further improve containerization through orchestration
3. Using typescript can make this project less error prone during development. "use strict" might help with migration
4. Raw SQL is used here due to lack of experience with NodeJS ORM modules. Some examples of ORM are Sequelize. ORM can be helpful to add more velocity and migration tools if needed. Should you desire to do raw SQL still, flyway or sqitch are great tools. Otherwise to do migration, create a new migration folder and add .sql files. Always be careful of using raw SQL, even though this raw SQL development is temporary.
5. Consider moving to graphql. Resolvers can be useful in certain deeply nested REST API, and making data transfer faster due to the streamlined data requested.
6. Moving downloads to direct from S3, instead of from restful API

## Always remember:
1. Index when you need to
2. clean code is never mean code
3. Try to DRY or KISS
4. Stay Positive! Code doesn't kill you so it makes you stronger :)

## FYI
1. S3 has been graciously provided for a temporary period :)