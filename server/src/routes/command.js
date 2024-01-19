import {listes} from './../index.js';

export default (app, db) => {
  app.post('/api/command', async (req, res) => {
    const commande = db.commande.build({ alloId : req.body.alloId, client : req.body.name, adress : req.body.adress, infos : req.body.infos, status : "PENDING" });
    await commande.save();

    // var listeId = req.body.idListe;
    // var alloId = req.body.idAllo;
    // if (listes[listeId]) {
    //   res.json({ result: listes[listeId].commandAllo(alloId) });
    // } else {
    //   res.status(404).json({ error: 'List not found' });
    // }
  });
}