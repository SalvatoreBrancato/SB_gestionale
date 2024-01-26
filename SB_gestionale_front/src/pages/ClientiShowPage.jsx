import { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

export default function DettaglioClientePage(){

    useEffect(dettaglioClienteApi, [])

    const {id} = useParams()

    const [cliente, setCliente] = useState()

    function dettaglioClienteApi(){
        axios.get(`http://localhost:3000/clienti/${id}`)
        .then(response => {
            setCliente(response.data)
            console.log(response.data)
        })
        .catch(error => {
            // Gestisci gli errori
            console.log(error);
          });
    }


    return(
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#03A9F4" className="w-6 h-6">
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
            </svg>


            {cliente && <span>{cliente.ragioneSociale}</span>}
            {cliente && <span>P.I. {cliente.partitaIva}</span>}
            {cliente && <span>{cliente.indirizzo}</span>}
            {cliente && <span>Tel: {cliente.telefono}</span>}
            {cliente && <span>email: {cliente.email}</span>}
            {cliente && <span>Note: {cliente.note}</span>}
            <ul className="mt-10">
                Fatture:
            {cliente && cliente.fattureVendita.map((fattura)=>{
                return(
                    <>
                        <li>Data: {fattura.data}</li>
                        <li>Numero: {fattura.numero}</li>
                        <li>Totale: {fattura.totale}</li>
                        <li>Note: {fattura.note}</li>

                    </>
                    
                )
            })}
            </ul>
        </>
    )
}