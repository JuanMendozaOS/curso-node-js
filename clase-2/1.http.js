const http = require('node:http') // protocolo HTTP
const pc = require('picocolors')

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  console.log('request received: ', req.url)
  res.setHeader('Content-type', 'text/plain; charset=utf-8')

  if (req.url === '/') {
    res.statusCode = 200
    res.end('Bienvenido a mi página de inicio')
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end('Contacto')
  } else {
    res.statusCode = 400
    res.end('<h1>404</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port ${desiredPort}`)
  console.log(pc.bgBlue(pc.white(`http://localhost:${desiredPort}`)))
})
