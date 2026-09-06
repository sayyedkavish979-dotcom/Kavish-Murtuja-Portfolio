/**
 * ==============================================================================
 *  KAVISH MURTUJA - PORTFOLIO INTERACTION LOGIC
 *  Features: Navbar scroll blur, mobile menu, filterable portfolio,
 *            project preview modal, FAQ accordion, form validation,
 *            and dynamic SITE_CONFIG binding.
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all interactive modules
  initSiteConfigSync();
  initNavbarScroll();
  initMobileMenu();
  initPortfolioFilter();
  initProjectModal();
  initFaqAccordion();
  initContactForm();
  initRouter();

  // Phase 3: Premium 3D & Interactive Modules
  initScrollProgress();
  initHero3DParallax();
  initPricing3D();
  initScrollReveal();
  initCustomCursor();
  initButtonMicroInteractions();
});

/**
 * 1. Synchronize All Contact & Social Links from SITE_CONFIG
 */
function initSiteConfigSync() {
  if (typeof SITE_CONFIG === "undefined") return;

  // Sync social links
  document.querySelectorAll('[data-social="whatsapp"]').forEach(el => {
    el.href = SITE_CONFIG.social.whatsapp;
  });

  document.querySelectorAll('[data-social="whatsapp-inquiry"]').forEach(el => {
    el.href = SITE_CONFIG.social.whatsappInquiry;
  });

  document.querySelectorAll('[data-social="instagram"]').forEach(el => {
    el.href = SITE_CONFIG.social.instagram;
  });

  document.querySelectorAll('[data-social="facebook"]').forEach(el => {
    el.href = SITE_CONFIG.social.facebook;
  });

  // Sync phone links
  document.querySelectorAll('[data-contact="phone"]').forEach(el => {
    el.href = SITE_CONFIG.phoneLink;
    if (el.dataset.type === "text") el.textContent = SITE_CONFIG.phone;
  });

  // Sync email links
  document.querySelectorAll('[data-contact="email"]').forEach(el => {
    el.href = SITE_CONFIG.emailLink;
    if (el.dataset.type === "text") el.textContent = SITE_CONFIG.email;
  });
}

/**
 * 2. Sticky Navbar Blur on Scroll
 */
function initNavbarScroll() {
  const navbar = document.getElementById("mainNavbar");
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/**
 * 3. Mobile Hamburger Menu Drawer
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobileToggle");
  const drawer = document.getElementById("mobileDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  const navLinks = document.querySelectorAll(".mobile-nav-link");

  if (!toggleBtn || !drawer || !backdrop) return;

  let lastNavToggleFocus = null;

  const openDrawer = () => {
    lastNavToggleFocus = document.activeElement;
    toggleBtn.classList.add("open");
    drawer.classList.add("open");
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
    toggleBtn.setAttribute("aria-expanded", "true");
    const firstLink = drawer.querySelector(".mobile-nav-link");
    if (firstLink) setTimeout(() => firstLink.focus(), 100);
  };

  const closeDrawer = () => {
    toggleBtn.classList.remove("open");
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
    toggleBtn.setAttribute("aria-expanded", "false");
    if (lastNavToggleFocus && typeof lastNavToggleFocus.focus === "function") {
      lastNavToggleFocus.focus();
    }
  };

  // Expose close drawer method for router
  window.closeMobileDrawer = closeDrawer;

  toggleBtn.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("open");
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  backdrop.addEventListener("click", closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener("click", closeDrawer);
  });

  // Close on ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) {
      closeDrawer();
    }
  });
}

/**
 * 4. Portfolio Filter Tabs
 */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      // Update active button state and ARIA attributes
      filterBtns.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      btn.setAttribute("aria-pressed", "true");

      // Animate card filtering
      projectCards.forEach(card => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(15px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 250);
        }
      });
    });
  });
}

/**
 * 5. Project Details Modal
 */
function initProjectModal() {
  const modal = document.getElementById("projectModal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const closeBtn = document.getElementById("modalCloseBtn");
  const viewButtons = document.querySelectorAll(".view-project-btn");

  if (!modal || !modalBackdrop || !closeBtn) return;

  let lastFocusedElement = null;

  // Elements inside modal
  const modalImg = document.getElementById("modalImg");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalTagline = document.getElementById("modalTagline");
  const modalOverview = document.getElementById("modalOverview");
  const modalDeliverables = document.getElementById("modalDeliverables");
  const modalTechTags = document.getElementById("modalTechTags");
  const modalResults = document.getElementById("modalResults");
  const modalWhatsappBtn = document.getElementById("modalWhatsappBtn");

  const openModal = (projectId) => {
    const project = SITE_CONFIG && SITE_CONFIG.demoProjects ? SITE_CONFIG.demoProjects[projectId] : null;
    if (!project) return;

    lastFocusedElement = document.activeElement;

    modalImg.src = project.image;
    modalImg.alt = `${project.title} - ${project.tagline}`;
    modalCategory.textContent = project.category;
    modalTitle.textContent = project.title;
    modalTagline.textContent = project.tagline;
    modalOverview.textContent = project.overview;

    // Populate Deliverables
    modalDeliverables.innerHTML = "";
    project.deliverables.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
        <span>${item}</span>
      `;
      modalDeliverables.appendChild(li);
    });

    // Populate Tech Stack
    modalTechTags.innerHTML = "";
    project.techStack.forEach(tech => {
      const span = document.createElement("span");
      span.className = "tech-tag";
      span.textContent = tech;
      modalTechTags.appendChild(span);
    });

    // Populate Business Value / Result
    if (modalResults) {
      modalResults.textContent = project.results;
    }

    // Set WhatsApp inquiry button link with pre-filled message
    const inquiryUrl = `https://wa.me/917355568493?text=${encodeURIComponent(project.whatsappText)}`;
    modalWhatsappBtn.href = inquiryUrl;

    // Show modal
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      closeBtn.focus();
    }, 50);
  };

  const closeModal = () => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  };

  viewButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute("data-project-id");
      openModal(projectId);
    });
  });

  closeBtn.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
}

/**
 * 6. FAQ Accordion
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const trigger = item.querySelector(".faq-trigger");
    const content = item.querySelector(".faq-content");

    if (!trigger || !content) return;

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Close all other accordion items for clean UX
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          const otherContent = otherItem.querySelector(".faq-content");
          if (otherContent) otherContent.style.maxHeight = null;
          const otherTrigger = otherItem.querySelector(".faq-trigger");
          if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove("active");
        content.style.maxHeight = null;
        trigger.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/**
 * 7. Modern Contact Form Validation & Submission
 */
function initContactForm() {
  const form = document.getElementById("leadContactForm");
  const successToast = document.getElementById("formToast");
  const errorToast = document.getElementById("formErrorToast");
  const successToastText = document.getElementById("formToastText");
  const errorToastText = document.getElementById("formErrorToastText");
  const sendViaWhatsAppBtn = document.getElementById("sendViaWhatsAppBtn");

  if (!form) return;

  const showToast = (toastEl, duration = 4500) => {
    if (!toastEl) return;
    toastEl.classList.add("show");
    setTimeout(() => {
      toastEl.classList.remove("show");
    }, duration);
  };

  const validateField = (field, condition) => {
    const group = field.closest(".form-group");
    if (!condition) {
      group.classList.add("has-error");
      return false;
    } else {
      group.classList.remove("has-error");
      return true;
    }
  };

  // Real-time error removal on user input
  form.querySelectorAll("input, select, textarea").forEach(input => {
    input.addEventListener("input", () => {
      const group = input.closest(".form-group");
      if (group) group.classList.remove("has-error");
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Anti-spam Honeypot Check
    const botField = form.querySelector('input[name="bot-field"]');
    const honeyField = form.querySelector('input[name="_honey"]');
    if ((botField && botField.value) || (honeyField && honeyField.value)) {
      console.warn("Spam bot detected. Submission ignored.");
      return;
    }

    const name = document.getElementById("clientName");
    const email = document.getElementById("clientEmail");
    const phone = document.getElementById("clientPhone");
    const business = document.getElementById("clientBusiness");
    const service = document.getElementById("clientService");
    const message = document.getElementById("clientMessage");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\s-]{8,15}$/;

    const isNameValid = validateField(name, name.value.trim().length >= 2);
    const isEmailValid = validateField(email, emailRegex.test(email.value.trim()));
    const isPhoneValid = validateField(phone, phoneRegex.test(phone.value.trim()));
    const isServiceValid = validateField(service, service.value.trim() !== "");
    const isMsgValid = validateField(message, message.value.trim().length >= 8);

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isServiceValid || !isMsgValid) {
      // Focus the first invalid field for accessibility
      const firstInvalid = form.querySelector(".form-group.has-error input, .form-group.has-error select, .form-group.has-error textarea");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Prevent accidental duplicate submissions
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending Enquiry...";
    submitBtn.style.opacity = "0.8";

    // Determine deployment environment & service endpoint
    const formConfig = (typeof SITE_CONFIG !== "undefined" && SITE_CONFIG.formConfig) ? SITE_CONFIG.formConfig : {};
    const isNetlifyHost = formConfig.autoDetectNetlify && (window.location.hostname.includes("netlify.app") || window.location.hostname.includes("netlify.com"));

    try {
      let isSuccess = false;
      let responseMessage = "";

      if (isNetlifyHost) {
        // Submit via native Netlify Forms
        const formData = new FormData(form);
        formData.set("form-name", "contact");
        const res = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString()
        });
        isSuccess = res.ok;
      } else {
        // Submit via secure FormSubmit AJAX (direct email dispatch to website owner)
        const endpoint = formConfig.formSubmitUrl || "https://formsubmit.co/ajax/sayyedkavish979@gmail.com";
        const payload = {
          name: name.value.trim(),
          email: email.value.trim(),
          phone: phone.value.trim(),
          business: (business && business.value.trim()) ? business.value.trim() : "Not provided",
          service: service.value,
          message: message.value.trim(),
          _subject: formConfig.emailSubject || `New Website Enquiry: ${service.value} — ${name.value.trim()}`,
          _template: "table",
          _captcha: "false"
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000); // 12-second network timeout

        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        const data = await res.json().catch(() => ({}));
        isSuccess = res.ok && (data.success === "true" || data.success === true || (data.message && data.message.includes("Activation")));
        responseMessage = data.message || "";
      }

      if (isSuccess) {
        submitBtn.innerHTML = "Enquiry Sent Successfully ✓";
        submitBtn.style.background = "#10b981";
        submitBtn.style.opacity = "1";

        if (responseMessage.includes("Activation")) {
          if (successToastText) {
            successToastText.textContent = "Enquiry received! (Check sayyedkavish979@gmail.com to confirm form activation).";
          }
        } else {
          if (successToastText) {
            successToastText.textContent = "Thank you! Your enquiry has been received. Kavish will respond within 24 hours.";
          }
        }

        showToast(successToast, 5000);
        form.reset();

        // Restore button state after delay
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = "";
          submitBtn.style.opacity = "1";
          submitBtn.disabled = false;
        }, 4000);
      } else {
        throw new Error(responseMessage || "Submission failed");
      }

    } catch (error) {
      console.error("Enquiry submission error:", error);
      submitBtn.innerHTML = "Failed to Send — Please Try Again";
      submitBtn.style.background = "#ef4444";
      submitBtn.style.opacity = "1";

      if (errorToastText) {
        errorToastText.textContent = "Could not send enquiry. Please try again or reach out on WhatsApp (+91 7355568493).";
      }
      showToast(errorToast, 5000);

      // Re-enable button after 3 seconds so user can retry
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = "";
        submitBtn.style.opacity = "1";
        submitBtn.disabled = false;
      }, 3000);
    }
  });

  // Alternative: Send Form Data Directly to WhatsApp
  if (sendViaWhatsAppBtn) {
    sendViaWhatsAppBtn.addEventListener("click", () => {
      const name = document.getElementById("clientName").value.trim() || "Prospective Client";
      const phone = document.getElementById("clientPhone").value.trim() || "Not provided";
      const service = document.getElementById("clientService").value || "General Website Project";
      const message = document.getElementById("clientMessage").value.trim() || "I would like to discuss a new website.";

      const text = `Hello Kavish,\n\nName: ${name}\nPhone: ${phone}\nWebsite Requirement: ${service}\nMessage: ${message}`;
      const url = `https://wa.me/917355568493?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");
    });
  }
}

/**
 * 8. Professional Multi-Page Client-Side Router
 *    Features: Separate page views, history API (pushState/popstate),
 *              active nav highlighting, refresh-to-home redirect,
 *              and automatic drawer close.
 */
function initRouter() {
  const VALID_PAGES = [
    'home',
    'about',
    'services',
    'portfolio',
    'process',
    'testimonials',
    'pricing',
    'faq',
    'contact'
  ];

  const PAGE_TITLES = {
    home: 'Kavish Murtuja — Freelance Website Designer & Developer in Kanpur, India',
    about: 'About Kavish Murtuja — Freelance Website Designer & Developer',
    services: 'Website Design & Development Services — Kavish Murtuja',
    portfolio: 'Portfolio & Live Website Projects — Kavish Murtuja',
    process: '5-Step Work Process & Modern Tech Stack — Kavish Murtuja',
    testimonials: 'What Clients Can Expect — Kavish Murtuja',
    pricing: 'Transparent Pricing Packages — Kavish Murtuja',
    faq: 'Frequently Asked Questions — Kavish Murtuja',
    contact: 'Contact Kavish Murtuja — Start Your Website Project'
  };

  function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/Kavish-Murtuja-Portfolio')) {
      return '/Kavish-Murtuja-Portfolio';
    }
    return '';
  }

  function getPageUrl(page) {
    const base = getBasePath();
    if (page === 'home') {
      return base ? base + '/' : '/';
    }
    return base ? `${base}/${page}` : `/${page}`;
  }

  function isPageReload() {
    try {
      const navEntries = performance.getEntriesByType('navigation');
      if (navEntries.length > 0) {
        return navEntries[0].type === 'reload';
      }
      if (window.performance && window.performance.navigation) {
        return window.performance.navigation.type === 1;
      }
    } catch (e) {
      // ignore
    }
    return false;
  }

  function getPageFromLocation() {
    const base = getBasePath();
    let relPath = window.location.pathname;
    if (base && relPath.startsWith(base)) {
      relPath = relPath.substring(base.length);
    }
    relPath = relPath.replace(/^\/+|\/+$/g, '');
    if (!relPath || relPath === 'index.html') {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && VALID_PAGES.includes(hash)) {
        return hash;
      }
      return 'home';
    }
    if (VALID_PAGES.includes(relPath)) {
      return relPath;
    }
    return 'home';
  }

  function activatePage(pageName, pushToHistory = true) {
    if (!VALID_PAGES.includes(pageName)) {
      pageName = 'home';
    }

    // 1. Hide all page-views, activate targeted view
    const pageViews = document.querySelectorAll('.page-view');
    pageViews.forEach(view => {
      const viewPage = view.getAttribute('data-page');
      if (viewPage === pageName) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // 2. Set body attribute for navbar & background styling
    document.body.setAttribute('data-active-page', pageName);

    // 3. Update nav links active state (both desktop and mobile)
    document.querySelectorAll('[data-nav-page]').forEach(link => {
      const linkPage = link.getAttribute('data-nav-page');
      if (link.classList.contains('nav-link') || link.classList.contains('mobile-nav-link')) {
        if (linkPage === pageName) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        } else {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        }
      }
    });

    // 4. Update document title
    if (PAGE_TITLES[pageName]) {
      document.title = PAGE_TITLES[pageName];
    }

    // 5. Update browser history if requested
    if (pushToHistory) {
      const targetUrl = getPageUrl(pageName);
      if (window.location.pathname !== targetUrl) {
        window.history.pushState({ page: pageName }, '', targetUrl);
      }
    }

    // 6. Reset scroll position to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // 7. Auto-close mobile drawer if open
    if (typeof window.closeMobileDrawer === 'function') {
      window.closeMobileDrawer();
    }
  }

  // Global navigation method
  window.navigateTo = (page) => activatePage(page, true);

  // Handle Browser Back & Forward buttons
  window.addEventListener('popstate', (e) => {
    const page = (e.state && e.state.page) || getPageFromLocation();
    activatePage(page, false);
  });

  // Global link interception for routing
  document.addEventListener('click', (e) => {
    const navLink = e.target.closest('[data-nav-page]');
    if (!navLink) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey || e.which === 2) return;

    const targetPage = navLink.getAttribute('data-nav-page');
    if (VALID_PAGES.includes(targetPage)) {
      e.preventDefault();
      activatePage(targetPage, true);
    }
  });

  // CRITICAL REQUIREMENT: Refresh on ANY page MUST return to Home (/)
  const isReload = isPageReload();
  const currentPage = getPageFromLocation();

  if (isReload) {
    // If refreshed on any page, redirect immediately to Home (/)
    const base = getBasePath();
    const homeUrl = base ? base + '/' : '/';
    window.history.replaceState({ page: 'home' }, '', homeUrl);
    activatePage('home', false);
  } else {
    // Initial normal page load: Home is always the main landing page
    if (currentPage !== 'home') {
      activatePage(currentPage, false);
    } else {
      activatePage('home', false);
    }
  }
}


/* ==============================================================================
   PHASE 3: PREMIUM 3D & INTERACTION MODULES
   ============================================================================== */

/**
 * 9. Top Minimal Scroll Progress Indicator
 */
function initScrollProgress() {
  const bar = document.getElementById("scrollProgressBar");
  if (!bar) return;

  let ticking = false;
  const updateProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) {
      bar.style.width = "0%";
    } else {
      const progress = Math.min(Math.max((window.scrollY / totalHeight) * 100, 0), 100);
      bar.style.width = `${progress.toFixed(1)}%`;
    }
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });

  updateProgress();
}

/**
 * 10. Hero 3D Perspective Device & Mouse Parallax (Optimized & Battery-Friendly)
 *     Features: Inertial damping, viewport-aware IntersectionObserver pausing,
 *     and idle rAF loop cancellation when at rest.
 */
function initHero3DParallax() {
  const stage = document.getElementById("hero3DStage");
  const card = document.getElementById("hero3DCard");
  if (!stage || !card) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDesktop = window.matchMedia("(pointer: fine) and (min-width: 992px)").matches;
  if (prefersReduced || !isDesktop) return;

  let targetRotX = 0;
  let targetRotY = 0;
  let targetTransX = 0;
  let targetTransY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let currentTransX = 0;
  let currentTransY = 0;
  let isHovered = false;
  let isIntersecting = true;
  let rafId = null;

  const heroSection = document.getElementById("home") || stage.closest(".hero-section");
  const chips = card.querySelectorAll(".floating-chip");

  const startLoop = () => {
    if (!rafId && isIntersecting) {
      rafId = requestAnimationFrame(updateLoop);
    }
  };

  const stopLoop = () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  const onMouseMove = (e) => {
    const rect = stage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalized mouse offsets (-1 to 1)
    const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth / 2)));
    const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight / 2)));

    // Subtle tilt boundaries: max 6deg X, 8deg Y, 10px translate
    targetRotX = -normY * 6;
    targetRotY = normX * 8;
    targetTransX = normX * 10;
    targetTransY = normY * 6;
    isHovered = true;
    startLoop();
  };

  const onMouseLeave = () => {
    targetRotX = 0;
    targetRotY = 0;
    targetTransX = 0;
    targetTransY = 0;
    isHovered = false;
    startLoop();
  };

  const updateLoop = () => {
    // Smooth lerp damping factor 0.08
    currentRotX += (targetRotX - currentRotX) * 0.08;
    currentRotY += (targetRotY - currentRotY) * 0.08;
    currentTransX += (targetTransX - currentTransX) * 0.08;
    currentTransY += (targetTransY - currentTransY) * 0.08;

    card.style.transform = `translate3d(${currentTransX.toFixed(2)}px, ${currentTransY.toFixed(2)}px, 0) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;

    // Differential depth for floating chips
    chips.forEach(chip => {
      const depth = parseFloat(chip.dataset.parallaxDepth || "25");
      const chipX = (currentRotY * (depth / 16)).toFixed(1);
      const chipY = (-currentRotX * (depth / 16)).toFixed(1);
      chip.style.transform = `translate3d(${chipX}px, ${chipY}px, ${depth}px)`;
    });

    // Check if motion has settled to rest
    const diff = Math.abs(targetRotX - currentRotX) +
                 Math.abs(targetRotY - currentRotY) +
                 Math.abs(targetTransX - currentTransX) +
                 Math.abs(targetTransY - currentTransY);

    if (!isHovered && diff < 0.01) {
      // Snap cleanly to rest and terminate rAF loop (0% idle resource waste)
      currentRotX = 0;
      currentRotY = 0;
      currentTransX = 0;
      currentTransY = 0;
      card.style.transform = "";
      chips.forEach(chip => {
        const depth = parseFloat(chip.dataset.parallaxDepth || "25");
        chip.style.transform = `translateZ(${depth}px)`;
      });
      rafId = null;
      return;
    }

    rafId = requestAnimationFrame(updateLoop);
  };

  // Pause loop when Hero section is out of viewport
  if ("IntersectionObserver" in window && heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isIntersecting = entry.isIntersecting;
        if (!isIntersecting) {
          stopLoop();
        } else if (isHovered) {
          startLoop();
        }
      });
    }, { threshold: 0.05 });
    observer.observe(heroSection);
  }

  if (heroSection) {
    heroSection.addEventListener("mousemove", onMouseMove, { passive: true });
    heroSection.addEventListener("mouseleave", onMouseLeave, { passive: true });
  }
}

/**
 * 11. Staggered Scroll Reveal Animations via IntersectionObserver
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  if (!revealElements.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    revealElements.forEach(el => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: "0px 0px -40px 0px",
    threshold: 0.1
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * 12. Desktop Custom Cursor Interaction
 */
function initCustomCursor() {
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  const text = document.getElementById("cursorText");
  if (!dot || !ring) return;

  const isTouch = ("ontouchstart" in window) || navigator.maxTouchPoints > 0;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDesktop = window.matchMedia("(pointer: fine) and (min-width: 992px)").matches;

  if (isTouch || prefersReduced || !isDesktop) {
    dot.style.display = "none";
    ring.style.display = "none";
    return;
  }

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isVisible = false;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      document.body.classList.add("custom-cursor-active");
      ringX = mouseX;
      ringY = mouseY;
      isVisible = true;
    }

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  }, { passive: true });

  const renderRing = () => {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.left = `${ringX.toFixed(1)}px`;
    ring.style.top = `${ringY.toFixed(1)}px`;
    requestAnimationFrame(renderRing);
  };
  requestAnimationFrame(renderRing);

  // Hover states on interactive elements
  const interactiveSelector = 'a, button, [role="button"], input, textarea, select, .filter-btn, .social-icon-btn, .faq-trigger, .why-card';
  document.addEventListener("mouseover", (e) => {
    const projectCard = e.target.closest(".project-card");
    if (projectCard) {
      ring.classList.add("is-view-hover");
      if (text) text.textContent = "View";
      return;
    }

    const interactive = e.target.closest(interactiveSelector);
    if (interactive) {
      ring.classList.add("is-hovering");
    }
  });

  document.addEventListener("mouseout", (e) => {
    const projectCard = e.target.closest(".project-card");
    if (projectCard) {
      ring.classList.remove("is-view-hover");
      if (text) text.textContent = "";
    }

    const interactive = e.target.closest(interactiveSelector);
    if (interactive) {
      ring.classList.remove("is-hovering");
    }
  });

  document.addEventListener("mouseleave", () => {
    document.body.classList.remove("custom-cursor-active");
    isVisible = false;
  });
}

/**
 * 13. Button Micro-Interactions & Accessible Press Feedback
 */
function initButtonMicroInteractions() {
  // Enhanced smooth in-page navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;

      const activePage = document.querySelector('.page-view.active');
      const targetElement = activePage ? activePage.querySelector(`#${targetId}`) : document.getElementById(targetId);

      if (targetElement) {
        const navHeight = document.getElementById("mainNavbar")?.offsetHeight || 72;
        const targetPos = targetElement.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
}

/**
 * 14. Pricing Cards 3D Interactive Parallax & Dynamic Ambient Glare
 *     Harmonizes Starter, Professional, and Premium cards with identical
 *     subtle mouse tilt, depth elevation, and responsive safety.
 */
function initPricing3D() {
  const pricingCards = document.querySelectorAll(".pricing-card");
  if (!pricingCards.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDesktop = window.matchMedia("(pointer: fine) and (min-width: 992px)").matches;
  if (prefersReduced || !isDesktop) return;

  const pricingSection = document.getElementById("pricing") || document.querySelector(".pricing-section");
  let isIntersecting = true;

  // Viewport intersection observer: suspend updates when pricing section is off-screen
  if ("IntersectionObserver" in window && pricingSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isIntersecting = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(pricingSection);
  }

  pricingCards.forEach(card => {
    let ticking = false;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let mousePctX = 50;
    let mousePctY = 50;

    const applyTransform = () => {
      card.style.setProperty("--tilt-x", `${targetTiltX.toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${targetTiltY.toFixed(2)}deg`);
      card.style.setProperty("--elevate-z", "10px");
      card.style.setProperty("--mouse-x", `${mousePctX.toFixed(1)}%`);
      card.style.setProperty("--mouse-y", `${mousePctY.toFixed(1)}%`);
      card.style.setProperty("--glare-opacity", "1");
      ticking = false;
    };

    card.addEventListener("mousemove", (e) => {
      if (!isIntersecting) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Normalized coordinates (-1 to 1)
      const normX = Math.max(-1, Math.min(1, (x / rect.width - 0.5) * 2));
      const normY = Math.max(-1, Math.min(1, (y / rect.height - 0.5) * 2));

      // Subtle, controlled tilt boundaries: max 4.5 deg
      targetTiltX = -normY * 4.5;
      targetTiltY = normX * 4.5;

      mousePctX = (x / rect.width) * 100;
      mousePctY = (y / rect.height) * 100;

      if (!ticking) {
        requestAnimationFrame(applyTransform);
        ticking = true;
      }
    }, { passive: true });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--elevate-z", "0px");
      card.style.setProperty("--glare-opacity", "0");
      ticking = false;
    });
  });
}
