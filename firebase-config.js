// ============================================
// NepStack — firebase-config.js
// Plain script — NO ES modules, works on file://
// ============================================

const ADMIN_EMAIL = "admin@nepstack.com";
const ADMIN_PASSWORD = "nepstack123";

// ============================================
// Toast
// ============================================
function showToast(message, type) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        container.style.cssText = 'position:fixed;top:20px;right:20px;z-index:99999;display:flex;flex-direction:column;gap:8px;';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.style.cssText = 'background:#fff;color:#1a1a2e;padding:12px 20px;border-radius:4px;box-shadow:0 4px 20px rgba(0,0,0,.15);font-size:13px;font-weight:500;min-width:250px;border-left:4px solid ' + (type === 'success' ? '#52c41a' : type === 'error' ? '#f5222d' : '#3d6df5') + ';animation:toastIn .3s ease;';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ============================================
// Cart
// ============================================
function getCart() {
    try { return JSON.parse(localStorage.getItem('nepstack_cart') || '[]'); }
    catch(e) { return []; }
}
function saveCart(cart) {
    localStorage.setItem('nepstack_cart', JSON.stringify(cart));
    updateCartBadge();
}
function addToCart(product, quantity, size, color) {
    quantity = quantity || 1;
    size = size || null;
    color = color || null;
    const cart = getCart();
    const key = product.id + '_' + (size || '') + '_' + (color || '');
    const existing = cart.find(function(i) { return i._key === key; });
    if (existing) {
        existing.quantity += quantity;
    } else {
        var item = Object.assign({}, product);
        item.quantity = quantity;
        item.size = size;
        item.color = color;
        item._key = key;
        item._cartId = Date.now().toString();
        cart.push(item);
    }
    saveCart(cart);
    showToast(product.name + ' added to cart!', 'success');
}
function removeFromCart(cartId) {
    saveCart(getCart().filter(function(i) { return i._cartId !== cartId; }));
}
function updateCartQty(cartId, newQty) {
    const cart = getCart();
    const item = cart.find(function(i) { return i._cartId === cartId; });
    if (item) { item.quantity = Math.max(1, newQty); saveCart(cart); }
}
function clearCart() {
    localStorage.removeItem('nepstack_cart');
    updateCartBadge();
}
function updateCartBadge() {
    const count = getCart().reduce(function(sum, i) { return sum + i.quantity; }, 0);
    document.querySelectorAll('.cart-badge').forEach(function(b) {
        b.textContent = count;
        b.style.display = count > 0 ? 'flex' : 'none';
    });
}

// Make cart functions global
window.getCart = getCart;
window.saveCart = saveCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQty = updateCartQty;
window.clearCart = clearCart;
window.updateCartBadge = updateCartBadge;
window.showToast = showToast;

// ============================================
// Navbar
// ============================================
var NAV_CATEGORIES = ["Tshirts","Hoodies","Pants","Jackets","Caps","Bags","Shoes","Accessories"];
var NAV_ICONS = {Tshirts:'👕',Hoodies:'🧥',Pants:'👖',Jackets:'🧥',Caps:'🧢',Bags:'🎒',Shoes:'👟',Accessories:'⌚'};

function buildNavbar() {
    var topBar = document.createElement('div');
    topBar.className = 'top-bar';
    topBar.textContent = '🚚 Free Delivery on orders above Rs. 500 | NepStack Nepal';
    document.body.prepend(topBar);

    var nav = document.createElement('nav');
    nav.className = 'main-nav';
    nav.innerHTML = '<div class="nav-main-row">'
        + '<a href="index.html" class="nav-logo">'
        + '<img src="logo.webp" height="45" alt="NepStack" onerror="this.style.display=\'none\';document.getElementById(\'ns-logo-txt\').style.display=\'flex\'">'
        + '<span id="ns-logo-txt" style="display:none;font-size:22px;font-weight:800;align-items:center;"><span style="color:#1a1a2e;">Nep</span><span style="color:#3d6df5;">Stack</span></span>'
        + '</a>'
        + '<div class="nav-search">'
        + '<input type="text" id="nav-search-input" placeholder="Search in NepStack...">'
        + '<button id="nav-search-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></button>'
        + '</div>'
        + '<div class="nav-actions">'
        + '<a href="cart.html" class="nav-cart"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>'
        + '<span class="cart-badge" style="display:none;">0</span></a>'
        + '</div></div>'
        + '<div class="cat-nav" id="main-cat-nav"><div class="cat-nav-inner">'
        + '<a href="products.html" class="cat-nav-link">All</a>'
        + NAV_CATEGORIES.map(function(c) { return '<a href="products.html?category=' + c + '" class="cat-nav-link">' + NAV_ICONS[c] + ' ' + c + '</a>'; }).join('')
        + '</div></div>';

    topBar.after(nav);

    var searchInput = document.getElementById('nav-search-input');
    function doNavSearch() {
        var q = searchInput.value.trim();
        if (q) window.location.href = 'products.html?search=' + encodeURIComponent(q);
    }
    document.getElementById('nav-search-btn').addEventListener('click', doNavSearch);
    searchInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') doNavSearch(); });

    updateCartBadge();
}

// ============================================
// Footer
// ============================================
function buildFooter() {
    var footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = '<div class="footer-container">'
        + '<div class="footer-col"><h4>About NepStack</h4><ul><li><a href="#">About Us</a></li><li><a href="#">Careers</a></li><li><a href="#">Contact Us</a></li></ul></div>'
        + '<div class="footer-col"><h4>Categories</h4><ul>' + NAV_CATEGORIES.slice(0,4).map(function(c){return '<li><a href="products.html?category='+c+'">'+c+'</a></li>';}).join('') + '</ul></div>'
        + '<div class="footer-col"><h4>Help</h4><ul><li><a href="#">Shipping Info</a></li><li><a href="#">Returns</a></li><li><a href="#">FAQs</a></li></ul></div>'
        + '<div class="footer-col"><h4>Connect</h4><ul><li><a href="#">Instagram</a></li><li><a href="#">Facebook</a></li><li><a href="#">TikTok</a></li></ul></div>'
        + '</div><div class="footer-bottom">© ' + new Date().getFullYear() + ' NepStack Nepal. All Rights Reserved. 🇳🇵</div>';
    document.body.appendChild(footer);
}

// ============================================
// Bottom Nav
// ============================================
function buildBottomNav() {
    var nav = document.createElement('div');
    nav.className = 'bottom-nav';
    var p = window.location.pathname.split('/').pop() || 'index.html';
    nav.innerHTML = '<div class="bottom-nav-inner">'
        + '<a href="index.html" class="bottom-nav-item' + (p==='index.html'?' active':'') + '"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home</a>'
        + '<a href="products.html" class="bottom-nav-item' + (p==='products.html'?' active':'') + '"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>Categories</a>'
        + '<a href="cart.html" class="bottom-nav-item' + (p==='cart.html'?' active':'') + '"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>Cart</a>'
        + '<a href="admin.html" class="bottom-nav-item' + (p==='admin.html'?' active':'') + '"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Account</a>'
        + '</div>';
    document.body.appendChild(nav);
}

// ============================================
// Product Card
// ============================================
function createProductCard(p) {
    var card = document.createElement('div');
    card.className = 'product-card';
    var stars = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating));
    card.innerHTML = '<a href="product-detail.html?id=' + p.id + '" class="product-card-link">'
        + (p.badge ? '<span class="product-card-badge">' + p.badge + '</span>' : '')
        + '<img src="' + p.image + '" alt="' + p.name + '" class="product-card-img" loading="lazy">'
        + '<div class="product-card-body">'
        + '<div class="product-card-name">' + p.name + '</div>'
        + '<div><span class="product-card-price">Rs. ' + p.price.toLocaleString() + '</span>'
        + '<span class="product-card-original">Rs. ' + p.originalPrice.toLocaleString() + '</span>'
        + '<span class="product-card-discount">-' + p.discount + '%</span></div>'
        + '<div class="product-card-meta"><span class="product-card-rating">' + stars + ' ' + p.rating + '</span> · ' + p.sold.toLocaleString() + ' sold</div>'
        + '</div></a>';
    return card;
}

window.buildNavbar = buildNavbar;
window.buildFooter = buildFooter;
window.buildBottomNav = buildBottomNav;
window.createProductCard = createProductCard;
