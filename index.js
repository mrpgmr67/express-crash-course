const express = require('express');
const path = require('path');
const members = require('./Members');

const app = express();

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
};

app.use(logger);

app.get('/api/members', (req, res) => {
    res.json(members);
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('listening on port 5000');
});