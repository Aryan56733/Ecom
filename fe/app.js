// Global variables
let cart = [];
let currentUser = null;
let recentlyViewed = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Load data from localStorage
    loadCart();
    loadUser();
    loadRecentlyViewed();

    // Update UI elements
    updateCartCount();
    updateUserUI();

    // Set up event listeners
    setupEventListeners();

    // Load featured products on homepage
    if (document.getElementById('featured-products-grid')) {
        loadFeaturedProducts();
    }

    // Load deals on homepage
    if (document.getElementById('deals-grid')) {
        loadDeals();
    }

    // Set up search functionality
    setupSearch();
});

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load user from localStorage
function loadUser() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
}

// Save user to localStorage
function saveUser() {
    if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
        localStorage.removeItem('currentUser');
    }
}

// Load recently viewed products from localStorage
function loadRecentlyViewed() {
    const savedRecentlyViewed = localStorage.getItem('recentlyViewed');
    if (savedRecentlyViewed) {
        recentlyViewed = JSON.parse(savedRecentlyViewed);
    }
}

// Save recently viewed products to localStorage
function saveRecentlyViewed() {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
}

// Update cart count in the header
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

// Update user UI based on login status
function updateUserUI() {
    const notLoggedInElement = document.getElementById('not-logged-in');
    const loggedInElement = document.getElementById('logged-in');
    const userNameElement = document.getElementById('user-name');

    if (notLoggedInElement && loggedInElement) {
        if (currentUser) {
            notLoggedInElement.style.display = 'none';
            loggedInElement.style.display = 'block';
            if (userNameElement) {
                userNameElement.textContent = currentUser.name;
            }
        } else {
            notLoggedInElement.style.display = 'block';
            loggedInElement.style.display = 'none';
        }
    }
}

// Set up event listeners
function setupEventListeners() {
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register form submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Account menu items
    const accountMenuItems = document.querySelectorAll('.account-menu li[data-section]');
    accountMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            switchAccountSection(sectionId);
        });
    });
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // In a real app, this would make an API call to verify credentials
    const user = window.shopData.users.find(u => u.email === email && u.password === password);

    if (user) {
        // Login successful
        currentUser = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        saveUser();
        updateUserUI();
        hideModal('login-modal');

        // Show success message
        alert('Login successful!');
    } else {
        // Login failed
        alert('Invalid email or password. Please try again.');
    }
}

// Handle register form submission
function handleRegister(event) {
    event.preventDefault();

    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    // Check if email already exists
    const existingUser = window.shopData.users.find(u => u.email === email);
    if (existingUser) {
        alert('An account with this email already exists.');
        return;
    }

    // In a real app, this would make an API call to create a new user
    const newUser = {
        id: window.shopData.users.length + 1,
        name,
        email,
        password // In a real app, this would be hashed
    };

    // Add user to the mock data
    window.shopData.users.push(newUser);

    // Log in the new user
    currentUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
    };

    saveUser();
    updateUserUI();
    hideModal('register-modal');

    // Show success message
    alert('Account created successfully!');
}

// Logout function
function logout() {
    currentUser = null;
    saveUser();
    updateUserUI();

    // Redirect to homepage if on account page
    if (window.location.pathname.includes('account.html')) {
        navigateTo('index.html');
    }
}

// Load featured products on homepage
function loadFeaturedProducts() {
    const featuredProductsGrid = document.getElementById('featured-products-grid');
    if (!featuredProductsGrid) return;

    const featuredProducts = window.shopData.products.filter(product => product.featured);

    featuredProductsGrid.innerHTML = '';

    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        featuredProductsGrid.appendChild(productCard);
    });
}

// Load deals on homepage
function loadDeals() {
    const dealsGrid = document.getElementById('deals-grid');
    if (!dealsGrid) return;

    const deals = window.shopData.products.filter(product => product.deal);

    dealsGrid.innerHTML = '';

    deals.forEach(product => {
        const productCard = createProductCard(product);
        dealsGrid.appendChild(productCard);
    });
}

// Create a product card element
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.onclick = () => navigateTo(`product-details.html?id=${product.id}`);

    const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));

    productCard.innerHTML = `
    <div class="product-img">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-info">
      <h3 class="product-title">${product.name}</h3>
      <div class="product-price">$${product.price.toFixed(2)}</div>
      <div class="product-rating">${stars} (${product.reviewCount})</div>
      <div class="product-actions">
        <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
        <span class="material-symbols-outlined" onclick="event.stopPropagation(); toggleWishlist(${product.id})">favorite_border</span>
      </div>
    </div>
  `;

    return productCard;
}

// Add a product to the cart
function addToCart(productId) {
    const product = window.shopData.products.find(p => p.id === productId);
    if (!product) return;

    // Check if product is already in cart
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
        // Increment quantity
        existingItem.quantity += 1;
    } else {
        // Add new item
        cart.push({
            productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();

    // Show confirmation message
    alert(`${product.name} added to cart!`);
}

// Toggle a product in the wishlist
function toggleWishlist(productId) {
    if (!currentUser) {
        showModal('login-modal');
        return;
    }

    // In a real app, this would make an API call to update the wishlist
    const userWishlist = window.shopData.wishlist.find(w => w.userId === currentUser.id);

    if (userWishlist) {
        const index = userWishlist.productIds.indexOf(productId);

        if (index > -1) {
            // Remove from wishlist
            userWishlist.productIds.splice(index, 1);
            alert('Product removed from wishlist!');
        } else {
            // Add to wishlist
            userWishlist.productIds.push(productId);
            alert('Product added to wishlist!');
        }
    } else {
        // Create new wishlist for user
        window.shopData.wishlist.push({
            userId: currentUser.id,
            productIds: [productId]
        });
        alert('Product added to wishlist!');
    }
}

// Add a product to recently viewed
function addToRecentlyViewed(productId) {
    // Remove if already in the list
    recentlyViewed = recentlyViewed.filter(id => id !== productId);

    // Add to the beginning of the list
    recentlyViewed.unshift(productId);

    // Keep only the last 5 items
    if (recentlyViewed.length > 5) {
        recentlyViewed = recentlyViewed.slice(0, 5);
    }

    saveRecentlyViewed();
}

// Navigate to a different page
function navigateTo(url) {
    window.location.href = url;
}

// Show a modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

// Hide a modal
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Switch between modals
function switchModal(hideModalId, showModalId) {
    hideModal(hideModalId);
    showModal(showModalId);
}

// Switch between account sections
function switchAccountSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.account-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(`${sectionId}-section`);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Update menu active state
    const menuItems = document.querySelectorAll('.account-menu li');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });

    const selectedMenuItem = document.querySelector(`.account-menu li[data-section="${sectionId}"]`);
    if (selectedMenuItem) {
        selectedMenuItem.classList.add('active');
    }
}

// Set up search functionality
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                navigateTo(`products.html?search=${encodeURIComponent(query)}`);
            }
        });

        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    navigateTo(`products.html?search=${encodeURIComponent(query)}`);
                }
            }
        });
    }
}
function openChat() {
    alert("Chat bot opened! (You can replace this with a modal or widget)");
}
function openChat() {
    document.querySelector(".chatbox").style.display = "flex";
}

function closeChat() {
    document.getElementById("chat-modal").style.display = "none";
}

function sendMessage() {
    const input = document.getElementById("chat-input");
    const message = input.value.trim();
    if (!message) return;

    appendMessage("user", message);
    input.value = "";

    fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.reply) {
                appendMessage("bot", data.reply);
            } else {
                console.log(res)
                appendMessage("bot", "Sorry, I didn't understand that.");
            }
        })
        .catch(() => {
            appendMessage("bot", "Error connecting to chat server.");
        });
}

function appendMessage(sender, text) {
    const chatBody = document.getElementById("chat-body");
    const msg = document.createElement("div");
    msg.className = `chat-message ${sender}`;
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}
