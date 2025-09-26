// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFormValidation();
    initFormAnimations();
    initContactInteractions();
});

// Initialize Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    const clearBtn = document.getElementById('clearForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearForm);
    }
}

// Handle Form Submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (validateForm(data)) {
        // Show loading state
        showFormLoading();
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showFormSuccess();
            form.reset();
            hideFormLoading();
        }, 2000);
    }
}

// Form Validation
function validateForm(data) {
    const errors = [];
    
    // Required fields validation
    if (!data.nome || data.nome.trim().length < 2) {
        errors.push('Nome é obrigatório e deve ter pelo menos 2 caracteres');
        showFieldError('nome', 'Nome é obrigatório');
    } else {
        clearFieldError('nome');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('E-mail é obrigatório e deve ser válido');
        showFieldError('email', 'E-mail é obrigatório e deve ser válido');
    } else {
        clearFieldError('email');
    }
    
    // Phone validation (optional but if provided, should be valid)
    if (data.telefone && !isValidPhone(data.telefone)) {
        errors.push('Telefone deve ser válido');
        showFieldError('telefone', 'Telefone deve ser válido');
    } else {
        clearFieldError('telefone');
    }
    
    // Service selection validation
    if (!data.servico) {
        errors.push('Selecione pelo menos uma opção de serviço');
        showFieldError('servico', 'Selecione uma opção');
    } else {
        clearFieldError('servico');
    }
    
    if (errors.length > 0) {
        showNotification('Por favor, corrija os erros no formulário', 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\(\)\-\+]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Show field error
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (field) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
}

// Clear field error
function clearFieldError(fieldName) {
    const field = document.getElementById(fieldName);
    if (field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
}

// Clear form
function clearForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.reset();
        
        // Clear all field errors
        const fields = form.querySelectorAll('.form-input, .form-textarea');
        fields.forEach(field => {
            field.classList.remove('error');
        });
        
        const errorMessages = form.querySelectorAll('.field-error');
        errorMessages.forEach(error => error.remove());
        
        showNotification('Formulário limpo com sucesso', 'success');
    }
}

// Show form loading state
function showFormLoading() {
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
    }
}

// Hide form loading state
function hideFormLoading() {
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar';
        submitBtn.disabled = false;
    }
}

// Show form success
function showFormSuccess() {
    showNotification('Formulário enviado com sucesso! Entraremos em contato em breve.', 'success');
    
    // Add success animation
    const form = document.getElementById('contactForm');
    if (form) {
        form.classList.add('success');
        setTimeout(() => {
            form.classList.remove('success');
        }, 3000);
    }
}

// Form Animations
function initFormAnimations() {
    // Animate form fields on focus
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentNode.classList.remove('focused');
            }
        });
    });
    
    // Animate radio buttons
    const radioLabels = document.querySelectorAll('.radio-label');
    radioLabels.forEach(label => {
        label.addEventListener('click', function() {
            // Remove active class from all radio labels
            radioLabels.forEach(l => l.classList.remove('active'));
            // Add active class to clicked label
            this.classList.add('active');
        });
    });
}

// Contact Interactions
function initContactInteractions() {
    // Contact cards hover effects
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Copy contact info to clipboard
    const contactDetails = document.querySelectorAll('.contact-details p');
    contactDetails.forEach(detail => {
        detail.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                showNotification(`"${text}" copiado para a área de transferência`, 'success');
            }).catch(() => {
                showNotification('Erro ao copiar texto', 'error');
            });
        });
    });
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = getNotificationIcon(type);
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Get notification icon
function getNotificationIcon(type) {
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    return icons[type] || icons.info;
}

// Get notification color
function getNotificationColor(type) {
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6'
    };
    return colors[type] || colors.info;
}

// Add CSS for form animations and error states
const contactStyles = document.createElement('style');
contactStyles.textContent = `
    .form-group.focused .form-label {
        color: var(--primary-color);
        transform: translateY(-2px);
    }
    
    .form-input.error,
    .form-textarea.error {
        border-color: #EF4444;
        background: rgba(239, 68, 68, 0.1);
    }
    
    .field-error {
        color: #EF4444;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .field-error::before {
        content: '⚠️';
        font-size: 0.75rem;
    }
    
    .radio-label.active {
        background: rgba(0, 123, 255, 0.1);
        border-color: var(--primary-color);
    }
    
    .contact-form.success {
        animation: successPulse 0.6s ease;
    }
    
    @keyframes successPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background-color 0.2s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .contact-details p {
        cursor: pointer;
        transition: color 0.2s ease;
    }
    
    .contact-details p:hover {
        color: var(--primary-color);
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(contactStyles);

// Console message for contact page
console.log('%c📧 Página de Contato XPAM Soluções', 'color: #007BFF; font-size: 16px; font-weight: bold;');
console.log('%c✨ Formulário interativo com validação em tempo real', 'color: #10B981; font-size: 12px;');
console.log('%c🔧 JavaScript moderno • UX otimizada • Responsivo', 'color: #666; font-size: 10px;');
