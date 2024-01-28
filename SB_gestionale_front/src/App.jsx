import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './pages/DefaultLayout';
import HomePage from './pages/HomePage';
import ClientiPage from './pages/ClientiPage';
import ClientiShowPage from './pages/ClientiShowPage';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout/>}>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/clienti' element={<ClientiPage/>}></Route>
            <Route path='/dettaglio_cliente/:id' element={<ClientiShowPage/>}></Route>
            {/* <Route path='/mybooks' element={<MyBookPage/>}></Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
