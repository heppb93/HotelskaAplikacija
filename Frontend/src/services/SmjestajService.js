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


async function brisanje(sifra){
    console.log("gledam jesam tu");
    return await HttpService.delete('/Smjestaj/' + sifra)
    .then(()=>{
        console.log("obrisano");
        return {greska: false, poruka: 'Obrisano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod brisanja smjera'}   
    })
}

async function dodaj(smjestaj){
    return await HttpService.post('/Smjestaj',smjestaj)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + ', ';
                }
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Smjestaj se ne može dodati!'}
        }
    })
}

async function promjena(sifra,smjestaj){
    return await HttpService.put('/Smjestaj/' + sifra, smjestaj)
    .then((odgovor)=>{
        console.log("odgovor data", odgovor.data);
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + ', ';
                }
                console.log(poruke)
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Smjestaj se ne može promjeniti!'}
        }
    })
}

async function getBySifra(sifra){
    return await HttpService.get('/Smjestaj/'+sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja smjera s šifrom '+sifra}   
    })
}




export default{
    get,
    brisanje,
    dodaj,
    getBySifra,
    promjena,
}