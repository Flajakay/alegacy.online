export class CustomRangeSlider {
    constructor(container, options = {}) {
        this.container = container;
        this.min = options.min || 0;
        this.max = options.max || 100;
        this.value = options.value || this.min;
        this.disabled = options.disabled || false;
        this.onChange = options.onChange || (() => {});
        
        this.isDragging = false;
        this.element = null;
        this.thumb = null;
        this.track = null;
        
        this.init();
    }
    
    init() {
        this.createElement();
        this.setupEventListeners();
        this.updatePosition();
    }
    
    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'custom-range-slider';
        if (this.disabled) this.element.classList.add('disabled');
        
        this.element.innerHTML = `
            <div class="range-track">
                <div class="range-fill"></div>
            </div>
            <div class="range-thumb">
                <div class="thumb-inner"></div>
            </div>
        `;
        
        this.track = this.element.querySelector('.range-track');
        this.fill = this.element.querySelector('.range-fill');
        this.thumb = this.element.querySelector('.range-thumb');
        
        this.container.appendChild(this.element);
    }
    
    setupEventListeners() {
        if (this.disabled) return;
        
        // Bind methods to maintain 'this' context
        this.boundHandleMouseMove = this.handleMouseMove.bind(this);
        this.boundHandleMouseUp = this.handleMouseUp.bind(this);
        this.boundHandleTouchMove = this.handleTouchMove.bind(this);
        this.boundHandleTouchEnd = this.handleTouchEnd.bind(this);
        
        // Mouse events
        this.thumb.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.track.addEventListener('mousedown', this.handleTrackClick.bind(this));
        
        // Touch events for mobile
        this.thumb.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        
        // Keyboard events
        this.element.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.element.setAttribute('tabindex', '0');
    }
    
    handleMouseDown(e) {
        e.preventDefault();
        this.startDrag();
    }
    
    handleTouchStart(e) {
        e.preventDefault();
        this.startDrag();
    }
    
    startDrag() {
        this.isDragging = true;
        this.element.classList.add('dragging');
        document.body.style.userSelect = 'none';
        
        // Add document event listeners for dragging
        document.addEventListener('mousemove', this.boundHandleMouseMove);
        document.addEventListener('mouseup', this.boundHandleMouseUp);
        document.addEventListener('touchmove', this.boundHandleTouchMove, { passive: false });
        document.addEventListener('touchend', this.boundHandleTouchEnd);
    }
    
    handleMouseMove(e) {
        if (!this.isDragging) return;
        this.updateValueFromPosition(e.clientX);
    }
    
    handleTouchMove(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        this.updateValueFromPosition(e.touches[0].clientX);
    }
    
    handleMouseUp() {
        this.stopDrag();
    }
    
    handleTouchEnd() {
        this.stopDrag();
    }
    
    stopDrag() {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.element.classList.remove('dragging');
        document.body.style.userSelect = '';
        
        // Remove document event listeners
        document.removeEventListener('mousemove', this.boundHandleMouseMove);
        document.removeEventListener('mouseup', this.boundHandleMouseUp);
        document.removeEventListener('touchmove', this.boundHandleTouchMove);
        document.removeEventListener('touchend', this.boundHandleTouchEnd);
    }
    
    handleTrackClick(e) {
        if (this.isDragging || e.target === this.thumb) return;
        this.updateValueFromPosition(e.clientX);
    }
    
    handleKeyDown(e) {
        const step = (this.max - this.min) / 10;
        let newValue = this.value;
        
        switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowDown':
                newValue = Math.max(this.min, this.value - step);
                break;
            case 'ArrowRight':
            case 'ArrowUp':
                newValue = Math.min(this.max, this.value + step);
                break;
            case 'Home':
                newValue = this.min;
                break;
            case 'End':
                newValue = this.max;
                break;
            default:
                return;
        }
        
        e.preventDefault();
        this.setValue(newValue);
    }
    
    updateValueFromPosition(clientX) {
        const rect = this.track.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const newValue = this.min + (this.max - this.min) * percentage;
        this.setValue(Math.round(newValue));
    }
    
    setValue(value) {
        const oldValue = this.value;
        this.value = Math.max(this.min, Math.min(this.max, value));
        
        if (oldValue !== this.value) {
            this.updatePosition();
            this.onChange(this.value);
        }
    }
    
    updatePosition() {
        const percentage = (this.value - this.min) / (this.max - this.min) * 100;
        
        this.thumb.style.left = `${percentage}%`;
        this.fill.style.width = `${percentage}%`;
    }
    
    setMin(min) {
        this.min = min;
        if (this.value < min) this.setValue(min);
        this.updatePosition();
    }
    
    setMax(max) {
        this.max = max;
        if (this.value > max) this.setValue(max);
        this.updatePosition();
    }
    
    setDisabled(disabled) {
        this.disabled = disabled;
        if (disabled) {
            this.element.classList.add('disabled');
            this.element.setAttribute('tabindex', '-1');
        } else {
            this.element.classList.remove('disabled');
            this.element.setAttribute('tabindex', '0');
        }
    }
    
    getValue() {
        return this.value;
    }
    
    destroy() {
        if (this.isDragging) {
            this.stopDrag();
        }
        
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}