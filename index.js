import express from 'express'
import cors from 'cors'

import { PostgresGetUserByIdRepository } from './src/repositories/postgres/get-user-by-id.js'
import { PostgresCreateUserRepository } from './src/repositories/postgres/create-user.js'
import { PostgresUpdateUserRepository } from './src/repositories/postgres/update-user.js'
import { PostgresDeleteUserRepository } from './src/repositories/postgres/delete-user.js'

import { GetUserByIdUseCase } from './src/use-cases/get-user-by-id.js'
import { CreateUserUseCase } from './src/use-cases/create-user.js'
import { UpdateUserUseCase } from './src/use-cases/update-user.js'
import { DeleteUserUseCase } from './src/use-cases/delete-user.js'

import { CreateUserController } from './src/controller/create-user.js'
import { GetUserByIdController } from './src/controller/get-user-by-id.js'
import { UpdateUserController } from './src/controller/update-user.js'
import { DeleteUserController } from './src/controller/delete-user.js'

const app = express()

app.use(express.json())

app.use(cors())

app.get('/', async (req, res) => {
    console.log('Ok!', req.body)

    return res.status(200).json({ message: 'Ok!' })
})

// CREATE USER
app.post('/api/users', async (req, res) => {
    const postgresCreateUserRepository = new PostgresCreateUserRepository()

    const createUserUseCase = new CreateUserUseCase(
        postgresCreateUserRepository,
    )

    const createUserController = new CreateUserController(createUserUseCase)

    const { statusCode, body } = await createUserController.execute(req)

    res.status(statusCode).json(body)
})

// GET USER BY ID
app.get('/api/users/:userId', async (req, res) => {
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserByIdUseCase = new GetUserByIdUseCase(
        postgresGetUserByIdRepository,
    )

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    const { statusCode, body } = await getUserByIdController.execute(req)

    return res.status(statusCode).json(body)
})

//PATCH USER BY ID
app.patch('/api/users/:userId', async (req, res) => {
    const postgresUpdateUserRepository = new PostgresUpdateUserRepository()

    const updateUserUseCase = new UpdateUserUseCase(
        postgresUpdateUserRepository,
    )

    const updateUserController = new UpdateUserController(updateUserUseCase)

    const { statusCode, body } = await updateUserController.execute(req)

    return res.status(statusCode).json(body)
})

//DELETE USER BY ID
app.delete('/api/users/:userId', async (req, res) => {
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository()

    const deleteUserUseCase = new DeleteUserUseCase(
        postgresDeleteUserRepository,
    )

    const deleteUserController = new DeleteUserController(deleteUserUseCase)

    const { statusCode, body } = await deleteUserController.execute(req)

    return res.status(statusCode).json(body)
})

app.listen(3000, () => console.log(`Listening on port ${process.env.PORT}`))
