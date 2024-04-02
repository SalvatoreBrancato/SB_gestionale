import { useState, useEffect } from "react";
import { Navigate, useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";


export default function MagazzinoShowPage(){

    useEffect(dettaglioProdottoApi, [])
    const { nomeProdotto } = useParams();

    console.log(nomeProdotto);

    const [prodotto, setProdotto] = useState([])

    const [isLoading, setIsLoading] = useState(false);

    function dettaglioProdottoApi(){
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


    return(
        <div className="w-full flex justify-between">
            <h1 className="text-3xl font-t">{nomeProdotto}</h1>
            <div>ciao</div>
        </div>
    )
}