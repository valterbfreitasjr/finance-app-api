import { Router } from 'express'
import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserBalanceController,
    makeGetUserByIdController,
    makeUpdateUserController,
} from '../factories/controllers/user'

export const usersRouter = Router()

// CREATE USER
usersRouter.post('/', async (req, res) => {
    const createUserController = makeCreateUserController()

    const { statusCode, body } = await createUserController.execute(req)

    res.status(statusCode).json(body)
})

// GET USER BY ID
usersRouter.get('/:userId', async (req, res) => {
    const getUserByIdController = makeGetUserByIdController()

    const { statusCode, body } = await getUserByIdController.execute(req)

    return res.status(statusCode).json(body)
})

// PATCH USER BY ID
usersRouter.patch('/:userId', async (req, res) => {
    const updateUserController = makeUpdateUserController()

    const { statusCode, body } = await updateUserController.execute(req)

    return res.status(statusCode).json(body)
})

// DELETE USER BY ID
usersRouter.delete('/:userId', async (req, res) => {
    const deleteUserController = makeDeleteUserController()

    const { statusCode, body } = await deleteUserController.execute(req)

    return res.status(statusCode).json(body)
})

// GET USER BALANCE
usersRouter.get('/:userId/balance', async (req, res) => {
    const getUserBalanceController = makeGetUserBalanceController()

    const { statusCode, body } = await getUserBalanceController.execute(req)

    return res.status(statusCode).json(body)
})
