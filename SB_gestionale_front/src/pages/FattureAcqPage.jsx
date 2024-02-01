import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import FormFattAcqComp from '../components/FormFattAcqComp';


export default function FattureAcqPage() {

    useEffect(listaFattureAcqApi, [])

    const [fattureAcq, setFattureAcq] = useState([])

    const [isLoading, setIsLoading] = useState(false);

    const [formFatturaAcq, setFormFatturaAcq] = useState(false)

    const [searchInput, setSearchInput] = useState('')

    const risultatiRicerca = fattureAcq.filter(fattura =>
        (fattura.fornitori.ragioneSociale && fattura.fornitori.ragioneSociale.toLowerCase().includes(searchInput.toLowerCase()))
    );

    function listaFattureAcqApi() {
        setIsLoading(true);
        axios.get('http://localhost:3000/fattureAcquisti')
            .then(response => {
                setFattureAcq(response.data)
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
        if (formFatturaAcq == false) {
            setFormFatturaAcq(true)
        } else {
            setFormFatturaAcq(false)
        }
    }

    return (
        <div className='bg-sky-50 h-full relative'>

            {/* sfondo in trasparenza quando si apre il form */}
            {formFatturaAcq && <div className={`absolute inset-x-0 top-0 bottom-0 bg-white ${formFatturaAcq ? 'bg-opacity-80' : 'bg-opacity-0'}`} style={{ pointerEvents: "none" }}></div>}

            <div className='w-full flex justify-between items-center p-5 '>
                <div>
                    <label htmlFor="ricercaFatturaAcq">Ricerca per denominazione: </label>
                    <input name='ricercaFatturaAcq' type="text" className='border-4 border-sky-100' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                </div>
                <div className=''>
                    <button className='flex flex-col justify-center items-center' onClick={() => apriChiudiForm()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#03A9F4" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FFFFFF" className="w-8 h-8 transform hover:scale-125">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>

                    </button>
                </div>
            </div>

            <div className='w-full flex justify-between p-5 bg-sky-300 font-bold text-center'>
                <span className='w-[13%]'>Denominazione</span>
                <span className='w-[13%]'>Numero ft.</span>
                <span className='w-[13%]'>Data</span>
                <span className='w-[13%]'>Pezzi</span>
                <span className='w-[13%]'>Listino</span>
                <span className='w-[13%]'>Sconto</span>
                <span className='w-[13%]'>IVA</span>
                <span className='w-[13%]'>Totale</span>
                <span className='w-[13%]'>Scadenza</span>
            </div>

            {isLoading ? <div className='h-full w-full flex justify-center'><ClipLoader /></div> :
                <div className='overflow-y-auto'>
                    {risultatiRicerca.map((fatturaAcq) => {
                        return (
                            <div key={fattureAcq.id}>
                                <Link  to={`/dettaglio_fattura_acquisti/${fatturaAcq.id}`} className='fw-full flex justify-between p-5 bg-sky-200 hover:bg-sky-100 border-2 border-y-white'>
                                    <span className='w-[13%] text-center'>{fatturaAcq.fornitori.ragioneSociale}</span>
                                    <span className='w-[13%] text-center'>{fatturaAcq.numero}</span>
                                    <span className='w-[13%] text-center'>{fatturaAcq.data}</span>
                                    <span className='w-[13%] text-center'>{fatturaAcq.pezzi}</span>
                                    <span className='w-[13%] text-center'>{fatturaAcq.listino}</span>
                                    <span className='w-[13%] text-center'>{fatturaAcq.sconto}</span>
                                    <span className='w-[13%] text-center'>{fatturaAcq.iva}</span>
                                    <span className='w-[13%] text-center'>{fatturaAcq.totale}</span>
                                    <span className='w-[13%] text-center'>{fatturaAcq.pagamento.scadenza}</span>

                                </Link>
                            </div>
                        )
                    })}
                </div>}

            {formFatturaAcq && <FormFattAcqComp formFatturaAcq={formFatturaAcq} setFormFatturaAcq={setFormFatturaAcq} fattureAcq={fattureAcq}/>}

        </div>
    )
}