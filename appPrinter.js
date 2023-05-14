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
        res.status(200).json({ message: 'PDF enviado para impressão' });
      })
      .catch((error) => {
        console.log('erro', error);
        //res.status(500).send(error);
        //return res.status(500).json({message: 'Houve um erro no servidor'});
        return res.status(500).json({ message: error });
      });

  }, 1000)


});


app.get('/imprimir-venda', async (req, res) => {
  try {
    const arquivo = req.query.arquivo
    const usuario = process.env.USERNAME || 'geral'
    const filePath = `C:\\Users\\${usuario}\\Downloads\\${arquivo}`

    console.log(filePath)
    console.log(arquivo)

    const printerVenda = 'EPSONAC38EF (L3150 Series)';
    const printerPacote = 'EPSON TM-T20 ReceiptE4';

    const optionsVenda = {
      printer: printerVenda,
      copies: 1
    }

    const optionsPacote = {
      printer: printerPacote,
      copies: 2
    }



    await imprimirVenda(filePath, optionsPacote)
    await imprimirVenda(filePath, optionsVenda)

    return res.status(200).json({
      error: false,
      message: 'Impressão OK!',
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: 'Impressão Falhou! ' + error.message
    })

  }
})




function imprimirVenda(filePath, options) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {

      for (let i = 0; i < options.copies; i++) {
        pdfPrinter.print(filePath, options)
          .then(() => {
            console.log('Impressão OK!')
            return resolve()
          })
          .catch(err => {
            console.clear()
            console.error('Aconteceu um erro: ', err.message)
            return reject(err)
          });
      }
    })

  }, 1000)
}




app.listen(4000, () => {
  console.log(`
  Servidor rodando na porta 4000
  Desenvolvido por Silvio Coelho
  `);
});


