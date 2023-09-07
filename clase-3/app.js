const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const cors = require('cors')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')
const app = express()
app.disable('x-powered-by')

app.use(express.json())
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:1234'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))

app.get('/', (req, res) => {
  res.json({ message: 'Hola mundo' })
})

app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => { // path-to-regexp
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  return res.status(404).json({ status: 404, message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ status: 400, errorMessage: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  // esto no sería REST, porque estamos guardando
  // el estado de la aplicación en memoria
  movies.push(newMovie)

  res.status(201).json(newMovie) // actualizar la cache del cliente
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (result.error) {
    res.status(400).json({ status: 400, errorMessage: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  // usamos el index hasta que manejemos la info en base de datos
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex < 0) {
    return res.status(404).json({ status: 404, errorMessage: 'Movie not found' })
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updatedMovie

  res.status(201).json(updatedMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params

  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex < 0) {
    return res.status(404).json({ status: 404, errorMessage: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  res.json({ message: 'Movie deleted' })
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, (req, res) => {
  console.log(`Listening on port http://localhost:${PORT}`)
})
