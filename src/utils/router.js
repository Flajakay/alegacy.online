import { HomePage } from '../pages/HomePage.js';
import { NewsPage } from '../pages/NewsPage.js';
import { ModsPage } from '../pages/ModsPage.js';
import { RulesPage } from '../pages/RulesPage.js';
import { ArticlesPage } from '../pages/ArticlesPage.js';
import { ArticlePage } from '../pages/ArticlePage.js';
import { AlloyCalculatorPage } from '../pages/AlloyCalculatorPage.js';

export class Router {
    constructor(app, header) {
        this.app = app;
        this.header = header;
        this.routes = {
            '/': HomePage,
            '/news': NewsPage,
            '/mods': ModsPage,
            '/rules': RulesPage,
            '/articles': ArticlesPage,
            '/alloy-calculator': AlloyCalculatorPage
        };
        this.currentPage = null;
        this.setupEventListeners();
        this.handleInitialRoute();
    }

    setupEventListeners() {
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-link[data-page]')) {
                e.preventDefault();
                const page = e.target.dataset.page;
                this.navigateTo(this.getRouteFromPage(page));
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.handleRoute(window.location.pathname);
        });
    }

    getRouteFromPage(page) {
        const pageRoutes = {
            'home': '/',
            'news': '/news',
            'mods': '/mods',
            'rules': '/rules',
            'articles': '/articles',
            'alloy-calculator': '/alloy-calculator'
        };
        return pageRoutes[page] || '/';
    }

    getPageFromRoute(route) {
        const routePages = {
            '/': 'home',
            '/news': 'news',
            '/mods': 'mods',
            '/rules': 'rules',
            '/articles': 'articles',
            '/alloy-calculator': 'alloy-calculator'
        };
        return routePages[route] || 'home';
    }

    navigateTo(path) {
        window.history.pushState({}, '', path);
        this.handleRoute(path);
    }

    handleInitialRoute() {
        const path = window.location.pathname;
        this.handleRoute(path);
    }

    handleRoute(path) {
        let PageClass;
        let pageParams = null;
        
        // Check for individual article routes
        if (path.startsWith('/articles/')) {
            const articleId = path.split('/articles/')[1];
            PageClass = ArticlePage;
            pageParams = articleId;
        } else {
            PageClass = this.routes[path] || this.routes['/'];
        }
        
        // Clear current content
        this.app.innerHTML = '';
        
        // Create and render new page
        this.currentPage = pageParams ? new PageClass(pageParams) : new PageClass();
        const pageElement = this.currentPage.render();
        this.app.appendChild(pageElement);
        
        // Update active nav link
        const page = path.startsWith('/articles') ? 'articles' : this.getPageFromRoute(path);
        this.header.setActiveLink(page);
        
        // Update document title
        this.updateTitle(path);
        
        // Call afterRender if it exists
        if (this.currentPage.afterRender) {
            this.currentPage.afterRender();
        }
        
        // Re-initialize animations and effects
        this.initializePageEffects();
    }

    updateTitle(path) {
        const titles = {
            '/': 'ASHEN LEGACY - Главная',
            '/news': 'ASHEN LEGACY - Новости',
            '/mods': 'ASHEN LEGACY - Моды',
            '/rules': 'ASHEN LEGACY - Правила',
            '/articles': 'ASHEN LEGACY - Статьи',
            '/alloy-calculator': 'ASHEN LEGACY - Калькулятор Сплавов'
        };
        
        if (path.startsWith('/articles/')) {
            document.title = 'ASHEN LEGACY - Статья';
        } else {
            document.title = titles[path] || 'ASHEN LEGACY';
        }
    }

    initializePageEffects() {
        // Import and call animation functions
        import('../utils/animations.js').then(({ addTypingEffect, addFadeInAnimations, addClickSounds, addFlickerEffect }) => {
            addTypingEffect();
            addFadeInAnimations();
            addClickSounds();
            addFlickerEffect();
        });
    }
}
