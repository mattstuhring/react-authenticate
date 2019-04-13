# React Authenticate

Simple React app using a Node.js RESTful API for authenticating users via Passport.js local & JWT strategies

## Built With

* React
* Redux
* Node.js
* Express
* Passport.js
* JWTs
* PostgreSQL

### Requirements

Necessary tools for this project

* Node.js
* NPM
* PostgreSQL

### Install Packages

To install npm packages start from the root directory

```
$ npm install
```

```
$ cd client/
```

```
$ npm install
```

### Setup JWT Secret

Create .env file & add jwt secret

```
JWT_SECRET=somejsonwebtokensecret
```

### Database

Create a new PostgreSQL database & add details to knexfile.js

Popluate database . . .

```
$ npm run knex migrate:latest
```

```
$ npm run knex seed:run
```

### Start Development Environment

From the root directory . . .

```
$ npm run start-dev
```

## Author

* My Github - [Matt Stuhring](https://github.com/mattstuhring)
* Project Repository - [Authentication with Passport.js](https://github.com/mattstuhring/react-authenticate)
