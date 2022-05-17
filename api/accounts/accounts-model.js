const db = require('../../data/db-config')

const getAll = async () => {
  return db('accounts')
}

const getById = async id => {
  return db('accounts').where({id:id})
}

const create = account => {
  // DO YOUR MAGIC
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
