import axios from "axios";
import { useEffect, useState } from 'react';
import { ClipLoader } from "react-spinners";


export default function FormProdottiCreate({ formProdotto, setFormProdotto }) {

    useEffect(fornitoriList, [])

    const [prodotto, setProdotto] = useState([])

    const [isLoading, setIsLoading] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);

    const [fornitori, setFornitori] = useState([])

    const [formData, setFormData] = useState({
        nome: '',
        descrizione: '',
        prezzoVendita: '',
        pezzi: '',
        prezzoAcquisto: '',
        listino: '',
        note: '',
        fornitore: []
    })

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

    //estrazione valore select-option
    const [selezioneFornitore, setSelezioneFornitore] = useState()

    const handleFornitoreChange = (e) => {
        setSelezioneFornitore(e.target.value)
    }

    const handleInputChange = (e) => {
        const { name, type, value, checked } = e.target
        const inputValue = type == 'checkbox' ? checked : value
        setFormData({
            ...formData,
            [name]: inputValue
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setIsLoading(true);

        const nuovoProdotto = {
            nome: formData.nome,
            descrizione: formData.descrizione,
            prezzoVendita: parseFloat(formData.prezzoVendita.replace(',', '.')),
            pezzi: parseFloat(formData.pezzi),
            prezzoAcquisto: parseFloat(formData.prezzoAcquisto.replace(',', '.')),
            listino: parseFloat(formData.listino.replace(',', '.')),
            note: formData.note,
            fornitore: [parseFloat(selezioneFornitore)]
        }

        setProdotto([...prodotto, nuovoProdotto])

        const inviaDati = async () => {
            try {
                const response = await axios.post('http://localhost:3000/prodotti/inserisci', nuovoProdotto);
                console.log(response.data)

                setIsLoading(false);
                setIsSuccess(true);
                setTimeout(() => {
                    setFormProdotto(false)
                    //ricarica l pagina dopo aver eliminato l'elemento
                    window.location.reload()
                }, 2000);

            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }

        inviaDati()
    }



    return (
        <div className="absolute w-1/2 min-h-[450px] bg-sky-50 border-2 border-sky-400 rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">

            {/* CHIUDI FORM */}
            <div className="absolute top-5 right-5">
                <button onClick={() => setFormProdotto(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:scale-125">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <form className="mx-6 my-6" onSubmit={handleSubmit}>
                {/* Nome prodotto */}
                <div className="flex flex-col font-t">
                    <label htmlFor="nome">Nome prodotto: </label>
                    <input required className="bg-sky-50 border-b-2 border-sky-300 w-full font-s mb-3" type="text" name="nome" value={formData.nome} onChange={handleInputChange} />
                </div>
                {/* Descrizione */}
                <div className="flex flex-col font-t">
                    <label htmlFor="descrizione">Descrizione: </label>
                    <input required className="bg-sky-50 border-b-2 border-sky-300 w-full font-s mb-3" type="text" name="descrizione" value={formData.descrizione} onChange={handleInputChange} />
                </div>
                {/* Prezzo di vendita */}
                <div className="flex flex-col font-t">
                    <label htmlFor="prezzoVendita">Prezzo di vendita: </label>
                    <input required className="bg-sky-50 border-b-2 border-sky-300 w-full font-s mb-3" type="number" name="prezzoVendita" value={formData.prezzoVendita} onChange={handleInputChange} />
                </div>
                {/* Pezzi */}
                <div className="flex flex-col font-t">
                    <label htmlFor="pezzi">Pezzi: </label>
                    <input required className="bg-sky-50 border-b-2 border-sky-300 w-full font-s mb-3" type="number" name="pezzi" value={formData.pezzi} onChange={handleInputChange} />
                </div>
                {/* Prezzo d'acquisto */}
                <div className="flex flex-col font-t">
                    <label htmlFor="prezzoAcquisto">Prezzo d'acquisto: </label>
                    <input required className="bg-sky-50 border-b-2 border-sky-300 w-full font-s mb-3" type="number" name="prezzoAcquisto" value={formData.prezzoAcquisto} onChange={handleInputChange} />
                </div>
                {/* Listino */}
                <div className="flex flex-col font-t">
                    <label htmlFor="listino">Listino: </label>
                    <input required className="bg-sky-50 border-b-2 border-sky-300 w-full font-s mb-3" type="number" name="listino" value={formData.listino} onChange={handleInputChange} />
                </div>
                {/* Note */}
                <div className="flex flex-col font-t">
                    <label htmlFor="note">Note: </label>
                    <input className="bg-sky-50 border-b-2 border-sky-300 w-full font-s mb-3" type="text" name="note" value={formData.note} onChange={handleInputChange} />
                </div>
                {/* Fornitore */}
                <div className="flex flex-col font-t">
                    <label htmlFor="fornitore">Fornitore</label>
                    <select required name="fornitore" id="fornitore" className="overflow-y-auto bg-sky-50 border-b-2 border-sky-300 w-full font-s mb-3" value={selezioneFornitore} onChange={handleFornitoreChange}>
                        <option  value="">Seleziona fornitore...</option>

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
                    {isLoading ? <ClipLoader /> : <button type="submit" className="p-1 bg-sky-400 my-3 rounded-md text-white hover:bg-sky-500 font-t">Inserisci nuovo prodotto</button>}
                </div>
                {isSuccess && <p className="text-center font-t">✔ Nuovo prodotto creato</p>}

            </form>




        </div>
    )
}