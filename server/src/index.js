import express from "express";
import cors from 'cors';
const app = express()
const port = process.env.PORT || 3001

import CommandAllo from "./routes/command.js"
import Artemis from "./bot/listes/artemis.ts";

app.use(express.json())
.use(cors())

app.get('/', (req, res) => {
    res.json("Ok")
})


app.use('/allos', express.static('./../client/build'))

CommandAllo(app)

const server = app.listen(port, async () => {
  console.log('Application démarrée')  
})

app.use(({res}) => {
  const message = 'Impossible de trouver la ressource demandée.'
    res.status(404).json({message});
});


let listes = {
  BDA1 : new Artemis(),
}

//export default listes;

export {listes}