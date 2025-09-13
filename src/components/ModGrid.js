export class ModItem {
    constructor(mod) {
        this.mod = mod;
    }

    createElement() {
        const modItem = document.createElement('div');
        modItem.className = 'mod-item';
        modItem.innerHTML = `
            <div class="mod-name">${this.mod.name}</div>
            <div class="mod-version">Версия: ${this.mod.version}</div>
            <div class="mod-description">${this.mod.description}</div>
            <a href="${this.mod.url}" class="download-btn" target="_blank">Детали</a>
        `;
        return modItem;
    }

    render() {
        return this.createElement();
    }
}

export class ModGrid {
    constructor(mods) {
        this.mods = mods;
    }

    createElement() {
        const modGrid = document.createElement('div');
        modGrid.className = 'mod-grid';
        
        this.mods.forEach(mod => {
            const modItem = new ModItem(mod);
            modGrid.appendChild(modItem.render());
        });

        return modGrid;
    }

    render() {
        return this.createElement();
    }
}
