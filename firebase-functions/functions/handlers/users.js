const { db } = require('../util/admin');

const config = require('../util/config');

const firebase = require('firebase');
firebase.initializeApp(config);

const { validateSignupData, validateLoginData } = require('../util/validators');

exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    userHandle: req.body.userHandle,
  };

  const { valid, errors } = validateSignupData(newUser);
  if(!valid) return res.status(400).json(errors);

  let token, userId;
  db
    .doc(`/users/${newUser.userHandle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: 'This handle is already taken' });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        userHandle: newUser.userHandle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
      };
      return db.doc(`/users/${newUser.userHandle}`).set(userCredentials);
    })
    .then((data) => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ code: err.code, message: err.message });
    });
}

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(user);
  if (!valid) return res.status(400).json(errors);

  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({ token });
    })
    .catch(err => {
      console.error(err);
      if (err.code === 'auth/wrong-password') {
        return res.status(403).json({ general: 'Wrong credentials, please try again' });
      };
      return res.status(500).json({ error: err.code });
    });
}

// -- Get logged in user details ----------
exports.getAuthenticatedUser = (req, res) => {
  let userData = {};
  db
    .doc(`/users/${req.user.userHandle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db.collection('favorites').where('userHandle', '==', req.user.userHandle).get();
      }
    })
    .then((data) => {
      userData.favorites = [];
      data.forEach(doc => {
        userData.favorites.push(doc.data());
      });
      return res.json(userData);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
}