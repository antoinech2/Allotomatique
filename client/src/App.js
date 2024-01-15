import { BrowserRouter, Routes, Route } from "react-router-dom";
import Liste from './pages/Liste';
import Layout from './pages/Layout';

import listes from './../data/listes.json'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
          {listes.map((liste) => (<Route path={"liste"+liste.id} element={<Liste listeId={liste.id} />} />))}
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
