const express = require('express')

const path = require('path')

const app = express()

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

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Take us to warp ${port}!`))