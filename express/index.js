// const http = require('http')
const express = require('express')
const app = express()
app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')})

app.get('/api/notes', (request, response) => {
    response.json(notes)})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const note = notes.find(note => note.id === id)
    console.log(note)
    response.json(note)})


app.post('/api/notes', (request, response) => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id)) 
        : 0
    
    const note = request.body
    note.id = maxId + 1
    
    notes = notes.concat(note)
    
    response.json(note)
    })


const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })