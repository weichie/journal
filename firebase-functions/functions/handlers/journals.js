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
    createdAt: req.body.date,
  };

  db
    .collection('journal')
    .where('userHandle', '==', newJournal.userHandle)
    .where('createdAt', '==', newJournal.createdAt)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: 'There is already a journal for that day' });
      } else {
        console.log(newJournal.userHandle, newJournal.createdAt);
        return db
          .collection('journal')
          .add(newJournal);
      }
    }).then((doc) => {
      return res.json({ success: 'true', forDay: `${newJournal.createdAt}`});
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: 'Something went wrong.. Please try again later.'});
    });

  // db
  //   .collection('journal')
  //   .add(newJournal)
  //   .then(doc => {
  //     res.json({ message: `Document ${doc.id} created successfully` });
  //   })
  //   .catch(err => {
  //     console.error(err);
  //     res.status(500).json({ error: 'Something went wrong' });
  //   });
}

exports.getUserJournals = (req, res) => {
  db.collection('journal')
    .where('userHandle', '==', req.user.userHandle)
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let journals = [];
      data.forEach((doc) => {
        journals.push({
          journalId: doc.id,
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