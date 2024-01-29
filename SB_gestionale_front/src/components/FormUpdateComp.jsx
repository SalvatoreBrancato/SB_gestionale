import axios from 'axios';
import {useState, useEffect} from 'react';
import { ClipLoader } from 'react-spinners';
import { Navigate, useParams } from "react-router-dom";

export default function FormUpdateComp({form, setForm, cliente, setCliente}){

    const { id } = useParams()

    //estaggo valore input radio cliente/fornitore
    const [clienteFornitore, setClienteFornitore] = useState('cliente')
    
    const handleClienteForntioreChange = (e) =>{
        setClienteFornitore(e.target.value)
    }

    //estraggo valore input radio forma giuridica
    const [formaGiuridica, setFormaGiuridica] = useState(cliente.ragioneSociale ? 'personaGiuridica':'personaFisica') 

    const handleFormaGiuridicaChange = (e) => {
        setFormaGiuridica(e.target.value)
    }

    const [isLoading, setIsLoading] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, type, value, checked } = e.target
        const inputValue = type == 'checkbox' ? checked : value
        setCliente({
            ...cliente,
            [name]: inputValue
        })
    }

    const [anagrafica, setAnagrafica] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()

        setIsLoading(true);

        const modificaAnagrafica = {
            ragioneSociale: formaGiuridica == 'personaGiuridica' ? cliente.ragioneSociale: '',
            nome: formaGiuridica == 'personaFisica' ? cliente.nome: '',
            cognome: formaGiuridica == 'personaFisica' ? cliente.cognome: '',
            partitaIva: formaGiuridica == 'personaGiuridica' ? cliente.partitaIva:'',
            indirizzo: cliente.indirizzo,
            telefono: cliente.telefono,
            email: cliente.email,
            note: cliente.note
        }

        setAnagrafica([...anagrafica, modificaAnagrafica])

        const inviaDati = async () => {
            try {
              const response = await axios.put(`http://localhost:3000/clienti/modifica/${id}`, modificaAnagrafica);
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
                

                 {/* INPUT RADIO */}
                 <div className="flex mx-6 my-6">
                    <div className="flex items-center me-3">
                        <label htmlFor="cliente-fornitore" className="me-1">Cliente</label>
                        <input type="radio" name="cliente-fornitore" value="cliente" checked={clienteFornitore === 'cliente'} onChange={handleClienteForntioreChange}/>
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="cliente-fornitore" className="me-1">Fornitore</label>
                        <input type="radio" name="cliente-fornitore" value="fornitore" checked={clienteFornitore === 'fornitore'} onChange={handleClienteForntioreChange}/>                            
                    </div>
                    <div className="flex items-center mx-3">
                        <label htmlFor="formaGiuridica" className="me-1">Persona fisica</label>
                        <input type="radio" name="formaGiuridica" value="personaFisica" checked={formaGiuridica === 'personaFisica'} onChange={handleFormaGiuridicaChange}/>                            
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="formaGiuridica" className="me-1">Persona giuridica</label>
                        <input type="radio" name="formaGiuridica" value="personaGiuridica" checked={formaGiuridica === 'personaGiuridica'} onChange={handleFormaGiuridicaChange}/>                            
                    </div>
                </div>

                {/* FORM */}
                <form className="mx-6 my-6" onSubmit={handleSubmit}>

                   {formaGiuridica == 'personaGiuridica' && 
                   <div className="flex flex-col">
                        <label htmlFor="ragioneSociale">Ragione sociale: </label>
                        <input className="border-2 rounded-md w-full" type="text" name="ragioneSociale" value={cliente.ragioneSociale} onChange={handleInputChange}/>
                    </div>
                    }


                    {formaGiuridica == 'personaFisica' && 
                        <div className="flex flex-col">
                        <label htmlFor="nome">Nome: </label>
                        <input className="border-2 rounded-md w-full" type="text" name="nome" value={cliente.nome} onChange={handleInputChange}/>
                    </div>
                    }

                    {formaGiuridica == 'personaFisica' &&
                        <div className="flex flex-col">
                        <label htmlFor="cognome">Cognome: </label>
                        <input className="border-2 rounded-md w-full" type="text" name="cognome" value={cliente.cognome} onChange={handleInputChange}/>
                    </div>
                    }

                    {formaGiuridica == 'personaGiuridica' && 
                        <div className="flex flex-col">
                        <label htmlFor="partitaIva">Partita IVA: </label>
                        <input className="border-2 rounded-md w-full" type="number" name="partitaIva" value={cliente.partitaIva} onChange={handleInputChange}/>
                    </div>
                    }
                    <div className="flex flex-col">
                        <label htmlFor="indirizzo">Indirizzo: </label>
                        <input className="border-2 rounded-md w-full" type="text" name="indirizzo" value={cliente.indirizzo} onChange={handleInputChange}/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="telefono">Telefono: </label>
                        <input className="border-2 rounded-md w-full" type="number" name="telefono" value={cliente.telefono} onChange={handleInputChange}/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email">Email: </label>
                        <input className="border-2 rounded-md w-full" type="email" name="email" value={cliente.email} onChange={handleInputChange}/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="note">Note: </label>
                        <input className="border-2 rounded-md w-full" type="text" name="note" value={cliente.note} onChange={handleInputChange}/>
                    </div>
                    <div className="flex justify-center">
                        {isLoading ? <ClipLoader /> : <button type="submit" className="p-1 bg-sky-400 mt-3 rounded-md text-white hover:bg-blue-400">{clienteFornitore == 'cliente' ? 'Modifica cliente': 'Modifica fornitore'}</button>}
                    </div>
                    {isSuccess && <p className="text-center">{clienteFornitore == 'cliente' ? 'Cliente modificato':'Fornitore modificato'}</p>}
                </form>
            </div>
        </>
    )
}