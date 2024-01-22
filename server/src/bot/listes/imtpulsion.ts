import { Liste } from "../liste.ts";
import { AlloAvailability, AlloCommandResponse } from "../constants.ts";

import DataImtpulsion from './imtpulsion.json' assert { type: "json" };

import xpath from "xpath-html";

export default class Imtpulsion implements Liste{
    id: string;
    name: string;
    type: string;

    constructor(){
        this.id = "BDE2";
        this.name = "Imt'pulsion";
        this.type = "BDE";
    }


    getAllos(): any{
        try {
            return fetch("https://dashing-shortbread-d9cbec.netlify.app/")
            .then(response => response.text()) 
            .catch(err => {console.error(err); return [];})
            .then((html : any) => {
                let result = []
                let products = xpath.fromPageSource(html).findElements("//div[contains(@class, 'product')]")
                //products.concat(xpath.fromPageSource(html).findElements("//div[contains(@class, 'commande')]"))
                products.forEach((product : any, index : number) => {
                    let status = xpath.fromNode(product).findElement("//div[contains(@id, 'continue-button')]")
                    let available = AlloAvailability.UNKNOWN;
                    if (status.getText() === "Commander !") {available = AlloAvailability.AVAILABLE}
                    else if (status.getText() === "Indisponible") {available = AlloAvailability.UNAVAILABLE};
                    result.push({id : DataImtpulsion[index].id, name : DataImtpulsion[index].name, available, description : ""})
                })
                return result;
            })
            } catch (error) {
            console.error("Erreur lors de la récupération des allos" + this.name + " : " + error)
            return []
        }
    }

    getAlloAvailability(id: string): AlloAvailability {
        try {
            return this.getAllos().then((res) => {return res.filter((allo : any) => allo.id === id)[0].available;})
        } catch (error) {
            return AlloAvailability.UNKNOWN;
        }
    }

    async commandAllo(id : string, name : string, adress : string, phone : string, infos : string) : Promise<AlloCommandResponse>{
                const message = `${adress}\n ${name}\n ${id}\n ---------------------------------------`;
                return fetch(DataImtpulsion.filter((allo : any) => allo.id === id)[0].webhook, {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'}, 
                        body: JSON.stringify({content: message})
                    }).then(res => {
                        console.log("Request complete! response:", res);
                        return AlloCommandResponse.SUCCESS; // Add return statement here
                    })
                    .catch((error) => {console.error(error); return AlloCommandResponse.FAILED;});
        }

}