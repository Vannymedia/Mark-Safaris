/* Mark Safaris — admin panel logic
   -----------------------------------------------------------
   Edits are saved to localStorage under "markSafarisPackages"
   and override js/data.js's BASE_PACKAGES for this browser.
   Use Export/Import to move edits between browsers, or to hand
   an updated file to whoever maintains the live site. */

let editingId = null;

function isUnlocked() {
  return sessionStorage.getItem("markSafarisAdmin") === "yes";
}

function initAdminAuth() {
  if (isUnlocked()) return showAdmin();
  document.getElementById("pw-submit").addEventListener("click", tryUnlock);
  document.getElementById("pw-input").addEventListener("keydown", e => { if (e.key === "Enter") tryUnlock(); });
}

function tryUnlock() {
  const val = document.getElementById("pw-input").value;
  if (val === SITE_CONFIG.adminPassword) {
    sessionStorage.setItem("markSafarisAdmin", "yes");
    showAdmin();
  } else {
    document.getElementById("pw-error").textContent = "Incorrect password.";
  }
}

function showAdmin() {
  document.getElementById("lock").style.display = "none";
  document.getElementById("admin-app").style.display = "block";
  renderRows();
  bindAdminActions();
}

function savePackages(list) {
  localStorage.setItem("markSafarisPackages", JSON.stringify(list));
}

function renderRows() {
  const list = getPackages();
  document.getElementById("pkg-rows").innerHTML = list.map(p => `
    <tr>
      <td><img class="admin-thumb" src="${p.thumb || p.image || 'images/placeholder.svg'}" alt=""
               onerror="this.onerror=null;this.src='images/placeholder.svg';"></td>
      <td>${p.name}<br><span class="pill gold">${p.id}</span></td>
      <td>${p.park}</td>
      <td>${fmtPrice(p.price)}</td>
      <td>${p.days}d / ${p.nights}n</td>
      <td><button class="btn btn-ghost" data-edit="${p.id}">Edit</button></td>
    </tr>
  `).join("");
  document.querySelectorAll("[data-edit]").forEach(btn =>
    btn.addEventListener("click", () => openEdit(btn.getAttribute("data-edit")))
  );
}

function slugify(s) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function openEdit(id) {
  const list = getPackages();
  let pkg = list.find(p => p.id === id);
  const isNew = !pkg;
  if (isNew) {
    pkg = {
      id: "new-package-" + Date.now(), name: "New Package", park: "", price: 0, days: 1, nights: 0,
      groupSize: "1–6 travelers", bestTime: "", image: "", thumb: "", tagline: "", description: "",
      highlights: [], itinerary: [{ day: 1, title: "Arrival", text: "" }]
    };
  }
  editingId = pkg.id;
  document.getElementById("edit-heading").textContent = isNew ? "Add package" : "Edit package";
  document.getElementById("e-name").value = pkg.name;
  document.getElementById("e-park").value = pkg.park;
  document.getElementById("e-price").value = pkg.price;
  document.getElementById("e-days").value = pkg.days;
  document.getElementById("e-nights").value = pkg.nights;
  document.getElementById("e-group").value = pkg.groupSize;
  document.getElementById("e-besttime").value = pkg.bestTime;
  document.getElementById("e-image").value = pkg.image;
  document.getElementById("e-tagline").value = pkg.tagline;
  document.getElementById("e-description").value = pkg.description;
  document.getElementById("e-highlights").value = (pkg.highlights || []).join("\n");
  document.getElementById("e-itinerary").value = (pkg.itinerary || [])
    .map(d => `${d.title} | ${d.text}`).join("\n");
  document.getElementById("edit-section").style.display = "block";
  document.getElementById("edit-section").scrollIntoView({ behavior: "smooth" });
}

function bindAdminActions() {
  document.getElementById("add-pkg").addEventListener("click", () => openEdit(null));
  document.getElementById("cancel-edit").addEventListener("click", () => {
    document.getElementById("edit-section").style.display = "none";
    editingId = null;
  });

  document.getElementById("save-pkg").addEventListener("click", () => {
    const list = getPackages();
    const idx = list.findIndex(p => p.id === editingId);
    const name = document.getElementById("e-name").value.trim();
    const itinerary = document.getElementById("e-itinerary").value.split("\n")
      .map(s => s.trim()).filter(Boolean).map((line, i) => {
        const [title, ...rest] = line.split("|");
        return { day: i + 1, title: (title || "").trim(), text: rest.join("|").trim() };
      });
    const updated = {
      id: idx > -1 ? editingId : (slugify(name) || editingId),
      name,
      park: document.getElementById("e-park").value.trim(),
      price: Number(document.getElementById("e-price").value) || 0,
      days: Number(document.getElementById("e-days").value) || 1,
      nights: Number(document.getElementById("e-nights").value) || 0,
      groupSize: document.getElementById("e-group").value.trim(),
      bestTime: document.getElementById("e-besttime").value.trim(),
      image: document.getElementById("e-image").value.trim(),
      thumb: document.getElementById("e-image").value.trim(),
      gallery: [],
      tagline: document.getElementById("e-tagline").value.trim(),
      description: document.getElementById("e-description").value.trim(),
      highlights: document.getElementById("e-highlights").value.split("\n").map(s => s.trim()).filter(Boolean),
      itinerary: itinerary.length ? itinerary : [{ day: 1, title: "Day 1", text: "" }]
    };
    if (idx > -1) list[idx] = updated; else list.push(updated);
    savePackages(list);
    renderRows();
    document.getElementById("edit-section").style.display = "none";
    editingId = null;
  });

  document.getElementById("delete-pkg").addEventListener("click", () => {
    if (!confirm("Delete this package? This cannot be undone in this browser.")) return;
    const list = getPackages().filter(p => p.id !== editingId);
    savePackages(list);
    renderRows();
    document.getElementById("edit-section").style.display = "none";
    editingId = null;
  });

  document.getElementById("export-json").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(getPackages(), null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "mark-safaris-packages.json";
    a.click();
  });

  document.getElementById("import-json").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!Array.isArray(data)) throw new Error("not an array");
        savePackages(data);
        renderRows();
        alert("Import successful.");
      } catch (err) {
        alert("Could not read that file — make sure it's a JSON export from this admin panel.");
      }
    };
    reader.readAsText(file);
  });

  document.getElementById("reset-defaults").addEventListener("click", () => {
    if (!confirm("Reset all packages to the original defaults? Your edits in this browser will be lost.")) return;
    localStorage.removeItem("markSafarisPackages");
    renderRows();
  });

  document.getElementById("logout").addEventListener("click", () => {
    sessionStorage.removeItem("markSafarisAdmin");
    location.reload();
  });
}

document.addEventListener("DOMContentLoaded", initAdminAuth);
