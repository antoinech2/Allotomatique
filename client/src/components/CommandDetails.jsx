import { Card, CardHeader, CardContent, Stack, TextField } from '@mui/material/';

export default function CommandDetails({defineUser, user}){

    return (
    <Card variant="outlined">
        <CardHeader title="Informations de commande" />
        <CardContent>
            <Stack spacing={2}>
                <TextField label="Nom" variant="outlined" onChange={(e) => {defineUser({...user, name : e.target.value})}}/>
                <TextField label="Adresse de livraison" variant="outlined" onChange={(e) => {defineUser({...user, adresse : e.target.value})}}/>
                <TextField label="Téléphone" variant="outlined" onChange={(e) => {defineUser({...user, phone : e.target.value})}}/>
                <TextField label="Informations additionnelles" variant="outlined" onChange={(e) => {defineUser({...user, infos : e.target.value})}}/>
            </Stack>
        </CardContent>
    </Card>
    );
}