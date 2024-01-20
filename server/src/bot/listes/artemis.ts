import { Liste } from "../liste.ts";
import { AlloAvailability, AlloCommandResponse } from "./../constants.ts";

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
        return this.getAllos().then((res) => {return res.filter((allo : any) => allo.id === id)[0].available;})
    }

    getAllos(): any{
        return []
    }

    commandAllo(id : string) : Promise<AlloCommandResponse>{
        return new Promise((resolve, rej) => {resolve(AlloCommandResponse.UNKNOWN)});
    }
}