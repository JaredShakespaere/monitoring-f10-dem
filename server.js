const express = require('express')

const path = require('path')

const app = express()
app.use(express.json())

const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: 'ad2308abc5084f0f9f7caefb2e3df20b',
    captureUncaught: true,
    captureUnhandledRejections: true

})



app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')

})

let students = []

app.post('/api/student', (req, res) => {
    const {name} = req.body
    name = name.trim()

    students.push(name)
    rollbar.log('student added successfully', 
    {author: 'Jared', type: 'manual entry'})
    res.status(200).send(students)

})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Take us to warp ${port}!`))