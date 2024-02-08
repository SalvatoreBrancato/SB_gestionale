import axios from "axios";
import { useEffect, useState } from 'react';
import { ClipLoader } from "react-spinners";

export default function NewFormFattAcq({ formFatturaAcq, setFormFatturaAcq, fattureAcq, form, setForm }) {

    const [isLoading, setIsLoading] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);

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

    const [prodotto,setProdotto] =useState([])

    const [formDataProdotto, setFormDataProdotto] = useState([{
        nome: '',
        descrizione: '',
        pezzi: '',
        prezzoVendita: '',
        prezzoAcquisto: '',
        listino: '',
        note: '',
        fattureAcquisti: [],
        fornitore:[]
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

    //recupera valore input dati prodotto
    function handleInputProdottoChange(e, campo, index) {
        const newFormDataProdotto = [...formDataProdotto];
        newFormDataProdotto[index][campo] = e.target.value;
        setFormDataProdotto(newFormDataProdotto);
        
    }
    

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
            totale: parseFloat(totaleNetti),
            note: formData.note,
            fornitoriId: parseFloat(selezioneFornitore),
            pagamentoId: parseFloat(selezionePagamento),
            prodotti: selezioneProdotto
        }

        const nuovoProdotto = formDataProdotto.map(prodotto => ({
            nome: prodotto.nome,
            descrizione: prodotto.descrizione,
            pezzi: prodotto.pezzi,
            prezzoVendita: prodotto.prezzoVendita,
            prezzoAcquisto: prodotto.prezzoAcquisto,
            listino: prodotto.listino,
            note: prodotto.note,
            fattureAcquisti: [],
            fornitore: [parseFloat(selezioneFornitore)]
        }));

        setFatturaAcq([...fatturaAcq, nuovaFatturaAcq])
        setProdotto([...prodotto, ...nuovoProdotto]);


        const inviaDati = async () => {
            try {
                setIsLoading(true);
        
                //Richieste POST
                const postFattura = axios.post('http://localhost:3000/fattureAcquisti/inserisci', nuovaFatturaAcq);
                const postProdotti = axios.post('http://localhost:3000/prodotti/inserisci', nuovoProdotto);
        
                // Esegui le richieste in parallelo
                const [responseFattura, responseProdotti] = await Promise.all([postFattura, postProdotti]);
        
                console.log(responseFattura.data);
                console.log(responseProdotti.data);
        
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
                fornitore:[]
            }
        ]);
    }
    

    //rimuovi riga
    function rimuoviRiga(index) {
        setRigaProdotto(rigaProdotto.filter((_, i) => i !== index));
        setFormDataProdotto(formDataProdotto.filter((_, i) => i !== index));
        //setInputPezzi(inputPezzi.filter((_, i) => i !== index));
        //setInputListino(inputListino.filter((_, i) => i !== index));
        //setSelezioneProdotto(selezioneProdotto.filter((_, i) => i !== index));
        //setSearchInput(searchInput.filter((_, i) => i !== index));
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
                            <div className="flex w-full items-center">
                                <div key={index} className="flex w-full items-center">
                                    {/* Prodotto */}
                                    <div className="flex flex-col w-2/3 relative">
                                        <label htmlFor="prodotto">Prodotto: </label>
                                        <input type="text" name="nome" value={formDataProdotto[index].nome} onChange={(e) => handleInputProdottoChange(e, 'nome', index)} />
                                        
                                    </div>
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

                    
            </form>
        </div>
    )
}