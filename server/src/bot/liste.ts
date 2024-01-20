import { AlloAvailability, AlloCommandResponse } from "./constants";

export interface Liste {
    id: string;
    name: string;
    type: string;
    
    getAllos(): any;
    getAlloAvailability(id : string) : AlloAvailability;
    commandAllo(id : string, name : string, adress : string, phone : string, infos : string) : Promise<AlloCommandResponse>;
    }