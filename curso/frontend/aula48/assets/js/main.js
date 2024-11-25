const h1 = document.querySelector('.container h1');

// Função para configurar uma data opcionalmente e sempre mostrar a data formatada
function configurarEFormatarData(acao = '', valor = '') {
	// Cria uma data inicial com o momento atual
	const data = new Date();

	// Usa o switch para decidir o que ajustar, se uma 'ação' for fornecida
	if (acao && valor !== '') {
		switch (acao) {
			case 'ano':
				data.setFullYear(valor);
				break;
			case 'mes':
				// O mês no JavaScript começa do 0 (Janeiro é 0, Dezembro é 11)
				data.setMonth(valor - 1);
				break;
			case 'dia':
				data.setDate(valor);
				break;
			case 'hora':
				data.setHours(valor);
				break;
			case 'minuto':
				data.setMinutes(valor);
				break;
			default:
				console.log('Ação inválida. Use: ano, mes, dia, hora, minuto.');
				return; // Sai da função se a ação for inválida
		}
	}

	// Formatação da data para o estilo pt-BR desejado
	const formatadorData = new Intl.DateTimeFormat('pt-BR', {
		weekday: 'long', // Dia da semana completo
		day: '2-digit', // Dia com dois dígitos
		month: 'long', // Nome completo do mês
		year: 'numeric', // Ano completo
	});

	const formatadorHora = new Intl.DateTimeFormat('pt-BR', {
		hour: '2-digit', // Hora com dois dígitos
		minute: '2-digit', // Minuto com dois dígitos
		hour12: false, // Formato 24 horas
	});

	// Formata a data e hora
	const dataFormatada = formatadorData.format(data);
	const horaFormatada = formatadorHora.format(data);

	// Retorna a data formatada no estilo desejado
	return `${dataFormatada} às ${horaFormatada}`;
}

h1.innerText = configurarEFormatarData();
