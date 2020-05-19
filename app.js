const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const fs = require('fs')
let idsInUse = []

app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'public')))

const options = { //for the /notes path, since that's not a default name
  root: path.join(__dirname, 'public')
}

app.listen(port, () => console.log(`Note Taker server listening at http://localhost:${port}`))

app.get('/notes', (req, res) => {
  res.sendFile('notes.html',options)
})

app.route('/api/notes')
.get((req, res) => {
  let myObject = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json'), err => console.log(err)))
  idsInUse = []
  for(let index in myObject){
    idsInUse.push(myObject[index].id)
  }
  res.send(200, myObject)
})
.post((req, res) => {
  let myObject = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json'), err => console.log(err)))
  let newObject = req.body
  let proposedID = 1
  let IDInArray = true
  while(IDInArray){
    if(idsInUse.includes(proposedID.toString())){
      proposedID++
    }
    else{
      newObject.id = proposedID.toString()
      IDInArray = false
    }
  }
  myObject.push(newObject)
  fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(myObject), err => console.log(err))
  res.send(200,req.body)
})

app.delete('/api/notes/:id',(req, res) => {
  let myObject = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json'), err => console.log(err)))
  let indexToRemove = myObject.findIndex(element => element.id == req.params.id)
  myObject.splice(indexToRemove,1)
  fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(myObject), err => console.log(err))
  res.send(200, myObject)
})