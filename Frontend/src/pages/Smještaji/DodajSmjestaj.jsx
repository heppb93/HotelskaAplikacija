import SmjestajService from "../../services/SmjestajService";
import { Button, Row, Col, Form } from "react-bootstrap";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames} from "../../constants";
//import useLoading from "../hooks/useLoading";
//import useError from '../hooks/useError';


export default function SmjestajDodaj(){

    const navigate = useNavigate()
  //  const { showLoading, hideLoading } = useLoading();
//    const { prikaziError } = useError();

    async function dodaj(smjestaj) {
      //  showLoading();
        const odgovor = await SmjestajService.dodaj(smjestaj)
      //  hideLoading();
        if(odgovor.greska){
      //     prikaziError(odgovor.poruka)
            return;
        }
        navigate(RouteNames.SMJESTAJI)
    }

    function obradiSubmit(e){ // e je event
        e.preventDefault(); // nemoj odraditi zahtjev na server
        let podaci = new FormData(e.target)
        //console.log(podaci.get('naziv'))
        dodaj({
            naziv: podaci.get('naziv'),
            cijena: parseFloat(podaci.get('cijena')),
            datumOd: moment.utc(podaci.get('datumOd')),
            datumDo: moment.utc(podaci.get('datumDo')),
            aktivan: podaci.get('aktivan')=='on' ? true : false
        })
    }

    return(
        <>
        Dodavanje smjestaja
        <Form onSubmit={obradiSubmit}>

            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required />
            </Form.Group>

            <Form.Group controlId="cijena">
                <Form.Label>Cijena</Form.Label>
                <Form.Control type="number" step={0.01} name="cijena"  />
            </Form.Group>

            <Form.Group controlId="datumOd">
                <Form.Label>Datum Od</Form.Label>
                <Form.Control type="date" name="datumOd" />
            </Form.Group>
            <Form.Group controlId="datumDo">
                <Form.Label>Datum Do</Form.Label>
                <Form.Control type="date" name="datumDo" />
            </Form.Group>

            <Form.Group controlId="aktivan">
                <Form.Check label="Aktivan" name="aktivan" />
            </Form.Group>

        <Row className="akcije">
            <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
            <Link to={RouteNames.SMJESTAJI} 
            className="btn btn-danger siroko">Odustani</Link>
            </Col>
            <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
            <Button variant="success"
            type="submit"
            className="siroko">Dodaj smjestaj</Button>
            </Col>
        </Row>
        </Form>
        </>
    )
}