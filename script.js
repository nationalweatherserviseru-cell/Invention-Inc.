async function checkIPBlocked() {
    try {
        const response = await fetch('/api/check-ip');
        const data = await response.json();
        
        if (data.blocked) {
            window.location.href = '/blocked.html';
        }
    } catch (error) {
        console.error('Error checking IP:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkIPBlocked();
    
    const ideaForm = document.getElementById('ideaForm');
    if (ideaForm) {
        ideaForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const content = document.getElementById('ideaContent').value;
            const submitBtn = ideaForm.querySelector('.submit-btn');
            const spinner = ideaForm.querySelector('.spinner');
            const submitText = submitBtn.querySelector('span');
            const formMessage = document.getElementById('formMessage');
            
            submitBtn.disabled = true;
            spinner.classList.remove('hidden');
            submitText.style.opacity = '0.5';
            formMessage.innerHTML = '';
            formMessage.className = 'form-message';
            
            const formData = new FormData();
            formData.append('content', content);
            
            try {
                const response = await fetch('/api/send-idea', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    formMessage.innerHTML = translations[currentLang].idea.success;
                    formMessage.className = 'form-message success';
                    ideaForm.reset();
                } else {
                    throw new Error('Failed to send');
                }
            } catch (error) {
                formMessage.innerHTML = translations[currentLang].idea.error;
                formMessage.className = 'form-message error';
            } finally {
                submitBtn.disabled = false;
                spinner.classList.add('hidden');
                submitText.style.opacity = '1';
            }
        });
    }
});

window.addEventListener('pageshow', checkIPBlocked);
