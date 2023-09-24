import express, { json } from 'express'

import { moviesRouter } from './routes/movies'
import { corsMiddleware } from './middleware/cors'
/*  Leer un json en ESModules
  import fs from 'node:fs'
  const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))
*/

// como leer un json en ESModules recomendado por ahora

const app = express()
app.disable('x-powered-by')

app.use(json())
app.use(corsMiddleware())
app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, (req, res) => {
  console.log(`Listening on port http://localhost:${PORT}`)
})
