import express from 'express'

import { PostgresHelper } from './src/db/postgres/helper.js'

const app = express()

app.get('/', async (req, res) => {
    const results = await PostgresHelper.query('SELECT * FROM users;')

    console.log(results)

    res.send(JSON.stringify(results))
})

app.listen(3000, () => console.log('Listening on port 3000'))
