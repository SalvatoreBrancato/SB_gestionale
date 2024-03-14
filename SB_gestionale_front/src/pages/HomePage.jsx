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
            <div className="flex justify-around w-full px-5 text-xl font-t text-sky-500">
                <div>Clienti</div>
                <div>Fornitori</div>
            </div>
            <div className="flex justify-around w-full h-1/2 p-5">

                {/* CLIENTI */}
                <div className="w-1/3 h-full overflow-y-auto my-tab">
                    {/* Tabella Clienti */}
                    
                        
                            <div className="p-2 flex text-center border-b-2 border-sky-200 mx-4 font-t">
                                <span className="w-1/3">Denominazione</span>
                                <span className="w-1/3">Telefono</span>
                                <span className="w-1/3">Email</span>
                            </div>
                        
                        
                            {clienti.map((cliente, index) => {
                                return (
                                    <div key={index} className="p-2 flex text-center border-b-2 hover:bg-sky-200 rounded-sm border-sky-200 mx-4 font-s">
                                        <span className="w-1/3">
                                            <Link to={`/dettaglio_cliente/${cliente.id}`}>
                                                {cliente.ragioneSociale && cliente.ragioneSociale || cliente.nome && cliente.nome + ' ' + cliente.cognome}
                                            </Link>
                                        </span>
                                        <span className="w-1/3">{cliente.telefono}</span>
                                        <span className="w-1/3 truncate">{cliente.email}</span>
                                    </div>
                                )
                            })}
                       
                    
                </div>


                {/* Tabella Fornitori */}
                <div className="w-1/3 h-full overflow-y-auto my-tab">
                    <div className="p-2 flex text-center border-b-2 border-sky-200 mx-4 font-t">
                        <span className="w-1/3">Denominazione</span>
                        <span className="w-1/3">Telefono</span>
                        <span className="w-1/3">Email</span>
                    </div>
                    {fornitori.map((fornitore, index) => {
                        return (
                            <div key={index} className="p-2 flex text-center border-b-2 hover:bg-sky-200 rounded-sm border-sky-200 mx-4 font-s">
                                <span className="w-1/3">
                                    <Link to={`/dettaglio_fornitore/${fornitore.id}`} >
                                        {fornitore.ragioneSociale}
                                    </Link>
                                </span>
                                <span className="w-1/3">{fornitore.telefono}</span>
                                <span className="w-1/3 truncate">{fornitore.email}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="flex justify-around w-full px-5 text-xl text-sky-500 font-t">
                <div>Fatture vendita</div>
                <div>Fatture acquisto</div>
            </div>

            <div className="flex justify-around w-full h-1/2 p-5">
                {/* Tabella Fatture Vendite */}
                <div className="w-1/3 h-full overflow-y-auto my-tab">
                    <div className="p-2 flex text-center border-b-2 border-sky-200 mx-4 font-t">
                        <span className="w-1/4">Numero</span>
                        <span className="w-1/4">Data</span>
                        <span className="w-1/4">Totale</span>
                        <span className="w-1/4">Fornitore</span>
                    </div>
                    {fattureVen.map((fatturaVen, index) => {
                        return (
                            <div key={index} className="p-2 flex text-center border-b-2 hover:bg-sky-200 rounded-sm border-sky-200 mx-4 font-s">
                                <span className="w-1/4">
                                    <Link to={`/dettaglio_fattura_vendite/${fatturaVen.id}`}>
                                        {fatturaVen.numero}
                                    </Link>
                                </span>
                                <span className="w-1/4">{fatturaVen.data}</span>
                                <span className="w-1/4">{fatturaVen.totale}</span>
                                {fatturaVen.clienti && <span className="w-1/4 truncate">{fatturaVen.clienti.ragioneSociale ? fatturaVen.clienti.ragioneSociale : fatturaVen.clienti.nome + ' ' + fatturaVen.clienti.cognome}</span>}
                            </div>
                        )
                    })}
                </div>

                {/* Tabella Fatture Acquisto */}
                <div className="w-1/3 h-full overflow-y-auto my-tab">
                    <div className="p-2 flex text-center border-b-2 border-sky-200 mx-4 font-t">
                        <span className="w-1/4">Numero</span>
                        <span className="w-1/4">Data</span>
                        <span className="w-1/4">Totale</span>
                        <span className="w-1/4">Fornitore</span>
                    </div>

                    {fattureAcq.map((fatturaAcq, index) => {
                        return (
                            <div key={index} className="p-2 flex text-center border-b-2 hover:bg-sky-200 rounded-sm border-sky-200 mx-4 font-s">
                                <span className="w-1/4">
                                    <Link to={`/dettaglio_fattura_acquisti/${fatturaAcq.id}`}>
                                        {fatturaAcq.numero}
                                    </Link>
                                </span>
                                <span className="w-1/4">{fatturaAcq.data}</span>
                                <span className="w-1/4">{fatturaAcq.totale}</span>
                                <span className="w-1/4 truncate">{fatturaAcq.fornitori.ragioneSociale}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}