import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/landing/Landing.jsx'
import Home2 from './components/home/home2.jsx'
import Game from './components/game/game.jsx'
import Addvg from './components/addvg/addvg.jsx'

function App() {
  return (
    
    <div className="App">      
      <Router>
        <Switch> {/** Todo: hace que solo se pudan poner rutas existentes de lo contrario bota un error */}
        <Route exact path ='/' render={()=><Landing/>}/>  {/* Pagina inicial */}
        <Route exact path ='/home/' render={()=><Home2/>}/>  {/* ruta principal */}
        <Route exact path ='/videogame/:vgid' render={()=><Game/>}/>  {/* ruta detalles del juego */}
        <Route exact path='/makevideogame' render={()=><Addvg/>}/>
        <Route exact path='/editgame/:id' render={()=><Addvg/>}/>
        </Switch>
      </Router>
    </div>  
  );
}

export default App;
