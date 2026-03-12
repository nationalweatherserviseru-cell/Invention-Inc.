const translations = {
    ru: {
        nav: {
            idea: "Предложить идею"
        },
        hero: {
            text: "Мы не открываем новое,<br> <span class='highlight'>мы создаем его</span>",
            quote: "Границы существуют только в нашем сознании"
        },
        idea: {
            title: "Поделитесь своей идеей",
            subtitle: "Каждое великое изобретение начиналось с идеи",
            label: "Ваша идея:",
            placeholder: "Опишите вашу идею здесь...",
            submit: "Отправить идею",
            note: "Все идеи рассматриваются нашей командой экспертов",
            success: "Идея успешно отправлена!",
            error: "Ошибка при отправке. Пожалуйста, попробуйте снова."
        },
        blocked: {
            title: "Ваш аккаунт был заблокирован",
            message: "Для подачи апелляции перейдите в наш Discord канал",
            button: "Присоединиться к Discord"
        }
    },
    en: {
        nav: {
            idea: "Submit Idea"
        },
        hero: {
            text: "We don't discover new things,<br> <span class='highlight'>we create them</span>",
            quote: "Boundaries exist only in our minds"
        },
        idea: {
            title: "Share Your Idea",
            subtitle: "Every great invention started with an idea",
            label: "Your idea:",
            placeholder: "Describe your idea here...",
            submit: "Submit Idea",
            note: "All ideas are reviewed by our team of experts",
            success: "Idea successfully submitted!",
            error: "Error submitting idea. Please try again."
        },
        blocked: {
            title: "Your account has been blocked",
            message: "To appeal, please join our Discord channel",
            button: "Join Discord"
        }
    }
};

let currentLang = localStorage.getItem('language') || 'ru';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const keys = element.getAttribute('data-i18n').split('.');
        let translation = translations[lang];
        
        for (const key of keys) {
            if (translation) translation = translation[key];
        }
        
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                }
            } else {
                element.innerHTML = translation;
            }
        }
    });
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });
});
