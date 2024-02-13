import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import FormProdottiCreate from '../components/FormProdottiCreate';



export default function ProdottiPage() {

    useEffect(listaProdottiApi, [])

    const [prodottiAcq, setProdottiAcq] = useState([])

    const [prodottiVen, setProdottiVen] = useState([])

    const [isLoading, setIsLoading] = useState(false);

    const [formProdotto, setFormProdotto] = useState(false)

    const [searchInput, setSearchInput] = useState('')

    const risultatiRicercaPositivi = prodottiAcq.filter(prodotto =>
        (prodotto.nome && prodotto.nome.toLowerCase().includes(searchInput.toLowerCase()))
    );

    const risultatiRicercaNegativi = prodottiVen.filter(prodotto =>
        (prodotto.nome && prodotto.nome.toLowerCase().includes(searchInput.toLowerCase()))
    );


    function listaProdottiApi() {
        setIsLoading(true);
        axios.get('http://localhost:3000/prodotti')
            .then(response => {
                const prodottiConPezziPositivi = response.data.filter(prodotto => prodotto.pezzi > 0);
                const prodottiConPezziNegativi = response.data.filter(prodotto => prodotto.pezzi <= 0);
                setProdottiAcq(prodottiConPezziPositivi);
                setProdottiVen(prodottiConPezziNegativi);
                console.log(prodottiConPezziPositivi);
                console.log(prodottiConPezziNegativi);
                setIsLoading(false);
            })
            .catch(error => {
                // Gestisci gli errori
                console.log(error);
                setIsLoading(false);
            });
    }



    function apriChiudiForm() {
        if (formProdotto == false) {
            setFormProdotto(true)
        } else {
            setFormProdotto(false)
        }
    }


    return (
        <div className="h-full bg-sky-50 relative">

            {/* sfondo in trasparenza quando si apre il form */}
            {formProdotto && <div className={`absolute inset-x-0 top-0 bottom-0 bg-white z-10 ${formProdotto ? 'bg-opacity-80' : 'bg-opacity-0'}`} onClick={() => apriChiudiForm()}></div>}

            <div className='w-full flex justify-between items-center p-5 '>
                <div>
                    <label htmlFor="ricercaFornitore">Ricerca prodotto: </label>
                    <input name='ricercaFornitore' type="text" className='border-4 border-sky-100' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                </div>
                <div className=''>
                    <button className='flex flex-col justify-center items-center' onClick={() => apriChiudiForm()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#03A9F4" className="w-8 h-8 transform hover:scale-125">
                            <path d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25ZM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6ZM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className='font-bold text-xl'>Storico prodotti acquistati</div>
            <div className='h-1/3 overflow-auto mb-14'>
                <div className='w-full flex justify-between p-5 bg-sky-300 font-bold text-center '>
                    <span className='w-[13%]'>Nome</span>
                    <span className='w-[13%]'>Fornitore</span>
                    <span className='w-[13%]'>Descrizione</span>
                    <span className='w-[13%]'>Prezzo d'acquisto</span>
                    <span className='w-[13%]'>Listino</span>
                    <span className='w-[13%]'>Pezzi</span>
                    <span className='w-[13%]'>Note</span>
                </div>
                <div>
                    {isLoading ? <div className='h-full w-full flex justify-center'><ClipLoader /></div> :
                        <div>
                            {risultatiRicercaPositivi.map((prodotto, index) => {
                                return (
                                    <Link key={index} to={`/dettaglio_prodotto/${prodotto.id}`} className='w-full flex justify-between p-5 bg-sky-200 hover:bg-sky-100 border-2 border-y-white'>
                                        <span className='w-[13%] text-center'>{prodotto.nome}</span>
                                        {prodotto.fornitore && prodotto.fornitore.map((elem, index) => <span key={index} className='w-[13%] text-center'>{elem.ragioneSociale}</span>)}
                                        <span className='w-[13%] text-center'>{prodotto.descrizione}</span>
                                        <span className='w-[13%] text-center'>{prodotto.prezzoAcquisto}</span>
                                        <span className='w-[13%] text-center'>{prodotto.listino}</span>
                                        <span className='w-[13%] text-center'>{prodotto.pezzi}</span>
                                        <span className='w-[13%] text-center'>{prodotto.note}</span>
                                    </Link>
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
            <div className='font-bold text-xl'>Storico prodotti venduti</div>
            <div className='h-1/3 overflow-auto'>
                <div className='w-full flex justify-between p-5 bg-sky-300 font-bold text-center'>
                    <span className='w-[13%]'>Nome</span>
                    <span className='w-[13%]'>Cliente</span>
                    <span className='w-[13%]'>Descrizione</span>
                    <span className='w-[13%]'>Prezzo di vendita</span>
                    <span className='w-[13%]'>Listino</span>
                    <span className='w-[13%]'>Pezzi</span>
                    <span className='w-[13%]'>Note</span>
                </div>
                <div>
                    {isLoading ? <div className='h-full w-full flex justify-center'><ClipLoader /></div> :
                        <div>
                            {risultatiRicercaNegativi.map((prodotto, index) => {
                                return (
                                    <Link key={index} to={`/dettaglio_prodotto/${prodotto.id}`} className='w-full flex justify-between p-5 bg-sky-200 hover:bg-sky-100 border-2 border-y-white'>
                                        <span className='w-[13%] text-center'>{prodotto.nome}</span>
                                        <span className='w-[13%] text-center'>manca relazione cliente prodotto</span>
                                        <span className='w-[13%] text-center'>{prodotto.descrizione}</span>
                                        <span className='w-[13%] text-center'>{prodotto.prezzoVendita}</span>
                                        <span className='w-[13%] text-center'>{prodotto.listino}</span>
                                        <span className='w-[13%] text-center'>{prodotto.pezzi}</span>
                                        <span className='w-[13%] text-center'>{prodotto.note}</span>
                                    </Link>
                                )
                            })}
                        </div>
                    }
                </div>
            </div>



            {formProdotto && <FormProdottiCreate formProdotto={formProdotto} setFormProdotto={setFormProdotto} prodotti={prodotti} />}

        </div>
    )
}