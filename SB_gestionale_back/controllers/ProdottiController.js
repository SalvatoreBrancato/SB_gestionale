const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//###INDEX###
async function index(req, res) {
    const data = await prisma.prodotti.findMany()
    return res.json(data)
}

//###SHOW###
async function show(req, res) {
    const id = req.params.id

    const data = await prisma.prodotti.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            fattureAcquisti: {
                select: {
                    numero: true,
                    data: true,
                    note: true
                }
            },
            fattureVendita: {
                select: {
                    numero: true,
                    data: true,
                    note: true
                }
            },
            fornitore: true
                
            
        }
    })

    if (!data) {
        throw new Error("Cliente non trovato");
    }

    return res.json(data)
}

//###CREATE###
async function create(req, res) {
    const datiInIngresso = req.body
    const nuovoProdotto = await prisma.prodotti.create({
        data: {
            nome: datiInIngresso.nome,
            descrizione: datiInIngresso.descrizione,
            pezzi: datiInIngresso.pezzi,
            prezzoVendita: datiInIngresso.prezzoVendita,
            prezzoAcquisto: datiInIngresso.prezzoAcquisto,
            listino: datiInIngresso.listino,
            note: datiInIngresso.note,
            fattureAcquisti: {
                connect: datiInIngresso.fattureAcquisti?.map((elem) => {
                    return { id: elem }
                })
            },
            fattureVendita: {
                connect: datiInIngresso.fattureVendita?.map((elem) => {
                    return { id: elem }
                })
            },
            fornitore: {
                connect: datiInIngresso.fornitore?.map((elem) => {
                    return { id: elem }
                })
            }
        }
    })
    return res.json(nuovoProdotto)
}

//###UPDATE###
async function update(req, res) {
    const id = req.params.id
    const datiInIngresso = req.body

    //controllo se il prodotto esiste
    const prodotto = await prisma.prodotti.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            fornitore: true
        }
    })

    if (!prodotto) {
        throw new Error('Prodotto non trovato')
    }

    // Prepara l'elenco dei fornitori da disconnettere
    const fornitoriDaDisconnettere = prodotto.fornitore.map((fornitore) => {
        return { id: fornitore.id }
    })

    const aggiornaProdotto = await prisma.prodotti.update({
        where: {
            id: parseInt(id)
        },
        data: {
            ...datiInIngresso,

            fornitore: {
                disconnect: fornitoriDaDisconnettere,
                connect: datiInIngresso.fornitore?.map((elem) => {
                    return { id: elem }
                })
            }
        }
    })
    return res.json(aggiornaProdotto)
}

//###DESTROY###
async function destroy(req, res) {
    const id = req.params.id;

    await prisma.prodotti.delete({
        where: { id: parseInt(id) },
        include: { fattureAcquisti: true },
    });

    res.status(200).json({ message: 'Prodotto eliminato correttamente' });
}


module.exports = {
    index,
    show,
    create,
    update,
    destroy
}