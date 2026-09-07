/**
 * DYUTI 2027 — Production JavaScript Controller
 * Provides exact client-side functionality matching https://dyuti27new.vercel.app/
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initSubThemesSearch();
  initRajagiriSlider();
  initOurTeamFilters();
  initGalleryLightbox();
  initRegistrationForm();
  initContactForm();
  initSmoothPageNavigation();
});

/* ── 1. NAVBAR SCROLL & FLOATING CONTROLLER ── */
function initNavbar() {
  const headerContainer = document.querySelector('header .navbar-container');
  const marqueeBar = document.getElementById('attached-marquee-bar');
  if (!headerContainer) return;

  function updateNavbarScroll() {
    const isScrolled = window.scrollY > 20;
    if (isScrolled) {
      headerContainer.classList.add('shadow-[0_16px_45px_rgba(10,37,64,0.65)]', 'border-blue-300/40');
      if (marqueeBar) {
        marqueeBar.classList.add('max-h-0', 'opacity-0', '-translate-y-3', 'pointer-events-none');
        marqueeBar.classList.remove('max-h-14', 'opacity-100', 'translate-y-0');
      }
    } else {
      headerContainer.classList.remove('shadow-[0_16px_45px_rgba(10,37,64,0.65)]', 'border-blue-300/40');
      if (marqueeBar) {
        marqueeBar.classList.remove('max-h-0', 'opacity-0', '-translate-y-3', 'pointer-events-none');
        marqueeBar.classList.add('max-h-14', 'opacity-100', 'translate-y-0');
      }
    }
  }

  window.addEventListener('scroll', updateNavbarScroll, { passive: true });
  updateNavbarScroll();
}

/* ── 2. MOBILE MENU DRAWER ── */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const closeBtn = document.getElementById('mobile-drawer-close');

  if (!toggleBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
    overlay.classList.add('open');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-100', 'pointer-events-auto');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    drawer.classList.remove('translate-x-0');
    drawer.classList.add('translate-x-full');
    overlay.classList.remove('open');
    overlay.classList.remove('opacity-100', 'pointer-events-auto');
    overlay.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
}

/* ── 3. SUB-THEMES SEARCH (HOME & CFP PAGES) ── */
function initSubThemesSearch() {
  const searchInput = document.getElementById('theme-search-input');
  const themeCards = document.querySelectorAll('.subtheme-card');

  if (!searchInput || !themeCards.length) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    themeCards.forEach(card => {
      const title = card.getAttribute('data-title')?.toLowerCase() || '';
      const topics = card.getAttribute('data-topics')?.toLowerCase() || '';
      if (!term || title.includes(term) || topics.includes(term)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* ── 4. RAJAGIRI SOCIAL WORK SLIDER (RAJAGIRI PAGE) ── */
let rajagiriSlideTimer = null;

function initRajagiriSlider() {
  const slides = document.querySelectorAll('.rajagiri-slide-card');
  const dots = document.querySelectorAll('.rajagiri-slide-dot');
  if (!slides.length) return;

  if (rajagiriSlideTimer) {
    clearInterval(rajagiriSlideTimer);
    rajagiriSlideTimer = null;
  }

  let currentSlide = 0;

  function showSlide(index) {
    currentSlide = index;
    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.remove('hidden');
        slide.classList.add('block');
      } else {
        slide.classList.add('hidden');
        slide.classList.remove('block');
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentSlide) {
        dot.classList.add('bg-amber-400', 'w-8');
        dot.classList.remove('bg-white/40', 'w-2.5');
      } else {
        dot.classList.remove('bg-amber-400', 'w-8');
        dot.classList.add('bg-white/40', 'w-2.5');
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      if (rajagiriSlideTimer) clearInterval(rajagiriSlideTimer);
      showSlide(idx);
      rajagiriSlideTimer = setInterval(nextSlide, 4500);
    });
  });

  showSlide(0);
  rajagiriSlideTimer = setInterval(nextSlide, 4500);
}

/* ── 5. OUR TEAM SEARCH & CATEGORY TABS ── */
function initOurTeamFilters() {
  const categoryTabs = document.querySelectorAll('.team-category-tab');
  const searchInput = document.getElementById('team-search-input');
  const teamCards = document.querySelectorAll('.team-member-card');
  const sectionContainers = document.querySelectorAll('.team-section-container');

  if (!teamCards.length) return;

  function applyFilters() {
    const activeTab = document.querySelector('.team-category-tab.active')?.getAttribute('data-category') || 'all';
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    teamCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const name = card.getAttribute('data-name')?.toLowerCase() || '';
      const designation = card.getAttribute('data-designation')?.toLowerCase() || '';

      const matchCategory = activeTab === 'all' || category === activeTab;
      const matchSearch = !query || name.includes(query) || designation.includes(query);

      if (matchCategory && matchSearch) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });

    // Toggle entire section visibility if all its cards are hidden
    sectionContainers.forEach(sec => {
      const visibleChildren = sec.querySelectorAll('.team-member-card:not([style*="display: none"])');
      const secCategory = sec.getAttribute('data-category') || '';
      if ((activeTab === 'all' || secCategory === activeTab) && visibleChildren.length > 0) {
        sec.style.display = '';
      } else {
        sec.style.display = 'none';
      }
    });
  }

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => {
        t.classList.remove('active', 'bg-[#071A33]', 'text-white', 'font-black');
        t.classList.add('bg-white', 'text-slate-800', 'font-bold');
      });
      tab.classList.add('active', 'bg-[#071A33]', 'text-white', 'font-black');
      tab.classList.remove('bg-white', 'text-slate-800', 'font-bold');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  // Copy email functionality
  document.querySelectorAll('.copy-email-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const email = btn.getAttribute('data-email');
      if (email) {
        navigator.clipboard.writeText(email).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = '<span>Copied!</span>';
          setTimeout(() => { btn.innerHTML = originalText; }, 2000);
        });
      }
    });
  });
}

/* ── 6. GALLERY FILTERS & LIGHTBOX ── */
function initGalleryLightbox() {
  const filterTabs = document.querySelectorAll('.gallery-tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let activeIndex = 0;
  let currentVisibleList = [];

  function updateVisibleList() {
    currentVisibleList = Array.from(galleryItems).filter(item => item.style.display !== 'none');
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active', 'bg-[#071A33]', 'text-white', 'font-black');
        t.classList.add('bg-white', 'text-slate-800', 'font-bold');
      });
      tab.classList.add('active', 'bg-[#071A33]', 'text-white', 'font-black');
      tab.classList.remove('bg-white', 'text-slate-800', 'font-bold');

      const filter = tab.getAttribute('data-year') || 'all';
      galleryItems.forEach(item => {
        const itemYear = item.getAttribute('data-year') || '';
        if (filter === 'all' || itemYear === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
      updateVisibleList();
    });
  });

  function openModal(index) {
    updateVisibleList();
    if (!currentVisibleList.length) return;
    activeIndex = index;
    const item = currentVisibleList[activeIndex];
    const src = item.getAttribute('data-src');
    const title = item.getAttribute('data-title');
    const year = item.getAttribute('data-year');

    if (lightboxImg) lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = `${year ? year + ' — ' : ''}${title}`;
    if (lightbox) {
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (lightbox) {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
      document.body.style.overflow = '';
    }
  }

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      updateVisibleList();
      const pos = currentVisibleList.indexOf(item);
      if (pos !== -1) openModal(pos);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (prevBtn) prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    activeIndex = (activeIndex - 1 + currentVisibleList.length) % currentVisibleList.length;
    openModal(activeIndex);
  });
  if (nextBtn) nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    activeIndex = (activeIndex + 1) % currentVisibleList.length;
    openModal(activeIndex);
  });

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (lightbox && !lightbox.classList.contains('hidden')) {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
      if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    }
  });

  updateVisibleList();
}

/* ── 7. REGISTRATION PORTAL MULTI-STEP LOGIC ── */
function initRegistrationForm() {
  const form = document.getElementById('registration-multi-step-form');
  if (!form) return;

  // Step containers
  const stepFormView = document.getElementById('reg-step-form');
  const stepReviewView = document.getElementById('reg-step-review');
  const stepSuccessView = document.getElementById('reg-step-success');

  // Step indicators
  const stepInd1 = document.getElementById('step-indicator-1');
  const stepInd2 = document.getElementById('step-indicator-2');
  const stepInd3 = document.getElementById('step-indicator-3');

  // Error alerts
  const formErrorBox = document.getElementById('reg-form-error');
  const formErrorMsg = document.getElementById('reg-form-error-msg');
  const reviewErrorBox = document.getElementById('review-error-box');
  const reviewErrorMsg = document.getElementById('review-error-msg');

  // Interactive selectors
  const pillCards = form.querySelectorAll('.reg-pill-card');
  const categoryCards = form.querySelectorAll('.reg-category-card');
  const paymentCards = form.querySelectorAll('.payment-mode-card');
  const paperConditional = document.getElementById('paper-details-conditional');
  const bankDetailsBox = document.getElementById('bank-transfer-details-box');
  const proceedReviewLabel = document.getElementById('btn-proceed-review-label');

  // Action buttons
  const btnBackToForm = document.getElementById('btn-back-to-form');
  const btnConfirmSubmit = document.getElementById('btn-confirm-submit');
  const btnConfirmSubmitLabel = document.getElementById('btn-confirm-submit-label');
  const agreeTermsCheckbox = document.getElementById('agree-terms-checkbox');
  const btnPrintReceipt = document.getElementById('btn-print-receipt');

  // Category Configuration
  const categories = {
    student: {
      label: 'UG / PG Student',
      fee: '₹ 750',
      amount: 750,
      desc: 'Graduate & Postgraduate Students'
    },
    scholar: {
      label: 'M.Phil / Research Scholars',
      fee: '₹ 750',
      amount: 750,
      desc: 'Full-time & PhD Research Scholars'
    },
    professional: {
      label: 'Professionals / Academicians',
      fee: '₹ 1,000',
      amount: 1000,
      desc: 'Faculty Members, NGO & CSR Delegates'
    }
  };

  let currentCategoryKey = 'student';
  let currentPaymentMode = 'online';

  // 1. Pill Cards click handler (Food, Accommodation, Paper Presenter)
  pillCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const radio = card.querySelector('input[type="radio"]');
      if (!radio) return;
      const groupName = card.getAttribute('data-group') || radio.name;

      // Update selection for this group
      pillCards.forEach(c => {
        if (c.getAttribute('data-group') === groupName) {
          c.classList.remove('active', 'bg-[#071A33]', 'text-white', 'border-[#071A33]', 'shadow-md');
          c.classList.add('bg-slate-50/90', 'border-slate-200', 'text-slate-900');
          const r = c.querySelector('input[type="radio"]');
          if (r) r.checked = false;
        }
      });

      card.classList.add('active', 'bg-[#071A33]', 'text-white', 'border-[#071A33]', 'shadow-md');
      card.classList.remove('bg-slate-50/90', 'border-slate-200', 'text-slate-900');
      radio.checked = true;

      // Conditional paper details toggle
      if (groupName === 'isPresentingPaper') {
        if (radio.value === 'yes') {
          if (paperConditional) paperConditional.classList.remove('hidden');
        } else {
          if (paperConditional) paperConditional.classList.add('hidden');
        }
      }
    });
  });

  // 2. Category Cards click handler
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const catKey = card.getAttribute('data-category');
      if (!catKey || !categories[catKey]) return;

      currentCategoryKey = catKey;
      categoryCards.forEach(c => {
        c.classList.remove('active', 'bg-[#071A33]', 'text-white', 'border-[#071A33]', 'shadow-xl', 'ring-4', 'ring-slate-900/10');
        c.classList.add('bg-slate-50/90', 'border-slate-200', 'text-slate-900');
        const r = c.querySelector('input[type="radio"]');
        if (r) r.checked = false;
      });

      card.classList.add('active', 'bg-[#071A33]', 'text-white', 'border-[#071A33]', 'shadow-xl', 'ring-4', 'ring-slate-900/10');
      card.classList.remove('bg-slate-50/90', 'border-slate-200', 'text-slate-900');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      updateButtonLabels();
    });
  });

  // 3. Payment Mode Cards click handler
  paymentCards.forEach(card => {
    card.addEventListener('click', () => {
      const mode = card.getAttribute('data-mode') || 'online';
      currentPaymentMode = mode;

      paymentCards.forEach(c => {
        c.classList.remove('active', 'bg-[#071A33]', 'text-white', 'border-[#071A33]', 'shadow-xl', 'ring-4', 'ring-slate-900/10');
        c.classList.add('bg-slate-50/90', 'border-slate-200', 'text-slate-900');
        const r = c.querySelector('input[type="radio"]');
        if (r) r.checked = false;
      });

      card.classList.add('active', 'bg-[#071A33]', 'text-white', 'border-[#071A33]', 'shadow-xl', 'ring-4', 'ring-slate-900/10');
      card.classList.remove('bg-slate-50/90', 'border-slate-200', 'text-slate-900');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      if (mode === 'bank_transfer') {
        if (bankDetailsBox) bankDetailsBox.classList.remove('hidden');
      } else {
        if (bankDetailsBox) bankDetailsBox.classList.add('hidden');
      }

      updateButtonLabels();
    });
  });

  function updateButtonLabels() {
    const cat = categories[currentCategoryKey] || categories.student;
    if (proceedReviewLabel) {
      if (currentPaymentMode === 'online') {
        proceedReviewLabel.textContent = `Review & Pay ₹ ${cat.amount.toLocaleString()}`;
      } else {
        proceedReviewLabel.textContent = 'Review & Confirm Details';
      }
    }
    if (btnConfirmSubmitLabel) {
      if (currentPaymentMode === 'online') {
        btnConfirmSubmitLabel.textContent = `Register & Pay ₹ ${cat.amount.toLocaleString()} Now`;
      } else {
        btnConfirmSubmitLabel.textContent = 'Confirm & Submit Registration';
      }
    }
  }

  function setStep(step) {
    // step: 'form' | 'review' | 'success'
    if (step === 'form') {
      if (stepFormView) stepFormView.classList.remove('hidden');
      if (stepReviewView) stepReviewView.classList.add('hidden');
      if (stepSuccessView) stepSuccessView.classList.add('hidden');

      if (stepInd1) {
        stepInd1.className = 'step-tab flex-1 py-2.5 px-3 sm:px-5 rounded-full text-center text-sm sm:text-base font-sans font-extrabold transition-all flex items-center justify-center gap-2.5 bg-[#071A33] text-white shadow-md';
        const b = stepInd1.querySelector('span:first-child');
        if (b) b.className = 'w-6 h-6 rounded-full bg-white/20 text-white text-xs font-mono flex items-center justify-center font-black shrink-0';
      }
      if (stepInd2) {
        stepInd2.className = 'step-tab flex-1 py-2.5 px-3 sm:px-5 rounded-full text-center text-sm sm:text-base font-sans font-extrabold transition-all flex items-center justify-center gap-2.5 text-slate-600';
        const b = stepInd2.querySelector('span:first-child');
        if (b) b.className = 'w-6 h-6 rounded-full bg-slate-200 text-slate-800 text-xs font-mono flex items-center justify-center font-black shrink-0';
      }
      if (stepInd3) {
        stepInd3.className = 'step-tab flex-1 py-2.5 px-3 sm:px-5 rounded-full text-center text-sm sm:text-base font-sans font-extrabold transition-all flex items-center justify-center gap-2.5 text-slate-500';
        const b = stepInd3.querySelector('span:first-child');
        if (b) b.className = 'w-6 h-6 rounded-full bg-slate-200 text-slate-800 text-xs font-mono flex items-center justify-center font-black shrink-0';
      }
    } else if (step === 'review') {
      if (stepFormView) stepFormView.classList.add('hidden');
      if (stepReviewView) stepReviewView.classList.remove('hidden');
      if (stepSuccessView) stepSuccessView.classList.add('hidden');

      if (stepInd1) {
        stepInd1.className = 'step-tab flex-1 py-2.5 px-3 sm:px-5 rounded-full text-center text-sm sm:text-base font-sans font-extrabold transition-all flex items-center justify-center gap-2.5 text-slate-700 hover:text-slate-950';
        const b = stepInd1.querySelector('span:first-child');
        if (b) b.className = 'w-6 h-6 rounded-full bg-slate-200 text-slate-800 text-xs font-mono flex items-center justify-center font-black shrink-0';
      }
      if (stepInd2) {
        stepInd2.className = 'step-tab flex-1 py-2.5 px-3 sm:px-5 rounded-full text-center text-sm sm:text-base font-sans font-extrabold transition-all flex items-center justify-center gap-2.5 bg-[#071A33] text-white shadow-md';
        const b = stepInd2.querySelector('span:first-child');
        if (b) b.className = 'w-6 h-6 rounded-full bg-white/20 text-white text-xs font-mono flex items-center justify-center font-black shrink-0';
      }
      if (stepInd3) {
        stepInd3.className = 'step-tab flex-1 py-2.5 px-3 sm:px-5 rounded-full text-center text-sm sm:text-base font-sans font-extrabold transition-all flex items-center justify-center gap-2.5 text-slate-500';
        const b = stepInd3.querySelector('span:first-child');
        if (b) b.className = 'w-6 h-6 rounded-full bg-slate-200 text-slate-800 text-xs font-mono flex items-center justify-center font-black shrink-0';
      }
    } else if (step === 'success') {
      if (stepFormView) stepFormView.classList.add('hidden');
      if (stepReviewView) stepReviewView.classList.add('hidden');
      if (stepSuccessView) stepSuccessView.classList.remove('hidden');

      if (stepInd1) {
        stepInd1.className = 'step-tab flex-1 py-2.5 px-3 sm:px-5 rounded-full text-center text-sm sm:text-base font-sans font-extrabold transition-all flex items-center justify-center gap-2.5 text-slate-500';
        const b = stepInd1.querySelector('span:first-child');
        if (b) b.className = 'w-6 h-6 rounded-full bg-slate-200 text-slate-800 text-xs font-mono flex items-center justify-center font-black shrink-0';
      }
      if (stepInd2) {
        stepInd2.className = 'step-tab flex-1 py-2.5 px-3 sm:px-5 rounded-full text-center text-sm sm:text-base font-sans font-extrabold transition-all flex items-center justify-center gap-2.5 text-slate-500';
        const b = stepInd2.querySelector('span:first-child');
        if (b) b.className = 'w-6 h-6 rounded-full bg-slate-200 text-slate-800 text-xs font-mono flex items-center justify-center font-black shrink-0';
      }
      if (stepInd3) {
        stepInd3.className = 'step-tab flex-1 py-2.5 px-3 sm:px-5 rounded-full text-center text-sm sm:text-base font-sans font-extrabold transition-all flex items-center justify-center gap-2.5 bg-[#071A33] text-white shadow-md';
        const b = stepInd3.querySelector('span:first-child');
        if (b) b.className = 'w-6 h-6 rounded-full bg-white/20 text-white text-xs font-mono flex items-center justify-center font-black shrink-0';
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 4. Form Submit (Proceed to Review Step)
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('reg-title')?.value || 'Dr.';
    const name = document.getElementById('reg-name')?.value.trim() || '';
    const designation = document.getElementById('reg-designation')?.value.trim() || '';
    const gender = document.getElementById('reg-gender')?.value || '';
    const organization = document.getElementById('reg-organization')?.value.trim() || '';
    const discipline = document.getElementById('reg-discipline')?.value.trim() || '';
    const address = document.getElementById('reg-address')?.value.trim() || '';
    const pincode = document.getElementById('reg-pincode')?.value.trim() || '';
    const phone = document.getElementById('reg-phone')?.value.trim() || '';
    const email = document.getElementById('reg-email')?.value.trim() || '';

    const foodRadio = form.querySelector('input[name="foodPreference"]:checked');
    const foodPreference = foodRadio ? foodRadio.value : '';

    const accomRadio = form.querySelector('input[name="requireAccommodation"]:checked');
    const requireAccommodation = accomRadio ? accomRadio.value : '';

    const paperRadio = form.querySelector('input[name="isPresentingPaper"]:checked');
    const isPresentingPaper = paperRadio ? paperRadio.value : '';

    const paperTitle = document.getElementById('reg-paper-title')?.value.trim() || '';
    const cmtPaperId = document.getElementById('reg-cmt-id')?.value.trim() || '';
    const paperTheme = document.getElementById('reg-paper-theme')?.value || '';
    const transactionRef = document.getElementById('reg-transaction-ref')?.value.trim() || '';

    // Validation checks matching Registration.tsx
    let error = null;
    if (!title) error = 'Please select your Title.';
    else if (!name) error = 'Please enter your full Name as it should appear on the certificate.';
    else if (!designation) error = 'Please enter your academic or professional Designation.';
    else if (!gender) error = 'Please select your Gender.';
    else if (!organization) error = 'Please provide the name of your representing Organization / College / Institution.';
    else if (!discipline) error = 'Please specify your Discipline (e.g., Social Work, Economics, Public Health).';
    else if (!address) error = 'Please provide your complete Address for Communication.';
    else if (!pincode) error = 'Please provide your PIN / Postal Code.';
    else if (!phone) error = 'Please enter a valid Contact / Mobile Number.';
    else if (!email || !email.includes('@')) error = 'Please enter a valid Email Address for registration correspondence.';
    else if (!foodPreference) error = 'Food Preference is a required question. Please choose your preference.';
    else if (!requireAccommodation) error = 'Please indicate whether you require accommodation.';
    else if (!isPresentingPaper) error = 'Please specify whether you are presenting a paper in the conference.';

    if (error) {
      if (formErrorMsg) formErrorMsg.textContent = error;
      if (formErrorBox) {
        formErrorBox.classList.remove('hidden');
        formErrorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    if (formErrorBox) formErrorBox.classList.add('hidden');

    // Populate Step 2 Review View
    const selectedCat = categories[currentCategoryKey] || categories.student;

    const revFullName = document.getElementById('rev-fullname');
    if (revFullName) revFullName.textContent = `${title} ${name}`;

    const revDesig = document.getElementById('rev-designation');
    if (revDesig) revDesig.textContent = designation;

    const revGender = document.getElementById('rev-gender');
    if (revGender) revGender.textContent = gender;

    const revOrg = document.getElementById('rev-organization');
    if (revOrg) revOrg.textContent = organization;

    const revDisc = document.getElementById('rev-discipline');
    if (revDisc) revDisc.textContent = discipline;

    const revAddr = document.getElementById('rev-address');
    if (revAddr) revAddr.textContent = address;

    const revPin = document.getElementById('rev-pincode');
    if (revPin) revPin.textContent = `PIN: ${pincode}`;

    const revPhone = document.getElementById('rev-phone');
    if (revPhone) revPhone.textContent = phone;

    const revEmail = document.getElementById('rev-email');
    if (revEmail) revEmail.textContent = email;

    const revFood = document.getElementById('rev-food');
    if (revFood) revFood.textContent = foodPreference === 'veg' ? 'Vegetarian' : 'Non-Vegetarian';

    const revAccom = document.getElementById('rev-accommodation');
    if (revAccom) {
      revAccom.textContent = requireAccommodation === 'yes'
        ? 'Yes (Moderate Accommodation provided)'
        : 'No (Arranging Own Stay)';
    }

    const revPaper = document.getElementById('rev-paper');
    const revPaperContainer = document.getElementById('rev-paper-title-container');
    if (revPaper) {
      revPaper.textContent = isPresentingPaper === 'yes' ? 'Yes (Author / Presenter)' : 'No (Delegate)';
    }
    if (revPaperContainer) {
      if (isPresentingPaper === 'yes' && paperTitle) {
        revPaperContainer.textContent = `“${paperTitle}” ${cmtPaperId ? `[${cmtPaperId}]` : ''}`;
        revPaperContainer.classList.remove('hidden');
      } else {
        revPaperContainer.classList.add('hidden');
      }
    }

    const revCategory = document.getElementById('rev-category');
    if (revCategory) revCategory.textContent = selectedCat.label;

    const revFee = document.getElementById('rev-fee');
    if (revFee) revFee.textContent = selectedCat.fee;

    const revPaymentBadge = document.getElementById('rev-payment-badge');
    if (revPaymentBadge) {
      if (currentPaymentMode === 'online') {
        revPaymentBadge.innerHTML = `
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border-2 border-emerald-300 text-emerald-900 font-mono text-xs sm:text-sm font-bold">
            <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
            Online Payment Gateway (Instant Confirmation)
          </span>
        `;
      } else {
        revPaymentBadge.innerHTML = `
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border-2 border-slate-300 text-slate-900 font-mono text-xs sm:text-sm font-bold">
            <svg class="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            Direct Bank Wire Transfer (NEFT / RTGS)
          </span>
        `;
      }
    }

    const revUtrWrapper = document.getElementById('rev-utr-wrapper');
    const revUtr = document.getElementById('rev-utr');
    if (revUtrWrapper && revUtr) {
      if (currentPaymentMode === 'bank_transfer' && transactionRef) {
        revUtr.textContent = transactionRef;
        revUtrWrapper.classList.remove('hidden');
      } else {
        revUtrWrapper.classList.add('hidden');
      }
    }

    if (agreeTermsCheckbox) agreeTermsCheckbox.checked = false;
    if (reviewErrorBox) reviewErrorBox.classList.add('hidden');

    updateButtonLabels();
    setStep('review');
  });

  // 5. Back to Form button in Step 2
  if (btnBackToForm) {
    btnBackToForm.addEventListener('click', () => {
      setStep('form');
    });
  }

  // 6. Confirm & Submit in Step 2
  if (btnConfirmSubmit) {
    btnConfirmSubmit.addEventListener('click', () => {
      if (!agreeTermsCheckbox || !agreeTermsCheckbox.checked) {
        if (reviewErrorMsg) reviewErrorMsg.textContent = 'Please check the verification declaration box to confirm your details.';
        if (reviewErrorBox) reviewErrorBox.classList.remove('hidden');
        return;
      }

      if (reviewErrorBox) reviewErrorBox.classList.add('hidden');

      const title = document.getElementById('reg-title')?.value || 'Dr.';
      const name = document.getElementById('reg-name')?.value.trim() || 'Participant';
      const organization = document.getElementById('reg-organization')?.value.trim() || 'Rajagiri College';
      const phone = document.getElementById('reg-phone')?.value.trim() || '';
      const email = document.getElementById('reg-email')?.value.trim() || '';
      const accomRadio = form.querySelector('input[name="requireAccommodation"]:checked');
      const requireAccommodation = accomRadio ? accomRadio.value : 'no';

      const selectedCat = categories[currentCategoryKey] || categories.student;
      const randomCode = Math.floor(10000 + Math.random() * 90000);
      const generatedId = currentPaymentMode === 'online'
        ? `DYUTI27-ONLINE-${randomCode}`
        : `DYUTI27-REG-${randomCode}`;
      const gatewayOrder = `VORTEX-${Math.floor(100000 + Math.random() * 900000)}`;

      // Populate Step 3 Success View
      const succGreeting = document.getElementById('success-greeting');
      if (succGreeting) succGreeting.textContent = `Thank You, ${title} ${name}!`;

      const succBadge = document.getElementById('success-status-badge');
      if (succBadge) {
        succBadge.textContent = currentPaymentMode === 'online'
          ? 'Payment Verified & Registration Confirmed'
          : 'Registration Recorded (Bank Wire Pending Verification)';
      }

      const succRegId = document.getElementById('success-reg-id');
      if (succRegId) succRegId.textContent = generatedId;

      const succOrderBox = document.getElementById('success-gateway-order');
      const succOrderId = document.getElementById('success-gateway-order-id');
      if (succOrderBox && succOrderId) {
        if (currentPaymentMode === 'online') {
          succOrderId.textContent = gatewayOrder;
          succOrderBox.classList.remove('hidden');
        } else {
          succOrderBox.classList.add('hidden');
        }
      }

      const succCategory = document.getElementById('success-category');
      if (succCategory) succCategory.textContent = selectedCat.label;

      const succAmount = document.getElementById('success-amount');
      if (succAmount) succAmount.textContent = selectedCat.fee;

      const succPayStatus = document.getElementById('success-payment-status');
      if (succPayStatus) {
        succPayStatus.textContent = currentPaymentMode === 'online'
          ? 'Completed via Vortexx Gateway'
          : 'Direct Bank Wire Transfer';
      }

      const succOrg = document.getElementById('success-org');
      if (succOrg) succOrg.textContent = organization;

      const succPhone = document.getElementById('success-phone');
      if (succPhone) succPhone.textContent = phone;

      const succEmail = document.getElementById('success-email');
      if (succEmail) succEmail.textContent = email;

      const succAccom = document.getElementById('success-accom');
      if (succAccom) succAccom.textContent = requireAccommodation === 'yes' ? 'Requested' : 'Self-arranged';

      setStep('success');
    });
  }

  // 7. Print Receipt button
  if (btnPrintReceipt) {
    btnPrintReceipt.addEventListener('click', () => {
      window.print();
    });
  }

  updateButtonLabels();
}


/* ── 8. CONTACT FORM SUBMISSION ── */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('input[name="name"]')?.value.trim();
    const email = contactForm.querySelector('input[name="email"]')?.value.trim();
    const msg = contactForm.querySelector('textarea[name="message"]')?.value.trim();

    if (!name || !email || !msg) {
      alert('Please enter your Name, Email, and Message.');
      return;
    }

    alert(`Thank you, ${name}! Your inquiry has been submitted to the DYUTI Secretariat at dyuti@rajagiri.edu.`);
    contactForm.reset();
  });
}

/* ── 9. BUTTERY SMOOTH SPA-LIKE PAGE NAVIGATION & VIEW TRANSITIONS ── */
const pageCache = new Map();
let isNavigating = false;

// Preload cache with initial document HTML
try {
  const initialKey = window.location.pathname.split('/').pop() || 'index.html';
  pageCache.set(initialKey, document.documentElement.outerHTML);
} catch (e) {}

function initSmoothPageNavigation() {
  createProgressBar();
  prefetchKnownPages();
  setupLinkInterception();
  setupPopstateListener();
}

function createProgressBar() {
  if (document.getElementById('page-transition-progress-bar')) return;
  const bar = document.createElement('div');
  bar.id = 'page-transition-progress-bar';
  document.body.appendChild(bar);
}

function showProgressBar() {
  const bar = document.getElementById('page-transition-progress-bar');
  if (!bar) return;
  bar.classList.add('active');
  bar.style.width = '35%';
  setTimeout(() => {
    if (bar.classList.contains('active')) {
      bar.style.width = '75%';
    }
  }, 80);
}

function hideProgressBar() {
  const bar = document.getElementById('page-transition-progress-bar');
  if (!bar) return;
  bar.style.width = '100%';
  setTimeout(() => {
    bar.classList.remove('active');
    setTimeout(() => {
      bar.style.width = '0%';
    }, 200);
  }, 150);
}

function prefetchPage(url) {
  try {
    const parsed = new URL(url, window.location.origin);
    const key = parsed.pathname.split('/').pop() || 'index.html';
    if (pageCache.has(key) || parsed.origin !== window.location.origin) return;

    fetch(parsed.pathname)
      .then(res => {
        if (res.ok) return res.text();
        throw new Error('Network error');
      })
      .then(html => {
        pageCache.set(key, html);
      })
      .catch(() => {});
  } catch (e) {}
}

function prefetchKnownPages() {
  const pages = [
    'index.html',
    'rajagiri.html',
    'call-for-papers.html',
    'our-team.html',
    'registration.html',
    'accommodation.html',
    'attractions.html',
    'travel.html',
    'gallery.html',
    'contact.html'
  ];

  const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1000));
  idleCallback(() => {
    pages.forEach((page, index) => {
      setTimeout(() => {
        prefetchPage(page);
      }, index * 60);
    });
  });
}

function setupLinkInterception() {
  document.addEventListener('mouseover', handleLinkHover, { passive: true });
  document.addEventListener('touchstart', handleLinkHover, { passive: true });
  document.addEventListener('click', handleLinkClick);
}

function getValidInternalLink(target) {
  const link = target.closest('a');
  if (!link) return null;
  const href = link.getAttribute('href');
  if (!href) return null;

  // Skip external links, new tabs, special protocols
  if (link.target === '_blank' || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
    return null;
  }

  // Handle local anchor on same page
  if (href.startsWith('#')) {
    return { type: 'hash', link, hash: href };
  }

  try {
    const url = new URL(link.href, window.location.origin);
    if (url.origin !== window.location.origin) return null;

    // Check if it is a downloadable file
    if (/\.(pdf|zip|jpg|jpeg|png|svg|webp|gif|mp4)$/i.test(url.pathname)) {
      return null;
    }

    return { type: 'page', link, url };
  } catch (e) {
    return null;
  }
}

function handleLinkHover(e) {
  const result = getValidInternalLink(e.target);
  if (result && result.type === 'page') {
    prefetchPage(result.url.href);
  }
}

function handleLinkClick(e) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
    return;
  }

  const result = getValidInternalLink(e.target);
  if (!result) return;

  if (result.type === 'hash') {
    e.preventDefault();
    const targetEl = document.querySelector(result.hash);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', result.hash);
    }
    return;
  }

  if (result.type === 'page') {
    const { url } = result;
    const currentKey = window.location.pathname.split('/').pop() || 'index.html';
    const targetKey = url.pathname.split('/').pop() || 'index.html';

    // If clicking current page link without hash
    if (currentKey === targetKey && !url.hash) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If clicking current page link WITH hash
    if (currentKey === targetKey && url.hash) {
      e.preventDefault();
      const targetEl = document.querySelector(url.hash);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, '', url.hash);
      }
      return;
    }

    e.preventDefault();
    navigateToPage(url.href, true);
  }
}

function setupPopstateListener() {
  window.addEventListener('popstate', () => {
    navigateToPage(window.location.href, false);
  });
}

async function fetchPageHTML(url) {
  const parsed = new URL(url, window.location.origin);
  const key = parsed.pathname.split('/').pop() || 'index.html';

  if (pageCache.has(key)) {
    return pageCache.get(key);
  }

  const response = await fetch(parsed.pathname);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const html = await response.text();
  pageCache.set(key, html);
  return html;
}

async function navigateToPage(targetUrl, pushState = true) {
  if (isNavigating) return;
  isNavigating = true;
  showProgressBar();

  try {
    const htmlText = await fetchPageHTML(targetUrl);
    const parser = new DOMParser();
    const newDoc = parser.parseFromString(htmlText, 'text/html');

    const newMain = newDoc.querySelector('main');
    const currentMain = document.querySelector('main');

    if (!newMain || !currentMain) {
      window.location.href = targetUrl;
      return;
    }

    // 1. Update Title
    if (newDoc.title) {
      document.title = newDoc.title;
    }

    // 2. Soft fade out of current main content
    currentMain.style.transition = 'opacity 130ms ease-out, transform 130ms ease-out';
    currentMain.style.opacity = '0';
    currentMain.style.transform = 'translateY(4px)';

    await new Promise(r => setTimeout(r, 130));

    // 3. Clean up previous interval sliders
    if (rajagiriSlideTimer) {
      clearInterval(rajagiriSlideTimer);
      rajagiriSlideTimer = null;
    }

    // 4. Replace main innerHTML and classes
    currentMain.className = newMain.className;
    currentMain.innerHTML = newMain.innerHTML;

    // 5. Update Navigation Active Links
    updateActiveNavLinks(targetUrl);

    // 6. Scroll Handling
    const urlObj = new URL(targetUrl, window.location.origin);
    if (urlObj.hash) {
      const hashEl = document.querySelector(urlObj.hash);
      if (hashEl) hashEl.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }

    // 7. Reset navbar state on scroll to top
    const headerContainer = document.querySelector('header .navbar-container');
    const marqueeBar = document.getElementById('attached-marquee-bar');
    if (headerContainer) {
      headerContainer.classList.remove('shadow-[0_16px_45px_rgba(10,37,64,0.65)]', 'border-blue-300/40');
    }
    if (marqueeBar && !urlObj.hash) {
      marqueeBar.classList.remove('max-h-0', 'opacity-0', '-translate-y-3', 'pointer-events-none');
      marqueeBar.classList.add('max-h-14', 'opacity-100', 'translate-y-0');
    }

    // 8. Close mobile drawer if opened
    closeMobileDrawerIfOpen();

    // 9. Re-initialize dynamic page interactive widgets
    reinitializePageComponents();

    // 10. Soft fade in of new main content
    currentMain.style.opacity = '0';
    currentMain.style.transform = 'translateY(6px)';

    // Force browser reflow
    void currentMain.offsetHeight;

    currentMain.style.transition = 'opacity 180ms ease-out, transform 180ms ease-out';
    currentMain.style.opacity = '1';
    currentMain.style.transform = 'translateY(0)';

    if (pushState) {
      window.history.pushState({ path: targetUrl }, '', targetUrl);
    }
  } catch (err) {
    console.warn('Smooth page transition fallback:', err);
    window.location.href = targetUrl;
  } finally {
    hideProgressBar();
    isNavigating = false;
  }
}

function normalizePageName(urlOrPath) {
  try {
    const parsed = new URL(urlOrPath, window.location.origin);
    let name = parsed.pathname.toLowerCase().split('/').pop() || 'index.html';
    name = name.replace(/\.html$/, '');
    if (name === '' || name === 'index') return 'home';
    if (name === 'register' || name === 'registration') return 'registration';
    if (name === 'accomodation' || name === 'accommodation') return 'accommodation';
    if (name === 'call_for_papers' || name === 'call-for-papers') return 'call-for-papers';
    if (name === 'our-team' || name === 'team') return 'our-team';
    if (name === 'contactus' || name === 'contact') return 'contact';
    return name;
  } catch (e) {
    return 'home';
  }
}

function updateActiveNavLinks(targetUrl) {
  const targetPage = normalizePageName(targetUrl);

  // Desktop Nav Links
  const desktopLinks = document.querySelectorAll('nav[aria-label="Main Navigation"] a');
  desktopLinks.forEach(link => {
    const linkPage = normalizePageName(link.getAttribute('href') || '');
    const isActive = linkPage === targetPage;

    if (isActive) {
      link.classList.add('text-[#d4af37]', 'font-bold', 'border-b-2', 'border-[#d4af37]', 'pb-0.5');
      link.classList.remove('text-white/90', 'font-semibold');
    } else {
      link.classList.remove('text-[#d4af37]', 'font-bold', 'border-b-2', 'border-[#d4af37]', 'pb-0.5');
      link.classList.add('text-white/90', 'font-semibold');
    }
  });

  // Mobile Drawer Links
  const mobileLinks = document.querySelectorAll('#mobile-drawer nav a');
  mobileLinks.forEach(link => {
    const linkPage = normalizePageName(link.getAttribute('href') || '');
    const isActive = linkPage === targetPage;

    if (isActive) {
      link.classList.add('bg-white/15', 'text-[#d4af37]');
      link.classList.remove('text-white/90', 'hover:bg-white/10');
    } else {
      link.classList.remove('bg-white/15', 'text-[#d4af37]');
      link.classList.add('text-white/90', 'hover:bg-white/10');
    }
  });
}

function closeMobileDrawerIfOpen() {
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  if (drawer && drawer.classList.contains('open')) {
    drawer.classList.remove('open', 'translate-x-0');
    drawer.classList.add('translate-x-full');
  }
  if (overlay && overlay.classList.contains('open')) {
    overlay.classList.remove('open', 'opacity-100', 'pointer-events-auto');
    overlay.classList.add('opacity-0', 'pointer-events-none');
  }
  document.body.style.overflow = '';
}

function reinitializePageComponents() {
  initSubThemesSearch();
  initRajagiriSlider();
  initOurTeamFilters();
  initGalleryLightbox();
  initRegistrationForm();
  initContactForm();
}

