import { Liste } from "../liste.ts";
import { AlloAvailability, AlloCommandResponse } from "../constants.ts";

import DataImtsomnia from './imtsomnia.json' assert { type: "json" };

import xpath from "xpath-html";

export default class Imtsomnia implements Liste{
    id: string;
    name: string;
    type: string;

    constructor(){
        this.id = "BDE1";
        this.name = "Imt'somnia";
        this.type = "BDE";
    }


    getAllos(): any{
        try {
            return fetch("https://imtsomnia.com/index.php/allo/")
            .then(response => response.text()) 
            .catch(err => {console.error(err); return [];})
            .then((html : any) => {
                let result = []
                let products = xpath.fromPageSource(html).findElements("//section[contains(@id, 'allo')]")
                //products.concat(xpath.fromPageSource(html).findElements("//div[contains(@class, 'commande')]"))
                products.forEach((product : any, index : number) => {
                    let id = product.getAttribute("id").split("-")[1]
                    let name = xpath.fromNode(product).findElement("//summary[contains(@role, 'button')]").getText().trim()
                    let status = xpath.fromNode(product).findElement("//div[contains(@class, 'status')]").getAttribute("class").split(" ")[1]
                    let available = AlloAvailability.UNKNOWN;
                    if (status === "available") {available = AlloAvailability.AVAILABLE}
                    else if (status === "unavailable") {available = AlloAvailability.UNAVAILABLE};
                    result.push({id, name : id, available, description : ""})
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
                const alloData = DataImtsomnia.filter((allo : any) => allo.id === id)[0]
                if (alloData.webhook === "") return AlloCommandResponse.FAILED;
                const randomchoice = Math.floor(Math.random() * alloData.details.length)
                const message = {
                    title: "Nouvelle commande 🔔",
                    description: `**Nom:** ${name}\n**Téléphone:** ${phone}\n**Chambre:** ${adress}\n\n${alloData.details[randomchoice]}`,
                    color: alloData.color[randomchoice]
                  }
                return fetch(alloData.webhook, {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'}, 
                        body: JSON.stringify({embeds: [message]})
                    }).then(res => {
                        console.log("Request complete! response:", res);
                        return AlloCommandResponse.SUCCESS;
                    })
                    .catch((error) => {console.error(error); return AlloCommandResponse.FAILED;});
        }
    }