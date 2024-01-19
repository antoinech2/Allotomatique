import { Liste } from "../liste.ts";
import { AlloAvailability, AlloCommandResponse } from "../constants.ts";

export default class Atlas implements Liste{
    id: string;
    name: string;
    type: string;

    constructor(){
        this.id = "BDS1";
        this.name = "Atl'as";
        this.type = "BDS";
    }

    getAlloAvailability(id: number): AlloAvailability {
        return AlloAvailability.AVAILABLE;
    }

    getAllos(): any{
        
    }

    commandAllo(id : number) : AlloCommandResponse{
        return AlloCommandResponse.SUCCESS;
    }
}