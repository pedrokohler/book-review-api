
# Introduction
This is app was created as a take-home challenge for the ramani.io selection process. The instructions used to build it can be found in the [Challenge section](#challenge)

Apart from the requirements, tests were included in order to make sure that all the business rules of the application are being followed, as well as that no refactoring could create any issues regarding them.

Also the BooksReviewsRepository module was created using the Dependency Inversion Principle, meaning that instead of relying on the repository's implementation, the business rules module, i.e. books-reviews aggregate, relies only on an interface. The real implementation of the mongodb repository is made inside the infrastructure folder and it implements the interface required by the books-reviews aggregate.

For the tests, instead of using the real mongodb implementation, we mock it with another implementation that is an in-memory repository.

The whole documentation of the API can be found in the [swagger page](https://ramani-books-reviews-api.herokuapp.com/api/) of its [live version](https://ramani-books-reviews-api.herokuapp.com/).

You can also use any API platform such as Postman or Insomnia in order to use the API, which is currently open for anyone.

The live version uses the free tier of MongoDB Atlas and is hosted in Heroku.

An automatic CI-CG pipeline was created using Github Actions and any push into Github's master branch will trigger a new deployment to Heroku automatically. Heroku will use the Dockerfile present in the root of the application in order to know how to build and run it.

## Possible improvements on the current version
Some nice improvements on the existing code:
 * Make integration tests with an in-memory database, such as Mongo Memory Server, that uses the actual mongodb implementation
 * Make end-to-end tests to test not only the services and repository, but also the app controllers
 * Usage of query cursors, so that not all documents are brought by the GET method calls
 * Implement API authentication
 * Create endpoints to update and delete books
 * Create endpoints to filter books based on genre, author or year
 * Include possibility of ordering results by rating

# General Instructions
## Installation

```bash
$ npm install
```
## Running the app


Run the app with docker-compose by running the following command at the root folder of your app:

```bash
docker-compose up
```

You can also run it manually without docker-compose, but, before running the app, make sure you have the following environment variables set (e.g.: using a .env file at the root of the application) with the corresponding values for your application:


```bash
MONGO_CONNECTION_STRING=
MONGO_DATABASE_NAME=
```

Use these commands to run it manually:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Challenge
## Task

**Build a book directory.**

Create a REST API that allows a user to manage a book directory.

The user should be able to do things like add and remove books, as well as

get statistics about a certain book or group of books.

**We will need 6 basic APIs:**

1) GET books grouped by genre
2) GET books grouped by genre and release date eg

     Comedy

           2021

                Book 1

                Book2

           2020

                Book3

                Book4

     Thriller

           2021

                Book 5

                Book6

           2019

                Book7

3) GET sum of review ratings grouped by author
4) POST add a new book to the directory
5) POST add a review
6) DELETE delete a review

### Technical Details

- **Must use technologies:** Nest.js, Express.js, MongoDb, [Mongoose](https://mongoosejs.com/docs/)
- collection name: books
- **Document Schema for Books**
    - _id:ObjectId()
    - bookName:String
    - author:String
    - releaseDate:Date
    - genre:String
    - reviews:Array[]// Array of Review Schema
- **Document Schema for Review**
    - _id:ObjectId()
    - review:String
    - rating:Number