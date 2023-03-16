const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')
const port = 3000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html')

})

app.get('/canciones', (req, res) => {

    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'))
    res.json(canciones)

})

app.post('/canciones', (req, res) =>{

    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'))
    canciones.push(cancion)
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('Canción agregada con éxito!')

})

app.delete('/canciones/:id', (req, res) => {

    const { id } = req.params
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'))
    const index = canciones.findIndex((cancion) => cancion.id === parseInt(id))
    canciones.splice(index, 1)
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('Canción eliminada con éxito!')

})

app.put('/canciones/:id', (req, res) => {

    const { id } = req.params
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'))
    const index = canciones.findIndex((cancion) => cancion.id === parseInt(id))
    canciones[index] = cancion
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('Canción modificada con éxito')

})

app.listen(port, () => {

    console.log(`App initialized on port ${port}`)

})