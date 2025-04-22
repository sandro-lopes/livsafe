document.addEventListener('DOMContentLoaded', function() {
    // Seleção de tabs
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');
            
            // Remover classe active de todas as tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Adicionar classe active na tab clicada
            tab.classList.add('active');
            
            // Esconder todos os conteúdos
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Mostrar o conteúdo correspondente
            document.getElementById(target).classList.add('active');
        });
    });
    
    // Controle de toggle switches
    const toggles = document.querySelectorAll('.toggle-switch input');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const deviceId = this.getAttribute('data-device');
            const isOn = this.checked;
            
            console.log(`Dispositivo ${deviceId} está ${isOn ? 'ligado' : 'desligado'}`);
            
            // Aqui poderia haver uma chamada para API
            // toggleDevice(deviceId, isOn);
        });
    });
    
    // Botão de emergência
    const emergencyBtn = document.querySelector('.emergency-btn');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja acionar o alarme de emergência?')) {
                console.log('Alarme de emergência acionado!');
                
                // Simular acionamento de alarme
                document.body.classList.add('emergency');
                
                // Adicionar classe de animação
                this.classList.add('activated');
                
                // Aqui poderia haver uma chamada para API
                // triggerEmergency();
                
                // Notificação na tela
                showNotification('Alarme de emergência acionado! Contatos de emergência foram notificados.');
            }
        });
    }
    
    // Simulação de dados de sensores
    function updateSensors() {
        const sensors = document.querySelectorAll('.sensor-card');
        
        sensors.forEach(sensor => {
            // Em um cenário real, esses dados viriam de uma API
            const random = Math.random();
            const sensorType = sensor.getAttribute('data-sensor');
            
            if (random < 0.1 && sensorType !== 'movimento') {
                // Simular alerta (10% de chance)
                sensor.querySelector('.sensor-icon').className = 'sensor-icon sensor-warning';
                
                if (sensorType === 'fumaca') {
                    sensor.querySelector('.sensor-status').textContent = 'Fumaça detectada!';
                    showNotification('Alerta! Fumaça detectada.');
                } else if (sensorType === 'co') {
                    sensor.querySelector('.sensor-status').textContent = 'Níveis elevados!';
                    showNotification('Alerta! Níveis de monóxido de carbono elevados.');
                } else if (sensorType === 'gas') {
                    sensor.querySelector('.sensor-status').textContent = 'Vazamento detectado!';
                    showNotification('Alerta! Vazamento de gás detectado.');
                }
            }
        });
    }
    
    // Executar a atualização a cada 30 segundos (simulação)
    if (document.querySelector('.sensor-card')) {
        setInterval(updateSensors, 30000);
        
        // Executar uma vez ao carregar a página
        setTimeout(updateSensors, 5000);
    }
    
    // Função para mostrar notificações
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Adicionar classe para animar entrada
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remover após 5 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            
            // Remover do DOM após animação de saída
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // Simulação de câmera
    const cameraView = document.querySelector('.camera-view');
    if (cameraView) {
        cameraView.innerHTML = '<div class="camera-placeholder">Carregando câmera...</div>';
        
        // Simular carregamento da câmera
        setTimeout(() => {
            cameraView.innerHTML = `
                <div class="camera-feed">
                    <div class="camera-overlay">
                        <div class="camera-date">${new Date().toLocaleString()}</div>
                        <div class="camera-status">ONLINE</div>
                    </div>
                    <div class="camera-placeholder">Câmera conectada</div>
                </div>
                <div class="camera-controls">
                    <button class="camera-btn"><i class="fas fa-arrows-alt"></i></button>
                    <button class="camera-btn"><i class="fas fa-volume-up"></i></button>
                    <button class="camera-btn"><i class="fas fa-record-vinyl"></i></button>
                    <button class="camera-btn"><i class="fas fa-camera"></i></button>
                </div>
            `;
        }, 2000);
    }
    
    // Simulação de histórico
    const historico = document.getElementById('historico');
    if (historico) {
        // Gerar dados de histórico fictícios
        const historicoItens = [
            { data: '2023-09-15 08:32', evento: 'Porta da frente aberta', tipo: 'info' },
            { data: '2023-09-15 13:45', evento: 'Movimento detectado - Sala', tipo: 'info' },
            { data: '2023-09-14 19:21', evento: 'Alarme de fumaça ativado', tipo: 'alerta' },
            { data: '2023-09-14 19:23', evento: 'Alarme de fumaça desativado', tipo: 'info' },
            { data: '2023-09-14 10:05', evento: 'Energia restaurada', tipo: 'info' },
            { data: '2023-09-14 09:47', evento: 'Queda de energia detectada', tipo: 'alerta' },
            { data: '2023-09-13 22:30', evento: 'Sistema armado', tipo: 'info' },
            { data: '2023-09-13 07:15', evento: 'Sistema desarmado', tipo: 'info' },
        ];
        
        const historicoHTML = historicoItens.map(item => `
            <div class="historico-item ${item.tipo}">
                <div class="historico-data">${item.data}</div>
                <div class="historico-evento">${item.evento}</div>
            </div>
        `).join('');
        
        historico.innerHTML = historicoHTML;
    }
    
    // Função para mostrar modal
    window.showModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.classList.add('modal-open');
        }
    };
    
    // Função para fechar modal
    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    };
    
    // Fechar modal ao clicar fora
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });
    
    // Adicionar CSS para notificações
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--danger-color);
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transform: translateX(110%);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        body.emergency {
            animation: emergency-pulse 1s infinite alternate;
        }
        
        @keyframes emergency-pulse {
            from { background-color: var(--light-bg); }
            to { background-color: rgba(231, 76, 60, 0.1); }
        }
        
        .emergency-btn.activated {
            animation: btn-pulse 0.5s infinite alternate;
        }
        
        @keyframes btn-pulse {
            from { background-color: var(--danger-color); }
            to { background-color: #c0392b; }
        }
        
        .camera-placeholder {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: #777;
        }
        
        .camera-feed {
            position: relative;
            height: 250px;
            background: #333;
            color: white;
            border-radius: 8px;
            overflow: hidden;
        }
        
        .camera-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            font-size: 0.8rem;
            background: rgba(0,0,0,0.5);
        }
        
        .camera-status {
            color: var(--secondary-color);
        }
        
        .camera-controls {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 15px;
        }
        
        .camera-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: none;
            background: var(--dark-bg);
            color: white;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .camera-btn:hover {
            background: var(--primary-color);
        }
        
        .historico-item {
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 10px;
            background: var(--light-bg);
            display: flex;
            justify-content: space-between;
        }
        
        .historico-item.alerta {
            background: rgba(231, 76, 60, 0.1);
            border-left: 3px solid var(--danger-color);
        }
        
        .historico-data {
            color: #777;
            font-size: 0.9rem;
        }
        
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }
        
        .modal.active {
            display: flex;
        }
        
        .modal-content {
            background: white;
            padding: 30px;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
        }
        
        body.modal-open {
            overflow: hidden;
        }
    `;
    
    document.head.appendChild(style);
    
    // Inicialização de elementos interativos
    initializeModals();
    initializeSmoothScroll();
    initializeContactForm();
    
    // Adicionar classe active ao link do menu quando a página for rolada
    window.addEventListener('scroll', highlightMenuOnScroll);
    
    // Configurar elementos de animação
    animateOnScroll();
});

// Manipulação de modais de login e cadastro
function initializeModals() {
    // Elementos do modal de login
    const loginLinks = document.querySelectorAll('.login-link');
    const loginModal = document.getElementById('loginModal');
    const closeLoginBtn = loginModal.querySelector('.modal-close');
    
    // Elementos do modal de cadastro
    const registerLinks = document.querySelectorAll('.register-link');
    const registerModal = document.getElementById('registerModal');
    const closeRegisterBtn = registerModal.querySelector('.modal-close');
    
    // Links do formulário para alternar entre login e cadastro
    const switchToRegister = document.querySelector('.switch-to-register');
    const switchToLogin = document.querySelector('.switch-to-login');
    
    // Abrir modal de login
    loginLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Abrir modal de cadastro
    registerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Fechar modal de login
    closeLoginBtn.addEventListener('click', function() {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Fechar modal de cadastro
    closeRegisterBtn.addEventListener('click', function() {
        registerModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Alternar para o modal de cadastro
    if (switchToRegister) {
        switchToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'none';
            registerModal.style.display = 'flex';
        });
    }
    
    // Alternar para o modal de login
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.style.display = 'none';
            loginModal.style.display = 'flex';
        });
    }
    
    // Fechar ao clicar fora do modal
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Navegação suave para os links de âncora
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Ignorar para links de modais
            if (this.classList.contains('login-link') || 
                this.classList.contains('register-link') ||
                this.classList.contains('switch-to-login') ||
                this.classList.contains('switch-to-register')) {
                return;
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calcular a posição do elemento alvo
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Rolar suavemente para o elemento
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Atualizar URL com hash
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Destacar link do menu baseado na seção visível
function highlightMenuOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Obter a posição atual da rolagem
    const scrollY = window.pageYOffset;
    
    // Percorrer todas as seções
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        // Verificar se a seção está visível
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Remover a classe active de todos os links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Adicionar a classe active ao link correspondente
            const correspondingLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Animar elementos quando entrarem na viewport
function animateOnScroll() {
    // Selecionar elementos para animar
    const animatedElements = document.querySelectorAll('.feature-card, .plan-card, .testimonial-card');
    
    // Configurar observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observar cada elemento
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Validação e envio do formulário de contato
function initializeContactForm() {
    const contactForm = document.querySelector('.newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = contactForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Validação simples de email
            if (!validateEmail(email)) {
                showFormMessage(contactForm, 'Por favor, insira um email válido.', 'error');
                emailInput.focus();
                return;
            }
            
            // Simulação de envio de formulário
            showFormMessage(contactForm, 'Obrigado! Você foi inscrito na nossa newsletter.', 'success');
            contactForm.reset();
        });
    }
    
    // Adicionar validação para formulários de login e registro
    const loginForm = document.querySelector('#loginForm');
    const registerForm = document.querySelector('#registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aqui seria adicionada a lógica de autenticação
            alert('Funcionalidade de login será implementada em breve.');
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aqui seria adicionada a lógica de registro
            alert('Funcionalidade de cadastro será implementada em breve.');
        });
    }
}

// Função auxiliar para validar email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Exibir mensagem de formulário
function showFormMessage(form, message, type) {
    // Verificar se já existe uma mensagem
    let messageElement = form.querySelector('.form-message');
    
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'form-message';
        form.appendChild(messageElement);
    }
    
    // Adicionar classe de tipo de mensagem
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Remover mensagem após alguns segundos
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
} 