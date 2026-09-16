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
  initRegistrationStatusTracker();
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

  // Check if current page is the 1-Rupee Test Registration Page
  const isTestRegistrationPage = window.location.pathname.toLowerCase().includes('test_registration') ||
                                 window.location.href.toLowerCase().includes('test_registration') ||
                                 window.__DYUTI_TEST_MODE__ === true ||
                                 document.getElementById('test-gateway-banner') !== null ||
                                 document.querySelector('[data-fee="1"]') !== null ||
                                 document.title.toLowerCase().includes('1-rupee') ||
                                 document.title.toLowerCase().includes('test');

  if (isTestRegistrationPage) {
    window.__DYUTI_TEST_MODE__ = true;
    window.__DYUTI_TEST_AMOUNT__ = 1;
  }

  // Category Configuration
  const categories = isTestRegistrationPage ? {
    student: {
      label: 'Test Participant (Student Tier - ₹ 1)',
      fee: '₹ 1',
      amount: 1,
      desc: 'Gateway Verification & Live Sandbox Testing'
    },
    scholar: {
      label: 'Test Participant (Scholar Tier - ₹ 1)',
      fee: '₹ 1',
      amount: 1,
      desc: 'Gateway Verification & Live Sandbox Testing'
    },
    professional: {
      label: 'Test Participant (Professional Tier - ₹ 1)',
      fee: '₹ 1',
      amount: 1,
      desc: 'Gateway Verification & Live Sandbox Testing'
    }
  } : {
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

  // ── Cool-Off Period Controller (15 Minutes on Failure) ──
  let cooloffTimerInterval = null;

  function getCooloffData() {
    try {
      const raw = localStorage.getItem('dyuti_cooloff_data');
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (data && data.cooloffUntil && Date.now() < data.cooloffUntil) {
        return data;
      }
      localStorage.removeItem('dyuti_cooloff_data');
    } catch (e) {}
    return null;
  }

  function isCooloffActive(email, phone) {
    if (isTestRegistrationPage || window.__DYUTI_TEST_MODE__ === true) return false;
    const data = getCooloffData();
    if (!data) return false;
    if (email && data.email) {
      if (email.toLowerCase().trim() === data.email.toLowerCase().trim()) return true;
    }
    if (phone && data.phone) {
      const clean1 = phone.replace(/\D/g, '').slice(-10);
      const clean2 = data.phone.replace(/\D/g, '').slice(-10);
      if (clean1 && clean2 && clean1 === clean2) return true;
    }
    return false;
  }

  function startCooloffPeriod(seconds, email, phone, txnId) {
    const cooloffSeconds = Number(seconds) > 0 ? Number(seconds) : 900;
    const cooloffUntil = Date.now() + (cooloffSeconds * 1000);
    const data = {
      cooloffUntil,
      email: email || '',
      phone: phone || '',
      txnId: txnId || '',
      startedAt: Date.now()
    };
    try {
      localStorage.setItem('dyuti_cooloff_data', JSON.stringify(data));
    } catch (e) {}
    renderCooloffUI();
  }

  function renderCooloffUI() {
    const cooloffBanner = document.getElementById('cooloff-alert-banner');
    const timerDisplay = document.getElementById('cooloff-timer-display');
    const submitBtn = document.getElementById('btn-confirm-submit');
    const reviewBtn = form ? form.querySelector('button[type="submit"]') : null;

    if (cooloffTimerInterval) {
      clearInterval(cooloffTimerInterval);
      cooloffTimerInterval = null;
    }

    const data = getCooloffData();
    if (!data) {
      if (cooloffBanner) cooloffBanner.classList.add('hidden');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-60', 'cursor-not-allowed');
      }
      if (reviewBtn) {
        reviewBtn.disabled = false;
        reviewBtn.classList.remove('opacity-60', 'cursor-not-allowed');
      }
      updateButtonLabels();
      return;
    }

    if (cooloffBanner) cooloffBanner.classList.remove('hidden');

    function updateTick() {
      const remainingMs = data.cooloffUntil - Date.now();
      if (remainingMs <= 0) {
        clearInterval(cooloffTimerInterval);
        cooloffTimerInterval = null;
        try { localStorage.removeItem('dyuti_cooloff_data'); } catch (e) {}

        if (cooloffBanner) {
          cooloffBanner.className = 'mb-8 max-w-4xl mx-auto p-5 sm:p-6 rounded-2xl border-2 border-emerald-300 bg-emerald-50 text-emerald-950 shadow-md animate-fadeIn flex items-center gap-3.5';
          cooloffBanner.innerHTML = `
            <div class="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
            </div>
            <div>
              <h4 class="font-heading font-black text-base text-emerald-950 m-0">Cool-Off Period Completed</h4>
              <p class="text-xs sm:text-sm font-sans text-emerald-800 m-0 mt-0.5">The 15-minute wait period has elapsed. You may now safely proceed with your registration payment.</p>
            </div>
          `;
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('opacity-60', 'cursor-not-allowed');
        }
        if (reviewBtn) {
          reviewBtn.disabled = false;
          reviewBtn.classList.remove('opacity-60', 'cursor-not-allowed');
        }
        updateButtonLabels();
        return;
      }

      const totalSec = Math.floor(remainingMs / 1000);
      const mins = Math.floor(totalSec / 60);
      const secs = totalSec % 60;
      const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      if (timerDisplay) {
        timerDisplay.textContent = formatted;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-60', 'cursor-not-allowed');
        if (btnConfirmSubmitLabel) {
          btnConfirmSubmitLabel.textContent = `Cool-Off Active: Wait ${formatted}`;
        }
      }

      if (reviewBtn && proceedReviewLabel) {
        reviewBtn.disabled = true;
        reviewBtn.classList.add('opacity-60', 'cursor-not-allowed');
        proceedReviewLabel.textContent = `Cool-Off Active: Wait ${formatted}`;
      }
    }

    updateTick();
    cooloffTimerInterval = setInterval(updateTick, 1000);
  }

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
      // Clear cooloff on verified success
      try {
        localStorage.removeItem('dyuti_cooloff_data');
      } catch (e) {}

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
          categoryLabel: savedReg?.categoryLabel || 'UG / PG Student'
        };

        // Send confirmation email with PDF receipt to dyuti@rajagiri.edu and delegate
        dispatchApi('send_registration_notification.php', notificationData).catch(e => console.warn('Notification endpoint error:', e));

        // Also save to database as success
        dispatchApi('save_registration.php', notificationData).catch(() => { });

        // Save for quick 1-click status checking
        try {
          localStorage.setItem('dyuti_last_reg_id', notificationData.regId);
          localStorage.setItem('dyuti_last_reg_email', notificationData.email);
        } catch (e) {}
      }

      // 1. SUCCESS: Show confirmation banner and activate Step 3 Confirmed Screen
      if (returnBanner && returnIcon && returnTitle && returnDesc) {
        returnBanner.className = 'mb-8 max-w-4xl mx-auto p-5 rounded-2xl border-2 flex items-start gap-4 animate-fadeIn bg-emerald-50 border-emerald-300 text-emerald-950 shadow-sm';
        returnIcon.innerHTML = '<svg class="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';
        returnTitle.textContent = 'Payment Completed Successfully!';
        returnDesc.innerHTML = `Your registration payment of <strong>₹ ${returnAmount ? parseFloat(returnAmount).toLocaleString() : (savedReg?.amount ? savedReg.amount.toLocaleString() : '750')}</strong> was verified by Online Gateway. Transaction ID: <strong class="font-mono">${vortexTxId}</strong>.`;
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
      if (succPayStatus) succPayStatus.textContent = 'Completed via Online Gateway';

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
      // 2. FAILED / CANCELLED: Show alert banner, save failed state, and trigger 15-minute cool-off
      if (returnBanner && returnIcon && returnTitle && returnDesc) {
        returnBanner.className = 'mb-8 max-w-4xl mx-auto p-5 rounded-2xl border-2 flex items-start gap-4 animate-fadeIn bg-red-50 border-red-300 text-red-950 shadow-sm';
        returnIcon.innerHTML = '<svg class="w-7 h-7 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>';
        returnTitle.textContent = 'Payment Incomplete or Cancelled';
        returnDesc.innerHTML = `Your payment attempt (Transaction ID: <span class="font-mono">${vortexTxId}</span>) was not completed. A <strong>15-minute cool-off period</strong> has been activated for payment security. Your participant details have been restored below.`;
        returnBanner.classList.remove('hidden');
      }

      const emailForCooloff = savedReg?.email || '';
      const phoneForCooloff = savedReg?.phone || '';

      // Record failed status in database
      dispatchApi('save_registration.php', {
        ...(savedReg || {}),
        payment_status: 'failed',
        transaction_ref: vortexTxId || null
      }).catch(() => {});

      // Activate 15-minute cool-off
      startCooloffPeriod(15 * 60, emailForCooloff, phoneForCooloff, vortexTxId);

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

  // Check active cool-off on portal load
  renderCooloffUI();

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
    if (typeof preloadedPayment !== 'undefined') {
      preloadedPayment = { hash: '', promise: null, url: null, errorMessage: null };
    }
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
    const isTest = isTestRegistrationPage || window.__DYUTI_TEST_MODE__ === true;
    const displayAmount = isTest ? 1 : ((typeof window.__DYUTI_TEST_AMOUNT__ === 'number' && window.__DYUTI_TEST_AMOUNT__ > 0)
      ? window.__DYUTI_TEST_AMOUNT__
      : cat.amount);
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

  // ── Real-Time Duplicate Email Prevention ──
  const emailInput = document.getElementById('reg-email');
  const emailDuplicateAlert = document.getElementById('email-duplicate-alert');
  const duplicateEmailDisplay = document.getElementById('duplicate-email-display');
  const duplicateStatusBadgeText = document.getElementById('duplicate-status-badge-text');
  const btnGotoStatusFromDuplicate = document.getElementById('btn-goto-status-from-duplicate');
  const btnDuplicateChangeEmail = document.getElementById('btn-duplicate-change-email');
  const emailCheckingSpinner = document.getElementById('email-checking-spinner');

  let isEmailDuplicate = false;
  let duplicateRecordInfo = null;
  let emailCheckTimer = null;

  async function verifyEmailNotRegistered(emailVal) {
    const email = (emailVal || '').trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      isEmailDuplicate = false;
      duplicateRecordInfo = null;
      if (emailDuplicateAlert) emailDuplicateAlert.classList.add('hidden');
      if (emailInput) {
        emailInput.classList.remove('border-amber-500', 'bg-amber-50/20', 'focus:border-amber-600', 'focus:ring-amber-500/20');
      }
      return false;
    }

    if (emailCheckingSpinner) emailCheckingSpinner.classList.remove('hidden');

    try {
      const candidates = [
        'api/check_registration_status.php?email=' + encodeURIComponent(email),
        '/rcss/api/check_registration_status.php?email=' + encodeURIComponent(email),
        '/api/check_registration_status.php?email=' + encodeURIComponent(email),
        '/api/check_registration_status?email=' + encodeURIComponent(email)
      ];

      let result = null;
      for (const endpoint of candidates) {
        try {
          const res = await fetch(endpoint, {
            headers: { 'Accept': 'application/json' }
          });
          if (res.status === 404) continue;
          result = await res.json();
          if (result && result.status === 'success') break;
        } catch (e) {}
      }

      if (result && result.found && Array.isArray(result.records) && result.records.length > 0) {
        const confirmed = result.records.find(r => ['success', 'captured', 'paid'].includes((r.payment_status || '').toLowerCase()));
        const pending = result.records.find(r => (r.payment_status || '').toLowerCase() === 'pending');
        const match = confirmed || pending || result.records[0];

        if (confirmed || pending || result.already_registered) {
          isEmailDuplicate = true;
          duplicateRecordInfo = match;

          if (duplicateEmailDisplay) duplicateEmailDisplay.textContent = email;
          if (duplicateStatusBadgeText) {
            duplicateStatusBadgeText.textContent = confirmed
              ? 'Payment Completed (Confirmed)'
              : 'Payment Pending Verification';
          }
          if (emailDuplicateAlert) emailDuplicateAlert.classList.remove('hidden');
          if (emailInput) {
            emailInput.classList.add('border-amber-500', 'bg-amber-50/20', 'focus:border-amber-600', 'focus:ring-amber-500/20');
          }
          return true;
        }
      }

      isEmailDuplicate = false;
      duplicateRecordInfo = null;
      if (emailDuplicateAlert) emailDuplicateAlert.classList.add('hidden');
      if (emailInput) {
        emailInput.classList.remove('border-amber-500', 'bg-amber-50/20', 'focus:border-amber-600', 'focus:ring-amber-500/20');
      }
      return false;

    } catch (e) {
      console.warn('Email duplicate check error:', e);
      return false;
    } finally {
      if (emailCheckingSpinner) emailCheckingSpinner.classList.add('hidden');
    }
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      clearTimeout(emailCheckTimer);
      emailCheckTimer = setTimeout(() => {
        verifyEmailNotRegistered(emailInput.value);
      }, 500);
    });

    emailInput.addEventListener('blur', () => {
      clearTimeout(emailCheckTimer);
      verifyEmailNotRegistered(emailInput.value);
    });
  }

  if (btnGotoStatusFromDuplicate) {
    btnGotoStatusFromDuplicate.addEventListener('click', () => {
      const email = emailInput?.value.trim() || '';
      if (typeof window.dyutiSwitchToStatus === 'function') {
        window.dyutiSwitchToStatus(email);
      } else {
        window.location.hash = '#status';
      }
    });
  }

  if (btnDuplicateChangeEmail) {
    btnDuplicateChangeEmail.addEventListener('click', () => {
      if (emailInput) {
        emailInput.value = '';
        emailInput.focus();
      }
      isEmailDuplicate = false;
      duplicateRecordInfo = null;
      if (emailDuplicateAlert) emailDuplicateAlert.classList.add('hidden');
      if (emailInput) {
        emailInput.classList.remove('border-amber-500', 'bg-amber-50/20');
      }
    });
  }

  // 4. Form Submit (Proceed to Review Step)
  form.addEventListener('submit', async (e) => {
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

    // Prevent proceeding if email is already registered
    if (isEmailDuplicate) {
      const regId = duplicateRecordInfo?.registration_id ? ` (${duplicateRecordInfo.registration_id})` : '';
      if (formErrorMsg) {
        formErrorMsg.textContent = `The email "${email}" is already registered${regId}. Duplicate entries are not permitted. Please check your registration details in the Status tab.`;
      }
      if (formErrorBox) {
        formErrorBox.classList.remove('hidden');
        formErrorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      if (emailDuplicateAlert) {
        emailDuplicateAlert.classList.remove('hidden');
        emailDuplicateAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Confirm verification once more if not validated yet
    const isDuplicateDirect = await verifyEmailNotRegistered(email);
    if (isDuplicateDirect) {
      const regId = duplicateRecordInfo?.registration_id ? ` (${duplicateRecordInfo.registration_id})` : '';
      if (formErrorMsg) {
        formErrorMsg.textContent = `The email "${email}" is already registered${regId}. Duplicate entries are not permitted. Please check your registration details in the Status tab.`;
      }
      if (formErrorBox) {
        formErrorBox.classList.remove('hidden');
        formErrorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      if (emailDuplicateAlert) {
        emailDuplicateAlert.classList.remove('hidden');
        emailDuplicateAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    if (isCooloffActive(email, phone)) {
      renderCooloffUI();
      const coolData = getCooloffData();
      const remainingSec = Math.max(0, Math.floor((coolData.cooloffUntil - Date.now()) / 1000));
      const m = Math.floor(remainingSec / 60);
      const s = remainingSec % 60;
      if (formErrorMsg) formErrorMsg.textContent = `A mandatory 15-minute cool-off period is active for this registration attempt. Please wait ${m}m ${s}s before retrying.`;
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

    const isTest = isTestRegistrationPage ||
                   window.__DYUTI_TEST_MODE__ === true ||
                   window.location.href.toLowerCase().includes('test_registration') ||
                   document.getElementById('test-gateway-banner') !== null ||
                   document.querySelector('[data-fee="1"]') !== null;

    const amountToSend = isTest ? 1 : ((typeof window.__DYUTI_TEST_AMOUNT__ === 'number' && window.__DYUTI_TEST_AMOUNT__ > 0)
      ? window.__DYUTI_TEST_AMOUNT__
      : selectedCat.amount);

    return {
      customer_name: `${title} ${name}`.trim(),
      name: `${title} ${name}`.trim(),
      customer_email: email.trim(),
      email: email.trim(),
      customer_mobile: phone.trim(),
      mobile: phone.trim(),
      amount: amountToSend,
      currency: 'INR',
      redirect_url: returnUrl
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
  window.dyutiDispatchApi = dispatchApi;

  async function fetchPaymentUrl(orderData) {
    // Determine the correct API path based on where the page is hosted
    const currentPath = window.location.pathname;
    // Build base dir: e.g. '/rcss' from '/rcss/registration.html'
    const baseDir = currentPath.substring(0, currentPath.lastIndexOf('/')).replace(/\/+$/, '') || '';

    // Single canonical endpoint first (relative to current page), then absolute fallbacks
    const endpoints = [
      baseDir ? (baseDir + '/api/create_payment_order.php') : null,
      'api/create_payment_order.php',
      '/rcss/api/create_payment_order.php',
      '/api/create_payment_order.php',
      baseDir ? (baseDir + '/api/create_payment_order') : null,
      'api/create_payment_order',
      '/api/create_payment_order'
    ].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i); // deduplicate

    let lastError = 'Payment gateway is unavailable. Please try again in a moment.';

    for (const endpoint of endpoints) {
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
          console.warn('Non-JSON from ' + endpoint + ':', text.substring(0, 200));
          continue;
        }

        if (json && (json.cooloff || res.status === 429)) {
          if (typeof startCooloffPeriod === 'function') {
            startCooloffPeriod(json.cooloff_remaining_seconds || 900, orderData.email, orderData.mobile);
          }
          const err = new Error(json.message || 'A 15-minute cool-off period is currently active.');
          err.cooloff = true;
          err.cooloff_remaining_seconds = json.cooloff_remaining_seconds || 900;
          throw err;
        }

        if (json && (json.status === 'success' || json.success === true)) {
          const url = (json.data && json.data.payment_url) || json.payment_url || json.paymentUrl || json.url;
          if (url) return url;
        }

        // Gateway returned an error message — record it and try next endpoint
        if (json && json.message) {
          lastError = json.message;
        }
      } catch (err) {
        console.warn('Endpoint failed (' + endpoint + '):', err.message || err);
      }
    }

    throw new Error(lastError);
  }
  window.dyutiFetchPaymentUrl = fetchPaymentUrl;

  function submitPaymentFormDirect(orderData) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'api/create_payment_order.php';
    form.style.display = 'none';

    const cleanPayload = {
      ...orderData,
      redirect: 'true'
    };

    for (const [k, v] of Object.entries(cleanPayload)) {
      if (v !== undefined && v !== null && typeof v !== 'function') {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = k;
        input.value = typeof v === 'object' ? JSON.stringify(v) : String(v);
        form.appendChild(input);
      }
    }

    document.body.appendChild(form);
    form.submit();
  }
  window.dyutiSubmitPaymentFormDirect = submitPaymentFormDirect;

  function startPaymentPreload() {
    if (currentPaymentMode !== 'online') return;
    const orderData = getOrderPayload();
    // Only preload if we have valid email and mobile
    if (!orderData.email || !orderData.mobile) return;

    const hash = orderData.email + '|' + orderData.mobile + '|' + orderData.amount;
    // Only skip if we already have a successful URL cached for the same data
    if (preloadedPayment.hash === hash && preloadedPayment.url) {
      return;
    }

    // Reset — always start fresh (don't cache failed promises)
    preloadedPayment = {
      hash: hash,
      url: null,
      errorMessage: null,
      promise: null
    };

    preloadedPayment.promise = fetchPaymentUrl(orderData)
      .then(function (url) {
        preloadedPayment.url = url;
        preloadedPayment.promise = null; // clear promise once resolved
        return url;
      })
      .catch(function (err) {
        // On failure, clear the promise so confirm-submit retries from scratch
        preloadedPayment.promise = null;
        preloadedPayment.errorMessage = err.message;
        console.warn('Preload failed — will retry on submit:', err.message);
      });
  }

  // Double-submission protection and UI state recovery
  let isSubmitting = false;

  function resetSubmitButtonState() {
    isSubmitting = false;
    if (btnConfirmSubmit) {
      btnConfirmSubmit.disabled = false;
      btnConfirmSubmit.classList.remove('opacity-80', 'opacity-75', 'cursor-wait', 'cursor-not-allowed');
    }
    updateButtonLabels();
  }

  // Restore button if navigated back via browser Back/Forward Cache (bfcache)
  window.addEventListener('pageshow', (event) => {
    resetSubmitButtonState();
    preloadedPayment = { hash: '', promise: null, url: null, errorMessage: null };
  });

  // 5. Back to Form button in Step 2
  if (btnBackToForm) {
    btnBackToForm.addEventListener('click', () => {
      resetSubmitButtonState();
      preloadedPayment = { hash: '', promise: null, url: null, errorMessage: null };
      setStep('form');
    });
  }

  // 6. Confirm & Submit in Step 2
  if (btnConfirmSubmit) {
    btnConfirmSubmit.addEventListener('click', async () => {
      if (isSubmitting) return; // Prevent double clicking

      const email = document.getElementById('reg-email')?.value.trim() || '';
      const phone = document.getElementById('reg-phone')?.value.trim() || '';

      if (isEmailDuplicate) {
        if (reviewErrorMsg) {
          reviewErrorMsg.textContent = `The email "${email}" is already registered. Duplicate entries are not permitted. Please check your registration details in the Status section.`;
        }
        if (reviewErrorBox) {
          reviewErrorBox.classList.remove('hidden');
          reviewErrorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      if (isCooloffActive(email, phone)) {
        renderCooloffUI();
        const coolData = getCooloffData();
        const remainingSec = Math.max(0, Math.floor((coolData.cooloffUntil - Date.now()) / 1000));
        const m = Math.floor(remainingSec / 60);
        const s = remainingSec % 60;
        if (reviewErrorMsg) reviewErrorMsg.textContent = `A mandatory 15-minute cool-off period is active. Please wait ${m}m ${s}s before attempting payment again.`;
        if (reviewErrorBox) {
          reviewErrorBox.classList.remove('hidden');
          reviewErrorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      if (!agreeTermsCheckbox || !agreeTermsCheckbox.checked) {
        if (reviewErrorMsg) reviewErrorMsg.textContent = 'Please check the verification declaration box to confirm your details.';
        if (reviewErrorBox) reviewErrorBox.classList.remove('hidden');
        return;
      }

      isSubmitting = true;

      if (reviewErrorBox) reviewErrorBox.classList.add('hidden');

      const title = document.getElementById('reg-title')?.value || 'Dr.';
      const name = document.getElementById('reg-name')?.value.trim() || 'Participant';
      const designation = document.getElementById('reg-designation')?.value.trim() || '';
      const gender = document.getElementById('reg-gender')?.value || '';
      const organization = document.getElementById('reg-organization')?.value.trim() || 'Rajagiri College';
      const discipline = document.getElementById('reg-discipline')?.value.trim() || '';
      const address = document.getElementById('reg-address')?.value.trim() || '';
      const pincode = document.getElementById('reg-pincode')?.value.trim() || '';
      const accomRadio = form.querySelector('input[name="requireAccommodation"]:checked');
      const requireAccommodation = accomRadio ? accomRadio.value : 'no';
      const foodRadio = form.querySelector('input[name="foodPreference"]:checked');
      const foodPreference = foodRadio ? foodRadio.value : 'veg';
      const paperRadio = form.querySelector('input[name="isPresentingPaper"]:checked');
      const isPresentingPaper = paperRadio ? paperRadio.value : 'no';

      const selectedCat = categories[currentCategoryKey] || categories.student;

      // Check if this participant is retrying an existing pending registration ID
      const retryId = window.__DYUTI_RETRY_REG_ID__ || (function() {
        try {
          const cleanEmail = email.toLowerCase().replace(/[^a-z0-9]/g, '');
          return sessionStorage.getItem('dyuti_retry_reg_id') || localStorage.getItem('dyuti_last_pending_id_' + cleanEmail) || '';
        } catch(e) { return ''; }
      })();

      const randomCode = Math.floor(10000 + Math.random() * 90000);
      const generatedId = retryId || (currentPaymentMode === 'online'
        ? `DYUTI27-ONLINE-${randomCode}`
        : `DYUTI27-REG-${randomCode}`);

      try {
        const cleanEmail = email.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (cleanEmail) localStorage.setItem('dyuti_last_pending_id_' + cleanEmail, generatedId);
      } catch(e) {}

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
        categoryKey: currentCategoryKey,
        categoryLabel: selectedCat.label,
        amount: (isTestRegistrationPage || window.__DYUTI_TEST_MODE__ === true) ? 1 : selectedCat.amount,
        feeString: (isTestRegistrationPage || window.__DYUTI_TEST_MODE__ === true) ? '₹ 1' : selectedCat.fee,
        paymentMode: currentPaymentMode,
        paymentStatus: 'pending'
      };

      try {
        sessionStorage.setItem('dyuti_pending_registration', JSON.stringify(registrationState));
        localStorage.setItem('dyuti_last_reg_id', generatedId);
        localStorage.setItem('dyuti_last_reg_email', email);
        localStorage.setItem('dyuti_last_reg_phone', phone);
        localStorage.setItem('dyuti_last_reg_data', JSON.stringify(registrationState));

        const history = JSON.parse(localStorage.getItem('dyuti_registrations_history') || '[]');
        const filtered = history.filter(h => (h.regId !== generatedId && h.registration_id !== generatedId));
        filtered.unshift(registrationState);
        localStorage.setItem('dyuti_registrations_history', JSON.stringify(filtered.slice(0, 10)));
      } catch (e) {
        console.warn('localStorage not accessible:', e);
      }

      // Pre-save registration to SQL database so no participant submission is ever lost
      try {
        await dispatchApi('save_registration.php', {
          ...registrationState,
          payment_status: 'pending',
          payment_mode: currentPaymentMode
        });
      } catch (e) {
        console.warn('Pre-save registration error:', e);
      }

      // Online payment via Vortexx Payment Gateway
      if (currentPaymentMode === 'online') {
        const orderData = getOrderPayload();
        const currentHash = orderData.email + '|' + orderData.mobile + '|' + orderData.amount;

        // INSTANT REDIRECTION: If preloaded URL matches current amount, redirect immediately
        if (preloadedPayment.url && preloadedPayment.hash === currentHash) {
          window.location.href = preloadedPayment.url;
          setTimeout(resetSubmitButtonState, 1000);
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
              Connecting to Online Gateway...
            </span>
          `;
        }

        let paymentUrl = null;
        let errorMessage = null;

        try {
          if (preloadedPayment.url && preloadedPayment.hash === currentHash) {
            paymentUrl = preloadedPayment.url;
          } else if (preloadedPayment.promise && preloadedPayment.hash === currentHash) {
            // Preload with same amount still in flight — wait for it
            await preloadedPayment.promise;
            if (preloadedPayment.url) {
              paymentUrl = preloadedPayment.url;
            } else {
              paymentUrl = await fetchPaymentUrl(orderData);
            }
          } else {
            // No matching preload or amount changed — call fresh
            paymentUrl = await fetchPaymentUrl(orderData);
          }
        } catch (err) {
          errorMessage = err.message || 'Unable to create payment order. Please verify your details and try again.';
          console.warn('Payment fetch failed:', errorMessage);
        }

        if (paymentUrl) {
          window.location.href = paymentUrl;
          setTimeout(resetSubmitButtonState, 1000);
          return;
        }

        // Direct fallback: submit invisible POST form directly to payment gateway endpoint
        try {
          console.log('Invoking direct form POST payment fallback...');
          submitPaymentFormDirect({
            ...orderData,
            registration_id: generatedId,
            order_id: generatedId
          });
          return;
        } catch (formErr) {
          console.error('Direct form POST failed:', formErr);
        }

        // If order creation failed and fallback failed, display error
        if (!isTestRegistrationPage && window.__DYUTI_TEST_MODE__ !== true) {
          startCooloffPeriod(900, orderData.email, orderData.mobile);
        }
        dispatchApi('save_registration.php', {
          ...registrationState,
          payment_status: 'failed',
          error_message: errorMessage || 'Gateway error'
        }).catch(() => {});

        resetSubmitButtonState();
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

      try {
        localStorage.setItem('dyuti_last_reg_id', generatedId);
        localStorage.setItem('dyuti_last_reg_email', email);
      } catch (e) {}
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


/* ── 7B. REGISTRATION STATUS TRACKER & VERIFICATION PORTAL ── */
function initRegistrationStatusTracker() {
  const btnPortalCheckStatus = document.getElementById('btn-portal-check-status');
  const btnStatusReturnToForm = document.getElementById('btn-status-return-to-form');
  const modeTabRegister = document.getElementById('mode-tab-register');
  const modeTabStatus = document.getElementById('mode-tab-status');
  const stepIndicator = document.getElementById('portal-step-indicator');
  const stepFormView = document.getElementById('reg-step-form');
  const stepReviewView = document.getElementById('reg-step-review');
  const stepSuccessView = document.getElementById('reg-step-success');
  const statusView = document.getElementById('reg-status-view');

  const statusForm = document.getElementById('status-lookup-form');
  const statusAppIdInput = document.getElementById('status-app-id-input');
  const statusPhoneInput = document.getElementById('status-phone-input');
  const statusInput = document.getElementById('status-search-input');
  const statusSubmitBtn = document.getElementById('btn-submit-status-search');
  const statusRecentWrapper = document.getElementById('status-recent-chip-wrapper');
  const statusRecentChip = document.getElementById('btn-status-recent-chip');
  const recentChipText = document.getElementById('recent-chip-text');
  const statusError = document.getElementById('status-search-error');
  const statusLoading = document.getElementById('status-loading-spinner');
  const statusNotFound = document.getElementById('status-not-found');
  const statusNotFoundMsg = document.getElementById('status-not-found-msg');
  const statusResultsContainer = document.getElementById('status-results-container');
  const btnSwitchToRegister = document.getElementById('btn-status-switch-to-register');
  const btnSuccessCheckStatus = document.getElementById('btn-success-check-status');

  if (!statusView) return;

  function switchMode(mode) {
    if (mode === 'register') {
      if (modeTabRegister && modeTabStatus) {
        modeTabRegister.className = 'flex-1 py-2.5 sm:py-3 px-4 rounded-full font-sans text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-2 bg-[#071A33] text-white shadow-md cursor-pointer';
        modeTabStatus.className = 'flex-1 py-2.5 sm:py-3 px-4 rounded-full font-sans text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-950 hover:bg-white/70 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer';
      }

      if (btnPortalCheckStatus) {
        btnPortalCheckStatus.innerHTML = `
          <svg class="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span id="btn-portal-check-status-label">Already Registered? Check Your Status</span>
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-amber-200 text-amber-950 ml-1">
            Track Live
          </span>
        `;
      }

      if (stepIndicator) stepIndicator.classList.remove('hidden');
      statusView.classList.add('hidden');

      if (stepSuccessView && !stepSuccessView.classList.contains('hidden')) {
        // preserve success view
      } else if (stepReviewView && !stepReviewView.classList.contains('hidden')) {
        // preserve review view
      } else {
        if (stepFormView) stepFormView.classList.remove('hidden');
      }
    } else {
      if (modeTabRegister && modeTabStatus) {
        modeTabStatus.className = 'flex-1 py-2.5 sm:py-3 px-4 rounded-full font-sans text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-2 bg-[#071A33] text-white shadow-md cursor-pointer';
        modeTabRegister.className = 'flex-1 py-2.5 sm:py-3 px-4 rounded-full font-sans text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-950 hover:bg-white/70 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer';
      }

      if (btnPortalCheckStatus) {
        btnPortalCheckStatus.innerHTML = `
          <svg class="w-4 h-4 text-slate-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Return to Registration Form</span>
        `;
      }

      if (stepIndicator) stepIndicator.classList.add('hidden');
      if (stepFormView) stepFormView.classList.add('hidden');
      if (stepReviewView) stepReviewView.classList.add('hidden');
      if (stepSuccessView) stepSuccessView.classList.add('hidden');
      statusView.classList.remove('hidden');

      updateRecentChip();
      if (statusAppIdInput) statusAppIdInput.focus();
      else if (statusInput) statusInput.focus();
    }
  }

  window.dyutiToggleStatusView = function(targetMode) {
    if (typeof targetMode === 'string') {
      switchMode(targetMode);
    } else {
      const isCurrentlyStatus = statusView && !statusView.classList.contains('hidden');
      switchMode(isCurrentlyStatus ? 'register' : 'status');
    }
  };

  if (btnPortalCheckStatus) {
    btnPortalCheckStatus.onclick = function(e) {
      if (e) e.preventDefault();
      window.dyutiToggleStatusView();
    };
  }

  if (btnStatusReturnToForm) {
    btnStatusReturnToForm.onclick = function(e) {
      if (e) e.preventDefault();
      window.dyutiToggleStatusView('register');
    };
  }

  if (modeTabRegister) modeTabRegister.addEventListener('click', () => switchMode('register'));
  if (modeTabStatus) modeTabStatus.addEventListener('click', () => switchMode('status'));

  if (btnSwitchToRegister) {
    btnSwitchToRegister.addEventListener('click', () => switchMode('register'));
  }

  if (btnSuccessCheckStatus) {
    btnSuccessCheckStatus.addEventListener('click', () => {
      const regIdEl = document.getElementById('success-reg-id');
      const regId = regIdEl ? regIdEl.textContent.trim() : '';
      switchMode('status');
      if (regId) {
        if (statusAppIdInput) statusAppIdInput.value = regId;
        if (statusInput) statusInput.value = regId;
        performStatusLookup({ appId: regId, query: regId });
      }
    });
  }

  // Globally exposed status switcher for 1-click status checking from anywhere
  window.dyutiSwitchToStatus = function(query) {
    switchMode('status');
    if (query) {
      if (statusAppIdInput) statusAppIdInput.value = query;
      if (statusInput) statusInput.value = query;
      performStatusLookup({ query });
    }
    const statusSection = document.getElementById('reg-status-view');
    if (statusSection) {
      statusSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  function updateRecentChip() {
    if (!statusRecentWrapper || !statusRecentChip || !recentChipText) return;
    let recentId = '';
    try {
      recentId = localStorage.getItem('dyuti_last_reg_id') || '';
      if (!recentId) {
        const pending = JSON.parse(sessionStorage.getItem('dyuti_pending_registration') || '{}');
        recentId = pending?.regId || '';
      }
    } catch (e) {}

    if (recentId) {
      recentChipText.textContent = recentId;
      statusRecentWrapper.classList.remove('hidden');
      statusRecentChip.onclick = () => {
        if (statusAppIdInput) statusAppIdInput.value = recentId;
        if (statusInput) statusInput.value = recentId;
        performStatusLookup({ appId: recentId, query: recentId });
      };
    } else {
      statusRecentWrapper.classList.add('hidden');
    }
  }

  // Handle URL hash / query param (e.g. #status or ?tab=status or ?check_status=ID)
  const params = new URLSearchParams(window.location.search);
  const checkStatusParam = params.get('check_status') || params.get('status_query');
  const isStatusTab = window.location.hash === '#status' || params.get('tab') === 'status' || !!checkStatusParam;

  if (isStatusTab) {
    switchMode('status');
    if (checkStatusParam) {
      if (statusAppIdInput) statusAppIdInput.value = checkStatusParam;
      if (statusInput) statusInput.value = checkStatusParam;
      performStatusLookup({ query: checkStatusParam });
    }
  }

  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#status') {
      switchMode('status');
    } else if (window.location.hash === '#register' || window.location.hash === '') {
      switchMode('register');
    }
  });

  if (statusForm) {
    statusForm.addEventListener('submit', (e) => {
      e.preventDefault();
      triggerStatusSearch();
    });
  }

  if (statusSubmitBtn) {
    statusSubmitBtn.addEventListener('click', (e) => {
      // In case form submission is prevented or button is clicked directly
      triggerStatusSearch();
    });
  }

  function triggerStatusSearch() {
    const appId = statusAppIdInput ? statusAppIdInput.value.trim() : '';
    const phone = statusPhoneInput ? statusPhoneInput.value.trim() : '';
    const legacyQ = statusInput ? statusInput.value.trim() : '';
    const query = appId || phone || legacyQ;

    if (!query) {
      if (statusError) {
        statusError.textContent = 'Please enter your Application ID or registered Mobile Number.';
        statusError.classList.remove('hidden');
        statusError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      return;
    }
    performStatusLookup({ query, appId, phone });
  }

  async function performStatusLookup(param) {
    const appId = (typeof param === 'object' && param.appId) ? param.appId.trim() : (statusAppIdInput ? statusAppIdInput.value.trim() : '');
    const phone = (typeof param === 'object' && param.phone) ? param.phone.trim() : (statusPhoneInput ? statusPhoneInput.value.trim() : '');
    const rawQuery = typeof param === 'string'
      ? param.trim()
      : ((param && param.query) || appId || phone || (statusInput ? statusInput.value.trim() : '')).trim();

    const payload = {
      query: rawQuery,
      registration_id: appId,
      phone: phone
    };

    const displayTerm = [appId, phone].filter(Boolean).join(' / ') || rawQuery || 'Provided details';

    if (statusError) statusError.classList.add('hidden');
    if (statusNotFound) statusNotFound.classList.add('hidden');
    if (statusResultsContainer) statusResultsContainer.innerHTML = '';
    if (statusLoading) statusLoading.classList.remove('hidden');

    if (statusSubmitBtn) {
      statusSubmitBtn.disabled = true;
      statusSubmitBtn.classList.add('opacity-75', 'cursor-wait');
    }

    let records = [];
    let cooloffInfo = null;
    let serverErrorMessage = '';

    try {
      const candidates = [
        'api/check_registration_status.php',
        '/api/check_registration_status.php',
        '/rcss/api/check_registration_status.php',
        'api/check_registration_status',
        '/api/check_registration_status'
      ];

      let apiResponse = null;
      for (const endpoint of candidates) {
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (res.status === 404) continue;
          
          let parsedData = null;
          try {
            parsedData = await res.json();
          } catch (jsonErr) {
            // Not valid JSON (e.g. 500 error page)
          }

          if (parsedData) {
            apiResponse = parsedData;
            if (apiResponse.status === 'success') {
              break;
            } else if (apiResponse.message) {
              serverErrorMessage = apiResponse.message;
            }
          } else if (!res.ok) {
            serverErrorMessage = `Database API returned HTTP ${res.status}. Please make sure the updated api/check_registration_status.php is uploaded to cPanel.`;
          }
        } catch (err) {
          // Network error or endpoint unreachable
        }
      }

      if (apiResponse && apiResponse.found && Array.isArray(apiResponse.records)) {
        records = apiResponse.records;
        cooloffInfo = apiResponse.cooloff;
      }

      // Fallback check against client sessionStorage / localStorage
      if (records.length === 0) {
        const localMatches = [];
        try {
          const aLower = appId.toLowerCase().trim();
          const appSuffixMatch = aLower.match(/(\d{4,})$/);
          const appSuffix = appSuffixMatch ? appSuffixMatch[1] : '';
          const pClean = phone.replace(/\D/g, '');
          const pLast10 = pClean.length >= 10 ? pClean.slice(-10) : pClean;
          const qLower = rawQuery.toLowerCase().trim();

          const candidatesList = [];

          // 1. Check history array
          try {
            const hist = JSON.parse(localStorage.getItem('dyuti_registrations_history') || '[]');
            if (Array.isArray(hist)) candidatesList.push(...hist);
          } catch (e) {}

          // 2. Check direct saved confirmation data
          try {
            const savedDataStr = localStorage.getItem('dyuti_last_reg_data');
            if (savedDataStr) candidatesList.push(JSON.parse(savedDataStr));
          } catch (e) {}

          // 3. Check pending registration session
          try {
            const savedRegStr = sessionStorage.getItem('dyuti_pending_registration');
            if (savedRegStr) candidatesList.push(JSON.parse(savedRegStr));
          } catch (e) {}

          const seenIds = new Set();
          for (const item of candidatesList) {
            if (!item) continue;
            const regId = (item.registration_id || item.regId || '').toLowerCase().trim();
            const sEmail = (item.email || '').toLowerCase().trim();
            const sPhone = (item.phone || '').replace(/\D/g, '');

            const matchApp = aLower && (
              regId === aLower || 
              regId.includes(aLower) || 
              (appSuffix && regId.includes(appSuffix)) ||
              sEmail === aLower
            );

            const matchPhone = pLast10 && (
              sPhone.endsWith(pLast10) || 
              pLast10.endsWith(sPhone) ||
              (sPhone.length >= 7 && pLast10.includes(sPhone))
            );

            const matchQuery = qLower && (
              regId === qLower || 
              sEmail === qLower || 
              regId.includes(qLower) || 
              sEmail.includes(qLower) ||
              (pLast10 && sPhone.endsWith(pLast10))
            );

            if (matchApp || matchPhone || matchQuery) {
              const uniqueKey = item.registration_id || item.regId || sEmail;
              if (uniqueKey && !seenIds.has(uniqueKey)) {
                seenIds.add(uniqueKey);
                localMatches.push({
                  registration_id: item.registration_id || item.regId || 'DYUTI27-ONLINE-PENDING',
                  title: item.title || 'Dr.',
                  full_name: item.full_name || item.name || 'Participant',
                  designation: item.designation || 'Delegate',
                  organization: item.organization || 'Rajagiri',
                  discipline: item.discipline || 'Social Work',
                  address: item.address || '',
                  pincode: item.pincode || '',
                  phone: item.phone || '',
                  email: item.email || '',
                  registration_category: item.registration_category || item.categoryLabel || 'UG / PG Student',
                  fee_amount: item.fee_amount || item.amount || 750,
                  payment_mode: item.payment_mode || item.paymentMode || 'online',
                  payment_status: item.payment_status || item.paymentStatus || 'pending',
                  transaction_ref: item.transaction_ref || item.vortex_transaction_id || item.transactionRef || 'Pending Verification',
                  food_preference: item.food_preference || item.foodPreference || 'veg',
                  require_accommodation: item.require_accommodation || item.requireAccommodation || 'no',
                  is_presenting_paper: item.is_presenting_paper || item.isPresentingPaper || 'no',
                  created_at: item.created_at || new Date().toISOString()
                });
              }
            }
          }
        } catch (e) {
          console.warn('Local fallback search error:', e);
        }

        if (localMatches.length > 0) {
          records = localMatches;
        }
      }

    } catch (err) {
      console.warn('Status lookup error:', err);
    } finally {
      if (statusLoading) statusLoading.classList.add('hidden');
      if (statusSubmitBtn) {
        statusSubmitBtn.disabled = false;
        statusSubmitBtn.classList.remove('opacity-75', 'cursor-wait');
      }
    }

    if (records.length === 0) {
      if (serverErrorMessage) {
        if (statusError) {
          statusError.innerHTML = `
            <div class="flex items-start gap-2.5 text-left">
              <svg class="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              <div>
                <strong class="block font-bold">Database Server Notice:</strong>
                <span>${escapeHtml(serverErrorMessage)}</span>
              </div>
            </div>
          `;
          statusError.classList.remove('hidden');
          statusError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        return;
      }

      if (statusNotFound) {
        if (statusNotFoundMsg) {
          statusNotFoundMsg.textContent = `We could not find any active delegate registration matching "${displayTerm}". Please double-check your Application ID or registered Mobile Number.`;
        }
        statusNotFound.classList.remove('hidden');
        statusNotFound.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else if (statusError) {
        statusError.textContent = `No record found matching "${displayTerm}".`;
        statusError.classList.remove('hidden');
      }
      return;
    }

    renderStatusResults(records, cooloffInfo);
    if (statusResultsContainer) {
      statusResultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function renderStatusResults(records, cooloffInfo) {
    if (!statusResultsContainer) return;
    statusResultsContainer.innerHTML = '';

    // Priority Rule:
    // 1. If payment is success/confirmed: DO NOT show pending status! Show ONLY the confirmed record.
    // 2. If payment is pending: show that pending status only (latest active attempt).
    const confirmed = records.filter(r => ['success', 'confirmed', 'paid', 'captured'].includes(String(r.payment_status || '').toLowerCase()));
    const pending   = records.filter(r => String(r.payment_status || '').toLowerCase() === 'pending');

    let displayRecords = records;
    if (confirmed.length > 0) {
      displayRecords = confirmed;
    } else if (pending.length > 0) {
      displayRecords = [pending[0]];
    } else if (records.length > 0) {
      displayRecords = [records[0]];
    }

    displayRecords.forEach((rec) => {
      const card = document.createElement('div');
      card.className = 'p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-50 border-2 border-slate-200/90 shadow-md space-y-6 animate-fadeIn';

      const stLower = String(rec.payment_status || '').toLowerCase();
      const isSuccess = ['success', 'confirmed', 'paid', 'captured'].includes(stLower);
      const isFailed = stLower === 'failed';
      const isBankPending = rec.payment_mode === 'bank_transfer' && !isSuccess;

      let badgeHtml = '';
      let statusAlertHtml = '';

      if (isSuccess) {
        badgeHtml = `
          <span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 border-2 border-emerald-400 text-emerald-900 font-mono text-xs sm:text-sm font-black uppercase tracking-wider">
            <svg class="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
            Registration Confirmed &bull; Payment Verified
          </span>
        `;
        statusAlertHtml = `
          <div class="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-sans flex items-start gap-2.5">
            <svg class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div>
              <strong>Your registration is active and officially verified.</strong> An official confirmation and payment voucher have been issued. Present your Registration ID at the conference check-in desk at Rajagiri.
            </div>
          </div>
        `;
      } else if (isBankPending) {
        badgeHtml = `
          <span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-50 border-2 border-amber-400 text-amber-900 font-mono text-xs sm:text-sm font-black uppercase tracking-wider">
            <svg class="w-4 h-4 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Bank Wire Received &bull; Secretariat Verification Pending
          </span>
        `;
        statusAlertHtml = `
          <div class="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs sm:text-sm font-sans flex items-start gap-2.5">
            <svg class="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div>
              <strong>Bank wire transfer record is under administrative audit.</strong> Once the secretariat verifies your UTR / transaction credit, your status will update to Confirmed.
            </div>
          </div>
        `;
      } else if (isFailed) {
        badgeHtml = `
          <span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-50 border-2 border-red-400 text-red-900 font-mono text-xs sm:text-sm font-black uppercase tracking-wider">
            <svg class="w-4 h-4 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            Payment Incomplete / Failed
          </span>
        `;
        statusAlertHtml = `
          <div class="p-4 rounded-xl bg-red-50/80 border border-red-200 text-red-900 text-xs sm:text-sm font-sans flex items-start gap-2.5">
            <svg class="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <div>
              <strong>Previous payment attempt was not completed.</strong> In accordance with payment rules, a 15-minute cool-off period applies before you can retry payment.
            </div>
          </div>
        `;
      } else {
        badgeHtml = `
          <span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border-2 border-blue-400 text-blue-900 font-mono text-xs sm:text-sm font-black uppercase tracking-wider">
            <svg class="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Payment Awaiting Confirmation
          </span>
        `;
        statusAlertHtml = `
          <div class="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-900 text-xs sm:text-sm font-sans flex items-start gap-2.5">
            <svg class="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div>
              <strong>Registration is recorded and awaiting payment completion.</strong> You can complete online payment or verify with the secretariat.
            </div>
          </div>
        `;
      }

      const formattedFee = rec.fee_amount ? `₹ ${parseFloat(rec.fee_amount).toLocaleString()}` : '₹ 750';
      const createdDate = rec.created_at ? new Date(rec.created_at).toLocaleString() : 'Recent';

      card.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
          <div>
            <span class="text-xs uppercase font-mono font-bold text-slate-500 block mb-0.5">Registration Reference</span>
            <div class="flex items-center gap-2">
              <span class="font-mono text-lg sm:text-2xl font-black text-[#071A33]">${escapeHtml(rec.registration_id)}</span>
              <button type="button" class="btn-copy-regid p-1 text-slate-400 hover:text-slate-700 transition-colors" title="Copy ID">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              </button>
            </div>
          </div>
          <div class="self-start sm:self-center">
            ${badgeHtml}
          </div>
        </div>

        ${statusAlertHtml}

        <!-- Participant Details Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm font-sans">
          <div class="p-3 bg-white rounded-xl border border-slate-200/80">
            <span class="text-slate-500 uppercase font-bold text-[11px] block">Delegate Name</span>
            <strong class="text-slate-900 font-bold text-base block mt-0.5">${escapeHtml(rec.title || '')} ${escapeHtml(rec.full_name || '')}</strong>
            <span class="text-slate-600 text-xs block">${escapeHtml(rec.designation || 'Participant')}</span>
          </div>

          <div class="p-3 bg-white rounded-xl border border-slate-200/80">
            <span class="text-slate-500 uppercase font-bold text-[11px] block">Institution / Organization</span>
            <strong class="text-slate-900 font-bold block mt-0.5 break-words">${escapeHtml(rec.organization || 'Rajagiri College')}</strong>
            <span class="text-slate-600 text-xs block">${escapeHtml(rec.discipline || 'Social Work')}</span>
          </div>

          <div class="p-3 bg-white rounded-xl border border-slate-200/80">
            <span class="text-slate-500 uppercase font-bold text-[11px] block">Registration Category & Fee</span>
            <strong class="text-slate-900 font-bold block mt-0.5">${escapeHtml(rec.registration_category || 'UG / PG Student')}</strong>
            <span class="text-[#071A33] font-mono font-black text-sm block">${formattedFee}</span>
          </div>

          <div class="p-3 bg-white rounded-xl border border-slate-200/80">
            <span class="text-slate-500 uppercase font-bold text-[11px] block">Contact Number</span>
            <strong class="text-slate-900 font-mono font-bold block mt-0.5">${escapeHtml(rec.phone || 'N/A')}</strong>
          </div>

          <div class="p-3 bg-white rounded-xl border border-slate-200/80">
            <span class="text-slate-500 uppercase font-bold text-[11px] block">Email Address</span>
            <strong class="text-slate-900 font-mono font-bold block mt-0.5 break-all">${escapeHtml(rec.email || 'N/A')}</strong>
          </div>

          <div class="p-3 bg-white rounded-xl border border-slate-200/80">
            <span class="text-slate-500 uppercase font-bold text-[11px] block">Payment Mode & Ref</span>
            <strong class="text-slate-900 font-bold block mt-0.5">${rec.payment_mode === 'bank_transfer' ? 'Direct Bank Wire (NEFT)' : 'Online Payment Gateway'}</strong>
            <span class="text-slate-600 font-mono text-xs block break-all">Ref: ${escapeHtml(rec.transaction_ref || rec.payment_order_id || 'Pending')}</span>
          </div>

          <div class="p-3 bg-white rounded-xl border border-slate-200/80">
            <span class="text-slate-500 uppercase font-bold text-[11px] block">Food & Accommodation</span>
            <strong class="text-slate-900 font-bold block mt-0.5">Food: ${rec.food_preference === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}</strong>
            <span class="text-slate-600 text-xs block">Accom: ${rec.require_accommodation === 'yes' ? 'Requested' : 'Self-arranged'}</span>
          </div>

          <div class="p-3 bg-white rounded-xl border border-slate-200/80">
            <span class="text-slate-500 uppercase font-bold text-[11px] block">Paper Presentation</span>
            <strong class="text-slate-900 font-bold block mt-0.5">${rec.is_presenting_paper === 'yes' ? 'Author / Presenter' : 'Delegate Participant'}</strong>
          </div>

          <div class="p-3 bg-white rounded-xl border border-slate-200/80">
            <span class="text-slate-500 uppercase font-bold text-[11px] block">Registered On</span>
            <strong class="text-slate-700 font-mono text-xs block mt-0.5">${createdDate}</strong>
          </div>
        </div>

        <!-- Card Action Buttons -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 no-print">
          <div class="flex items-center gap-2">
            ${isSuccess ? `
              <button type="button" class="btn-card-print inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#071A33] text-white font-sans font-bold text-xs sm:text-sm hover:bg-[#0c274c] transition-colors cursor-pointer shadow-sm">
                <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                <span>Print Official Slip</span>
              </button>
            ` : ''}

            ${(!isSuccess && rec.payment_mode === 'online') ? `
              <button type="button" class="btn-card-retry inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 text-slate-950 font-sans font-black text-xs sm:text-sm hover:bg-amber-300 transition-colors cursor-pointer shadow-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Retry Payment</span>
              </button>
            ` : ''}
          </div>

          <button type="button" class="btn-card-clear text-slate-500 hover:text-slate-800 text-xs font-bold underline transition-colors cursor-pointer">
            Search another record
          </button>
        </div>
      `;

      // Copy ID handler
      const copyBtn = card.querySelector('.btn-copy-regid');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(rec.registration_id).then(() => {
            copyBtn.innerHTML = '<span class="text-xs text-emerald-600 font-bold">Copied!</span>';
            setTimeout(() => {
              copyBtn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>';
            }, 2000);
          });
        });
      }

      // Print slip handler
      const printBtn = card.querySelector('.btn-card-print');
      if (printBtn) {
        printBtn.addEventListener('click', () => {
          window.print();
        });
      }

      // Retry payment handler
      const retryBtn = card.querySelector('.btn-card-retry');
      if (retryBtn) {
        retryBtn.addEventListener('click', async () => {
          // LOCK EXISTING REGISTRATION ID: Never generate a new row or new ID on retry!
          window.__DYUTI_RETRY_REG_ID__ = rec.registration_id;
          try {
            sessionStorage.setItem('dyuti_retry_reg_id', rec.registration_id);
            const cleanEmail = (rec.email || '').toLowerCase().replace(/[^a-z0-9]/g, '');
            if (cleanEmail) localStorage.setItem('dyuti_last_pending_id_' + cleanEmail, rec.registration_id);
          } catch(e) {}

          const origBtnHtml = retryBtn.innerHTML;
          retryBtn.disabled = true;
          retryBtn.classList.add('opacity-80', 'cursor-wait');
          retryBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-950 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Connecting to Payment Gateway...</span>
          `;

          const fee = (isTestRegistrationPage || window.__DYUTI_TEST_MODE__ === true) ? 1 : (parseFloat(rec.fee_amount) || 750);

          // 1. Update the existing row in SQL database with payment_status = pending (no duplicate row)
          try {
            if (window.dyutiDispatchApi) {
              await window.dyutiDispatchApi('save_registration.php', {
                ...rec,
                registration_id: rec.registration_id,
                regId: rec.registration_id,
                amount: fee,
                payment_status: 'pending',
                payment_mode: 'online'
              });
            }
          } catch (e) {
            console.warn('Retry pre-save error:', e);
          }

          // 2. Directly request payment order URL for this existing registration
          let paymentUrl = null;
          let paymentError = null;

          const cleanPhone = (rec.phone || '').replace(/\D/g, '');
          const last10Phone = cleanPhone.length >= 10 ? cleanPhone.slice(-10) : (cleanPhone || '9876543210');
          const participantEmail = rec.email || `${last10Phone}@dyuti.in`;

          const orderPayload = {
            registration_id: rec.registration_id,
            reg_id: rec.registration_id,
            order_id: rec.registration_id,
            is_retry: true,
            name: rec.full_name || 'Participant',
            customer_name: rec.full_name || 'Participant',
            email: participantEmail,
            customer_email: participantEmail,
            mobile: last10Phone,
            customer_mobile: last10Phone,
            phone: rec.phone || last10Phone,
            amount: fee,
            currency: 'INR',
            redirect_url: window.location.href.split('?')[0].split('#')[0]
          };

          try {
            if (window.dyutiFetchPaymentUrl) {
              paymentUrl = await window.dyutiFetchPaymentUrl(orderPayload);
            }
          } catch (err) {
            paymentError = err.message || err;
            console.warn('Direct retry gateway fetch notice:', err);
          }

          if (paymentUrl) {
            window.location.href = paymentUrl;
            return;
          }

          // Fallback: Directly submit via invisible form POST to payment endpoint
          try {
            console.log('Using form POST fallback to connect to gateway...');
            submitPaymentFormDirect(orderPayload);
            return;
          } catch (formErr) {
            console.error('Form POST fallback failed:', formErr);
          }

          // Fallback if gateway redirect is blocked: pre-populate form with existing ID locked
          const fieldMap = {
            'reg-title': rec.title,
            'reg-name': rec.full_name,
            'reg-designation': rec.designation,
            'reg-gender': rec.gender,
            'reg-organization': rec.organization,
            'reg-discipline': rec.discipline,
            'reg-address': rec.address,
            'reg-pincode': rec.pincode,
            'reg-phone': rec.phone,
            'reg-email': rec.email
          };

          for (const [id, val] of Object.entries(fieldMap)) {
            const el = document.getElementById(id);
            if (el && val) el.value = val;
          }

          retryBtn.disabled = false;
          retryBtn.classList.remove('opacity-80', 'cursor-wait');
          retryBtn.innerHTML = origBtnHtml;

          switchMode('register');
          const step1 = document.getElementById('reg-step-form');
          if (step1) {
            step1.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }

      // Look up another record
      const clearBtn = card.querySelector('.btn-card-clear');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          if (statusInput) {
            statusInput.value = '';
            statusInput.focus();
          }
          if (statusResultsContainer) statusResultsContainer.innerHTML = '';
        });
      }

      statusResultsContainer.appendChild(card);
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
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

    // Update history location before reinitializing components so window.location is accurate
    if (pushState) {
      window.history.pushState({ path: targetUrl }, '', targetUrl);
    }

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
  initRegistrationStatusTracker();
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

