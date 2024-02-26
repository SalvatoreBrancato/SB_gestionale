import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function HomePage() {

    const [clienti, setClienti] = useState([])

    useEffect(listaClienti, [])

    function listaClienti() {
        axios.get('http://localhost:3000/clienti')
            .then(response => {
                setClienti(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const [fornitori, setFornitori] = useState([])

    useEffect(listaFornitori, [])

    function listaFornitori() {
        axios.get('http://localhost:3000/fornitori')
            .then(response => {
                setFornitori(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const [fattureAcq, setFattureAcq] = useState([])

    useEffect(listaFattureAcq, [])

    function listaFattureAcq() {
        axios.get('http://localhost:3000/fattureAcquisti')
            .then(response => {
                setFattureAcq(response.data)

            })
            .catch(error => {
                console.log(error)
            })
    }

    const [fattureVen, setFattureVen] = useState([])

    useEffect(listaFattureVen, [])

    function listaFattureVen() {
        axios.get('http://localhost:3000/fattureVendita')
            .then(response => {
                setFattureVen(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <div className='bg-sky-50 h-full flex flex-col justify-center items-center py-2'>
            <div className="flex justify-around w-full px-5 text-xl font-bold text-[#0000ff]">
                <div>Clienti</div>
                <div>Fornitori</div>
            </div>
            <div className="flex justify-around w-full h-1/2 p-5">

                {/* CLIENTI */}
                <div className="w-1/3 h-full bg-sky-200 overflow-y-auto">
                    {/* Tabella Clienti */}
                    <table className="w-full max-h-full">
                        <thead>
                            <tr className="border-2 border-white bg-sky-400 text-center">
                                <th>Ragione Sociale</th>
                                <th>Nome</th>
                                <th>Cognome</th>
                                <th>Telefono</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clienti.map((cliente, index) => {
                                return (
                                    <tr key={index} className="border-2 border-white bg-sky-200 hover:bg-sky-300 text-center">
                                        <td>
                                            <Link to={`/dettaglio_cliente/${cliente.id}`}>
                                                {cliente.ragioneSociale}
                                            </Link>
                                        </td>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.cognome}</td>
                                        <td>{cliente.telefono}</td>
                                        <td>{cliente.email}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* FORNITORI */}
                <div className="w-1/3 h-full bg-sky-200 overflow-y-auto">
                    {/* Tabella Fornitori */}
                    <table className="w-full max-h-full text-center">
                        <thead>
                            <tr className="border-2 border-white bg-sky-400">
                                <th>Ragione Sociale</th>
                                <th>Telefono</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fornitori.map((fornitore, index) => {
                                return (
                                    <tr key={index} className="border-2 border-white bg-sky-200 hover:bg-sky-300 text-center">
                                        <td>
                                            <Link to={`/dettaglio_fornitore/${fornitore.id}`} >
                                                {fornitore.ragioneSociale}
                                            </Link>
                                        </td>
                                        <td>{fornitore.telefono}</td>
                                        <td>{fornitore.email}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-around w-full px-5 text-xl font-bold text-[#0000ff]">
                <div>Fatture vendita</div>
                <div>Fatture acquisto</div>
            </div>

            <div className="flex justify-around w-full h-1/2 p-5">

                {/* FATT.VEN */}
                <div className="w-1/3 h-full bg-sky-200 overflow-y-auto">
                    {/* Tabella Fatture Vendite */}
                    <table className="w-full max-h-full">
                        <thead>
                            <tr className="border-2 border-white bg-sky-400 text-center">
                                <th>Numero</th>
                                <th>Data</th>
                                <th>Totale</th>
                                <th>Cliente</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fattureVen.map((fatturaVen, index) => {
                                return (
                                    <tr key={index} className="border-2 border-white bg-sky-200 hover:bg-sky-300 text-center">
                                        <td>
                                            <Link to={`/dettaglio_fattura_vendite/${fatturaVen.id}`}>
                                                {fatturaVen.numero}
                                            </Link>
                                        </td>
                                        <td>{new Date(fatturaVen.data).toLocaleDateString('it-IT')}</td>
                                        <td>{fatturaVen.totale}</td>
                                        {fatturaVen.clienti && <td>{fatturaVen.clienti.ragioneSociale ? fatturaVen.clienti.ragioneSociale : fatturaVen.clienti.nome + ' ' + fatturaVen.clienti.cognome}</td>}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* FATT.ACQU */}
                <div className="w-1/3 h-full bg-sky-200 overflow-y-auto">
                    {/* Tabella Fatture Acquisto */}
                    <table className="w-full max-h-full">
                        <thead>
                            <tr className="border-2 border-white bg-sky-400 text-center">
                                <th>Numero</th>
                                <th>Data</th>
                                <th>Totale</th>
                                <th className="text-center">Fornitore</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fattureAcq.map((fatturaAcq, index) => {
                                return (
                                    <tr key={index} className="border-2 border-white bg-sky-200 hover:bg-sky-300 text-center">
                                        <td>
                                            <Link to={`/dettaglio_fattura_acquisti/${fatturaAcq.id}`}>
                                                {fatturaAcq.numero}
                                            </Link>
                                        </td>
                                        <td>{new Date(fatturaAcq.data).toLocaleDateString('it-IT')}</td>
                                        <td>{fatturaAcq.totale}</td>
                                        <td>{fatturaAcq.fornitori.ragioneSociale}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}