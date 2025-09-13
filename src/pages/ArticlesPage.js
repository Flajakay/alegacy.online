import { articlesIndex } from '../data/articles/index.js';
import { ArticlesList } from '../components/ArticlesList.js';

export class ArticlesPage {
    constructor() {
        this.articles = [];
        this.loadArticles();
    }

    async loadArticles() {
        try {
            const articles = [];

            for (const articleId of articlesIndex) {
                try {
                    const module = await import(`../data/articles/${articleId}.js`);
                    articles.push(module.article);
                } catch (error) {
                    console.error(`Error loading article ${articleId}:`, error);
                }
            }

            // Sort articles by date (newest first)
            this.articles = articles.sort((a, b) => new Date(b.date) - new Date(a.date));
            this.updateArticlesList();
        } catch (error) {
            console.error('Error loading articles:', error);
            this.showError();
        }
    }

    createElement() {
        const main = document.createElement('main');
        main.className = 'container';
        
        const headerPanel = document.createElement('div');
        headerPanel.className = 'content-panel';
        headerPanel.innerHTML = `
            <h1 class="typing-effect">Статьи</h1>
            <p>Здесь вы найдете подробные статьи, гайды и материалы о нашем сервере. Изучайте, делитесь опытом и становитесь частью нашего сообщества!</p>
        `;

        const articlesSection = document.createElement('section');
        articlesSection.className = 'articles-section';
        
        const articlesPanel = document.createElement('div');
        articlesPanel.className = 'content-panel';
        
        const articlesTitle = document.createElement('h2');
        articlesTitle.textContent = 'Все статьи';
        
        this.articlesContainer = document.createElement('div');
        this.articlesContainer.id = 'articles-container';
        this.articlesContainer.innerHTML = '<div class="articles-loading">Загрузка статей...</div>';
        
        articlesPanel.appendChild(articlesTitle);
        articlesPanel.appendChild(this.articlesContainer);
        articlesSection.appendChild(articlesPanel);
        
        main.appendChild(headerPanel);
        main.appendChild(articlesSection);
        
        return main;
    }

    updateArticlesList() {
        if (this.articlesContainer && this.articles.length > 0) {
            const articlesList = new ArticlesList(this.articles);
            this.articlesContainer.innerHTML = '';
            this.articlesContainer.appendChild(articlesList.render());
        }
    }

    showError() {
        if (this.articlesContainer) {
            this.articlesContainer.innerHTML = '<div class="articles-error">Не удалось загрузить статьи. Попробуйте обновить страницу.</div>';
        }
    }

    afterRender() {
        // Any post-render setup
        // Import articles.css
        if (!document.querySelector('link[href*="articles.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = './src/articles.css';
            document.head.appendChild(link);
        }
    }

    render() {
        return this.createElement();
    }
}
