/* ============================================================
   HASSAN — Shared Layout: Navbar + Footer
============================================================ */

function hNavbar(){
  return `
  <header class="h-header" id="h-header">
    <div class="h-header-top">
      <button class="h-burger" id="h-burger" aria-label="Open menu"><span></span><span></span><span></span></button>
            <h2 class="h-logo">Logo</h2>
      <nav class="h-nav-main" aria-label="Primary">
        <a href="index.html?cat=outerwear">Home</a>
        <a href="shop.html?cat=outerwear">Outerwear</a>
        <a href="shop.html?cat=shirts">Shirts</a>
        <a href="shop.html?cat=knitwear">Knitwear</a>
        <a href="shop.html?cat=denim">Denim</a>
        <a href="shop.html?filter=sale" class="accent">Sale</a>
      </nav>
      <div class="h-header-actions">
        <button class="h-icon-btn" id="h-search-btn" aria-label="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M21 21l-4.3-4.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
        <a href="account.html" class="h-icon-btn" aria-label="Account">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.4" stroke="currentColor" stroke-width="1.5"/><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </a>
        <a href="wishlist.html" class="h-icon-btn" aria-label="Wishlist">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 20s-7-4.3-9.3-8.8C1.2 8 2.6 4.8 6 4.4c2-.2 3.6.9 6 3.4 2.4-2.5 4-3.6 6-3.4 3.4.4 4.8 3.6 3.3 6.8C19 15.7 12 20 12 20z" stroke="currentColor" stroke-width="1.4"/></svg>
          <span class="h-badge" data-wishlist-count style="display:none">0</span>
        </a>
        <a href="cart.html" class="h-icon-btn" id="h-cart-btn" aria-label="Cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 8h12l-1 12H7L6 8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 8a3 3 0 0 1 6 0" stroke="currentColor" stroke-width="1.5"/></svg>
          <span class="h-badge gold" data-cart-count style="display:none">0</span>
        </a>
      </div>
    </div>
  </header>

  <!-- Mobile drawer -->
  <div class="h-drawer" id="h-drawer">
    <div class="h-drawer-head"><span class="h-logo">Logo</span><button id="h-drawer-close" aria-label="Close">✕</button></div>
    <div class="h-drawer-section">
        <a href="index.html?cat=outerwear" class="h-drawer-link">Home</a>
      <a href="shop.html?cat=outerwear" class="h-drawer-link">Outerwear</a>
      <a href="shop.html?cat=shirts" class="h-drawer-link">Shirts</a>
      <a href="shop.html?cat=knitwear" class="h-drawer-link">Knitwear</a>
      <a href="shop.html?cat=trousers" class="h-drawer-link">Trousers</a>
      <a href="shop.html?cat=denim" class="h-drawer-link">Denim</a>
      <a href="shop.html?filter=sale" class="h-drawer-link accent">Sale</a>
    </div>
    <div class="h-drawer-section">
      <a href="account.html" class="h-drawer-link">Account</a>
      <a href="wishlist.html?tab=orders" class="h-drawer-link">Favorites</a>
      <a href="cart.html?tab=orders" class="h-drawer-link">Card</a>
    </div>
  </div>
  <div class="h-drawer-overlay" id="h-drawer-overlay"></div>
  `;
}

function hFooter(){
  return `
  <footer class="h-footer">
    <div class="wrap h-footer-top">
      <div class="h-footer-brand">
        <span class="h-logo">Logo</span>
        <p class="text-dim" style="margin-top:14px;max-width:300px;">Tailored menswear, cut from premium materials and finished by hand. Built for the long wear, not the season.</p>
      </div>
      <div class="h-footer-cols">
        <div>
          <p class="eyebrow" style="margin-bottom:16px;">Shop</p>
          <a href="shop.html">All Products</a>
          <a href="shop.html?filter=new">New Arrivals</a>
          <a href="shop.html?filter=sale">Sale</a>
        </div>
        <div>
          <p class="eyebrow" style="margin-bottom:16px;">Help</p>
          <a href="#">Size Guide</a>
          <a href="#">Shipping & Returns</a>
          <a href="#">Contact</a>
        </div>
        <div>
          <p class="eyebrow" style="margin-bottom:16px;">Company</p>
          <a href="#">About Logo</a>
          <a href="#">Craftsmanship</a>
          <a href="admin.html">Admin</a>
        </div>
      </div>
    </div>
    <div class="wrap h-footer-bottom">
      <span>© 2025 Logo. All rights reserved.</span>
      <span>Privacy Policy · Terms of Service</span>
    </div>
  </footer>`;
}

function hMountLayout(){
  document.getElementById('h-nav-mount').innerHTML = hNavbar();
  document.getElementById('h-footer-mount').innerHTML = hFooter();
  hInitLayoutBehavior();
}

function hInitLayoutBehavior(){
  const header = document.getElementById('h-header');
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 12));

  const drawer = document.getElementById('h-drawer');
  const overlay = document.getElementById('h-drawer-overlay');
  document.getElementById('h-burger').addEventListener('click', () => { drawer.classList.add('open'); overlay.classList.add('open'); });
  document.getElementById('h-drawer-close').addEventListener('click', () => { drawer.classList.remove('open'); overlay.classList.remove('open'); });
  overlay.addEventListener('click', () => { drawer.classList.remove('open'); overlay.classList.remove('open'); });

  document.getElementById('h-search-btn').addEventListener('click', () => window.location.href = 'shop.html#search');
  const cartBtn = document.getElementById('h-cart-btn');
  if (cartBtn) cartBtn.addEventListener('click', () => window.location.href = 'cart.html');
}
