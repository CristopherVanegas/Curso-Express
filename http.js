const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (req.url === '/') {
    res.statusCode = 200
    res.end('<h1>Página de Inicio</h1>')
  } else if (req.url === '/src/images/nodejs_logo.svg') {
    res.statusCode = 200
    fs.readFile('./src/images/nodejs_logo.svg', (err, data) => {
      if (err) {
        console.error('Error al leer la imagen:', err)
        res.statusCode = 500
        res.end('<h1>Error al cargar la imagen</h1>')
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'image/svg+xml')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end('<h1>Página de Contacto</h1>')
  } else {
    res.statusCode = 404
    res.end('<h1>Página no encontrada</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(
    `Servidor escuchando en el puerto http://localhost:${desiredPort}`
  )
})
