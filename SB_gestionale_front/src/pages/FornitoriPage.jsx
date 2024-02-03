import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { ClipLoader } from "react-spinners";
import FormCreateComp from '../components/FormCreateComp';

export default function FornitoriPage() {

    useEffect(fornitoriApi, [])

    const [fornitori, setFornitori] = useState([])

    const [form, setForm] = useState(false)

    const [isLoading, setIsLoading] = useState(false);

    const [searchInput, setSearchInput] = useState('')

    const risultatiRicerca = fornitori.filter(fornitore =>
        (fornitore.ragioneSociale && fornitore.ragioneSociale.toLowerCase().includes(searchInput.toLowerCase()))
    );

    function fornitoriApi() {
        setIsLoading(true);
        axios.get('http://localhost:3000/fornitori')
            .then(response => {
                // Analizza la risposta
                setFornitori(response.data);
                console.log(response.data)
                setIsLoading(false);
            })

            .catch(error => {
                // Gestisci gli errori
                console.log(error);
                setIsLoading(false);
            });
    }

    function apriForm() {
        if (!form) {
            setForm(true)
        } else {
            setForm(false)
        }
    }

    return (
        <div className='bg-sky-50 h-full relative'>

            {/* sfondo in trasparenza quando si apre il form */}
            {form && <div className={`absolute inset-x-0 top-0 bottom-0 bg-white z-10 ${form ? 'bg-opacity-80' : 'bg-opacity-0'}`} onClick={()=>apriForm()}></div>}

            <div className='mx-5 flex justify-between '>
                <div>
                    <label htmlFor="ricercaFornitore">Ricerca fornitore: </label>
                    <input name='ricercaFornitore' type="text" className='border-4 border-sky-100 mt-5' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                </div>
                <div className='flex justify-center items-center'>
                    <button onClick={() => apriForm()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#03A9F4" className="w-8 h-8 hover:scale-125">
                            <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                        </svg>
                    </button>
                </div>
            </div>
            {isLoading ? <div className='h-full w-full flex justify-center'><ClipLoader /></div> :
                <div className="flex flex-wrap px-auto overflow-y-auto">
                    {
                        risultatiRicerca.map((fornitore) => {
                            return (
                                <Link key={fornitore.id} to={`/dettaglio_fornitore/${fornitore.id}`} className='border bg-sky-100 hover:bg-sky-200 rounded-md shadow-lg flex flex-col m-3 w-72'>
                                    <span className='font-bold'>{fornitore.ragioneSociale}</span>
                                    <span>P.I. {fornitore.partitaIva}</span>
                                    <span>{fornitore.indirizzo}</span>
                                    <span>Tel: {fornitore.telefono}</span>
                                    <span>email: {fornitore.email}</span>
                                    <span>Note: {fornitore.note}</span>
                                </Link>
                            )
                        })
                    }
                    {form && <FormCreateComp form={form} setForm={setForm} fornitori={fornitori}></FormCreateComp>}

                </div>
            }

        </div>
    )
}