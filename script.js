
console.log("script.js ачааллаа ✅");

// URL parameter дээр tracking code авч шалгах
function checkTrackingCodeFromURL() {
  const params = new URLSearchParams(window.location.search);
  const trackingCode = params.get('track');
  
  if (trackingCode) {
    // Tracking modal асааж tracking code оруулж автоматаар search хийлгэх
    setTimeout(() => {
      showTrackingByCode(trackingCode);
    }, 500);
  }
}

function showTrackingByCode(trackingCode) {
  const trackingSection = document.getElementById('trackingSection');
  const trackingCodeInput = document.getElementById('trackingCodeInput');
  
  // Tracking modal нээ
  if (trackingSection.classList.contains('hidden')) {
    trackingSection.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  
  // Tracking code оруулаж search хийлгэ
  trackingCodeInput.value = trackingCode.toUpperCase();
  
  // 500ms дараа search хийлгэ (DOM готов байхын тулд)
  setTimeout(() => {
    handleTrackingSearch();
  }, 300);
  
  // URL-аас parameter хасаж clean URL гаргах
  window.history.replaceState({}, document.title, window.location.pathname);
}

function formatPrice(num){
  return Number(num).toLocaleString('en-US').replace(/,/g, "'");
}
// Бүтээгдэхүүний мэдээлэл - доор шинэ мөр нэмэхдээ ижил форматаар нэмнэ
const products = [
  { id: 1, name: 'Хүчтэй Утас Тайруулагч', description: 'Мэргэжлийн утас тайрах хэрэгсэл', price: 25000, images: ['images/a1.jpg', 'images/a2.jpg' , 'https://via.placeholder.com/260x180?text=Утас+Тайруулагч+2', 'https://via.placeholder.com/260x180?text=Утас+Тайруулагч+3', 'https://via.placeholder.com/260x180?text=Утас+Тайруулагч+4', 'https://via.placeholder.com/260x180?text=Утас+Тайруулагч+5'] },
  { id: 2, name: 'Цифрын Мультиметр', description: 'Хүчдэл, гүйдэл хэмжих хэрэгсэл', price: 12500, images: ['https://via.placeholder.com/260x180?text=Мультиметр+1', 'https://via.placeholder.com/260x180?text=Мультиметр+2', 'https://via.placeholder.com/260x180?text=Мультиметр+3', 'https://via.placeholder.com/260x180?text=Мультиметр+4', 'https://via.placeholder.com/260x180?text=Мультиметр+5'] },
  { id: 3, name: 'Хүчдэл Илрүүлэгч Үзэг', description: 'Контактгүй хүчдэл илрүүлэх', price: 15000, images: ['https://via.placeholder.com/260x180?text=Үзэг+1', 'https://via.placeholder.com/260x180?text=Үзэг+2', 'https://via.placeholder.com/260x180?text=Үзэг+3', 'https://via.placeholder.com/260x180?text=Үзэг+4', 'https://via.placeholder.com/260x180?text=Үзэг+5'] },
  { id: 4, name: 'Кримпинг Хэрэгсэл', description: 'Холбогч булга шахах иж бүрдэл', price: 18000, images: ['https://via.placeholder.com/260x180?text=Кримпинг+1', 'https://via.placeholder.com/260x180?text=Кримпинг+2', 'https://via.placeholder.com/260x180?text=Кримпинг+3', 'https://via.placeholder.com/260x180?text=Кримпинг+4', 'https://via.placeholder.com/260x180?text=Кримпинг+5'] },
  { id: 5, name: 'Кабель Хайч', description: 'Кабель хайчлах хэрэгсэл 300мм', price: 12000, images: ['https://via.placeholder.com/260x180?text=Хайч+1', 'https://via.placeholder.com/260x180?text=Хайч+2', 'https://via.placeholder.com/260x180?text=Хайч+3', 'https://via.placeholder.com/260x180?text=Хайч+4', 'https://via.placeholder.com/260x180?text=Хайч+5'] },
  { id: 6, name: 'LED Ажлын Гэрэл', description: 'Дахин цэнэглэх боломжтой гэрэл', price: 5500, images: ['https://via.placeholder.com/260x180?text=LED+Гэрэл+1', 'https://via.placeholder.com/260x180?text=LED+Гэрэл+2', 'https://via.placeholder.com/260x180?text=LED+Гэрэл+3', 'https://via.placeholder.com/260x180?text=LED+Гэрэл+4', 'https://via.placeholder.com/260x180?text=LED+Гэрэл+5'] },
  { id: 7, name: 'Хэлхээ Тодруулагч', description: 'Салгагч эсэхийг тодорхойлох', price: 12999, images: ['https://via.placeholder.com/260x180?text=Тодруулагч+1', 'https://via.placeholder.com/260x180?text=Тодруулагч+2', 'https://via.placeholder.com/260x180?text=Тодруулагч+3', 'https://via.placeholder.com/260x180?text=Тодруулагч+4', 'https://via.placeholder.com/260x180?text=Тодруулагч+5'] },
  { id: 8, name: 'Тусгаарласан Хэрэгслийн Цогц', description: '18 ширхэг тусгаарлагчтай хэрэгсэл', price: 9500, images: ['https://via.placeholder.com/260x180?text=Цогц+1', 'https://via.placeholder.com/260x180?text=Цогц+2', 'https://via.placeholder.com/260x180?text=Цогц+3', 'https://via.placeholder.com/260x180?text=Цогц+4', 'https://via.placeholder.com/260x180?text=Цогц+5'] },
  { id: 9, name: 'Хүчдэл хэмжигч', description: 'Гэмтсэн хэсгийг хэмжиж олно', price: 85000, images: ['https://via.placeholder.com/260x180?text=Хэмжигч+1', 'https://via.placeholder.com/260x180?text=Хэмжигч+2', 'https://via.placeholder.com/260x180?text=Хэмжигч+3', 'https://via.placeholder.com/260x180?text=Хэмжигч+4', 'https://via.placeholder.com/260x180?text=Хэмжигч+5'] },
  { id: 10, name: 'Утасны Сүлжээний Тестэр', description: 'Утасны сүлжээний холболт шалгах хэрэгсэл', price: 22000, images: ['https://via.placeholder.com/260x180?text=Тестэр+1', 'https://via.placeholder.com/260x180?text=Тестэр+2', 'https://via.placeholder.com/260x180?text=Тестэр+3', 'https://via.placeholder.com/260x180?text=Тестэр+4', 'https://via.placeholder.com/260x180?text=Тестэр+5'] }
];

// ========== I18N: Нэгдсэн орчуулга ==========
const translations = {
  mn: {
    products_title: 'Бүтээгдэхүүн',
    cart_title: 'Таны сагс',
    cart_empty: 'Таны сагс хоосон байна',
    continue_shopping: 'Үргэлжлүүлэн худалдан авах',
    subtotal_label: 'Нийт үнэ:',
    tax_label: 'Татвар (10%):',
    total_label: 'Нийт дүн:',
    checkout: 'Төлбөрийн үе шатанд очих',
    per_unit: 'нэгжид',
    add_to_cart: 'Сагсанд нэмэх',
    added_to_cart: '✓ Сагсанд нэмэх',
    remove: 'Устгах',
    checkout_summary_title: 'Төлбөрийн дүгнэлт'
  }
};

let locale = 'mn';
function t(key){
  return (translations[locale] && translations[locale][key]) || key;
}

// Apply translations to any element with data-i18n
function applyTranslations(){
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
}

// Аппын төлөв
const appState = { cart: [], productQuantities: {}, currentTotal: 0, customerInfo: null };

// DOM элементүүд
const elements = {
  productsGrid: document.getElementById('productsGrid'),
  cartBtn: document.getElementById('cartBtn'),
  cartSection: document.getElementById('cartSection'),
  closeCartBtn: document.getElementById('closeCartBtn'),
  cartCount: document.getElementById('cartCount'),
  cartItems: document.getElementById('cartItems'),
  cartContent: document.getElementById('cartContent'),
  emptyCartMessage: document.getElementById('emptyCartMessage'),
  subtotalAmount: document.getElementById('subtotalAmount'),
  deliveryAmount: document.getElementById('deliveryAmount'),
  totalAmount: document.getElementById('totalAmount'),
  checkoutBtn: document.getElementById('checkoutBtn'),
  continueBtns: [document.getElementById('continueShopping'), document.getElementById('continueShopping2')],
  productsSection: document.getElementById('productsSection')
};

// Бүтээгдэхүүн ID-г баталгаажуулах функц
function validateProducts(){
  const ids = new Set();
  const errors = [];
  
  products.forEach((p, idx) => {
    if(!p.id || !p.name || !p.description || !p.price || !p.images || p.images.length === 0){
      errors.push(`Бүтээгдэхүүн ${idx + 1}: Бүх талбар бөглөсөн эсэхийг шалгана уу (id, name, description, price, images)`);
    }
    if(ids.has(p.id)){
      errors.push(`Бүтээгдэхүүн ${idx + 1}: ID ${p.id} давхардсан байна`);
    }
    ids.add(p.id);
    if(typeof p.price !== 'number' || p.price < 0){
      errors.push(`Бүтээгдэхүүн ${p.name}: Үнэ нь зөв тоо байх ёстой`);
    }
  });
  
  if(errors.length > 0){
    console.error('⚠️ Бүтээгдэхүүнүүдийн алдаа:', errors);
  } else {
    console.log('✅ Бүтээгдэхүүнүүд зөв оруулсан:', products.length, 'ширхэг');
  }
}

// Эхлүүлэх
document.addEventListener('DOMContentLoaded', () => {
  validateProducts();
  products.forEach(p => (appState.productQuantities[p.id] = 0));
  applyTranslations();
  renderProducts();
  setupListeners();
  setupPaymentListeners();
});

function setupListeners(){
  // URL дээр tracking code байгаа эсэх шалгах
  checkTrackingCodeFromURL();
  
  elements.cartBtn.addEventListener('click', toggleCart);
  elements.closeCartBtn.addEventListener('click', toggleCart);
  elements.checkoutBtn.addEventListener('click', handleCheckout);
  elements.continueBtns.forEach(b => b && b.addEventListener('click', () => { toggleCart(); elements.productsSection.scrollIntoView({behavior:'smooth'}); }));
  
  // Tracking listeners
  const trackingBtn = document.getElementById('trackingBtn');
  const closeTrackingBtn = document.getElementById('closeTrackingBtn');
  const trackingSearchBtn = document.getElementById('trackingSearchBtn');
  const trackingCodeInput = document.getElementById('trackingCodeInput');
  const trackingRetryBtn = document.getElementById('trackingRetryBtn');
  
  if (trackingBtn) trackingBtn.addEventListener('click', toggleTracking);
  if (closeTrackingBtn) closeTrackingBtn.addEventListener('click', toggleTracking);
  if (trackingSearchBtn) trackingSearchBtn.addEventListener('click', handleTrackingSearch);
  if (trackingCodeInput) trackingCodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleTrackingSearch();
  });
  if (trackingRetryBtn) trackingRetryBtn.addEventListener('click', () => {
    document.getElementById('trackingError').style.display = 'none';
    document.getElementById('trackingForm').style.display = 'flex';
    trackingCodeInput.focus();
  });
  
  // Copy tracking code button
  const copyTrackingCodeBtn = document.getElementById('copyTrackingCodeBtn');
  if (copyTrackingCodeBtn) {
    copyTrackingCodeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const trackingCode = document.getElementById('confirmTrackingCode').textContent;
      if (trackingCode && trackingCode !== '-') {
        navigator.clipboard.writeText(trackingCode).then(() => {
          const btn = e.currentTarget;
          btn.classList.add('copied');
          btn.textContent = '✓';
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.textContent = '📋';
          }, 2000);
        }).catch(err => console.error('Copy error:', err));
      }
    });
  }
}

// Бүтээгдэхүүнүүдийг буулгах
function renderProducts(){
  elements.productsGrid.innerHTML = products.map(p => {
    const q = appState.productQuantities[p.id] || 0;
    const total = p.price * q;
    const images = p.images || [];
    const imagesHTML = images.map((img, idx) => 
      `<img src="${img}" alt="${p.name} ${idx+1}" loading="lazy" class="carousel-image" data-index="${idx}">`
    ).join('');
    
    return `
      <div class="product-card" data-product-id="${p.id}">
        <div class="product-carousel" data-id="${p.id}">
          <div class="carousel-container">
            ${imagesHTML}
          </div>
          <button class="carousel-btn prev" data-id="${p.id}">‹</button>
          <button class="carousel-btn next" data-id="${p.id}">›</button>
          <div class="carousel-dots">
            ${images.map((_, idx) => `<span class="dot ${idx === 0 ? 'active' : ''}" data-index="${idx}" data-id="${p.id}"></span>`).join('')}
          </div>
        </div>
        <div class="product-content">
          <h3 class="product-name">${p.name}</h3>
          <p class="product-description">${p.description}</p>
          <div class="product-price">₮${formatPrice(p.price)}</div>
          <p class="product-price-label">${t('per_unit')}</p>

          <div class="quantity-controls">
            <button class="qty-btn" data-action="decrease" data-id="${p.id}">−</button>
            <span class="quantity-display">${q}</span>
            <button class="qty-btn" data-action="increase" data-id="${p.id}">+</button>
          </div>

          <div class="product-total">Нийт дүн: ₮${formatPrice(total)}</div>
          <button class="add-to-cart-btn ${q>0? 'added':''}" data-id="${p.id}">${q>0? t('added_to_cart') : t('add_to_cart')}</button>
        </div>
      </div>
    `;
  }).join('');

  attachProductEvents();
}

function attachProductEvents(){
  document.querySelectorAll('.qty-btn').forEach(btn => btn.addEventListener('click', handleQty));
  document.querySelectorAll('.add-to-cart-btn').forEach(b => b.addEventListener('click', e => { const id = parseInt(e.currentTarget.dataset.id); addToCart(id); }));
  
  // Карусель логик
  const carousels = new Map();
  
  document.querySelectorAll('.product-carousel').forEach(carousel => {
    const id = parseInt(carousel.dataset.id);
    carousels.set(id, { currentIndex: 0, totalImages: carousel.querySelectorAll('.carousel-image').length });
  });
  
  function updateCarouselView(id){
    const carousel = document.querySelector(`.product-carousel[data-id="${id}"]`);
    if(!carousel) return;
    const state = carousels.get(id);
    if(!state) return;
    const container = carousel.querySelector('.carousel-container');
    if(!container) return;
    const offset = -state.currentIndex * 100;
    container.style.transform = `translateX(${offset}%)`;
    
    carousel.querySelectorAll('.dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === state.currentIndex);
    });
  }
  
  // Өмнөх дарах
  document.querySelectorAll('.carousel-btn.prev').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.dataset.id);
      const state = carousels.get(id);
      if(state){
        state.currentIndex = (state.currentIndex - 1 + state.totalImages) % state.totalImages;
        updateCarouselView(id);
      }
    });
  });
  
  // Дараа дарах
  document.querySelectorAll('.carousel-btn.next').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.dataset.id);
      const state = carousels.get(id);
      if(state){
        state.currentIndex = (state.currentIndex + 1) % state.totalImages;
        updateCarouselView(id);
      }
    });
  });
  
  // Цэг дарах
  document.querySelectorAll('.carousel-dots .dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.dataset.id);
      const index = parseInt(e.currentTarget.dataset.index);
      const state = carousels.get(id);
      if(state){
        state.currentIndex = index;
        updateCarouselView(id);
      }
    });
  });
  
  // Гүйлгэх (утас)
  let touchStartX = 0, touchEndX = 0;
  document.querySelectorAll('.carousel-container').forEach(container => {
    container.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, false);
    container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].clientX;
      const carousel = container.closest('.product-carousel');
      const id = parseInt(carousel.dataset.id);
      const state = carousels.get(id);
      if(state){
        if(touchStartX - touchEndX > 30){
          state.currentIndex = (state.currentIndex + 1) % state.totalImages;
        } else if(touchEndX - touchStartX > 30){
          state.currentIndex = (state.currentIndex - 1 + state.totalImages) % state.totalImages;
        }
        updateCarouselView(id);
      }
    }, false);
  });
}


function handleQty(e){
  const btn = e.currentTarget;
  const id = parseInt(btn.dataset.id);
  const action = btn.dataset.action;
  const cur = appState.productQuantities[id] || 0;
  const next = action === 'increase' ? cur + 1 : Math.max(0, cur -1);
  appState.productQuantities[id] = next;
  renderProducts();
}

function addToCart(id){
  const qty = appState.productQuantities[id] || 0;
  if(qty <= 0) return;
  const prod = products.find(p => p.id === id);
  const existing = appState.cart.find(i => i.id === id);
  if(existing) existing.quantity += qty; else appState.cart.push({ id, name: prod.name, price: prod.price, quantity: qty });
  appState.productQuantities[id] = 0;
  renderProducts(); renderCart(); updateCartCount();
}

function renderCart(){
  if(appState.cart.length === 0){
    elements.emptyCartMessage.style.display = 'flex';
    elements.cartContent.classList.add('hidden');
    return;
  }
  elements.emptyCartMessage.style.display = 'none';
  elements.cartContent.classList.remove('hidden');

  elements.cartItems.innerHTML = appState.cart.map(item => {
    const total = item.price * item.quantity;
    const displayName = item.quantity >= 2 ? `${item.name} x ${item.quantity}` : item.name;
    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name">${displayName}</div>
          <div class="cart-item-price">₮${formatPrice(item.price)} ${t('per_unit')}</div>
          <div class="cart-item-total">₮${formatPrice(total)}</div>
        </div>
        <div class="cart-item-controls">
          <div class="cart-qty-controls">
            <button class="cart-qty-btn" data-action="decrease" data-id="${item.id}">−</button>
            <span class="cart-qty-display">${item.quantity}</span>
            <button class="cart-qty-btn" data-action="increase" data-id="${item.id}">+</button>
          </div>
          <button class="remove-btn" data-id="${item.id}">${t('remove')}</button>
        </div>
      </div>
    `;
  }).join('');

  attachCartEvents(); updateCartSummary(); updateCartCount();
}

function attachCartEvents(){
  document.querySelectorAll('.cart-qty-btn').forEach(b => b.addEventListener('click', handleCartQty));
  document.querySelectorAll('.remove-btn').forEach(b => b.addEventListener('click', e => { const id = parseInt(e.currentTarget.dataset.id); removeFromCart(id); }));
}

function handleCartQty(e){
  const id = parseInt(e.currentTarget.dataset.id);
  const action = e.currentTarget.dataset.action;
  const item = appState.cart.find(i => i.id === id);
  if(!item) return;
  const next = action === 'increase' ? item.quantity + 1 : Math.max(1, item.quantity -1);
  item.quantity = next; renderCart(); updateCartSummary();
}

function removeFromCart(id){
  appState.cart = appState.cart.filter(i => i.id !== id);
  renderCart(); updateCartCount();
}

function getCartTotal(){
  return appState.cart.reduce((s,i) => s + (i.price * i.quantity), 0);
}

function updateCartSummary(){
  const subtotal = getCartTotal();
  const delivery = 5000;
  const total = subtotal + delivery;
  elements.subtotalAmount.textContent = `₮${formatPrice(subtotal)}`;
  elements.deliveryAmount.textContent = `₮${formatPrice(delivery)}`;
  elements.totalAmount.textContent = `₮${formatPrice(total)}`;
}

function updateCartCount(){
  const count = appState.cart.reduce((s,i) => s + i.quantity, 0);
  elements.cartCount.textContent = count;
}

function toggleCart(){
  elements.cartSection.classList.toggle('hidden');
  if(!elements.cartSection.classList.contains('hidden')){
    document.body.style.overflow = 'hidden';
    renderCart();
  } else document.body.style.overflow = 'auto';
}

function handleCheckout(){
  if(appState.cart.length === 0){
    alert('Сагс хоосон байна!');
    return;
  }
  const subtotal = getCartTotal();
  const delivery = 5000;
  const total = subtotal + delivery;
  
  // Төлбөрийн модальд данс нөхөх
  document.getElementById('modalSubtotal').textContent = `₮${formatPrice(subtotal)}`;
  document.getElementById('modalDelivery').textContent = `₮${formatPrice(delivery)}`;
  document.getElementById('modalTotal').textContent = `₮${formatPrice(total)}`;
  
  appState.currentTotal = total;
  
  // Modal нээх
  document.getElementById('paymentModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function setupPaymentListeners(){
  // Төлбөрийн modal эвент
  const paymentModal = document.getElementById('paymentModal');
  const qrModal = document.getElementById('qrModal');
  const paymentForm = document.getElementById('paymentForm');
  
  // Хуулах товч эвент
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.dataset.copy;
      const text = document.getElementById(targetId).textContent;
      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        btn.textContent = '✓';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.textContent = '📋';
        }, 2000);
      }).catch(err => console.error('Хуулахад алдаа:', err));
    });
  });
  
  document.querySelectorAll('.copy-btn-sm').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.dataset.copy;
      const text = document.getElementById(targetId).textContent;
      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        btn.textContent = '✓';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.textContent = '📋';
        }, 2000);
      }).catch(err => console.error('Хуулахад алдаа:', err));
    });
  });
  
  document.getElementById('closePaymentModal').addEventListener('click', () => {
    paymentModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });
  
  paymentModal.addEventListener('click', (e) => {
    if(e.target === paymentModal){
      paymentModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  });
  
  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (document.getElementById('nameInput') || {}).value?.trim();
    const phone = (document.getElementById('phoneInput') || {}).value?.trim();
    const address = (document.getElementById('addressInput') || {}).value?.trim();
    const notes = (document.getElementById('notesInput') || {}).value?.trim();

    if(!name || !phone || !address){
      alert('Захиалагчийн нэр, утасны дугаар болон хүргэлтийн хаяг оруулна уу!');
      return;
    }

    // Хэрэглэгчийн мэдээллийг хадгалах
    appState.customerInfo = { name, phone, address, notes };

    // QR modal нээх
    paymentModal.classList.add('hidden');
    showQRModal();
    qrModal.classList.remove('hidden');
  });
  
  // QR modal эвентүүд
  document.getElementById('closeQrModal').addEventListener('click', () => {
    qrModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });
  
  qrModal.addEventListener('click', (e) => {
    if(e.target === qrModal){
      qrModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  });
  
  document.getElementById('completePayment').addEventListener('click', () => {
    completePayment();
  });
  
  // Google Maps товч
  const viewMapBtn = document.getElementById('viewMapBtn');
  if(viewMapBtn){
    viewMapBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const address = (document.getElementById('addressInput') || {}).value?.trim();
      if(!address){
        alert('Хүргэлтийн хаяг оруулна уу!');
        return;
      }
      // Улаанбаатар хотын координат (сонголт)
      const searchQuery = encodeURIComponent(address + ', Улаанбаатар, Монгол');
      const mapsUrl = `https://www.google.com/maps/search/${searchQuery}`;
      window.open(mapsUrl, '_blank');
    });
  }
  
  // Банкны апп линкүүдэд эвент
  document.querySelectorAll('.bank-app-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // Энд банкны апп холбох боломжтой
      alert('Банкны апп руу шилжүүлнэ...');
    });
  });
}

function showQRModal(){
  // QR код үүсгэх
  const canvas = document.getElementById('qrCodeCanvas');
  canvas.innerHTML = ''; // Өмнөх QR-г арилгах
  
  // QR-д оруулах бүтээгдэхүүний жагсаалт
  const cartSummary = appState.cart.map(i => `${i.name} x${i.quantity}`).join(', ');
  const qrText = `JUGGERNAUT ELECTRIC | Дүн: ₮${formatPrice(appState.currentTotal)} | ${cartSummary}`;
  
  try{
    new QRCode(canvas, {
      text: qrText,
      width: 200,
      height: 200,
      colorDark: '#ffffff',
      colorLight: '#1f1f23'
    });
  } catch(e){
    canvas.innerHTML = '<p style="color: var(--muted);">QR код үүсэх боломжгүй</p>';
  }
}

function completePayment() {
  console.log("completePayment ажиллаж байна ✅");

  // Дахин дуудагдахаас сахих
  if (appState.orderIdInProgress) {
    console.warn("⚠️ Order already in progress");
    return;
  }

  const phone = document.getElementById('phoneInput').value;
  const address = document.getElementById('addressInput').value;
  const notes = document.getElementById('notesInput').value;
  
  if(!phone || !address){
    alert('Утасны дугаар болон хүргэлтийн хаяг оруулна уу!');
    return;
  }
  
  // OrderId үүсгүүлж хадгалаж, дахин processing байхыг зэмэлшүүлэх
  const orderId = Date.now();
  appState.orderIdInProgress = orderId;
  const subtotal = getCartTotal();
  const delivery = 5000;
  const total = subtotal + delivery;
  const productList = appState.cart.map(item =>
  `• ${item.name} x${item.quantity} = ₮${formatPrice(item.price * item.quantity)}`
).join("\n");

  const message = `
⏳ ШИНЭ ЗАХИАЛГА
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Захиалгын код: <b>${appState.trackingCode || '...'}</b>

👤 Нэр: <b>${appState.customerInfo?.name || "Нэр оруулаагүй"}</b>
📞 Утас: ${phone}
📍 Хаяг: ${address}

📝 Нэмэлт мэдээлэл:
${notes || "Байхгүй"}

📦 Захиалсан бүтээгдэхүүн:
${productList}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Нийт ширхэг: ${appState.cart.reduce((s,i)=>s+i.quantity,0)}
💰 Барааны үнэ: ₮${formatPrice(subtotal)}
🚚 Хүргэлт: ₮${formatPrice(delivery)}
✅ Төлөх дүн: ₮${formatPrice(total)}

⚠️ Та байгууллагын дансанд төлбөр төлөгдсөн эсэхийг шалгана уу!
`;

  console.log('🛒 Sending cart to backend:', appState.cart);
  sendTelegramMessage(message, orderId, appState.cart, (trackingCode) => {
    // Callback - tracking code авсны дараа
    appState.trackingCode = trackingCode; // Tracking code хадгалах
    appState.orderIdInProgress = null; // Flag сэргээх
    
    // Сагсыг цэвэрлэх
    appState.cart = [];
    appState.productQuantities = {};
    products.forEach(p => appState.productQuantities[p.id] = 0);

    // Modal хаах
    document.getElementById('qrModal').classList.add('hidden');

    // Харуулах: сайтын стильд тохирсон баталгаажуулалтын модаль
    const confirmModal = document.getElementById('confirmModal');
    const confirmTextEl = document.getElementById('confirmText');
    const confirmCodeEl = document.getElementById('confirmTrackingCode');
    
    if(confirmCodeEl && trackingCode) {
      confirmCodeEl.textContent = trackingCode;
    }
    
    if(confirmTextEl) confirmTextEl.textContent = 'Төлбөр баталгаажихад 5-10 минут зарцуулагдах ба баталгаажсны дараа таны утсанд SMS илгээгдэх болно';
    if(confirmModal){
      confirmModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';

      const hideConfirm = () => {
        confirmModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      };

      document.getElementById('closeConfirmModal').onclick = hideConfirm;
      document.getElementById('confirmOkBtn').onclick = hideConfirm;

      // Автоматаар хаагдах (20 секунд)
      setTimeout(hideConfirm, 20000);
    }

    // Дэлгэцийг шинэчлэх
    renderProducts();
    renderCart();
    updateCartCount();
    // Хэрэглэгч сагс дэлгэцийг хаах
    if(!elements.cartSection.classList.contains('hidden')) toggleCart();
  });
}

let lastSentOrderId = null; // Duplicate prevention

function sendTelegramMessage(message, orderId, cartItems, callback) {
  // Duplicate check - нэг orderId л нэг удаа явуулна
  if (lastSentOrderId === orderId) {
    console.warn("⚠️ Duplicate order ID - skipping");
    if (callback && typeof callback === 'function') {
      callback(null);
    }
    return;
  }
  lastSentOrderId = orderId;
  
  const phone = (document.getElementById('phoneInput') || {}).value || '';
  const name = appState.customerInfo?.name || '';
  const address = appState.customerInfo?.address || '';
  const customerTelegramId = (document.getElementById('customerTelegramId') || {}).value || '';
  
  console.log('📤 Sending to backend:', {
    orderId: orderId,
    phone: phone,
    name: name,
    address: address,
    cartItems: cartItems,
    cartItemsCount: cartItems ? cartItems.length : 0
  });
  
  fetch("https://electrical-store-backend.onrender.com/send-telegram", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"  
    },
    body: JSON.stringify({ message: message, orderId: orderId, phone: phone, name: name, address: address, customerTelegramId: customerTelegramId, cartItems: cartItems })  
  })
  .then(res => res.json())
  .then(data => {
    console.log("Telegram OK:", data);
    // Tracking code авах
    if (data.trackingCode) {
      console.log("📱 Tracking Code:", data.trackingCode);
      
      // Callback дуудаж tracking code дамжуулах
      if (callback && typeof callback === 'function') {
        callback(data.trackingCode);
      }
    } else {
      if (callback && typeof callback === 'function') {
        callback(null);
      }
    }
  })
  .catch(err => {
    console.error("Telegram ERROR:", err);
    alert("Алдаа гарлаа ❌ Console шалгана уу");
    if (callback && typeof callback === 'function') {
      callback(null);
    }
  });
}

// Payment form submit эвент
const paymentFormEl = document.getElementById("paymentForm");
if (paymentFormEl) {
  paymentFormEl.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Payment form submit ✅");

    const nameEl = document.getElementById("nameInput") || {};
    const phoneEl = document.getElementById("phoneInput") || {};
    const addressEl = document.getElementById("addressInput") || {};
    const notesEl = document.getElementById("notesInput") || {};

    const name = (nameEl.value || '').trim();
    const phone = (phoneEl.value || '').trim();
    const address = (addressEl.value || '').trim();
    const notes = (notesEl.value || '').trim();

    if (!name || !phone || !address) {
      alert("Нэр, утас, хаяг оруулна уу!");
      return;
    }

    // хэрэглэгчийн мэдээлэл хадгалах
    appState.customerInfo = { name, phone, address, notes };

    // payment modal хаах
    const paymentModalEl = document.getElementById("paymentModal");
    if (paymentModalEl) paymentModalEl.classList.add("hidden");

    // QR modal нээх
    showQRModal();
    const qrModalEl = document.getElementById("qrModal");
    if (qrModalEl) qrModalEl.classList.remove("hidden");
  });
}

// Complete payment button эвент - duplicate click защита
let isProcessingPayment = false;
const completePaymentBtn = document.getElementById("completePayment");
if (completePaymentBtn) {
  completePaymentBtn.addEventListener("click", function () {
    // Давхар click-с сайн
    if (isProcessingPayment) {
      console.warn("⚠️ Payment already processing");
      return;
    }
    isProcessingPayment = true;
    completePayment();
    // Payment боловсруулалт дуусч tracking code авсны дараа flag сэргээх
    setTimeout(() => {
      isProcessingPayment = false;
    }, 3000);
  });
}

// ===== TRACKING FUNCTIONS =====

function toggleTracking(){
  const trackingSection = document.getElementById('trackingSection');
  trackingSection.classList.toggle('hidden');
  if(!trackingSection.classList.contains('hidden')){
    document.body.style.overflow = 'hidden';
    document.getElementById('trackingCodeInput').focus();
  } else {
    document.body.style.overflow = 'auto';
  }
}

let trackingPollingInterval = null;
let currentTrackingCode = null;

function handleTrackingSearch(){
  const trackingCode = document.getElementById('trackingCodeInput').value.trim().toUpperCase();
  
  if (!trackingCode) {
    alert('Захиалгын кодыг оруулна уу!');
    return;
  }

  // Tracking code хадгалах
  currentTrackingCode = trackingCode;

  document.getElementById('trackingForm').style.display = 'none';
  document.getElementById('trackingResult').style.display = 'none';
  document.getElementById('trackingError').style.display = 'none';
  document.getElementById('trackingLoading').style.display = 'block';

  fetchTrackingData(trackingCode);

  // Polling: 3 секунд тутам
  if (trackingPollingInterval) clearInterval(trackingPollingInterval);
  trackingPollingInterval = setInterval(() => fetchTrackingData(trackingCode), 3000);
}

async function fetchTrackingData(trackingCode) {
  try {
    const response = await fetch(`https://electrical-store-backend.onrender.com/track/${encodeURIComponent(trackingCode)}`);
    const data = await response.json();

    console.log('🔍 Tracking Response:', data);

    document.getElementById('trackingLoading').style.display = 'none';

    if (data.success) {
      const order = data.order;

      console.log('✅ Order retrieved:', order);

      updateTrackingTimeline(order.status);
      displayTrackingInfo(order);

      document.getElementById('trackingError').style.display = 'none';
      document.getElementById('trackingResult').style.display = 'block';

      // Хүргэгдсэн эсвэл цуцлагдсан болсон үед polling зогс
      if (order.status === 'done' || order.status === 'cancel') {
        clearInterval(trackingPollingInterval);
      }
    } else {
      console.log('❌ Tracking failed:', data);
      document.getElementById('trackingErrorText').textContent = 'Захиалга олдсонгүй. Кодыг зөв оруулсан эсэхийг шалгана уу.';
      document.getElementById('trackingError').style.display = 'block';
      clearInterval(trackingPollingInterval);
      document.getElementById('trackingForm').style.display = 'flex';
    }
  } catch (err) {
    console.error('Tracking error:', err);
    // Continue polling on error
  }
}

function updateTrackingTimeline(status) {
  const statuses = ['pending', 'shi', 'ready', 'done'];
  const statusIndex = statuses.indexOf(status);

  const timelineHtml = `
    <div style="display: flex; align-items: center; margin: 8px 0;">
      <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${statusIndex >= 0 ? '#4caf50' : '#666'}; margin-right: 8px;"></span>
      <span style="color: #ccc;">⏳ Захиалга бэлдэж байна</span>
    </div>
    <div style="display: flex; align-items: center; margin: 8px 0;">
      <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${statusIndex >= 1 ? '#4caf50' : '#666'}; margin-right: 8px;"></span>
      <span style="color: #ccc;">📦 Хүргэлт гарсан</span>
    </div>
    <div style="display: flex; align-items: center; margin: 8px 0;">
      <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${statusIndex >= 2 ? '#4caf50' : '#666'}; margin-right: 8px;"></span>
      <span style="color: #ccc;">🚚 Замдаа явж байна</span>
    </div>
    <div style="display: flex; align-items: center; margin: 8px 0;">
      <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${statusIndex >= 3 ? '#4caf50' : '#666'}; margin-right: 8px;"></span>
      <span style="color: #ccc;">✅ Хүргэгдсэн</span>
    </div>
  `;
  
  document.getElementById('timeline').innerHTML = timelineHtml;
}

function displayTrackingInfo(order) {
  console.log('📦 Display Tracking Info:', order);
  console.log('📦 Cart Items:', order.cartItems);
  
  // Хүргэлтийн мэдээлэл
  document.getElementById('trackingName').textContent = order.name || 'Мэдээлэл байхгүй';
  document.getElementById('trackingAddress').textContent = order.address || 'Мэдээлэл байхгүй';
  
  // Статус
  const statusMap = {
    'pending': '⏳ Бэлдэж байна',
    'shi': '📦 Хүргэлт гарсан',
    'ready': '🚚 Замдаа явж байна',
    'done': '✅ Хүргэгдсэн',
    'cancel': '❌ Цуцлагдсан'
  };
  document.getElementById('trackingStatus').textContent = statusMap[order.status] || 'Статус мэдээлэл байхгүй';
  
  // Бүтээгдэхүүн
  const productsList = document.getElementById('productsList');
  const productsEmpty = document.getElementById('productsEmpty');
  
  console.log('🛒 Checking cartItems:', {
    exists: !!order.cartItems,
    isArray: Array.isArray(order.cartItems),
    length: order.cartItems ? order.cartItems.length : 0
  });
  
  if (order.cartItems && Array.isArray(order.cartItems) && order.cartItems.length > 0) {
    console.log('✅ Rendering products');
    productsList.innerHTML = order.cartItems.map(item => `
      <div style="padding: 10px; background: #555; border-radius: 6px; border: 1px solid #666; display: flex; justify-content: space-between; align-items: center;">
        <div style="flex: 1;">
          <p style="margin: 0 0 5px 0; font-weight: 600; font-size: 14px; color: #fff;">${item.name}</p>
          <p style="margin: 0; color: #bbb; font-size: 12px;">x${item.quantity}</p>
        </div>
        <div style="text-align: right;">
          <p style="margin: 0; font-weight: 600; font-size: 14px; color: #ff6b6b;">₩${(item.price * item.quantity).toLocaleString('mn-MN')}</p>
        </div>
      </div>
    `).join('');
    productsEmpty.style.display = 'none';
  } else {
    console.log('❌ No products found');
    productsEmpty.style.display = 'block';
    productsList.innerHTML = '';
  }
}

// ========== Back to Top Button Functionality ==========
const backToTopBtn = document.getElementById('backToTopBtn');

// Үзэгдэх үеэр товчны үзэгдэх эсэхийг шалгах
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

// Back to Top товчны клик эвент
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

console.log('✅ Мобиль функцыг нэмсэн: Back to Top кнопка идэвхтэй байна');

// ========== Product Search Functionality ==========
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim().toLowerCase();
  
  if (query.length === 0) {
    searchResults.classList.add('hidden');
    return;
  }
  
  // Хайлтыг гүйцэтгэх
  const filtered = products.filter(product => 
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query)
  );
  
  if (filtered.length === 0) {
    searchResults.innerHTML = '<div class="search-result-item" style="text-align: center; color: var(--muted);">Бүтээгдэхүүн олдсонгүй</div>';
    searchResults.classList.remove('hidden');
    return;
  }
  
  // Хайлтын үр дүнг харуулах
  searchResults.innerHTML = filtered.map(product => `
    <div class="search-result-item" onclick="scrollToProduct(${product.id}); document.getElementById('searchResults').classList.add('hidden'); document.getElementById('searchInput').value = '';">
      <div class="search-result-name">${product.name}</div>
      <div class="search-result-price">₩${product.price.toLocaleString('mn-MN')}</div>
    </div>
  `).join('');
  
  searchResults.classList.remove('hidden');
});

// Бүтээгдэхүүн хүртэл скроллох функц
function scrollToProduct(productId) {
  const productCard = document.querySelector(`[data-product-id="${productId}"]`);
  if (productCard) {
    productCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Гэрэлтүүлэх эффект
    productCard.style.animation = 'highlight 1s ease';
  }
}

// Highlight анимейшн нэмэх
const style = document.createElement('style');
style.textContent = `
  @keyframes highlight {
    0% { background-color: rgba(255, 180, 0, 0.3); }
    100% { background-color: transparent; }
  }
`;
document.head.appendChild(style);

// Хайлт нээлттэй байхад гадны зүйл дээр клик хийхэд хаах
document.addEventListener('click', (e) => {
  if (!e.target.closest('.header-search') && !searchResults.classList.contains('hidden')) {
    searchResults.classList.add('hidden');
  }
});

console.log('✅ Хайлт функцыг нэмсэн: Бүтээгдэхүүнээр хайх бололцоотой');

