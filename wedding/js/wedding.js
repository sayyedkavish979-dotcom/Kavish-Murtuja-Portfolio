/**
 * ==============================================================================
 * WEDDING EXPERIENCE DEMO — CONTROLLER & INTERACTIONS
 * Concept Demo by Kavish Murtuja | Web Designer & Developer
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const cfg = typeof WEDDING_CONFIG !== "undefined" ? WEDDING_CONFIG : null;
  if (!cfg) {
    console.warn("WEDDING_CONFIG not loaded, using fallback bindings.");
    return;
  }

  // Initialize all interactive modules
  bindDynamicContent(cfg);
  initOpeningExperience();
  initConfettiEngine();
  initLiveCountdown(cfg.targetDate);
  initGalleryLightbox(cfg.gallery);
  initBlessingsInteraction();
  initRsvpDemoHandler(cfg);
  initSmoothScrollLinks();
  initContactPanel();
});

/**
 * 1. Bind Dynamic Content from WEDDING_CONFIG
 */
function bindDynamicContent(cfg) {
  // Couple Names
  const coupleText = `${cfg.couple.groom} & ${cfg.couple.bride}`;
  document.querySelectorAll(".dyn-couple-names").forEach(el => {
    el.textContent = coupleText;
  });

  document.querySelectorAll(".dyn-groom-name").forEach(el => {
    el.textContent = cfg.couple.groom;
  });

  document.querySelectorAll(".dyn-bride-name").forEach(el => {
    el.textContent = cfg.couple.bride;
  });

  // Taglines & Dates
  const taglineEl = document.getElementById("dynHeroTagline");
  if (taglineEl) taglineEl.textContent = cfg.couple.tagline;

  const dateBadgeEl = document.getElementById("dynHeroDateBadge");
  if (dateBadgeEl) {
    dateBadgeEl.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> ${cfg.couple.weddingDateText}`;
  }

  const targetDateDisplay = document.getElementById("dynTargetDateDisplay");
  if (targetDateDisplay) {
    targetDateDisplay.textContent = cfg.couple.weddingDateText;
  }

  // Render "Our Story" Chapters
  const storyGrid = document.getElementById("wedStoryGrid");
  if (storyGrid && cfg.story) {
    storyGrid.innerHTML = cfg.story.map(item => `
      <article class="wed-story-card">
        <div class="wed-story-meta">
          <span class="wed-story-step">${item.step}</span>
          <span class="wed-story-date">${item.date}</span>
        </div>
        <h3 class="wed-story-title">${item.title}</h3>
        <p class="wed-story-excerpt">${item.excerpt}</p>
        <div class="wed-story-highlight">${item.highlight}</div>
      </article>
    `).join("");
  }

  // Render "Wedding Celebrations" Events
  const eventsGrid = document.getElementById("wedEventsGrid");
  if (eventsGrid && cfg.events) {
    eventsGrid.innerHTML = cfg.events.map(ev => `
      <article class="wed-event-card">
        <div class="wed-event-header">
          <div class="wed-event-icon-badge">${ev.icon}</div>
          <span class="wed-event-tag">${ev.badge}</span>
        </div>
        <h3 class="wed-event-name">${ev.name}</h3>
        <ul class="wed-event-details-list">
          <li class="wed-event-detail-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span><strong>Date:</strong> ${ev.dateText}</span>
          </li>
          <li class="wed-event-detail-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span><strong>Time:</strong> ${ev.timeText}</span>
          </li>
          <li class="wed-event-detail-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span><strong>Venue:</strong> ${ev.venueName}</span>
          </li>
        </ul>
        <p class="wed-event-desc">${ev.description}</p>
        <div class="wed-event-dress-code">
          <span>👔 <strong>Dress Code:</strong> ${ev.dressCode}</span>
        </div>
      </article>
    `).join("");
  }

  // Render Venue Details
  if (cfg.venue) {
    const vNameEl = document.getElementById("dynVenueName");
    if (vNameEl) vNameEl.textContent = cfg.venue.name;

    const vCityEl = document.getElementById("dynVenueCity");
    if (vCityEl) vCityEl.textContent = cfg.venue.city;

    const vAddressEl = document.getElementById("dynVenueAddress");
    if (vAddressEl) vAddressEl.textContent = cfg.venue.fullAddress;

    const vTaglineEl = document.getElementById("dynVenueTagline");
    if (vTaglineEl) vTaglineEl.textContent = `"${cfg.venue.tagline}"`;

    const vAirportEl = document.getElementById("dynVenueAirport");
    if (vAirportEl) vAirportEl.textContent = cfg.venue.airportDistance;

    const vRailEl = document.getElementById("dynVenueRailway");
    if (vRailEl) vRailEl.textContent = cfg.venue.railwayDistance;

    const vValetEl = document.getElementById("dynVenueValet");
    if (vValetEl) vValetEl.textContent = cfg.venue.valetAvailable;

    const vMapBtn = document.getElementById("btnViewVenueLocation");
    if (vMapBtn) vMapBtn.href = cfg.venue.mapPlaceholderUrl;
  }

  // Render Photo Gallery
  const galleryGrid = document.getElementById("wedGalleryGrid");
  if (galleryGrid && cfg.gallery) {
    const artIcons = ["✨", "☕", "🏔️", "💍", "🌸", "🌙"];
    galleryGrid.innerHTML = cfg.gallery.map((photo, idx) => `
      <article class="wed-gallery-card" data-gallery-id="${photo.id}">
        <div class="wed-gallery-media-wrap">
          <div class="wed-gallery-art">${artIcons[idx % artIcons.length]}</div>
          <span class="wed-gallery-tag">${photo.tag}</span>
        </div>
        <div class="wed-gallery-info">
          <span class="wed-gallery-date">${photo.date}</span>
          <h3 class="wed-gallery-card-title">${photo.title}</h3>
          <p class="wed-gallery-card-caption">${photo.caption}</p>
          <span class="wed-gallery-view-hint">Click to enlarge &rarr;</span>
        </div>
      </article>
    `).join("");
  }

  // Render Family Message
  if (cfg.familyMessage) {
    const fSalutation = document.getElementById("dynFamilySalutation");
    if (fSalutation) fSalutation.textContent = cfg.familyMessage.salutation;

    const fBody = document.getElementById("dynFamilyBody");
    if (fBody) fBody.textContent = `"${cfg.familyMessage.body}"`;

    const fParentsGroom = document.getElementById("dynParentsGroom");
    if (fParentsGroom) fParentsGroom.textContent = cfg.familyMessage.parentsGroom;

    const fParentsBride = document.getElementById("dynParentsBride");
    if (fParentsBride) fParentsBride.textContent = cfg.familyMessage.parentsBride;

    const fClosing = document.getElementById("dynFamilyClosing");
    if (fClosing) fClosing.textContent = cfg.familyMessage.closing;
  }

  // Render Final Invitation Quote
  if (cfg.finalInvitation) {
    const finQuote = document.getElementById("dynFinalQuote");
    if (finQuote) finQuote.textContent = `"${cfg.finalInvitation.quote}"`;

    const finSubquote = document.getElementById("dynFinalSubquote");
    if (finSubquote) finSubquote.textContent = cfg.finalInvitation.subquote;
  }

  // Bind Creator WhatsApp Business & Lead Generation CTAs
  if (cfg.creatorCTA) {
    const rawPhone = cfg.creatorCTA.whatsappNumber || "917355568493";
    const fullPhone = rawPhone.startsWith("91") ? rawPhone : ("91" + rawPhone);
    const msg = cfg.creatorCTA.whatsappMessage || "Hi Kavish, I’m interested in getting a custom Wedding website like your demo. I’d like to discuss my requirements, available packages, and pricing.";
    const waUrl = `https://wa.me/${fullPhone}?text=${encodeURIComponent(msg)}`;

    // Floating WhatsApp button
    const floatingWa = document.getElementById("wedFloatingWhatsapp");
    if (floatingWa) floatingWa.href = waUrl;

    // Contact modal WhatsApp option
    const modalWa = document.getElementById("wedding-whatsapp-cta");
    if (modalWa) modalWa.href = waUrl;

    // Contact modal Email option
    const modalEmail = document.getElementById("wedding-email-cta");
    if (modalEmail) {
      const email = cfg.creatorCTA.email || "kavishwebsitedesigner@gmail.com";
      const subject = cfg.creatorCTA.emailSubject || "Wedding Website Enquiry";
      modalEmail.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    }

    // Contact modal Call option
    const modalCall = document.getElementById("wedding-call-cta");
    if (modalCall) {
      const phone = cfg.creatorCTA.phoneLink || "tel:+917355568493";
      modalCall.href = phone;
    }
  }
}

/**
 * 2. Opening Experience Controller (NO SKIP BUTTON)
 */
function initOpeningExperience() {
  const overlay = document.getElementById("wedOpeningOverlay");
  const openBtn = document.getElementById("btnOpenInvite");

  if (!overlay || !openBtn) return;

  openBtn.addEventListener("click", () => {
    // 1. Smoothly dissolve opening curtain
    overlay.classList.add("is-opened");
    setTimeout(() => {
      overlay.style.display = "none";
    }, 800);

    // 2. Launch celebratory golden petal & confetti burst
    if (window.fireWeddingConfetti) {
      window.fireWeddingConfetti({
        particleCount: 120,
        spread: 100,
        originY: 0.6
      });

      setTimeout(() => {
        window.fireWeddingConfetti({
          particleCount: 80,
          spread: 80,
          originY: 0.5
        });
      }, 400);
    }

    // 3. Scroll to celebration hero
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/**
 * 3. High-Performance Canvas Confetti / Golden Petal Engine
 */
function initConfettiEngine() {
  const canvas = document.getElementById("wedConfettiCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];
  let animationId = null;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const colors = [
    "#d4af37", // Champagne Gold
    "#f5df9a", // Light Gold
    "#f472b6", // Rose Gold
    "#fda4af", // Soft Rose
    "#ffffff", // Shimmer White
    "#be185d"  // Wine Berry
  ];

  class ConfettiParticle {
    constructor(originX, originY) {
      this.x = originX;
      this.y = originY;
      const angle = (Math.random() * Math.PI) - (Math.PI / 2);
      const velocity = 8 + Math.random() * 14;
      this.vx = Math.cos(angle) * velocity + (Math.random() - 0.5) * 6;
      this.vy = Math.sin(angle) * velocity - (6 + Math.random() * 6);
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.size = 5 + Math.random() * 6;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 12;
      this.gravity = 0.32;
      this.drag = 0.985;
      this.alpha = 1;
      this.decay = 0.008 + Math.random() * 0.008;
      this.isPetal = Math.random() > 0.4;
    }

    update() {
      this.vx *= this.drag;
      this.vy = (this.vy * this.drag) + this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      this.alpha -= this.decay;
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;

      if (this.isPetal) {
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 1.3, this.size * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      }

      ctx.restore();
    }
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw(ctx);
      if (p.alpha <= 0 || p.y > canvas.height + 50) {
        particles.splice(i, 1);
      }
    }

    if (particles.length > 0) {
      animationId = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(animationId);
      animationId = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  window.fireWeddingConfetti = function(options = {}) {
    const count = options.particleCount || 100;
    const originX = options.originX !== undefined ? options.originX * canvas.width : canvas.width * 0.5;
    const originY = options.originY !== undefined ? options.originY * canvas.height : canvas.height * 0.6;

    for (let i = 0; i < count; i++) {
      particles.push(new ConfettiParticle(originX, originY));
    }

    if (!animationId) {
      animationId = requestAnimationFrame(loop);
    }
  };
}

/**
 * 4. Live Countdown Ticker with Graceful Past-Date Handling
 */
function initLiveCountdown(targetDateString) {
  const daysEl = document.getElementById("wedTimerDays");
  const hoursEl = document.getElementById("wedTimerHours");
  const minsEl = document.getElementById("wedTimerMins");
  const secsEl = document.getElementById("wedTimerSecs");
  const gridEl = document.getElementById("wedTimerGrid");
  const celebStateEl = document.getElementById("wedCelebrationState");

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  const target = new Date(targetDateString).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = target - now;

    // Graceful Celebration Handling if Passed
    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";

      if (gridEl) gridEl.style.display = "none";
      if (celebStateEl) celebStateEl.classList.add("is-active");
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = d < 10 ? `0${d}` : d.toString();
    hoursEl.textContent = h < 10 ? `0${h}` : h.toString();
    minsEl.textContent = m < 10 ? `0${m}` : m.toString();
    secsEl.textContent = s < 10 ? `0${s}` : s.toString();
  }

  update();
  setInterval(update, 1000);
}

/**
 * 5. Photo Gallery Lightbox Modal
 */
function initGalleryLightbox(galleryData) {
  const modal = document.getElementById("wedGalleryModal");
  const closeBtn = document.getElementById("btnWedCloseModal");
  const titleEl = document.getElementById("wedModalTitle");
  const dateEl = document.getElementById("wedModalDate");
  const descEl = document.getElementById("wedModalDesc");
  const noteEl = document.getElementById("wedModalNote");
  const graphicEl = document.getElementById("wedModalGraphic");

  if (!modal || !galleryData) return;

  const cards = document.querySelectorAll(".wed-gallery-card");
  const artIcons = ["✨", "☕", "🏔️", "💍", "🌸", "🌙"];

  cards.forEach((card, idx) => {
    card.addEventListener("click", () => {
      const gId = card.getAttribute("data-gallery-id");
      const item = galleryData.find(p => p.id === gId) || galleryData[idx];

      if (item) {
        if (titleEl) titleEl.textContent = item.title;
        if (dateEl) dateEl.textContent = item.date;
        if (descEl) descEl.textContent = item.caption;
        if (noteEl) noteEl.textContent = `💡 ${item.note}`;
        if (graphicEl) graphicEl.textContent = artIcons[idx % artIcons.length];

        modal.classList.add("is-open");
        document.body.style.overflow = "hidden";
      }
    });
  });

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

/**
 * 6. Special Interaction: "Send Your Blessings ✨"
 */
function initBlessingsInteraction() {
  const blessBtn = document.getElementById("btnSendBlessings");
  const countEl = document.getElementById("wedBlessingsCount");
  const toastEl = document.getElementById("wedBlessingToast");

  if (!blessBtn || !countEl) return;

  let currentCount = 248;
  let hasBlessed = false;

  blessBtn.addEventListener("click", () => {
    currentCount++;
    countEl.textContent = currentCount.toString();

    // Trigger golden celebration burst
    if (window.fireWeddingConfetti) {
      window.fireWeddingConfetti({
        particleCount: 60,
        spread: 60,
        originY: 0.7
      });
    }

    if (toastEl) {
      toastEl.classList.add("is-visible");
      toastEl.innerHTML = "✨ <strong>Blessings Received!</strong> May Aarav &amp; Anaya's union be filled with everlasting joy, harmony, and prosperity!";
    }

    if (!hasBlessed) {
      hasBlessed = true;
      blessBtn.innerHTML = `<span>Blessings Sent ✨ (${currentCount})</span>`;
    }
  });
}

/**
 * 7. RSVP Demo Handler (Strictly NO False Backend Claims)
 */
function initRsvpDemoHandler(cfg) {
  const form = document.getElementById("wedRsvpForm");
  const demoModal = document.getElementById("wedRsvpDemoModal");
  const closeModalBtn = document.getElementById("btnWedCloseRsvpModal");
  const modalText = document.getElementById("wedRsvpModalText");
  const waShareBtn = document.getElementById("btnShareRsvpWhatsApp");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("rsvpGuestName");
    const name = (nameInput && nameInput.value.trim()) || "Valued Guest";

    const attendanceInput = form.querySelector('input[name="attendance"]:checked');
    const attendance = attendanceInput ? attendanceInput.value : "Joyfully Accept";

    const countInput = document.getElementById("rsvpGuestCount");
    const guests = countInput ? countInput.value : "1";

    const messageInput = document.getElementById("rsvpGuestMessage");
    const msg = (messageInput && messageInput.value.trim()) || "Warmest wishes to the lovely couple!";

    // Prepare Transparent Demo Explanation
    if (modalText) {
      modalText.innerHTML = `
        <strong>Thank you, ${name}!</strong><br><br>
        Your response: <em>"${attendance}"</em> for <strong>${guests} Guest(s)</strong> has been captured in this interactive demonstration.<br><br>
        <span style="font-size: 0.85em; color: var(--wed-gold-light);">
          ℹ️ <strong>Transparent Demo Notice:</strong> No fake backend was contacted. In a live couple's website, this RSVP form connects seamlessly to your WhatsApp or a private Google Sheet to track attendees in real-time.
        </span>
      `;
    }

    // Optional WhatsApp Direct RSVP Transmitter
    if (waShareBtn && cfg && cfg.creatorCTA) {
      const rawPhone = cfg.creatorCTA.whatsappNumber || "917355568493";
      const fullPhone = rawPhone.startsWith("91") ? rawPhone : ("91" + rawPhone);
      const text = `RSVP for ${cfg.couple.groom} & ${cfg.couple.bride}'s Wedding:\nName: ${name}\nAttendance: ${attendance}\nGuests: ${guests}\nWishes: ${msg}`;
      waShareBtn.href = `https://wa.me/${fullPhone}?text=${encodeURIComponent(text)}`;
    }

    if (demoModal) {
      demoModal.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
  });

  if (closeModalBtn && demoModal) {
    closeModalBtn.addEventListener("click", () => {
      demoModal.classList.remove("is-open");
      document.body.style.overflow = "";
    });

    demoModal.addEventListener("click", (e) => {
      if (e.target === demoModal) {
        demoModal.classList.remove("is-open");
        document.body.style.overflow = "";
      }
    });
  }
}

/**
 * 8. Smooth Scroll Navigation Links
 */
function initSmoothScrollLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/**
 * 9. Quick Contact Action Panel Modal
 */
function initContactPanel() {
  const modal = document.getElementById("wedContactModal");
  const backdrop = document.getElementById("wedContactBackdrop");
  const closeBtn = document.getElementById("btnWedCloseContact");
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
