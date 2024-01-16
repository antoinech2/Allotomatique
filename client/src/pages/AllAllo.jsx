import { Stack } from '@mui/material';
import Allo from '../components/Allo.jsx';
import listes from './../../data/listes.json'

import allos from './../../data/allotest.json'


export default function AllAllo() {
    return (
        <Stack spacing={2}>
            {listes.map((liste) => (allos[liste.id].map((allo) => (<Allo id={allo.id} value={allo} listeName={liste.name} showListeName={true}/>))))}
        </Stack>)
}