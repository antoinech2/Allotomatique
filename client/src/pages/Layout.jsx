import Header from "../components/Header"
import {Stack, Box} from '@mui/material/';
import CommandDetails from "../components/CommandDetails";

export default function Layout(){
    return(
        <div className="App">
      <Stack spacing={2}>
        <Header />
        <Box style={{
        height: 100,
        width: '20%',
        right : "5px",
        top : "20%",
        position: 'fixed',
      }}><CommandDetails/> </Box>
      </Stack>
      
      
    </div>
    )
}