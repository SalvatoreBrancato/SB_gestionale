import { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from "react-spinners";
import FormProdottiCreate from '../components/FormProdottiCreate';

export default function MagazzinoPage() {

    useEffect(listaProdottiApi, [])

    const [prodotti, setProdotti] = useState([])

    const [isLoading, setIsLoading] = useState(false);

    const [searchInput, setSearchInput] = useState('')

    function listaProdottiApi() {
        setIsLoading(true);
        axios.get('http://localhost:3000/prodotti')
            .then(response => {
                setProdotti(response.data)
                console.log(response.data)
                setIsLoading(false);
            })
            .catch(error => {
                // Gestisci gli errori
                console.log(error);
                setIsLoading(false);
            });
    }

    const prodottiAggregati = prodotti.reduce((acc, prodotto) => {
        const prodottoEsistente = acc.find(p => p.nome === prodotto.nome);

        if (prodottoEsistente) {
            prodottoEsistente.pezzi += prodotto.pezzi;
            prodottoEsistente.count += 1;

            // Se il prodotto corrente è più recente, aggiorna i valori
            if (prodotto.id > prodottoEsistente.id) {
                prodottoEsistente.descrizione = prodotto.descrizione;
                prodottoEsistente.prezzoAcquisto += prodotto.prezzoAcquisto;
                prodottoEsistente.prezzoVendita += prodotto.prezzoVendita;
                prodottoEsistente.listino += prodotto.listino;
                prodottoEsistente.note = prodotto.note;
            }
        } else {
            prodotto.count = 1;
            acc.push({ ...prodotto });
        }

        return acc;
    }, []).map(prodotto => {
        prodotto.prezzoAcquisto /= prodotto.count;
        prodotto.prezzoVendita /= prodotto.count;
        prodotto.listino /= prodotto.count;
        return prodotto;
    });



    console.log(prodottiAggregati);


    const risultatiRicerca = prodottiAggregati.filter(prodotto =>
        (prodotto.nome && prodotto.nome.toLowerCase().includes(searchInput.toLowerCase()))
    );



    return (
        <div className="h-full bg-sky-50 relative">
            <div className='mx-2 my-3 flex justify-between items-center '>
                <div>
                    <label htmlFor="ricercaFornitore" className='font-t'>Ricerca prodotto: </label>
                    <input name='ricercaFornitore' type="text" className='border-4 border-sky-100 mt-5' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                </div>
            </div>
            <div className='max-h-[90%] overflow-auto mb-14 my-tab'>
                <div className='w-full flex justify-between p-5 font-t text-center border-b-2 border-sky-200'>
                    <span className='w-[13%]'>Nome</span>
                    <span className='w-[13%]'>Descrizione</span>
                    <span className='w-[13%]'>Prezzo acq. medio</span>
                    <span className='w-[13%]'>Prezzo ven. medio</span>
                    <span className='w-[13%]'>Listino medio</span>
                    <span className='w-[13%]'>Pezzi disponibili</span>
                </div>
                {isLoading ? <div className='h-full w-full flex justify-center'><ClipLoader /></div> :
                    <div className='overflow-y-auto font-s'>
                        {risultatiRicerca.map((prodotto, index) => {
                            return (
                                <div key={index} className='w-full flex justify-between p-5 hover:bg-sky-100 border-b-2 border-sky-200'>
                                    <span className='w-[13%] text-center'>{prodotto.nome}</span>
                                    <span className='w-[13%] text-center'>{prodotto.descrizione}</span>
                                    <span className='w-[13%] text-center'>{prodotto.prezzoAcquisto}</span>
                                    <span className='w-[13%] text-center'>{prodotto.prezzoVendita}</span>
                                    <span className='w-[13%] text-center'>{prodotto.listino}</span>
                                    <span className='w-[13%] text-center'>{prodotto.pezzi}</span>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </div>

    )
}