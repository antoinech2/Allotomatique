import { Card, CardHeader, CardContent, Stack, TextField } from '@mui/material/';

export default function CommandDetails(){

    return (
    <Card variant="outlined">
        <CardHeader title="Informations de commande" />
        <CardContent>
            <Stack spacing={2}>
                <TextField label="Nom" variant="outlined" />
                <TextField label="Adresse de livraison" variant="outlined" />
                <TextField label="Informations additionnelles" variant="outlined" />
            </Stack>
        </CardContent>
    </Card>
    );
}