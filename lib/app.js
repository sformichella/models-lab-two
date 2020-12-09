require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const Theorem = require('./models/theorem');


app.get('/', (req, res) => {
  res.json({ message: 'Hi' })
})

app.post('/theorems', (req, res) => {
  const theorem = req.body;

  Theorem
    .make(theorem)
    .then(response => res.send(response))
    .catch(err => res.send(err.message));
})

app.get('/theorems', (req, res) => {
  Theorem
    .getAll()
    .then(response => res.send(response))
})

app.get('/theorems/:id', (req, res) => {
  const id = req.params.id;

  Theorem
    .getById(id)
    .then(response => res.send(response))
    .catch(err => res.send(err.message));
})

app.put('/theorems/:id', (req, res) => {
  const id = req.params.id

  Theorem
    .update(id, req.body)
    .then(response => res.send(response))
    .catch(err => res.send(err.message))
})

app.delete('/theorems/:id', (req, res) => {
  const id = req.params.id;

  Theorem
    .delete(id)
    .then(response => res.send(response))
})


module.exports = app;
