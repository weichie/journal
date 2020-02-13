const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();

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