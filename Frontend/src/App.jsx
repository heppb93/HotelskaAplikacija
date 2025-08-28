import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {Container} from 'react-bootstrap'
import NavBarHotel from './Components/NavbarHotel'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Pocetna from './pages/Pocetna'
import Smjestaji from './pages/Smještaji/Smjestaji'
import Rezervacije from './pages/Rezervacije'
import SmjestajDodaj from './pages/Smještaji/DodajSmjestaj'
import SmjestajiPromjena from './pages/Smještaji/SmjestajiPromjena'


function App() {
  

  return (
    <Container>
       <NavBarHotel/>
       <Container className="app">
       <Routes>
        <Route path={RouteNames.HOME} element={<Pocetna/>}/>
        <Route path={RouteNames.SMJESTAJI} element={<Smjestaji/>}/>
        <Route path={RouteNames.SMJESTAJ_NOVI} element={<SmjestajDodaj />} />
        <Route path={RouteNames.SMJESTAJ_PROMJENA} element={<SmjestajiPromjena />} />
        <Route path={RouteNames.REZERVACIJE} element={<Rezervacije/>}/>
       </Routes>
              <hr/>
      &copy; Hotel California
       </Container>
    </Container>
  )
}

export default App
