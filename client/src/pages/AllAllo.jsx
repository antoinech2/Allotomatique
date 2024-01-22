
import { Stack, useMediaQuery } from '@mui/material';
import Allo from '../components/Allo.jsx';
import listes from './../../data/listes.json'
import { useState, useEffect } from 'react';
import ApiService from '../services/api.js'

export default function AllAllo() {
    const [allos, setAllos] = useState([]);

    useEffect(() => {
        ApiService.getAllos().then((result) => {
            console.log(result)
            if (result.result){
                setAllos(result.result)
            }
            else{
                setAllos([])
            }
            });
    }, []);

    return (
        <>
        <h1>Allos disponibles</h1>
        <Stack spacing={2} sx={{ maxWidth: '75%'}}>
            {listes.map((liste) => (
                allos[liste.id]?.filter((allo) => allo.available === "available").map((allo) => (
                    <Allo
                        id={allo.id}
                        value={allo}
                        listeName={liste.name}
                        showListeName={true}
                        listeId={liste.id}
                    />
                ))
            ))}
        </Stack>
        <h2>Tous les allos</h2>
        <Stack spacing={2} sx={{ maxWidth: '75%'}}>
            {listes.map((liste) => (
                allos[liste.id]?.map((allo) => (
                    <Allo
                        id={allo.id}
                        value={allo}
                        listeName={liste.name}
                        showListeName={true}
                        listeId={liste.id}
                    />
                ))
            ))}
        </Stack>
        </>
    );
}