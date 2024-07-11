import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './components/landing/Landing.jsx'
import Home2 from './components/home/home2.jsx'
import Game from './components/game/game.jsx'
import Addvg from './components/addvg/addvg.jsx'
import Genres from './components/genres/genres';
import RenderCards from './components/rendercards/rendercards';

function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Routes> {/** Todo: hace que solo se pudan poner rutas existentes de lo contrario bota un error */}
          <Route path='/' element={<Landing />} />  {/* Pagina inicial */}
          <Route path='home' element={<Home2 />} />  {/* ruta principal */}
          <Route path='videogame/:vgid' element={<Game />} />  {/* ruta detalles del juego */}
          <Route path='makevideogame' element={<Addvg />} />
          <Route path='editgame/:id' element={<Addvg />} />
          <Route path='genres' element={<Genres />} /> {/* ! eliminar esta ruta */}
          <Route path='card-dev' element={<RenderCards />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
