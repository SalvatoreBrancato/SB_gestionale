import axios from "axios";
import { useEffect, useState } from 'react';
import { ClipLoader } from "react-spinners";

export default function NewFormFattAcq({ formFatturaAcq, setFormFatturaAcq, fattureAcq, form, setForm }) {

    const [isLoading, setIsLoading] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);

    const [isSuccessProdotti, setIsSuccessProdotti ] = useState(false)

    const [fatturaAcq, setFatturaAcq] = useState([])

    const [formData, setFormData] = useState({
        numero: '',
        data: '',
        pezzi: '',
        iva: '',
        listino: '',
        sconto: '',
        totale: '',
        note: '',
        pagamentoId: '',
        fornitoriId: '',
        prodotti: []
    })

    const [prodotto, setProdotto] = useState([])

    const [formDataProdotto, setFormDataProdotto] = useState([{
        nome: '',
        descrizione: '',
        pezzi: '',
        prezzoVendita: '',
        prezzoAcquisto: '',
        listino: '',
        note: '',
        fattureAcquisti: [],
        fornitore: []
    }]);


    //#####LISTA FORNITORI#####
    const [fornitori, setFornitori] = useState([])

    useEffect(fornitoriList, []);

    function fornitoriList() {
        axios.get('http://localhost:3000/fornitori')
            .then(response => {
                setFornitori(response.data)
                //console.log(response.data)
            })
            .catch(error => {
                // Gestisci gli errori
                console.log(error);
            });
    }

    //estrazione valore select-option fornitore
    const [selezioneFornitore, setSelezioneFornitore] = useState('')

    const handleFornitoreChange = (e) => {
        setSelezioneFornitore(Number(e.target.value))
    }

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            fornitore: selezioneFornitore
        }));
        console.log(selezioneFornitore)
    }, [selezioneFornitore]);


    //####LISTA PAGAMENTI####
    useEffect(pagamentiList, [])

    const [pagamenti, setPagamenti] = useState([])

    function pagamentiList() {
        axios.get('http://localhost:3000/pagamento')
            .then(response => {
                setPagamenti(response.data)
                //console.log(response.data)
            })
            .catch(error => {
                // Gestisci gli errori
                console.log(error);
            });
    }

    //estrazione valore select-option pagamento
    const [selezionePagamento, setSelezionePagamento] = useState('')

    const handlePagamentoChange = (e) => {
        setSelezionePagamento(Number(e.target.value))
    }

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            pagamento: selezionePagamento
        }));
        console.log(selezionePagamento)
    }, [selezionePagamento]);

    //recupera valore input dati fattura acquisto
    const handleInputFattAcqChange = (e) => {
        const { name, type, value, checked } = e.target
        const inputValue = type == 'checkbox' ? checked : value
        setFormData({
            ...formData,
            [name]: inputValue
        })
    }


    const [totalePezzi, setTotalePezzi] = useState(0);
    const [totaleListino, setTotaleListino] = useState(0)
    const [totaleImponibile, setTotaleImponibile] = useState(0)
    //recupera valore input dati prodotto
    function handleInputProdottoChange(e, campo, index) {
        const newFormDataProdotto = [...formDataProdotto];
        newFormDataProdotto[index][campo] = e.target.value;
        setFormDataProdotto(newFormDataProdotto);

        // Calcola il totale pezzi
        const totalePezzi = newFormDataProdotto.reduce((acc, riga) => {

            return acc + parseInt(riga.pezzi || 0, 10);
        }, 0);

        setTotalePezzi(totalePezzi);

        // Calcola il totale lisitino
        const totaleListino = newFormDataProdotto.reduce((acc, riga) => {

            return acc + parseInt(riga.listino || 0, 10);
        }, 0);

        setTotaleListino(totaleListino);

        // Calcola imponibile
        const totaleImponibile = newFormDataProdotto.reduce((acc, riga) => {

            return acc + parseInt(riga.prezzoAcquisto || 0, 10);
        }, 0);

        setTotaleImponibile(totaleImponibile);

    }

    //IVA
    const [iva, setIva] = useState(0);
    const handleIvaChange = (e) => {
        setIva(Number(e.target.value));
    };

    //TOTALE FATTURA
    const [totaleFattura, setTotaleFattura] = useState(0);
    useEffect(() => {
        const calcolaTotaleFattura = totaleImponibile + (totaleImponibile * iva / 100);
        setTotaleFattura(calcolaTotaleFattura);
    }, [totaleImponibile, iva]);

    //CONTROLLO SE IL FORM PRODOTTO SI COMPILA L'OGGETTO CORRETTAMENTE
    useEffect(() => {
        console.log(formDataProdotto), [formDataProdotto]
    })

    useEffect(() => {
        console.log(formData), [formData]
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        setIsLoading(true);

        const nuovaFatturaAcq = {
            numero: parseFloat(formData.numero),
            data: new Date(formData.data),
            pezzi: parseFloat(totalePezzi),
            iva: parseFloat(iva),
            listino: parseFloat(totaleListino),
            sconto: parseFloat(formData.sconto.replace(',', '.')),
            totale: parseFloat(totaleImponibile),
            note: formData.note,
            fornitoriId: parseFloat(selezioneFornitore),
            pagamentoId: parseFloat(selezionePagamento),
            //prodotti: selezioneProdotto
        }

        const nuovoProdotto = formDataProdotto.map(prodotto => ({
            nome: prodotto.nome,
            descrizione: prodotto.descrizione,
            pezzi: parseFloat(prodotto.pezzi),
            prezzoVendita: parseFloat(prodotto.prezzoVendita),
            prezzoAcquisto: parseFloat(prodotto.prezzoAcquisto),
            listino: parseFloat(prodotto.listino),
            note: prodotto.note,
            fattureAcquisti: [],
            fornitore: [parseFloat(selezioneFornitore)]
        }));

        setFatturaAcq([...fatturaAcq, nuovaFatturaAcq])
        setProdotto([...prodotto, ...nuovoProdotto]);


        const inviaDati = async () => {
            try {
                setIsLoading(true);
        
                // Richiesta POST per creare i prodotti
                const responseProdotti = await axios.post('http://localhost:3000/prodotti/inserisci', nuovoProdotto);
                console.log(responseProdotti.data);
        
                // Recupero gli ID dei prodotti appena creati dalla risposta della chiamata axio
                const idProdottiCreati = responseProdotti.data.map(prodotto => prodotto.id);  
        
                // Aggiungo gli ID dei prodotti alla fattura
                const nuovaFatturaAcqConIdProdotti = {
                    ...nuovaFatturaAcq,
                    prodotti: idProdottiCreati,
                };

                setIsSuccessProdotti(true)
        
                // Richiesta POST per creare la fattura
                const responseFattura = await axios.post('http://localhost:3000/fattureAcquisti/inserisci', nuovaFatturaAcqConIdProdotti);
                console.log(responseFattura.data);
        
                setIsLoading(false);
                setIsSuccess(true);
        
                setTimeout(() => {
                    setFormFatturaAcq(false);
                    window.location.reload();
                }, 2000);
        
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }
        

        inviaDati()
    }

    //aggiungi riga
    const [rigaProdotto, setRigaProdotto] = useState([0]);

    function aggiungiRiga() {
        setRigaProdotto([...rigaProdotto, {}]);
        setFormDataProdotto(prevFormDataProdotto => [
            ...prevFormDataProdotto,
            {
                nome: '',
                descrizione: '',
                pezzi: '',
                prezzoVendita: '',
                prezzoAcquisto: '',
                listino: '',
                note: '',
                fattureAcquisti: [],
                fornitore: []
            }
        ]);
    }


    //rimuovi riga
    function rimuoviRiga(index) {
        setRigaProdotto(rigaProdotto.filter((_, i) => i !== index));
        setFormDataProdotto(formDataProdotto.filter((_, i) => i !== index));
    }

    function apriForm() {
        if (!form) {
            setForm(true)
            setFormFatturaAcq(false)
        } else {
            setForm(false)
        }
    }

    return (
        <div className='absolute w-5/6 min-h-[400px] max-h-[700px] bg-sky-100 rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-scroll z-10'>

            {/* CHIUDI FORM */}
            <div className="absolute top-5 right-5">
                <button onClick={() => setFormFatturaAcq(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:scale-125">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <form className="mx-6 my-6" onSubmit={handleSubmit}>
                <div className="flex items-center w-full mb-5">
                    {/* Numero */}
                    <div className="flex w-1/6">
                        <label htmlFor="numero" className="mr-1">Numero fattura: </label>
                        <input className="border-2 rounded-md w-1/3" type="number" name="numero" value={formData.numero} onChange={handleInputFattAcqChange} />
                    </div>
                    {/* Data */}
                    <div className="flex w-1/6">
                        <label htmlFor="data" className="mr-1">Data fattura: </label>
                        <input className="border-2 rounded-md w-1/2" type="text" name="data" value={formData.data} onChange={handleInputFattAcqChange} />
                    </div>
                    {/* Fornitore */}
                    <div className="flex w-1/3 mr-3">
                        <label htmlFor="fornitore" className="mr-1">Fornitore: </label>
                        <select name="fornitore" id="fornitore" className="w-full" value={selezioneFornitore} onChange={handleFornitoreChange}>
                            <option value="">Seleziona fornitore...</option>

                            {
                                fornitori.map((fornitore, index) => {
                                    return (

                                        <option key={index} value={fornitore.id}>{fornitore.ragioneSociale}</option>

                                    )
                                })
                            }

                        </select>
                    </div>
                    <div className="w-1/6">
                        <button type='button' className="text-[#03A9F4]" onClick={() => apriForm()}>
                            Nuovo fornitore? clicca qui
                        </button>
                    </div>
                </div>
                <div className="flex flex-col w-full justify-center mb-10">
                    {/* Aggiungi riga prodotto */}
                    {rigaProdotto.map((riga, index) => (
                        <div key={index} className="flex w-full items-center">

                            {/* Prodotto */}
                            <div className="flex flex-col w-1/3 mr-1 relative">
                                <label htmlFor="nome">Prodotto</label>
                                <input type="text" name="nome" value={formDataProdotto[index].nome} onChange={(e) => handleInputProdottoChange(e, 'nome', index)} />
                            </div>

                            {/* Descrizione */}
                            <div className="flex flex-col w-2/4 mr-1">
                                <label htmlFor="descrizione">Descrizione</label>
                                <input type="text" name="descrizione" value={formDataProdotto[index].descrizione} onChange={(e) => handleInputProdottoChange(e, 'descrizione', index)} />
                            </div>

                            {/* Pezzi */}
                            <div className="flex flex-col w-1/12 mr-1">
                                <label htmlFor="pezzi">Pezzi</label>
                                <input type="number" name="pezzi" value={formDataProdotto[index].pezzi} onChange={(e) => handleInputProdottoChange(e, 'pezzi', index)} />
                            </div>


                            {/* Listino */}
                            <div className="flex flex-col w-1/12 mr-1">
                                <label htmlFor="listino">Listino</label>
                                <input type="number" name="listino" value={formDataProdotto[index].listino} onChange={(e) => handleInputProdottoChange(e, 'listino', index)} />
                            </div>

                            {/* Prezzo acquisto */}
                            <div className="flex flex-col w-1/12 mr-1">
                                <label htmlFor="prezzoAcquisto">Pr. acq.</label>
                                <input type="number" name="prezzoAcquisto" value={formDataProdotto[index].prezzoAcquisto} onChange={(e) => handleInputProdottoChange(e, 'prezzoAcquisto', index)} />
                            </div>

                            {/* Prezzo vendita */}
                            <div className="flex flex-col w-1/12 mr-1">
                                <label htmlFor="prezzoVendita">Pr. ven.</label>
                                <input type="number" name="prezzoVendita" value={formDataProdotto[index].prezzoVendita} onChange={(e) => handleInputProdottoChange(e, 'prezzoVendita', index)} />
                            </div>

                            {/* note */}
                            <div className="flex flex-col w-1/3">
                                <label htmlFor="note">Note</label>
                                <input type="text" name="note" value={formDataProdotto[index].note} onChange={(e) => handleInputProdottoChange(e, 'note', index)} />
                            </div>


                            {/* Tasto aggiungi */}
                            <div className="flex flex-col w-4 items-end ml-3">
                                <label htmlFor="" className="none">Aggiungi</label>
                                <button type="button" onClick={() => { aggiungiRiga() }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#008000" className="w-5 h-5 hover:scale-125">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>

                                </button>
                            </div>
                            {/* Tasto elimina */}
                            {<div className={`flex flex-col w-4 items-end ml-3 ${index == 0 ? 'none' : ''}`}>
                                <label htmlFor="" className="none">elimina</label>
                                <button type="button" onClick={() => { rimuoviRiga(index) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF0000" className="w-5 h-5 hover:scale-125">
                                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>}
                        </div>
                    ))}
                </div>

                <div className="flex w-full justify-end mb-5">
                    {/* Totale pezzi */}
                    <div className="flex flex-col w-1/12 me-5">
                        <label htmlFor="totalePezzi">Tot pz.</label>
                        <input className="border-2 rounded-md w-full" type="number" name="totalePezzi" value={totalePezzi} onChange={handleInputFattAcqChange} />
                    </div>
                    {/* Totale listino */}
                    <div className="flex flex-col w-1/12 me-5">
                        <label htmlFor="totaleListino">Tot lis. </label>
                        <input className="border-2 rounded-md w-full" type="number" name="totaleListino" value={totaleListino} onChange={handleInputFattAcqChange} />
                    </div>
                    {/* Totale netto*/}
                    <div className="flex flex-col w-1/12 me-5">
                        <label htmlFor="totaleImponibile">Totale imponibile: </label>
                        <input className="border-2 rounded-md w-full" type="number" name="totaleImponibile" value={totaleImponibile} onChange={handleInputFattAcqChange} />
                    </div>
                    {/* IVA */}
                    <div className="me-5">
                        <label htmlFor="iva" className="flex flex-col">IVA: </label>
                        <select name="iva" id="iva" value={iva} onChange={handleIvaChange}>
                            <option value=""></option>
                            <option value="4">4%</option>
                            <option value="10">10%</option>
                            <option value="22">22%</option>
                        </select>
                    </div>
                    {/* Totale fattura*/}
                    <div className="flex flex-col w-1/12 ">
                        <label htmlFor="totale">Totale fattura: </label>
                        <input className="border-2 rounded-md w-full" type="number" name="totale" value={totaleFattura} />
                    </div>
                </div>

                <div className="flex">
                    {/* Note */}
                    <div className="flex flex-col w-2/3  mr-5 mb-20">
                        <label htmlFor="note">Note: </label>
                        <input className="border-2 rounded-md w-full" type="text" name="note" value={formData.note} onChange={handleInputFattAcqChange} />
                    </div>
                    {/* Pagamento */}
                    <div className="flex flex-col">
                        <label htmlFor="pagamento">Pagamento</label>
                        <select name="pagamento" id="pagamento" className="overflow-y-auto" value={selezionePagamento} onChange={handlePagamentoChange}>
                            <option value="">Seleziona pagamento...</option>

                            {
                                pagamenti.map((pagamento) => {
                                    return (

                                        <option key={pagamento.id} value={pagamento.id}>{pagamento.scadenza}</option>

                                    )
                                })
                            }

                        </select>
                    </div>
                </div>
                <div className="flex justify-center">
                    {isLoading ? <ClipLoader /> : <button type="submit" className="p-1 bg-sky-400 mt-3 rounded-md text-white hover:bg-blue-400">Registra nuova fattura acq.</button>}
                </div>
                {isSuccessProdotti && <div className="text-center"><p>✔ Prodotti caricati</p><p>✔ Magazzino aggiornato</p></div>}
                {isSuccess && <p className="text-center">✔ Nuova fattura acquisti registrata</p>}
            </form>
        </div>
    )
}