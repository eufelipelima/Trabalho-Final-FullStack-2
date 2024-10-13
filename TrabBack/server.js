const dotenv = require('dotenv');
const express = require('express')
const cors = require('cors')

/** ROTAS **/ 
const candidatoRoutes = require('./routes/CandidatoRoutes.js');
const vagaRoutes = require('./routes/VagaRoutes.js');
const inscricaoRoutes = require('./routes/InscricaoRoute.js');


const app =express();
const port =4000;

dotenv.config();

app.use(cors({
    credentials: true, //middleware para passar “Access-Control-Allow-Credentials” no cabeçalho das requisições.
    origin: ["http://localhost:3000","http://192.168.5.17:3000"],
}));

app.use(express.json())

app.use(candidatoRoutes);
app.use(vagaRoutes);
app.use(inscricaoRoutes);



app.listen(port, () => {
    console.log(`Executando na porta ${port}!`);
  });
