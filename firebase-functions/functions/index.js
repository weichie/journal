const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();

// allow localhost to call our firebase functions
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const arrayOfValidOrigins = ['http://localhost:3000'];
  // arrayOfValidOrigins is an array of all the URL from where you want to allow 
  // to accept requests. In your case: ['http://localhost:3000'].
  // In case you want to accept requests from everywhere, set:
  // res.setHeader('Access-Control-Allow-Origin', '*');
  if (arrayOfValidOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,HEAD,PUT,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// -- Get all journals ----------
app.get('/journals', (req, res) => {
  admin
    .firestore()
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

  admin.firestore()
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

/* Export Routes */
exports.api = functions.region('europe-west1').https.onRequest(app);