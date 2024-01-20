import { Card, CardHeader, CardContent, Stack, Chip, Box, TextField, CardActions, Button, Dialog as MuiDialog } from '@mui/material/';
import Divider from '@mui/material-next/Divider';
import {Check as CheckIcon, Close as CloseIcon, QuestionMark as QuestionMarkIcon} from '@mui/icons-material/';
import ApiService from '../services/api';
import {DialogTitle as MuiDialogTitle, DialogContent as MuiDialogContent } from '@mui/material/';
import { useState } from 'react';


export default function Allo({ id, value, listeId, listeName, user, showListeName = false}) {
    const [state, setState] = useState(initialState);

    function initialState() {
        return {
            message: '',
        };
    }

    async function handleSubmit(e) {
        e.preventDefault();
        var res = await ApiService.commandAllo(listeId, id, user.name, user.adresse, user.phone, user.infos, e.target.command_count.value);
        if (res.result === 'success') {
            // Afficher le popup
            setMessage('Succès ! Commandes mises en file d\'attente');
        } else {
            // Afficher une erreur
            setMessage('La requête a échoué ! Détails : ' + res.error);
        }
    }

    const setMessage = (newMessage) => {
        // Met à jour la valeur de l'état `message`
        setState({
          message: newMessage,
        });
      };

    return (
        <form onSubmit={handleSubmit}>
        <Card variant="outlined">
            <CardHeader title={value.name + (showListeName ?" - " + listeName : "")}>
            </CardHeader>
            <CardContent>
                <Stack direction="row" spacing={5} mb={2} display="flex" sx={{ maxWidth: '75%'}} divider={<Divider orientation="vertical" flexItem />}>
                    <Stack spacing={1.5}>
                        <Box>{value.description}</Box>
                        {value?.command?.waiting > 1 ? <Box>{value?.command?.waiting} commandes en attente...</Box> : null}
                        {value?.command?.count > 1 ? <Box>{value?.command?.count} commandes en livraion...</Box> : null}
                        <Box>{value.available === "available" ? <Chip icon={<CheckIcon />} label="Disponible" color="success"/> : null}
                        {value.available === "unavailable" ? <Chip icon={<CloseIcon />} label="Non disponible" color="error"/> : null}
                        {(value.available !== "available" && value.available !== "unavailable") ? <Chip icon={<QuestionMarkIcon />} label="Disponiblité inconnue"/> : null}
                        </Box>
                    </Stack>
                    <Stack spacing={1}>
                        <Box>{value?.stats?.command_count} commandes au total, dont {value?.stats?.recieved_command_count} reçues</Box>
                        <Box>Délai de livraison moyen : {value?.stats?.delivery_time}</Box>
                    </Stack>
                </Stack>
            </CardContent>
            <CardActions>
                <TextField
                    required
                    name='command_count'
                    variant="outlined"
                    type="number"
                    label="Nombre d'articles à commander"
                    defaultValue={0}
                    sx={{m: 1, width: '25ch'}}
                    //onChange={(e) => {handleInputChange(e)}}
                    //fullWidth={true}
                    
                    inputProps={{
                        type : "number",
                        min : 0,
                        max : 20
                    }}
                    />
                    <Button variant="contained" type="submit" endIcon={<CheckIcon />}>
                    Commander
                    </Button>
                    <MuiDialog open={state.message.length > 0} onClose={() => setMessage('')}>
                        <MuiDialogTitle>Résultat de la requête</MuiDialogTitle>
                        <MuiDialogContent>
                            <p>{state.message}</p>
                        </MuiDialogContent>
                    </MuiDialog>
            </CardActions>
        </Card>
        </form>
    );
}