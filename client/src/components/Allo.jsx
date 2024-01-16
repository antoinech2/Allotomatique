import { Card, CardHeader, CardContent, Stack, Chip, Box } from '@mui/material/';
import Divider from '@mui/material-next/Divider';
import {Check as CheckIcon, Close as CloseIcon, QuestionMark as QuestionMarkIcon} from '@mui/icons-material/';

export default function Allo({ id, value }) {
    return (
        <Card variant="outlined">
            <CardHeader title={value.name}>
            </CardHeader>
            <CardContent>
                <Stack direction="row" spacing={5} mb={2} display="flex" divider={<Divider orientation="vertical" flexItem />}>
                    <Stack spacing={3}>
                        <Box>{value.description}</Box>
                        {value?.command?.count > 1 ? <Box>{value?.command?.count} commandes en cours...</Box> : null}
                        <Box>{value.available === "true" ? <Chip icon={<CheckIcon />} label="Disponible" color="success"/> : null}
                        {value.available === "false" ? <Chip icon={<CloseIcon />} label="Non disponible" color="error"/> : null}
                        {(value.available !== "true" && value.available !== "false") ? <Chip icon={<QuestionMarkIcon />} label="Disponiblité inconnue"/> : null}
                        </Box>
                    </Stack>
                    <Stack spacing={1}>
                        <Box>{value?.stats?.command_count} commandes au total</Box>
                        <Box>Délai de livraison moyen : {value?.stats?.delivery_time}</Box>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}