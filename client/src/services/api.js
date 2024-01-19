
export default class Api{
    static API_URL = 'http://localhost:3001/api';

    static handleError(error){
        console.error(`Error while communicating with API : ${error}`);
    }

    static commandAllo(idListe, idAllo){
        return fetch(Api.API_URL+'/command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idListe, idAllo})
        })
        .then(res => res.json())
        .catch(error => this.handleError(error))
    }

    static getListeAllos(idListe){
        return fetch(Api.API_URL+'/allos?liste='+idListe)
        .then(res => res.json())
        .catch(error => this.handleError(error))
    }

    static getAllos(){
        return fetch(Api.API_URL+'/allos')
        .then(res => res.json())
        .catch(error => this.handleError(error))
    }


}