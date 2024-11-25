// Importa o módulo 'http' usando sintaxe moderna
import { createServer } from 'http';

// Cria o servidor e define a resposta para qualquer requisição
const servidor = createServer((req, res) => {
	// Define o cabeçalho da resposta
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	// Envia a resposta ao cliente
	res.end('Olá, Marcy! Este é o seu primeiro servidor Node.js!\n');
});

// Define a porta onde o servidor vai escutar
const porta = 3000;

// Faz o servidor "escutar" na porta definida
servidor.listen(porta, () => {
	console.log(`Servidor está rodando em http://localhost:${porta}`);
});
