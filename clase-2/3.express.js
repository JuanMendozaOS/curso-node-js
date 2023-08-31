const ditto = require('./pokemon/ditto.json')
const express = require('express')
const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['Content-type'] !== 'application/json') return next()

  // aquí solo llegan request que son POST y que tienen el header Content-Type: application/json

  let body = ''

  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)

    // mutar la request y meter info en req.body
    req.body = data
    next()
  })
})

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  // req.body guardar en base de datos
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
