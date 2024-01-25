import {Outlet} from 'react-router-dom';
import HeaderComp from '../components/HeaderComp';

export default function DefaultLayout(){
    return(
        <div className="flex flex-col min-h-screen">
            <HeaderComp></HeaderComp>
            <Outlet></Outlet>
        </div>
    )
}