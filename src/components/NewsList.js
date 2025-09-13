export class NewsArticle {
    constructor(article) {
        this.article = article;
    }

    createElement() {
        const newsArticle = document.createElement('article');
        newsArticle.className = 'news-article';
        newsArticle.innerHTML = `
            <div class="news-date">${this.article.date}</div>
            <div class="news-content">
                <h3>${this.article.title}</h3>
                ${this.article.content}
            </div>
        `;
        return newsArticle;
    }

    render() {
        return this.createElement();
    }
}

export class NewsList {
    constructor(articles) {
        this.articles = articles;
    }

    createElement() {
        const newsContainer = document.createElement('div');
        
        this.articles.forEach(article => {
            const newsArticle = new NewsArticle(article);
            newsContainer.appendChild(newsArticle.render());
        });

        return newsContainer;
    }

    render() {
        return this.createElement();
    }
}
