import { mods } from '../data/mods.js';
import { ModGrid } from '../components/ModGrid.js';

export class ModsPage {
    constructor() {
        this.mods = mods;
    }

    createElement() {
        const main = document.createElement('main');
        main.className = 'container';
        
        main.innerHTML = `
            <div class="content-panel">
                <h1 class="typing-effect">Моды сервера Ashen Legacy</h1>
                <p>Здесь представлен полный список модов, используемых на нашем сервере. Для игры на сервере необходимо установить все перечисленные моды.</p>
                
                <div class="warning">
                    <strong>Важно!</strong> Все моды должны быть установлены точно в тех же версиях, что указаны ниже. Несовпадение версий может привести к проблемам с подключением к серверу.
                </div>
            </div>

            <section class="download-section">
                <div class="content-panel">
                    <h2>Скачать все моды одним архивом</h2>
                    <p>Для удобства мы подготовили архив со всеми необходимыми модами:</p>
                    <a href="https://drive.google.com/drive/folders/1jwAfTgSxvh6rdnSHuX42PBYrFYgoXEGj" class="download-btn" target="_blank">
                        Скачать все моды (Google Drive)
                    </a>
                    
                    <div class="notice" style="margin-top: 20px;">
                        <strong>Важное преимущество!</strong> Все моды в нашем архиве переведены на русский язык. Если вы скачиваете их с нашего сайта, вы получите полностью русифицированный игровой опыт!
                    </div>
                    
                    <p style="margin-top: 15px; font-size: 16px; color: var(--text-color);">
                        <strong>Инструкция по установке:</strong><br>
                        1. Скачайте архив по ссылке выше<br>
                        2. Распакуйте все файлы в папку Mods вашей игры<br>
                        3. Запустите игру и подключитесь к серверу
                    </p>
                </div>
            </section>

            <section class="mods-section">
                <div class="content-panel">
                    <h2>Список модов</h2>
                    <div id="mod-grid-container"></div>
                </div>
            </section>

            <section class="installation-section">
                <div class="content-panel">
                    <h2>Инструкция по установке</h2>
                    
                    <div class="notice">
                        <strong>Перед установкой модов убедитесь, что у вас установлена правильная версия Vintage Story!</strong>
                    </div>

                    <h3>Шаг 1: Найдите папку с игрой</h3>
                    <p>Папка с модами обычно находится по адресу:</p>
                    <ul>
                        <li><strong>Windows:</strong> <code>%appdata%/VintagestoryData/Mods</code></li>
                        <li><strong>Linux:</strong> <code>~/.config/VintagestoryData/Mods</code></li>
                    </ul>

                    <h3>Шаг 2: Скачайте моды</h3>
                    <p>Скачайте все моды по ссылке выше или по отдельности из списка модов.</p>

                    <h3>Шаг 3: Установите моды</h3>
                    <p>Скопируйте все скачанные .zip файлы модов в папку Mods. НЕ распаковывайте архивы - игра сама их прочитает.</p>

                    <h3>Шаг 4: Запустите игру</h3>
                    <p>Запустите Vintage Story. В главном меню вы должны увидеть список установленных модов. Убедитесь, что все моды загружены успешно.</p>

                    <div class="warning">
                        <strong>Важные замечания:</strong><br>
                        • Не переименовывайте файлы модов<br>
                        • Убедитесь, что версии модов точно соответствуют указанным<br>
                        • При проблемах с подключением - проверьте список модов в игре<br>
                        • Обращайтесь в Discord за помощью при возникновении проблем
                    </div>
                </div>
            </section>
        `;
        
        return main;
    }

    afterRender() {
        // Add the mod grid after the main content is rendered
        const modGridContainer = document.getElementById('mod-grid-container');
        if (modGridContainer) {
            const modGrid = new ModGrid(this.mods);
            modGridContainer.appendChild(modGrid.render());
        }
    }

    render() {
        return this.createElement();
    }
}
