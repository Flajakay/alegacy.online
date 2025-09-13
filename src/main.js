import './styles.css';
import './articles.css';
import './alloy.css';
import './custom-range-slider.css';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { Router } from './utils/router.js';

class App {
    constructor() {
        this.init();
    }

    init() {
        // Get the app container
        const appContainer = document.querySelector('#app');
        
        // Create main layout structure
        this.createLayout(appContainer);
        
        // Initialize components
        this.header = new Header();
        this.footer = new Footer();
        
        // Insert header and footer
        const headerContainer = document.querySelector('#header-container');
        const footerContainer = document.querySelector('#footer-container');
        const mainContainer = document.querySelector('#main-container');
        
        headerContainer.appendChild(this.header.render());
        footerContainer.appendChild(this.footer.render());
        
        // Initialize router
        this.router = new Router(mainContainer, this.header);
        
        // Add global event listeners
        this.setupGlobalEventListeners();
    }

    createLayout(container) {
        container.innerHTML = `
            <div id="header-container"></div>
            <div id="main-container"></div>
            <div id="footer-container"></div>
        `;
    }

    setupGlobalEventListeners() {
        // Add any global event listeners here
        document.addEventListener('DOMContentLoaded', () => {
            // Page is fully loaded
        });

        // Add smooth scrolling for anchor links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
}

// Initialize the application
new App();
