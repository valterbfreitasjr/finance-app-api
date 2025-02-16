import fs from 'fs'
import { pool } from '../helper.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const execMigrations = async () => {
    const client = await pool.connect()

    try {
        const filePath = path.join(__dirname, '02-alter-table.sql')
        const script = fs.readFileSync(filePath, 'utf-8')

        await client.query(script)

        console.log('Migration executed successfully')
    } catch (error) {
        console.log(error)
    } finally {
        await client.release()
    }
}

execMigrations()
