/**
 * ==============================================================================
 *  BIRTHDAY SURPRISE — INTERACTION ENGINE
 *  Concept Demo by Kavish Murtuja | Web Designer & Developer
 *  Features:
 *  - Elegant opening surprise curtain (No skip button)
 *  - 60fps Zero-dependency HTML5 Canvas Confetti Engine
 *  - Live customizable countdown with graceful past-date celebration
 *  - Interactive birthday cake with candle blow & "Make a Wish ✨"
 *  - Memory gallery lightbox preview modal
 *  - Dynamic config binding & verified WhatsApp lead generation
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initBirthdayContent();
  initOpeningExperience();
  initConfettiEngine();
  initBirthdayCountdown();
  initInteractiveCake();
  initMemoryLightbox();
  initSmoothScrollLinks();
  initContactPanel();
});

/**
 * 1. Synchronize All Dynamic Content from BIRTHDAY_CONFIG
 */
function initBirthdayContent() {
  if (typeof BIRTHDAY_CONFIG === "undefined") return;

  const cfg = BIRTHDAY_CONFIG;

  // Bind Recipient Name
  const nameEls = document.querySelectorAll(".dyn-recipient-name");
  nameEls.forEach(el => {
    el.textContent = cfg.recipient.name || "Alex";
  });

  const relationEls = document.querySelectorAll(".dyn-recipient-relation");
  relationEls.forEach(el => {
    el.textContent = cfg.recipient.relation || "Someone Special";
  });

  // Bind Personal Message
  const msgEl = document.getElementById("dynPersonalMessage");
  if (msgEl && cfg.personalMessage && cfg.personalMessage.text) {
    msgEl.textContent = `"${cfg.personalMessage.text}"`;
  }

  const senderEl = document.getElementById("dynMessageSender");
  if (senderEl && cfg.personalMessage && cfg.personalMessage.sender) {
    senderEl.textContent = `— ${cfg.personalMessage.sender}`;
  }

  // Bind Target Date Display in Countdown
  const targetDateEl = document.getElementById("dynTargetDateDisplay");
  if (targetDateEl && cfg.targetDate) {
    try {
      const d = new Date(cfg.targetDate);
      const opts = { month: "long", day: "numeric", year: "numeric" };
      targetDateEl.textContent = d.toLocaleDateString("en-US", opts);
    } catch (e) {
      targetDateEl.textContent = cfg.targetDate;
    }
  }

  // Bind WhatsApp Business & Lead Generation CTAs
  if (cfg.creatorCTA) {
    const rawPhone = cfg.creatorCTA.whatsappNumber || "917355568493";
    const fullPhone = rawPhone.startsWith("91") ? rawPhone : ("91" + rawPhone);
    const msg = cfg.creatorCTA.whatsappMessage || "Hi Kavish, I’m interested in getting a custom Birthday website like your demo. I’d like to discuss my requirements, available packages, and pricing.";
    const waUrl = `https://wa.me/${fullPhone}?text=${encodeURIComponent(msg)}`;

    // Floating WhatsApp button
    const floatingWa = document.getElementById("bdayFloatingWhatsapp");
    if (floatingWa) floatingWa.href = waUrl;

    // Contact modal WhatsApp option
    const modalWa = document.getElementById("birthday-whatsapp-cta");
    if (modalWa) modalWa.href = waUrl;

    // Contact modal Email option
    const modalEmail = document.getElementById("birthday-email-cta");
    if (modalEmail) {
      const email = cfg.creatorCTA.email || "kavishwebsitedesigner@gmail.com";
      const subject = cfg.creatorCTA.emailSubject || "Birthday Website Enquiry";
      modalEmail.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    }

    // Contact modal Call option
    const modalCall = document.getElementById("birthday-call-cta");
    if (modalCall) {
      const phone = cfg.creatorCTA.phoneLink || "tel:+917355568493";
      modalCall.href = phone;
    }
  }
}

/**
 * 2. Opening Surprise Experience
 */
function initOpeningExperience() {
  const overlay = document.getElementById("bdayOpeningOverlay");
  const openBtn = document.getElementById("btnOpenSurprise");

  if (!overlay || !openBtn) return;

  openBtn.addEventListener("click", () => {
    // 1. Smoothly dissolve opening curtain
    overlay.classList.add("is-opened");
    setTimeout(() => {
      overlay.style.display = "none";
    }, 800);

    // 2. Launch celebratory confetti burst
    if (window.fireConfettiBurst) {
      window.fireConfettiBurst({
        particleCount: 120,
        spread: 100,
        originY: 0.6
      });

      // Second wave of sparkles
      setTimeout(() => {
        window.fireConfettiBurst({
          particleCount: 80,
          spread: 80,
          originY: 0.5
        });
      }, 400);
    }

    // 3. Scroll to celebration hero cleanly
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/**
 * 3. High-Performance HTML5 Canvas Confetti Engine (Zero Dependencies)
 */
function initConfettiEngine() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    window.fireConfettiBurst = () => {};
    return;
  }

  let particles = [];
  let isRunning = false;

  const COLORS = [
    "#f43f5e", // Rose
    "#fb7185", // Soft Rose
    "#f59e0b", // Amber Gold
    "#fbbf24", // Bright Gold
    "#8b5cf6", // Amethyst
    "#c4b5fd", // Light Lavender
    "#06b6d4", // Sky Cyan
    "#ffffff"  // Pure White
  ];

  class ConfettiParticle {
    constructor(x, y, vx, vy) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.size = Math.random() * 8 + 6;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 12;
      this.gravity = 0.35 + Math.random() * 0.15;
      this.drag = 0.985;
      this.opacity = 1;
      this.shape = Math.random() > 0.4 ? "rect" : "circle";
    }

    update() {
      this.vx *= this.drag;
      this.vy *= this.drag;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      if (this.y > height * 0.6) {
        this.opacity -= 0.018;
      }
    }

    draw(ctx) {
      if (this.opacity <= 0) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.fillStyle = this.color;

      if (this.shape === "rect") {
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function renderLoop() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw(ctx);

      if (p.opacity <= 0 || p.y > height + 20) {
        particles.splice(i, 1);
      }
    }

    if (particles.length > 0) {
      requestAnimationFrame(renderLoop);
    } else {
      isRunning = false;
      ctx.clearRect(0, 0, width, height);
    }
  }

  window.fireConfettiBurst = ({ particleCount = 100, spread = 90, originY = 0.5 } = {}) => {
    const originX = width / 2;
    const originYPx = height * originY;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI / 180) * (-90 + (Math.random() - 0.5) * spread);
      const speed = Math.random() * 16 + 8;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      particles.push(new ConfettiParticle(originX, originYPx, vx, vy));
    }

    if (!isRunning) {
      isRunning = true;
      requestAnimationFrame(renderLoop);
    }
  };
}

/**
 * 4. Live Customizable Countdown Timer
 */
function initBirthdayCountdown() {
  const daysEl = document.getElementById("timerDays");
  const hoursEl = document.getElementById("timerHours");
  const minutesEl = document.getElementById("timerMinutes");
  const secondsEl = document.getElementById("timerSeconds");
  const timerGrid = document.getElementById("bdayTimerGrid");
  const celebrationState = document.getElementById("bdayCelebrationState");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const rawTarget = (typeof BIRTHDAY_CONFIG !== "undefined" && BIRTHDAY_CONFIG.targetDate)
    ? BIRTHDAY_CONFIG.targetDate
    : null;

  let targetTime;
  if (rawTarget) {
    targetTime = new Date(rawTarget).getTime();
  } else {
    // Default fallback: 10 days ahead
    targetTime = Date.now() + 10 * 24 * 60 * 60 * 1000;
  }

  function updateTimer() {
    const now = Date.now();
    const diff = targetTime - now;

    if (diff <= 0) {
      // Handled gracefully: Display celebration message rather than negative numbers
      if (timerGrid) timerGrid.style.display = "none";
      if (celebrationState) celebrationState.classList.add("is-active");
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/**
 * 5. Interactive Birthday Cake & Make a Wish
 */
function initInteractiveCake() {
  const cakeStage = document.getElementById("bdayCakeStage");
  const wishBtn = document.getElementById("btnMakeWish");
  const successToast = document.getElementById("bdayWishSuccessToast");

  if (!cakeStage || !wishBtn) return;

  let isBlown = false;

  wishBtn.addEventListener("click", () => {
    if (!isBlown) {
      // 1. Blow out candle
      isBlown = true;
      cakeStage.classList.add("candle-blown");

      // 2. Trigger festive wish celebration confetti burst
      if (window.fireConfettiBurst) {
        window.fireConfettiBurst({
          particleCount: 140,
          spread: 120,
          originY: 0.65
        });
      }

      // 3. Show celebratory toast
      if (successToast) {
        successToast.classList.add("is-visible");
      }

      // 4. Update button text to relight
      const relightText = (typeof BIRTHDAY_CONFIG !== "undefined" && BIRTHDAY_CONFIG.cake && BIRTHDAY_CONFIG.cake.relightButtonText)
        ? BIRTHDAY_CONFIG.cake.relightButtonText
        : "Relight Candle 🕯️";
      wishBtn.innerHTML = `<span>${relightText}</span>`;
    } else {
      // Relight candle
      isBlown = false;
      cakeStage.classList.remove("candle-blown");
      if (successToast) {
        successToast.classList.remove("is-visible");
      }

      const blowText = (typeof BIRTHDAY_CONFIG !== "undefined" && BIRTHDAY_CONFIG.cake && BIRTHDAY_CONFIG.cake.blowButtonText)
        ? BIRTHDAY_CONFIG.cake.blowButtonText
        : "Make a Wish ✨";
      wishBtn.innerHTML = `<span>${blowText}</span>`;
    }
  });
}

/**
 * 6. Memory Photo Gallery Lightbox Modal
 */
function initMemoryLightbox() {
  const modal = document.getElementById("bdayMemoryModal");
  const closeBtn = document.getElementById("btnBdayModalClose");
  const modalGraphic = document.getElementById("bdayModalGraphic");
  const modalDate = document.getElementById("bdayModalDate");
  const modalTitle = document.getElementById("bdayModalTitle");
  const modalDesc = document.getElementById("bdayModalDesc");

  if (!modal) return;

  const openModal = (card) => {
    const title = card.getAttribute("data-title") || "";
    const date = card.getAttribute("data-date") || "";
    const caption = card.getAttribute("data-caption") || "";
    const icon = card.getAttribute("data-icon") || "✨";
    const gradient = card.getAttribute("data-gradient") || "linear-gradient(135deg, #f43f5e, #8b5cf6)";

    if (modalTitle) modalTitle.textContent = title;
    if (modalDate) modalDate.textContent = date;
    if (modalDesc) modalDesc.textContent = caption;
    if (modalGraphic) {
      modalGraphic.style.background = gradient;
      modalGraphic.innerHTML = `<span>${icon}</span>`;
    }

    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  // Attach card click handlers
  document.querySelectorAll(".bday-memory-card").forEach(card => {
    card.addEventListener("click", () => openModal(card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // Close on backdrop click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

/**
 * 7. Smooth Scroll Helper for Quick Nav Links
 */
function initSmoothScrollLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").slice(1);
      if (!targetId) return;

      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        const topOffset = targetEl.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: topOffset, behavior: "smooth" });
      }
    });
  });
}

/**
 * 8. Quick Contact Action Panel Modal
 */
function initContactPanel() {
  const modal = document.getElementById("bdayContactModal");
  const backdrop = document.getElementById("bdayContactBackdrop");
  const closeBtn = document.getElementById("btnBdayCloseContact");
  const triggers = document.querySelectorAll('[data-open-contact="true"], .btn-open-contact');

  if (!modal) return;

  const openContact = (e) => {
    if (e) e.preventDefault();
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  };

  const closeContact = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  triggers.forEach(btn => {
    btn.addEventListener("click", openContact);
  });

  if (closeBtn) closeBtn.addEventListener("click", closeContact);
  if (backdrop) backdrop.addEventListener("click", closeContact);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeContact();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeContact();
    }
  });
}
