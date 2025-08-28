import SmjestajService from "../../services/SmjestajService"
import { Button, Row, Col, Form } from "react-bootstrap";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { useEffect, useState } from "react";
//import useLoading from "../../hooks/useLoading";
//import useError from '../../hooks/useError';


export default function SmjestajiPromjena(){

    const [smjestaj,setSmjestaj] = useState({})
    const [aktivan,setAktivan] = useState(false)
    const navigate = useNavigate()
//    const { showLoading, hideLoading } = useLoading();
    const routeParams = useParams()
   // const { prikaziError } = useError();

    async function dohvatiSmjestaj(){
      //  showLoading();
        const odgovor = await SmjestajService.getBySifra(routeParams.sifra);
      //  hideLoading();
        if(odgovor.greska){
            console.log(odgovor.poruka);
            return
        }
        //debugger; // ovo radi u Chrome inspect (ali i ostali preglednici)
        let s = odgovor.poruka
        s.datumOd = moment.utc(s.datumOd).format('yyyy-MM-DD')
        s.datumDo = moment.utc(s.datumDo).format('yyyy-MM-DD')

        setSmjestaj(s)
        setAktivan(s.aktivan)
    } 

    useEffect(()=>{
        dohvatiSmjestaj();
     },[])

     async function promjena(smjestaj) {
      //  showLoading();
        const odgovor = await SmjestajService.promjena(routeParams.sifra,smjestaj)
      //  hideLoading();
        if(odgovor.greska){
            console.log(odgovor.poruka)
            return;
        }
        navigate(RouteNames.SMJESTAJI)
    }

    function obradiSubmit(e){ // e je event
        e.preventDefault(); // nemoj odraditi zahtjev na server
        let podaci = new FormData(e.target)
        //console.log(podaci.get('naziv'))
        promjena({
            naziv: podaci.get('naziv'),
            cijena: parseFloat(podaci.get('cijena')),
            datumOd: moment.utc(podaci.get('datumOd')),
            datumDo: moment.utc(podaci.get('datumDo')),
            aktivan: podaci.get('aktivan')=='on' ? true : false
        })
    }

    return(
        <>
        Promjena smještaja
        <Form onSubmit={obradiSubmit}>

            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required
                defaultValue={smjestaj.naziv} />
            </Form.Group>


            <Form.Group controlId="cijena">
                <Form.Label>Cijena</Form.Label>
                <Form.Control type="number" step={0.01} name="cijena" defaultValue={smjestaj.cijena}/>
            </Form.Group>

            <Form.Group controlId="datumOd">
                <Form.Label>Datum Od</Form.Label>
                <Form.Control type="date" step={0.01} name="datumOd" defaultValue={smjestaj.datumOd}/>
            </Form.Group>
            <Form.Group controlId="datumDo">
                <Form.Label>Datum Do</Form.Label>
                <Form.Control type="date" step={0.01} name="datumDo" defaultValue={smjestaj.datumDo}/>
            </Form.Group>

            <Form.Group controlId="aktivan">
            <Form.Check label="Aktivan" name="aktivan" 
                onChange={(e)=>setAktivan(e.target.checked)}
                checked={aktivan}  />
            </Form.Group>

        <Row className="akcije">
            <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
            <Link to={RouteNames.SMJESTAJI} 
            className="btn btn-danger siroko">Odustani</Link>
            </Col>
            <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
            <Button variant="success"
            type="submit"
            className="siroko">Promjeni Smjestaj</Button>
            </Col>
        </Row>
        </Form>
        </>
    )
}