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
  initSmoothScroll();
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
  const toast = document.getElementById("formToast");
  const sendViaWhatsAppBtn = document.getElementById("sendViaWhatsAppBtn");

  if (!form) return;

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

  // Real-time error removal
  form.querySelectorAll("input, select, textarea").forEach(input => {
    input.addEventListener("input", () => {
      const group = input.closest(".form-group");
      if (group) group.classList.remove("has-error");
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("clientName");
    const email = document.getElementById("clientEmail");
    const phone = document.getElementById("clientPhone");
    const service = document.getElementById("clientService");
    const message = document.getElementById("clientMessage");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\s-]{8,15}$/;

    const isNameValid = validateField(name, name.value.trim().length >= 2);
    const isEmailValid = validateField(email, emailRegex.test(email.value.trim()));
    const isPhoneValid = validateField(phone, phoneRegex.test(phone.value.trim()));
    const isServiceValid = validateField(service, service.value.trim() !== "");
    const isMsgValid = validateField(message, message.value.trim().length >= 8);

    if (isNameValid && isEmailValid && isPhoneValid && isServiceValid && isMsgValid) {
      // Simulate form submission / Ready for Formspree endpoint
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = "Sending Inquiry...";
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = "Inquiry Sent Successfully ✓";
        submitBtn.style.background = "#10b981";

        // Show toast notification
        if (toast) {
          toast.classList.add("show");
          setTimeout(() => {
            toast.classList.remove("show");
          }, 4500);
        }

        // Reset form after delay
        setTimeout(() => {
          form.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = "";
          submitBtn.disabled = false;
        }, 3000);
      }, 900);
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
 * 8. Smooth Scrolling for Internal Links & Active Section Spy
 */
function initSmoothScroll() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}
