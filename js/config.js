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
  title: "Web Designer & Developer",
  location: "Kanpur, Uttar Pradesh, India",

  // Contact Details
  phone: "+91 7355568493",
  phoneRaw: "7355568493",
  phoneLink: "tel:+917355568493",
  
  email: "kavishwebsitedesigner@gmail.com",
  emailLink: "mailto:kavishwebsitedesigner@gmail.com",
  gmailComposeUrl: "https://mail.google.com/mail/?view=cm&fs=1&to=kavishwebsitedesigner@gmail.com",

  // Email & Enquiry Form Configuration
  formConfig: {
    // FormSubmit endpoint: delivers directly to your email without exposing private keys or passwords
    formSubmitUrl: "https://formsubmit.co/ajax/kavishwebsitedesigner@gmail.com",
    // Subject for incoming enquiry notification emails
    emailSubject: "New Website Lead — Kavish Murtuja",
    // Auto-detect Netlify Forms if deployed on Netlify
    autoDetectNetlify: true,
    // Optional custom Formspree URL if preferred
    formspreeUrl: ""
  },

  // Social Media Links (Verified Official Profiles)
  social: {
    // 1. WhatsApp Profile / Chat
    whatsapp: "https://wa.me/917355568493",
    
    // Pre-filled WhatsApp message when visitors click floating button or contact CTA
    whatsappInquiry: "https://wa.me/917355568493?text=Hello%20Kavish%2C%20I%20would%20like%20to%20discuss%20a%20website%20project%20for%20my%20business.",
    
    // 2. Instagram Profile (Official: https://www.instagram.com/kavishwebdesign/)
    instagram: "https://www.instagram.com/kavishwebdesign/"
  },

  // Project Modal Data (Details shown when clicking 'View Live Demo' on demo cards)
  demoProjects: {
    "royal-spice": {
      id: "royal-spice",
      title: "Royal Spice",
      category: "Restaurant",
      tagline: "Fine Dining & Heritage Cuisine Website Concept",
      status: "Demo Website",
      image: "assets/images/projects/royal-spice.svg",
      overview: "A rich, regal digital dining experience engineered for upscale restaurants and cafes. Features a visual digital food menu, high-conversion table reservation widget, banquet event showcase, and 1-click WhatsApp order integration.",
      deliverables: [
        "Interactive Digital Menu with dietary tags (Spicy, Vegan, Chef's Special)",
        "Direct Table Reservation & Party Booking System",
        "Curated Food Photography Showcase & Google Reviews Integration",
        "Fast Doorstep Delivery Integration & 1-Click WhatsApp Quick-Order"
      ],
      techStack: ["HTML5", "CSS3", "JavaScript", "Responsive UI", "Local SEO Schema"],
      results: "Built to drive direct table bookings, eliminate third-party ordering commissions, and showcase authentic culinary craft.",
      whatsappText: "Hello Kavish, I saw your Royal Spice restaurant demo website and I want a website like this for my restaurant/food business."
    },
    "aura-salon": {
      id: "aura-salon",
      title: "Aura Luxe Salon",
      category: "Salon",
      tagline: "Luxury Salon & Skincare Wellness Website Concept",
      status: "Concept Website",
      image: "assets/images/projects/aura-salon.svg",
      overview: "An opulent, boutique salon and spa digital experience built for hairstylists, beauty salons, and wellness clinics. Features interactive service price menus, stylist portfolio showcases, customer reviews, and direct WhatsApp appointment booking.",
      deliverables: [
        "Visual Service Menu & Transparent Pricing Guide",
        "Direct WhatsApp Appointment Scheduling Calendar",
        "Bridal Makeover Packages & Transformation Gallery",
        "Stylist Profiles, Certifications, and Verified Client Reviews"
      ],
      techStack: ["HTML5", "Modern CSS", "JavaScript", "Luxury Aesthetics", "Mobile First"],
      results: "Designed to help beauty salons build premium brand authority, eliminate booking friction, and attract high-ticket clients.",
      whatsappText: "Hello Kavish, I saw your Aura Luxe salon demo website and I want a website like this for my salon/spa business."
    },
    "apex-clinic": {
      id: "apex-clinic",
      title: "Apex Clinic",
      category: "Clinic",
      tagline: "Healthcare & Dental Excellence Website Concept",
      status: "Concept Website",
      image: "assets/images/projects/apex-clinic.svg",
      overview: "A clean, modern, and reassuring medical website tailored for doctors, specialized dental clinics, and healthcare practices. Features doctor credentials, patient consultation booking, treatment guides, and health FAQs.",
      deliverables: [
        "Online Doctor Appointment & Consultation Request Form",
        "Specialized Treatment Overviews with Before/After Case Previews",
        "Doctor Credentials, Medical Accreditations, and Clinic Facility Tour",
        "Patient FAQs, Clinic Hours, and Google Maps Location Integration"
      ],
      techStack: ["HTML5", "CSS3 Grid", "Vanilla JS", "Healthcare Schema", "Fast Load Speed"],
      results: "Engineered to establish immediate patient trust, communicate medical authority, and streamline appointment inquiries.",
      whatsappText: "Hello Kavish, I saw your Apex Clinic demo website and I want a website like this for my clinic/healthcare practice."
    },
    "urban-estate": {
      id: "urban-estate",
      title: "Urban Estate",
      category: "Real Estate",
      tagline: "Modern Real Estate & Property Showcase Concept",
      status: "Demo Website",
      image: "assets/images/projects/urban-estate.svg",
      overview: "A sleek, architectural property platform tailored for real estate developers, brokerage agencies, and luxury home sellers. Includes property filter by price, beds, and location with high-converting private tour scheduling.",
      deliverables: [
        "Interactive Property Finder (Filters by budget, locality, and property type)",
        "Floor Plans, Spec Sheets, and High-Res Architectural Renders",
        "Instant Private Showing & VIP Site Tour Request form",
        "Neighborhood highlights and Google Maps proximity guide"
      ],
      techStack: ["HTML5", "CSS3 Flexbox/Grid", "JavaScript", "Real Estate Schema", "Mobile Optimized"],
      results: "Empowers real estate agents and builders to capture high-intent buyer inquiries and VIP site visit requests.",
      whatsappText: "Hello Kavish, I saw your Urban Estate real estate demo website and I want a website like this for my property listings."
    },
    "elevate-coaching": {
      id: "elevate-coaching",
      title: "Elevate Coaching",
      category: "Coaching",
      tagline: "Executive Leadership & Mentorship Website Concept",
      status: "Concept Website",
      image: "assets/images/projects/elevate-coaching.svg",
      overview: "An authoritative personal brand platform designed for business coaches, executive mentors, and management consultants. Features program syllabus showcases, student case studies, free strategy call scheduling, and lead magnet integration.",
      deliverables: [
        "Coaching Program Breakdown & Tiered Cohort Enrollment",
        "1-on-1 Free Strategy Call Booking Integration",
        "Client Transformation Case Studies & Video Testimonials",
        "Downloadable Resource Funnel for High-Value Lead Capture"
      ],
      techStack: ["HTML5", "Modern CSS", "JavaScript", "Lead Gen UX", "Personal Branding"],
      results: "Structured to position the coach as an industry authority and convert cold visitors into high-ticket mentorship clients.",
      whatsappText: "Hello Kavish, I saw your Elevate Coaching demo website and I want a website like this for my coaching/consulting practice."
    },
    "metrocraft": {
      id: "metrocraft",
      title: "MetroCraft Works",
      category: "Local Business",
      tagline: "Custom Woodwork & Home Renovations Website Concept",
      status: "Concept Website",
      image: "assets/images/projects/metrocraft.svg",
      overview: "A dependable, craftsman-grade digital storefront designed for local contractors, carpentry studios, and home improvement businesses. Features before-and-after project galleries, verified local reviews, and 24-hour instant estimate requests.",
      deliverables: [
        "Project Gallery with Before/After Renovation Sliders",
        "24-Hour Quick Quote & Estimate Form",
        "Local Service Area Radius & Workmanship Guarantee Showcase",
        "Verified Customer Testimonials & Direct WhatsApp Consultation"
      ],
      techStack: ["HTML5", "CSS3", "JavaScript", "Local Business Schema", "Mobile First"],
      results: "Built to generate reliable local inbound inquiries and prove craftsmanship quality to neighborhood homeowners.",
      whatsappText: "Hello Kavish, I saw your MetroCraft local business demo website and I want a website like this for my local trade/service business."
    }
  }
};

// Export to window object for global script access
if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
