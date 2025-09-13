export function initializeCopyableIPs() {
    const copyableIPs = document.querySelectorAll('.copyable-ip');

    copyableIPs.forEach(ipElement => {
        ipElement.addEventListener('click', function() {
            const ipAddress = this.getAttribute('data-ip');
            copyToClipboard(ipAddress);
        });

        ipElement.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });

        ipElement.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function() {
            showCopyNotification(text);
        }).catch(function(err) {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        showCopyNotification(text);
    } catch (err) {
        console.error('Не удалось скопировать текст: ', err);
        showCopyNotification(text, true);
    }

    document.body.removeChild(textArea);
}

function showCopyNotification(ipAddress, isError = false) {
    const existingNotification = document.querySelector('.copy-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.innerHTML = isError ? 
        `Ошибка копирования IP: ${ipAddress}` : 
        `IP адрес скопирован: ${ipAddress}`;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 400);
    }, 3000);
}
