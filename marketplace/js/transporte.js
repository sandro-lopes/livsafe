// JavaScript específico para página de Transporte

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades após carregamento do DOM
    initSearchLocation();
    initFAQAccordion();
    initTestimonialSlider();
    initLocationServices();
    initProviderFilters();
});

// Sistema de busca por localização
function initSearchLocation() {
    const searchForm = document.querySelector('.search-container form');
    const searchInput = document.querySelector('.search-container input');

    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const location = searchInput.value.trim();
            if (location !== '') {
                // Simulação de busca - em uma implementação real, isso enviaria uma requisição AJAX
                showLoading();
                
                // Simular tempo de processamento
                setTimeout(() => {
                    hideLoading();
                    showNotification('Serviços encontrados próximos a: ' + location, 'success');
                    // Aqui seria implementada a atualização dos resultados
                }, 1500);
            } else {
                showNotification('Por favor, digite um local para buscar', 'warning');
            }
        });
    }
}

// Sistema de localização em tempo real
function initLocationServices() {
    const useLocationBtn = document.getElementById('use-my-location');
    
    if (useLocationBtn) {
        useLocationBtn.addEventListener('click', function() {
            if (navigator.geolocation) {
                showLoading();
                
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        
                        // Em uma implementação real, essas coordenadas seriam enviadas ao servidor
                        // para buscar provedores próximos
                        
                        // Simulação de busca por geolocalização
                        setTimeout(() => {
                            hideLoading();
                            document.querySelector('.search-container input').value = 'Sua localização atual';
                            showNotification('Localização obtida com sucesso!', 'success');
                        }, 1500);
                    },
                    function(error) {
                        hideLoading();
                        let message = 'Erro ao obter localização';
                        
                        switch(error.code) {
                            case error.PERMISSION_DENIED:
                                message = 'Permissão para geolocalização foi negada';
                                break;
                            case error.POSITION_UNAVAILABLE:
                                message = 'Informação de localização indisponível';
                                break;
                            case error.TIMEOUT:
                                message = 'Tempo de solicitação de localização expirou';
                                break;
                        }
                        
                        showNotification(message, 'error');
                    }
                );
            } else {
                showNotification('Geolocalização não é suportada pelo seu navegador', 'error');
            }
        });
    }
}

// Sistema de accordion para FAQs
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Abre ou fecha o item atual
            item.classList.toggle('active');
        });
    });
}

// Slider de depoimentos
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    
    if (!slider) return;
    
    const testimonials = slider.querySelectorAll('.testimonial');
    const dotsContainer = slider.querySelector('.dots');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    
    let currentIndex = 0;
    
    // Criar pontos indicadores
    if (dotsContainer) {
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            
            dotsContainer.appendChild(dot);
        });
    }
    
    // Configurar botões de navegação
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
    }
    
    function goToSlide(index) {
        // Ajustar índice para loop
        if (index < 0) {
            index = testimonials.length - 1;
        } else if (index >= testimonials.length) {
            index = 0;
        }
        
        // Atualizar classe ativa
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
        
        // Atualizar pontos indicadores
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    // Inicializar primeiro slide
    goToSlide(0);
    
    // Auto-rotação (opcional)
    let interval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);
    
    // Pausar auto-rotação ao passar o mouse
    slider.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });
    
    // Retomar auto-rotação ao remover o mouse
    slider.addEventListener('mouseleave', () => {
        clearInterval(interval);
        interval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    });
}

// Filtros para provedores de transporte
function initProviderFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const providerCards = document.querySelectorAll('.provider-card');
    
    if (filterBtns.length && providerCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remover classe ativa de todos os botões
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Adicionar classe ativa ao botão clicado
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filtrar cards
                providerCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'flex';
                    } else {
                        const cardTypes = card.getAttribute('data-type').split(' ');
                        if (cardTypes.includes(filter)) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
}

// Funções utilitárias
function showLoading() {
    // Verificar se já existe um loader
    let loader = document.querySelector('.loader-overlay');
    
    if (!loader) {
        // Criar e adicionar o loader
        loader = document.createElement('div');
        loader.className = 'loader-overlay';
        loader.innerHTML = '<div class="loader"></div>';
        document.body.appendChild(loader);
    }
    
    // Exibir o loader
    loader.style.display = 'flex';
}

function hideLoading() {
    const loader = document.querySelector('.loader-overlay');
    if (loader) {
        loader.style.display = 'none';
    }
}

function showNotification(message, type = 'info') {
    // Remover notificações existentes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Definir ícone com base no tipo
    let icon = 'fa-info-circle';
    switch (type) {
        case 'success':
            icon = 'fa-check-circle';
            break;
        case 'warning':
            icon = 'fa-exclamation-triangle';
            break;
        case 'error':
            icon = 'fa-times-circle';
            break;
    }
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
        <button class="close-btn"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar notificação
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Configurar botão fechar
    const closeBtn = notification.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-fechar após 5 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Inicialização de formulário de agendamento (para modal)
function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação do formulário
            const name = document.getElementById('booking-name').value.trim();
            const date = document.getElementById('booking-date').value;
            const time = document.getElementById('booking-time').value;
            const address = document.getElementById('booking-address').value.trim();
            
            if (name === '' || date === '' || time === '' || address === '') {
                showNotification('Por favor, preencha todos os campos obrigatórios', 'warning');
                return;
            }
            
            // Simulação de envio do formulário
            showLoading();
            
            setTimeout(() => {
                hideLoading();
                showNotification('Agendamento realizado com sucesso!', 'success');
                closeModal();
                bookingForm.reset();
            }, 1500);
        });
    }
}

// Funções para controle de modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const activeModal = document.querySelector('.modal.active');
    if (activeModal) {
        activeModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Inicialização de modais
document.addEventListener('click', function(e) {
    // Abrir modal
    if (e.target.classList.contains('open-modal')) {
        const modalId = e.target.getAttribute('data-modal');
        openModal(modalId);
    }
    
    // Fechar modal
    if (e.target.classList.contains('close-modal') || 
        (e.target.classList.contains('modal-overlay') && !e.target.classList.contains('modal-content'))) {
        closeModal();
    }
}); 