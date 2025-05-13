import 'dotenv/config.js'
import { app } from './src/app.cjs'

app.listen(3000, () => console.log(`Listening on port 3000`))
