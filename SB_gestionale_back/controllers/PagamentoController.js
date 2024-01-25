const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

//###INDEX###
async function index(req, res){
    const data = await prisma.pagamento.findMany()
    return res.json(data)
}

//###SHOW###
async function show(req, res){
    const id = req.params.id

    const data = await prisma.pagamento.findUnique({
        where:{
            id: parseInt(id)
        },
        include:{
            fattureAcquisti:{
                select:{
                    numero: true,
                    data: true,
                    totale: true,
                    note: true,
                    fornitoriId: true
                }
            }
        }
    })

    if (!data) {
        throw new Error("Pagamento non trovato");
    }

    return res.json(data)
}

//###CREATE###
async function create(req, res){
    const datiInIngresso = req.body

    const nuovoPagamento = await prisma.pagamento.create({
        data:{
            scadenza: datiInIngresso.scadenza,
            note: datiInIngresso.note
        }
    })

    return res.json(nuovoPagamento)
}

//###UPDATE###
async function update(req, res){
    const id = req.params.id
    const datiInIngresso = req.body

    const pagamento = await prisma.pagamento.findUnique({
        where:{
            id:parseInt(id)
        }
    })

    if(!pagamento){
        throw new Error('pagamento non trovato')
    }

    const aggiornaPagamento = await prisma.pagamento.update({
        where:{
            id: parseInt(id)
        },
        data:{
            ...datiInIngresso
        }
    })

    return res.json(aggiornaPagamento)
}


//###DESTROY###
async function destroy(req, res){
    const id = req.params.id

    await prisma.pagamento.delete({
        where:{
            id: parseInt(id)
        }
    })
    return res.json({message: 'Pagamento eliminato'})
}


module.exports = {
    index,
    show,
    create,
    update,
    destroy
}