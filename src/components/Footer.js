export class Footer {
    constructor() {
        this.element = this.createElement();
    }

    createElement() {
        const footer = document.createElement('footer');
        footer.className = 'footer';
        footer.innerHTML = `
            <p>&copy; 2025 Ashen Legacy. Vintage Story - игра от Anego Studios.</p>
            <p>Сайт создан для сообщества игроков. Все права на игру принадлежат разработчикам.</p>
        `;
        return footer;
    }

    render() {
        return this.element;
    }
}
