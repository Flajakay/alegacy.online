export class ArticlesList {
    constructor(articles) {
        this.articles = articles || [];
    }

    createElement() {
        const container = document.createElement('div');
        container.className = 'articles-grid';

        if (this.articles.length === 0) {
            container.innerHTML = '<div class="articles-error">Статьи не найдены.</div>';
            return container;
        }

        this.articles.forEach(article => {
            const articleCard = this.createArticleCard(article);
            container.appendChild(articleCard);
        });

        return container;
    }

    createArticleCard(article) {
        const card = document.createElement('div');
        card.className = 'article-card';
        card.dataset.articleId = article.id;

        const title = document.createElement('h3');
        title.className = 'article-title';
        title.textContent = article.title;

        const meta = document.createElement('div');
        meta.className = 'article-meta';

        const date = document.createElement('span');
        date.className = 'article-date';
        date.textContent = article.date;

        const author = document.createElement('span');
        author.className = 'article-author';
        author.textContent = `Автор: ${article.author}`;

        meta.appendChild(date);
        meta.appendChild(author);

        const preview = document.createElement('p');
        preview.className = 'article-preview';
        preview.textContent = article.preview;

        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'article-tags';

        if (article.tags && article.tags.length > 0) {
            article.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'article-tag';
                tagElement.textContent = tag;
                tagsContainer.appendChild(tagElement);
            });
        }

        card.appendChild(title);
        card.appendChild(meta);
        card.appendChild(preview);
        card.appendChild(tagsContainer);

        // Add click event to navigate to article
        card.addEventListener('click', () => {
            this.navigateToArticle(article.id);
        });

        return card;
    }

    navigateToArticle(articleId) {
        // Navigate to individual article page
        const currentPath = window.location.pathname;
        const articlePath = `/articles/${articleId}`;
        
        window.history.pushState({}, '', articlePath);
        
        // Trigger router to handle the new route
        const event = new PopStateEvent('popstate');
        window.dispatchEvent(event);
    }

    render() {
        return this.createElement();
    }
}