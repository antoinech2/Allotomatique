import { Stack } from '@mui/material';
import Allo from '../components/Allo.jsx';
import { useState, useEffect } from 'react';

//import allos from './../../data/allotest.json'
import ApiService from '../services/api.js'

export default function Liste({listeId, user}){
    const [allos, setAllos] = useState([]);

    function refreshAllos(){
        ApiService.getListeAllos(listeId).then((result) => {
            if (result.result){
                setAllos(result.result[listeId])
            }
            else{
                setAllos([])
            }
            });
    }

    useEffect(() => {
        refreshAllos()
        const interval = setInterval(() => {
            refreshAllos()
          }, 10000);
        return () => clearInterval(interval);
        
    }, [listeId]);

    return(
    <Stack spacing={2}>
        {allos.map((allo, index) => (<Allo key={index} id={allo.id} value={allo} listeId={listeId} user={user}/>))}
    </Stack>)
}