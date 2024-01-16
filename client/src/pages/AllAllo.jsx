import { Stack } from '@mui/material';
import Allo from '../components/Allo.jsx';

import allos from './../../data/allotest.json'


export default function AllAllo() {
    return (
        <Stack spacing={2}>
        {allos["BDE1"].map((allo) => (<Allo id={allo.id} value={allo}/>))}
        {allos["BDE2"].map((allo) => (<Allo id={allo.id} value={allo}/>))}
        {allos["BDA1"].map((allo) => (<Allo id={allo.id} value={allo}/>))}
        {allos["BDA2"].map((allo) => (<Allo id={allo.id} value={allo}/>))}
        {allos["BDS1"].map((allo) => (<Allo id={allo.id} value={allo}/>))}
        {allos["BDS2"].map((allo) => (<Allo id={allo.id} value={allo}/>))}
        </Stack>)
}