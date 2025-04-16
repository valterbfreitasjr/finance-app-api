import express from 'express'
import cors from 'cors'

import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserByIdController,
    makeUpdateUserController,
    makeCreateTransactionController,
    makeGetTransactionByUserIdController,
    makeUpdateTransactionController,
    makeGetUserBalanceController,
    makeDeleteTransactionController,
} from './src/factories/index.js'

const app = express()

app.use(express.json())

app.use(cors())

app.get('/', async (req, res) => {
    console.log('Ok!', req.body)

    return res.status(200).json({ message: 'Ok!' })
})

// CREATE USER
app.post('/api/users', async (req, res) => {
    const createUserController = makeCreateUserController()

    const { statusCode, body } = await createUserController.execute(req)

    res.status(statusCode).json(body)
})

// GET USER BY ID
app.get('/api/users/:userId', async (req, res) => {
    const getUserByIdController = makeGetUserByIdController()

    const { statusCode, body } = await getUserByIdController.execute(req)

    return res.status(statusCode).json(body)
})

// PATCH USER BY ID
app.patch('/api/users/:userId', async (req, res) => {
    const updateUserController = makeUpdateUserController()

    const { statusCode, body } = await updateUserController.execute(req)

    return res.status(statusCode).json(body)
})

// DELETE USER BY ID
app.delete('/api/users/:userId', async (req, res) => {
    const deleteUserController = makeDeleteUserController()

    const { statusCode, body } = await deleteUserController.execute(req)

    return res.status(statusCode).json(body)
})

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

// GET USER BALANCE
app.get('/api/users/:userId/balance', async (req, res) => {
    const getUserBalanceController = makeGetUserBalanceController()

    const { statusCode, body } = await getUserBalanceController.execute(req)

    return res.status(statusCode).json(body)
})

app.listen(3000, () => console.log(`Listening on port ${process.env.PORT}`))
