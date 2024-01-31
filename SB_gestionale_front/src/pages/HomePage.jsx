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
            <div className="flex justify-around w-full px-5">
                <div>Clienti</div>
                <div>Fornitori</div>
            </div>
            <div className="flex justify-around w-full h-1/2 p-5">

                {/* CLIENTI */}
                <div className="w-1/3 h-full bg-sky-200 overflow-y-auto">
                    {/* Tabella Clienti */}
                    <table className="w-full max-h-full">
                        <tr className="border-2 border-white bg-sky-400">
                            <th className="text-center">Ragione Sociale</th>
                            <th className="text-center">Nome</th>
                            <th className="text-center">Cognome</th>
                            <th className="text-center">Telefono</th>
                            <th className="text-center">Email</th>
                        </tr>

                        {clienti.map((cliente) => {
                            return (
                                <tr className="border-2 border-white bg-sky-200 hover:bg-sky-300">
                                    <Link key={cliente.id} to={`/dettaglio_cliente/${cliente.id}`} >
                                        <td className="text-center ">{cliente.ragioneSociale}</td>
                                    </Link>
                                    <td className="text-center">{cliente.nome}</td>
                                    <td className="text-center">{cliente.cognome}</td>
                                    <td className="text-center">{cliente.telefono}</td>
                                    <td className="text-center">{cliente.email}</td>
                                </tr>
                            )
                        })}

                    </table>
                </div>

                {/* FORNITORI */}
                <div className="w-1/3 h-full bg-sky-200 overflow-y-auto">
                    {/* Tabella Fornitori */}
                    <table className="w-full max-h-full">
                        <tr className="border-2 border-white bg-sky-400">
                            <th className="text-center">Ragione Sociale</th>
                            <th className="text-center">Telefono</th>
                            <th className="text-center">Email</th>
                        </tr>

                        {fornitori.map((fornitore) => {
                            return (
                                <tr className="border-2 border-white bg-sky-200 hover:bg-sky-300">
                                    <Link key={fornitore.id} to={`/dettaglio_fornitore/${fornitore.id}`} >
                                        <td className="text-center">{fornitore.ragioneSociale}</td>
                                    </Link>
                                    <td className="text-center">{fornitore.telefono}</td>
                                    <td className="text-center">{fornitore.email}</td>
                                </tr>
                            )
                        })}

                    </table>
                </div>
            </div>
            <div className="flex justify-around w-full px-5">
                <div>Fatture vendita</div>
                <div>Fatture acquisto</div>
            </div>

            <div className="flex justify-around w-full h-1/2 p-5">

                {/* FATT.VEN */}
                <div className="w-1/3 h-full bg-sky-200 overflow-y-auto">
                    {/* Tabella Fatture Vendite */}
                    <table className="w-full max-h-full">
                        <tr className="border-2 border-white bg-sky-400">
                            <th className="text-center">Numero</th>
                            <th className="text-center">Data</th>
                            <th className="text-center">Totale</th>
                            <th className="text-center">Cliente</th>
                        </tr>

                        {fattureVen.map((fatturaVen) => {
                            return (
                                <tr className="border-2 border-white bg-sky-200 hover:bg-sky-300">
                                    <td className="text-center">{fatturaVen.numero}</td>
                                    <td className="text-center">{fatturaVen.data}</td>
                                    <td className="text-center">{fatturaVen.totale}</td>
                                    {fatturaVen.clienti && <td className="text-center">{fatturaVen.clienti.ragioneSociale ? fatturaVen.clienti.ragioneSociale : fatturaVen.clienti.nome + ' ' + fatturaVen.clienti.cognome}</td>}
                                </tr>
                            )
                        })}

                    </table>
                </div>

                {/* FATT.ACQU */}
                <div className="w-1/3 h-full bg-sky-200 overflow-y-auto">
                    {/* Tabella Fatture Acquisto */}
                    <table className="w-full max-h-full">
                        <tr className="border-2 border-white bg-sky-400">
                            <th className="text-center">Numero</th>
                            <th className="text-center">Data</th>
                            <th className="text-center">Totale</th>
                            <th className="text-center">Fornitore</th>
                        </tr>

                        {fattureAcq.map((fatturaAcq) => {
                            return (
                                <tr className="border-2 border-white bg-sky-200 hover:bg-sky-300">
                                    <td className="text-center">{fatturaAcq.numero}</td>
                                    <td className="text-center">{fatturaAcq.data}</td>
                                    <td className="text-center">{fatturaAcq.totale}</td>
                                    <td className="text-center">{fatturaAcq.fornitori.ragioneSociale}</td>
                                </tr>
                            )
                        })}

                    </table>
                </div>
            </div>

        </div>
    )
}