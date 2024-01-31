import axios from 'axios';
import {useState, useEffect} from 'react';
import { ClipLoader } from 'react-spinners';
import { Navigate, useParams } from "react-router-dom";


export default function FormProdottiUpdate({form, setForm, prodotto, setProdotto}){

    useEffect(fornitoriList, [])

    const { id } = useParams()

    const [isLoading, setIsLoading] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);

    const [dettaglioProdotto, setDettaglioProdotto] = useState([])

    //estrazione valore select-option
    const [selezioneFornitore, setSelezioneFornitore] = useState()

    const [fornitori, setFornitori] = useState([])

    const handleFornitoreChange = (e) => {
        setSelezioneFornitore(e.target.value)
    }

    function fornitoriList() {
        axios.get('http://localhost:3000/fornitori')
            .then(response => {
                setFornitori(response.data)
                console.log(response.data)
            })
            .catch(error => {
                // Gestisci gli errori
                console.log(error);
            });
    }

    const handleInputChange = (e) => {
        const { name, type, value, checked } = e.target
        const inputValue = type == 'checkbox' ? checked : value
        setProdotto({
            ...prodotto,
            [name]: inputValue
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setIsLoading(true);

        const modificaProdotto = {
            nome: prodotto.nome,
            descrizione: prodotto.descrizione,
            prezzoVendita: parseFloat(prodotto.prezzoVendita.replace(',', '.')),
            pezzi: parseFloat(prodotto.pezzi),
            prezzoAcquisto: parseFloat(prodotto.prezzoAcquisto.replace(',', '.')),
            listino: parseFloat(prodotto.listino.replace(',', '.')),
            note: prodotto.note,
            fornitore: [parseFloat(selezioneFornitore)]
        }

        setDettaglioProdotto([...dettaglioProdotto, modificaProdotto])

        const inviaDati = async () => {
            try {
               
            const response = await axios.put(`http://localhost:3000/prodotti/modifica/${id}`, modificaProdotto);
            console.log(response.data);
                
              setIsLoading(false);
              setIsSuccess(true);
              setTimeout(() => {
                setForm(false)
                //ricarica l pagina dopo aver eliminato l'elemento
                window.location.reload()
              }, 2000);

            } catch (error) {
              console.error(error);
              setIsLoading(false);
            }
        };

        inviaDati()
    }


    

    return(
        <>
            <div className="absolute w-1/2 min-h-[450px] bg-sky-100 rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {/* CHIUDI FORM */}
                <div className="absolute top-5 right-5">
                    <button onClick={()=>setForm(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:scale-125">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* FORM */}
                <form className="mx-6 my-6" onSubmit={handleSubmit}>
                    {/* Nome prodotto */}
                    <div className="flex flex-col">
                        <label htmlFor="nome">Nome: </label>
                        <input className="border-2 rounded-md w-full" type="text" name="nome" value={prodotto.nome} onChange={handleInputChange}/>
                    </div>
                    {/* Descrizione */}
                    <div className="flex flex-col">
                        <label htmlFor="descrizione">Descrizione: </label>
                        <input className="border-2 rounded-md w-full" type="text" name="descrizione" value={prodotto.descrizione} onChange={handleInputChange}/>
                    </div>
                    {/* Prezzo di vendita */}
                    <div className="flex flex-col">
                        <label htmlFor="prezzoVendita">Prezzo di vendita: </label>
                        <input className="border-2 rounded-md w-full" type="number" name="prezzoVendita" value={prodotto.prezzoVendita} onChange={handleInputChange}/>
                    </div>
                    {/* Pezzi */}
                    <div className="flex flex-col">
                        <label htmlFor="pezzi">Pezzi: </label>
                        <input className="border-2 rounded-md w-full" type="number" name="pezzi" value={prodotto.pezzi} onChange={handleInputChange}/>
                    </div>
                    {/* prezzo d'acquisto */}
                    <div className="flex flex-col">
                        <label htmlFor="prezzoAcquisto">Prezzo d'acquisto: </label>
                        <input className="border-2 rounded-md w-full" type="number" name="prezzoAcquisto" value={prodotto.prezzoAcquisto} onChange={handleInputChange}/>
                    </div>
                    {/* Listino */}
                    <div className="flex flex-col">
                        <label htmlFor="listino">Listino: </label>
                        <input className="border-2 rounded-md w-full" type="number" name="listino" value={prodotto.listino} onChange={handleInputChange}/>
                    </div>
                    {/* Note */}
                    <div className="flex flex-col">
                        <label htmlFor="note">Note: </label>
                        <input className="border-2 rounded-md w-full" type="text" name="note" value={prodotto.note} onChange={handleInputChange}/>
                    </div>
                     {/* Fornitore */}
                    <div className="flex flex-col">
                        <label htmlFor="fornitore">Fornitore</label>
                        <select name="fornitore" id="fornitore" className="overflow-y-auto" value={selezioneFornitore} onChange={handleFornitoreChange}>
                            <option value="">Seleziona fornitore...</option>

                            {
                                fornitori.map((fornitore) => {
                                    return (

                                        <option key={fornitore.id} value={fornitore.id}>{fornitore.ragioneSociale}</option>

                                    )
                                })
                            }

                        </select>
                    </div>
                    <div className="flex justify-center">
                        {isLoading ? <ClipLoader /> : <button type="submit" className="p-1 bg-sky-400 mt-3 rounded-md text-white hover:bg-blue-400">Modifica prodotto</button>}
                    </div>
                    {isSuccess && <p className="text-center">Prodotto modificato con successo</p>}
                </form>
            </div>
        </>
    )
}