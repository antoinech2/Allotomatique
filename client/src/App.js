import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Stack, Button } from "@mui/material";
import Liste from './pages/Liste';
import Layout from './pages/Layout';
import AllAllo from './pages/AllAllo';

import listes from './../data/listes.json'

function App() {

    const [visible, setVisible] = useState(true);
    const [imageElement, setImageElement] = useState(null);
    const [showPage, setShowPage] = useState(false);

    const handleClick = () => {
        setVisible(false);
        setShowPage(true);

        if (imageElement) {
            imageElement.parentElement.removeChild(imageElement);
        }
    };


  return (
        <Stack>
          <Button
              onClick={() => { handleClick(); }}
              color="primary"
              size="large"
              style={{ visibility: visible ? 'visible' : 'hidden' }}
            >
              Accedez au site
            </Button>

          {visible && (
            <img src="assets/images/loadingScreen.png" alt="Image" style={{ visibility: visible ? 'visible' : 'hidden' }} />
          )}

          {showPage && <Page />}
        </Stack>
    );
}

const Page = () => {

    const [user, setUser] = useState({name : "", adresse: "", phone : "", infos: ""});

    return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout defineUser={setUser} user={user}/>}>
          {listes.map((liste) => (<Route path={"liste"+liste.id} element={<Liste listeId={liste.id} user={user}/>} />))}
          <Route path={"/allAllo"} element={<AllAllo user={user}/>}/>
      </Route>
    </Routes>
    </BrowserRouter>)
};

export default App;
