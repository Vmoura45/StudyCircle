require('dotenv').config(); // Carrega as variáveis de ambiente
const { testConnection } = require('./dbClient');

testConnection().then((success) => {
  if (success) {
    console.log('Teste concluído com sucesso!');
  } else {
    console.log('Teste falhou.');
  }
});
