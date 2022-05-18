const db = require('../../data/db-config')
// const knex = require('knex');

const accounts = () => db('accounts')

const getAll = async () => {
  // console.log(accounts)
  // return db('accounts')
  // return accounts()
  return db.select().from('accounts')
  
}

const getById = async id => {
  // return db('accounts').where({id})
  // return accounts().where({id})
  return db.select().from('accounts').where({id}).first()
}

const create = async account => {
  const newAccount = await db('accounts').insert({...account})
  return getById(newAccount[0])
}

const updateById = async (id, changes) => { // TO DO :  validate unique name before update.
  // console.log(id, changes)
  // const updatedAccount = await db('accounts').where({id}).update({name:changes.name, budget:changes.budget})
  await db('accounts').update(changes).where({id})
  return getById(id)
}

const deleteById = id => {
  // DO YOUR MAGIC
}

//SELECT * FROM accounts WHERE name='account-02';
const getAccountNameById = async name => {
  return db.select().from('accounts').where({name}).first()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getAccountNameById
}
