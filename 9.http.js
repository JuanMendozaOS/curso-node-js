const http = require('node:http') // protocolo HTTP
const pc = require('picocolors')
const { findAvailablePort } = require('./10.free-port')

const desiredPort = process.env.PORT ?? 3000
const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('hola mundo')
})

findAvailablePort(desiredPort).then(port => server.listen(port, () => {
  console.log(`server listening on port ${port}`)
  console.log(pc.bgBlue(pc.white(`http://localhost:${port}`)))
}))
