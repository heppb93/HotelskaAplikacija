import { useEffect, useState } from "react"
import { Table, Button } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";
//import useLoading from "../../hooks/useLoading";
//import useError from '../../hooks/useError';
import { Link, useNavigate } from "react-router-dom";


import moment from "moment";

import SmjestajService from "../../services/SmjestajService";
import { RouteNames } from "../../constants";

export default function Smjestaji(){
    const navigate = useNavigate()
//    const { showLoading, hideLoading } = useLoading();
  //  const { prikaziError } = useError();
    const[smjestaji, setSmjestaji] = useState()

    async function dohvatiSmjestaje() {
        const odgovor = await SmjestajService.get();
        setSmjestaji(odgovor);
        console.log(odgovor,"gledam kaj je tu");
    }

    useEffect(()=>{
        dohvatiSmjestaje();
    },[])

        function formatirajDatum(datum){
            if(datum==null){
                return 'Nije definirano';
            }
            return moment.utc(datum).format('DD. MM. YYYY.')
        }
    
        function vaucer(v){
            if(v==null) return 'gray'
            if(v) return 'green'
            return 'red'
        }
        function obrisi(sifra){
            if(!confirm('Sigurno obrisati')){
                    return;
           }
           brisanjeSmjera(sifra);
        }
        
        async function brisanjeSmjera(sifra) {
           // showLoading();
            const odgovor = await SmjestajService.brisanje(sifra);
          //  hideLoading();
           if(odgovor.greska){
            console.log("error");
               return
               }
            dohvatiSmjestaje();
            }
        
    return(
        <>
        <Link to={RouteNames.SMJESTAJ_NOVI}
        className="btn btn-success siroko">Dodaj novi smještaj</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Cijena</th>
                    <th>Datum Od</th>
                    <th>Datum Do</th>
                    <th>Aktivan</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
              {smjestaji && smjestaji.map((smjestaj, index)=>(
                <tr key={index}>
                    <td>{smjestaj.naziv}</td>
                    <td>{smjestaj.cijena}€</td>
                    <td>{formatirajDatum(smjestaj.datumOd)}</td>
                    <td>{formatirajDatum(smjestaj.datumDo)}</td>
                    <td><GrValidate 
                        size={30}
                        color={vaucer(smjestaj.aktivan)}
                        /></td>
                    <td>                            
                        <Button
                            variant="danger"
                            onClick={()=>obrisi(smjestaj.sifra)}
                        >
                        Obriši
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button
                       onClick={()=>navigate(`/Smjestaji/${smjestaj.sifra}`)}
                        >
                        Promjena
                        </Button></td>                
                </tr>
               ))}
            </tbody>
        </Table>
        </>
    )
}