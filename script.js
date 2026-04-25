// Game Variables
let gameScore = 0;
let gameActive = false;
let gameTime = 10;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadWishes();
    setBirthDate();
});

// Set Birth Date
function setBirthDate() {
    const birthDateElement = document.getElementById('birthDate');
    birthDateElement.textContent = '2004 - 2026 (Hari Istimewa)';
}

// Toggle About
function toggleAbout() {
    const aboutText = document.querySelector('.about-text');
    if (aboutText.style.display === 'none') {
        aboutText.style.display = 'block';
    } else {
        aboutText.style.display = 'none';
    }
}

// Game Logic
function startGame() {
    gameScore = 0;
    gameActive = true;
    gameTime = 10;
    
    document.getElementById('score').textContent = '0';
    document.getElementById('timer').textContent = '10';
    
    const gameInterval = setInterval(() => {
        gameTime--;
        document.getElementById('timer').textContent = gameTime;
        
        if (gameTime <= 0) {
            clearInterval(gameInterval);
            gameActive = false;
            alert(`Selesai! Skor Anda: ${gameScore} 🎉\nBagus sekali!`);
        }
    }, 1000);
}

function clickHeart() {
    if (gameActive) {
        gameScore++;
        document.getElementById('score').textContent = gameScore;
        
        // Add animation effect
        const heartBtn = document.getElementById('gameBtn');
        heartBtn.style.transform = 'scale(1.3) rotate(15deg)';
        setTimeout(() => {
            heartBtn.style.transform = 'scale(1)';
        }, 100);
    }
}

// Wishes Form
function submitWish(event) {
    event.preventDefault();
    
    const name = document.getElementById('wishName').value;
    const text = document.getElementById('wishText').value;
    
    if (name && text) {
        // Create wish object
        const wish = {
            name: name,
            text: text,
            timestamp: new Date().getTime()
        };
        
        // Get existing wishes from localStorage
        let wishes = JSON.parse(localStorage.getItem('uzyy_wishes')) || [];
        wishes.push(wish);
        
        // Save to localStorage
        localStorage.setItem('uzyy_wishes', JSON.stringify(wishes));
        
        // Clear form
        document.getElementById('wishName').value = '';
        document.getElementById('wishText').value = '';
        
        // Reload wishes display
        loadWishes();
        
        // Show success message
        alert('Ucapan terkirim! Terima kasih 💝');
    }
}

// Load and Display Wishes
function loadWishes() {
    const wishesList = document.getElementById('wishesList');
    const wishes = JSON.parse(localStorage.getItem('uzyy_wishes')) || [];
    
    wishesList.innerHTML = '';
    
    if (wishes.length === 0) {
        wishesList.innerHTML = '<p style="text-align: center; color: #999;">Belum ada ucapan. Jadilah yang pertama! 💌</p>';
    } else {
        wishes.reverse().forEach((wish, index) => {
            const wishElement = document.createElement('div');
            wishElement.className = 'wish-item';
            wishElement.innerHTML = `
                <div class="wish-name">💌 ${wish.name}</div>
                <div class="wish-text">"${wish.text}"</div>
            `;
            wishesList.appendChild(wishElement);
        });
    }
}
