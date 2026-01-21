/* ====================================
   FUNCIONALIDAD PRINCIPAL
   ==================================== */

// Configuración
const CONFIG = {
    whatsappNumber: '2604840322', // CAMBIAR POR TU NÚMERO DE WHATSAPP
    whatsappMessage: '¡Hola! Quiero información sobre el Curso de Manipulación de Alimentos.'
};

// Función para generar URL de WhatsApp
function generateWhatsAppURL(message) {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${2604840322}?text=${encodedMessage}`;
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initWhatsAppButtons();
    initSmoothScroll();
    initScrollAnimations();
    logVersionInfo();

    
});

// ============ BOTONES DE WHATSAPP ============
function initWhatsAppButtons() {
    const whatsappButtons = document.querySelectorAll('#btn-whatsapp-hero, #btn-whatsapp-footer');
    
    whatsappButtons.forEach(button => {
        button.href = generateWhatsAppURL(CONFIG.whatsappMessage);
        
        // Tracking de clics (opcional)
        button.addEventListener('click', function(e) {
            console.log('Click en botón WhatsApp:', this.id);
            
            // Aquí podrías agregar Google Analytics o similar
            // gtag('event', 'click', { 'event_category': 'WhatsApp', 'event_label': this.id });
        });
    });
}

// ============ SCROLL SUAVE ============
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Solo si es un ancla válido (no solo #)
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ============ ANIMACIONES AL HACER SCROLL ============
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos a animar
    const animatedElements = document.querySelectorAll('.card, .schedule-card, .instructor-card, .price-card, .inscription-step');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Añadir clase de animación
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ============ HELPERS ============
function logVersionInfo() {
    console.log('%c🎓 Curso de Manipulación de Alimentos', 'color: #10b981; font-size: 16px; font-weight: bold;');
    console.log('%cDesarrollado con ❤️ para Lic. Carolina García', 'color: #6b7280; font-size: 12px;');
    console.log('%cVersión: 1.0.0', 'color: #6b7280; font-size: 12px;');
}

// ============ UTILIDADES ADICIONALES ============

// Función para copiar alias de pago al clipboard (opcional)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        console.log('Copiado al portapapeles:', text);
        // Podrías mostrar un mensaje al usuario
    }).catch(function(err) {
        console.error('Error al copiar:', err);
    });
}

// Detectar si el usuario viene de WhatsApp u otras fuentes (opcional)
function detectReferrer() {
    const referrer = document.referrer;
    if (referrer.includes('whatsapp')) {
        console.log('Usuario viene de WhatsApp');
        // Podrías hacer tracking especial
    }
}

// Lazy loading de imágenes (si agregas imágenes en el futuro)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Exportar funciones si usás módulos (opcional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateWhatsAppURL,
        copyToClipboard
    };
}