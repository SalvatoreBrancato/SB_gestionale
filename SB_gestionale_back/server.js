const express = require('express');
const cors = require('cors');
const clientiRouter = require('./routers/ClientiRouter');

const app= express()

const port = 3000

//abilito cors
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/', clientiRouter);

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})