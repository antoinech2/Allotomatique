import { Liste } from "../liste.ts";
import { AlloAvailability, AlloCommandResponse } from "./../constants.ts";

import xpath from "xpath-html";
import DataArtemis from './artemis.json' assert { type: "json" };


export default class Artemis implements Liste{
    id: string;
    name: string;
    type: string;

    constructor(){
        this.id = "BDA1";
        this.name = "Art'émis";
        this.type = "BDA";
    }

    getAlloAvailability(id: string): AlloAvailability {
        //return AlloAvailability.AVAILABLE;
        try {
            return this.getAllos().then((res) => {return res.filter((allo : any) => allo.id === id)[0].available;})
        } catch (error) {
            return AlloAvailability.UNKNOWN;
        }    }

    getAllos(): any{
        try {
            return fetch("https://form.everestwebdeals.co/?form=94abba5b2cc05b1c1a9711854d16b716")
            .then(response => response.text()) 
            .catch(err => {console.error(err); return [];})
            .then((html : any) => {
                let result = []
                let script = xpath.fromPageSource(html).findElements("//script")
                try {
                    const rawdata = script[0].getText().split(" = ")[1]
                    let data = JSON.parse(rawdata.substr(0, rawdata.length - 1))
                    let limit = data.limit["322877549"]
                    let commandCount = data.response["322877549"]
                    //console.log(commandCount, limit)

                    for (const allo of Object.keys(limit)){
                        let available = AlloAvailability.UNKNOWN;
                        if (commandCount[allo] < limit[allo]) {available = AlloAvailability.AVAILABLE}
                        else if (commandCount[allo] >= limit[allo]) {available = AlloAvailability.UNAVAILABLE};
                        result.push({
                            id: allo,
                            name: allo,
                            available,
                            description : ""
                        })
                    }
                }
                catch (error) {
                    console.error("Erreur lors de la récupération des allos" + this.name + " : " + error)
                    return []
                }
                //products.concat(xpath.fromPageSource(html).findElements("//div[contains(@class, 'commande')]"))
                //products.forEach((product : any, index : number) => {
                    //let status = xpath.fromNode(product).findElement("//span[contains(@dir, 'auto')]")
                    //console.log(status.getText())
                    //let available = AlloAvailability.UNKNOWN;
                    //if (status.getText() === "Commander !") {available = AlloAvailability.AVAILABLE}
                    //else if (status.getText() === "Indisponible") {available = AlloAvailability.UNAVAILABLE};
                    //result.push({id : DataImtpulsion[index].id, name : DataImtpulsion[index].name, available, description : ""})
                //})
                return result;
            })
    
        } catch (error) {
            console.error("Erreur lors de la récupération des allos" + this.name + " : " + error)
            return []
        }
    }

    async commandAllo(id : string, name : string, adress : string, phone : string, infos : string) : Promise<AlloCommandResponse>{
                const alloData = DataArtemis.filter((allo : any) => allo.id === id)[0]
                if (alloData.page === "") return AlloCommandResponse.FAILED;
                let response : any = [[[null,1788862188,[name],0],[null,1234006518,[phone],0],[null,488687469,[adress],0],[null,322877549,[id],0]]]
                if (alloData.fields){
                    response[0].concat(alloData.fields)
                }
                response.push(null,"-3612625138335224801")
                const pageHistory = `0,${alloData.page},18`
                const requestData = {partialResponse : response, pageHistory}

                var formBody :any = [];
                for (var property in requestData) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(requestData[property]);
                formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");

                return fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLSfhZ8nQ4dsnryAAyBziqC-Lpv55smQem19m6pv0lukrkXASrg/formResponse", {
                        method: "POST",
                        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}, 
                        body: formBody
                    }).then(res => res.statusText).then(res => {
                        console.log("Request complete! response:", res);
                        return AlloCommandResponse.SUCCESS;
                    })
                    .catch((error) => {console.error(error); return AlloCommandResponse.FAILED;});
        }

}