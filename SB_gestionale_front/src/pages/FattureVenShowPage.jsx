import { useState, useEffect } from "react";
import { Navigate, useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";

export default function FatturaVenShowPage() {

    useEffect(dettaglioFatturaVen, [])

    const { id } = useParams()

    const [fatturaVen, setFatturaVen] = useState()

    const [form, setForm] = useState(false)

    const [formDestroy, setFormDestroy] = useState(false)

    function dettaglioFatturaVen() {
        axios.get(`http://localhost:3000/fattureVendita/${id}`)
            .then(response => {
                setFatturaVen(response.data)
                console.log(response.data)
            })
            .catch(error => {
                // Gestisci gli errori
                console.log(error);
            });
    }

    function eliminaFatturaVen() {
        if (!formDestroy) {
            setFormDestroy(true)
        } else {
            setFormDestroy(false)
        }
    }

    function destroyFatturaVen() {
        axios.delete(`http://localhost:3000/fattureVenditai/${id}`)
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
        }
        else if (formDestroy == true) {
            setFormDestroy(false)
        }
    }

    const navigate = useNavigate();

    return (
        <div className='bg-sky-50 h-full relative'>
            {/* sfondo in trasparenza quando si apre il form */}
            {(form || formDestroy) && <div className={`absolute inset-x-0 top-0 bottom-0 bg-white z-10 ${form || formDestroy ? 'bg-opacity-80' : 'bg-opacity-0'}`} onClick={() => chiudiFormTrasparenza()}></div>}

            <div className="flex justify-between m-3">
                <div>
                    <button className="bg-[#03A9F4] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => navigate(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                    </button>
                </div>
                <div>
                    {/* <button className="me-3" onClick={() => apriForm()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#03A9F4" className="w-7 h-7 hover:scale-125">
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                    </button> */}
                    <button onClick={() => eliminaFatturaVen()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF0000" className="w-7 h-7 hover:scale-125">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Conferma eliminazione? */}
            {formDestroy && <div className="flex flex-col items-center justify-around absolute w-1/4 h-1/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-100 rounded-lg z-20">
                <span className="text-2xl px-2">Sei sicuro di volere eliminare la fattura?</span>
                <div className="flex justify-center items-center">
                    <button onClick={() => destroyFatturaVen()} className="bg-green-400 p-3 mr-5 rounded-md">Conferma</button>
                    <button onClick={() => eliminaFatturaVen()} className="bg-red-500 p-3 rounded-md">Annulla</button>
                </div>
            </div>}

            <div className="flex flex-col mb-10">
                {fatturaVen &&
                    <div className="w-full flex justify-between items-center px-5 mb-10">
                        {fatturaVen.clienti.ragioneSociale && <span className="text-3xl p-3">{fatturaVen.clienti.ragioneSociale}</span>}
                        {fatturaVen.clienti.cognome && <span className="text-3xl p-3">{fatturaVen.clienti.cognome}</span>}

                        <span className="text-xl px-3 py-1">N. {fatturaVen.numero} del {new Date(fatturaVen.data).toLocaleDateString('it-IT')}</span>
                    </div>
                }
                {fatturaVen &&
                    <div className="w-2/3 flex mx-auto justify-between text-xl px-3 py-1 text-center">
                        <span className="w-1/3">Prodotto</span>
                        <span className="w-1/3">Descrizione</span>
                        <span className="w-1/3">Pezzi</span>
                        <span className="w-1/3">Listino</span>
                        <span className="w-1/3">Prezzo Vendita</span>
                        <span className="w-1/3">Note</span>
                    </div>
                }
                {fatturaVen && fatturaVen.prodotti && fatturaVen.prodotti.map((prodotto, index) => {
                    return (
                        <div key={index} className="w-2/3 flex justify-between mx-auto bg-white border-2 border-sky-200 text-center text-xl px-3 py-1 my-2">
                            <span className="w-1/3 ">{prodotto.nome}</span>
                            {prodotto.descrizione ? <span className="w-1/3">{prodotto.descrizione}</span> : <span className="w-1/3"></span>}
                            <span className="w-1/3">{-prodotto.pezzi}</span>
                            {prodotto.listino && <span className="w-1/3">{prodotto.listino}</span>}
                            {prodotto.prezzoVendita && <span className="w-1/3">{prodotto.prezzoVendita}</span>}
                            {prodotto.note ? <span className="w-1/3">{prodotto.note}</span> : <span className="w-1/3"></span>}
                        </div>
                    )
                })

                }
                {fatturaVen &&
                    <div className=" flex  w-2/3 mx-auto text-xl py-1 justify-end">
                        <div className="flex flex-col">
                            <span className="me-2">IVA:</span>
                            <span className="me-2 my-1">Totale ft. €</span>
                            <span className="me-2">Scadenza:</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="px-3 bg-white border-2 border-sky-200">{fatturaVen.iva}%</span>
                            <span className="px-3 my-1 bg-white border-2 border-sky-200">{parseFloat(fatturaVen.totale).toFixed(2)}</span>
                            {/* <span className="px-3 bg-white border-2 border-sky-200">{fatturaVen.pagamento.scadenza}</span> */}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}