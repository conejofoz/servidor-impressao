/**
 * Servidor de impressão node
 * Author: Silvio Coelho
 */
const express = require('express');
const pdfPrinter = require('pdf-to-printer');
const app = express();

app.get('/', (req, res) => {
  res.send('servidor de impressão')
})

app.get('/imprimir-pdf', (req, res) => {
  const caminhoDoArquivo = req.query.caminhoDoArquivo;
  const nomeDaImpressora = req.query.nomeDaImpressora;

  pdfPrinter
    .print(caminhoDoArquivo, nomeDaImpressora)
    .then(() => {
      console.log('pdf enviado para a impressora: ' + nomeDaImpressora + ' ' + caminhoDoArquivo)
      res.send('PDF enviado para impressão');
    })
    .catch((error) => {
      console.log('erro')
      res.status(500).send(error.message);
    });
});



app.listen(4000, () => {
  console.log(`
  Servidor rodando na porta 4000
  Desenvolvido por Silvio Coelho
  `);
});


