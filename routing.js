const http = require('node:http')
const processRequest = (req, res) => {

}

const server = http.createServer(processRequest)

server.listen(0, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${server.address().port}`)
})
