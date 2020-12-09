require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const Theorem = require('./models/theorem');


app.get('/', (req, res) => {
  res.json({ message: 'Hi' })
})

app.post('/make/theorem', (req, res) => {
  try {
    const theorem = req.body;

    Theorem
      .make(theorem)
      .then(response => res.send(response))

  } catch(e) {
    res.send(e.message)
  }
})


module.exports = app;
