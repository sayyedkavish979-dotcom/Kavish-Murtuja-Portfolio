/**
 * ==============================================================================
 * WEDDING EXPERIENCE DEMO — CONFIGURATION
 * Concept Demo by Kavish Murtuja | Web Designer & Developer
 * ==============================================================================
 * 
 * This file contains all editable content for the wedding website demo.
 * In a production deployment for a real client, every detail below can be
 * personalized in seconds without modifying HTML or core CSS.
 * 
 * DISCLAIMER: This is a concept demo engineered for portfolio demonstration.
 * Names, dates, and locations are fictional placeholders.
 */

const WEDDING_CONFIG = {
  // Couple Information
  couple: {
    groom: "Aarav",
    bride: "Anaya",
    fullNameGroom: "Aarav Sharma",
    fullNameBride: "Anaya Kapoor",
    tagline: "Two hearts. One beautiful beginning.",
    hashtag: "#AaravWedsAnaya",
    weddingDateText: "15 December 2026",
    invitationGreeting: "Together with their families",
    invitationCallout: "Invite You To Celebrate Their Wedding"
  },

  // Target date for live countdown ticker (ISO format)
  // Graceful celebration state triggers automatically once this date has passed
  targetDate: "2026-12-15T19:00:00",

  // "Our Story" Chapters
  story: [
    {
      step: "01",
      title: "How We Met",
      date: "Spring 2022",
      excerpt: "It began with a chance encounter at a cozy book café in Connaught Place. What was supposed to be a polite ten-minute chat turned into hours of shared laughter over cold brew and favorite novels.",
      highlight: "A serendipitous first meeting"
    },
    {
      step: "02",
      title: "Our First Memory",
      date: "Autumn 2022",
      excerpt: "A spontaneous road trip to the misty hills of Mussoorie. Caught in an unexpected downpour, we shared warm roasted corn and realized we were each other's favorite travel companion for life.",
      highlight: "Raindrops, laughter & endless hill roads"
    },
    {
      step: "03",
      title: "The Moment We Knew",
      date: "Winter 2024",
      excerpt: "Through tight work deadlines, family dinners, quiet evenings, and heartfelt conversations, we discovered an unspoken comfort where simply being next to each other felt like coming home.",
      highlight: "When ordinary moments turned into forever"
    },
    {
      step: "04",
      title: "Forever Begins",
      date: "December 2026",
      excerpt: "Surrounded by the blessings of our parents and loved ones, we are ready to take our sacred seven vows under the stars and begin our greatest adventure together.",
      highlight: "Two souls, one timeless promise"
    }
  ],

  // Wedding Celebrations / Multi-Event Schedule
  events: [
    {
      id: "mehendi",
      name: "Mehendi Ceremony",
      dateText: "13 December 2026",
      timeText: "6:00 PM onwards",
      venueName: "The Royal Courtyard",
      addressText: "The Grand Palace, Kanpur",
      dressCode: "Festive Pastels & Ethnic Brights",
      badge: "Music & Henna",
      icon: "🎨",
      description: "An evening filled with intricate henna designs, live folk music, joyful dhol beats, and vibrant street food stations."
    },
    {
      id: "haldi",
      name: "Haldi Ceremony",
      dateText: "14 December 2026",
      timeText: "11:00 AM onwards",
      venueName: "Sunlit Poolside Lawns",
      addressText: "The Grand Palace, Kanpur",
      dressCode: "Sunshine Yellow & Traditional White",
      badge: "Auspicious Morning",
      icon: "✨",
      description: "A joyful morning of turmeric blessings, flower petal showers, splashing water laughter, and warm family camaraderie."
    },
    {
      id: "ceremony",
      name: "Wedding Ceremony (Phere)",
      dateText: "15 December 2026",
      timeText: "7:00 PM onwards",
      venueName: "The Grand Palace Mandap",
      addressText: "The Grand Palace, Kanpur",
      dressCode: "Traditional Royal Indian Attire",
      badge: "Main Event",
      icon: "💍",
      description: "The auspicious sacred pheras around the holy fire, solemn vows, varmala exchange, and eternal union under starry night skies."
    },
    {
      id: "reception",
      name: "Grand Reception",
      dateText: "16 December 2026",
      timeText: "7:30 PM onwards",
      venueName: "The Crystal Ballroom",
      addressText: "The Grand Palace, Kanpur",
      dressCode: "Formal Western / Elegant Evening Ethnic",
      badge: "Gala Dinner",
      icon: "🥂",
      description: "A glamorous evening of celebration, couple cake cutting, heartfelt toasts, gourmet royal dinner, and lively dancing."
    }
  ],

  // Wedding Venue Information
  venue: {
    name: "The Grand Palace",
    city: "Kanpur, Uttar Pradesh",
    fullAddress: "The Grand Palace, Civil Lines, Kanpur, Uttar Pradesh 208001",
    tagline: "A majestic royal destination nestled amidst lush heritage gardens",
    mapPlaceholderUrl: "https://maps.google.com/?q=The+Grand+Palace+Kanpur",
    airportDistance: "18 km from Kanpur Airport (KNU)",
    railwayDistance: "4 km from Kanpur Central Railway Station",
    valetAvailable: "Complimentary Valet Parking Available for all Guests"
  },

  // Photo Gallery ("Our Beautiful Moments")
  gallery: [
    {
      id: "photo-1",
      title: "The Golden Sunset Promise",
      tag: "Pre-Wedding",
      date: "October 2026",
      caption: "Bathed in golden hour warmth, caught in a quiet moment of laughter and eternal promise.",
      note: "Placeholder photo — in production, replaced with the couple's high-res shoot photograph."
    },
    {
      id: "photo-2",
      title: "Shared Coffee & Unspoken Smiles",
      tag: "First Date",
      date: "May 2022",
      caption: "Where two strangers discovered they shared the same favorite jokes, dreams, and quiet comfort.",
      note: "Placeholder photo — customizable with candid smartphone or camera memories."
    },
    {
      id: "photo-3",
      title: "Misty Mountain Escape",
      tag: "Adventures",
      date: "October 2023",
      caption: "Exploring forest trails, winding hill roads, and discovering joy in every spontaneous turn.",
      note: "Placeholder photo — customizable with couple travel and vacation pictures."
    },
    {
      id: "photo-4",
      title: "The Surprise Ring",
      tag: "Proposal",
      date: "February 2025",
      caption: "A quiet garden, candlelit lanterns, nervous smiles, and an enthusiastic 'YES!' that changed our world forever.",
      note: "Placeholder photo — captures the engagement/ring reveal moment."
    },
    {
      id: "photo-5",
      title: "Traditional Elegance",
      tag: "Engagement",
      date: "August 2025",
      caption: "Dressed in heritage silks, surrounded by fragrant marigold blossoms and the blessings of both families.",
      note: "Placeholder photo — highlights the roka / engagement celebrations."
    },
    {
      id: "photo-6",
      title: "Under The Starlit Sky",
      tag: "Celebration",
      date: "November 2025",
      caption: "Dancing like nobody is watching, counting down the days until we officially become husband and wife.",
      note: "Placeholder photo — couples' evening dinner or pre-wedding dance rehearsal."
    }
  ],

  // Family / Invitation Message
  familyMessage: {
    heading: "With Love From Our Families",
    subheading: "A Union of Two Families & Countless Hearts",
    salutation: "Dear Friends & Family,",
    body: "With hearts full of gratitude and immense joy, we invite you to be part of our most cherished milestone. Weddings are not merely the union of two individuals; they are a celebration of community, heritage, and the friendships that shaped who we are. Your presence, laughter, and warm blessings will make our special day truly complete.",
    parentsGroom: "Mr. Ramesh & Mrs. Sunita Sharma",
    parentsBride: "Mr. Vikram & Mrs. Meenakshi Kapoor",
    closing: "We eagerly look forward to welcoming you with warm hearts and celebratory smiles."
  },

  // Final Romantic Quote
  finalInvitation: {
    quote: "Two lives, one journey, countless memories to come.",
    subquote: "We can't wait to celebrate this beautiful beginning with you.",
    names: "Aarav & Anaya"
  },

  // Business Call-to-Action & Lead Gen
  creatorCTA: {
    attribution: "Concept Demo by Kavish Murtuja | Web Designer & Developer",
    badge: "Custom Wedding Website Design",
    title: "Want a Wedding Website Like This?",
    subtitle: "Create a beautiful digital wedding invitation and experience.",
    buttonText: "Get Yours",
    whatsappNumber: "917355568493",
    whatsappMessage: "Hi Kavish, I’m interested in getting a custom Wedding website like your demo. I’d like to discuss my requirements, available packages, and pricing.",
    email: "kavishwebsitedesigner@gmail.com",
    emailSubject: "Wedding Website Enquiry",
    phone: "+91 7355568493",
    phoneLink: "tel:+917355568493"
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = WEDDING_CONFIG;
}
