const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

//###INDEX###
async function index(req, res){
    const data = await prisma.fattureVendita.findMany({
        include:{
            clienti:{
                select:{
                    ragioneSociale: true,
                    nome: true,
                    cognome: true
                }
            },
            pagamento: true
        }
    })

    return res.json(data)
}

//###SHOW###
async function show(req, res){
    const id= req.params.id

    const data = await prisma.fattureVendita.findUnique({
        where:{
            id: parseInt(id)
        },
        include:{
            clienti: true,
            prodotti: true
        }
    })
    
    if (!data) {
        throw new Error("Fattura non trovata");
    }

    return res.json(data)
}

//###CREATE###
async function create(req, res){
    const datiInIngresso = req.body

    const nuovaFatturaVendita = await prisma.fattureVendita.create({
        data: {
            numero: datiInIngresso.numero,
            data: datiInIngresso.data,
            pezzi: datiInIngresso.pezzi,
            iva: datiInIngresso.iva,
            listino: datiInIngresso.listino,
            sconto: datiInIngresso.sconto,
            totale: datiInIngresso.totale,
            note: datiInIngresso.note,
            clientiId: datiInIngresso.clientiId,
            prodotti: {
                connect: datiInIngresso.prodotti.map((elem) => {
                    return{ id: elem}
                })
            }            
        }
    })

    return res.json(nuovaFatturaVendita)
}

//###UPDATE###
async function update(req, res){
    const id = req.params.id

    const datiInIngresso = req.body

    //controllo se la fattura esiste
    const fatturaVendita = await prisma.fattureVendita.findUnique({
        where:{
            id: parseInt(id)
        }
    })

    if(!fatturaVendita){
        throw new Error('Fattura vendita non trovata')
    }

    const aggiornaFatturaVendita = await prisma.fattureVendita.update({
        where:{
            id: parseInt(id)
        },
        data:{
            ...datiInIngresso
        }
    })

    return res.json(aggiornaFatturaVendita)
}

//###DESTROY###
async function destroy(req, res){
    const id = req.params.id
    await prisma.fattureVendita.delete({
        where:{
            id: parseInt(id)
        }
    })
    return res.json({message:'Fattura eliminata'})
}



module.exports = {
    index,
    show,
    create,
    update,
    destroy
}