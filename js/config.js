/**
 * ==============================================================================
 *  KAVISH MURTUJA PORTFOLIO - MASTER CONFIGURATION
 * ==============================================================================
 *  EDIT YOUR LINKS AND DETAILS IN ONE PLACE!
 *  Any change you make here will automatically reflect on all buttons,
 *  social icons, and contact elements across the entire website.
 * ==============================================================================
 */

const SITE_CONFIG = {
  // Personal Information
  name: "Kavish Murtuja",
  title: "Freelance Website Designer & Developer",
  location: "Kanpur, Uttar Pradesh, India",

  // Contact Details
  phone: "+91 7355568493",
  phoneRaw: "7355568493",
  phoneLink: "tel:+917355568493",
  
  email: "sayyedkavish979@gmail.com",
  emailLink: "mailto:sayyedkavish979@gmail.com",

  // Email & Enquiry Form Configuration
  formConfig: {
    // FormSubmit endpoint: delivers directly to your email without exposing private keys or passwords
    formSubmitUrl: "https://formsubmit.co/ajax/sayyedkavish979@gmail.com",
    // Subject for incoming enquiry notification emails
    emailSubject: "New Website Lead — Kavish Murtuja Portfolio",
    // Auto-detect Netlify Forms if deployed on Netlify
    autoDetectNetlify: true,
    // Optional custom Formspree URL if preferred
    formspreeUrl: ""
  },

  // Social Media Links (EDIT YOUR INSTAGRAM & FACEBOOK HANDLES HERE)
  social: {
    // 1. WhatsApp Profile / Chat
    whatsapp: "https://wa.me/917355568493",
    
    // Pre-filled WhatsApp message when visitors click floating button or contact CTA
    whatsappInquiry: "https://wa.me/917355568493?text=Hi%20Kavish%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20website%20project.",
    
    // 2. Instagram Profile (Replace with your actual handle, e.g. https://instagram.com/yourhandle)
    instagram: "https://instagram.com/kavishmurtuja",
    
    // 3. Facebook Profile / Page (Replace with your actual handle, e.g. https://facebook.com/yourpage)
    facebook: "https://facebook.com/kavishmurtuja"
  },

  // Project Modal Data (Details shown when clicking 'View Project' on demo cards)
  demoProjects: {
    "royal-spice": {
      id: "royal-spice",
      title: "Royal Spice",
      category: "Restaurant",
      tagline: "Premium Indian Restaurant & Fine Dining Website",
      status: "Demo Project",
      image: "assets/images/projects/royal-spice.svg",
      overview: "A rich, regal digital dining experience engineered for upscale Indian restaurants. Features an interactive food menu, high-conversion table reservation widget, private banquet hall showcase, and seamless mobile-first layout.",
      deliverables: [
        "Interactive Digital Menu with dietary tags (Spicy, Vegan, Chef's Special)",
        "Table Reservation & Event Booking System",
        "Curated Food Photography Gallery & Reviews Integration",
        "Fast Doorstep Delivery Integration & WhatsApp Quick-Order"
      ],
      techStack: ["HTML5", "CSS3", "JavaScript", "Responsive UI", "Local SEO Schema"],
      results: "Engineered to facilitate direct table reservations and online orders with an intuitive user experience.",
      whatsappText: "Hello Kavish, I saw your Royal Spice restaurant demo project and I would like a similar website for my restaurant/food business."
    },
    "luxestay": {
      id: "luxestay",
      title: "LuxeStay",
      category: "Hotel",
      tagline: "Luxury Hotel & Boutique Resort Website",
      status: "Demo Project",
      image: "assets/images/projects/luxestay.svg",
      overview: "An opulent boutique hospitality website designed to showcase luxury resort villas, presidential suites, wellness spas, and curated oceanfront experiences with an integrated date-picker booking engine simulation.",
      deliverables: [
        "Room & Suite Filter with interactive 360° virtual tour triggers",
        "Direct Date & Guest Picker Booking Console",
        "Wellness Spa, Infinity Pool & Dining Experiences showcase",
        "Multilingual readiness and high-resolution media optimization"
      ],
      techStack: ["HTML5", "Modern CSS Grid", "Vanilla JS", "Luxury Aesthetics", "Schema.org Hotel"],
      results: "Designed to drive direct room reservations and lower dependency on third-party booking commissions.",
      whatsappText: "Hello Kavish, I am interested in building a luxury resort/hotel website like your LuxeStay demo."
    },
    "urban-estate": {
      id: "urban-estate",
      title: "Urban Estate",
      category: "Real Estate",
      tagline: "Modern Real Estate & Property Showcase Website",
      status: "Demo Project",
      image: "assets/images/projects/urban-estate.svg",
      overview: "A sleek, architectural property platform tailored for real estate developers, brokerage agencies, and luxury home sellers. Includes property filter by price, beds, and location with high-converting private tour scheduling.",
      deliverables: [
        "Interactive Property Finder (Filters by budget, locality, and property type)",
        "Floor Plans, Spec Sheets, and High-Res Architectural Renders",
        "Instant Private Showing & VIP Site Tour Request form",
        "Neighborhood highlights and Google Maps proximity guide"
      ],
      techStack: ["HTML5", "CSS3 Flexbox/Grid", "JavaScript", "Real Estate Schema", "Mobile Optimized"],
      results: "Empowers real estate agents to capture high-intent property inquiries and qualified homebuyer leads.",
      whatsappText: "Hello Kavish, I want a modern real estate website like your Urban Estate demo for my property listings."
    },
    "fitzone": {
      id: "fitzone",
      title: "FitZone",
      category: "Fitness",
      tagline: "Modern Fitness Studio & CrossFit Website",
      status: "Demo Project",
      image: "assets/images/projects/fitzone.svg",
      overview: "A high-energy, athletic website built for gym owners, fitness clubs, and personal trainers. Features dynamic weekly class schedules, membership pricing tiers, trainer bio cards, and a free trial pass lead capture form.",
      deliverables: [
        "Weekly Workout Schedule & Real-time Class Timetable",
        "Tiered Membership Pricing Comparison Cards",
        "Trainer Profiles, Certifications, and 1-on-1 Consultation booking",
        "Lead Generation Funnel for 3-Day Free Studio Pass"
      ],
      techStack: ["HTML5", "CSS3 Animation", "JavaScript", "Lead Capture UX", "Performance Tuned"],
      results: "Engineered to convert local gym searchers into active paying members with compelling CTA funnels.",
      whatsappText: "Hello Kavish, I need a modern gym and fitness studio website like your FitZone demo project."
    },
    "novatech": {
      id: "novatech",
      title: "NovaTech",
      category: "Business",
      tagline: "Technology Business & SaaS Platform Website",
      status: "Demo Project",
      image: "assets/images/projects/novatech.svg",
      overview: "An enterprise B2B technology website designed to present cloud infrastructure, AI platforms, and SaaS products. Features interactive metric dashboards, API documentation previews, and a book-a-demo enterprise funnel.",
      deliverables: [
        "Product Feature Matrix with interactive dashboard simulations",
        "Enterprise Security, Compliance (SOC-2, GDPR) & Cloud Architecture showcase",
        "Developer Documentation & API Sandbox preview",
        "B2B Demo Request and Free Trial lead generation workflow"
      ],
      techStack: ["HTML5", "Modern CSS Glassmorphism", "JavaScript", "B2B SaaS UX", "Fast Core Web Vitals"],
      results: "Built to convey world-class enterprise authority and drive demo bookings for tech startups.",
      whatsappText: "Hello Kavish, I would like to discuss building a technology/SaaS business website like NovaTech."
    },
    "creative-studio": {
      id: "creative-studio",
      title: "Creative Studio",
      category: "Agency",
      tagline: "Creative Agency & Digital Brand Portfolio",
      status: "Demo Project",
      image: "assets/images/projects/creative-studio.svg",
      overview: "An avant-garde portfolio website engineered for creative design studios, advertising agencies, and video production houses. Emphasizes bold typography, awards showcases, case studies, and interactive showreel playback.",
      deliverables: [
        "Immersive Case Study Grid with category filtering",
        "Fullscreen Showreel Video Player modal",
        "Brand Identity, 3D CGI & Design services breakdown",
        "Client Roster, Industry Awards (Awwwards, FWA), and Project Brief form"
      ],
      techStack: ["HTML5", "Advanced CSS3", "JavaScript", "Micro-Interactions", "Creative Typography"],
      results: "Showcases creative capability with distinctive visual impact to attract high-value agency clients.",
      whatsappText: "Hello Kavish, I love the Creative Studio agency portfolio demo and want a bespoke agency website."
    }
  }
};

// Export to window object for global script access
if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
