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
