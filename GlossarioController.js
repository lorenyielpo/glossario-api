require('dotenv-safe').load()
const { connect } = require('./GlossarioRepository')
const glossarioModel = require('./GlossarioSchema')

connect()

const getAll = () => {
    return glossarioModel.find((error, termos) => {
        return termos
    })
}

const getById = (id) => {
    return glossarioModel.findById(id)
}

const add = (termo) => {
    const novoTermo = new glossarioModel(termo)
    return novoTermo.save()
}

const update = (id, termo) => {
    return glossarioModel.findByIdAndUpdate(id,
        {$set: termo},
        {new: true}
        )
}

module.exports = {
    getAll,
    getById,
    add,
    update
}