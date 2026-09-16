/**
 * DYUTI 2027 Conference Client-Side Application Logic
 * RCSS - Rajagiri College of Social Sciences
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

/* ── 2. MOBILE MENU MODAL ── */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const closeBtn = document.getElementById('mobile-drawer-close');

  if (!toggleBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    drawer.classList.remove('opacity-0', 'pointer-events-none', 'scale-95', 'translate-x-full');
    drawer.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
    overlay.classList.add('open');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-100', 'pointer-events-auto');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open', 'opacity-100', 'pointer-events-auto', 'scale-100');
    drawer.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
    overlay.classList.remove('open', 'opacity-100', 'pointer-events-auto');
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

  const allBadge = document.querySelector('.gallery-tab-btn[data-year="all"] .font-mono');
  if (allBadge && galleryItems.length) {
    allBadge.textContent = galleryItems.length;
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

    if (lightboxImg) {
      lightboxImg.onerror = function () { handleGalleryImgError(this); };
      const thumbnailImg = item.querySelector('img');
      const workingSrc = (thumbnailImg && thumbnailImg.currentSrc && !thumbnailImg.dataset.failed) ? thumbnailImg.currentSrc : src;
      lightboxImg.src = workingSrc;
    }
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

  // ── Gateway Return Redirect Handler (when delegate returns from Vortexx checkout) ──
  const urlParams = new URLSearchParams(window.location.search);
  const vortexTxId = urlParams.get('vortex_transaction_id');
  const statusCode = urlParams.get('status_code');
  const returnAmount = urlParams.get('amount');

  const returnBanner = document.getElementById('payment-return-banner');
  const returnIcon = document.getElementById('payment-return-icon');
  const returnTitle = document.getElementById('payment-return-title');
  const returnDesc = document.getElementById('payment-return-desc');

  if (vortexTxId) {
    let savedReg = null;
    try {
      savedReg = JSON.parse(sessionStorage.getItem('dyuti_pending_registration') || '{}');
    } catch (e) {
      console.warn('Could not read pending registration:', e);
    }

    if (String(statusCode) === '200') {
      // Dispatch official registration and payment notification to dyuti@rajagiri.edu
      const notificationKey = 'dyuti_notified_' + vortexTxId;
      if (!sessionStorage.getItem(notificationKey)) {
        sessionStorage.setItem(notificationKey, 'true');

        const notificationData = {
          regId: savedReg?.regId || `DYUTI27-ONLINE-${vortexTxId.slice(-6).toUpperCase()}`,
          vortex_transaction_id: vortexTxId,
          amount: returnAmount || savedReg?.amount || '750',
          currency: 'INR',
          payment_status: 'SUCCESS',
          date_time: new Date().toISOString().replace('T', ' ').substring(0, 19),
          title: savedReg?.title || '',
          name: savedReg?.name || '',
          full_name: savedReg?.name || '',
          designation: savedReg?.designation || '',
          gender: savedReg?.gender || '',
          organization: savedReg?.organization || '',
          discipline: savedReg?.discipline || '',
          address: savedReg?.address || '',
          pincode: savedReg?.pincode || '',
          phone: savedReg?.phone || '',
          email: savedReg?.email || '',
          foodPreference: savedReg?.foodPreference || 'veg',
          requireAccommodation: savedReg?.requireAccommodation || 'no',
          isPresentingPaper: savedReg?.isPresentingPaper || 'no',
          paperTitle: savedReg?.paperTitle || '',
          paperTheme: savedReg?.paperTheme || '',
          categoryLabel: savedReg?.categoryLabel || 'UG / PG Student'
        };

        // Send confirmation email with PDF receipt to dyuti@rajagiri.edu and delegate
        dispatchApi('send_registration_notification.php', notificationData).catch(e => console.warn('Notification endpoint error:', e));

        // Also save to database
        dispatchApi('save_registration.php', notificationData).catch(() => { });
      }

      // 1. SUCCESS: Show confirmation banner and activate Step 3 Confirmed Screen
      if (returnBanner && returnIcon && returnTitle && returnDesc) {
        returnBanner.className = 'mb-8 max-w-4xl mx-auto p-5 rounded-2xl border-2 flex items-start gap-4 animate-fadeIn bg-emerald-50 border-emerald-300 text-emerald-950 shadow-sm';
        returnIcon.innerHTML = '<svg class="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';
        returnTitle.textContent = 'Payment Completed Successfully!';
        returnDesc.innerHTML = `Your registration payment of <strong>₹ ${returnAmount ? parseFloat(returnAmount).toLocaleString() : (savedReg?.amount ? savedReg.amount.toLocaleString() : '750')}</strong> was verified by Vortexx Gateway. Transaction ID: <strong class="font-mono">${vortexTxId}</strong>.`;
        returnBanner.classList.remove('hidden');
      }

      // Populate Step 3 Success View
      const succGreeting = document.getElementById('success-greeting');
      if (succGreeting) succGreeting.textContent = `Thank You, ${savedReg?.title || 'Dr.'} ${savedReg?.name || 'Participant'}!`;

      const succBadge = document.getElementById('success-status-badge');
      if (succBadge) succBadge.textContent = 'Payment Verified & Registration Confirmed';

      const succRegId = document.getElementById('success-reg-id');
      if (succRegId) succRegId.textContent = savedReg?.regId || `DYUTI27-ONLINE-${vortexTxId.slice(-6).toUpperCase()}`;

      const succOrderBox = document.getElementById('success-gateway-order');
      const succOrderId = document.getElementById('success-gateway-order-id');
      if (succOrderBox && succOrderId) {
        succOrderId.textContent = vortexTxId;
        succOrderBox.classList.remove('hidden');
      }

      const succCategory = document.getElementById('success-category');
      if (succCategory) succCategory.textContent = savedReg?.categoryLabel || 'UG / PG Student';

      const succAmount = document.getElementById('success-amount');
      if (succAmount) succAmount.textContent = returnAmount ? `₹ ${parseFloat(returnAmount).toLocaleString()}` : `₹ ${savedReg?.amount || '750'}`;

      const succPayStatus = document.getElementById('success-payment-status');
      if (succPayStatus) succPayStatus.textContent = 'Completed via Vortexx Gateway (Online)';

      const succOrg = document.getElementById('success-org');
      if (succOrg && savedReg?.organization) succOrg.textContent = savedReg.organization;

      const succPhone = document.getElementById('success-phone');
      if (succPhone && savedReg?.phone) succPhone.textContent = savedReg.phone;

      const succEmail = document.getElementById('success-email');
      if (succEmail && savedReg?.email) succEmail.textContent = savedReg.email;

      const succAccom = document.getElementById('success-accom');
      if (succAccom && savedReg?.requireAccommodation) {
        succAccom.textContent = savedReg.requireAccommodation === 'yes' ? 'Requested' : 'Self-arranged';
      }

      setStep('success');

      try {
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (e) { }

    } else {
      // 2. FAILED / CANCELLED: Show alert banner and restore saved data
      if (returnBanner && returnIcon && returnTitle && returnDesc) {
        returnBanner.className = 'mb-8 max-w-4xl mx-auto p-5 rounded-2xl border-2 flex items-start gap-4 animate-fadeIn bg-red-50 border-red-300 text-red-950 shadow-sm';
        returnIcon.innerHTML = '<svg class="w-7 h-7 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>';
        returnTitle.textContent = 'Payment Incomplete or Cancelled';
        returnDesc.innerHTML = `Your payment attempt (Transaction ID: <span class="font-mono">${vortexTxId}</span>) was not completed. Your participant details have been restored below so you can try again.`;
        returnBanner.classList.remove('hidden');
      }

      if (savedReg && typeof savedReg === 'object') {
        const fields = ['title', 'name', 'designation', 'gender', 'organization', 'discipline', 'address', 'pincode', 'phone', 'email'];
        fields.forEach(f => {
          const el = document.getElementById(`reg-${f}`);
          if (el && savedReg[f]) el.value = savedReg[f];
        });
      }

      try {
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (e) { }
    }
  }

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
    });
  });

  // 2. Category Cards click & change handler
  function selectCategory(catKey) {
    if (!catKey || !categories[catKey]) return;
    currentCategoryKey = catKey;

    categoryCards.forEach(c => {
      const isSelected = c.getAttribute('data-category') === catKey;
      const r = c.querySelector('input[type="radio"]');

      if (isSelected) {
        c.classList.add('active', 'bg-[#071A33]', 'text-white', 'border-[#071A33]', 'shadow-xl', 'ring-4', 'ring-slate-900/10');
        c.classList.remove('bg-slate-50/90', 'border-slate-200', 'text-slate-900');
        if (r) r.checked = true;
      } else {
        c.classList.remove('active', 'bg-[#071A33]', 'text-white', 'border-[#071A33]', 'shadow-xl', 'ring-4', 'ring-slate-900/10');
        c.classList.add('bg-slate-50/90', 'border-slate-200', 'text-slate-900');
        if (r) r.checked = false;
      }
    });

    updateButtonLabels();
  }

  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const catKey = card.getAttribute('data-category');
      if (catKey) selectCategory(catKey);
    });
  });

  const categoryRadios = form.querySelectorAll('input[name="registrationCategory"]');
  categoryRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) selectCategory(radio.value);
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
    // DEV TEST MODE: show overridden amount if set
    const displayAmount = (typeof window.__DYUTI_TEST_AMOUNT__ === 'number' && window.__DYUTI_TEST_AMOUNT__ > 0)
      ? window.__DYUTI_TEST_AMOUNT__
      : cat.amount;
    if (proceedReviewLabel) {
      if (currentPaymentMode === 'online') {
        proceedReviewLabel.textContent = `Review & Pay ₹ ${displayAmount.toLocaleString()}`;
      } else {
        proceedReviewLabel.textContent = 'Review & Confirm Details';
      }
    }
    if (btnConfirmSubmitLabel) {
      if (currentPaymentMode === 'online') {
        btnConfirmSubmitLabel.textContent = `Register & Pay ₹ ${displayAmount.toLocaleString()} Now`;
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
        stepInd1.className = 'step-tab flex-1 py-2 px-1.5 sm:py-2.5 sm:px-5 rounded-full text-center text-xs sm:text-base font-sans font-extrabold transition-all flex items-center justify-center gap-1.5 sm:gap-2.5 bg-[#071A33] text-white shadow-md';
        const b = stepInd1.querySelector('span:first-child');
        if (b) b.className = 'w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 text-white text-[10px] sm:text-xs font-mono flex items-center justify-center font-black shrink-0';
      }
      if (stepInd2) {
        stepInd2.className = 'step-tab flex-1 py-2 px-1.5 sm:py-2.5 sm:px-5 rounded-full text-center text-xs sm:text-base font-sans font-extrabold transition-all flex items-center justify-center gap-1.5 sm:gap-2.5 text-slate-600';
        const b = stepInd2.querySelector('span:first-child');
        if (b) b.className = 'w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-200 text-slate-800 text-[10px] sm:text-xs font-mono flex items-center justify-center font-black shrink-0';
      }
      if (stepInd3) {
        stepInd3.className = 'step-tab flex-1 py-2 px-1.5 sm:py-2.5 sm:px-5 rounded-full text-center text-xs sm:text-base font-sans font-extrabold transition-all flex items-center justify-center gap-1.5 sm:gap-2.5 text-slate-500';
        const b = stepInd3.querySelector('span:first-child');
        if (b) b.className = 'w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-200 text-slate-800 text-[10px] sm:text-xs font-mono flex items-center justify-center font-black shrink-0';
      }
    } else if (step === 'review') {
      if (stepFormView) stepFormView.classList.add('hidden');
      if (stepReviewView) stepReviewView.classList.remove('hidden');
      if (stepSuccessView) stepSuccessView.classList.add('hidden');

      if (stepInd1) {
        stepInd1.className = 'step-tab flex-1 py-2 px-1.5 sm:py-2.5 sm:px-5 rounded-full text-center text-xs sm:text-base font-sans font-extrabold transition-all flex items-center justify-center gap-1.5 sm:gap-2.5 text-slate-700 hover:text-slate-950';
        const b = stepInd1.querySelector('span:first-child');
        if (b) b.className = 'w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-200 text-slate-800 text-[10px] sm:text-xs font-mono flex items-center justify-center font-black shrink-0';
      }
      if (stepInd2) {
        stepInd2.className = 'step-tab flex-1 py-2 px-1.5 sm:py-2.5 sm:px-5 rounded-full text-center text-xs sm:text-base font-sans font-extrabold transition-all flex items-center justify-center gap-1.5 sm:gap-2.5 bg-[#071A33] text-white shadow-md';
        const b = stepInd2.querySelector('span:first-child');
        if (b) b.className = 'w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 text-white text-[10px] sm:text-xs font-mono flex items-center justify-center font-black shrink-0';
      }
      if (stepInd3) {
        stepInd3.className = 'step-tab flex-1 py-2 px-1.5 sm:py-2.5 sm:px-5 rounded-full text-center text-xs sm:text-base font-sans font-extrabold transition-all flex items-center justify-center gap-1.5 sm:gap-2.5 text-slate-500';
        const b = stepInd3.querySelector('span:first-child');
        if (b) b.className = 'w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-200 text-slate-800 text-[10px] sm:text-xs font-mono flex items-center justify-center font-black shrink-0';
      }
    } else if (step === 'success') {
      if (stepFormView) stepFormView.classList.add('hidden');
      if (stepReviewView) stepReviewView.classList.add('hidden');
      if (stepSuccessView) stepSuccessView.classList.remove('hidden');

      if (stepInd1) {
        stepInd1.className = 'step-tab flex-1 py-2 px-1.5 sm:py-2.5 sm:px-5 rounded-full text-center text-xs sm:text-base font-sans font-extrabold transition-all flex items-center justify-center gap-1.5 sm:gap-2.5 text-slate-500';
        const b = stepInd1.querySelector('span:first-child');
        if (b) b.className = 'w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-200 text-slate-800 text-[10px] sm:text-xs font-mono flex items-center justify-center font-black shrink-0';
      }
      if (stepInd2) {
        stepInd2.className = 'step-tab flex-1 py-2 px-1.5 sm:py-2.5 sm:px-5 rounded-full text-center text-xs sm:text-base font-sans font-extrabold transition-all flex items-center justify-center gap-1.5 sm:gap-2.5 text-slate-500';
        const b = stepInd2.querySelector('span:first-child');
        if (b) b.className = 'w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-200 text-slate-800 text-[10px] sm:text-xs font-mono flex items-center justify-center font-black shrink-0';
      }
      if (stepInd3) {
        stepInd3.className = 'step-tab flex-1 py-2 px-1.5 sm:py-2.5 sm:px-5 rounded-full text-center text-xs sm:text-base font-sans font-extrabold transition-all flex items-center justify-center gap-1.5 sm:gap-2.5 bg-[#071A33] text-white shadow-md';
        const b = stepInd3.querySelector('span:first-child');
        if (b) b.className = 'w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 text-white text-[10px] sm:text-xs font-mono flex items-center justify-center font-black shrink-0';
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

    const revPaper = document.getElementById('rev-paper');
    if (revPaper) {
      revPaper.textContent = isPresentingPaper === 'yes' ? 'Yes (Author / Presenter)' : 'No (Delegate)';
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

    if (agreeTermsCheckbox) agreeTermsCheckbox.checked = true;
    if (reviewErrorBox) reviewErrorBox.classList.add('hidden');

    updateButtonLabels();
    setStep('review');

    // Start background creation of Vortexx payment order immediately so there is zero delay on Step 2
    if (currentPaymentMode === 'online') {
      startPaymentPreload();
    }
  });

  // Background Preloading & Instant Gateway Execution State
  let preloadedPayment = {
    hash: '',
    promise: null,
    url: null,
    errorMessage: null
  };

  function getOrderPayload() {
    const title = document.getElementById('reg-title')?.value || 'Dr.';
    const name = document.getElementById('reg-name')?.value.trim() || 'Participant';
    const phone = document.getElementById('reg-phone')?.value.trim() || '';
    const email = document.getElementById('reg-email')?.value.trim() || '';
    const selectedCat = categories[currentCategoryKey] || categories.student;
    const returnUrl = window.location.origin + window.location.pathname;

    // DEV TEST MODE: allow overriding amount via window.__DYUTI_TEST_AMOUNT__
    const testAmount = (typeof window.__DYUTI_TEST_AMOUNT__ === 'number' && window.__DYUTI_TEST_AMOUNT__ > 0)
      ? window.__DYUTI_TEST_AMOUNT__
      : null;

    return {
      customer_name: `${title} ${name}`.trim(),
      name: `${title} ${name}`.trim(),
      customer_email: email.trim(),
      email: email.trim(),
      customer_mobile: phone.trim(),
      mobile: phone.trim(),
      amount: testAmount !== null ? testAmount : selectedCat.amount,
      currency: 'INR',
      redirect_url: returnUrl,
      event_id: 'DYUT20260913MU01TMQ67BK'
    };
  }

  // Helper to call backend APIs across subdirectories (such as /rcss/) and domain root
  async function dispatchApi(filename, payload) {
    const cleanName = filename.replace(/^\/?api\//, '');
    const currentPath = window.location.pathname;
    const baseDir = currentPath.substring(0, currentPath.lastIndexOf('/')).replace(/\/$/, '');

    const candidates = [
      `api/${cleanName}`,
      baseDir ? `${baseDir}/api/${cleanName}` : null,
      `/rcss/api/${cleanName}`,
      `/api/${cleanName}`
    ].filter(Boolean);

    const uniqueCandidates = [...new Set(candidates)];
    for (const endpoint of uniqueCandidates) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.status === 404) continue;
        return await res.json();
      } catch (err) {
        // Try next candidate
      }
    }
    return null;
  }

  async function fetchPaymentUrl(orderData) {
    let paymentUrl = null;
    let errorMessage = null;

    const currentPath = window.location.pathname;
    const baseDir = currentPath.substring(0, currentPath.lastIndexOf('/')).replace(/\/$/, '');

    // Comprehensive list of candidate endpoints for /rcss/ subfolder and cPanel hosting
    const candidateEndpoints = [
      'api/create_payment_order.php',
      baseDir ? `${baseDir}/api/create_payment_order.php` : null,
      '/rcss/api/create_payment_order.php',
      '/api/create_payment_order.php',
      'api/create_payment_order',
      baseDir ? `${baseDir}/api/create_payment_order` : null,
      '/rcss/api/create_payment_order',
      '/api/create_payment_order',
      'https://dyuti.in/rcss/api/create_payment_order.php',
      'https://dyuti.in/api/create_payment_order.php'
    ].filter(Boolean);

    const endpoints = [...new Set(candidateEndpoints)];

    for (const endpoint of endpoints) {
      // Don't call our own hostname as an external fallback if we already failed locally
      if (endpoint.startsWith('http') && endpoint.includes(window.location.hostname)) {
        continue;
      }

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(orderData)
        });

        if (res.status === 404) continue;

        const text = await res.text();
        let json = null;
        try {
          json = JSON.parse(text);
        } catch (parseErr) {
          console.warn(`Non-JSON response from ${endpoint}:`, text.substring(0, 200));
          continue;
        }

        if (json && json.status === 'success' && json.data && json.data.payment_url) {
          return json.data.payment_url;
        }

        if (json && json.message) {
          errorMessage = json.message;
        }
      } catch (err) {
        console.warn(`Attempt to call ${endpoint} failed:`, err);
      }
    }

    if (errorMessage) {
      throw new Error(errorMessage);
    }
    throw new Error('Unable to establish connection with the payment gateway. Please verify your details or try again.');
  }

  function startPaymentPreload() {
    if (currentPaymentMode !== 'online') return;
    const orderData = getOrderPayload();
    if (!orderData.email || !orderData.mobile) return;

    const hash = `${orderData.customer_email}|${orderData.customer_mobile}|${orderData.amount}`;
    if (preloadedPayment.hash === hash && (preloadedPayment.url || preloadedPayment.promise)) {
      return; // Already prepared or in progress
    }

    preloadedPayment = {
      hash,
      url: null,
      errorMessage: null,
      promise: null
    };

    preloadedPayment.promise = fetchPaymentUrl(orderData)
      .then(url => {
        preloadedPayment.url = url;
        return url;
      })
      .catch(err => {
        preloadedPayment.errorMessage = err.message;
        throw err;
      });
  }

  // 5. Back to Form button in Step 2
  if (btnBackToForm) {
    btnBackToForm.addEventListener('click', () => {
      setStep('form');
    });
  }

  // 6. Confirm & Submit in Step 2
  if (btnConfirmSubmit) {
    btnConfirmSubmit.addEventListener('click', async () => {
      if (!agreeTermsCheckbox || !agreeTermsCheckbox.checked) {
        if (reviewErrorMsg) reviewErrorMsg.textContent = 'Please check the verification declaration box to confirm your details.';
        if (reviewErrorBox) reviewErrorBox.classList.remove('hidden');
        return;
      }

      if (reviewErrorBox) reviewErrorBox.classList.add('hidden');

      const title = document.getElementById('reg-title')?.value || 'Dr.';
      const name = document.getElementById('reg-name')?.value.trim() || 'Participant';
      const designation = document.getElementById('reg-designation')?.value.trim() || '';
      const gender = document.getElementById('reg-gender')?.value || '';
      const organization = document.getElementById('reg-organization')?.value.trim() || 'Rajagiri College';
      const discipline = document.getElementById('reg-discipline')?.value.trim() || '';
      const address = document.getElementById('reg-address')?.value.trim() || '';
      const pincode = document.getElementById('reg-pincode')?.value.trim() || '';
      const phone = document.getElementById('reg-phone')?.value.trim() || '';
      const email = document.getElementById('reg-email')?.value.trim() || '';
      const accomRadio = form.querySelector('input[name="requireAccommodation"]:checked');
      const requireAccommodation = accomRadio ? accomRadio.value : 'no';
      const foodRadio = form.querySelector('input[name="foodPreference"]:checked');
      const foodPreference = foodRadio ? foodRadio.value : 'veg';
      const paperRadio = form.querySelector('input[name="isPresentingPaper"]:checked');
      const isPresentingPaper = paperRadio ? paperRadio.value : 'no';

      const paperTitle = document.getElementById('reg-paper-title')?.value.trim() || '';
      const paperTheme = document.getElementById('reg-paper-theme')?.value.trim() || '';

      const selectedCat = categories[currentCategoryKey] || categories.student;
      const randomCode = Math.floor(10000 + Math.random() * 90000);
      const generatedId = currentPaymentMode === 'online'
        ? `DYUTI27-ONLINE-${randomCode}`
        : `DYUTI27-REG-${randomCode}`;

      // Save registration state in sessionStorage before redirect
      const registrationState = {
        regId: generatedId,
        title,
        name,
        full_name: name,
        designation,
        gender,
        organization,
        discipline,
        address,
        pincode,
        phone,
        email,
        requireAccommodation,
        foodPreference,
        isPresentingPaper,
        paperTitle,
        paperTheme,
        categoryKey: currentCategoryKey,
        categoryLabel: selectedCat.label,
        amount: selectedCat.amount,
        feeString: selectedCat.fee,
        paymentMode: currentPaymentMode,
        paymentStatus: 'pending'
      };

      try {
        sessionStorage.setItem('dyuti_pending_registration', JSON.stringify(registrationState));
      } catch (e) {
        console.warn('sessionStorage not accessible:', e);
      }

      // Pre-save registration to SQL database so no participant submission is ever lost
      dispatchApi('save_registration.php', {
        ...registrationState,
        payment_status: 'pending',
        payment_mode: currentPaymentMode
      }).catch(e => console.warn('Pre-save registration error:', e));

      // Online payment via Vortexx Payment Gateway
      if (currentPaymentMode === 'online') {
        // INSTANT REDIRECTION: If the preloaded payment URL is already resolved, redirect immediately with zero delay!
        if (preloadedPayment.url) {
          window.location.href = preloadedPayment.url;
          return;
        }

        const originalBtnHtml = btnConfirmSubmitLabel ? btnConfirmSubmitLabel.innerHTML : '';
        btnConfirmSubmit.disabled = true;
        btnConfirmSubmit.classList.add('opacity-80', 'cursor-wait');
        if (btnConfirmSubmitLabel) {
          btnConfirmSubmitLabel.innerHTML = `
            <span class="inline-flex items-center gap-2">
              <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting to Vortexx Gateway...
            </span>
          `;
        }

        let paymentUrl = null;
        let errorMessage = null;

        try {
          // If preloading is already in flight, await it directly!
          if (preloadedPayment.promise) {
            paymentUrl = await preloadedPayment.promise;
          } else {
            const orderData = getOrderPayload();
            paymentUrl = await fetchPaymentUrl(orderData);
          }
        } catch (err) {
          errorMessage = err.message || 'Unable to create payment order. Please verify your details and try again.';
        }

        if (paymentUrl) {
          // Immediately redirect to Vortexx checkout page!
          window.location.href = paymentUrl;
          return;
        }

        // If order creation failed, re-enable button and show error
        btnConfirmSubmit.disabled = false;
        btnConfirmSubmit.classList.remove('opacity-80', 'cursor-wait');
        if (btnConfirmSubmitLabel) {
          btnConfirmSubmitLabel.innerHTML = originalBtnHtml || `Register &amp; Pay ₹ ${selectedCat.amount.toLocaleString()} Now`;
        }

        if (reviewErrorMsg) {
          reviewErrorMsg.textContent = errorMessage || 'Unable to create payment order. Please verify your details and try again.';
        }
        if (reviewErrorBox) {
          reviewErrorBox.classList.remove('hidden');
          reviewErrorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // Direct bank wire / offline mode: Save directly to database and send notification
      const bankData = {
        ...registrationState,
        payment_mode: 'bank_transfer',
        payment_status: 'pending',
        transaction_ref: transactionRef || null,
        date_time: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };

      dispatchApi('save_registration.php', bankData).catch(e => console.warn('Bank wire DB save error:', e));
      dispatchApi('send_registration_notification.php', bankData).catch(e => console.warn('Bank wire notification error:', e));

      // Populate Step 3 Success View
      const succGreeting = document.getElementById('success-greeting');
      if (succGreeting) succGreeting.textContent = `Thank You, ${title} ${name}!`;

      const succBadge = document.getElementById('success-status-badge');
      if (succBadge) {
        succBadge.textContent = 'Registration Recorded (Bank Wire Pending Verification)';
      }

      const succRegId = document.getElementById('success-reg-id');
      if (succRegId) succRegId.textContent = generatedId;

      const succOrderBox = document.getElementById('success-gateway-order');
      if (succOrderBox) succOrderBox.classList.add('hidden');

      const succCategory = document.getElementById('success-category');
      if (succCategory) succCategory.textContent = selectedCat.label;

      const succAmount = document.getElementById('success-amount');
      if (succAmount) succAmount.textContent = selectedCat.fee;

      const succPayStatus = document.getElementById('success-payment-status');
      if (succPayStatus) {
        succPayStatus.textContent = 'Direct Bank Wire Transfer';
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
} catch (e) { }

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
      .catch(() => { });
  } catch (e) { }
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

/* ── 10. GLOBAL RESILIENT IMAGE FALLBACK HANDLERS ── */
window.handleGalleryImgError = function (img) {
  if (!img || img.dataset.failed) return;
  const filename = img.src.split('/').pop().split('?')[0];

  // Step 1: try cPanel hosting mirror where all conference gallery images are hosted
  if (!img.dataset.triedCpanel) {
    img.dataset.triedCpanel = '1';
    img.src = 'https://positive-cyan-dolphin.198-187-29-67.cpanel.site/images/gallery/' + filename;
    return;
  }

  // Step 2: try legacy dyuti uploads folder for archive editions
  if (!img.dataset.triedUploads) {
    img.dataset.triedUploads = '1';
    img.src = 'https://dyuti.in/uploads/gallery/' + filename;
    return;
  }

  // Step 3: if still failing, load graceful placeholder
  img.dataset.failed = '1';
  img.src = 'images/dyuti_let_me_change.jpg';
};

window.handleTeamImgError = function (img) {
  if (!img || img.dataset.failed) return;
  const filename = img.src.split('/').pop().split('?')[0];

  // Step 1: try cPanel hosting mirror where all 20 team photos are hosted
  if (!img.dataset.triedCpanel) {
    img.dataset.triedCpanel = '1';
    img.src = 'https://positive-cyan-dolphin.198-187-29-67.cpanel.site/images/team/' + filename;
    return;
  }

  // Step 2: graceful initials SVG fallback
  img.dataset.failed = '1';
  const alt = img.getAttribute('alt') || 'DYUTI Team';
  const initials = alt.replace(/^Dr\.\s*|Fr\.\s*|Sr\.\s*|Ms\.\s*|Mr\.\s*/gi, '')
    .split(' ')
    .filter(Boolean)
    .map(s => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'DT';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="100%" height="100%" fill="#0a2540"/><circle cx="60" cy="60" r="45" fill="none" stroke="#d4af37" stroke-width="2" opacity="0.4"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#d4af37" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" letter-spacing="1">${initials}</text></svg>`;
  img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
};

// Blanket capture-phase error listener for dynamically or lazy-loaded images
window.addEventListener('error', function (e) {
  if (e.target && e.target.tagName === 'IMG') {
    const img = e.target;
    const src = img.getAttribute('src') || '';
    if (src.includes('images/team/') || src.includes('/team/')) {
      window.handleTeamImgError(img);
    } else if (src.includes('images/gallery/') || src.includes('/gallery/')) {
      window.handleGalleryImgError(img);
    }
  }
}, true);

