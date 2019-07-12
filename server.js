const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const servidor = express()
const glossarioController = require('./GlossarioController')
const params = require('params')
const parametrosPermitidos = require('./parametrosPermitidos')
const PORT = process.env.PORT || 7001
const logger = (request, response, next) => {
    console.log(`${new Date().toISOString()} Request type: ${request.method} to ${request.originalUrl}`)

    response.on('finish', () => {
        console.log(`${response.statusCode} ${response.statusMessage};`)
    })

    next()
}

servidor.use(cors())
servidor.use(bodyParser.json())
servidor.use(logger)

servidor.get('/', (request, response)=> {
    response.send('Novo glossárioooo')
})

servidor.get('/glossario', (request, response)=>{
    glossarioController.getAll()
    .then(termos => {
        response.send(termos)           
    })
    .catch(error => {
        if (error.name === 'CastError') {
            response.sendStatus(400)
        } else {
            response.sendStatus(500)
        }
    })
})

servidor.get('/glossario/:id', (request, response)=>{
    const {id} = request.params
    glossarioController.getById(id)
    .then(termo => {
        if (!termo) {
            response.sendStatus(404)
        } else {
            response.send(termo)
        }
    })
    .catch(error => {
        if (error.name === 'CastError') {
            response.sendStatus(400)
        } else {
            response.sendStatus(500)
        }
    })
})

servidor.post('/glossario', (request, response) => {
    glossarioController.add(params(request.body).only(parametrosPermitidos.add))
        .then(termo => {
            const _id = termo._id
            response.send(_id)
        })
        .catch(error => {
            if (error.name === 'ValidationError') {
                response.sendStatus(400)
            } else {
                console.log(error)
                response.sendStatus(500)
            }
        })
})

servidor.patch('/glossario/:id', (request, response)=> {
    const {id} = request.params
    glossarioController.update(id, params(request.body).only(parametrosPermitidos.update))
    .then(termo => {
        if (!termo) {
            response.sendStatus(404)
        } else {
            response.send(termo)
        }
    })
    .catch(error => {
        if (error.name === 'CastError') {
            response.sendStatus(400)
        } else {
            response.sendStatus(500)
        }
    })
})



servidor.listen(PORT)
console.info(`Rodando na porta ${PORT}`)