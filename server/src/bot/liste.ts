import { AlloAvailability, AlloCommandResponse } from "./constants";

export interface Liste {
    id: string;
    name: string;
    type: string;
    
    getAlloAvailability(id : number) : AlloAvailability;
    commandAllo(id : number) : AlloCommandResponse;
    }