const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

//###INDEX###
async function index(req, res){

    const query = {}
     //filtro titolo e descrizione
     const { ragioneSociale, nome, cognome } = req.query
     if (ragioneSociale || nome || cognome) {
         query.where = {
             ragioneSociale: {
                 contains: ragioneSociale
             },
             nome: {
                 contains: nome
             },
             cognome: {
                contains: cognome
            }
         }
     }

    const data = await prisma.clienti.findMany(query)
    return res.json(data)
}

//###SHOW###
async function show(req, res){
    const id= req.params.id

    const data =  await prisma.clienti.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            fattureVendita: true
        }
    }) 
    
    if (!data) {
        throw new Error("Cliente non trovato");
    }

    return res.json(data)
}

//###CREATE###
async function create(req, res){
    
    const datiInIngresso = req.body

    const nuovoCliente = await prisma.clienti.create({
        data:{
            ragioneSociale: datiInIngresso.ragioneSociale,
            nome: datiInIngresso.nome,
            cognome: datiInIngresso.cognome,
            partitaIva: datiInIngresso.partitaIva,
            indirizzo: datiInIngresso.indirizzo,
            telefono: datiInIngresso.telefono,
            email: datiInIngresso.email,
            note: datiInIngresso.note,
        }
    })
    return res.json(nuovoCliente)
}

//###UPDATE###
async function update(req, res){
    const id = req.params.id
    const datiInIngresso = req.body

    //controllo se il cliente esiste
    const cliente = await prisma.clienti.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if(!cliente){
        throw new Error('cliente non trovato')
    }

    const aggiornaCliente = await prisma.clienti.update({
        where:{
            id: parseInt(id)
        },
        data:{
            ...datiInIngresso
        }
    })

    return res.json(aggiornaCliente)
}

//####DESTROY###
async function destroy(req, res){
    
    const id = req.params.id

    await prisma.clienti.delete({
        where:{
            id: parseInt(id)
        }
    })
    return res.json({message: 'Cliente eliminato'})
}



module.exports = {
    index,
    show,
    create,
    update,
    destroy
}