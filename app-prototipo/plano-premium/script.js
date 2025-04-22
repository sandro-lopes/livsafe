document.addEventListener('DOMContentLoaded', function() {
    // Inicializar o modo de segurança padrão
    setActiveMode('normal');

    // Adicionar listeners para os modos de segurança
    document.querySelectorAll('.mode-option').forEach(option => {
        option.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            setActiveMode(mode);
        });
    });

    // Inicializar o estado das válvulas
    const gasValveToggle = document.getElementById('gas-valve-toggle');
    const waterValveToggle = document.getElementById('water-valve-toggle');
    const radarToggle = document.getElementById('radar-toggle');

    if (gasValveToggle) {
        gasValveToggle.addEventListener('change', function() {
            toggleValve('gas', this.checked);
        });
    }

    if (waterValveToggle) {
        waterValveToggle.addEventListener('change', function() {
            toggleValve('water', this.checked);
        });
    }

    if (radarToggle) {
        radarToggle.addEventListener('change', function() {
            toggleRadar(this.checked);
        });
    }

    // Inicializar o radar
    initializeRadar();

    // Adicionar listener para o botão de emergência
    const emergencyButton = document.querySelector('.emergency-button');
    if (emergencyButton) {
        emergencyButton.addEventListener('click', triggerEmergency);
    }

    // Inicializar a navegação
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                showNotification('Esta funcionalidade estará disponível em breve.', 'warning');
            }
        });
    });

    // Simular dados dos sensores
    simulateSensorData();
});

/**
 * Define o modo de segurança ativo
 * @param {string} mode - O modo a ser ativado (normal, away, night, emergency)
 */
function setActiveMode(mode) {
    // Remover a classe 'active' de todas as opções
    document.querySelectorAll('.mode-option').forEach(option => {
        option.classList.remove('active');
    });

    // Adicionar a classe 'active' à opção selecionada
    const selectedOption = document.querySelector(`.mode-option[data-mode="${mode}"]`);
    if (selectedOption) {
        selectedOption.classList.add('active');
    }

    // Atualizar mensagem de status
    let statusMessage = '';
    switch(mode) {
        case 'normal':
            statusMessage = 'Modo Normal ativado. Monitoramento padrão em funcionamento.';
            break;
        case 'away':
            statusMessage = 'Modo Ausente ativado. Sensores de movimento e portas em alerta máximo.';
            break;
        case 'night':
            statusMessage = 'Modo Noturno ativado. Monitoramento com sensibilidade aumentada.';
            break;
        case 'emergency':
            statusMessage = 'ALERTA DE EMERGÊNCIA ATIVADO! Contato imediato com autoridades.';
            triggerEmergency(true);
            break;
    }

    showNotification(statusMessage, mode === 'emergency' ? 'danger' : 'success');

    // Se o modo for emergência, simular detecção no radar
    if (mode === 'emergency') {
        simulateRadarDetection(true);
    }
}

/**
 * Controla o estado das válvulas (gás/água)
 * @param {string} type - Tipo de válvula ('gas' ou 'water')
 * @param {boolean} isOpen - Estado da válvula (true para aberta, false para fechada)
 */
function toggleValve(type, isOpen) {
    const valveStatus = document.querySelector(`.valve-content[data-valve="${type}"] p`);
    if (valveStatus) {
        valveStatus.textContent = isOpen ? 'Aberta' : 'Fechada';
        valveStatus.className = isOpen ? '' : 'closed';
        
        showNotification(
            `Válvula de ${type === 'gas' ? 'gás' : 'água'} ${isOpen ? 'aberta' : 'fechada'}.`,
            isOpen ? 'success' : 'warning'
        );
    }
}

/**
 * Inicializa a animação do radar
 */
function initializeRadar() {
    const radarDisplay = document.querySelector('.radar-display');
    if (!radarDisplay) return;

    // Criar componentes do radar
    const radarCircles = document.createElement('div');
    radarCircles.className = 'radar-circles';
    
    for (let i = 0; i < 3; i++) {
        const circle = document.createElement('div');
        circle.className = 'radar-circle';
        radarCircles.appendChild(circle);
    }
    
    const radarSweep = document.createElement('div');
    radarSweep.className = 'radar-sweep';
    
    radarDisplay.appendChild(radarCircles);
    radarDisplay.appendChild(radarSweep);

    // Adicionar alguns pontos para simulação
    simulateRadarDetection(false);
}

/**
 * Simula detecção no radar
 * @param {boolean} emergency - Se é uma situação de emergência
 */
function simulateRadarDetection(emergency = false) {
    const radarDisplay = document.querySelector('.radar-display');
    if (!radarDisplay) return;

    // Limpar pontos existentes
    document.querySelectorAll('.radar-dot').forEach(dot => dot.remove());

    // Número de pontos baseado na emergência
    const numDots = emergency ? 5 : Math.floor(Math.random() * 3);
    
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'radar-dot';
        
        // Posicionar aleatoriamente
        const x = 20 + Math.random() * 60; // 20-80% da largura
        const y = 20 + Math.random() * 60; // 20-80% da altura
        
        dot.style.left = `${x}%`;
        dot.style.top = `${y}%`;
        
        radarDisplay.appendChild(dot);
    }

    // Atualizar texto de status
    const statusText = document.getElementById('radar-status-text');
    if (statusText) {
        if (emergency) {
            statusText.textContent = 'MOVIMENTO DETECTADO!';
            statusText.style.color = 'var(--danger-color)';
        } else if (numDots > 0) {
            statusText.textContent = 'Movimento detectado';
            statusText.style.color = 'var(--warning-color)';
        } else {
            statusText.textContent = 'Nenhum movimento';
            statusText.style.color = 'var(--success-color)';
        }
    }
}

/**
 * Controla o estado do radar
 * @param {boolean} enabled - Se o radar está ativado
 */
function toggleRadar(enabled) {
    const radarDisplay = document.querySelector('.radar-display');
    const statusText = document.getElementById('radar-status-text');
    
    if (radarDisplay && statusText) {
        radarDisplay.style.opacity = enabled ? '1' : '0.3';
        
        if (enabled) {
            statusText.textContent = 'Nenhum movimento';
            statusText.style.color = 'var(--success-color)';
            // Reiniciar simulação
            setTimeout(() => simulateRadarDetection(false), 2000);
        } else {
            statusText.textContent = 'Desativado';
            statusText.style.color = 'var(--text-secondary)';
        }
        
        showNotification(
            `Radar de alta precisão ${enabled ? 'ativado' : 'desativado'}.`,
            'info'
        );
    }
}

/**
 * Dispara o protocolo de emergência
 * @param {boolean} isSilent - Se deve mostrar notificação
 */
function triggerEmergency(isSilent = false) {
    // Ativar pulsação no botão de emergência
    const emergencyButton = document.querySelector('.emergency-button');
    if (emergencyButton) {
        emergencyButton.classList.add('pulse');
        
        // Remover após 10 segundos
        setTimeout(() => {
            emergencyButton.classList.remove('pulse');
        }, 10000);
    }
    
    // Mudar para o modo de emergência se não for silencioso
    if (!isSilent) {
        setActiveMode('emergency');
        return; // Evitar loop infinito
    }
    
    // Mostrar alerta de emergência
    const alertHTML = `
        <div class="alert alert-danger">
            <div class="alert-title">EMERGÊNCIA ATIVADA</div>
            <p>Autoridades e contatos de emergência foram notificados. Permanecendo em modo de alerta máximo.</p>
        </div>
    `;
    
    // Inserir no topo da página
    const container = document.querySelector('.app-container');
    if (container) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = alertHTML;
        container.insertBefore(tempDiv.firstElementChild, container.firstChild);
        
        // Simular detecção no radar
        simulateRadarDetection(true);
    }
}

/**
 * Mostra uma notificação temporária
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo de notificação (success, warning, danger, info)
 */
function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.innerHTML = `<p>${message}</p>`;
    
    // Inserir no DOM
    const container = document.querySelector('.app-container');
    if (container) {
        container.insertBefore(notification, container.firstChild);
        
        // Remover após 5 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            notification.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 5000);
    }
}

/**
 * Simula dados aleatórios dos sensores
 */
function simulateSensorData() {
    // Dados dos sensores
    const sensorData = {
        sensors: {
            online: Math.floor(Math.random() * 3) + 6, // 6-8 sensores online
            total: 8
        },
        cameras: {
            online: Math.floor(Math.random() * 2) + 7, // 7-8 câmeras online
            total: 8
        },
        backup: {
            status: Math.random() > 0.9 ? 'Sincronizando...' : 'Atualizado'
        },
        bracelets: {
            online: Math.floor(Math.random() * 2) + 1, // 1-2 pulseiras online
            total: 2
        }
    };
    
    // Atualizar informações exibidas
    const sensorsInfo = document.querySelector('.grid-item.sensors .grid-content p');
    const camerasInfo = document.querySelector('.grid-item.cameras .grid-content p');
    const backupInfo = document.querySelector('.grid-item.backup .grid-content p');
    const braceletsInfo = document.querySelector('.grid-item.bracelets .grid-content p');
    
    if (sensorsInfo) {
        sensorsInfo.textContent = `${sensorData.sensors.online}/${sensorData.sensors.total} online`;
    }
    
    if (camerasInfo) {
        camerasInfo.textContent = `${sensorData.cameras.online}/${sensorData.cameras.total} online`;
    }
    
    if (backupInfo) {
        backupInfo.textContent = sensorData.backup.status;
    }
    
    if (braceletsInfo) {
        braceletsInfo.textContent = `${sensorData.bracelets.online}/${sensorData.bracelets.total} ativas`;
    }
    
    // Simular radar ocasionalmente
    if (Math.random() > 0.7) {
        simulateRadarDetection(false);
    }
    
    // Repetir a cada 30 segundos
    setTimeout(simulateSensorData, 30000);
} 