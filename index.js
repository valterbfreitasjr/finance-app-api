import express from 'express'

const app = express()

app.get('/', async (req, res) => {
    console.log('Ok!')

    res.send(200)
})

app.listen(3000, () => console.log('Listening on port 3000'))
