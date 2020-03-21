const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();

admin.initializeApp();

const config = {
  apiKey: "AIzaSyDD5vATYblq8b4Buep67uuTa3hTBDoQ-Y8",
  authDomain: "weichie-journal.firebaseapp.com",
  databaseURL: "https://weichie-journal.firebaseio.com",
  projectId: "weichie-journal",
  storageBucket: "weichie-journal.appspot.com",
  messagingSenderId: "426835331711",
  appId: "1:426835331711:web:dd47c75419c72a68d20d4a"
};

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

const FBAuth = (req, res, next) => {
  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    console.error('No token found');
    return res.status(403).json({ error: 'Unauthorized' });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      return db.collection('users').where('userId', '==', req.user.uid).limit(1).get();
    })
    .then((data) => {
      req.user.userHandle = data.docs[0].data().userHandle;
      return next();
    })
    .catch((err) => {
      console.error('Error while verifying token ', err);
      return res.status(403).json(err);
    });
}

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
app.post('/journal', FBAuth, (req, res) => {
  const newJournal = {
    body: req.body.body,
    userHandle: req.user.userHandle,
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

// -- Login route ----------
app.post('/login', (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  let errors = {};

  if (isEmpty(user.email)) errors.email = 'Must not be empty';
  if (isEmpty(user.password)) errors.password = 'Must not be empty';

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({ token });
    })
    .catch(err => {
      console.error(err);
      if(err.code === 'auth/wrong-password'){
        return res.status(403).json({general: 'Wrong credentials, please try again'});
      };
      return res.status(500).json({ error: err.code });
    });
});

// -- Signup route ----------
app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    userHandle: req.body.userHandle,
  };

  let errors = {};

  if (isEmpty(newUser.email)) {
    errors.email = 'Must not be empty';
  } else if (!isEmail(newUser.email)) {
    errors.email = 'Must be a valid email address';
  }

  if (isEmpty(newUser.password)) errors.password = 'Must not be empty';
  if (newUser.password !== newUser.confirmPassword) errors.confirmPassword = 'Passwords must match';
  if (isEmpty(newUser.userHandle)) errors.handle = 'Must not be empty';

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);
  
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
});

/* Export Routes */
exports.api = functions.region('europe-west1').https.onRequest(app);