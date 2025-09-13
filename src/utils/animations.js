export function addTypingEffect() {
    const titles = document.querySelectorAll('.typing-effect');

    titles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';

        let i = 0;
        const typeInterval = setInterval(() => {
            title.textContent += text.charAt(i);
            i++;

            if (i >= text.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    title.style.borderRight = 'none';
                }, 1000);
            }
        }, 50);
    });
}

export function addFadeInAnimations() {
    const panels = document.querySelectorAll('.content-panel, .mod-item, .news-article');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px 100px 0px'
    });

    panels.forEach(panel => {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(20px)';
        panel.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(panel);
    });
}

export function addClickSounds() {
    const buttons = document.querySelectorAll('button, .download-btn, .nav-link');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 100);
        });
    });
}

export function addFlickerEffect() {
    const flickerElements = document.querySelectorAll('.flicker-effect');

    flickerElements.forEach(element => {
        setInterval(() => {
            if (Math.random() > 0.95) {
                element.style.opacity = '0.8';
                setTimeout(() => {
                    element.style.opacity = '1';
                }, 50);
            }
        }, 100);
    });
}
