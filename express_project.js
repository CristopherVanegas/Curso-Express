const express = require('express')
const app = express()

app.disable('x-powered-by') // para ocultar que el servidor esta hecho con express, por seguridad

const PORT = process.env.PORT ?? 1234

app.get('/', (req, res) => {
//   res.json({ message: 'Hello World!' })
  res.send('<h1>Hello World!</h1>')
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

app.listen(PORT, () => {
  console.log(
    `Servidor escuchando en el puerto http://localhost:${PORT}`
  )
})
