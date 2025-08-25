class Balder {
    constructor() {
        this.phrases = [
            "Hello! I'm Balder! 🐾",
            "Nice to see you here! 😊",
            "This portfolio looks amazing, don't you think?",
            "Need help navigating around?",
            "Did you know I'm the official mascot here?",
            "Liked what you saw? Get in touch!",
            "I'm always here if you need me! 🐕",
            "Woof! How about checking out more projects?",
            "I'm a good digital boy! 🦴",
            "Let's explore more content together!",
            "Welcome to Vitor's portfolio!",
            "Check out those cool AI projects!",
            "The automation section is pretty neat!",
            "Don't forget to visit the contact page!",
            "I love meeting new visitors! 🎾"
        ];
        
        this.currentPhraseIndex = 0;
        this.speechTimer = null;
        this.idleTimer = null;
        this.isInitialized = false;
        
        this.init();
    }
    
    init() {
        if (this.isInitialized) return;
        
        this.createHTML();
        this.bindEvents();
        this.startIdleBehavior();
        
        this.isInitialized = true;
    }
    
    createHTML() {
        // Create pet container
        const petContainer = document.createElement('div');
        petContainer.id = 'balder-pet';
        petContainer.innerHTML = `
            <div id="balder-speech-bubble" class="speech-bubble hidden">
                <span id="balder-speech-text"></span>
                <div class="speech-bubble-tail"></div>
            </div>
            <div id="balder-character">
                <img src="assets/Balder/balder.png" alt="Balder" id="balder-img">
            </div>
        `;
        
        document.body.appendChild(petContainer);
        this.addStyles();
    }
    
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #balder-pet {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
                transition: all 0.3s ease;
            }
            
            #balder-character {
                cursor: pointer;
                transition: transform 0.3s ease;
                position: relative;
            }
            
            #balder-character:hover {
                transform: scale(1.1);
            }
            
            #balder-img {
                width: 120px;
                height: 120px;
                object-fit: contain;
                filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
                border: 4px solid #ff073c;
                border-radius: 50%;
                padding: 8px;
                background: rgba(10, 10, 10, 0.8);
                box-shadow: 0 0 30px rgba(255, 7, 60, 0.5);
            }
            
            #balder-character::before {
                content: '';
                position: absolute;
                top: -8px;
                left: -8px;
                right: -8px;
                bottom: -8px;
                border: 3px solid rgba(255, 7, 60, 0.3);
                border-radius: 50%;
                animation: pulse 2s infinite;
                pointer-events: none;
            }
            
            @keyframes pulse {
                0% {
                    transform: scale(1);
                    opacity: 1;
                }
                50% {
                    transform: scale(1.1);
                    opacity: 0.7;
                }
                100% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            
            .speech-bubble {
                position: absolute;
                bottom: 140px;
                right: 0;
                background: linear-gradient(135deg, #ffffff, #f8f8f8);
                border: 2px solid #ff073c;
                border-radius: 15px;
                padding: 15px 20px;
                max-width: 260px;
                box-shadow: 
                    0 4px 12px rgba(0,0,0,0.15),
                    0 0 20px rgba(255, 7, 60, 0.2);
                animation: bubbleAppear 0.3s ease-out;
                font-family: 'Orbitron', sans-serif;
                font-size: 14px;
                line-height: 1.4;
                color: #333;
                font-weight: 500;
            }
            
            .speech-bubble.hidden {
                display: none;
            }
            
            .speech-bubble-tail {
                position: absolute;
                bottom: -10px;
                right: 30px;
                width: 0;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-top: 10px solid #ffffff;
            }
            
            .speech-bubble-tail::before {
                content: '';
                position: absolute;
                bottom: 2px;
                right: -12px;
                width: 0;
                height: 0;
                border-left: 12px solid transparent;
                border-right: 12px solid transparent;
                border-top: 12px solid #ff073c;
            }
            
            @keyframes bubbleAppear {
                from {
                    opacity: 0;
                    transform: translateY(10px) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                }
                40% {
                    transform: translateY(-10px);
                }
                60% {
                    transform: translateY(-5px);
                }
            }
            
            .bounce-animation {
                animation: bounce 0.6s ease-in-out;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    bindEvents() {
        const character = document.getElementById('balder-character');
        if (character) {
            character.addEventListener('click', () => this.onPetClick());
        }
        
        // Hide speech bubble when clicking elsewhere
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#balder-pet')) {
                this.hideSpeech();
            }
        });
    }
    
    onPetClick() {
        // Only handle single clicks for speech, double clicks are handled by easter eggs system
        this.speak();
        this.playBounceAnimation();
    }
    
    speak(phraseIndex = null, customPhrase = null) {
        const speechBubble = document.getElementById('balder-speech-bubble');
        const speechText = document.getElementById('balder-speech-text');
        
        if (!speechBubble || !speechText) return;
        
        // Select phrase
        let phrase;
        if (customPhrase) {
            phrase = customPhrase;
        } else if (phraseIndex !== null) {
            phrase = this.phrases[phraseIndex];
        } else {
            phrase = this.getRandomPhrase();
        }
        
        // Show speech
        speechText.textContent = phrase;
        speechBubble.classList.remove('hidden');
        
        // Auto-hide after delay
        clearTimeout(this.speechTimer);
        this.speechTimer = setTimeout(() => {
            this.hideSpeech();
        }, 4000);
    }
    
    hideSpeech() {
        const speechBubble = document.getElementById('balder-speech-bubble');
        if (speechBubble) {
            speechBubble.classList.add('hidden');
        }
        clearTimeout(this.speechTimer);
    }
    
    getRandomPhrase() {
        const randomIndex = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomIndex];
    }
    
    playBounceAnimation() {
        const character = document.getElementById('balder-character');
        if (character) {
            character.classList.add('bounce-animation');
            setTimeout(() => {
                character.classList.remove('bounce-animation');
            }, 600);
        }
    }
    
    startIdleBehavior() {
        const speakRandomly = () => {
            // Increased chance to 70% for more frequent automatic speech
            if (Math.random() < 0.7) {
                this.speak();
            }
            
            // Schedule next idle behavior (between 15-30 seconds for more activity)
            const nextIdle = Math.random() * 15000 + 15000;
            this.idleTimer = setTimeout(speakRandomly, nextIdle);
        };
        
        // Start first idle behavior after 5 seconds (reduced from 10)
        this.idleTimer = setTimeout(speakRandomly, 5000);
    }
    
    // Extensible methods for future features
    addPhrase(phrase) {
        if (phrase && typeof phrase === 'string') {
            this.phrases.push(phrase);
        }
    }
    
    removePhraseByIndex(index) {
        if (index >= 0 && index < this.phrases.length) {
            this.phrases.splice(index, 1);
        }
    }
    
    setPosition(bottom = '20px', right = '20px') {
        const pet = document.getElementById('balder-pet');
        if (pet) {
            pet.style.bottom = bottom;
            pet.style.right = right;
        }
    }
    
    hide() {
        const pet = document.getElementById('balder-pet');
        if (pet) {
            pet.style.display = 'none';
        }
    }
    
    show() {
        const pet = document.getElementById('balder-pet');
        if (pet) {
            pet.style.display = 'block';
        }
    }
    
    destroy() {
        clearTimeout(this.speechTimer);
        clearTimeout(this.idleTimer);
        
        const pet = document.getElementById('balder-pet');
        if (pet) {
            pet.remove();
        }
        
        this.isInitialized = false;
    }
}

// Initialize Balder when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.balder = new Balder();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Balder;
}
