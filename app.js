const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const fs = require('fs')

app.use(express.json())

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

app.get('/assets/css/styles.css', (req, res) => {
  res.sendFile('/assets/css/styles.css', options)
})

app.route('/api/notes')
.get((req, res) => {
  let myObject = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json'), err => console.log(err)))
  res.send(200, myObject)
})
.post((req, res) => {
  console.log(`Request body: ${JSON.stringify(req.body)}`)
  // let myObject = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json'), err => console.log(err)))
  // myObject.push(req.body)
  // console.log(req.body)
  // console.log(myObject)
  // fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(myObject), err => console.log(err))
})
.delete((req, res) => {
  //Do some other stuff
})