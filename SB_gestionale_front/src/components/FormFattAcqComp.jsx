import axios from "axios";
import { useEffect, useState } from 'react';
import { ClipLoader } from "react-spinners";

export default function FormFattAcqComp({ formFatturaAcq, setFormFatturaAcq, fattureAcq }) {

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
        pagamento: [],
        fornitore: [],
        prodotto: []
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
    const [selezioneFornitore, setSelezioneFornitore] = useState()

    const handleFornitoreChange = (e) => {
        setSelezioneFornitore(e.target.value)
    }

    //estrazione valore select-option pagamento
    const [selezionePagamento, setSelezionePagamnto] = useState()

    const handlePagamentoChange = (e) => {
        setSelezionePagamento(e.target.value)
    }


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
            numero: formData.numero,
            data: formData.data,
            pezzi: parseFloat(formData.pezzi.replace(',', '.')),
            iva: parseFloat(formData.iva),
            listino: parseFloat(formData.listino.replace(',', '.')),
            sconto: parseFloat(formData.sconto.replace(',', '.')),
            totale: parseFloat(formData.totale.replace(',', '.')),
            note: formData.note,
            fornitore: [parseFloat(selezioneFornitore)],
            pagamento: formData.pagamento,
            prodotto: [formData.prodotto]
        }

        setFatturaAcq([...fatturaAcq, nuovaFatturaAcq])

        const inviaDati = async () => {
            try {
                const response = await axios.post('http://localhost:3000/fattureAcqusti/inserisci', nuovoFatturaAcq);
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
    const [rigaProdotto, setRigaProdotto] = useState([]);

    function aggiungiRiga() {
        setRigaProdotto([...rigaProdotto, {}])
    }

    //rimuovi riga
    function rimuoviRiga(index) {
        setRigaProdotto(rigaProdotto.filter((_, i) => i !== index));
    }


    return (
        <div className="absolute w-5/6 min-h-[500px] max-h-[700px]   bg-sky-100 rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-scroll">

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
                    <div className="flex w-1/2">
                        <label htmlFor="fornitore" className="mr-1">Fornitore: </label>
                        <select name="fornitore" id="fornitore" className="w-full" value={selezioneFornitore} onChange={handleFornitoreChange}>
                            <option value="">Seleziona fornitore...</option>

                            {
                                fornitori.map((fornitore) => {
                                    return (

                                        <option key={fornitore.id} value={fornitore.id}>{fornitore.ragioneSociale}</option>

                                    )
                                })
                            }

                        </select>
                    </div>
                </div>

                <div className="flex flex-col w-full  justify-center">
                    <div className="flex w-full items-center pr-7">
                        {/* Prodotto */}
                        <div className="flex flex-col w-2/3">
                            <label htmlFor="prodotto">Prodotto: </label>
                            <input className="border-2 rounded-md w-full" type="text" name="prodotto" value={formData.prodotto} onChange={handleInputChange} />
                        </div>
                        {/* Pezzi */}
                        <div className="flex flex-col w-1/12">
                            <label htmlFor="pezzi">Pezzi: </label>
                            <input className="border-2 rounded-md w-full" type="number" name="pezzi" value={formData.pezzi} onChange={handleInputChange} />
                        </div>
                        {/* Listino */}
                        <div className="flex flex-col">
                            <label htmlFor="listino">Listino: </label>
                            <input className="border-2 rounded-md w-full" type="number" name="listino" value={formData.listino} onChange={handleInputChange} />
                        </div>
                        {/* Sconto */}
                        <div className="flex flex-col">
                            <label htmlFor="sconto">Sconto: </label>
                            <input className="border-2 rounded-md w-full" type="text" name="sconto" value={formData.sconto} onChange={handleInputChange} />
                        </div>
                    </div>


                    {/* Aggiungi riga prodotto */}
                    {rigaProdotto.map((riga, index) => (
                        <div id="riga" className="flex w-full items-center">
                            <div key={index} className="flex w-full items-center">
                                {/* Prodotto */}
                                <div className="flex flex-col w-2/3">
                                    <label htmlFor="prodotto">Prodotto: </label>
                                    <input className="border-2 rounded-md w-full" type="text" name="prodotto" value={formData.prodotto} onChange={handleInputChange} />
                                </div>
                                {/* Pezzi */}
                                <div className="flex flex-col w-1/12">
                                    <label htmlFor="pezzi">Pezzi: </label>
                                    <input className="border-2 rounded-md w-full" type="number" name="pezzi" />
                                </div>
                                {/* Listino */}
                                <div className="flex flex-col">
                                    <label htmlFor="listino">Listino: </label>
                                    <input className="border-2 rounded-md w-full" type="number" name="listino" value={formData.listino} onChange={handleInputChange} />
                                </div>
                                {/* Sconto */}
                                <div className="flex flex-col">
                                    <label htmlFor="sconto">Sconto: </label>
                                    <input className="border-2 rounded-md w-full" type="text" name="sconto" value={formData.sconto} onChange={handleInputChange} />
                                </div>
                                {/* Tasto elimina */}
                                <div className="flex flex-col w-4 items-end ml-3">
                                    <label htmlFor="" className="none">elimina</label>
                                    <button onClick={() => { rimuoviRiga(index) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF0000" className="w-5 h-5 hover:scale-125">
                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end my-5">
                    <button className="p-1 bg-sky-400 mt-3 rounded-md text-white hover:bg-blue-400" onClick={() => { aggiungiRiga() }}>Aggiungi riga</button>
                </div>

                <div className="flex w-full justify-end mb-5">
                    {/* Totale pezzi */}
                    <div className="flex flex-col w-1/12 me-5">
                        <label htmlFor="totalePezzi">Totale pezzi: </label>
                        <input className="border-2 rounded-md w-full" type="number" name="totalePezzi" value={formData.pezzi} onChange={handleInputChange} />
                    </div>
                    {/* Totale listino */}
                    <div className="flex flex-col w-1/12 me-5">
                        <label htmlFor="totaleListino">Totale listino: </label>
                        <input className="border-2 rounded-md w-full" type="number" name="totaleListino" value={formData.totale} onChange={handleInputChange} />
                    </div>
                    {/* Totale netto*/}
                    <div className="flex flex-col w-1/12 me-5">
                        <label htmlFor="totale">Totale imponibile: </label>
                        <input className="border-2 rounded-md w-full" type="number" name="totale" value={formData.totale} onChange={handleInputChange} />
                    </div>
                    {/* IVA */}
                    <div className="me-5">
                        <label htmlFor="iva" className="flex flex-col">IVA: </label>
                        <select name="iva" id="iva">
                            <option value="4%">4%</option>
                            <option value="10%">10%</option>
                            <option value="22%">22%</option>
                        </select>
                    </div>
                    {/* Totale fattura*/}
                    <div className="flex flex-col w-1/12 ">
                        <label htmlFor="totale">Totale fattura: </label>
                        <input className="border-2 rounded-md w-full" type="number" name="totale" value={formData.totale} onChange={handleInputChange} />
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