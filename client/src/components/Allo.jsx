import { Card, CardHeader, CardContent, Stack, Chip, Box, TextField, CardActions, Button } from '@mui/material/';
import Divider from '@mui/material-next/Divider';
import {Check as CheckIcon, Close as CloseIcon, QuestionMark as QuestionMarkIcon} from '@mui/icons-material/';

export default function Allo({ id, value, listeName, showListeName = false}) {

    function handleSubmit(e){
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit}>
        <Card variant="outlined">
            <CardHeader title={value.name + (showListeName ?" - " + listeName : "")}>
            </CardHeader>
            <CardContent>
                <Stack direction="row" spacing={5} mb={2} display="flex" divider={<Divider orientation="vertical" flexItem />}>
                    <Stack spacing={1.5}>
                        <Box>{value.description}</Box>
                        {value?.command?.waiting > 1 ? <Box>{value?.command?.waiting} commandes en attente...</Box> : null}
                        {value?.command?.count > 1 ? <Box>{value?.command?.count} commandes en livraion...</Box> : null}
                        <Box>{value.available === "true" ? <Chip icon={<CheckIcon />} label="Disponible" color="success"/> : null}
                        {value.available === "false" ? <Chip icon={<CloseIcon />} label="Non disponible" color="error"/> : null}
                        {(value.available !== "true" && value.available !== "false") ? <Chip icon={<QuestionMarkIcon />} label="Disponiblité inconnue"/> : null}
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
            </CardActions>
        </Card>
        </form>
    );
}