// const express = require('express')
const router = require('express').Router()
const db = require('../accounts/accounts-model')
const { checkAccountPayload, checkAccountId, checkAccountNameUnique } = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  db.getAll()
  .then(accounts => { res.status(200).json(accounts)} )
  .catch(err => next(err))
})

router.get('/:id', checkAccountId, (req, res, next) => {
  db.getById(req.params.id)
  .then(accounts => {res.status(200).json( accounts ) })
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  db.create(req.account)
    .then(newAccount => { res.status(201).json(newAccount) })
    .catch(err => next(err))
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  const id = req.params.id
  db.updateById(id ,req.account)
  .then(updatedAccount => res.status(200).json(updatedAccount))
  .catch(err => next(err))
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})


router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
