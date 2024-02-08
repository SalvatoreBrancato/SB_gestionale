import axios from "axios";
import { useEffect, useState } from 'react';
import { ClipLoader } from "react-spinners";

export default function NewFormFattAcq({ formFatturaAcq, setFormFatturaAcq, fattureAcq, form, setForm }){

    return(
        <div className='absolute w-5/6 min-h-[400px] max-h-[700px] bg-sky-100 rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-scroll z-10'>
            <h1>Nuovo form</h1>
        </div>
    )
}