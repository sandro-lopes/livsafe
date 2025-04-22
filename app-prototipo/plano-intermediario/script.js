// Simulação de dados dos sensores
const sensors = {
    'smoke-sensor': {
        status: 'normal',
        value: 0,
        threshold: 200
    },
    'co-sensor': {
        status: 'normal',
        value: 0,
        threshold: 50
    },
    'gas-sensor': {
        status: 'normal',
        value: 0,
        threshold: 100
    },
    'motion-sensor': {
        status: 'normal',
        value: 0,
        threshold: 10
    }
};

// Estado da válvula de gás
let valveOpen = true;

// Função para alternar status dos sensores (apenas para demonstração)
function toggleSensorStatus(sensorId) {
    const sensor = document.getElementById(sensorId);
    const sensorIcon = sensor.querySelector('.sensor-icon');
    const sensorStatus = sensor.querySelector('.sensor-status');
    
    if (sensorIcon.classList.contains('normal')) {
        // Mudar para status de alerta
        sensorIcon.classList.remove('normal');
        sensorIcon.classList.add('warning');
        
        let alertMessage = '';
        let statusText = '';
        
        switch(sensorId) {
            case 'smoke-sensor':
                statusText = 'Fumaça detectada!';
                alertMessage = 'Fumaça detectada! Verifique o ambiente.';
                break;
            case 'co-sensor':
                statusText = 'Níveis perigosos!';
                alertMessage = 'Níveis perigosos de monóxido de carbono detectados!';
                break;
            case 'gas-sensor':
                statusText = 'Vazamento detectado!';
                alertMessage = 'Vazamento de gás detectado! Fechando válvula automaticamente.';
                // Fechar válvula automaticamente
                toggleValve(false);
                break;
            case 'motion-sensor':
                statusText = 'Movimento detectado';
                alertMessage = 'Movimento detectado na casa.';
                break;
        }
        
        sensorStatus.textContent = statusText;
        showAlert('Alerta', alertMessage, 'danger');
    } else {
        // Voltar para status normal
        sensorIcon.classList.remove('warning');
        sensorIcon.classList.add('normal');
        
        if (sensorId === 'motion-sensor') {
            sensorStatus.textContent = 'Sem movimento';
        } else {
            sensorStatus.textContent = 'Normal';
        }
        
        showAlert('Informação', 'Sensor voltou ao estado normal.', 'success');
    }
}

// Função para alternar a válvula de gás
function toggleValve(forceState = null) {
    // Se forceState for fornecido, usar esse valor, caso contrário, alternar
    valveOpen = forceState !== null ? forceState : !valveOpen;
    
    const valveToggle = document.getElementById('valve-toggle');
    const valveStatusText = document.getElementById('valve-status-text');
    
    // Atualizar checkbox
    valveToggle.checked = valveOpen;
    
    // Atualizar texto de status
    if (valveOpen) {
        valveStatusText.textContent = 'Aberta';
        valveStatusText.classList.remove('closed');
        showAlert('Informação', 'Válvula de gás aberta.', 'success');
    } else {
        valveStatusText.textContent = 'Fechada';
        valveStatusText.classList.add('closed');
        showAlert('Informação', 'Válvula de gás fechada.', 'warning');
    }
}

// Função para simular acionamento do botão de emergência
function triggerEmergency() {
    const confirmEmergency = confirm('Tem certeza que deseja acionar o alarme de emergência?');
    
    if (confirmEmergency) {
        // Adicionar classe de pulse para animar o botão
        const emergencyButton = document.querySelector('.emergency-button');
        emergencyButton.classList.add('pulse');
        
        // Mostrar alerta de emergência
        showAlert('EMERGÊNCIA', 'Alarme de emergência acionado! Contatos de emergência foram notificados.', 'danger');
        
        // Fechar válvula de gás
        toggleValve(false);
        
        // Simular envio de localização da pulseira
        setTimeout(() => {
            showAlert('Informação', 'Enviando localização da pulseira para contatos de emergência...', 'warning');
        }, 1000);
        
        // Simulação de envio de notificação aos contatos de emergência
        setTimeout(() => {
            showAlert('Informação', 'Contato de emergência João foi notificado.', 'warning');
        }, 2000);
        
        setTimeout(() => {
            showAlert('Informação', 'Contato de emergência Pedro foi notificado.', 'warning');
        }, 3000);
        
        // Simulação de resposta dos serviços de emergência
        setTimeout(() => {
            showAlert('Informação', 'Serviços de emergência foram acionados.', 'warning');
        }, 4000);
    }
}

// Função para exibir alertas na interface
function showAlert(title, message, type) {
    // Criar elemento de alerta
    const alertEl = document.createElement('div');
    alertEl.className = `alert alert-${type}`;
    alertEl.innerHTML = `
        <div class="alert-title">${title}</div>
        <div class="alert-message">${message}</div>
    `;
    
    // Adicionar no início do container
    const appContainer = document.querySelector('.app-container');
    appContainer.insertBefore(alertEl, appContainer.firstChild);
    
    // Remover depois de 5 segundos
    setTimeout(() => {
        alertEl.style.opacity = '0';
        setTimeout(() => {
            alertEl.remove();
        }, 300);
    }, 5000);
}

// Simulação de dados randômicos para os sensores (a cada 30 segundos)
function simulateSensorData() {
    // Probabilidade de 10% para acionamento de sensor
    if (Math.random() < 0.1) {
        // Escolher um sensor aleatório
        const sensorIds = Object.keys(sensors);
        const randomSensorId = sensorIds[Math.floor(Math.random() * sensorIds.length)];
        
        // Verificar se ele já não está em estado de alerta
        const sensorEl = document.getElementById(randomSensorId);
        const sensorIcon = sensorEl.querySelector('.sensor-icon');
        
        if (sensorIcon.classList.contains('normal')) {
            toggleSensorStatus(randomSensorId);
            
            // Simular normalização após 10 segundos
            setTimeout(() => {
                if (sensorEl.querySelector('.sensor-icon').classList.contains('warning')) {
                    toggleSensorStatus(randomSensorId);
                }
            }, 10000);
        }
    }
    
    // Simular bateria da pulseira
    const braceletBattery = document.getElementById('bracelet-battery');
    if (braceletBattery) {
        // Reduzir 1% a cada verificação
        let currentBattery = parseInt(braceletBattery.textContent);
        currentBattery = Math.max(0, currentBattery - 1);
        braceletBattery.textContent = `${currentBattery}%`;
        
        // Alerta de bateria baixa
        if (currentBattery === 20) {
            showAlert('Aviso', 'Bateria da pulseira está em 20%. Recomendamos recarregar.', 'warning');
        }
    }
}

// Iniciar simulação ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // Simular dados a cada 30 segundos
    setInterval(simulateSensorData, 30000);
    
    // Mostrar mensagem de boas-vindas
    setTimeout(() => {
        showAlert('Bem-vindo', 'Bem-vindo ao LivSafe Plano Intermediário. Todos os sensores estão funcionando normalmente.', 'success');
    }, 1000);
}); 