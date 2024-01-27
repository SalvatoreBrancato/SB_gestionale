import {Outlet} from 'react-router-dom';
import HeaderComp from '../components/HeaderComp';

export default function DefaultLayout(){
    return(
        <div className="flex flex-col h-screen">
            <HeaderComp></HeaderComp>
            <Outlet></Outlet>
        </div>
    )
}