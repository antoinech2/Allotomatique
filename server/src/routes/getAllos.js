import {listes} from '../index.js';

import { cache } from '../index.js';

export default (app) => {
  app.get('/api/allos', async (req, res) => {
    if (req.query.liste){
      if (listes[req.query.liste]) {
        res.json({ result: {[req.query.liste] : cache[req.query.liste]} });
      } else {
        res.status(404).json({ error: 'List not found' });
      }
    }
    else {
      let result = cache;
      res.json({ result: result });
    }
  });
}