import express from 'express'
import cors from 'cors'

import { usersRouter } from './src/routes/users.js'
import { transactionsRouter } from './src/routes/transactions.js'

const app = express()

app.use(express.json())

app.use(cors())

app.use('/api/users', usersRouter)
app.use('/api/transactions', transactionsRouter)

app.listen(3000, () => console.log(`Listening on port ${process.env.PORT}`))
