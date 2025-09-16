export class Header {
    constructor() {
        this.element = this.createElement();
        this.setupMobileMenu();
        this.setupDropdowns();
    }

    createElement() {
        const header = document.createElement('header');
        header.className = 'header';
        header.innerHTML = `
            <div class="nav-container">
                <a href="/" class="logo">ASHEN LEGACY</a>
                <button class="mobile-menu-toggle" id="mobileMenuToggle">
                    ☰
                </button>
                <nav>
                    <ul class="nav-menu" id="navMenu">
                        <li><a href="/" class="nav-link" data-page="home">Главная</a></li>
                        <li class="dropdown">
                            <a href="#" class="nav-link dropdown-toggle">Полезное</a>
                            <ul class="dropdown-menu">
                                <li><a href="/news" class="nav-link" data-page="news">Новости</a></li>
								<li><a href="/articles" class="nav-link" data-page="articles">Статьи</a></li>
                                <li><a href="/mods" class="nav-link" data-page="mods">Моды</a></li>
                                <li><a href="/alloy-calculator" class="nav-link" data-page="alloy-calculator">Калькулятор</a></li>
                            </ul>
                        </li>
                        <li><a href="/rules" class="nav-link" data-page="rules">Правила</a></li>
                        <li class="dropdown">
                            <a href="#" class="nav-link dropdown-toggle">Ссылки</a>
                            <ul class="dropdown-menu">
                                <li><a href="https://discord.gg/KAcAzmJ" class="nav-link" target="_blank">Дискорд</a></li>
                                <li><a href="https://t.me/ashenlegacy" class="nav-link" target="_blank">Телеграм</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="mobile-menu-overlay" id="mobileMenuOverlay"></div>
        `;
        return header;
    }

    setupDropdowns() {
        const dropdowns = this.element.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (!toggle || !menu) return;

            // Desktop hover behavior
            dropdown.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    menu.classList.add('active');
                }
            });

            dropdown.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) {
                    menu.classList.remove('active');
                }
            });

            // Mobile click behavior
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const isActive = menu.classList.contains('active');
                    
                    // Close all other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.querySelector('.dropdown-menu').classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    if (isActive) {
                        menu.classList.remove('active');
                    } else {
                        menu.classList.add('active');
                    }
                }
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(dropdown => {
                    const menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) {
                        menu.classList.remove('active');
                    }
                });
            }
        });
    }

    setupMobileMenu() {
        const mobileMenuToggle = this.element.querySelector('#mobileMenuToggle');
        const navMenu = this.element.querySelector('#navMenu');
        const mobileMenuOverlay = this.element.querySelector('#mobileMenuOverlay');
        const navLinks = this.element.querySelectorAll('.nav-link');

        if (!mobileMenuToggle || !navMenu || !mobileMenuOverlay) {
            return;
        }

        const toggleMenu = () => {
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                this.closeMenu();
            } else {
                this.openMenu();
            }
        };

        mobileMenuToggle.addEventListener('click', toggleMenu);
        mobileMenuOverlay.addEventListener('click', () => this.closeMenu());

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Don't close menu for dropdown toggles
                if (!link.classList.contains('dropdown-toggle')) {
                    this.closeMenu();
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMenu();
                // Close all dropdowns on resize
                const dropdowns = this.element.querySelectorAll('.dropdown-menu');
                dropdowns.forEach(menu => menu.classList.remove('active'));
            }
        });
    }

    openMenu() {
        const navMenu = this.element.querySelector('#navMenu');
        const mobileMenuOverlay = this.element.querySelector('#mobileMenuOverlay');
        const mobileMenuToggle = this.element.querySelector('#mobileMenuToggle');

        navMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        mobileMenuToggle.innerHTML = '';
        document.body.style.overflow = 'hidden';
    }

    closeMenu() {
        const navMenu = this.element.querySelector('#navMenu');
        const mobileMenuOverlay = this.element.querySelector('#mobileMenuOverlay');
        const mobileMenuToggle = this.element.querySelector('#mobileMenuToggle');

        navMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileMenuToggle.innerHTML = '☰';
        document.body.style.overflow = '';

        // Close all dropdowns when closing mobile menu
        const dropdowns = this.element.querySelectorAll('.dropdown-menu');
        dropdowns.forEach(menu => menu.classList.remove('active'));
    }

    setActiveLink(page) {
        const navLinks = this.element.querySelectorAll('.nav-link[data-page]');
        navLinks.forEach(link => {
            if (link.dataset.page === page) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    render() {
        return this.element;
    }
}