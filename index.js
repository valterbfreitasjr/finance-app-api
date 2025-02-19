import express from 'express'
import { CreateUserController } from './src/controller/create-user.js'
import cors from 'cors'
import { GetUserByIdController } from './src/controller/get-user-by-id.js'
import { UpdateUserController } from './src/controller/update-user.js'

const app = express()

app.use(express.json())

app.use(cors())

app.get('/', async (req, res) => {
    console.log('Ok!', req.body)

    return res.status(200).json({ message: 'Ok!' })
})

// CREATE USER
app.post('/api/users', async (req, res) => {
    const createUserController = new CreateUserController()

    const createUserResponse = await createUserController.execute(req)

    res.status(createUserResponse.statusCode).json(createUserResponse.body)
})

// GET USER BY ID
app.get('/api/users/:userId', async (req, res) => {
    const getUserByIdController = new GetUserByIdController()

    const getUserByIdResponse = await getUserByIdController.execute(req)

    return res.status(200).json(getUserByIdResponse.body)
})

//PATCH USER BY ID
app.patch('/api/users/:userId', async (req, res) => {
    const updateUserController = new UpdateUserController()

    const updateUserResponse = await updateUserController.execute(req)

    return res.status(200).json(updateUserResponse.body)
})

app.listen(3000, () => console.log(`Listening on port ${process.env.PORT}`))
