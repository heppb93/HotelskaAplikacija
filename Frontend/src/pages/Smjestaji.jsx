import { useEffect, useState } from "react"
import { Table } from "react-bootstrap";
import SmjestajService from "../services/SmjestajService"

export default function Smjestaji(){

    const[smjestaji, setSmjestaji] = useState()

    async function dohvatiSmjestaje() {
        const odgovor = await SmjestajService.get();
        setSmjestaji(odgovor);
        console.log(odgovor,"gledam kaj je tu");
    }

    useEffect(()=>{
        dohvatiSmjestaje();
    },[])

    return(
        <>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Cijena</th>
                    <th>Izvodi se od</th>
                    <th>Izvodi se do</th>
                    <th>Aktivan</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
              {smjestaji && smjestaji.map((smjestaj, index)=>(
                <tr key={index}>
                    <td>{smjestaj.naziv}</td>
                    <td>{smjestaj.cijena}</td>
                    <td>{smjestaj.datumOd}</td>
                    <td>{smjestaj.datumDo}</td>
                    <td>{smjestaj.aktivan}</td>
                    <td>akcije</td>                
                </tr>
               ))}
            </tbody>
        </Table>
        </>
    )
}