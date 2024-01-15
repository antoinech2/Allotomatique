import { Card, CardHeader, CardContent, Stack } from '@mui/material/';
import Divider from '@mui/material-next/Divider';

export default function Allo({ id, value }) {
    return (
        <Card variant="outlined">
            <CardHeader title={value.name}>
            </CardHeader>
            <CardContent>
                <Stack direction="row" spacing={5} mb={2} display="flex" divider={<Divider orientation="vertical" flexItem />}>
                    {value.description}
                    {value.description}
                </Stack>
            </CardContent>
        </Card>
    );
}