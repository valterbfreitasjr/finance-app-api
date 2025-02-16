import express from 'express'
import { CreateUserController } from './src/controller/create-user.js'

const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
    console.log('Ok!')

    res.status(200)
})

app.post('/api/users', async (req, res) => {
    const createUserController = new CreateUserController()

    const createUserResponse = await createUserController.execute(req)

    res.sendStatus(createUserResponse.statusCode).json(createUserResponse.body)
})

app.listen(3000, () => console.log('Listening on port 3000'))
