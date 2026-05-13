const express = require('express')
const ditto = require('./pokemon/ditto.json')

const app = express()

app.disable('x-powered-by') // para ocultar que el servidor esta hecho con express, por seguridad

const PORT = process.env.PORT ?? 1234

app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  // solo llegan los request tipo POST y los datos en formato json, si no es json, se ignora el body
  let body = ''

  //   escuchar el evento data
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    req.body = data // se mutó el request. el body al objeto req para que este disponible en los siguientes middlewares o rutas
    next()
  })
})

app.get('/', (req, res) => {
  res.send('<h1>Bienvenido a mi API de Pokémon</h1>')
})

app.get('/pokemon/ditto', (req, res) => {
//   res.json({ message: 'Hello World!' })
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  // req.body se deberia guardar en base de datos
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.status(404).send('<h1>404<hr/>Página no encontrada</h1>')
})

app.listen(PORT, () => {
  console.log(
    `Servidor escuchando en el puerto http://localhost:${PORT}`
  )
})
