const express = require('express')
const ditto = require('./pokemon/ditto.json')

const app = express()

app.disable('x-powered-by') // para ocultar que el servidor esta hecho con express, por seguridad

const PORT = process.env.PORT ?? 1234

app.get('/', (req, res) => {
  res.send('<h1>Bienvenido a mi API de Pokémon</h1>')
})

app.get('/pokemon/ditto', (req, res) => {
//   res.json({ message: 'Hello World!' })
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  let body = ''

  //   escuchar el evento data
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    // llamamos a la base para guardar registro
    data.timestamp = Date.now()
    res.status(201).json(data)
  })
})

app.use((req, res) => {
  res.status(404).send('<h1>404<hr/>Página no encontrada</h1>')
})

app.listen(PORT, () => {
  console.log(
    `Servidor escuchando en el puerto http://localhost:${PORT}`
  )
})
