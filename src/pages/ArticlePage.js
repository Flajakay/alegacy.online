export class ArticlePage {
    constructor(articleId) {
        this.articleId = articleId;
        this.article = null;
        this.loadArticle();
    }

    async loadArticle() {
        try {
            const module = await import(`../data/articles/${this.articleId}.js`);
            this.article = module.article;
            this.updateContent();
        } catch (error) {
            console.error('Error loading article:', error);
            this.showError('Статья не найдена.');
        }
    }

    createElement() {
        const main = document.createElement('main');
        main.className = 'container';
        
        this.contentContainer = document.createElement('div');
        this.contentContainer.innerHTML = '<div class="articles-loading">Загрузка статьи...</div>';
        
        main.appendChild(this.contentContainer);
        
        return main;
    }

    updateContent() {
        if (!this.article || !this.contentContainer) return;

        this.contentContainer.innerHTML = '';

        // Back button
        const backButton = document.createElement('a');
        backButton.href = '/articles';
        backButton.className = 'back-to-articles';
        backButton.textContent = 'Назад к статьям';
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigateToArticles();
        });

        // Article content panel
        const articlePanel = document.createElement('div');
        articlePanel.className = 'content-panel';

        // Article header
        const header = document.createElement('div');
        header.className = 'article-header';

        const title = document.createElement('h1');
        title.className = 'typing-effect';
        title.textContent = this.article.title;

/*         const meta = document.createElement('div');
        meta.className = 'article-meta';

        const date = document.createElement('span');
        date.className = 'article-date';
        date.textContent = this.article.date;

        const author = document.createElement('span');
        author.className = 'article-author';
        author.textContent = `Автор: ${this.article.author}`;

        meta.appendChild(date);
        meta.appendChild(author);

        // Tags
        if (this.article.tags && this.article.tags.length > 0) {
            const tagsContainer = document.createElement('div');
            tagsContainer.className = 'article-tags';
            tagsContainer.style.marginTop = '15px';

            this.article.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'article-tag';
                tagElement.textContent = tag;
                tagsContainer.appendChild(tagElement);
            });

            meta.appendChild(tagsContainer);
        }

        
        header.appendChild(meta); */
		header.appendChild(title);
        // Article content
        const content = document.createElement('div');
        content.className = 'article-content';

        if (this.article.content && Array.isArray(this.article.content)) {
            this.article.content.forEach(block => {
                const element = this.createContentBlock(block);
                if (element) {
                    content.appendChild(element);
                }
            });
        }

        articlePanel.appendChild(header);
        articlePanel.appendChild(content);

        this.contentContainer.appendChild(backButton);
        this.contentContainer.appendChild(articlePanel);
    }

    createContentBlock(block) {
        if (!block || !block.type || !block.value) return null;

        switch (block.type) {
            case 'text':
                return this.createTextBlock(block.value);
            case 'video':
                return this.createVideoBlock(block.value);
            case 'image':
                return this.createImageBlock(block.value, block.alt);
            case 'gallery':
                return this.createGalleryBlock(block.value);
            default:
                console.warn('Unknown block type:', block.type);
                return null;
        }
    }

    createTextBlock(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div;
    }

    createVideoBlock(iframe) {
        const container = document.createElement('div');
        container.className = 'video-container';

        const wrapper = document.createElement('div');
        wrapper.className = 'video-wrapper';
        wrapper.innerHTML = iframe;

        container.appendChild(wrapper);
        return container;
    }

    createImageBlock(src, alt = '') {
        const container = document.createElement('div');
        container.className = 'image-container';

        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.className = 'article-image';

        container.appendChild(img);
        return container;
    }

    createGalleryBlock(images) {
        const container = document.createElement('div');
        container.className = 'gallery-container';

        const gallery = document.createElement('div');
        gallery.className = 'gallery-grid';

        images.forEach((image, index) => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'gallery-item';

            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt || `Изображение ${index + 1}`;
            img.className = 'gallery-image';

            // Add click handler for lightbox effect
            img.addEventListener('click', () => {
                this.openLightbox(image.src, image.alt);
            });

            imgContainer.appendChild(img);
            gallery.appendChild(imgContainer);
        });

        container.appendChild(gallery);
        return container;
    }

    openLightbox(src, alt) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';

        const lightboxContent = document.createElement('div');
        lightboxContent.className = 'lightbox-content';

        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.className = 'lightbox-image';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });

        // Close on overlay click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });

        // Close on Escape key
        const handleKeyPress = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(lightbox);
                document.removeEventListener('keydown', handleKeyPress);
            }
        };
        document.addEventListener('keydown', handleKeyPress);

        lightboxContent.appendChild(img);
        lightboxContent.appendChild(closeBtn);
        lightbox.appendChild(lightboxContent);
        document.body.appendChild(lightbox);
    }

    navigateToArticles() {
        window.history.pushState({}, '', '/articles');
        const event = new PopStateEvent('popstate');
        window.dispatchEvent(event);
    }

    showError(message) {
        if (this.contentContainer) {
            this.contentContainer.innerHTML = `
                <div class="content-panel">
                    <div class="articles-error">${message}</div>
                    <a href="/articles" class="back-to-articles">Назад к статьям</a>
                </div>
            `;

            // Add event listener to back button
            const backButton = this.contentContainer.querySelector('.back-to-articles');
            if (backButton) {
                backButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.navigateToArticles();
                });
            }
        }
    }

    afterRender() {
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
