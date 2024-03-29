import axios from "axios";
import { useState } from 'react';
import { ClipLoader } from "react-spinners";


export default function FormCreateComp({ form, setForm, fornitori }) {

    //estaggo valore input radio cliente/fornitore
    const [clienteFornitore, setClienteFornitore] = useState(fornitori ? 'fornitore' : 'cliente')

    const handleClienteForntioreChange = (e) => {
        setClienteFornitore(e.target.value)
    }

    //estraggo valore input radio forma giuridica
    const [formaGiuridica, setFormaGiuridica] = useState('personaGiuridica')

    const handleFormaGiuridicaChange = (e) => {
        setFormaGiuridica(e.target.value)
    }

    const [formData, setFormData] = useState({
        ragioneSociale: '',
        nome: '',
        cognome: '',
        partitaIva: '',
        indirizzo: '',
        telefono: '',
        email: '',
        note: ''
    })

    const handleInputChange = (e) => {
        const { name, type, value, checked } = e.target
        const inputValue = type == 'checkbox' ? checked : value
        setFormData({
            ...formData,
            [name]: inputValue
        })
    }

    const [anagrafica, setAnagrafica] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()

        setIsLoading(true);

        const nuovaAnagrafica = {
            ragioneSociale: formData.ragioneSociale,
            nome: formData.nome,
            cognome: formData.cognome,
            partitaIva: formData.partitaIva,
            indirizzo: formData.indirizzo,
            telefono: formData.telefono,
            email: formData.email,
            note: formData.note
        }

        setAnagrafica([...anagrafica, nuovaAnagrafica])

        const inviaDati = async () => {
            try {

                if (clienteFornitore == 'cliente') {
                    const response = await axios.post('http://localhost:3000/clienti/inserisci', nuovaAnagrafica);
                    console.log(response.data);
                } else {
                    const response = await axios.post('http://localhost:3000/fornitori/inserisci', nuovaAnagrafica);
                    console.log(response.data);
                }

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

    const [isLoading, setIsLoading] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);



    return (
        <>
            <div className="absolute w-1/2 min-h-[450px] bg-sky-50 border-2 border-sky-400 rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                {/* CHIUDI FORM */}
                <div className="absolute top-5 right-5">
                    <button onClick={() => setForm(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:scale-125">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* INPUT RADIO */}
                <div className="flex mx-6 my-6">
                    <div className={`flex items-center me-3 p-2 rounded-md font-s ${clienteFornitore === 'cliente' ? 'bg-sky-400 text-white font-t' : ''}`}>
                        <label htmlFor="cliente-fornitore" className='me-1' >Cliente</label>
                        <input type="radio" name="cliente-fornitore" value="cliente" checked={clienteFornitore === 'cliente'} onChange={handleClienteForntioreChange} />
                    </div>
                    <div className={`flex items-center p-2 rounded-md font-s ${clienteFornitore === 'fornitore' ? 'bg-sky-400 text-white font-t' : ''}`}>
                        <label htmlFor="cliente-fornitore" className="me-1 ">Fornitore</label>
                        <input type="radio" name="cliente-fornitore" value="fornitore" checked={clienteFornitore === 'fornitore'} onChange={handleClienteForntioreChange} />
                    </div>
                    <div className={`flex items-center mx-3 p-2 rounded-md font-s ${formaGiuridica === 'personaFisica' ? 'bg-sky-400 text-white font-t' : ''}`}>
                        <label htmlFor="formaGiuridica" className="me-1">Persona fisica</label>
                        <input type="radio" name="formaGiuridica" value="personaFisica" checked={formaGiuridica === 'personaFisica'} onChange={handleFormaGiuridicaChange} />
                    </div>
                    <div className={`flex items-center p-2 rounded-md font-s ${formaGiuridica === 'personaGiuridica' ? 'bg-sky-400 text-white font-t' : ''}`}>
                        <label htmlFor="formaGiuridica" className="me-1">Persona giuridica</label>
                        <input type="radio" name="formaGiuridica" value="personaGiuridica" checked={formaGiuridica === 'personaGiuridica'} onChange={handleFormaGiuridicaChange} />
                    </div>
                </div>

                {/* FORM */}
                <form className="mx-6 my-6" onSubmit={handleSubmit}>

                    {formaGiuridica == 'personaGiuridica' &&
                        <div className="flex flex-col">
                            <label htmlFor="ragioneSociale" className='font-t'>Ragione sociale</label>
                            <input required className="bg-sky-50 border-b-2 border-sky-300 w-full font-s mb-3" type="text" name="ragioneSociale" value={formData.ragioneSociale} onChange={handleInputChange} />
                        </div>
                    }


                    {formaGiuridica == 'personaFisica' &&
                        <div className="flex flex-col">
                            <label htmlFor="nome" className='font-t'>Nome</label>
                            <input required className="bg-sky-50 border-b-2 border-sky-300 w-full font-s mb-3" type="text" name="nome" value={formData.nome} onChange={handleInputChange} />
                        </div>
                    }

                    {formaGiuridica == 'personaFisica' &&
                        <div className="flex flex-col">
                            <label htmlFor="cognome" className='font-t'>Cognome</label>
                            <input required className="bg-sky-50 border-b-2 border-sky-300 w-full font-s mb-3" type="text" name="cognome" value={formData.cognome} onChange={handleInputChange} />
                        </div>
                    }

                    {formaGiuridica == 'personaGiuridica' &&
                        <div className="flex flex-col">
                            <label htmlFor="partitaIva" className='font-t'>Partita IVA</label>
                            <input required className="bg-sky-50 border-b-2 border-sky-300 w-full font-s mb-3" type="number" name="partitaIva" value={formData.partitaIva} onChange={handleInputChange}/>
                        </div>
                    }
                    <div className="flex flex-col">
                        <label htmlFor="indirizzo" className='font-t'>Indirizzo</label>
                        <input required className="bg-sky-50 border-b-2 border-sky-300 w-full font-s mb-3" type="text" name="indirizzo" value={formData.indirizzo} onChange={handleInputChange} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="telefono" className='font-t'>Telefono</label>
                        <input  className="bg-sky-50 border-b-2 border-sky-300 w-full font-s mb-3" type="number" name="telefono" value={formData.telefono} onChange={handleInputChange} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className='font-t'>Email</label>
                        <input className="bg-sky-50 border-b-2 border-sky-300 w-full font-s mb-3" type="email" name="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="note" className='font-t'>Note</label>
                        <input className="bg-sky-50 border-b-2 border-sky-300 w-full font-s mb-3" type="text" name="note" value={formData.note} onChange={handleInputChange} />
                    </div>
                    <div className="flex justify-center">
                        {isLoading ? <ClipLoader /> : <button type="submit" className="p-1 bg-sky-400 mt-3 rounded-md text-white hover:bg-sky-500 font-t">{clienteFornitore == 'cliente' ? 'Inserisci nuovo cliente' : 'Inserisci nuovo fornitore'}</button>}
                    </div>
                    {isSuccess && <p className="text-center font-t">{clienteFornitore == 'cliente' ? '✔ Nuovo cliente caricato' : '✔ Nuovo fornitore caricato'}</p>}
                </form>
            </div>
        </>
    )
}