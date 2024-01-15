import {Paper, Button} from '@mui/material/';

import listes from './../../data/listes.json'


export default function Header() {

    return (
        <Paper elevation={10}> 
            {listes.map((liste) => (<Button color="success"><img src={liste.icon} alt = "Logo de la liste" width="40" height="40" style={{margin: 5}}/>{liste.name}</Button>))}
        </Paper>
    )
}

