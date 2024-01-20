export default (app, db) => {
  app.post('/api/command', async (req, res) => {
    try {
      const names = req.body.name.split(",");
      for(let i = 0; i < req.body.quantity; i++){
        const commande = db.commande.build({listeId : req.body.listeId, alloId : req.body.alloId, client : names[i % names.length], adress : req.body.adress, infos : req.body.infos, phone : req.body.phone, status : "PENDING" });
        await commande.save();
      }
      res.json({ result: "success" });
    } catch (error) {
      res.status(500).json({ result : "error", error });
    }


    // var listeId = req.body.idListe;
    // var alloId = req.body.idAllo;
    // if (listes[listeId]) {
    //   res.json({ result: listes[listeId].commandAllo(alloId) });
    // } else {
    //   res.status(404).json({ error: 'List not found' });
    // }
  });
}