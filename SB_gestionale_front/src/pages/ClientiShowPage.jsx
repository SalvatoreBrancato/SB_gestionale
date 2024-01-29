import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import FormUpdateComp from "../components/FormUpdateComp";

export default function DettaglioClientePage() {

    useEffect(dettaglioClienteApi, [])

    const { id } = useParams()

    const [cliente, setCliente] = useState()

    const [form, setForm] = useState(false)



    function dettaglioClienteApi() {
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


    function eliminaCliente(){
        axios.delete(`http://localhost:3000/clienti/${id}`)
        .then(response =>{
            console.log(response)
        })
        .catch(error =>{
            console.log(error)
        })

        //ricarica l pagina dopo aver eliminato l'elemento
        window.addEventListener('popstate', function(event) {
            window.location.reload();
          });
          
          window.history.back(); // torna alla pagina precedente
    }

    function apriForm(){
        if(!form){
            setForm(true)
        }else{
            setForm(false)
        }
    }



    return (
        <div className="bg-sky-50 h-full relative">
            
            {/* sfondo in trasparenza quando si apre il form */}
            <div className={`absolute inset-x-0 top-10 bottom-0 bg-white ${form ? 'bg-opacity-80':'bg-opacity-0'}`}></div>
            
            {/* FORM */}
           {form && <FormUpdateComp form={form} setForm={setForm} cliente={cliente} setCliente={setCliente}></FormUpdateComp>}
            
            <div className="flex justify-end m-3">
                <button className="me-3" onClick={()=>apriForm()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#03A9F4" className="w-7 h-7">
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                </button>
                <button onClick={()=>eliminaCliente()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF0000" className="w-7 h-7">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>


            <div className="flex flex-col">
                
                
                {cliente && cliente.ragioneSociale && <span>{cliente.ragioneSociale}</span>}
                {cliente && cliente.partitaIva && <span>P.I. {cliente.partitaIva}</span>}
                {cliente && cliente.nome && <span>{cliente.nome}</span>}
                {cliente && cliente.cognome && <span>{cliente.cognome}</span>}
                {cliente && <span>{cliente.indirizzo}</span>}
                {cliente && <span>Tel: {cliente.telefono}</span>}
                {cliente && <span>email: {cliente.email}</span>}
                {cliente && <span>Note: {cliente.note}</span>}
            </div>

            {/* Tabella Fatture */}
            <table className="w-1/3">
                <tr className="border-2 border-white bg-sky-400">
                    <th className="text-center">Data</th>
                    <th className="text-center">Numero</th>
                    <th className="text-center">Totale</th>
                    <th className="text-center">Note</th>
                </tr>

                {cliente && cliente.fattureVendita.map((fattura) => {
                    return (
                        <tr className="border-2 border-white bg-sky-200">
                            <td className="text-center">{fattura.data}</td>
                            <td className="text-center">{fattura.numero}</td>
                            <td className="text-center">{fattura.totale}</td>
                            <td className="text-center">{fattura.note}</td>
                        </tr>
                    )
                })}

            </table>
        </div>
    )
}

