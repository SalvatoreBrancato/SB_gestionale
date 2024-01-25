import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ClientiPage(){

    useEffect(clientiApi, [])

    const [clienti, setClienti] = useState([])

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

    return(
        <div className="flex flex-wrap mx-auto">
            {
                clienti.map((cliente)=>{
                    return(
                        <div key={cliente.id} className="border flex flex-col m-3">
                            <span>Ragione sociale: {cliente.ragioneSociale}</span>
                            <span>P.I. {cliente.partitaIva}</span>
                            <span>email: {cliente.email}</span>

                        </div>
                    )
                })
            }
            
        </div>
    )
}