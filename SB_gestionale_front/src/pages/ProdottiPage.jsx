import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";



export default function ProdottiPage() {

    useEffect(listaProdottiApi, [])

    const [prodotti, setProdotti] = useState([])

    const [isLoading, setIsLoading] = useState(false);

    function listaProdottiApi() {
        setIsLoading(true);
        axios.get('http://localhost:3000/prodotti')
            .then(response => {
                setProdotti(response.data)
                setIsLoading(false);
            })
            .catch(error => {
                // Gestisci gli errori
                console.log(error);
                setIsLoading(false);
            });
    }


    return (
        <div className="h-full bg-sky-50">
            <div className='w-full flex justify-between p-5 bg-sky-300 relative'>
                <span className='w-[13%] text-center'>Nome</span>
                <span className='w-[13%] text-center'>Descrizione</span>
                <span className='w-[13%] text-center'>Prezzo d'acquisto</span>
                <span className='w-[13%] text-center'>Prezzo di vendita</span>
                <span className='w-[13%] text-center'>Listino</span>
                <span className='w-[13%] text-center'>Pezzi</span>
                <span className='w-[13%] text-center'>Note</span>
                <div className='absolute top-3 right-3'>
                    <button className='flex flex-col justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFF" className="w-8 h-8 transform hover:scale-125">
                            <path d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25ZM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6ZM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5Z" />
                        </svg>

                    </button>
                </div>
            </div>
            {isLoading ? <ClipLoader /> :
                <div className='overflow-y-auto'>
                    {prodotti.map((prodotto) => {
                        return (
                            <Link key={prodotto.id} to={`/dettaglio_prodotto/${prodotto.id}`} className='fw-full flex justify-between p-5 bg-sky-200 hover:bg-sky-100 border-2 border-y-white'>
                                <span className='w-[13%] text-center'>{prodotto.nome}</span>
                                <span className='w-[13%] text-center'>{prodotto.descrizione}</span>
                                <span className='w-[13%] text-center'>{prodotto.prezzoAcquisto}</span>
                                <span className='w-[13%] text-center'>{prodotto.prezzoVendita}</span>
                                <span className='w-[13%] text-center'>{prodotto.listino}</span>
                                <span className='w-[13%] text-center'>{prodotto.pezzi}</span>
                                <span className='w-[13%] text-center'>{prodotto.note}</span>
                            </Link>

                        )
                    })}
                </div>}

        </div>
    )
}