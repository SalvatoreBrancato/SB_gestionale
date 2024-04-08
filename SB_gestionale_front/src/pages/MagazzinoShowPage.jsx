import { useState, useEffect } from "react";
import { Navigate, useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";


export default function MagazzinoShowPage() {

    useEffect(dettaglioProdottoApi, [])
    const { nomeProdotto } = useParams();

    const [prodotto, setProdotto] = useState([])

    const [isLoading, setIsLoading] = useState(false);

    function dettaglioProdottoApi() {
        setIsLoading(true);
        axios.get(`http://localhost:3000/prodotti?nome=${nomeProdotto}`)
            .then(response => {
                setProdotto(response.data)
                console.log(response.data)
                setIsLoading(false)
            })
            .catch(error => {
                // Gestisci gli errori
                console.log(error);
                setIsLoading(false);
            });
    }


    return (
        <>
            <div>
                <h1 className="text-3xl font-t py-3">{nomeProdotto}</h1>
            </div>

            <div className="w-full flex flex-wrap h-5/6 gap-4 justify-center">

                {/* TABBELLA FORNITORI */}
                <div className="my-tab w-[48%] h-2/4 overflow-auto">
                    <div className='w-full flex justify-between p-5 font-t text-center border-b-2 border-sky-200'>
                        <span className='w-1/5'>Fornitore</span>
                        <span className='w-1/5'>Email</span>
                        <span className='w-1/5'>Telefono</span>
                        <span className='w-1/5'>Prezzo d'acq.</span>
                        <span className='w-1/5'>Pezzi</span>
                    </div>
                    {
                        prodotto.map((elem, index) => {
                            if (elem.fornitore && elem.fornitore.length > 0) {
                                return (
                                    <div key={index} className="w-full flex justify-between p-5 font-s text-center border-b-2 border-sky-200">
                                        {elem.fornitore.map((fornitore, indexFor) => {
                                            return (
                                                <div key={indexFor} className="w-3/5 flex justify-between">
                                                    <span className="w-1/3">{fornitore.ragioneSociale}</span>
                                                    <span className="w-1/3 truncate">{fornitore.email}</span>
                                                    <span className="w-1/3">{fornitore.telefono}</span>
                                                </div>
                                            )
                                        })}
                                        <span className="w-1/5">{elem.prezzoAcquisto}</span>
                                        <span className="w-1/5">{elem.pezzi}</span>
                                    </div>
                                )
                            }
                        })
                    }
                </div>



                {/* TABBELLA CLIENTI */}
                <div className="my-tab w-[48%] h-2/4 overflow-auto">
                    <div className='w-full flex justify-between p-5 font-t text-center border-b-2 border-sky-200'>
                        <span className='w-1/5'>Cliente</span>
                        <span className='w-1/5'>Email</span>
                        <span className='w-1/5'>Telefono</span>
                        <span className='w-1/5'>Prezzo di ven.</span>
                        <span className='w-1/5'>Pezzi</span>
                    </div>
                    {
                        prodotto.map((elem, index) => {
                            if (elem.cliente && elem.cliente.length > 0) {
                                return (
                                    <div key={index} className="w-full flex justify-between p-5 font-s text-center border-b-2 border-sky-200">
                                        {elem.cliente.map((cliente, indexCli) => {
                                            return (
                                                <div key={indexCli} className="w-3/5 flex justify-between">
                                                    <span className="w-1/3">{cliente.ragioneSociale}</span>
                                                    <span className="w-1/3 truncate">{cliente.email}</span>
                                                    <span className="w-1/3">{cliente.telefono}</span>
                                                </div>
                                            )
                                        })}
                                        <span className="w-1/5">{elem.prezzoVendita}</span>
                                        <span className="w-1/5">{elem.pezzi}</span>
                                    </div>
                                )
                            }
                        })
                    }
                </div>

                <div className="my-tab w-[48%] h-2/4 overflow-auto">
                    <span>TAB FATT.ACQUISTO</span>
                </div>

                <div className="my-tab w-[48%] h-2/4 overflow-auto">
                    <span>TAB FATT.VENDITA</span>
                </div>
            </div>
        </>
    )
}