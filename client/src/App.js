import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Stack, Button } from "@mui/material";
import Liste from './pages/Liste';
import Layout from './pages/Layout';
import AllAllo from './pages/AllAllo';

import listes from './../data/listes.json'

import { useState } from "react";

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

    const [user, setUser] = useState({name : "Clément", adresse: "R432", phone : "", infos: ""});

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

const Page = () => (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
          {listes.map((liste) => (<Route path={"liste"+liste.id} element={<Liste listeId={liste.id} />} />))}
          <Route path={"/allAllo"} element={<AllAllo/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
);

export default App;
