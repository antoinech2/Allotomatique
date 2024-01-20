export async function processQueue(listes, db) {
    for (let listeId in listes) {
        let liste = listes[listeId];
        db.commande.findAll({limit : 1, where : {listeId : liste.id, status : "PENDING"}}).then(async (commandes) => {
            for (const commande of commandes) {
                const result = await liste.commandAllo(commande.alloId, commande.client, commande.adress, commande.phone, commande.infos);
                console.log(result)
                switch (result) {
                    case 'success':
                        console.log(`Commande ${commande.id} (${liste.name} ${commande.alloId}) commandée avec succès`)
                        commande.status = "WAITING";
                        await commande.save();
                        break;
                    case 'success_not_confirmed':
                        console.log(`Commande ${commande.id} (${liste.name} ${commande.alloId}) commandée sans confirmation`)
                        commande.status = "WAITING_NOT_CONFIRMED";
                        await commande.save();
                        break;              
                    case 'error':
                        console.log(`Erreur lors de la commande ${commande.id} (${liste.name} ${commande.alloId})`)
                        break;   
                    case 'not_available':
                        console.log(`Allo non disponible (allo ${commande.id} ${liste.name} ${commande.alloId})`)
                        break;   
                    case 'failed':
                        console.log(`Echec de la commande ${commande.id} (${liste.name} ${commande.alloId})`)
                        break;                         
                    default:
                        break;
                }
            }
        })
    }
}