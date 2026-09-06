# Kavish Murtuja — Freelance Website Designer & Developer

> **Live Portfolio & Business Platform**: Designed & Developed by Kavish Murtuja (Kanpur, Uttar Pradesh, India).

A premium, modern, professional, and fully responsive personal portfolio website engineered to showcase web design and front-end development capabilities to prospective clients and generate high-value commercial leads.

---

## 🌟 Key Highlights & Features

- **Luxury Modern Aesthetic**: Dark-themed luxury palette with glowing gradients, glassmorphism, and responsive typography.
- **Sticky Glassmorphism Navbar**: Frosted blur navigation bar with quick social icons, responsive mobile drawer menu, and `"Let's Talk"` CTA.
- **Dynamic Hero Section**: Availability badge, dual CTA action buttons, trust indicators, and interactive layered device mockup.
- **8 Commercial Service Cards**:
  - Business Website Design
  - Restaurant Website Design
  - Portfolio Website
  - Landing Page Design
  - E-commerce Website
  - Website Redesign
  - Mobile Responsive Design
  - Website Maintenance
- **Interactive Portfolio Showcase**:
  - Category filter tabs (`All`, `Restaurant`, `Hotel`, `Real Estate`, `Fitness`, `Business`, `Agency`).
  - 6 bespoke demo projects clearly labeled with **"Demo Project"** badges.
  - Interactive project detail modals with deliverables lists, tech tags, and direct WhatsApp inquiry triggers.
- **5-Step Process Timeline**: Discussion &rarr; Planning &rarr; Design &rarr; Development &rarr; Launch.
- **Expectation Guarantee Pillars**: Transparent expectations covering Professional Communication, Modern Design, and Reliable Delivery.
- **Pricing Packages**: Transparent packages with custom quote triggers and pricing disclaimer.
- **Interactive FAQ**: Accordion answering all common client inquiries with smooth animations.
- **Direct Contact & Lead Generation Form**:
  - Direct Phone, WhatsApp, Gmail, and Kanpur location cards.
  - Validated contact form with instant alternative *"Send Enquiry via WhatsApp"*.
- **Persistent Floating WhatsApp CTA**: Pulsing radar wave animation with pre-filled inquiry text.
- **Single Source of Truth Configuration**: Edit all social links (Instagram, Facebook, WhatsApp) and contact info in `js/config.js`.
- **SEO & Performance Ready**: Semantic HTML5, Schema.org `ProfessionalService` JSON-LD, Open Graph tags, `robots.txt`, and `sitemap.xml`.

---

## 📁 Project Architecture

```
portfolio-of-kavish/
├── index.html                 # Main semantic structure & SEO metadata
├── css/
│   └── style.css              # Custom design system, luxury dark mode tokens & animations
├── js/
│   ├── config.js              # Centralized configuration (Social links, contact info & project data)
│   └── script.js              # Navbar scroll, mobile drawer, filters, modal, accordion, validation
├── assets/
│   ├── favicon/
│   │   └── favicon.svg        # Monogram SVG favicon
│   ├── icons/
│   │   ├── whatsapp.svg       # Official vector WhatsApp icon
│   │   ├── instagram.svg      # Official vector Instagram icon
│   │   └── facebook.svg       # Official vector Facebook icon
│   └── images/
│       ├── hero-mockup.svg    # Hero device & dashboard showcase mockup
│       └── projects/          # High-fidelity SVG mockups for all 6 demo projects
│           ├── royal-spice.svg
│           ├── luxestay.svg
│           ├── urban-estate.svg
│           ├── fitzone.svg
│           ├── novatech.svg
│           └── creative-studio.svg
├── .gitignore                 # Ignored files & logs
├── robots.txt                 # Search engine crawler directives
├── sitemap.xml                # Search engine XML sitemap
└── README.md                  # Project documentation
```

---

## 🚀 Running Locally

### Option 1: Direct Double-Click
Simply double-click `index.html` in your file explorer. It will open directly in your web browser.

### Option 2: Python Local Server
```bash
# In the project root directory:
python -m http.server 8080
```
Then visit `http://localhost:8080` in your web browser.

---

## ⚙️ Updating Social Media & Contact Details

All contact and social links are managed from one central file:
👉 **`js/config.js`**

```javascript
social: {
  whatsapp: "https://wa.me/917355568493",
  whatsappInquiry: "https://wa.me/917355568493?text=...",
  instagram: "https://instagram.com/your_handle",  // <-- UPDATE HERE
  facebook: "https://facebook.com/your_page"       // <-- UPDATE HERE
}
```

Updating this file automatically updates links across the navbar, contact section, project modals, and footer.

---

## 🌐 Free Deployment Guide

### Deploying to GitHub Pages
1. Go to repository **Settings** &rarr; **Pages**.
2. Under **Build and deployment** &rarr; **Branch**, select `main` and folder `/ (root)`.
3. Click **Save**. The website will be live in 1–2 minutes!

### Deploying to Netlify
1. Log into [netlify.com](https://www.netlify.com/).
2. Drag and drop this project folder into the Netlify Sites dashboard.
3. Your website is instantly deployed with free SSL (HTTPS).

---

## 📬 Contact Kavish Murtuja

- **Phone**: [+91 7355568493](tel:+917355568493)
- **WhatsApp**: [+91 7355568493](https://wa.me/917355568493)
- **Email**: [sayyedkavish979@gmail.com](mailto:sayyedkavish979@gmail.com)
- **Location**: Kanpur, Uttar Pradesh, India

---

© 2026 Kavish Murtuja. All Rights Reserved. Designed & Developed by Kavish Murtuja.
