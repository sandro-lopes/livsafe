// Simulação de dados do sensor
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
    }
};

// Função para alternar status dos sensores (apenas para demonstração)
function toggleSensorStatus(sensorId) {
    const sensor = document.getElementById(sensorId);
    const sensorIcon = sensor.querySelector('.sensor-icon');
    const sensorStatus = sensor.querySelector('.sensor-status');
    
    if (sensorIcon.classList.contains('normal')) {
        // Mudar para status de alerta
        sensorIcon.classList.remove('normal');
        sensorIcon.classList.add('warning');
        
        if (sensorId === 'smoke-sensor') {
            sensorStatus.textContent = 'Fumaça detectada!';
            showAlert('Alerta', 'Fumaça detectada! Verifique o ambiente.', 'danger');
        } else if (sensorId === 'co-sensor') {
            sensorStatus.textContent = 'Níveis perigosos!';
            showAlert('Alerta', 'Níveis perigosos de monóxido de carbono detectados!', 'danger');
        }
    } else {
        // Voltar para status normal
        sensorIcon.classList.remove('warning');
        sensorIcon.classList.add('normal');
        sensorStatus.textContent = 'Normal';
        
        showAlert('Informação', 'Sensor voltou ao estado normal.', 'success');
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
        
        // Simulação de envio de notificação aos contatos de emergência
        setTimeout(() => {
            showAlert('Informação', 'Contato de emergência João foi notificado.', 'warning');
        }, 2000);
        
        setTimeout(() => {
            showAlert('Informação', 'Contato de emergência Maria foi notificado.', 'warning');
        }, 3000);
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

// Simulação de dados randômicos para os sensores (a cada 10 segundos)
function simulateSensorData() {
    // Gerar valores aleatórios para os sensores
    sensors['smoke-sensor'].value = Math.floor(Math.random() * 300);
    sensors['co-sensor'].value = Math.floor(Math.random() * 80);
    
    // Verificar se algum sensor ultrapassou o limite
    for (const sensorId in sensors) {
        const sensor = sensors[sensorId];
        const sensorEl = document.getElementById(sensorId);
        
        if (sensorEl) {
            const sensorIcon = sensorEl.querySelector('.sensor-icon');
            const sensorStatus = sensorEl.querySelector('.sensor-status');
            
            // Se o valor ultrapassar o limite e o status for normal, acionar alerta
            if (sensor.value > sensor.threshold && sensor.status === 'normal') {
                sensor.status = 'warning';
                sensorIcon.classList.remove('normal');
                sensorIcon.classList.add('warning');
                
                if (sensorId === 'smoke-sensor') {
                    sensorStatus.textContent = 'Fumaça detectada!';
                    showAlert('Alerta', 'Fumaça detectada! Verifique o ambiente.', 'danger');
                } else if (sensorId === 'co-sensor') {
                    sensorStatus.textContent = 'Níveis perigosos!';
                    showAlert('Alerta', 'Níveis perigosos de monóxido de carbono detectados!', 'danger');
                }
            }
            // Se o valor estiver abaixo do limite e o status for warning, voltar ao normal
            else if (sensor.value < sensor.threshold && sensor.status === 'warning') {
                sensor.status = 'normal';
                sensorIcon.classList.remove('warning');
                sensorIcon.classList.add('normal');
                sensorStatus.textContent = 'Normal';
                
                showAlert('Informação', `Sensor de ${sensorId === 'smoke-sensor' ? 'fumaça' : 'monóxido de carbono'} voltou ao estado normal.`, 'success');
            }
        }
    }
}

// Iniciar simulação ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // Simular dados a cada 30 segundos
    setInterval(simulateSensorData, 30000);
    
    // Simulação inicial após 5 segundos
    setTimeout(simulateSensorData, 5000);
    
    // Mostrar mensagem de boas-vindas
    setTimeout(() => {
        showAlert('Bem-vindo', 'Bem-vindo ao LivSafe Plano Básico. Todos os sensores estão funcionando normalmente.', 'success');
    }, 1000);
}); 