/* Mark Safaris — site configuration
   -----------------------------------------------------------
   Fill in the EMAILJS_* values after creating a free account at
   https://www.emailjs.com — see README.md for the exact steps.
   Until you do, the site still works: booking and contact
   details fall back to opening the visitor's email app instead
   of sending automatically. */

const SITE_CONFIG = {
  businessName: "Mark Safaris",
  ownerEmail: "safarismark@gmail.com",
  whatsappNumber: "255746239498", // international format, no + or spaces

  bank: {
    bankName: "National Microfinance Bank PLC (NMB)",
    accountName: "MAKENGO JUSTINE LEONARD",
    swiftCode: "NMIBTZTZ",
    routingNumber: "NMIBTZTZ",
    city: "ARUSHA"
  },

  // --- EmailJS (for automatic email notifications) ---
  // Leave these as "YOUR_..." to disable automatic email sending;
  // the site will use a mailto: fallback instead.
  emailjs: {
    publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
    serviceId: "YOUR_EMAILJS_SERVICE_ID",
    bookingTemplateId: "YOUR_EMAILJS_BOOKING_TEMPLATE_ID",
    contactTemplateId: "YOUR_EMAILJS_CONTACT_TEMPLATE_ID"
  },

  // Simple admin panel password (client-side only — see README for
  // why this is NOT strong security, and how to lock it down properly).
  adminPassword: "safari2026"
};

function emailjsIsConfigured() {
  const c = SITE_CONFIG.emailjs;
  return c.publicKey && !c.publicKey.startsWith("YOUR_") &&
         c.serviceId && !c.serviceId.startsWith("YOUR_");
}

function waLink(message) {
  return "https://wa.me/" + SITE_CONFIG.whatsappNumber + "?text=" + encodeURIComponent(message);
}
