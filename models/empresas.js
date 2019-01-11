const mongoose = require('mongoose')
const Schema = mongoose.Schema

const empresaSchema = new Schema({
  name: String,
  homepage_url: String,
  number_of_employees: Number,
  overview: String
})

const Empresa = mongoose.model('companies', empresaSchema)
module.exports = Empresa
