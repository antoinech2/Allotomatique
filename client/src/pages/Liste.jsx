import { Stack } from '@mui/material';
import Allo from '../components/Allo.jsx';

import allos from './../../data/allotest.json'

export default function Liste({listeId}){
    return(
    <Stack spacing={2}>
        {allos[listeId].map((allo) => (<Allo id={allo.id} value={allo} listeId={listeId}/>))}
    </Stack>)
}