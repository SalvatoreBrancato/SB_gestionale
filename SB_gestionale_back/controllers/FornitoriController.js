const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

//###INDEX###
async function index(req, res){
    const data = await prisma.fornitori.findMany()
    return res.json(data)
}

//###SHOW###
async function show(req, res){
    const id = req.params.id

    const data = await prisma.fornitori.findUnique({
        where:{
            id: parseInt(id)
        },
        include: {
            fattureAcquisti:{
                select:{
                    numero: true,
                    data: true,
                    totale: true,
                    note: true
                }
            }
        }
    }) 

    if (!data) {
        throw new Error("Fornitore non trovato");
    }

    return res.json(data)
}

//###CREATE###
async function create(req, res){
    const datiInIngresso = req.body

    const nuovoFornitore = await prisma.fornitori.create({
        data:{
            ragioneSociale: datiInIngresso.ragioneSociale,
            nome: datiInIngresso.nome,
            cognome: datiInIngresso.cognome,
            partitaIva: datiInIngresso.partitaIva,
            indirizzo: datiInIngresso.indirizzo,
            scontoFornitore: datiInIngresso.scontoFornitore,
            telefono: datiInIngresso.telefono,
            email: datiInIngresso.email,
            note: datiInIngresso.note
        }
    })

    return res.json(nuovoFornitore)
}

//###UPDATE###
async function update(req, res){
    const id = req.params.id
    const datiInIngresso = req.body
    
    //controllo se il fornitore esiste
    const fornitore = await prisma.fornitori.findUnique({
        where:{
            id: parseInt(id)
        }
    })

    if(!fornitore){
        throw new Error('Fornitore non trovato')
    }

    const aggiornaFornitore = await prisma.fornitori.update({
        where:{
            id: parseInt(id)
        },
        data:{
            ...datiInIngresso
        }
    })

    return res.json(aggiornaFornitore)
}

//###DESTROY###
async function destroy(req, res){
    const id = req.params.id
    await prisma.fornitori.delete({
        where:{
            id: parseInt(id)
        }
    })
    return res.json({message: 'Fornitore eliminato'})
}
module.exports = {
    index,
    show,
    create,
    update,
    destroy
}