import { AlloAvailability, AlloCommandResponse } from "./constants";

export interface Liste {
    id: string;
    name: string;
    type: string;
    
    getAllos(): any;
    //getAlloAvailability(id : string) : AlloAvailability;
    commandAllo(id : string) : AlloCommandResponse;
    }