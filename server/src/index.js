import express from "express";
import cors from 'cors';
const app = express()
const port = process.env.PORT || 3001

import CommandAllo from "./routes/command.js"
import GetAllo from "./routes/getAllos.js"

import CloseServer from "./routes/close.js"
import Artemis from "./bot/listes/artemis.ts";
import { scrapForm } from "./scrapper/formRetriever.js";
import DataBase from "./database/init.js";
import Atlas from "./bot/listes/atlas.ts";

import  { processQueue, refreshCache } from "./bot/main.js";
import Imtpulsion from "./bot/listes/imtpulsion.ts";
import Imtsomnia from "./bot/listes/imtsomnia.ts";

const database = await DataBase();

export var cache = {}

app.use(express.json())
.use(cors())

app.get('/', async (req, res) => {
  let form = await scrapForm('http://spatulas.chastellux.net/');
  console.log(form);
  res.json({ "form": form });
})


app.use('/allos', express.static('./../client/build'))

CommandAllo(app, database)
GetAllo(app)

const server = app.listen(port, async () => {
  console.log('Application démarrée')  
})

CloseServer(app, database, server)

app.use(({res}) => {
  const message = 'Impossible de trouver la ressource demandée.'
    res.status(404).json({message});
});


let listes = {
  BDA1 : new Artemis(),
  BDS1 : new Atlas(),
  BDE1 : new Imtsomnia(),
  BDE2 : new Imtpulsion()
}
cache = await refreshCache(listes, database)
processQueue(listes, database, cache)
setInterval(async () => {
  console.log(new Date(Date.now()).toLocaleString())
  cache = await refreshCache(listes, database)
  processQueue(listes, database, cache)
},10000)

//export default listes;

export {listes}