import Header from "../components/Header"
import Stack from '@mui/material/Stack';

export default function Layout(){
    return(
        <div className="App">
      <Stack spacing={2}>
        <Header />
      </Stack>
    </div>
    )
}