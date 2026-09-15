/**
 * ==============================================================================
 *  BIRTHDAY SURPRISE — EDITABLE DEMO CONFIGURATION
 *  Concept Demo by Kavish Murtuja | Web Designer & Developer
 *
 *  A future customer can easily personalize every item below:
 *  - Recipient Name
 *  - Birthday Target Date (for live countdown)
 *  - Personal Message & Emotional Notes
 *  - Memory Photos & Captions
 *  - Memory Timeline Milestones
 * ==============================================================================
 */

// Helper to get a realistic upcoming birthday date (10 days from today) for dynamic demo testing
const _defaultFutureDate = new Date();
_defaultFutureDate.setDate(_defaultFutureDate.getDate() + 10);
_defaultFutureDate.setHours(0, 0, 0, 0);

const BIRTHDAY_CONFIG = {
  // 1. Recipient Identity (Fictional name for concept demo)
  recipient: {
    name: "Alex",
    nickname: "Lex",
    relation: "Someone Special",
    specialYear: "Another Beautiful Chapter"
  },

  // 2. Birthday Countdown Target Date
  // Format: 'YYYY-MM-DDTHH:MM:SS' or Date object
  // If this date has passed, the website displays a festive "Happy Birthday!" celebration state.
  targetDate: _defaultFutureDate.toISOString(),

  // 3. Hero & Opening Copy
  hero: {
    badge: "Celebration Day",
    mainGreeting: "Happy Birthday!",
    subtitle: "Today is all about celebrating you.",
    greetingNote: "Here is a personalized collection of memories, milestones, and heartfelt wishes crafted just for you."
  },

  // 4. Personal Heartfelt Message
  personalMessage: {
    heading: "A Message For You",
    badge: "Heartfelt Words",
    text: "Today is a reminder of how truly special and wonderful you are. May your day be filled with happiness, laughter and beautiful memories. You bring radiant warmth and kindness to everyone around you, and you deserve every ounce of joy the world has to offer today and always.",
    sender: "With warmth & love, Always",
    audioNote: "Made with genuine care"
  },

  // 5. Beautiful Memories (Photo Gallery Demo Placeholders)
  memories: [
    {
      id: "memory-1",
      title: "The Golden Sunset Laughs",
      date: "Summer Getaway",
      caption: "That evening by the shore when the sky turned pink and we lost track of time talking about our biggest dreams.",
      tag: "Unfiltered Joy",
      category: "Adventures",
      gradient: "linear-gradient(135deg, #f43f5e 0%, #fb7185 50%, #fda4af 100%)",
      icon: "🌅"
    },
    {
      id: "memory-2",
      title: "Spontaneous Road Trips",
      date: "Mountain Breeze",
      caption: "Windows down, our favorite playlist on repeat, and taking wrong turns that led to the most scenic viewpoints.",
      tag: "Wanderlust",
      category: "Journeys",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 50%, #c4b5fd 100%)",
      icon: "🚗"
    },
    {
      id: "memory-3",
      title: "Coffee & Cozy Conversations",
      date: "Autumn Days",
      caption: "Quiet rainy mornings, hot mocha mugs, and conversations that could heal any stressful week.",
      tag: "Comfort",
      category: "Everyday Magic",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #fde68a 100%)",
      icon: "☕"
    },
    {
      id: "memory-4",
      title: "Celebrating Milestones",
      date: "City Lights",
      caption: "Dressed up for your huge achievement. The proud smiles and celebratory toasts that will never be forgotten.",
      tag: "Victory",
      category: "Celebrations",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #38bdf8 50%, #7dd3fc 100%)",
      icon: "🥂"
    },
    {
      id: "memory-5",
      title: "Starlit Midnight Walks",
      date: "Late Night Talks",
      caption: "Walking under the quiet starry night, discussing life, philosophy, and laughing at the most silly jokes.",
      tag: "Quiet Moments",
      category: "Nightscapes",
      gradient: "linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #fbcfe8 100%)",
      icon: "✨"
    },
    {
      id: "memory-6",
      title: "Unconditional Smiles",
      date: "The Funniest Day",
      caption: "That moment we couldn't stop giggling until our cheeks hurt. Pure, unfiltered, genuine happiness.",
      tag: "Pure Light",
      category: "Laughter",
      gradient: "linear-gradient(135deg, #10b981 0%, #34d399 50%, #a7f3d0 100%)",
      icon: "💛"
    }
  ],

  // 6. Our Memories Timeline
  timeline: [
    {
      title: "First Memory",
      subheading: "Where The Journey Began",
      description: "The first day our paths crossed and every conversation felt completely natural. A simple hello that sparked an extraordinary bond.",
      icon: "🌱"
    },
    {
      title: "A Special Day",
      subheading: "An Unplanned Adventure",
      description: "That unforgettable weekend under the open sky when every moment seemed perfectly paused in pure happiness and endless laughter.",
      icon: "🎈"
    },
    {
      title: "Unforgettable Moment",
      subheading: "When Everything Clicked",
      description: "Realizing just how rare, loyal, and genuine this connection truly is. Knowing you have someone who always believes in you.",
      icon: "💎"
    },
    {
      title: "Another Beautiful Memory",
      subheading: "Standing By Each Other",
      description: "Through the small daily wins and the biggest ambitions. Today is a celebration of who you are and everything ahead of you.",
      icon: "🚀"
    }
  ],

  // 7. Interactive Birthday Cake Section
  cake: {
    heading: "Make a Wish ✨",
    instruction: "Close your eyes, make your deepest wish, and blow out the candle!",
    wishMadeText: "Wish Made! May all your dreams take flight this year! ✨",
    relightButtonText: "Relight Candle 🕯️",
    blowButtonText: "Make a Wish & Blow Candle 🎂"
  },

  // 8. Final Closing Statement
  closing: {
    heading: "One More Thing...",
    message: "May this year bring you happiness, new memories and countless reasons to smile.",
    cheer: "Happy Birthday! 🎂"
  },

  // 9. Creator Call To Action (Kavish Murtuja Business Inquiry)
  creatorCTA: {
    title: "Want a Birthday Website Like This?",
    subtitle: "Create a personalized digital surprise for someone special.",
    features: [
      "100% Customized Content & Name",
      "Personal Photo Gallery & Lightbox",
      "Interactive Candle & Music FX",
      "Live on a Custom Domain / Link",
      "Fast 24-48 Hour Turnaround"
    ],
    buttonText: "Get Yours",
    whatsappNumber: "917355568493",
    whatsappMessage: "Hi Kavish, I’m interested in getting a custom Birthday website like your demo. I’d like to discuss my requirements, available packages, and pricing.",
    email: "kavishwebsitedesigner@gmail.com",
    emailSubject: "Birthday Website Enquiry",
    phone: "+91 7355568493",
    phoneLink: "tel:+917355568493",
    portfolioUrl: "../#portfolio"
  }
};
