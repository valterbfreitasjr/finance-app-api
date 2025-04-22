import express from 'express'
import cors from 'cors'

import {
    makeCreateTransactionController,
    makeGetTransactionByUserIdController,
    makeUpdateTransactionController,
    makeDeleteTransactionController,
} from './src/factories/index.js'
import { usersRouter } from './src/routes/users.js'

const app = express()

app.use(express.json())

app.use(cors())

app.use('/api/users', usersRouter)

app.listen(3000, () => console.log(`Listening on port ${process.env.PORT}`))

// CREATE TRANSACTION
app.post('/api/transactions', async (req, res) => {
    const createTransactionController = makeCreateTransactionController()

    const { statusCode, body } = await createTransactionController.execute(req)

    return res.status(statusCode).json(body)
})

// GET TRANSACTION BY USER ID
app.get('/api/transactions', async (req, res) => {
    const getTransactionByUserIdController =
        makeGetTransactionByUserIdController()

    const { statusCode, body } =
        await getTransactionByUserIdController.execute(req)

    return res.status(statusCode).json(body)
})

// UPDATE TRANSACTION
app.patch('/api/transactions/:transactionId', async (req, res) => {
    const updateTransactionController = makeUpdateTransactionController()

    const { statusCode, body } = await updateTransactionController.execute(req)

    return res.status(statusCode).json(body)
})

// DELETE TRANSACTION
app.delete('/api/transactions/:transactionId', async (req, res) => {
    const deleteTransactionController = makeDeleteTransactionController()

    const { statusCode, body } = await deleteTransactionController.execute(req)

    return res.status(statusCode).json(body)
})
