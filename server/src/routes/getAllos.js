import {listes} from '../index.js';

export default (app) => {
  app.get('/api/allos', async (req, res) => {
    if (req.query.liste){
      if (listes[req.query.liste]) {
        res.json({ result: {[req.query.liste] : await listes[req.query.liste].getAllos()} });
      } else {
        res.status(404).json({ error: 'List not found' });
      }
    }
    else {
      result = {}
      for (let liste in listes){
        result[liste] = await listes[liste].getAllos()
      }
      res.json({ result: result });
    }
  });
}