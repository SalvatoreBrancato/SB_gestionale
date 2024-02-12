import { useState, useEffect } from "react";
import { Navigate, useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import FormProdottiUpdate from "../components/FormProdottiUpdate";

export default function ProdottiShowPage() {

    const { id } = useParams()

    useEffect(dettaglioProdottoApi, [])

    const [prodotto, setProdotto] = useState([])

    const [form, setForm] = useState(false)

    const [formDestroy, setFormDestroy] = useState(false)


    function dettaglioProdottoApi() {
        axios.get(`http://localhost:3000/prodotti/${id}`)
            .then(response => {
                setProdotto(response.data)
                console.log(response.data)
            })
            .catch(error => {
                //Gestisci gli errori
                console.log(error)
            })
    }

    function eliminaProdotto() {
        if (formDestroy) {
            setFormDestroy(false)
        } else {
            setFormDestroy(true)
        }
    }

    function destroyProdotto() {
        axios.delete(`http://localhost:3000/prodotti/${id}`)
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
        <div className="bg-sky-50 h-full relative">

            {/* sfondo in trasparenza quando si apre il form */}
            {(form || formDestroy) && <div className={`absolute inset-x-0 top-0 bottom-0 bg-white z-10 ${form || formDestroy ? 'bg-opacity-80' : 'bg-opacity-0'}`} onClick={() => chiudiFormTrasparenza()}></div>}

            {/* FORM */}
            {form && <FormProdottiUpdate form={form} setForm={setForm} prodotto={prodotto} setProdotto={setProdotto} />}

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
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#03A9F4" className="w-7 h-7 hover:scale-125">
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                    </button>
                    <button onClick={() => eliminaProdotto()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF0000" className="w-7 h-7 hover:scale-125">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Conferma eliminazione? */}
            {formDestroy && <div className="flex flex-col items-center justify-around absolute w-1/4 h-1/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-100 rounded-lg z-20">
                <span className="text-2xl px-2">Sei sicuro di volere eliminare il prodtto?</span>
                <div className="flex justify-center items-center">
                    <button onClick={() => destroyProdotto()} className="bg-green-400 p-3 mr-5 rounded-md">Conferma</button>
                    <button onClick={() => eliminaProdotto()} className="bg-red-500 p-3 rounded-md">Annulla</button>
                </div>
            </div>}

            <div className="flex justify-between">

                <div className="flex flex-col mb-10">
                    {prodotto && <span className="text-xl px-3 py-1">{prodotto.nome}</span>}
                    {prodotto && <span className="text-xl px-3 py-1">{prodotto.descrizione}</span>}
                    {prodotto && <span className="text-xl px-3 py-1">Prezzo d'acquisto: {prodotto.prezzoAcquisto}</span>}
                    {prodotto && <span className="text-xl px-3 py-1">Prezzo di vendita: {prodotto.prezzoVendita}</span>}
                    {prodotto && <span className="text-xl px-3 py-1">Listino: {prodotto.listino}</span>}
                    {prodotto && <span className="text-xl px-3 py-1">Pezzi: {prodotto.pezzi}</span>}
                    {prodotto && <span className="text-xl px-3 py-1">Note: {prodotto.note}</span>}
                </div>

                <div className="w-1/2 min-h-1/2 flex overflow-y-auto">
                    {/* Tabella Fornitori */}
                    <table className="w-2/3 max-h-[20px]">
                        <thead>
                            <tr className="border-2 border-white bg-sky-400 text-center">
                                <th>Ragione sociale</th>
                                <th>Email</th>
                                <th>Telefono</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prodotto.fornitore && prodotto.fornitore.map((fornitore, index) => {
                                return (
                                    <tr key={index} className="border-2 border-white bg-sky-200 hover:bg-sky-300 text-center">
                                        <td>
                                            <Link to={`/dettaglio_fornitore/${fornitore.id}`}>
                                                {fornitore.ragioneSociale}
                                            </Link>
                                        </td>
                                        <td>{fornitore.email}</td>
                                        <td>{fornitore.telefono}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {/* Tabella prezzo d'acquisto */}
                    <table className="w-1/3 max-h-[20px]">
                        <thead>
                            <tr className="border-2 border-white bg-sky-400 text-center">
                                <th>Prezzo d'acquisto</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-2 border-white bg-sky-200 text-center">
                                <td>{prodotto.prezzoAcquisto}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="w-full min-h-1/2 flex justify-around bg-sky-200 overflow-y-auto">
                {/* Tabella Fatture Acquisti */}
                <table className="w-2/3 max-h-[20px]">
                    <thead>
                        <tr className="border-2 border-white bg-sky-400 text-center">
                            <th>Numero</th>
                            <th>Data</th>
                            <th>IVA</th>
                            <th>Listino</th>
                            <th>Sconto</th>
                            <th>Totale</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prodotto.fattureAcquisti && prodotto.fattureAcquisti.map((fattura, index) => {
                            return (
                                <tr key={index} className="border-2 border-white bg-sky-200 hover:bg-sky-300 text-center">
                                    <td>
                                        <Link to={`/dettaglio_fattura_acquisti/${fattura.id}`}>
                                            {fattura.numero}
                                        </Link>
                                    </td>
                                    <td>{new Date(fattura.data).toLocaleDateString('it-IT')}</td>
                                    <td>{fattura.iva}</td>
                                    <td>{fattura.listino}</td>
                                    <td>{fattura.sconto}</td>
                                    <td>{fattura.totale}</td>
                                    <td>{fattura.note}</td>
                                </tr>
                            )
                        })}                        
                    </tbody>        
                </table>

                {/* Tabella Fatture Vendita */}
                <table className="w-2/3 max-h-[20px]">
                    <thead>
                        <tr className="border-2 border-white bg-sky-400 text-center">
                            <th>Data</th>
                            <th>Numero</th>
                            <th>IVA</th>
                            <th>Listino</th>
                            <th>Sconto</th>
                            <th>Totale</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prodotto.fattureVendita && prodotto.fattureVendita.map((fattura, index) => {
                            return (
                                <tr key={index} className="border-2 border-white bg-sky-200 text-center">
                                    <td>{new Date(fattura.data).toLocaleDateString('it-IT')}</td>
                                    <td>{fattura.numero}</td>
                                    <td>{fattura.iva}</td>
                                    <td>{fattura.listino}</td>
                                    <td>{fattura.sconto}</td>
                                    <td>{fattura.totale}</td>
                                    <td>{fattura.note}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}