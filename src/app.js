import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'

import { usersRouter } from '../src/routes/users.js'
import { transactionsRouter } from '../src/routes/transactions.js'
import swaggerUi from 'swagger-ui-express'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/transactions', transactionsRouter)

const swaggerDocument = JSON.parse(
    fs.readFileSync(
        path.join(import.meta.dirname, '../docs/swagger.json'),
        'utf8',
    ),
)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
export { app }
