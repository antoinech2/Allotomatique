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

    getAlloAvailability(id: number): AlloAvailability {
        return AlloAvailability.AVAILABLE;
    }

    getAllos(): any{}

    commandAllo(id : string) : AlloCommandResponse{
        return AlloCommandResponse.SUCCESS;
    }
}