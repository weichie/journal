const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();

admin.initializeApp();



const firebase = require('firebase');
firebase.initializeApp(config);

const db = admin.firestore();

// allow localhost to call our firebase functions
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const arrayOfValidOrigins = ['http://localhost:3000'];
  if (arrayOfValidOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,HEAD,PUT,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// -- Get all journals ----------
app.get('/journals', (req, res) => {
  db
    .collection("journal")
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      let journals = [];
      data.forEach(doc => {
        journals.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt
        });
      });
      return res.json(journals);
    })
    .catch(err => {
      console.error(err);
    });
});

// -- Post a journal ----------
app.post('/journal', (req, res) => {
  const newJournal = {
    body: req.body.body,
    userHandle: 'weichie',
    createdAt: new Date().toISOString(),
  };

  db
    .collection('journal')
    .add(newJournal)
    .then(doc => {
      res.json({ message: `Document ${doc.id} created successfully` });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

const isEmpty = (string) => {
  if(string.trim() === '') return true;
  else return false;
}
const isEmail = (email) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
}

// -- Signup route ----------
app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  let errors = {};

  if (isEmpty(newUser.email)) {
    errors.email = 'Must not be empty';
  } else if (!isEmail(newUser.email)) {
    errors.email = 'Must be a valid email address';
  }

  if (isEmpty(newUser.password)) errors.password = 'Must not be empty';
  if (newUser.password !== newUser.confirmPassword) errors.confirmPassword = 'Passwords must match';
  if (isEmpty(newUser.handle)) errors.handle = 'Must not be empty';

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  db
    .doc(`/users/${newUser.handle}`)
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
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ code: err.code, message: err.message });
    });
});

/* Export Routes */
exports.api = functions.region('europe-west1').https.onRequest(app);