document.addEventListener("DOMContentLoaded", () => {
    
    const form = document.getElementById("inviteForm");
    const valorInput = document.getElementById("valorPagamento");
    const modal = document.getElementById("customModal");
    const closeModalBtn = document.getElementById("closeModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalMessage = document.getElementById("modalMessage");
    const modalIcon = document.querySelector(".modal-icon i");
    const modalBox = document.querySelector(".modal-box");

    // Formatação automática do campo de valor para Moeda (R$)
    valorInput.addEventListener("input", function(e) {
        let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
        if (value === "") {
            e.target.value = "";
            return;
        }
        
        value = (parseInt(value) / 100).toFixed(2) + ""; // Divide por 100 e fixa 2 casas
        value = value.replace(".", ",");
        value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // Coloca pontos nos milhares
        
        e.target.value = "R$ " + value;
    });

    // Função para abrir o modal de aviso profissional
    function showModal(title, message, isError = true) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        
        if(isError) {
            modalIcon.className = "fas fa-exclamation-circle";
            modalIcon.style.color = "#e74c3c"; // Vermelho
            modalBox.style.borderTop = "6px solid #e74c3c";
        } else {
            modalIcon.className = "fas fa-check-circle";
            modalIcon.style.color = "#1DB954"; // Verde
            modalBox.style.borderTop = "6px solid #1DB954";
        }

        modal.classList.remove("hidden");
    }

    // Fechar Modal
    closeModalBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    // Fechar clicando fora da caixa
    modal.addEventListener("click", (e) => {
        if(e.target === modal) modal.classList.add("hidden");
    });

    // Envio do Formulário
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const valorDigitado = valorInput.value;
        const valorNumerico = parseFloat(valorDigitado.replace(/\D/g, "")) / 100;

        // Validação Mínima de 40 reais
        if (isNaN(valorNumerico) || valorNumerico < 40) {
            showModal(
                "Valor Abaixo do Mínimo", 
                "O valor mínimo para garantirmos a personalização exclusiva e a qualidade do convite digital é de R$ 40,00. Por favor, ajuste o valor para continuarmos.",
                true
            );
            return; // Interrompe o envio
        }

        const tipoEvento = document.getElementById("tipoEvento").value;
        const nome = document.getElementById("nome").value;
        const data = document.getElementById("data").value;
        const horario = document.getElementById("horario").value;
        const localizacao = document.getElementById("localizacao").value;
        const detalhes = document.getElementById("detalhes").value;

        // Monta a mensagem para o WhatsApp
        const telefone = "5519993405480"; // O número que estava no seu rodapé
        const mensagem = `Olá, GP Tech Digital! Gostaria de fazer o pedido de um convite digital personalizado.%0A%0A` +
            `*Valor da Oferta:* ${valorDigitado}%0A` +
            `*Evento:* ${tipoEvento}%0A` +
            `*Anfitriões:* ${nome}%0A` +
            `*Data/Hora:* ${data.split('-').reverse().join('/')} às ${horario}%0A` +
            `*Local:* ${localizacao}%0A` +
            `*Detalhes:* ${detalhes}%0A%0A` +
            `Aguardo o link para pagamento via InfinitePay ou Pix e os próximos passos. Obrigado!`;

        const url = `https://wa.me/${telefone}?text=${mensagem}`;
        
        window.open(url, "_blank");
    });

});
