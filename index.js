import 'dotenv/config.js'

import { app } from './src/app'

app.listen(3000, () => console.log(`Listening on port ${process.env.PORT}`))
