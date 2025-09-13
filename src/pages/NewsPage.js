import { news } from '../data/news.js';
import { NewsList } from '../components/NewsList.js';

export class NewsPage {
    constructor() {
        this.news = news;
    }

    createElement() {
        const main = document.createElement('main');
        main.className = 'container';
        
        const headerPanel = document.createElement('div');
        headerPanel.className = 'content-panel';
        headerPanel.innerHTML = `
            <h1 class="typing-effect">Новости сервера</h1>
            <p>Здесь вы найдете все последние новости и обновления нашего сервера. Следите за новостями, чтобы не пропустить важные изменения!</p>
        `;

        const newsSection = document.createElement('section');
        newsSection.className = 'news-section';
        
        const newsPanel = document.createElement('div');
        newsPanel.className = 'content-panel';
        
        const newsTitle = document.createElement('h2');
        newsTitle.textContent = 'Последние новости';
        
        const newsList = new NewsList(this.news);
        
        newsPanel.appendChild(newsTitle);
        newsPanel.appendChild(newsList.render());
        newsSection.appendChild(newsPanel);
        
        main.appendChild(headerPanel);
        main.appendChild(newsSection);
        
        return main;
    }

    afterRender() {
        // Any post-render setup
    }

    render() {
        return this.createElement();
    }
}
