import { Sequelize } from "sequelize";

export async function refreshCache(listes, db){
    console.log("Refreshing cache...")
    let result = {}
    for (let listeId in listes) {
        let liste = listes[listeId];
        console.log(`Liste ${liste.name}...`)
        result[listeId] = await liste.getAllos();
        for (let allo of result[listeId]){
            await db.commande.count({where : {listeId : liste.id, alloId : allo.id,status : "PENDING"}}).then((count) => {result[listeId].find(curallo => curallo.id == allo.id).pending = count});
        }
    }
    return result;
}


export async function processQueue(listes, db, cache) {
    for (let listeId in listes) {
        let liste = listes[listeId];
        db.commande.findAll({where : {listeId : liste.id, status : "PENDING"}}).then(async (commandes) => {//order: Sequelize.literal('random()') //attributes : [[Sequelize.fn('DISTINCT', Sequelize.col('alloId')) ,'alloId']],
            console.log(`Tentative de ${commandes.length} commandes pour la liste ${liste.name}...`)
            Loopcommandes:
            for (const commande of commandes) {
                if (cache[listeId].find(allo => allo.id == commande.alloId)?.available == "available"){
                    console.log(`Commande ${commande.id} (${liste.name} ${commande.alloId}) en cours... Allo disponible`)
                const result = await liste.commandAllo(commande.alloId, commande.client, commande.adress, commande.phone, commande.infos);
                console.log(result)
                switch (result) {
                    case 'success':
                        console.log(`Commande ${commande.id} (${liste.name} ${commande.alloId}) commandée avec succès`)
                        commande.status = "WAITING";
                        await commande.save();
                        break Loopcommandes;
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
                }}
            }
        })
    }
    console.log("Fin...")
}