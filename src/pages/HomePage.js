import { initializeCopyableIPs } from '../utils/copyableIPs.js';

export class HomePage {
    constructor() {
        this.setupEventHandlers();
    }

    createElement() {
        const main = document.createElement('main');
        main.className = 'container';
        main.innerHTML = `
            <div class="content-panel">
                <h1 class="typing-effect">Добро пожаловать на сервер Ashen Legacy</h1>
                <p>Официальный сайт сервера. Здесь вы найдете всю необходимую информацию для комфортной игры на нашем сервере Vintage Story. Присоединяйтесь к нашему дружному сообществу выживальщиков!</p>
            </div>

            <section class="info-section">
                <div class="content-panel">
                    <h2>Информация о сервере</h2>
                    <div class="server-info">
                        <p><strong>IP сервера:</strong> <span class="copyable-ip" data-ip="199.115.73.179:9020">199.115.73.179:9020</span></p>
                        <p><strong>IP-2 сервера:</strong> <span class="copyable-ip" data-ip="202.181.148.151">202.181.148.151</span></p>
                        <p><strong>Версия игры:</strong> Vintage Story 1.21.1</p>
                        <p><strong>Тип сервера:</strong> Ванилла+ </p>
                        <p><strong>Максимум игроков:</strong> 30</p>
                        <p><strong>Режим игры:</strong> Выживание</p>
                    </div>
                    
                    <div class="notice">
                        <strong>Как присоединиться:</strong><br>
                        1. Скачайте все необходимые моды со страницы "Моды"<br>
                        2. Установите моды в папку с игрой<br>
                        3. Запустите игру и подключитесь к серверу<br>
                        4. Наслаждайтесь игрой!
                    </div>
                </div>
            </section>

            <section class="connection-section">
                <div class="content-panel">
                    <h2>Возможные проблемы с подключением</h2>

                    <p>В последнее время в России возникают проблемы с доступом к зарубежным серверам из-за блокировок РКН (Роскомнадзор). Это может повлиять на ваш игровой опыт следующим образом:</p>
                    
                    <h3>1. Проблемы с модами</h3>
                    <p>Автоматическая загрузка модов может не работать из-за блокировки доступа к серверам хранения модов. В этом случае:</p>
                    <ul>
                        <li>Скачайте все моды вручную со страницы <a href="/mods" class="nav-link">"Моды"</a></li>
                        <li>Установите их в папку с игрой согласно инструкции</li>
                        <li>Это займет немного больше времени, но позволит играть без проблем</li>
                    </ul>
                    
                    <h3>2. Проблемы с подключением к серверу</h3>
                    <p>Если у вас не получается подключиться к основному IP или наблюдается высокий пинг:</p>
                    <ul>
                        <li>Попробуйте подключиться ко второму IP: <span class="copyable-ip" data-ip="202.181.148.151">202.181.148.151</span></li>
                        <li>Иногда один из серверов работает лучше в зависимости от вашего провайдера</li>
                        <li>Если проблемы продолжаются, попробуйте использовать VPN</li>
                    </ul>
                    
                    <h3>3. Что делать, если ничего не помогает</h3>
                    
                    <p>Обратитесь за помощью в наш Дискорд. Мы понимаем, что эти проблемы могут расстраивать, но вместе мы найдем решение! Наше сообщество всегда готово помочь новичкам разобраться с любыми техническими вопросами.</p>
                </div>
            </section>
        `;
        return main;
    }

    setupEventHandlers() {
        // This will be called after the component is rendered
    }

    afterRender() {
        initializeCopyableIPs();
    }

    render() {
        return this.createElement();
    }
}
