import { Card, CardHeader, CardContent, Stack, Chip } from '@mui/material/';
import Divider from '@mui/material-next/Divider';
import {Check as CheckIcon, Close as CloseIcon, QuestionMark as QuestionMarkIcon} from '@mui/icons-material/';

export default function Allo({ id, value }) {
    return (
        <Card variant="outlined">
            <CardHeader title={value.name}>
            </CardHeader>
            <CardContent>
                <Stack direction="row" spacing={5} mb={2} display="flex" divider={<Divider orientation="vertical" flexItem />}>
                    <Stack spacing={5}>
                        {value.description}
                        {value.available === "true" ? <Chip icon={<CheckIcon />} label="Disponible" color="success"/> : null}
                        {value.available === "false" ? <Chip icon={<CloseIcon />} label="Non disponible" color="error"/> : null}
                        {value.available === "unknowned" ? <Chip icon={<QuestionMarkIcon />} label="Disponiblité inconnue"/> : null}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}