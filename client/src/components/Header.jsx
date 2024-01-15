import {Paper, Button} from '@mui/material/';

import listes from '../data/listes.json'

export default function Header() {
    return (
        <Paper elevation={10}> 
            {listes.map((liste) => (<Button color="success">{liste.name}</Button>))}
        </Paper>
    )
}

