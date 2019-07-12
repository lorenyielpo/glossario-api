const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GlossarioSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  termo: { type: String, required: true },
  significado: { type: String, required: true },
  fonte: { type: String, required: true }
})

const glossarioModel = mongoose.model('glossario', GlossarioSchema);

module.exports = glossarioModel;