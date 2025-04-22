import { Router } from 'express'
import {
    makeCreateTransactionController,
    makeDeleteTransactionController,
    makeGetTransactionByUserIdController,
    makeUpdateTransactionController,
} from '../factories/controllers/transaction'

export const transactionsRouter = Router()

// CREATE TRANSACTION
transactionsRouter.post('/', async (req, res) => {
    const createTransactionController = makeCreateTransactionController()

    const { statusCode, body } = await createTransactionController.execute(req)

    return res.status(statusCode).json(body)
})

// GET TRANSACTION BY USER ID
transactionsRouter.get('/', async (req, res) => {
    const getTransactionByUserIdController =
        makeGetTransactionByUserIdController()

    const { statusCode, body } =
        await getTransactionByUserIdController.execute(req)

    return res.status(statusCode).json(body)
})

// UPDATE TRANSACTION
transactionsRouter.patch('/:transactionId', async (req, res) => {
    const updateTransactionController = makeUpdateTransactionController()

    const { statusCode, body } = await updateTransactionController.execute(req)

    return res.status(statusCode).json(body)
})

// DELETE TRANSACTION
transactionsRouter.delete('/:transactionId', async (req, res) => {
    const deleteTransactionController = makeDeleteTransactionController()

    const { statusCode, body } = await deleteTransactionController.execute(req)

    return res.status(statusCode).json(body)
})
