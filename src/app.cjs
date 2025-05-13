const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const { usersRouter, transactionsRouter } = require('./routes/index.js')
const swaggerUi = require('swagger-ui-express')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/transactions', transactionsRouter)

const swaggerDocument = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../docs/swagger.json'), 'utf8'),
)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
module.export = { app }
