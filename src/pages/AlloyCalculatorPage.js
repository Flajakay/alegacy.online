import { CustomRangeSlider } from '../components/CustomRangeSlider.js';

export class AlloyCalculatorPage {
    constructor() {
        this.alloys = [
            {
                "name": "brass",
                "displayName": "Латунь",
                "count": 2,
                "metalls": ["copper", "zinc"],
                "prs": [[60,70], [30,40]]
            },
            {
                "name": "bismuthbronze",
                "displayName": "Висмутовая Бронза",
                "count": 3,
                "metalls": ["bismuth", "zinc", "copper"],
                "prs": [[10,20], [20,30], [50,70]]
            },
            {
                "name": "tinbronze",
                "displayName": "Оловянная Бронза",
                "count": 2,
                "metalls": ["copper", "tin"],
                "prs": [[88,92], [8,12]]
            },
            {
                "name": "blackbronze",
                "displayName": "Черная Бронза",
                "count": 3,
                "metalls": ["gold", "silver", "copper"],
                "prs": [[8,16], [8,16], [68,84]]
            },
            {
                "name": "molybdochalkos",
                "displayName": "Молибдохалк",
                "count": 2,
                "metalls": ["lead", "copper"],
                "prs": [[88,92], [8,12]]
            },
            {
                "name": "leadsolder",
                "displayName": "Свинцовый припой",
                "count": 2,
                "metalls": ["lead", "tin"],
                "prs": [[45,55], [45,55]]
            },
            {
                "name": "silversolder",
                "displayName": "Серебряный припой",
                "count": 2,
                "metalls": ["silver", "tin"],
                "prs": [[40,50], [50,60]]
            },
            {
                "name": "cupronickel",
                "displayName": "Мельхиор",
                "count": 2,
                "metalls": ["copper", "nickel"],
                "prs": [[65,75], [25,35]]
            },
            {
                "name": "electrum",
                "displayName": "Электрум",
                "count": 2,
                "metalls": ["silver", "gold"],
                "prs": [[40,60], [40,60]]
            }
        ];

        this.nuggets = {
            "copper": [
                "andesite","chalk","chert","conglomerate","claystone","granite","sandstone","shale","basalt","peridotite","phyllite","slate"
            ],
            "lead": [
                "chalk","chert","conglomerate","limestone","claystone","sandstone","shale"
            ],
            "tin": [
                "andesite","granite","basalt","peridotite","phyllite","slate"
            ],
            "bismuth": [
                "andesite","granite","basalt","peridotite","phyllite","slate"
            ],
            "zinc": [
                "andesite","chalk","chert","conglomerate","limestone","claystone","granite","sandstone","shale","basalt","peridotite","phyllite","slate"
            ],
            "gold": [
                "andesite","chalk","chert","conglomerate","limestone","claystone","granite","sandstone","shale","basalt","peridotite","phyllite","slate"
            ],
            "silver": [
                "andesite","chalk","chert","conglomerate","limestone","claystone","granite","sandstone","shale","basalt","peridotite","phyllite","slate"
            ],
            "nickel": [
                "andesite","granite","basalt","peridotite"
            ]
        };

        this.metalNames = {
            "copper": "Медь",
            "zinc": "Цинк",
            "bismuth": "Висмут",
            "tin": "Олово",
            "gold": "Золото",
            "silver": "Серебро",
            "lead": "Свинец",
            "nickel": "Никель"
        };

        this.rockNames = {
            "andesite": "Андезит",
            "chalk": "Мел",
            "chert": "Кремнистый сланец",
            "conglomerate": "Конгломерат",
            "claystone": "Аргиллит",
            "granite": "Гранит",
            "sandstone": "Песчаник",
            "shale": "Глинистый сланец",
            "basalt": "Базальт",
            "peridotite": "Перидотит",
            "phyllite": "Филлит",
            "slate": "Шифер",
            "limestone": "Известняк"
        };

        this.currentAlloy = null;
        this.currentPercentages = [];
        this.tooltip = null;
        this.metalSliders = [];
        this.ingotSlider = null;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'container';
        container.innerHTML = `
            <div class="content-panel">
                <h1>Калькулятор сплавов</h1>
                <div class="notice">
                    Инструмент для расчета рецептов сплавов в Vintage Story. Выберите сплав, настройте пропорции и получите точный рецепт для тигля.
                </div>

                <div class="alloy-selector-section">
                    <h2>Выбор сплава</h2>
                    <select id="alloySelect" class="alloy-select">
                        <option value="">-- Выберите сплав --</option>
                        ${this.alloys.map((alloy, index) => 
                            `<option value="${index}">${alloy.displayName}</option>`
                        ).join('')}
                    </select>
                </div>

                <div id="calculatorSection" class="calculator-section" style="display: none;">
                    <div class="metal-controls">
                        <h3>Настройка Пропорций</h3>
                        <div id="metalSliders" class="metal-sliders"></div>
                    </div>

                    <div class="result-section">
                        <h3>Результат</h3>
                        <div class="alloy-result">
                            <div id="alloyImage" class="alloy-image"></div>
                            <div class="ingot-controls">
                                <label for="ingotCount">Количество слитков:</label>
                                <div class="ingot-input-group">
                                    <span>1</span>
                                    <div id="ingotSliderContainer" class="ingot-slider-container ingot-slider-wide"></div>
                                    <span id="maxIngots">64</span>
                                </div>
                                <div id="currentIngotCount" class="current-count">Слитков: 1</div>
                            </div>
                        </div>

                        <div class="crucible-section">
                            <div class="crucible-grid" id="crucibleGrid">
                                <!-- Slots will be generated dynamically -->
                            </div>
                        </div>

                        <div id="errorMessage" class="error-message" style="display: none;"></div>
                    </div>
                </div>
            </div>
            <div id="tooltip" class="metal-tooltip" style="display: none;"></div>
        `;

        this.setupEventListeners(container);
        this.setupTooltips(container);
        return container;
    }

    setupTooltips(container) {
        const tooltip = container.querySelector('#tooltip');
        this.tooltip = tooltip;
        
        // Handle mouse movement for tooltip positioning
        document.addEventListener('mousemove', (e) => {
            if (tooltip.style.display === 'block') {
                tooltip.style.left = (e.pageX + 10) + 'px';
                tooltip.style.top = (e.pageY - 60) + 'px';
            }
        });
        
        // Handle mouse over images
        container.addEventListener('mouseover', (e) => {
            if (e.target.tagName === 'IMG' && (e.target.alt === 'copper' || e.target.alt === 'zinc' || e.target.alt === 'bismuth' || e.target.alt === 'tin' || e.target.alt === 'gold' || e.target.alt === 'silver' || e.target.alt === 'lead' || e.target.alt === 'nickel')) {
                const metalName = this.metalNames[e.target.alt];
                tooltip.innerHTML = `${metalName} (тык, чтобы посмотреть больше)`;
                tooltip.style.display = 'block';
                tooltip.style.left = (e.pageX + 10) + 'px';
                tooltip.style.top = (e.pageY - 20) + 'px';
            }
        });
        
        // Handle mouse out
        container.addEventListener('mouseout', (e) => {
            if (e.target.tagName === 'IMG') {
                tooltip.style.display = 'none';
            }
        });
        
        // Handle click on nugget images
        container.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG' && e.target.src.includes('Nugget') && e.target.alt) {
                const metal = e.target.alt;
                if (this.nuggets[metal]) {
                    const metalName = this.metalNames[metal];
                    let content = `<h3>${metalName} можно найти в:</h3>`;
                    
                    this.nuggets[metal].forEach(rock => {
                        content += `${this.rockNames[rock]}<br>`;
                    });
                    
                    tooltip.innerHTML = content;
                    tooltip.style.display = 'block';
                    tooltip.style.left = (e.pageX + 10) + 'px';
                    tooltip.style.top = (e.pageY - 20) + 'px';
                    
                    // Keep tooltip visible until next click elsewhere
                    e.stopPropagation();
                }
            }
        });
        
        // Hide tooltip on document click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.metal-tooltip') && !e.target.matches('img[src*="Nugget"]')) {
                tooltip.style.display = 'none';
            }
        });
    }

    setupEventListeners(container) {
        const alloySelect = container.querySelector('#alloySelect');
        const calculatorSection = container.querySelector('#calculatorSection');
        const ingotSliderContainer = container.querySelector('#ingotSliderContainer');

        alloySelect.addEventListener('change', (e) => {
            if (e.target.value === '') {
                calculatorSection.style.display = 'none';
                return;
            }

            const alloyIndex = parseInt(e.target.value);
            this.currentAlloy = this.alloys[alloyIndex];
            this.setupAlloyCalculator(container);
            calculatorSection.style.display = 'block';
        });

        // Create custom ingot slider
        if (this.ingotSlider) {
            this.ingotSlider.destroy();
        }
        
        this.ingotSlider = new CustomRangeSlider(ingotSliderContainer, {
            min: 1,
            max: 64,
            value: 1,
            onChange: () => {
                this.calculateRecipe(container);
            }
        });
    }

    setupAlloyCalculator(container) {
        const metalSliders = container.querySelector('#metalSliders');
        const alloyImage = container.querySelector('#alloyImage');
        
        // Clear existing sliders
        this.metalSliders.forEach(slider => slider.destroy());
        this.metalSliders = [];
        
        // Set alloy image
        alloyImage.innerHTML = `
            <img src="/images/Ingot-${this.currentAlloy.name}.png" alt="${this.currentAlloy.displayName}" class="alloy-img">
            <div class="alloy-name">${this.currentAlloy.displayName}</div>
        `;

        // Create metal sliders
        metalSliders.innerHTML = '';
        this.currentPercentages = [];

        for (let i = 0; i < this.currentAlloy.count; i++) {
            const metal = this.currentAlloy.metalls[i];
            const minPct = this.currentAlloy.prs[i][0];
            const maxPct = this.currentAlloy.prs[i][1];
            const defaultPct = Math.round((minPct + maxPct) / 2);
            
            this.currentPercentages.push(defaultPct);

            const isLast = (i === this.currentAlloy.count - 1);
            
            const sliderHTML = `
                <div class="metal-slider-container">
                    <div class="metal-info">
                        <img src="/images/Nugget-${metal}.png" alt="${metal}" class="metal-img">
                        <span class="metal-name">${this.metalNames[metal]}</span>
                    </div>
                    <div class="slider-controls">
                        <div id="slider${i}" class="slider-wrapper"></div>
                        <span id="percentage${i}" class="percentage-display">${defaultPct}%</span>
                    </div>
                </div>
            `;
            
            metalSliders.insertAdjacentHTML('beforeend', sliderHTML);
            
            // Create custom slider
            const sliderContainer = container.querySelector(`#slider${i}`);
            const customSlider = new CustomRangeSlider(sliderContainer, {
                min: minPct,
                max: maxPct,
                value: defaultPct,
                disabled: isLast,
                onChange: (value) => {
                    if (!isLast) {
                        this.updatePercentages(container, i, value);
                    }
                }
            });
            
            this.metalSliders.push(customSlider);
        }

        this.calculateRecipe(container);
    }

    updatePercentages(container, changedIndex, newValue) {
        this.currentPercentages[changedIndex] = newValue;
        
        // Update display
        container.querySelector(`#percentage${changedIndex}`).textContent = newValue + '%';
        
        // Calculate remaining percentage for the last metal
        let totalUsed = 0;
        for (let i = 0; i < this.currentAlloy.count - 1; i++) {
            totalUsed += this.currentPercentages[i];
        }
        
        const remainingPct = 100 - totalUsed;
        const lastIndex = this.currentAlloy.count - 1;
        this.currentPercentages[lastIndex] = remainingPct;
        container.querySelector(`#percentage${lastIndex}`).textContent = remainingPct + '%';
        
        this.calculateRecipe(container);
    }

    calculateSlots(ingotCount) {
        // Exact copy of the algorithm from page.html
        var slots = [];
        var metalls = [];
        var nug = [];
        var ppp = ingotCount;
        
        // Calculate nuggets for each metal (except the last one)
        for(var m = 1; m < this.currentAlloy.count; m++){
            var index = ppp * this.currentPercentages[m-1];
            for (var x = 5; x < index; x = x + 5 ){};
            x = (x <= ppp*(this.currentAlloy.prs[m-1][1]) ? x : x - 5);
            nug.push(x);
        }
        
        // Calculate the last metal percentage
        var lastRes = (m > 2 ? (ppp*100 - nug[0] - nug[1]): (ppp*100 - nug[0]));
        nug.push(lastRes);
        
        // Check if the last metal percentage is within valid range
        if(ppp*(this.currentAlloy.prs[m-1][0]) <= nug[nug.length-1] && ppp*(this.currentAlloy.prs[m-1][1]) >= nug[nug.length-1]){
            for (var n = 1; n <= nug.length; n++){
                var step = Math.floor(nug[n-1]/640);
                var total = nug[n-1]/5;
                for (var x = 0; x < step; x++){
                    slots.push(128);
                    metalls.push(this.currentAlloy.metalls[n-1]);
                    total = total - 128;
                }
                if(total !== 0 || step === 0){
                    slots.push(total);
                    metalls.push(this.currentAlloy.metalls[n-1]);
                }
            }
            
            // Convert to the format expected by displayCrucible
            var result = [];
            for(var i = 0; i < slots.length; i++){
                result.push({
                    metal: metalls[i],
                    count: slots[i]
                });
            }
            return result;
        } else {
            // Invalid proportions
            return null;
        }
    }

    calculateRecipe(container) {
        const ingotCount = this.ingotSlider ? this.ingotSlider.getValue() : 1;
        const currentCountDiv = container.querySelector('#currentIngotCount');
        const errorDiv = container.querySelector('#errorMessage');
        
        currentCountDiv.textContent = `Слитков: ${ingotCount}`;
        
        const slots = this.calculateSlots(ingotCount);
        
        if (slots === null) {
            errorDiv.textContent = 'Недопустимые пропорции! Настройте слайдеры.';
            errorDiv.style.display = 'block';
            this.clearCrucible(container);
            return;
        }
        
        errorDiv.style.display = 'none';
        this.displayCrucible(container, slots);
    }

    displayCrucible(container, slots) {
        const crucibleGrid = container.querySelector('#crucibleGrid');
        
        // Clear existing slots
        crucibleGrid.innerHTML = '';
        
        // Generate slots dynamically based on the number needed
        if (slots && Array.isArray(slots)) {
            for (let i = 0; i < slots.length; i++) {
                const slot = slots[i];
                
                // Create slot element
                const slotElement = document.createElement('div');
                slotElement.className = 'crucible-slot';
                slotElement.id = `slot${i + 1}`;
                
                // Create image container
                const imageDiv = document.createElement('div');
                imageDiv.className = 'crucible-image';
                imageDiv.innerHTML = `<img src="/images/Nugget-${slot.metal}.png" alt="${slot.metal}" class="crucible-nugget-img">`;
                
                // Create count container
                const countDiv = document.createElement('div');
                countDiv.className = 'crucible-count';
                countDiv.textContent = slot.count;
                
                // Assemble slot
                slotElement.appendChild(imageDiv);
                slotElement.appendChild(countDiv);
                slotElement.classList.add('filled');
                
                // Add to grid
                crucibleGrid.appendChild(slotElement);
            }
        }
    }

    clearCrucible(container) {
        const crucibleGrid = container.querySelector('#crucibleGrid');
        if (crucibleGrid) {
            crucibleGrid.innerHTML = '';
        }
    }
}
