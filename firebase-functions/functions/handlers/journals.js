const { db } = require('../util/admin');

exports.getAllJournals = (req, res) => {
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
}

exports.postOneJournal = (req, res) => {
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
}