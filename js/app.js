/* Mark Safaris — shared front-end logic */

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }
  document.querySelectorAll(".nav-links a").forEach(a => {
    if (a.getAttribute("href") === location.pathname.split("/").pop()) {
      a.classList.add("active");
    }
  });
}

function fmtPrice(n) {
  return "$" + Number(n).toLocaleString("en-US");
}

function pkgCardHTML(p) {
  return `
  <a class="pkg-card" href="package.html?id=${encodeURIComponent(p.id)}">
    <div class="thumb">
      <span class="park-tag">${p.park}</span>
      <img src="${p.thumb || p.image || 'images/placeholder.svg'}" alt="${p.name}" loading="lazy"
           onerror="this.onerror=null;this.src='images/placeholder.svg';">
    </div>
    <div class="body">
      <h3>${p.name}</h3>
      <p class="tagline">${p.tagline}</p>
      <div class="meta-row">
        <span class="days-badge">${p.days} day${p.days > 1 ? "s" : ""}</span>
        <span class="price">${fmtPrice(p.price)}<br><small>per person</small></span>
      </div>
    </div>
  </a>`;
}

function renderPackageGrid(targetSelector, opts = {}) {
  const el = document.querySelector(targetSelector);
  if (!el) return;
  let list = getPackages();
  if (opts.limit) list = list.slice(0, opts.limit);
  el.innerHTML = list.map(pkgCardHTML).join("");
}

function getQueryParam(name) {
  return new URLSearchParams(location.search).get(name);
}

function findPackage(id) {
  return getPackages().find(p => p.id === id);
}

function trailHTML(itinerary) {
  return `<div class="trail">` + itinerary.map(d => `
    <div class="trail-day">
      <span class="num">${String(d.day).padStart(2, "0")}</span>
      <h4>Day ${d.day} — ${d.title}</h4>
      <p>${d.text}</p>
    </div>`).join("") + `</div>`;
}

document.addEventListener("DOMContentLoaded", initNav);
