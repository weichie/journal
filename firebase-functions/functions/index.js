const functions = require('firebase-functions');
const app = require('express')();

const FBAuth = require('./util/fbAuth');

const { getAllJournals, postOneJournal, getUserJournals } = require('./handlers/journals');
const { signup, login, getAuthenticatedUser } = require('./handlers/users');

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

// -- JOURNAL Routes ----------
app.get('/journals', getAllJournals);
app.get('/userjournals', FBAuth, getUserJournals);
app.post('/journal', FBAuth, postOneJournal);

// -- USER Route ----------
app.post('/login', login);
app.post('/signup', signup);
app.get('/user', FBAuth, getAuthenticatedUser);

/* Export Routes */
exports.api = functions.region('europe-west1').https.onRequest(app);