class EasterEggs {
    constructor(balder) {
        this.balder = balder;
        this.discoveredEggs = this.loadDiscoveredEggs();
        
        // Define all easter eggs with their locations and rewards
        this.easterEggData = {
            'portfolio_logo': {
                id: 'portfolio_logo',
                name: 'Hidden Logo',
                description: 'Found the secret in the portfolio logo!',
                selector: '.logo span',
                rarity: 'common',
                reward: {
                    image: 'assets/Balder/lovelymode.png',
                    phrase: "Nice find! You discovered my secret logo! 💖"
                },
                hint: "Look for something that glows red..."
            },
            'profile_image': {
                id: 'profile_image',
                name: 'Profile Secret',
                description: 'Clicked on the mysterious profile image',
                selector: '.profile-img',
                rarity: 'common',
                reward: {
                    image: 'assets/Balder/shymode.png',
                    phrase: "Oh! You found me hiding in the profile! 😳"
                },
                hint: "The floating image holds secrets..."
            },
            'neon_border': {
                id: 'neon_border',
                name: 'Neon Mystery',
                description: 'Discovered the hidden power in the neon effects',
                selector: '.skill-item:nth-child(3)',
                rarity: 'uncommon',
                reward: {
                    image: 'assets/Balder/partymode.png',
                    phrase: "PARTY TIME! You found the neon secret! 🎉"
                },
                hint: "Third time's the charm in skills..."
            },
            'contact_icon': {
                id: 'contact_icon',
                name: 'Contact Secret',
                description: 'Found the hidden message in contact',
                selector: '.contact-icon:first-child',
                rarity: 'common',
                reward: {
                    image: 'assets/Balder/sleepymode.png',
                    phrase: "Sleepy secret in the contact... zzz... 😴"
                },
                hint: "First contact holds a secret..."
            },
            'tech_stack': {
                id: 'tech_stack',
                name: 'Tech Wizard',
                description: 'Uncovered the secret of the tech stack',
                selector: '.project-tech span:nth-child(2)',
                rarity: 'rare',
                reward: {
                    image: 'assets/Balder/rainbowmode.png',
                    phrase: "Rainbow power! You're a tech wizard! 🌈✨"
                },
                hint: "Second technology in any project..."
            },
            'social_mystery': {
                id: 'social_mystery',
                name: 'Social Hunter',
                description: 'Discovered the social media secret',
                selector: '.social-icon:nth-child(2)',
                rarity: 'uncommon',
                reward: {
                    image: 'assets/Balder/lovelymode.png',
                    phrase: "Social butterfly! Love this discovery! 💕"
                },
                hint: "Professional networks hide secrets..."
            },
            'floating_element': {
                id: 'floating_element',
                name: 'Float Master',
                description: 'Found the secret in the floating animation',
                selector: '.glow-effect',
                rarity: 'rare',
                reward: {
                    image: 'assets/Balder/partymode.png',
                    phrase: "You mastered the float! Party time! 🎊"
                },
                hint: "Something that glows and floats..."
            },
            'hidden_footer': {
                id: 'hidden_footer',
                name: 'Footer Explorer',
                description: 'Explored the deepest secrets',
                selector: 'body',
                rarity: 'legendary',
                reward: {
                    image: 'assets/Balder/rainbowmode.png',
                    phrase: "LEGENDARY! You are the ultimate explorer! 🏆"
                },
                hint: "Sometimes the biggest secrets hide in plain sight...",
                special: true,
                clickCount: 10 // Requires 10 clicks on body
            }
        };
        
        this.bodyClickCount = 0;
        this.init();
    }
    
    init() {
        this.setupEasterEggListeners();
        this.addEasterEggStyles();
        this.createBaldersMenu();
    }
    
    loadDiscoveredEggs() {
        const saved = localStorage.getItem('discoveredEasterEggs');
        return saved ? JSON.parse(saved) : [];
    }
    
    saveDiscoveredEggs() {
        localStorage.setItem('discoveredEasterEggs', JSON.stringify(this.discoveredEggs));
    }
    
    setupEasterEggListeners() {
        Object.values(this.easterEggData).forEach(egg => {
            if (egg.special && egg.id === 'hidden_footer') {
                // Special handling for body clicks
                document.body.addEventListener('click', (e) => {
                    // Only count if not clicking on other interactive elements
                    if (!e.target.closest('a, button, input, textarea, .project-card, .nav-link, .btn, .modal')) {
                        this.bodyClickCount++;
                        if (this.bodyClickCount >= egg.clickCount && !this.discoveredEggs.includes(egg.id)) {
                            this.discoverEasterEgg(egg);
                        }
                    }
                });
            } else {
                const elements = document.querySelectorAll(egg.selector);
                elements.forEach(element => {
                    if (element) {
                        element.style.cursor = 'pointer';
                        element.addEventListener('click', (e) => {
                            e.preventDefault();
                            if (!this.discoveredEggs.includes(egg.id)) {
                                this.discoverEasterEgg(egg);
                            } else {
                                this.showAlreadyDiscovered(egg);
                            }
                        });
                        
                        // Add subtle visual hints
                        this.addVisualHint(element, egg.rarity);
                    }
                });
            }
        });
    }
    
    addVisualHint(element, rarity) {
        const hintClass = `easter-egg-hint-${rarity}`;
        element.classList.add('easter-egg-element', hintClass);
        
        // Add subtle glow animation on hover
        element.addEventListener('mouseenter', () => {
            element.style.filter = 'brightness(1.1) drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.filter = '';
        });
    }
    
    discoverEasterEgg(egg) {
        this.discoveredEggs.push(egg.id);
        this.saveDiscoveredEggs();
        
        // Change Balder's appearance
        if (egg.reward.image) {
            this.changeBaldersAppearance(egg.reward.image);
        }
        
        // Make Balder speak
        if (egg.reward.phrase) {
            setTimeout(() => {
                this.balder.speak(null, egg.reward.phrase);
                this.balder.playBounceAnimation();
            }, 500);
        }
        
        // Show discovery notification
        this.showDiscoveryNotification(egg);
        
        // Add visual celebration
        this.celebrateDiscovery(egg.rarity);
        
        console.log(`Easter egg discovered: ${egg.name} (${egg.rarity})`);
    }
    
    showAlreadyDiscovered(egg) {
        this.balder.speak(null, "You already found this one! Check the gallery to see all discoveries! 📚");
    }
    
    changeBaldersAppearance(newAsset) {
        const baldersImg = document.getElementById('balder-img');
        if (baldersImg) {
            baldersImg.style.transition = 'all 0.5s ease';
            baldersImg.style.transform = 'scale(0)';
            
            setTimeout(() => {
                baldersImg.src = newAsset;
                baldersImg.style.transform = 'scale(1.2)';
                
                setTimeout(() => {
                    baldersImg.style.transform = 'scale(1)';
                }, 300);
            }, 250);
        }
    }
    
    showDiscoveryNotification(egg) {
        const notification = document.createElement('div');
        notification.className = 'easter-egg-notification';
        notification.innerHTML = `
            <div class="notification-header">
                <i class="fa-solid fa-star"></i>
                <span class="rarity ${egg.rarity}">${egg.rarity.toUpperCase()}</span>
            </div>
            <div class="notification-content">
                <h4>${egg.name}</h4>
                <p>${egg.description}</p>
            </div>
            <div class="notification-progress">
                ${this.discoveredEggs.length}/${Object.keys(this.easterEggData).length} discovered
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
    
    celebrateDiscovery(rarity) {
        const celebrationMap = {
            'common': { emoji: '✨', count: 10, duration: 2000 },
            'uncommon': { emoji: '🎉', count: 15, duration: 3000 },
            'rare': { emoji: '🌟', count: 20, duration: 4000 },
            'legendary': { emoji: '🏆', count: 30, duration: 5000 }
        };
        
        const celebration = celebrationMap[rarity] || celebrationMap.common;
        
        for (let i = 0; i < celebration.count; i++) {
            setTimeout(() => {
                this.createFloatingElement(celebration.emoji, 'celebration-float');
            }, i * (celebration.duration / celebration.count));
        }
    }
    
    createFloatingElement(content, className) {
        const element = document.createElement('div');
        element.textContent = content;
        element.className = `floating-element ${className}`;
        element.style.position = 'fixed';
        element.style.fontSize = '2rem';
        element.style.pointerEvents = 'none';
        element.style.zIndex = '9999';
        element.style.left = Math.random() * window.innerWidth + 'px';
        element.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(element);
        
        element.animate([
            { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(-${window.innerHeight + 200}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: 3000,
            easing: 'ease-out'
        }).onfinish = () => {
            element.remove();
        };
    }
    
    createBaldersMenu() {
        // Add click listener to Balder for menu
        const baldersCharacter = document.getElementById('balder-character');
        if (baldersCharacter) {
            let clickCount = 0;
            baldersCharacter.addEventListener('click', (e) => {
                clickCount++;
                if (clickCount === 1) {
                    // First click - normal behavior (already handled by Balder class)
                    setTimeout(() => clickCount = 0, 500);
                } else if (clickCount >= 2) {
                    // Double click - show menu
                    e.stopPropagation();
                    this.showBaldersMenu();
                    clickCount = 0;
                }
            });
        }
    }
    
    showBaldersMenu() {
        // Remove existing menu if present
        const existingMenu = document.querySelector('.balders-menu');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }
        
        const menu = document.createElement('div');
        menu.className = 'balders-menu';
        menu.innerHTML = `
            <div class="menu-header">
                <i class="fa-solid fa-dog"></i>
                <h3>Balder's Menu</h3>
                <button class="menu-close">&times;</button>
            </div>
            <div class="menu-content">
                <button class="menu-option" id="easter-egg-gallery">
                    <i class="fa-solid fa-image"></i>
                    <span>Easter Egg Gallery</span>
                    <div class="option-info">${this.discoveredEggs.length}/${Object.keys(this.easterEggData).length}</div>
                </button>
                <button class="menu-option disabled">
                    <i class="fa-solid fa-gamepad"></i>
                    <span>Mini Games</span>
                    <div class="option-info">Coming Soon</div>
                </button>
                <button class="menu-option disabled">
                    <i class="fa-solid fa-cog"></i>
                    <span>Settings</span>
                    <div class="option-info">Coming Soon</div>
                </button>
                <button class="menu-option disabled">
                    <i class="fa-solid fa-trophy"></i>
                    <span>Achievements</span>
                    <div class="option-info">Coming Soon</div>
                </button>
            </div>
        `;
        
        document.body.appendChild(menu);
        
        // Add event listeners
        const closeBtn = menu.querySelector('.menu-close');
        closeBtn.addEventListener('click', () => menu.remove());
        
        const galleryBtn = menu.querySelector('#easter-egg-gallery');
        galleryBtn.addEventListener('click', () => {
            menu.remove();
            this.showEasterEggGallery();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.balders-menu') && !e.target.closest('#balder-character')) {
                menu.remove();
            }
        }, { once: true });
        
        // Animate in
        setTimeout(() => menu.classList.add('show'), 10);
    }
    
    showEasterEggGallery() {
        const gallery = document.createElement('div');
        gallery.className = 'easter-egg-gallery';
        
        const galleryContent = Object.values(this.easterEggData).map(egg => {
            const discovered = this.discoveredEggs.includes(egg.id);
            return `
                <div class="gallery-item ${discovered ? 'discovered' : 'locked'} ${egg.rarity}">
                    <div class="item-image">
                        ${discovered ? 
                            `<img src="${egg.reward.image}" alt="${egg.name}">` :
                            '<i class="fa-solid fa-question"></i>'
                        }
                    </div>
                    <div class="item-info">
                        <h4>${discovered ? egg.name : '???'}</h4>
                        <p class="rarity">${discovered ? egg.rarity.toUpperCase() : 'LOCKED'}</p>
                        <p class="description">${discovered ? egg.description : egg.hint}</p>
                    </div>
                    ${discovered ? '<div class="item-status"><i class="fa-solid fa-check"></i></div>' : ''}
                </div>
            `;
        }).join('');
        
        gallery.innerHTML = `
            <div class="gallery-header">
                <h2>Easter Egg Gallery</h2>
                <button class="gallery-close">&times;</button>
            </div>
            <div class="gallery-stats">
                <div class="stat">
                    <span class="number">${this.discoveredEggs.length}</span>
                    <span class="label">Discovered</span>
                </div>
                <div class="stat">
                    <span class="number">${Object.keys(this.easterEggData).length - this.discoveredEggs.length}</span>
                    <span class="label">Remaining</span>
                </div>
                <div class="stat">
                    <span class="number">${Math.round((this.discoveredEggs.length / Object.keys(this.easterEggData).length) * 100)}%</span>
                    <span class="label">Complete</span>
                </div>
            </div>
            <div class="gallery-grid">
                ${galleryContent}
            </div>
        `;
        
        document.body.appendChild(gallery);
        
        // Add close functionality
        const closeBtn = gallery.querySelector('.gallery-close');
        closeBtn.addEventListener('click', () => gallery.remove());
        
        // Close when clicking outside
        gallery.addEventListener('click', (e) => {
            if (e.target === gallery) gallery.remove();
        });
        
        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') gallery.remove();
        }, { once: true });
        
        // Animate in
        setTimeout(() => gallery.classList.add('show'), 10);
    }
    
    addEasterEggStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .easter-egg-element {
                transition: all 0.3s ease;
                position: relative;
            }
            
            .easter-egg-hint-common::before {
                content: '';
                position: absolute;
                inset: -2px;
                border-radius: inherit;
                background: linear-gradient(45deg, transparent, rgba(255, 215, 0, 0.3), transparent);
                z-index: -1;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .easter-egg-element:hover::before {
                opacity: 1;
            }
            
            .floating-element {
                animation: float-up 3s ease-out forwards;
                user-select: none;
            }
            
            .celebration-float {
                animation: celebration-bounce 3s ease-out forwards;
            }
            
            @keyframes celebration-bounce {
                0% { transform: translateY(0px) rotate(0deg) scale(0.5); opacity: 0; }
                20% { opacity: 1; transform: translateY(-50px) rotate(90deg) scale(1); }
                50% { transform: translateY(-150px) rotate(180deg) scale(1.2); }
                80% { transform: translateY(-250px) rotate(270deg) scale(1); }
                100% { transform: translateY(-400px) rotate(360deg) scale(0.3); opacity: 0; }
            }
            
            .easter-egg-notification {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 10001;
                background: linear-gradient(135deg, rgba(10, 10, 10, 0.95), rgba(20, 20, 20, 0.95));
                border: 2px solid var(--neon-red);
                border-radius: 15px;
                padding: 20px;
                max-width: 300px;
                backdrop-filter: blur(10px);
                transform: translateX(350px);
                transition: transform 0.4s ease;
                box-shadow: 0 10px 30px rgba(255, 7, 60, 0.3);
            }
            
            .easter-egg-notification.show {
                transform: translateX(0);
            }
            
            .notification-header {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 10px;
            }
            
            .notification-header i {
                color: gold;
                font-size: 1.2rem;
            }
            
            .rarity {
                font-weight: bold;
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 0.8rem;
            }
            
            .rarity.common { background: rgba(169, 169, 169, 0.3); color: #a9a9a9; }
            .rarity.uncommon { background: rgba(0, 255, 0, 0.3); color: #00ff00; }
            .rarity.rare { background: rgba(0, 191, 255, 0.3); color: #00bfff; }
            .rarity.legendary { background: rgba(255, 215, 0, 0.3); color: #ffd700; }
            
            .notification-content h4 {
                margin: 0 0 5px 0;
                color: white;
                font-size: 1.1rem;
            }
            
            .notification-content p {
                margin: 0;
                color: #ccc;
                font-size: 0.9rem;
                line-height: 1.3;
            }
            
            .notification-progress {
                margin-top: 10px;
                padding-top: 10px;
                border-top: 1px solid rgba(255, 7, 60, 0.3);
                font-size: 0.8rem;
                color: var(--neon-red);
                text-align: center;
            }
            
            .balders-menu {
                position: fixed;
                bottom: 160px;
                right: 20px;
                z-index: 10000;
                background: linear-gradient(135deg, rgba(10, 10, 10, 0.95), rgba(20, 20, 20, 0.95));
                border: 2px solid var(--neon-red);
                border-radius: 20px;
                width: 280px;
                backdrop-filter: blur(15px);
                box-shadow: 0 15px 40px rgba(255, 7, 60, 0.4);
                transform: scale(0) translateY(20px);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                opacity: 0;
            }
            
            .balders-menu.show {
                transform: scale(1) translateY(0);
                opacity: 1;
            }
            
            .menu-header {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 15px 20px;
                border-bottom: 1px solid rgba(255, 7, 60, 0.3);
                position: relative;
            }
            
            .menu-header i {
                color: var(--neon-red);
                font-size: 1.2rem;
            }
            
            .menu-header h3 {
                margin: 0;
                color: white;
                font-family: "Orbitron", sans-serif;
                font-size: 1.1rem;
                flex: 1;
            }
            
            .menu-close {
                background: none;
                border: none;
                color: var(--neon-red);
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                width: 25px;
                height: 25px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .menu-close:hover {
                background: rgba(255, 7, 60, 0.1);
                transform: rotate(90deg);
            }
            
            .menu-content {
                padding: 10px;
            }
            
            .menu-option {
                width: 100%;
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 12px 15px;
                background: rgba(255, 7, 60, 0.05);
                border: 1px solid rgba(255, 7, 60, 0.2);
                border-radius: 10px;
                color: white;
                text-align: left;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-bottom: 8px;
                font-family: inherit;
            }
            
            .menu-option:hover:not(.disabled) {
                background: rgba(255, 7, 60, 0.15);
                border-color: var(--neon-red);
                transform: translateX(5px);
            }
            
            .menu-option.disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            .menu-option i {
                color: var(--neon-red);
                font-size: 1.1rem;
                width: 20px;
            }
            
            .menu-option span {
                flex: 1;
                font-weight: 500;
            }
            
            .option-info {
                font-size: 0.8rem;
                color: var(--text-dim);
                background: rgba(0, 0, 0, 0.3);
                padding: 2px 8px;
                border-radius: 8px;
            }
            
            .easter-egg-gallery {
                position: fixed;
                inset: 0;
                z-index: 10002;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(20px);
                display: flex;
                flex-direction: column;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .easter-egg-gallery.show {
                opacity: 1;
            }
            
            .gallery-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 30px 40px;
                border-bottom: 2px solid var(--neon-red);
                background: rgba(10, 10, 10, 0.8);
            }
            
            .gallery-header h2 {
                margin: 0;
                color: white;
                font-family: "Orbitron", sans-serif;
                font-size: 2rem;
                background: linear-gradient(90deg, #ffffff, var(--neon-red));
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
            }
            
            .gallery-close {
                background: none;
                border: none;
                color: var(--neon-red);
                font-size: 2rem;
                cursor: pointer;
                padding: 10px;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .gallery-close:hover {
                background: rgba(255, 7, 60, 0.1);
                transform: rotate(90deg);
            }
            
            .gallery-stats {
                display: flex;
                justify-content: center;
                gap: 60px;
                padding: 30px;
                background: rgba(255, 7, 60, 0.05);
            }
            
            .stat {
                text-align: center;
            }
            
            .stat .number {
                display: block;
                font-size: 2rem;
                font-weight: bold;
                color: var(--neon-red);
                font-family: "Orbitron", sans-serif;
            }
            
            .stat .label {
                display: block;
                font-size: 0.9rem;
                color: var(--text-dim);
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-top: 5px;
            }
            
            .gallery-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
                padding: 30px 40px;
                overflow-y: auto;
                flex: 1;
            }
            
            .gallery-item {
                background: rgba(10, 10, 10, 0.8);
                border: 2px solid rgba(255, 7, 60, 0.2);
                border-radius: 15px;
                padding: 20px;
                transition: all 0.3s ease;
                position: relative;
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .gallery-item.discovered {
                border-color: rgba(255, 7, 60, 0.5);
            }
            
            .gallery-item.common.discovered { border-color: rgba(169, 169, 169, 0.6); }
            .gallery-item.uncommon.discovered { border-color: rgba(0, 255, 0, 0.6); }
            .gallery-item.rare.discovered { border-color: rgba(0, 191, 255, 0.6); }
            .gallery-item.legendary.discovered { border-color: rgba(255, 215, 0, 0.6); }
            
            .gallery-item:hover.discovered {
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(255, 7, 60, 0.3);
            }
            
            .item-image {
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(255, 7, 60, 0.1);
                border-radius: 10px;
                flex-shrink: 0;
            }
            
            .item-image img {
                width: 50px;
                height: 50px;
                border-radius: 8px;
                object-fit: cover;
            }
            
            .item-image i {
                font-size: 2rem;
                color: var(--text-dim);
            }
            
            .item-info {
                flex: 1;
            }
            
            .item-info h4 {
                margin: 0 0 5px 0;
                color: white;
                font-size: 1.1rem;
            }
            
            .item-info .rarity {
                margin-bottom: 8px;
                font-size: 0.8rem;
            }
            
            .item-info .description {
                margin: 0;
                color: var(--text-dim);
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .item-status {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 25px;
                height: 25px;
                background: rgba(0, 255, 0, 0.2);
                border: 2px solid #00ff00;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .item-status i {
                color: #00ff00;
                font-size: 0.9rem;
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Balder to be initialized
    setTimeout(() => {
        if (window.balder) {
            window.easterEggs = new EasterEggs(window.balder);
            console.log('Hidden Easter Eggs system initialized! Double-click Balder to access the menu!');
        }
    }, 1000);
});