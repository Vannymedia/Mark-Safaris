/* Mark Safaris — booking flow
   -----------------------------------------------------------
   Handles: package selection, the 3-step booking flow, the
   generated booking reference, and sending a notification to
   the owner (SITE_CONFIG.ownerEmail) at two points:
     - as soon as the visitor reaches the bank-details step
     - if the visitor cancels from the bank-details step
   A third notification fires if they confirm they've paid.
   See js/config.js to enable automatic email via EmailJS —
   until configured, this falls back to opening the visitor's
   own email app addressed to the owner, and a WhatsApp link. */

let booking = {};
let emailSentForStage = {};

function initBookingForm() {
  const select = document.getElementById("f-package");
  const packages = getPackages();
  select.innerHTML = packages.map(p => `<option value="${p.id}">${p.name} — ${fmtPrice(p.price)}</option>`).join("");
  const presetId = getQueryParam("package");
  if (presetId && packages.some(p => p.id === presetId)) select.value = presetId;

  document.getElementById("details-form").addEventListener("submit", e => {
    e.preventDefault();
    booking = {
      packageId: select.value,
      name: document.getElementById("f-name").value.trim(),
      email: document.getElementById("f-email").value.trim(),
      phone: document.getElementById("f-phone").value.trim(),
      travelers: document.getElementById("f-travelers").value,
      date: document.getElementById("f-date").value,
      country: document.getElementById("f-country").value.trim(),
      notes: document.getElementById("f-notes").value.trim()
    };
    goToStep(2);
    renderSummary();
  });

  document.getElementById("back-to-1").addEventListener("click", () => goToStep(1));
  document.getElementById("go-to-3").addEventListener("click", () => {
    goToStep(3);
    enterBankDetailsStep();
  });
  document.getElementById("confirm-sent").addEventListener("click", onConfirmSent);
  document.getElementById("cancel-booking").addEventListener("click", onCancelBooking);
}

function goToStep(n) {
  [1, 2, 3].forEach(i => {
    document.getElementById("step-" + i).style.display = i === n ? "block" : "none";
    const nav = document.querySelector(`.step[data-step="${i}"]`);
    nav.classList.toggle("active", i === n);
    nav.classList.toggle("done", i < n);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderSummary() {
  const pkg = findPackage(booking.packageId);
  document.getElementById("summary-box").innerHTML = `
    <div class="summary-row"><span>Package</span><span>${pkg.name}</span></div>
    <div class="summary-row"><span>Traveler</span><span>${booking.name}</span></div>
    <div class="summary-row"><span>Email</span><span>${booking.email}</span></div>
    <div class="summary-row"><span>Phone</span><span>${booking.phone}</span></div>
    <div class="summary-row"><span>Travelers</span><span>${booking.travelers}</span></div>
    <div class="summary-row"><span>Preferred date</span><span>${booking.date || "Flexible"}</span></div>
    <div class="summary-row"><span>Est. total</span><span>${fmtPrice(pkg.price * Number(booking.travelers || 1))}</span></div>
  `;
}

function makeBookingRef() {
  return "MS-" + Date.now().toString(36).toUpperCase();
}

function enterBankDetailsStep() {
  if (!booking.ref) booking.ref = makeBookingRef();
  document.getElementById("booking-ref").textContent = booking.ref;

  const pkg = findPackage(booking.packageId);
  const waMsg = `Hi Mark Safaris, this is ${booking.name}. My booking reference is ${booking.ref} for the "${pkg.name}" package. Here is my payment proof:`;
  document.getElementById("wa-proof").href = waLink(waMsg);

  sendOwnerNotification("arrived", () => {});
}

function onConfirmSent() {
  sendOwnerNotification("confirmed", () => {});
  document.getElementById("final-message").innerHTML = `
    <div class="notice ok">Thank you — we've noted that you've made the transfer. We'll confirm your booking shortly once it's received. Feel free to also send your payment slip on WhatsApp for a faster confirmation.</div>`;
  document.getElementById("confirm-sent").setAttribute("disabled", "true");
  document.getElementById("cancel-booking").setAttribute("disabled", "true");
}

function onCancelBooking() {
  if (!confirm("Cancel this booking? We'll still keep a note of your details in case you'd like to pick this back up later.")) return;
  sendOwnerNotification("cancelled", () => {});
  document.getElementById("final-message").innerHTML = `
    <div class="notice warn">Your booking has been cancelled. No payment is required. If you change your mind, you're welcome to start again at any time.</div>`;
  document.getElementById("confirm-sent").setAttribute("disabled", "true");
  document.getElementById("cancel-booking").setAttribute("disabled", "true");
}

function stageLabel(stage) {
  return { arrived: "New booking — awaiting payment", confirmed: "Booking — customer says paid", cancelled: "Booking cancelled by customer" }[stage] || stage;
}

function sendOwnerNotification(stage, done) {
  // avoid duplicate sends for the same stage
  if (emailSentForStage[stage]) { done(); return; }
  emailSentForStage[stage] = true;

  const pkg = findPackage(booking.packageId);
  const statusEl = document.getElementById("email-status");

  const params = {
    to_email: SITE_CONFIG.ownerEmail,
    subject: `[${stageLabel(stage)}] ${booking.ref} — ${booking.name}`,
    stage: stageLabel(stage),
    booking_ref: booking.ref,
    customer_name: booking.name,
    customer_email: booking.email,
    customer_phone: booking.phone,
    package_name: pkg.name,
    travelers: booking.travelers,
    preferred_date: booking.date || "Flexible",
    country: booking.country || "—",
    notes: booking.notes || "—",
    est_total: fmtPrice(pkg.price * Number(booking.travelers || 1))
  };

  if (emailjsIsConfigured()) {
    emailjs.init(SITE_CONFIG.emailjs.publicKey);
    emailjs.send(SITE_CONFIG.emailjs.serviceId, SITE_CONFIG.emailjs.bookingTemplateId, params)
      .then(() => {
        if (statusEl) statusEl.textContent = "We've been notified of your booking. Reference: " + booking.ref;
        done();
      })
      .catch(() => {
        if (statusEl) statusEl.textContent = "Notification could not be sent automatically — please also message us on WhatsApp with your reference: " + booking.ref;
        done();
      });
  } else {
    // Fallback: open the visitor's own email app pre-addressed to the owner.
    const body = Object.entries(params).map(([k, v]) => `${k}: ${v}`).join("%0D%0A");
    const mailto = `mailto:${SITE_CONFIG.ownerEmail}?subject=${encodeURIComponent(params.subject)}&body=${body}`;
    if (statusEl) statusEl.textContent = "Automatic email isn't configured yet — please also confirm via WhatsApp with your reference: " + booking.ref;
    if (stage === "arrived") {
      const a = document.createElement("a");
      a.href = mailto;
      a.target = "_blank";
      a.click();
    }
    done();
  }
}

document.addEventListener("DOMContentLoaded", initBookingForm);
