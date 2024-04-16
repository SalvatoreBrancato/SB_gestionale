import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import FormCreateComp from '../components/FormCreateComp';
import FormFattVen from '../components/FormFattVen';


export default function FattureVenPage(){

    useEffect(listaFattureVenApi, [])

    const [fattureVen, setFattureVen] = useState([])

    const [isLoading, setIsLoading] = useState(false);

    const [formFatturaVen, setFormFatturaVen] = useState(false)  
    
    const [searchInput, setSearchInput] = useState('')

    const risultatiRicerca = fattureVen.filter(fattura =>
        (fattura.clienti.ragioneSociale && fattura.clienti.ragioneSociale.toLowerCase().includes(searchInput.toLowerCase())) ||
        (fattura.clienti.nome && fattura.clienti.nome.toLowerCase().includes(searchInput.toLowerCase())) ||
        (fattura.clienti.cognome && fattura.clienti.cognome.toLowerCase().includes(searchInput.toLowerCase()))
    );
    

    function listaFattureVenApi() {
        setIsLoading(true);
        axios.get('http://localhost:3000/fattureVendita')
            .then(response => {
                setFattureVen(response.data)
                console.log(response.data)
                setIsLoading(false);
            })
            .catch(error => {
                // Gestisci gli errori
                console.log(error);
                setIsLoading(false);
            });
    }

    function apriChiudiForm() {
        if (formFatturaVen == false) {
            setFormFatturaVen(true)

        } else {
            setFormFatturaVen(false)

        }
    }

    function chiudiFormTrasparenza() {
        if (formFatturaVen == true) {
            setFormFatturaVen(false)
        }
        else if (form == true) {
            setForm(false)
        }
    }

    const [form, setForm] = useState(false)
    const [fornitori, setFornitori] = useState(false)

    function apriForm() {
        if (!form) {
            setForm(true)

        } else {
            setForm(false)
        }
    }
    
    return(
        <div className='bg-sky-50 h-full relative z-0'>
             {/* sfondo in trasparenza quando si apre il form */}
             {(formFatturaVen || form) && <div className={`absolute inset-x-0 top-0 bottom-0 bg-white z-10 ${formFatturaVen || form ? 'bg-opacity-80' : 'bg-opacity-0'}`} onClick={() => chiudiFormTrasparenza()}></div>}

             <div className='w-full flex justify-between items-center p-5 '>
                <div>
                    <label htmlFor="ricercaFatturaVen">Ricerca per denominazione: </label>
                    <input name='ricercaFatturaVen' type="text" className='border-4 border-sky-100' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                </div>
                <div className='flex'>
                    <button className='flex flex-col justify-center items-center' onClick={() => apriChiudiForm()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#03A9F4" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FFFFFF" className="w-8 h-8 transform hover:scale-125">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                    </button>
                    <button onClick={() => apriForm()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#03A9F4" className="w-8 h-8 hover:scale-125">
                            <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className='max-h-[90%] overflow-auto mb-14 my-tab'>
                <div className='w-full flex justify-between p-5 font-t text-center border-b-2 border-sky-200'>
                    <span className='w-[13%]'>Denominazione</span>
                    <span className='w-[13%]'>Numero ft.</span>
                    <span className='w-[13%]'>Data</span>
                    <span className='w-[13%]'>Pezzi</span>
                    <span className='w-[13%]'>Listino</span>
                    <span className='w-[13%]'>IVA</span>
                    <span className='w-[13%]'>Totale</span>
                    <span className='w-[13%]'>Scadenza</span>
                </div>

                {isLoading ? <div className='h-full w-full flex justify-center'><ClipLoader /></div> :
                    <div className='overflow-y-auto font-s'>
                        {risultatiRicerca.map((fatturaVen, index) => {
                            return (
                                <div key={index}>
                                    <Link to={`/dettaglio_fattura_vendite/${fatturaVen.id}`} className='w-full flex justify-between p-5 hover:bg-sky-100 border-b-2 border-sky-200'>
                                        <span className='w-[13%] text-center'>{fatturaVen.clienti.ragioneSociale ? fatturaVen.clienti.ragioneSociale : fatturaVen.clienti.nome + ' ' + fatturaVen.clienti.cognome}</span>
                                        <span className='w-[13%] text-center'>{fatturaVen.numero}</span>
                                        <span className='w-[13%] text-center'>{fatturaVen.data}</span>
                                        <span className='w-[13%] text-center'>{fatturaVen.pezzi}</span>
                                        <span className='w-[13%] text-center'>{fatturaVen.listino}</span>
                                        <span className='w-[13%] text-center'>{fatturaVen.iva}</span>
                                        <span className='w-[13%] text-center'>{fatturaVen.totale}</span>
                                        {fatturaVen.pagamento && fatturaVen.pagamento.scadenza ? <span className='w-[13%] text-center'>{fatturaVen.pagamento.scadenza}</span> : <span className='w-[13%] text-center'></span>}
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                    }
            </div>
            {formFatturaVen && <FormFattVen formFatturaVen={formFatturaVen} setFormFatturaVen={setFormFatturaVen} fattureVen={fattureVen} form={form} setForm={setForm} />}
                
                {form && <FormCreateComp form={form} setForm={setForm} fornitori={fornitori}></FormCreateComp>}
        </div>
    )
}