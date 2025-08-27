import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {Container} from 'react-bootstrap'
import NavBarHotel from './Components/NavbarHotel'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Pocetna from './pages/Pocetna'
import Smjestaji from './pages/Smjestaji'
import Rezervacije from './pages/Rezervacije'


function App() {
  

  return (
    <Container>
       <NavBarHotel/>
       <Container className="app">
       <Routes>
        <Route path={RouteNames.HOME} element={<Pocetna/>}/>
        <Route path={RouteNames.SMJESTAJI} element={<Smjestaji/>}/>
        <Route path={RouteNames.REZERVACIJE} element={<Rezervacije/>}/>
       </Routes>
       </Container>
       <hr/>
      &copy; Hotel California
    </Container>
  )
}

export default App
