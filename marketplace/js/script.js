document.addEventListener('DOMContentLoaded', function() {
    // Inicializar scroll do header
    initHeaderScroll();
    
    // Inicializar menu mobile
    initMobileMenu();
    
    // Inicializar animações
    initAnimations();
    
    // Inicializar sliders
    initSliders();
    
    // Inicializar filtros de busca
    initSearchFilters();
});

/**
 * Inicializa o comportamento do header ao fazer scroll
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

/**
 * Inicializa o menu mobile
 */
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Alternar animação do ícone do menu
            const spans = this.querySelectorAll('span');
            
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg)';
                spans[0].style.top = '10px';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg)';
                spans[2].style.top = '10px';
            } else {
                spans[0].style.transform = 'rotate(0deg)';
                spans[0].style.top = '0px';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0deg)';
                spans[2].style.top = '20px';
            }
        });
        
        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'rotate(0deg)';
                spans[0].style.top = '0px';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0deg)';
                spans[2].style.top = '20px';
            });
        });
    }
}

/**
 * Inicializa as animações ao scroll
 */
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-in');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            element.style.opacity = 0;
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
}

/**
 * Inicializa os sliders da página
 */
function initSliders() {
    // Slider de serviços populares
    const servicesSlider = document.querySelector('.services-slider');
    
    if (servicesSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        servicesSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - servicesSlider.offsetLeft;
            scrollLeft = servicesSlider.scrollLeft;
            servicesSlider.style.cursor = 'grabbing';
        });
        
        servicesSlider.addEventListener('mouseleave', () => {
            isDown = false;
            servicesSlider.style.cursor = 'grab';
        });
        
        servicesSlider.addEventListener('mouseup', () => {
            isDown = false;
            servicesSlider.style.cursor = 'grab';
        });
        
        servicesSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - servicesSlider.offsetLeft;
            const walk = (x - startX) * 2; // Velocidade do scroll
            servicesSlider.scrollLeft = scrollLeft - walk;
        });
        
        // Estilo inicial
        servicesSlider.style.cursor = 'grab';
    }
}

/**
 * Inicializa os filtros de busca
 */
function initSearchFilters() {
    const filterForm = document.getElementById('search-filters');
    
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular busca com filtros
            const formData = new FormData(filterForm);
            let filters = {};
            
            for (let [key, value] of formData.entries()) {
                filters[key] = value;
            }
            
            console.log('Filtros aplicados:', filters);
            
            // Mostrar toast de sucesso
            showToast('Filtros aplicados com sucesso!', 'success');
            
            // Aqui seria a chamada para API de busca com os filtros
            // Por enquanto, apenas simular um carregamento
            const resultsContainer = document.querySelector('.search-results');
            
            if (resultsContainer) {
                resultsContainer.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando resultados...</div>';
                
                // Simulando tempo de resposta
                setTimeout(() => {
                    // Aqui renderizaria os resultados reais da API
                    resultsContainer.innerHTML = getSearchResultsHTML();
                }, 1500);
            }
        });
    }
}

/**
 * Exibe uma notificação toast
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo de toast (success, error, warning, info)
 */
function showToast(message, type = 'info') {
    // Remover toasts existentes
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Criar novo toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '';
    switch (type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        default:
            icon = '<i class="fas fa-info-circle"></i>';
            break;
    }
    
    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-message">${message}</div>
        <button class="toast-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(toast);
    
    // Animar entrada
    setTimeout(() => {
        toast.classList.add('active');
    }, 10);
    
    // Configurar fechamento
    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            toast.classList.remove('active');
            setTimeout(() => {
                toast.remove();
            }, 300);
        });
    }
    
    // Auto-fechar após 5 segundos
    setTimeout(() => {
        if (document.body.contains(toast)) {
            toast.classList.remove('active');
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    toast.remove();
                }
            }, 300);
        }
    }, 5000);
}

/**
 * Gera o HTML simulado para resultados de busca
 * @returns {string} HTML dos resultados
 */
function getSearchResultsHTML() {
    return `
        <div class="search-results-grid">
            <div class="service-item">
                <div class="service-image">
                    <img src="img/cuidador-maria.jpg" alt="Maria Silva">
                </div>
                <div class="service-details">
                    <h3>Maria Silva</h3>
                    <p class="service-type">Cuidadora de Idosos</p>
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                        <span>4.5 (78 avaliações)</span>
                    </div>
                    <p>Experiência: <strong>8 anos</strong></p>
                    <div class="specialist-tags">
                        <span class="tag">Alzheimer</span>
                        <span class="tag">Parkinson</span>
                        <span class="tag">Fisioterapia</span>
                    </div>
                    <p class="price">R$ <strong>190,00</strong>/diária</p>
                    <a href="#" class="btn btn-primary">Ver Perfil</a>
                </div>
            </div>
            
            <div class="service-item">
                <div class="service-image">
                    <img src="img/cuidador-joao.jpg" alt="João Oliveira">
                </div>
                <div class="service-details">
                    <h3>João Oliveira</h3>
                    <p class="service-type">Cuidador e Enfermeiro</p>
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <span>5.0 (42 avaliações)</span>
                    </div>
                    <p>Experiência: <strong>5 anos</strong></p>
                    <div class="specialist-tags">
                        <span class="tag">Idosos</span>
                        <span class="tag">Enfermagem</span>
                        <span class="tag">Mobilidade</span>
                    </div>
                    <p class="price">R$ <strong>210,00</strong>/diária</p>
                    <a href="#" class="btn btn-primary">Ver Perfil</a>
                </div>
            </div>
            
            <div class="service-item">
                <div class="service-image">
                    <img src="img/cuidadora-ana.jpg" alt="Ana Beatriz">
                </div>
                <div class="service-details">
                    <h3>Ana Beatriz</h3>
                    <p class="service-type">Cuidadora Especializada</p>
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                        <span>4.0 (35 avaliações)</span>
                    </div>
                    <p>Experiência: <strong>4 anos</strong></p>
                    <div class="specialist-tags">
                        <span class="tag">Crianças</span>
                        <span class="tag">Autismo</span>
                        <span class="tag">Terapia Ocupacional</span>
                    </div>
                    <p class="price">R$ <strong>180,00</strong>/diária</p>
                    <a href="#" class="btn btn-primary">Ver Perfil</a>
                </div>
            </div>
        </div>
    `;
} 