const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//###INDEX###
async function index(req, res) {
    const data = await prisma.prodotti.findMany({
        include:{
            fornitore: true,
            cliente: true
        }
    });
    

    return res.json(data);
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
                include: {
                    prodotti: true
                }
            },
            fattureVendita: {
                include: {
                    prodotti: true
                }
            },
            fornitore: true,
            cliente: true
        }
    })

    if (!data) {
        throw new Error("Prodotto non trovato");
    }

    // Accedi al prezzo di acquisto dei prodotti nelle fatture di acquisto
    data.fattureAcquisti.forEach(fattura => {
        fattura.prodotti.forEach(prodotto => {
            console.log(prodotto.prezzoAcquisto);
        });
    });

    // Accedi al prezzo di acquisto dei prodotti nelle fatture di vendita
    data.fattureVendita.forEach(fattura => {
        fattura.prodotti.forEach(prodotto => {
            console.log(prodotto.prezzoAcquisto);
        });
    });

    return res.json(data)
}


async function create(req, res) {
    const datiInIngresso = req.body;

    // Se i dati in ingresso sono un array, crea più prodotti
    if (Array.isArray(datiInIngresso)) {
        const nuoviProdotti = datiInIngresso.map(prodotto => prisma.prodotti.create({
            data: {
                nome: prodotto.nome,
                descrizione: prodotto.descrizione,
                pezzi: prodotto.pezzi,
                prezzoVendita: prodotto.prezzoVendita,
                prezzoAcquisto: prodotto.prezzoAcquisto,
                listino: prodotto.listino,
                note: prodotto.note,
                fattureAcquisti: {
                    connect: prodotto.fattureAcquisti?.map((elem) => {
                        return { id: elem }
                    })
                },
                fattureVendita: {
                    connect: prodotto.fattureVendita?.map((elem) => {
                        return { id: elem }
                    })
                },
                fornitore: {
                    connect: prodotto.fornitore?.map((elem) => {
                        return { id: elem }
                    })
                },
                cliente: {
                    connect: prodotto.cliente?.map((elem) => {
                        return { id: elem }
                    })
                }
            }
        }));
        const risultato = await prisma.$transaction(nuoviProdotti);
        return res.json(risultato);
    } 
    // Altrimenti, crea un singolo prodotto
    else {
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
                },
                cliente: {
                    connect: datiInIngresso.cliente?.map((elem) => {
                        return { id: elem }
                    })
                }
            }
        });
        return res.json(nuovoProdotto);
    }
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
    // const fornitoriDaDisconnettere = prodotto.fornitore.map((fornitore) => {
    //     return { id: fornitore.id }
    // })

    const aggiornaProdotto = await prisma.prodotti.update({
        where: {
            id: parseInt(id)
        },
        data: {
            ...datiInIngresso,

            fornitore: {
                // disconnect: fornitoriDaDisconnettere,
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