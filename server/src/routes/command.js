import users from "./../../data/users.json" assert { type: "json" };

export default (app, db) => {
  app.post('/api/command', async (req, res) => {
    try {
      let names, adresses, phones
      if (req.body.name == ""){
        names = users.groups.convi.map(user => user.name);
      }
      else {
        names = req.body.name.split(",");
      }
      if (req.body.adress == ""){
        adresses = users.groups.convi.map(user => user.adress);
      }
      else {
        adresses = req.body.adress.split(",");
      }
      if (req.body.phone ==""){
        phones = users.groups.convi.map(user => user.phone);
      }
      else{
        phones = req.body.phone.split(",");
      }
      
      for(let i = 0; i < req.body.quantity; i++){
        const commande = db.commande.build({listeId : req.body.listeId, alloId : req.body.alloId, client : names[i % names.length], adress : adresses[i% adresses.length], infos : req.body.infos, phone : phones[i % phones.length], status : "PENDING" });
        await commande.save();
      }
      res.json({ result: "success" });
    } catch (error) {
      res.status(500).json({ result : "error", error : error.toString() });
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