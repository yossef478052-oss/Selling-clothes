/* ============================================================
   HASSAN — Quick Select Overlay Engine
   Call hOpenQuickSelect(productId) from any product card.
============================================================ */

let _qsState = { product: null, color: null, size: null, qty: 1, activeImg: 0, note: '' };

function hQuickSelectMount(){
  if (document.getElementById('qs-overlay')) return;
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="qs-overlay" id="qs-overlay">
      <div class="qs-panel" id="qs-panel" role="dialog" aria-modal="true" aria-label="Quick select">
        <div class="qs-panel-drag"></div>
        <button class="qs-close" id="qs-close" aria-label="Close">✕</button>
        <div class="qs-body" id="qs-body"></div>
      </div>
    </div>`;
  document.body.appendChild(div.firstElementChild);
  document.getElementById('qs-close').addEventListener('click', hCloseQuickSelect);
  document.getElementById('qs-overlay').addEventListener('click', e => { if (e.target.id === 'qs-overlay') hCloseQuickSelect(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hCloseQuickSelect(); });
}

function hOpenQuickSelect(productId){
  hQuickSelectMount();
  const product = (typeof hGetById === 'function') ? hGetById(productId) : null;
  if (!product) return;
  _qsState = { product, color: product.colors[0].name, size: null, qty: 1, activeImg: 0, note: '' };
  renderQuickSelect();
  document.getElementById('qs-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function hCloseQuickSelect(){
  const overlay = document.getElementById('qs-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function renderQuickSelect(){
  const { product, color, size, qty, activeImg } = _qsState;
  const wished = HStore.isWishlisted(product.id);
  document.getElementById('qs-body').innerHTML = `
    <div class="qs-thumb"><img src="${product.images[activeImg]}" alt="${product.name}"/></div>
    <div class="qs-info">
      <p class="eyebrow qs-eyebrow">${product.category}</p>
      <h3 class="qs-name">${product.name}</h3>
      <div class="qs-price-row">
        <span class="qs-price">${hPrice(product.price)}</span>
        ${product.compareAt ? `<span class="qs-compare">${hPrice(product.compareAt)}</span>` : ''}
      </div>

      <div class="qs-field">
        <div class="qs-field-label"><span>Color</span><span class="val">${color}</span></div>
        <div class="qs-colors">
          ${product.colors.map(c => `<button class="qs-color-swatch ${c.name===color?'active':''}" style="background:${c.hex}" onclick="qsSetColor('${c.name}')" aria-label="${c.name}"></button>`).join('')}
        </div>
      </div>

      <div class="qs-field">
        <div class="qs-field-label"><span>Size</span><span class="val">${size || 'Select a size'}</span></div>
        <div class="qs-sizes">
          ${product.sizes.map(s => `<button class="qs-size-btn ${s.stock===0?'oos':''} ${size===s.label?'active':''}" ${s.stock===0?'disabled':''} onclick="qsSetSize('${s.label}')">${s.label}</button>`).join('')}
        </div>
        ${qsStockNote()}
      </div>

      <div class="qs-field qs-qty-row">
        <div class="qs-field-label" style="margin:0;"><span>Quantity</span></div>
        <div class="qs-qty-stepper">
          <button onclick="qsChangeQty(-1)" aria-label="Decrease quantity">–</button>
          <span>${qty}</span>
          <button onclick="qsChangeQty(1)" aria-label="Increase quantity">+</button>
        </div>
      </div>

      <div class="qs-field qs-note-wrap">
        <div class="qs-field-label"><span>Note for this item</span></div>
        <textarea placeholder="e.g. gift wrap, alteration request, delivery instructions..." oninput="_qsState.note = this.value">${_qsState.note}</textarea>
        <p class="qs-note-hint">Optional — visible to our fulfilment team only.</p>
      </div>

      <div class="qs-cta-row">
        <button class="btn btn-gold btn-block" onclick="qsAddToCart()">Add to cart — ${hPrice(product.price * qty)}</button>
        <button class="qs-wishlist-btn ${wished?'active':''}" onclick="qsToggleWishlist()" aria-label="Add to wishlist">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EDEDED" stroke-width="1.5"><path d="M12 20s-7-4.3-9.3-8.8C1.2 8 2.6 4.8 6 4.4c2-.2 3.6.9 6 3.4 2.4-2.5 4-3.6 6-3.4 3.4.4 4.8 3.6 3.3 6.8C19 15.7 12 20 12 20z"/></svg>
        </button>
      </div>
      <a href="product.html?slug=${product.slug}" class="qs-view-full">View full details →</a>
    </div>
  `;
}

function qsStockNote(){
  const { product, size } = _qsState;
  if (!size) return `<p class="qs-stock-note">Select a size to see availability.</p>`;
  const s = product.sizes.find(s => s.label === size);
  if (!s || s.stock === 0) return `<p class="qs-stock-note low">Out of stock in this size.</p>`;
  if (s.stock <= 4) return `<p class="qs-stock-note low">Only ${s.stock} left.</p>`;
  return `<p class="qs-stock-note">In stock — ready to ship.</p>`;
}

function qsSetColor(name){ _qsState.color = name; renderQuickSelect(); }
function qsSetSize(label){
  const s = _qsState.product.sizes.find(s=>s.label===label);
  if (s.stock === 0) return;
  _qsState.size = label; renderQuickSelect();
}
function qsChangeQty(delta){ _qsState.qty = Math.max(1, _qsState.qty + delta); renderQuickSelect(); }
function qsToggleWishlist(){
  const now = HStore.toggleWishlist(_qsState.product.id);
  HStore.toast(now ? 'Added to wishlist' : 'Removed from wishlist', 'success');
  renderQuickSelect();
}
function qsAddToCart(){
  const { product, color, size, qty, note } = _qsState;
  if (!size){ HStore.toast('Please select a size', 'error'); return; }
  const s = product.sizes.find(s=>s.label===size);
  if (s.stock === 0){ HStore.toast('That size is out of stock', 'error'); return; }
  HStore.addToCart({ productId: product.id, size, color, qty, note });
  HStore.toast('Added to cart', 'success');
  hCloseQuickSelect();
}