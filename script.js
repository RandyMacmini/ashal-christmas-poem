// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize interactive features
    initSnowfall();
    initMusicPlayer();
    initChristmasLights();
});

// Snowfall Animation
function initSnowfall() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const snowflakeCount = 50;

    for (let i = 0; i < snowflakeCount; i++) {
        createSnowflake(snowflakesContainer);
    }
}

function createSnowflake(container) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = '❄';
    
    // Random positioning and animation
    const startPos = Math.random() * 100;
    const animationDuration = 5 + Math.random() * 10; // 5-15 seconds
    const fontSize = 0.5 + Math.random() * 1; // 0.5-1.5em
    const animationDelay = Math.random() * 5; // 0-5 seconds delay
    
    snowflake.style.left = startPos + '%';
    snowflake.style.fontSize = fontSize + 'em';
    snowflake.style.animationDuration = animationDuration + 's';
    snowflake.style.animationDelay = animationDelay + 's';
    
    container.appendChild(snowflake);
    
    // Reset snowflake position when animation completes
    snowflake.addEventListener('animationiteration', () => {
        snowflake.style.left = Math.random() * 100 + '%';
    });
}

// Music Player
function initMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    const music = document.getElementById('holidayMusic');
    let isPlaying = false;

    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            music.pause();
            musicToggle.textContent = '🎵 Play Holiday Music';
            musicToggle.classList.remove('playing');
            isPlaying = false;
        } else {
            // Try to play music
            music.play().then(() => {
                musicToggle.textContent = '⏸️ Pause Music';
                musicToggle.classList.add('playing');
                isPlaying = true;
            }).catch(error => {
                console.log('Music playback failed:', error);
                // Show error message to user
                showMessage('Music playback requires user interaction. Please click again.');
            });
        }
    });

    // Handle music ending (if not looped)
    music.addEventListener('ended', function() {
        musicToggle.textContent = '🎵 Play Holiday Music';
        musicToggle.classList.remove('playing');
        isPlaying = false;
    });
}

// Christmas Lights
function initChristmasLights() {
    const lightsToggle = document.getElementById('lightsToggle');
    const lightsContainer = document.getElementById('lightsContainer');
    let lightsActive = false;

    lightsToggle.addEventListener('click', function() {
        if (lightsActive) {
            lightsContainer.classList.remove('active');
            lightsContainer.innerHTML = '';
            lightsToggle.textContent = '✨ Toggle Lights';
            lightsActive = false;
        } else {
            lightsContainer.classList.add('active');
            createChristmasLights(lightsContainer);
            lightsToggle.textContent = '💡 Hide Lights';
            lightsActive = true;
        }
    });
}

function createChristmasLights(container) {
    const colors = ['red', 'green', 'blue', 'yellow'];
    const numberOfLights = 30;
    
    // Create lights along the top
    for (let i = 0; i < numberOfLights; i++) {
        const light = document.createElement('div');
        light.className = `light ${colors[i % colors.length]}`;
        
        // Position lights along the top edge
        light.style.left = (i * (100 / numberOfLights)) + '%';
        light.style.top = '10px';
        
        // Random animation delay for twinkling effect
        light.style.animationDelay = (Math.random() * 1) + 's';
        
        container.appendChild(light);
    }
    
    // Create lights along the sides
    const sideLights = 15;
    
    // Left side
    for (let i = 0; i < sideLights; i++) {
        const light = document.createElement('div');
        light.className = `light ${colors[i % colors.length]}`;
        
        light.style.left = '10px';
        light.style.top = (i * (100 / sideLights)) + '%';
        light.style.animationDelay = (Math.random() * 1) + 's';
        
        container.appendChild(light);
    }
    
    // Right side
    for (let i = 0; i < sideLights; i++) {
        const light = document.createElement('div');
        light.className = `light ${colors[i % colors.length]}`;
        
        light.style.right = '10px';
        light.style.left = 'auto';
        light.style.top = (i * (100 / sideLights)) + '%';
        light.style.animationDelay = (Math.random() * 1) + 's';
        
        container.appendChild(light);
    }
}

// Utility function to show messages
function showMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px 30px;
        border-radius: 5px;
        z-index: 1000;
        font-size: 14px;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.style.transition = 'opacity 0.5s';
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 500);
    }, 3000);
}

// Add some interactive poem effects
function addPoemInteractivity() {
    const stanzas = document.querySelectorAll('.stanza');
    
    stanzas.forEach((stanza, index) => {
        stanza.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(to right, rgba(255, 215, 0, 0.2), rgba(196, 30, 58, 0.1))';
            this.style.transform = 'translateX(5px)';
        });
        
        stanza.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(to right, rgba(255, 215, 0, 0.1), transparent)';
            this.style.transform = 'translateX(0)';
        });
    });
}

// Call poem interactivity after DOM loads
document.addEventListener('DOMContentLoaded', addPoemInteractivity);
