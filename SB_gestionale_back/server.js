const express = require('express');
const cors = require('cors');
const clientiRouter = require('./routers/clientiRouter');
const fattureAcquistiRouter = require('./routers/fattureAcquistiRouter');
const fattureVenditaRouter = require('./routers/fattureVenditaRouter');
const fornitoriRouter = require('./routers/fornitoriRouter');
const pagamentoRouter = require('./routers/pagamentoRouter');
const prodottiRouter = require('./routers/prodottiRouter');



const app= express()

const port = 3000

//abilito cors
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/clienti', clientiRouter);
app.use('/fattureAcquisti', fattureAcquistiRouter);
app.use('/fattureVendita', fattureVenditaRouter);
app.use('/fornitori', fornitoriRouter);
app.use('/pagamento', pagamentoRouter);
app.use('/prodotti', prodottiRouter);




app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})