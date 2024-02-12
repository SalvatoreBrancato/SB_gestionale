import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './pages/DefaultLayout';
import HomePage from './pages/HomePage';
import ClientiPage from './pages/ClientiPage';
import ClientiShowPage from './pages/ClientiShowPage';
import FornitoriPage from './pages/FornitoriPage';
import FornitoriShowPage from './pages/FornitoriShowPage';
import ProdottiPage from './pages/ProdottiPage';
import ProdottiShowPage from './pages/ProdottiShowPage';
import FattureAcqPage from './pages/FattureAcqPage';
import FattureAcqShowPage from './pages/FattureAcqShowPage';
import MagazzinoPage from './pages/MagazzinoPage';
import FattureVenPage from './pages/FattureVenPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout/>}>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/clienti' element={<ClientiPage/>}></Route>
            <Route path='/dettaglio_cliente/:id' element={<ClientiShowPage/>}></Route>
            <Route path='/fornitori' element={<FornitoriPage/>}></Route>
            <Route path='/dettaglio_fornitore/:id' element={<FornitoriShowPage/>}></Route>
            <Route path='/prodotti' element ={<ProdottiPage/>}></Route> 
            <Route path='/dettaglio_prodotto/:id' element={<ProdottiShowPage/>}></Route>
            <Route path='/magazzino' element ={<MagazzinoPage/>}></Route> 
            <Route path='/fatture_acquisti' element ={<FattureAcqPage/>}></Route> 
            <Route path='/dettaglio_fattura_acquisti/:id' element={<FattureAcqShowPage/>}></Route>
            <Route path='/fatture_vendita' element ={<FattureVenPage/>}></Route> 
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
