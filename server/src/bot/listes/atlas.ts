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
        return this.getAllos().then((res) => {return res.filter((allo : any) => allo.id === id)[0].available;})
    }

    getAllos(): any{
        return fetch("https://atlapi.atl-as.fr/rooter.php/state/list")
        .then(response => response.json())
	    .catch(err => console.error(err))
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
    }

    commandAllo(id : string, name : string, adress : string, phone : string, infos : string) : Promise<AlloCommandResponse>{
        return new Promise((resolve, rej) => {resolve(AlloCommandResponse.UNKNOWN)});
    }
}