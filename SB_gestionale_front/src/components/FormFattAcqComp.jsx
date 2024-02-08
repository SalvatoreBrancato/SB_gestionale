import axios from "axios";
import { useEffect, useState } from 'react';
import { ClipLoader } from "react-spinners";



export default function FormFattAcqComp({ formFatturaAcq, setFormFatturaAcq, fattureAcq, form, setForm }) {

    useEffect(fornitoriList, []);

    useEffect(pagamentiList, [])

    const [fatturaAcq, setFatturaAcq] = useState([])

    const [isLoading, setIsLoading] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);

    const [fornitori, setFornitori] = useState([])

    const [pagamenti, setPagamenti] = useState([])

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

    function fornitoriList() {
        axios.get('http://localhost:3000/fornitori')
            .then(response => {
                setFornitori(response.data)
                console.log(response.data)
            })
            .catch(error => {
                // Gestisci gli errori
                console.log(error);
            });
    }

    function pagamentiList() {
        axios.get('http://localhost:3000/pagamento')
            .then(response => {
                setPagamenti(response.data)
                console.log(response.data)
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



    const handleInputChange = (e) => {
        const { name, type, value, checked } = e.target
        const inputValue = type == 'checkbox' ? checked : value
        setFormData({
            ...formData,
            [name]: inputValue
        })
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

        setFatturaAcq([...fatturaAcq, nuovaFatturaAcq])

        const inviaDati = async () => {
            try {
                const response = await axios.post('http://localhost:3000/fattureAcquisti/inserisci', nuovaFatturaAcq);
                console.log(response.data)

                setIsLoading(false);
                setIsSuccess(true);
                setTimeout(() => {
                    setFormFatturaAcq(false)
                    //ricarica l pagina dopo aver eliminato l'elemento
                    window.location.reload()
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
        setRigaProdotto([...rigaProdotto, {}])
        setSearchInput([...searchInput, '']);
    }

    //rimuovi riga
    function rimuoviRiga(index) {
        setRigaProdotto(rigaProdotto.filter((_, i) => i !== index));
        setInputPezzi(inputPezzi.filter((_, i) => i !== index));
        setInputListino(inputListino.filter((_, i) => i !== index));
        setSelezioneProdotto(selezioneProdotto.filter((_, i) => i !== index));
        setSearchInput(searchInput.filter((_, i) => i !== index));
    }



    //############ Somma i vari input############
    //PEZZI
    const [inputPezzi, setInputPezzi] = useState([]);
    const [totalePezzi, setTotalePezzi] = useState(0);

    useEffect(() => {
        const sommaPezzi = inputPezzi.reduce((a, b) => a + b, 0);
        setTotalePezzi(sommaPezzi);
    }, [inputPezzi]);

    const handlePezziChange = (index) => (e) => {
        const newInputPezzi = [...inputPezzi];
        newInputPezzi[index] = Number(e.target.value);
        setInputPezzi(newInputPezzi);
    };
    //LISTINO
    const [inputListino, setInputListino] = useState([]);
    const [totaleListino, setTotaleListino] = useState(0);

    useEffect(() => {
        const sommaListino = inputListino.reduce((a, b) => a + b, 0);
        setTotaleListino(sommaListino);
    }, [inputListino]);

    const handleListinoChange = (index) => (e) => {
        const newInputListino = [...inputListino];
        newInputListino[index] = Number(e.target.value);
        setInputListino(newInputListino);
    };
    // SCONTO
    const [sconto, setSconto] = useState([]);
    const handleScontoChange = (index) => (e) => {
        const newSconto = [...sconto];
        newSconto[index] = Number(e.target.value);
        setSconto(newSconto);
    };

    // NETTO
    const [netto, setNetto] = useState([]);

    useEffect(() => {
        const calcolaNetto = inputListino.map((listino, index) => listino - (listino * sconto[index] / 100 || 0));
        setNetto(calcolaNetto);
    }, [inputListino, sconto]);

    //TOTALE NETTO
    const [totaleNetti, setTotaleNetti] = useState(0);

    useEffect(() => {
        const calcolaTotaleNetti = netto.reduce((a, b) => a + b, 0);
        setTotaleNetti(calcolaTotaleNetti);
    }, [netto]);

    //IVA
    const [iva, setIva] = useState(0);
    const handleIvaChange = (e) => {
        setIva(Number(e.target.value));
    };

    //TOTALE FATTURA
    const [totaleFattura, setTotaleFattura] = useState(0);
    useEffect(() => {
        const calcolaTotaleFattura = totaleNetti + (totaleNetti * iva / 100);
        setTotaleFattura(calcolaTotaleFattura);
    }, [totaleNetti, iva]);

    useEffect(() => {
        console.log(iva);
    }, [iva]);



    function apriForm() {
        if (!form) {
            setForm(true)
            setFormFatturaAcq(false)
        } else {
            setForm(false)
        }
    }

    //PRODOTTI
    const [prodotti, setProdotti] = useState([])

    useEffect(prodottiApi, [])

    function prodottiApi() {
        axios.get(`http://localhost:3000/prodotti`)
            .then(response => {
                setProdotti(response.data)
                console.log(response.data)
            })
            .catch(error => {
                // Gestisci gli errori
                console.log(error);
            });
    }



    const [showResults, setShowResults] = useState([]);
    const [selezioneProdotto, setSelezioneProdotto] = useState([])

    const [searchInput, setSearchInput] = useState(['']);
    const risultatiRicerca = prodotti.filter(prodotto =>
        prodotto.nome &&
        !selezioneProdotto.includes(prodotto.id) &&
        searchInput.some(input => prodotto.nome.toLowerCase().includes(input.toLowerCase()))
    );

    const [currentIndex, setCurrentIndex] = useState(null);

    function prodottoSelezionato(prodotto, index) {
        // Controlla se il prodotto è nell'elenco dei risultati della ricerca
        if (risultatiRicerca.includes(prodotto)) {
            setCurrentIndex(index);
            setSelezioneProdotto(selezioneProdotto => [...selezioneProdotto, prodotto]);
    
            // Aggiorna direttamente searchInput con il nome del prodotto selezionato
            const newSearchInput = [...searchInput];
            newSearchInput[index] = prodotto.nome;
            setSearchInput(newSearchInput);
        }
    }
    
    



    useEffect(() => {
        if (currentIndex !== null) {
            const prodotto = selezioneProdotto[currentIndex];
            if (prodotto) {
                const newSearchInput = [...searchInput];
                newSearchInput[currentIndex] = prodotto.nome;
                setSearchInput(newSearchInput);
                const newShowResults = [...showResults];
                newShowResults[currentIndex] = false;
                setShowResults(newShowResults);
            }
        }
    }, [selezioneProdotto]);




    const handleProdottoChange = (index) => (e) => {
        const newSearchInput = [...searchInput];
        newSearchInput[index] = e.target.value;
        setSearchInput(newSearchInput);
        const newShowResults = [...showResults];
        newShowResults[index] = true;
        setShowResults(newShowResults);

        // Se l'input è vuoto, rimuovi il prodotto corrispondente da selezioneProdotto
        if (e.target.value === '') {
            setSelezioneProdotto(selezioneProdotto.filter((prodotto, i) => i !== index));
        }
    };

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            prodotto: selezioneProdotto
        }));
        console.log(selezioneProdotto)
    }, [selezioneProdotto]);

    useEffect(() => {
        console.log(selezioneProdotto);
    }, [selezioneProdotto]);

    useEffect(() => {
        console.log(searchInput);
    }, [searchInput]);


    function handleBlur(index) {
        if (!prodotti.some(prodotto => prodotto.nome === searchInput[index])) {
            const nuovoProdotto = {
                id: Math.max(...prodotti.map(prodotto => prodotto.id)) + 1, // Genera un nuovo ID univoco
                nome: searchInput[index],
                // Aggiungi qui gli altri campi del prodotto
            };
            setProdotti(prodotti => [...prodotti, nuovoProdotto]); // Aggiungi il nuovo prodotto all'array dei prodotti
            prodottoSelezionato(nuovoProdotto, index); // Seleziona il nuovo prodotto
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
                        <input className="border-2 rounded-md w-1/3" type="number" name="numero" value={formData.numero} onChange={handleInputChange} />
                    </div>
                    {/* Data */}
                    <div className="flex w-1/6">
                        <label htmlFor="data" className="mr-1">Data fattura: </label>
                        <input className="border-2 rounded-md w-1/2" type="text" name="data" value={formData.data} onChange={handleInputChange} />
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
                                    <input className="border-2 rounded-md w-full" type="text" name="prodotto" value={searchInput[index] || ''} onChange={handleProdottoChange(index)} onBlur={() => handleBlur(index)} />
                                    {showResults[index] &&
                                        <div className="absolute top-14 z-40 w-full max-h-24 bg-white overflow-y-auto shadow-lg rounded-md">
                                            {risultatiRicerca.map((prodotto) => {
                                                return (
                                                    <div key={prodotto.id} className="w-full border-b border-gray-200 p-2 hover:bg-gray-100 cursor-pointer" onClick={() => prodottoSelezionato(prodotto, index)}>
                                                        {prodotto.nome}
                                                    </div>
                                                )
                                            })}

                                        </div>
                                    }


                                </div>
                                {/* Pezzi */}
                                <div className="flex flex-col w-1/12">
                                    <label htmlFor="pezzi">Pezzi: </label>
                                    <input className="border-2 rounded-md w-full" type="number" name="pezzi" value={inputPezzi[index]} onChange={handlePezziChange(index)} />
                                </div>
                                {/* Listino */}
                                <div className="flex flex-col">
                                    <label htmlFor="listino">Listino: </label>
                                    <input className="border-2 rounded-md w-full" type="number" name="listino" value={inputListino[index]} onChange={handleListinoChange(index)} />
                                </div>
                                {/* Sconto */}
                                <div className="flex flex-col">
                                    <label htmlFor="sconto">Sconto (%) </label>
                                    <input className="border-2 rounded-md w-full" type="number" name="sconto" value={sconto[index] || ''} onChange={handleScontoChange(index)} />
                                </div>
                                {/* Netto */}
                                <div className="flex flex-col">
                                    <label htmlFor="netto">Netto: </label>
                                    <input className="border-2 rounded-md w-full" type="number" name="netto" value={netto[index]} readOnly />
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
                        </div>
                    ))}
                </div>



                <div className="flex w-full justify-end mb-5">
                    {/* Totale pezzi */}
                    <div className="flex flex-col w-1/12 me-5">
                        <label htmlFor="totalePezzi">Totale pezzi: </label>
                        <input className="border-2 rounded-md w-full" type="number" name="totalePezzi" value={totalePezzi} onChange={handleInputChange} />
                    </div>
                    {/* Totale listino */}
                    <div className="flex flex-col w-1/12 me-5">
                        <label htmlFor="totaleListino">Totale listino: </label>
                        <input className="border-2 rounded-md w-full" type="number" name="totaleListino" value={totaleListino} onChange={handleInputChange} />
                    </div>
                    {/* Totale netto*/}
                    <div className="flex flex-col w-1/12 me-5">
                        <label htmlFor="totale">Totale imponibile: </label>
                        <input className="border-2 rounded-md w-full" type="number" name="totale" value={totaleNetti} onChange={handleInputChange} />
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
                        <input className="border-2 rounded-md w-full" type="text" name="note" value={formData.note} onChange={handleInputChange} />
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
                {isSuccess && <p className="text-center">Nuova fattura acquisti creata</p>}
            </form>
        </div>
    )

}