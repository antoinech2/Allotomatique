import {Paper, Button, Stack} from '@mui/material/';

import listes from './../../data/listes.json'
import { Outlet, Link } from "react-router-dom";


export default function Header() {

    return (
        <>
        <Paper elevation={10}> 
            <Stack direction = "row">
                <img src={"assets/images/Logo allotomatique.png"} alt = "Logo allotomatique" width="80" height="80" style={{margin: 5}}/>
            {listes.map((liste) => (<Link to={"/liste"+liste.id}><Button color="success"><img src={liste.icon} alt = "Logo de la liste" width="40" height="40" style={{margin: 5}}/>{liste.name}</Button></Link>))}
            </Stack>
        </Paper>
        <Outlet />
        </>
    )
}

