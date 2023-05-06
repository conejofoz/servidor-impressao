/**
 * Servidor de impressão node
 * Author: Silvio Coelho
 */
const express = require('express');
const pdfPrinter = require('pdf-to-printer');
const app = express();
const cors = require('cors');

app.use(cors())

app.get('/', (req, res) => {
  res.send('servidor de impressão')
})

app.get('/imprimir-pdf', (req, res) => {
  const arquivo = req.query.caminhoDoArquivo;
  const usuario = process.env.USERNAME || 'geral'
  const caminhoDoArquivo = `C:\\Users\\${usuario}\\Downloads\\${arquivo}`
  const nomeDaImpressora = req.query.nomeDaImpressora;

  console.log(caminhoDoArquivo)

  setTimeout(() => {

    pdfPrinter
      .print(caminhoDoArquivo, nomeDaImpressora)
      .then(() => {
        console.log('pdf enviado para a impressora: ' + nomeDaImpressora + ' ' + caminhoDoArquivo)
        //res.send('PDF enviado para impressão');
        res.status(200).json({message: 'PDF enviado para impressão'});
      })
      .catch((error) => {
        console.log('erro', error);
        //res.status(500).send(error);
        //return res.status(500).json({message: 'Houve um erro no servidor'});
        return res.status(500).json({message: error});
      });
      
  },1000)


});



app.listen(4000, () => {
  console.log(`
  Servidor rodando na porta 4000
  Desenvolvido por Silvio Coelho
  `);
});


