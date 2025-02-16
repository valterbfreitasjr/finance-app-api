import express from 'express'
import { CreateUserController } from './src/controller/create-user.js'
import cors from 'cors'

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

// GET USER
app.get('/api/users', async (req, res) => {
    console.log('GET USER', req.body)

    return res.status(200)
})

app.listen(3000, () => console.log('Listening on port 3000'))
