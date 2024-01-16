import {listes} from './../index.js';

export default (app) => {
  app.post('/api/command', (req, res) => {
    var listeId = req.body.idListe;
    var alloId = req.body.idAllo;
    if (listes[listeId]) {
      res.json({ result: listes[listeId].commandAllo(alloId) });
    } else {
      res.status(404).json({ error: 'List not found' });
    }
  });
}