const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function index(req, res){
    const data = await prisma.fattureAcquisti.findMany({
        include:{
            fornitori:{
                select:{
                    ragioneSociale: true
                }
            },
            pagamento: true
        }
    })

    return res.json(data)
}

//###SHOW###
async function show(req, res){
    const id = req.params.id

    const data = await prisma.fattureAcquisti.findUnique({
        where:{
            id: parseInt(id)
        },
        include:{
            fornitori:{
                select:{
                    ragioneSociale: true
                }
            }
        }
    })

    if(!data){
        throw new Error('fattura non trovata')
    }

    return res.json(data)
}

//###CREATE###
async function create(req, res){
    const datiInIngresso = req.body
    console.log(datiInIngresso.prodotti)

    const nuovaFatturaAcquisti = await prisma.fattureAcquisti.create({
        data:{
            numero: datiInIngresso.numero,
            data: datiInIngresso.data,
            pezzi: datiInIngresso.pezzi,
            iva: datiInIngresso.iva,
            listino: datiInIngresso.listino,
            sconto: datiInIngresso.sconto,
            totale: datiInIngresso.totale,
            note: datiInIngresso.note,
            fornitoriId: datiInIngresso.fornitoriId,
            pagamentoId: datiInIngresso.pagamentoId,
            prodotti: {
                connect: datiInIngresso.prodotti.map((elem) => {
                    return{ id: elem}
                })
            }
        }
    })

    return res.json(nuovaFatturaAcquisti)
}

//###UPDATE###
async function update(req, res){
    const id = req.params.id
    const datiInIngresso = req.body

    const nuovaFatturaAcquisti = await prisma.fattureAcquisti.findUnique({
        where:{
            id: parseInt(id)
        }
    })

    if(!nuovaFatturaAcquisti){
        throw new Error('Fattura acquisti non trovata')
    }

    const aggiornaFatturaAquisti = await prisma.fattureAcquisti.update({
        where:{
            id: parseInt(id)
        },
        data:{
            ...datiInIngresso
        }
    })

    return res.json(aggiornaFatturaAquisti)
}

async function destroy(req, res){
    const id = req.params.id
    await prisma.fattureAcquisti.delete({
        where:{
            id: parseInt(id)
        }
    })

    return res.json({message: 'Fattura acquisti eliminata'})
}


module.exports = {
    index,
    show,
    create,
    update,
    destroy
}