import { Liste } from "../liste.ts";
import { AlloAvailability, AlloCommandResponse } from "../constants.ts";

import DataAtlas from './atlas.json' assert { type: "json" };


export default class Atlas implements Liste{
    id: string;
    name: string;
    type: string;

    constructor(){
        this.id = "BDS1";
        this.name = "Atl'as";
        this.type = "BDS";
    }

    getAlloAvailability(id: string): AlloAvailability {
        try {
            return this.getAllos().then((res) => {return res.filter((allo : any) => allo.id === id)[0].available;})
        } catch (error) {
            return AlloAvailability.UNKNOWN;
    }
}

    getAllos(): any{
        try {
            return fetch("https://atlapi.atl-as.fr/rooter.php/state/list")
            .then(response => response.json())
            .catch(err => {console.error(err); return []})
            .then((allos : Array<any>) => {
                const result = []
                for(const allo of allos){
                    for(const data of DataAtlas){
                        if(data.formType.split("-")[0] === allo.alloName){
                            let available = AlloAvailability.UNKNOWN;
                            if (allo.state === 1) {available = AlloAvailability.AVAILABLE}
                            else if (allo.state === 0) {available = AlloAvailability.UNAVAILABLE};
                            result.push({
                                id: allo.alloName,
                                name: data.alloTitle,
                                available,
                                description : data.alloDesc + data.alergensText
                            })
                        }
                    }
    
                }
                return result;
            })
            } catch (error) {
            console.error("Erreur lors de la récupération des allos" + this.name + " : " + error)
            return []
        }
    }

    async commandAllo(id : string, name : string, adress : string, phone : string, infos : string) : Promise<AlloCommandResponse>{
            let diet;
            switch (id) {
                case "cafe":
                    diet = "sugar"
                    break;
                case "carbo":
                    diet = "meat"
                    break;      
                case "crepe":
                    let choices = ["confiture", "sucre", "nutella"]
                    diet = choices[Math.floor(Math.random() * choices.length)]
                    break;          
                case "dodo":
                    diet = ""
                    break;  
                case "lasagne":
                    diet = "meat"
                    break; 
                case "lasagne":
                    diet = 1
                    break; 
                case "mousse":
                    diet = ""
                    break; 
                case "opera":
                    diet = "karaoke"
                    break; 
                case "plateau":
                    diet = ""
                    break; 
                case "porte":
                    diet = ""
                    break; 
                case "sieste":
                    diet = ""
                    break; 
                case "tiramisu":
                    diet = ""
                    break; 
                case "wrap":
                    diet = "meat"
                    break; 
                default:
                    break;
            }
                let form = new FormData();
                form.set("phoneNumber", phone)
                form.set("nomprenom", name)
                form.set("quantity", "1")
                form.set("appart", adress)
                form.set("dietType", diet)
                form.set("comment", infos)

                // const body = JSON.stringify({
                //     phoneNumber : phone,
                //     nomprenom : name,
                //     quantity : 1,
                //     appart : adress,
                //     comment : infos,
                //     dietType : diet
                // })
                console.log("Sending body : " + form.toString())
                return fetch(`https://atlapi.atl-as.fr/rooter.php/${id}/list`, {
                        method: "POST",
                        //headers: {'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryeMdu91NNwRR5CGd5'}, 
                        body : form
                    }).then(async res => {
                        console.log("Request complete! response:", res);
                        if (res.status === 200 || res.status === 204){
                            return AlloCommandResponse.SUCCESS;
                        }
                        else{
                            console.log(await res.json())
                            return AlloCommandResponse.FAILED;
                        }
                    })
                    .catch((error) => {console.error(error); return AlloCommandResponse.FAILED;});
        }
}