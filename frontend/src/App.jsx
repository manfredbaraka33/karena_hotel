import React, { useState, useMemo } from 'react';
import { 
  Phone, 
  MapPin, 
  Calendar, 
  Users, 
  Wifi, 
  Tv, 
  Coffee, 
  ShieldCheck, 
  Clock, 
  Utensils, 
  Car, 
  Wind, 
  CheckCircle2, 
  Globe, 
  Menu, 
  X, 
  Star, 
  Send, 
  ChevronRight, 
  BedDouble, 
  Info, 
  MessageCircle, 
  Award 
} from 'lucide-react';

/**
 * ============================================================================
 * KARENA HOTEL - SHINYANGA, TANZANIA
 * Direct WhatsApp Integration Engine
 * ============================================================================
 */
const WHATSAPP_NUMBER = "255739039449";
const USD_EXCHANGE_RATE = 2650; // 1 USD ~ 2,650 TZS (Approximate calculation)

/**
 * Global helper to send formatted messages directly to WhatsApp
 */
const sendWhatsAppMessage = (text) => {
  const encodedText = encodeURIComponent(text);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
  window.open(url, '_blank');
};

/**
 * PITCH NOTE FOR CLIENT / MANAGEMENT:
 * The images below are currently loaded from high-quality Unsplash placeholders.
 * To replace them with actual photos of Karena Hotel (Rooms, Restaurant, Conference Hall),
 * simply update the image URLs in this `IMAGES` configuration object!
 */
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80",
  exterior: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
  reception: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
  rooms: {
    deluxe: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    executive: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    suite: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    family: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
  },
  dining: {
    nyamaChoma: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    tilapia: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
    breakfast: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80",
    drinks: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  },
  conference: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1000&q=80"
};

const TRANSLATIONS = {
  sw: {
    nav: {
      home: "Nyumbani",
      rooms: "Vyumba na Malazi",
      dining: "Mkahawa & Chakula",
      conference: "Mikutano & Ukumbi",
      location: "Mahali Tulipo",
      contact: "Wasiliana Nasi",
      bookNow: "Hifadhi Chumba",
      quickCall: "Piga Simu"
    },
    hero: {
      badge: "★ Hoteli ya Kifahari Shinyanga",
      title: "Karibu Karena Hotel Shinyanga",
      subtitle: "Mchanganyiko wa Utulivu, Anasa na Ukarimu wa Kipekee Mjini Shinyanga. Furahia Vyumba vya Kasa, Chakula Kitamu na Ukumbi wa Mikutano wa Kisasa.",
      searchHeader: "Tafuta Nafasi ya Chumba",
      checkIn: "Tarehe ya Kuingia",
      checkOut: "Tarehe ya Kuondoka",
      roomType: "Aina ya Chumba",
      guests: "Wageni",
      searchBtn: "Angalia Nafasi WhatsApp",
      allTypes: "Aina Zote za Vyumba"
    },
    pitchBanner: {
      tag: "DOKEZO LA DARAJA LA TEKNOLOJIA",
      text: "Mfumo huu umeunganishwa moja kwa moja na WhatsApp (+255 739 039 449). Maagizo yote na uwekaji nafasi unatumwa kiotomatiki kwenda WhatsApp ya hoteli bila makosa!"
    },
    amenities: {
      title: "Huduma Zetu Bora",
      subtitle: "Tunahakikisha unahisi uko nyumbani ukiwa na huduma zote muhimu kwa safari yako ya kibiashara au ya kifamilia.",
      wifi: "Intaneti ya Kasi (Free Wi-Fi)",
      ac: "Kiyoyozi (Air Conditioned)",
      parking: "Ulinzi na Eneo Kubwa la Maegesho",
      reception: "Huduma za Mapokezi Masaa 24",
      restaurant: "Mgahawa wa Vyakula vya Asili na Kimataifa",
      tv: "Smart TV na Vituo vya DStv",
      coffee: "Kiamsha Kinywa cha Bure",
      conference: "Ukumbi wa Mikutano na Mikutano ya Biashara"
    },
    rooms: {
      title: "Vyumba vyetu vya Kifahari",
      subtitle: "Chagua chumba kinachokufaa kwa bei nafuu na huduma za daraja la kwanza.",
      perNight: "kwa usiku",
      bookBtn: "Weka Sasa hivi (WhatsApp)",
      detailsBtn: "Maelezo Zaidi",
      filterAll: "Vyumba Vyote",
      capacity: "Wageni",
      bed: "Kitanda",
      size: "Ukubwa"
    },
    dining: {
      badge: "Mkahawa wa Karena",
      title: "Chakula Kitamu & Vinywaji",
      subtitle: "Onja vyakula vitamu vya asili vya Kitanzania pamoja na mapishi ya kimataifa yaliyoandaliwa na wapishi wetu mahiri.",
      orderBtn: "Agiza Sasa hivi WhatsApp",
      menuTitle: "Menyu Inayopendwa"
    },
    conference: {
      badge: "Mikutano na Matukio",
      title: "Ukumbi wa Mikutano wa Kisasa",
      subtitle: "Ukumbi wetu una uwezo wa kuchukua wageni wa mikutano ya kibiashara, semina, na sherehe za kifamilia ukiwa na projector na mfumo mzuri wa sauti.",
      feature1: "Uwezo wa Wageni 150+",
      feature2: "Projector na Sauti ya Kisasa",
      feature3: "Chai ya 10 & Chakula cha Mchana",
      inquireBtn: "Omba Nukuu ya Bei (WhatsApp)"
    },
    location: {
      title: "Mahali Tulipo Shinyanga",
      subtitle: "Tunapatikana eneo tulivu la Kambarage, Mjini Shinyanga - Karibu kabisa na barabara kuu na vituo vya usafiri.",
      address: "Eneo la Kambarage, Mjini Shinyanga, Tanzania",
      phone: "+255 739 039 449",
      email: "info@karenahotel.co.tz",
      hours: "Masaa 24 / Siku 7 za Wiki"
    },
    modal: {
      title: "Kamilisha Uwekaji wa Akiba Chumba",
      subTitle: "Jaza maelezo yako hapa chini kutuma ombi rasmi kwa njia ya WhatsApp.",
      fullName: "Jina Lako Kamili",
      phone: "Namba ya Simu / WhatsApp",
      email: "Barua Pepe (Hiari)",
      specialReq: "Mahitaji Maalum au Maelezo ya Ziada",
      nights: "Idadi ya Usiku",
      totalEst: "Makisio ya Jumla",
      confirmBtn: "Tuma Maombi WhatsApp"
    },
    contact: {
      title: "Tutumie Ujumbe",
      subtitle: "Je, una swali au hitaji maalum? Tutumie ujumbe hapa utafika WhatsApp papo hapo.",
      name: "Jina Lako",
      message: "Ujumbe Wako",
      sendBtn: "Tuma Ujumbe WhatsApp"
    },
    footer: {
      tagline: "Nyumba yako ya pili ya anasa na utulivu katikati ya Mji wa Shinyanga.",
      rights: "Haki zote zimehifadhiwa. Karena Hotel Shinyanga."
    }
  },
  en: {
    nav: {
      home: "Home",
      rooms: "Rooms & Suites",
      dining: "Restaurant & Dining",
      conference: "Conferences",
      location: "Location",
      contact: "Contact Us",
      bookNow: "Book Room",
      quickCall: "Call Now"
    },
    hero: {
      badge: "★ Premium Hotel in Shinyanga",
      title: "Welcome to Karena Hotel Shinyanga",
      subtitle: "Experience tranquility, luxury, and unmatched Tanzanian hospitality in Shinyanga town. Luxurious rooms, delicious dining, and state-of-the-art conference facilities.",
      searchHeader: "Check Room Availability",
      checkIn: "Check-in Date",
      checkOut: "Check-out Date",
      roomType: "Room Type",
      guests: "Guests",
      searchBtn: "Check Availability on WhatsApp",
      allTypes: "All Room Types"
    },
    pitchBanner: {
      tag: "PITCH INTEGRATION FEATURE",
      text: "This application is fully pre-integrated with direct WhatsApp messaging (+255 739 039 449). Every form and order button transmits precise booking details directly to WhatsApp!"
    },
    amenities: {
      title: "Our Hotel Amenities",
      subtitle: "Designed to provide maximum comfort whether you are visiting Shinyanga for business or leisure.",
      wifi: "High-Speed Wi-Fi Internet",
      ac: "Air Conditioning in all rooms",
      parking: "24/7 Secure Parking",
      reception: "24-Hour Front Desk Service",
      restaurant: "Local & International Restaurant",
      tv: "Smart TV with DStv Channels",
      coffee: "Complimentary Breakfast",
      conference: "Modern Conference Hall"
    },
    rooms: {
      title: "Our Executive Accommodation",
      subtitle: "Select from our range of well-appointed rooms tailored to your budget and needs.",
      perNight: "per night",
      bookBtn: "Book Now (WhatsApp)",
      detailsBtn: "View Details",
      filterAll: "All Rooms",
      capacity: "Guests",
      bed: "Bed",
      size: "Size"
    },
    dining: {
      badge: "Karena Restaurant",
      title: "Exquisite Dining & Cuisine",
      subtitle: "Savor authentic Tanzanian specialties alongside international culinary delights prepared by our expert chefs.",
      orderBtn: "Order Now via WhatsApp",
      menuTitle: "Popular Dishes"
    },
    conference: {
      badge: "Meetings & Events",
      title: "Modern Conference Hall",
      subtitle: "Host successful business meetings, corporate workshops, and private celebrations with modern audiovisual equipment and catering.",
      feature1: "150+ Guest Capacity",
      feature2: "HD Projector & Sound System",
      feature3: "Tea Breaks & Buffet Lunch",
      inquireBtn: "Request Quote via WhatsApp"
    },
    location: {
      title: "Our Location in Shinyanga",
      subtitle: "Conveniently located in the peaceful Kambarage district of Shinyanga Town, with easy access to major highways.",
      address: "Kambarage Area, Shinyanga Urban, Tanzania",
      phone: "+255 739 039 449",
      email: "info@karenahotel.co.tz",
      hours: "24 Hours / 7 Days a Week"
    },
    modal: {
      title: "Complete Your Room Reservation",
      subTitle: "Fill in your details below to instantly dispatch your booking request directly to our front desk via WhatsApp.",
      fullName: "Full Name",
      phone: "Phone / WhatsApp Number",
      email: "Email Address (Optional)",
      specialReq: "Special Requests or Preferences",
      nights: "Number of Nights",
      totalEst: "Estimated Total",
      confirmBtn: "Send Reservation on WhatsApp"
    },
    contact: {
      title: "Send Us a Message",
      subtitle: "Have a general inquiry or special reservation request? Send us a direct WhatsApp message.",
      name: "Your Name",
      message: "Your Message",
      sendBtn: "Send WhatsApp Message"
    },
    footer: {
      tagline: "Your luxurious home away from home in the heart of Shinyanga Town.",
      rights: "All rights reserved. Karena Hotel Shinyanga."
    }
  }
};

const ROOMS_DATA = [
  {
    id: 'deluxe',
    name: { sw: "Chumba cha Deluxe Standard", en: "Deluxe Standard Room" },
    priceTZS: 65000,
    category: "deluxe",
    image: IMAGES.rooms.deluxe,
    capacity: "2 Guests",
    bed: "1 King Bed / Queen",
    size: "28 m²",
    features: {
      sw: ["Kiyoyozi (AC)", "Smart TV & DStv", "Inthaneti ya Bure", "Kiamsha Kinywa cha Bure"],
      en: ["Air Conditioning", "Smart TV & DStv", "Free Wi-Fi", "Free Breakfast included"]
    }
  },
  {
    id: 'executive',
    name: { sw: "Chumba cha Executive Master", en: "Executive Master Room" },
    priceTZS: 95000,
    category: "executive",
    image: IMAGES.rooms.executive,
    capacity: "2 Guests + 1 Child",
    bed: "1 Super King Bed",
    size: "38 m²",
    features: {
      sw: ["Eneo la Sebule", "Mini Fridge", "Kiyoyozi cha Kisasa", "Kiamsha Kinywa cha Premium", "Inthaneti ya Kasi"],
      en: ["Seating Lounge Area", "Mini Fridge", "Modern AC", "Premium Breakfast", "High-speed Wi-Fi"]
    }
  },
  {
    id: 'suite',
    name: { sw: "VIP Royal Suite", en: "VIP Royal Suite" },
    priceTZS: 150000,
    category: "suite",
    image: IMAGES.rooms.suite,
    capacity: "2 Adults + 2 Children",
    bed: "King Suite + Lounge",
    size: "52 m²",
    features: {
      sw: ["Sebule Kubwa", "Bafu la Kifahari (Bathtub)", "Balconi Yenye Muonekano Mzuri", "Chai/Kawa za Bure", "Huduma za VIP"],
      en: ["Spacious Living Room", "Luxury Bathtub", "Private Balcony View", "Free Tea/Coffee Station", "VIP Butler Service"]
    }
  },
  {
    id: 'family',
    name: { sw: "Chumba cha Familia (Family Suite)", en: "Family Connected Suite" },
    priceTZS: 180000,
    category: "suite",
    image: IMAGES.rooms.family,
    capacity: "4 - 5 Guests",
    bed: "2 King Beds",
    size: "60 m²",
    features: {
      sw: ["Vitanda Viwili Vikubwa", "Bafu Mbili Za Kujitegemea", "TV Mbili za Smart", "Kiamsha Kinywa cha Familia yote"],
      en: ["Two Master Bedrooms", "2 Private En-suite Bathrooms", "2 Smart TVs", "Full Family Breakfast"]
    }
  }
];

const DINING_ITEMS = [
  {
    id: "nyama-choma",
    title: { sw: "Nyama Choma Mwanana na Ndizi/Ugalia", en: "Signature Grilled Goat Meat (Nyama Choma)" },
    desc: { sw: "Nyama laini ya mbuzi iliyochomwa vizuri na viungo vya asili, inasindikizwa na kachumbari na ndizi au ugali.", en: "Succulent tender grilled goat meat served with fresh kachumbari salad and plantains or ugali." },
    priceTZS: 25000,
    image: IMAGES.dining.nyamaChoma
  },
  {
    id: "tilapia",
    title: { sw: "Samaki Tilapia wa Ziwa Victoria", en: "Fresh Lake Victoria Whole Tilapia" },
    desc: { sw: "Samaki mzima aliyekaangwa au kupikwa kwa mchuzi wa nazi, akisindikizwa na ugali na mboga za majani.", en: "Whole fresh Lake Victoria Tilapia, deep-fried or poached in rich coconut gravy with ugali & greens." },
    priceTZS: 28000,
    image: IMAGES.dining.tilapia
  },
  {
    id: "breakfast",
    title: { sw: "Kiamsha Kinywa cha Kifalme (Karena Buffet)", en: "Karena Royal Buffet Breakfast" },
    desc: { sw: "Mayai, sausage, maharagwe, maandazi, matunda mapya na chai ya viungo au kahawa ya Kitanzania.", en: "Assorted eggs, sausages, baked beans, traditional pastries, fresh fruits, and hot Tanzanian spiced tea." },
    priceTZS: 18000,
    image: IMAGES.dining.breakfast
  }
];

export default function App() {
  const [lang, setLang] = useState('sw');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Booking Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRoom, setModalRoom] = useState(null);
  
  // Form State for Quick Search
  const [heroSearch, setHeroSearch] = useState({
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    roomType: 'Deluxe Standard Room',
    guests: '2'
  });

  // Modal Form State
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    checkIn: heroSearch.checkIn,
    checkOut: heroSearch.checkOut,
    guests: '2',
    specialReq: ''
  });

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    phoneOrEmail: '',
    message: ''
  });

  const texts = TRANSLATIONS[lang];

  // Language switch helper
  const toggleLanguage = () => {
    setLang(prev => prev === 'sw' ? 'en' : 'sw');
  };

  // Action 1: Hero Search to WhatsApp
  const handleHeroSearchWhatsApp = (e) => {
    e.preventDefault();
    const msg = lang === 'sw' 
      ? `Habari Karena Hotel Shinyanga! 👋\n\nNingependa kuangalia nafasi ya chumba kulingana na maelezo yafuatayo:\n\n📅 Tarehe ya Kuingia: ${heroSearch.checkIn}\n📅 Tarehe ya Kuondoka: ${heroSearch.checkOut}\n🛏️ Aina ya Chumba: ${heroSearch.roomType}\n👥 Idadi ya Wageni: ${heroSearch.guests}\n\nTafadhali ninomba mnijulishe kama kuna nafasi na utaratibu wa malipo.`
      : `Hello Karena Hotel Shinyanga! 👋\n\nI would like to check room availability for the following details:\n\n📅 Check-in Date: ${heroSearch.checkIn}\n📅 Check-out Date: ${heroSearch.checkOut}\n🛏️ Room Type: ${heroSearch.roomType}\n👥 Number of Guests: ${heroSearch.guests}\n\nPlease let me know if rooms are available and booking steps.`;
    
    sendWhatsAppMessage(msg);
  };

  // Action 2: Open Modal for Specific Room
  const openBookingModal = (room) => {
    setModalRoom(room);
    setBookingForm(prev => ({
      ...prev,
      checkIn: heroSearch.checkIn,
      checkOut: heroSearch.checkOut
    }));
    setIsModalOpen(true);
  };

  // Action 3: Submit Booking Modal to WhatsApp
  const handleModalBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) {
      alert(lang === 'sw' ? 'Tafadhali jaza Jina na Namba ya Simu.' : 'Please fill in your Name and Phone number.');
      return;
    }

    const roomName = modalRoom ? modalRoom.name[lang] : heroSearch.roomType;
    const pricePerNight = modalRoom ? modalRoom.priceTZS : 65000;
    
    // Calculate nights
    const d1 = new Date(bookingForm.checkIn);
    const d2 = new Date(bookingForm.checkOut);
    const timeDiff = d2.getTime() - d1.getTime();
    const nights = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
    const totalTZS = pricePerNight * nights;

    const msg = lang === 'sw'
      ? `Habari Karena Hotel! 🏨\n*OMBI LA KUWEKA AKIBA YA CHUMBA (RESERVATION)*\n-------------------------------\n👤 *Jina:* ${bookingForm.name}\n📞 *Simu:* ${bookingForm.phone}\n📧 *Email:* ${bookingForm.email || 'N/A'}\n\n🛏️ *Chumba:* ${roomName}\n📅 *Kuingia:* ${bookingForm.checkIn}\n📅 *Kuondoka:* ${bookingForm.checkOut}\n🌙 *Idadi ya Usiku:* ${nights}\n👥 *Wageni:* ${bookingForm.guests}\n\n💰 *Makisio ya Bei:* TZS ${totalTZS.toLocaleString()}\n📝 *Maelezo Ziada:* ${bookingForm.specialReq || 'Hamna'}\n-------------------------------\nTafadhali nithibitishie akiba hii.`
      : `Hello Karena Hotel! 🏨\n*ROOM RESERVATION REQUEST*\n-------------------------------\n👤 *Name:* ${bookingForm.name}\n📞 *Phone:* ${bookingForm.phone}\n📧 *Email:* ${bookingForm.email || 'N/A'}\n\n🛏️ *Room:* ${roomName}\n📅 *Check-in:* ${bookingForm.checkIn}\n📅 *Check-out:* ${bookingForm.checkOut}\n🌙 *Nights:* ${nights}\n👥 *Guests:* ${bookingForm.guests}\n\n💰 *Estimated Total:* TZS ${totalTZS.toLocaleString()}\n📝 *Special Request:* ${bookingForm.specialReq || 'None'}\n-------------------------------\nPlease confirm my booking availability.`;

    sendWhatsAppMessage(msg);
    setIsModalOpen(false);
  };

  // Action 4: Food Order to WhatsApp
  const handleFoodOrderWhatsApp = (item) => {
    const msg = lang === 'sw'
      ? `Habari Mkahawa wa Karena Hotel! 🍽️\n\nNingependa kuagiza chakula kifuatacho:\n📌 *Chakula:* ${item.title[lang]}\n💰 *Bei:* TZS ${item.priceTZS.toLocaleString()}\n\nTafadhali nijulishe muda wa maandalizi na kama mnaweza kuniletea au kukiweka tayari.`
      : `Hello Karena Hotel Restaurant! 🍽️\n\nI would like to place an order for the following item:\n📌 *Dish:* ${item.title[lang]}\n💰 *Price:* TZS ${item.priceTZS.toLocaleString()}\n\nPlease inform me of the preparation time or delivery options.`;

    sendWhatsAppMessage(msg);
  };

  // Action 5: Conference Inquiry to WhatsApp
  const handleConferenceInquiryWhatsApp = () => {
    const msg = lang === 'sw'
      ? `Habari Karena Hotel Shinyanga! 🏛️\n\nNingependa kupata nukuu ya bei na maelezo zaidi ya *Ukumbi wa Mikutano na Matukio* (Conference Hall).\n\nTafadhali mnipigie simu au mnitumie maelezo ya package zenu na chakula cha mikutano.`
      : `Hello Karena Hotel Shinyanga! 🏛️\n\nI would like to request a price quote and details regarding your *Conference & Meeting Facilities*.\n\nPlease share details about hall capacity, catering packages, and availability.`;

    sendWhatsAppMessage(msg);
  };

  // Action 6: Direct Contact Form to WhatsApp
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.message) {
      alert(lang === 'sw' ? 'Tafadhali jaza Jina na Ujumbe.' : 'Please fill in your Name and Message.');
      return;
    }

    const msg = lang === 'sw'
      ? `Habari Karena Hotel Shinyanga! 📩\n\n*UJUMBE MPYA KUTOKA KWENYE WEBSITE*\n👤 *Jina:* ${contactForm.name}\n📱 *Mawasiliano:* ${contactForm.phoneOrEmail}\n💬 *Ujumbe:* ${contactForm.message}`
      : `Hello Karena Hotel Shinyanga! 📩\n\n*NEW WEBSITE INQUIRY*\n👤 *Name:* ${contactForm.name}\n📱 *Contact:* ${contactForm.phoneOrEmail}\n💬 *Message:* ${contactForm.message}`;

    sendWhatsAppMessage(msg);
    setContactForm({ name: '', phoneOrEmail: '', message: '' });
  };

  const filteredRooms = useMemo(() => {
    if (selectedCategory === 'all') return ROOMS_DATA;
    return ROOMS_DATA.filter(r => r.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-amber-500 selection:text-white">

      {}
      <div className="bg-amber-600 text-white px-4 py-2 text-xs md:text-sm font-medium shadow-inner flex items-center justify-between">
        <div className="container mx-auto flex items-center gap-2 justify-center text-center">
          <Info className="w-4 h-4 shrink-0 animate-pulse" />
          <span>
            <strong className="underline uppercase mr-1">{texts.pitchBanner.tag}:</strong>
            {texts.pitchBanner.text}
          </span>
        </div>
      </div>

      {}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 shadow-lg">
        <div className="container mx-auto px-4 py-3.5 flex items-center justify-between">
          
          {/* Hotel Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-900 font-black text-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              K
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight block leading-tight text-white group-hover:text-amber-400 transition-colors">
                KARENA HOTEL
              </span>
              <span className="text-[10px] uppercase tracking-widest text-amber-400/90 font-semibold block">
                Shinyanga • Tanzania
              </span>
            </div>
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#home" className="hover:text-amber-400 transition-colors">{texts.nav.home}</a>
            <a href="#rooms" className="hover:text-amber-400 transition-colors">{texts.nav.rooms}</a>
            <a href="#dining" className="hover:text-amber-400 transition-colors">{texts.nav.dining}</a>
            <a href="#conference" className="hover:text-amber-400 transition-colors">{texts.nav.conference}</a>
            <a href="#location" className="hover:text-amber-400 transition-colors">{texts.nav.location}</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">{texts.nav.contact}</a>
          </nav>

          {/* Action CTAs & Language Switcher */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold border border-slate-700 text-amber-300 transition-all cursor-pointer"
              title="Change Language / Badili Lugha"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'sw' ? 'SW' : 'EN'}</span>
            </button>

            {/* Quick Phone Call */}
            <a 
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+255 739 039 449</span>
            </a>

            {/* Primary WhatsApp CTA */}
            <button 
              onClick={() => openBookingModal(ROOMS_DATA[0])}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md hover:shadow-emerald-900/30 flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>{texts.nav.bookNow}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button 
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-md bg-slate-800 text-amber-300 text-xs font-bold border border-slate-700"
            >
              {lang === 'sw' ? 'SW' : 'EN'}
            </button>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
            <a 
              href="#home" 
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-amber-400 font-medium"
            >
              {texts.nav.home}
            </a>
            <a 
              href="#rooms" 
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-amber-400 font-medium"
            >
              {texts.nav.rooms}
            </a>
            <a 
              href="#dining" 
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-amber-400 font-medium"
            >
              {texts.nav.dining}
            </a>
            <a 
              href="#conference" 
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-amber-400 font-medium"
            >
              {texts.nav.conference}
            </a>
            <a 
              href="#location" 
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-amber-400 font-medium"
            >
              {texts.nav.location}
            </a>
            
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <a 
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="w-full py-2.5 rounded-lg bg-slate-800 text-center text-slate-200 font-medium text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>+255 739 039 449</span>
              </a>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  openBookingModal(ROOMS_DATA[0]);
                }}
                className="w-full py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{texts.nav.bookNow}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {}
      <section id="home" className="relative min-h-[85vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        {/* Background Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.hero} 
            alt="Karena Hotel Shinyanga Exterior" 
            className="w-full h-full object-cover object-center filter brightness-50 transform scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-950/40" />
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10 text-white">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {texts.hero.badge}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              {texts.hero.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
              {texts.hero.subtitle}
            </p>

            {/* QUICK BOOKING / SEARCH BAR (CONNECTED TO WHATSAPP) */}
            <div className="mt-8 bg-slate-900/90 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-slate-700/80 shadow-2xl text-left max-w-4xl mx-auto">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {texts.hero.searchHeader}
              </div>

              <form onSubmit={handleHeroSearchWhatsApp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Check In */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">{texts.hero.checkIn}</label>
                  <input 
                    type="date"
                    value={heroSearch.checkIn}
                    onChange={(e) => setHeroSearch({...heroSearch, checkIn: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>

                {/* Check Out */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">{texts.hero.checkOut}</label>
                  <input 
                    type="date"
                    value={heroSearch.checkOut}
                    onChange={(e) => setHeroSearch({...heroSearch, checkOut: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>

                {/* Room Type */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">{texts.hero.roomType}</label>
                  <select 
                    value={heroSearch.roomType}
                    onChange={(e) => setHeroSearch({...heroSearch, roomType: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="Deluxe Standard Room">Deluxe Standard Room</option>
                    <option value="Executive Master Room">Executive Master Room</option>
                    <option value="VIP Royal Suite">VIP Royal Suite</option>
                    <option value="Family Connected Suite">Family Connected Suite</option>
                  </select>
                </div>

                {/* Guests & Submit */}
                <div className="flex flex-col justify-end">
                  <button 
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-emerald-600 group-hover:scale-110 transition-transform" />
                    <span className="text-xs sm:text-sm">{texts.hero.searchBtn}</span>
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </section>

      {}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {texts.amenities.title}
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              {texts.amenities.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-300 hover:shadow-md transition-all flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Wifi className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{texts.amenities.wifi}</h3>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-300 hover:shadow-md transition-all flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Wind className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{texts.amenities.ac}</h3>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-300 hover:shadow-md transition-all flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{texts.amenities.parking}</h3>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-300 hover:shadow-md transition-all flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{texts.amenities.reception}</h3>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-300 hover:shadow-md transition-all flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{texts.amenities.restaurant}</h3>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-300 hover:shadow-md transition-all flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Tv className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{texts.amenities.tv}</h3>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-300 hover:shadow-md transition-all flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{texts.amenities.coffee}</h3>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-300 hover:shadow-md transition-all flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{texts.amenities.conference}</h3>
            </div>

          </div>

        </div>
      </section>

      {}
      <section id="rooms" className="py-20 bg-slate-100">
        <div className="container mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
              Karena Accommodations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              {texts.rooms.title}
            </h2>
            <p className="mt-2 text-slate-600">
              {texts.rooms.subtitle}
            </p>

            {/* Filter Tabs */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {texts.rooms.filterAll}
              </button>
              <button
                onClick={() => setSelectedCategory('deluxe')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === 'deluxe'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Deluxe Standard
              </button>
              <button
                onClick={() => setSelectedCategory('executive')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === 'executive'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Executive Master
              </button>
              <button
                onClick={() => setSelectedCategory('suite')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === 'suite'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Suites & Family
              </button>
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredRooms.map((room) => {
              const usdPrice = Math.round(room.priceTZS / USD_EXCHANGE_RATE);
              return (
                <div 
                  key={room.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-slate-200 flex flex-col group"
                >
                  {/* Room Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={room.image} 
                      alt={room.name[lang]} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md text-amber-400 font-extrabold px-3.5 py-1.5 rounded-full text-sm shadow-md">
                      TZS {room.priceTZS.toLocaleString()} <span className="text-xs text-slate-300 font-normal">/ {texts.rooms.perNight}</span>
                    </div>
                    <div className="absolute bottom-3 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs flex items-center gap-3">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {room.capacity}</span>
                      <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" /> {room.size}</span>
                    </div>
                  </div>

                  {/* Room Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                          {room.name[lang]}
                        </h3>
                        <span className="text-xs text-slate-500 font-semibold">
                          ~ USD ${usdPrice}
                        </span>
                      </div>

                      <ul className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
                        {room.features[lang].map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Booking WhatsApp Action */}
                    <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                      <button 
                        onClick={() => openBookingModal(room)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-900/20 transition-all cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                        <span>{texts.rooms.bookBtn}</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {}
      <section id="dining" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/20 px-3.5 py-1 rounded-full border border-amber-500/30">
              {texts.dining.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
              {texts.dining.title}
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base">
              {texts.dining.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {DINING_ITEMS.map((item) => (
              <div 
                key={item.id} 
                className="bg-slate-800/90 rounded-3xl overflow-hidden border border-slate-700/80 shadow-xl flex flex-col justify-between hover:border-amber-500/50 transition-all group"
              >
                <div>
                  <div className="h-52 overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.title[lang]} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 right-3 bg-amber-500 text-slate-950 font-black px-3 py-1 rounded-lg text-xs shadow-md">
                      TZS {item.priceTZS.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {item.title[lang]}
                    </h3>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                      {item.desc[lang]}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button 
                    onClick={() => handleFoodOrderWhatsApp(item)}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                    <span>{texts.dining.orderBtn}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {}
      <section id="conference" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-gradient-to-br from-amber-500/10 via-slate-50 to-amber-100/40 rounded-3xl border border-amber-200/70 p-6 sm:p-10 md:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-200/80 px-3 py-1 rounded-full">
                  {texts.conference.badge}
                </span>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {texts.conference.title}
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {texts.conference.subtitle}
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-slate-800 text-sm font-semibold">
                    <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 text-xs">✓</div>
                    <span>{texts.conference.feature1}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-800 text-sm font-semibold">
                    <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 text-xs">✓</div>
                    <span>{texts.conference.feature2}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-800 text-sm font-semibold">
                    <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 text-xs">✓</div>
                    <span>{texts.conference.feature3}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={handleConferenceInquiryWhatsApp}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                    <span>{texts.conference.inquireBtn}</span>
                  </button>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-80 lg:h-96">
                <img 
                  src={IMAGES.conference} 
                  alt="Karena Hotel Conference Hall" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/20" />
              </div>

            </div>
          </div>
        </div>
      </section>

      {}
      <section id="location" className="py-20 bg-slate-100 border-t border-slate-200">
        <div className="container mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {texts.location.title}
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              {texts.location.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* Contact Details Card */}
            <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-200 space-y-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  Karena Hotel Shinyanga
                </h3>

                <div className="space-y-4 text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900">Anwani / Address:</strong>
                      <span>{texts.location.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900">Simu / WhatsApp:</strong>
                      <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-amber-600 font-semibold">{texts.location.phone}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900">Masaa ya Kazi / Hours:</strong>
                      <span>{texts.location.hours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form Connected to WhatsApp */}
              <div id="contact" className="pt-6 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 mb-3">{texts.contact.title}</h4>
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <input 
                    type="text"
                    placeholder={texts.contact.name}
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                  <input 
                    type="text"
                    placeholder="Phone / WhatsApp / Email"
                    value={contactForm.phoneOrEmail}
                    onChange={(e) => setContactForm({...contactForm, phoneOrEmail: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <textarea 
                    rows={3}
                    placeholder={texts.contact.message}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                  <button 
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                    <span>{texts.contact.sendBtn}</span>
                  </button>
                </form>
              </div>

            </div>

            {/* Embedded Location Map Visual Component */}
            <div className="bg-slate-800 rounded-3xl overflow-hidden shadow-md border border-slate-700 min-h-[350px] relative flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Eneo la Kambarage, Shinyanga Urban</h3>
              <p className="text-xs text-slate-300 max-w-sm mb-6">
                Bofya hapa chini kufungua ramani rasmi ya Google Maps ili kufika Karena Hotel Shinyanga bila shida.
              </p>
              <a 
                href="https://maps.google.com/?q=Shinyanga+Tanzania+Kambarage" 
                target="_blank" 
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
              >
                <span>Fungua Google Maps</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      </section>

      {}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-base">
                K
              </div>
              <span className="text-lg font-bold text-white">Karena Hotel Shinyanga</span>
            </div>
            <p className="text-slate-400 text-center md:text-left">
              {texts.footer.tagline}
            </p>
            <div className="flex items-center gap-4 text-amber-400">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <span>•</span>
              <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:underline flex items-center gap-1">
                <Phone className="w-4 h-4" /> Call Front Desk
              </a>
            </div>
          </div>
          <div className="pt-6 text-center text-slate-500">
            © {new Date().getFullYear()} Karena Hotel Shinyanga. {texts.footer.rights}
          </div>
        </div>
      </footer>

      {}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          lang === 'sw' 
            ? 'Habari Karena Hotel! Ningependa kufanya ulizio.' 
            : 'Hello Karena Hotel! I would like to make an inquiry.'
        )}`}
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
        title="Direct WhatsApp Chat"
      >
        <MessageCircle className="w-7 h-7 fill-white text-emerald-600" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-2">
          Chat WhatsApp
        </span>
      </a>

      {}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-amber-400">{texts.modal.title}</h3>
                <p className="text-xs text-slate-300 mt-0.5">{texts.modal.subTitle}</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selected Room Badge */}
            {modalRoom && (
              <div className="bg-amber-50 px-5 py-3 border-b border-amber-200/60 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">{modalRoom.name[lang]}</span>
                <span className="font-black text-amber-700">TZS {modalRoom.priceTZS.toLocaleString()} / night</span>
              </div>
            )}

            {/* Modal Form */}
            <form onSubmit={handleModalBookingSubmit} className="p-5 space-y-4 text-xs">
              
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{texts.modal.fullName} *</label>
                <input 
                  type="text" 
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  placeholder="e.g. John Hosea"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{texts.modal.phone} *</label>
                  <input 
                    type="tel" 
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="e.g. 0739039449"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{texts.modal.email}</label>
                  <input 
                    type="email" 
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="name@gmail.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{texts.hero.checkIn}</label>
                  <input 
                    type="date" 
                    value={bookingForm.checkIn}
                    onChange={(e) => setBookingForm({...bookingForm, checkIn: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{texts.hero.checkOut}</label>
                  <input 
                    type="date" 
                    value={bookingForm.checkOut}
                    onChange={(e) => setBookingForm({...bookingForm, checkOut: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{texts.modal.specialReq}</label>
                <textarea 
                  rows={2}
                  value={bookingForm.specialReq}
                  onChange={(e) => setBookingForm({...bookingForm, specialReq: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  placeholder={lang === 'sw' ? 'Mfano: Nitaingia usiku sana, au nahitaji kitanda cha ziwa...' : 'e.g. Late arrival, extra pillow, etc.'}
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
                <button 
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                  <span className="text-xs sm:text-sm">{texts.modal.confirmBtn}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}