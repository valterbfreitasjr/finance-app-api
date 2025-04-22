import express from 'express'
import cors from 'cors'

import { usersRouter } from './src/routes/users.js'
import { transactionsRouter } from './src/routes/transactions.js'

export const app = express()

app.use(cors())

app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/transactions', transactionsRouter)
