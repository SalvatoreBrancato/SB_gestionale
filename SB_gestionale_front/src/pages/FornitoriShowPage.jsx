import { useState, useEffect } from "react";
import { Navigate, useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import FormUpdateComp from "../components/FormUpdateComp";
import NewFormFattAcq from '../components/NewFormFattAcq';

export default function FornitoriShowPage() {

    useEffect(dettaglioFornitoreApi, [])

    const { id } = useParams()

    const tipoAnagrafica = 2

    const [fornitore, setFornitore] = useState()

    const [form, setForm] = useState(false)

    const [formDestroy, setFormDestroy] = useState(false)

    const [formFatturaAcq, setFormFatturaAcq] = useState(false)


    function dettaglioFornitoreApi() {
        axios.get(`http://localhost:3000/fornitori/${id}`)
            .then(response => {
                setFornitore(response.data)
                console.log(response.data)
            })
            .catch(error => {
                // Gestisci gli errori
                console.log(error);
            });
    }

    function eliminaAnagrafica() {
        if (!formDestroy) {
            setFormDestroy(true)
        } else {
            setFormDestroy(false)
        }
    }

    function destroyAnagrafica() {
        axios.delete(`http://localhost:3000/fornitori/${id}`)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

        //ricarica l pagina dopo aver eliminato l'elemento
        window.addEventListener('popstate', function (event) {
            window.location.reload();
        });

        window.history.back(); // torna alla pagina precedente
    }

    function apriForm() {
        if (!form) {
            setForm(true)
        } else {
            setForm(false)
        }
    }

    function chiudiFormTrasparenza() {
        if (form == true) {
            setForm(false)
        } else if (formDestroy == true)
        {
            setFormDestroy(false)
        } else if (formFatturaAcq == true){
            setFormFatturaAcq(false)
        }
    }

    function apriChiudiForm() {
        if (formFatturaAcq == false) {
            setFormFatturaAcq(true)

        } else {
            setFormFatturaAcq(false)
        }
    }

    const navigate = useNavigate();

    return (
        <div className="bg-sky-50 h-full relative">

            {/* sfondo in trasparenza quando si apre il form */}
            {(form || formDestroy || formFatturaAcq) && <div className={`absolute inset-x-0 top-0 bottom-0 bg-white z-10 ${form || formDestroy || formFatturaAcq ? 'bg-opacity-80' : 'bg-opacity-0'}`} onClick={() => chiudiFormTrasparenza()}></div>}

            {/* FORM */}
            {form && <FormUpdateComp form={form} setForm={setForm} anagraficaClienteFornitore={fornitore} setAnagraficaClienteFornitore={setFornitore} tipoAnagrafica={tipoAnagrafica}></FormUpdateComp>}

            {/* FORM FATTURA ACQ */}
            {formFatturaAcq && <NewFormFattAcq fornitoreId={fornitore.id} formFatturaAcq={formFatturaAcq} setFormFatturaAcq={setFormFatturaAcq} form={form} setForm={setForm} />}

            <div className="flex justify-between m-3">
                <div>
                    <button className="bg-[#03A9F4] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => navigate(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                    </button>
                </div>
                <div>
                    <button className="me-3" onClick={() => apriForm()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#03A9F4" className="w-8 h-8 hover:scale-125">
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                    </button>
                    <button className='me-3' onClick={() => apriChiudiForm()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#03A9F4" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FFFFFF" className="w-8 h-8 transform hover:scale-125">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                    </button>
                    <button onClick={() => eliminaAnagrafica()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF0000" className="w-8 h-8 hover:scale-125">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Conferma eliminazione? */}
            {formDestroy && <div className="flex flex-col items-center justify-around absolute w-1/4 h-1/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-100 rounded-lg z-20">
                <span className="text-2xl px-2">Sei sicuro di volere eliminare l'anagrafica?</span>
                <div className="flex justify-center items-center">
                    <button onClick={() => destroyAnagrafica()} className="bg-green-400 p-3 mr-5 rounded-md">Conferma</button>
                    <button onClick={() => eliminaAnagrafica()} className="bg-red-500 p-3 rounded-md">Annulla</button>
                </div>
            </div>}


            <div className="flex flex-col mb-10">
                {fornitore && fornitore.ragioneSociale && <span className="text-3xl p-3 font-t">{fornitore.ragioneSociale}</span>}
                {fornitore && fornitore.partitaIva && <span className="text-xl px-3 py-1 font-s">P.I. {fornitore.partitaIva}</span>}
                {fornitore && fornitore.nome && <span className="text-xl px-3 py-1 font-t">{fornitore.nome}</span>}
                {fornitore && fornitore.cognome && <span className="text-xl px-3 py-1 font-t">{fornitore.cognome}</span>}
                {fornitore && <span className="text-xl px-3 py-1 font-s">{fornitore.indirizzo}</span>}
                {fornitore && <span className="text-xl px-3 py-1 font-s">Tel: {fornitore.telefono}</span>}
                {fornitore && <span className="text-xl px-3 py-1 font-s">email: {fornitore.email}</span>}
                {fornitore && <span className="text-xl px-3 py-1 font-s">Note: {fornitore.note}</span>}
            </div>

            <div className="flex justify-around w-full h-1/2 p-5">
                {/* Tabella Fatture */}
                <div className="w-1/2 h-full overflow-y-auto my-tab">
                    
                        <div className="p-2 flex text-center border-b-2 border-sky-200 mx-4 font-t">
                            <span className="w-1/6">Data</span>
                            <span className="w-1/6">Numero</span>
                            <span className="w-1/6">IVA</span>
                            <span className="w-1/6">Totale</span>
                            <span className="w-2/6">Note</span>
                        </div>
                    
                    
                        {fornitore && fornitore.fattureAcquisti.map((fattura, index) => {
                            return (
                                <div key={index} className="p-2 flex text-center border-b-2 hover:bg-sky-200 rounded-sm border-sky-200 mx-4 font-s">
                                    <span className="w-1/6">{fattura.data}</span>
                                    <span className="w-1/6">
                                        <Link to={`/dettaglio_fattura_acquisti/${fattura.id}`}>
                                            {fattura.numero}
                                        </Link>
                                    </span>
                                    <span className="w-1/6">{fattura.iva}</span>
                                    <span className="w-1/6">{fattura.totale}</span>
                                    <span className="w-2/6 truncate">{fattura.note}</span>
                                </div>
                            )
                        })}
                   
                </div>

                {/* Tabella Prodotti Acquistati */}
                <div className="w-1/3 h-full overflow-y-auto my-tab">
                    
                        <div className="p-2 flex text-center border-b-2 border-sky-200 mx-4 font-t">
                            <span className="w-1/4">Prodotto</span>
                            <span className="w-1/4">Descrizione</span>
                            <span className="w-1/4">Pezzi</span>
                            <span className="w-1/4">Prezzo acq.</span>
                        </div>
                    
                    
                        {fornitore && fornitore.prodotti.map((prodotto, index) => {
                            return (
                                <div key={index} className="p-2 flex text-center border-b-2 hover:bg-sky-200 rounded-sm border-sky-200 mx-4 font-s">
                                    <span className="w-1/4">
                                        <Link to={`/dettaglio_prodotto/${prodotto.id}`}>
                                            {prodotto.nome}
                                        </Link>
                                    </span>
                                    <span className="w-1/4">{prodotto.descrizione}</span>
                                    <span className="w-1/4">{prodotto.pezzi}</span>
                                    <span className="w-1/4">{prodotto.prezzoAcquisto}</span>
                                </div>
                            )
                        })}
                    
                </div>
            </div>
        </div>
    )
}