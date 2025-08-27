import { HttpService } from "./HttpService"


async function get(){
    return await HttpService.get('/Smjestaj')
    .then((odgovor)=>{
        console.log(odgovor.data)
        //console.table(odgovor.data)
        return odgovor.data
    })
    .catch((e)=>{
        //console.log(e)
        return {greska: true, poruka: 'Problem kod dohvaćanja smjestaja'}   
    })
}

export default{
    get,
}