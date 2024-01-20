import { BrowserRouter, Routes, Route } from "react-router-dom";
import Liste from './pages/Liste';
import Layout from './pages/Layout';
import AllAllo from './pages/AllAllo';

import listes from './../data/listes.json'

import { useState } from "react";

function App() {
  const [user, setUser] = useState({name : "Clément", adresse: "R432", phone : "", infos: ""});

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout defineUser={setUser} user={user}/>}>
          {listes.map((liste) => (<Route path={"liste"+liste.id} element={<Liste listeId={liste.id} user={user}/>} />))}
          <Route path={"/allAllo"} element={<AllAllo/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
