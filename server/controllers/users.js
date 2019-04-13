const knex = require('../../knex');
const humps = require('humps');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');


// Sign a token with 1 day expiration
const signToken = (userId) => {
  return JWT.sign(
    {
      iss: 'test',
      sub: userId,
      iat: new Date().getTime(), // Current time
      exp: new Date().setDate(new Date().getDate() + 1) // Current time + 1 day ahead
    },
    process.env.JWT_SECRET
  );
};

module.exports = {
  // *****************  SIGNUP  ****************
  // *******************************************
  // Validate request body against Joi schema
  signUp: (req, res, next) => {
    // req.value from Joi validation
    const email = req.value.body.email;
    const password = req.value.body.password;

    // Check if the user already exists in db
    knex('users')
      .select('user_email')
      .where('user_email', email)
      .first()
      .then((row) => {
        if (row) {
          let err = new Error('Email already exists!');
          err.statusCode = 403;
          throw err;
        }

        // Generate a password hash (salt + hash)
        const saltRounds = 12;
        return bcrypt.hash(password, saltRounds);
      })
      .then((hashedPassword) => {
        // Create a new user
        let newUser = {
          userEmail: email,
          userHashedPassword: hashedPassword
        };

        newUser = humps.decamelizeKeys(newUser);

        // Insert user into db & return user's ID
        return knex('users').returning('user_id').insert(newUser);
      })
      .then((userId) => {
        // Generate the token
        const token = signToken(userId[0]);

        // Respond with token
        res.status(200).send({ token });
      })
      .catch((err) => {
        next(err);
      });
  },

  // *****************  SIGNIN  ****************
  // *******************************************
  // Validate request body against the Joi schema
  // Authenticate user with Passport local strategy
  signIn: (req, res, next) => {
    // If authenticated, generate token with user ID
    const token = signToken(req.user.user_id);

    // Respond with token
    res.status(200).send({ token });
  },

  // *****************  RESOURCE  **************
  // *******************************************
  // Authenticate logged in user with Passport JWT strategy
  // If authenticated, allow user access to protected resource
  secret: (req, res, next) => {
    console.log('Authenticated! Here is the secret resource.');

    // Respond with resource
    res.send({ secret: 'resources' });
  }
}
