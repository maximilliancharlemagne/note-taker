const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const fs = require('fs')

const options = {
  root: path.join(__dirname, 'public')
}

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

app.get('/', (req, res) => {
  res.sendFile('index.html',options)
})

app.get('/notes', (req, res) => {
  res.sendFile('notes.html',options)
})

app.get('/assets/js/index.js', (req, res) => {
  res.sendFile('assets/js/index.js', options)
})


app.route('/api/notes')
.get((req, res) => {
  let myObject = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json'), err => console.log(err)))
  res.send(200, myObject)
})
.post((req, res) => {
  //Do some stuff
})
.delete((req, res) => {
  //Do some other stuff
})