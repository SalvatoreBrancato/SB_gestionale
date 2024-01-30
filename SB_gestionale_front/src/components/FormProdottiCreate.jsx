import axios from "axios";
import {useState} from 'react';
import { ClipLoader } from "react-spinners";


export default function FormProdottiCreate(){

    const [formData, setFormData] = useState({
        nome: '',
        descrizione: '',
        prezzoVendita: '',
        pezzi: '',
        prezzoAcquisto: '',
        lisitno: '',
        note:'',
        fornitore:[]
    })


    return(
        <div className="absolute w-1/2 min-h-[450px] bg-sky-100 rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">

        </div>
    )
}