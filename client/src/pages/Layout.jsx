import Header from "../components/Header"
import Stack from '@mui/material/Stack';
import CommandDetails from "../components/CommandDetails";

export default function Layout(){
    return(
        <div className="App">
      <Stack spacing={2}>
        <Header />
        <CommandDetails width={200} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}/> 
      </Stack>
    </div>
    )
}