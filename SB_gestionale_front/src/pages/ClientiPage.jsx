import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import FormCreateComp from '../components/FormCreateComp';

export default function ClientiPage(){

    useEffect(clientiApi, [])

    const [clienti, setClienti] = useState([])
    
    const [form, setForm] = useState(false)

    function clientiApi(){
        axios.get('http://localhost:3000/clienti')
            .then(response => {
              // Analizza la risposta
              setClienti(response.data);
              console.log(response.data)
            })
            
            .catch(error => {
              // Gestisci gli errori
              console.log(error);
            });
    }

    function apriForm(){
        if(!form){
            setForm(true)
        }else{
            setForm(false)
        }
    }

    return(
        <>
            <div className='mx-5 flex justify-between'>
                <div>
                    <label htmlFor="ricercaCliente">Ricerca cliente: </label>
                    <input name='ricercaCliente' type="text" className='border-4 border-sky-100 mt-5'/>
                </div>
                <div className='flex justify-center items-center'>
                    <button onClick={()=>apriForm()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#03A9F4" className="w-6 h-6">
                            <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap mx-auto realtive">
                {/* sfondo in trasparenza quando si apre il form */}
                <div className={`absolute inset-x-0 top-32 bottom-0 bg-white ${form ? 'bg-opacity-80':'bg-opacity-0'}`}></div>
                {
                    clienti.map((cliente)=>{
                        return(
                            <Link key={cliente.id} to={`/dettaglio_cliente/${cliente.id}`} className='border bg-sky-100 rounded-md shadow-lg flex flex-col m-3 w-72'>
                                <span>{cliente.ragioneSociale}</span>
                                <span>P.I. {cliente.partitaIva}</span>
                                <span>{cliente.indirizzo}</span>
                                <span>Tel: {cliente.telefono}</span>
                                <span>email: {cliente.email}</span>
                                <span>Note: {cliente.note}</span>
                            </Link>
                        )
                    })
                }
                {form && <FormCreateComp form={form} setForm={setForm}></FormCreateComp>}
                
            </div>
        </>
    )
}