import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../constants';


export default function NavBarHotel() {

    const navigate = useNavigate()

    const logoUrl = '/logo.png';

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className='ruka' onClick={()=> navigate(RouteNames.HOME)}><img src={logoUrl} width="125" height="75" alt="Logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=> navigate(RouteNames.HOME)}>Početna</Nav.Link>
            <Nav.Link onClick={()=> navigate(RouteNames.REZERVACIJE)}>Rezervacije</Nav.Link>
            <Nav.Link onClick={()=> navigate(RouteNames.SMJESTAJI)}>Sobe i Apartmani</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
