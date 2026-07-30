document.addEventListener('DOMContentLoaded', () => {
    const inviteForm = document.getElementById('inviteForm');
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    if (inviteForm) {
        inviteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Captura dos dados do formulário
            const tipoEvento = document.getElementById('tipoEvento').value;
            const nome = document.getElementById('nome').value;
            const data = document.getElementById('data').value;
            const horario = document.getElementById('horario').value;
            const localizacao = document.getElementById('localizacao').value;
            const corPrimaria = document.getElementById('corPrimaria').value;
            const musica = document.getElementById('musica').value || 'Não informada';
            const detalhes = document.getElementById('detalhes').value || 'Sem detalhes adicionais';

            // Formatação da data (de YYYY-MM-DD para DD/MM/YYYY)
            const [ano, mes, dia] = data.split('-');
            const dataFormatada = `${dia}/${mes}/${ano}`;

            // Número do WhatsApp da GP Tech Digital
            const numeroWhatsApp = '5519993405480';

            // Montagem da mensagem formatada
            const mensagem = `*Novo Pedido de Convite Digital - GP Tech Digital* 🚀\n\n` +
                             `*Tipo de Evento:* ${tipoEvento}\n` +
                             `*Nome(s):* ${nome}\n` +
                             `*Data:* ${dataFormatada}\n` +
                             `*Horário:* ${horario}\n` +
                             `*Localização:* ${localizacao}\n` +
                             `*Cor Principal:* ${corPrimaria}\n` +
                             `*Música:* ${musica}\n\n` +
                             `*Detalhes Adicionais:*\n${detalhes}\n\n` +
                             `Olá! Gostaria de um orçamento e prosseguir com a criação deste convite.`;

            // Codificação da mensagem para a URL
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

            // Redirecionamento para o WhatsApp em uma nova aba
            window.open(urlWhatsApp, '_blank');
        });
    }
});
