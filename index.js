//import { Express } from 'express'

const express = require('express')
const app = express()

app.listen(4000, () => {
    console.log("Sever Corriendo en el Puerto 3000")
})

app.get('/', (req, res) => {
    res.send('Hola desde Node API en curso')
})