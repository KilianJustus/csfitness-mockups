/* CS FITNESS — globales "Book Free Session"-Modal
   Liegt auf JEDER Seite. Jeder Auslöser (.js-book bzw. href="#book") öffnet das
   Modal über der abgedunkelten Seite; die Studio-Auswahl führt auf die jeweilige
   Studio-Landingpage (locations.js -> page).
   Leaflet wird erst beim ersten Öffnen nachgeladen (hält alle Seiten leicht). */
(function () {
  var LOCS = window.CS_LOCATIONS || [];
  var userPos = null, map = null, homeMarker = null, built = false, leafletLoading = null;

  function el(id) { return document.getElementById(id); }

  function buildModal() {
    if (built) return;
    var wrap = document.createElement("div");
    wrap.className = "modal-backdrop";
    wrap.id = "locBackdrop";
    wrap.hidden = true;
    wrap.innerHTML =
      '<div class="modal modal-split" role="dialog" aria-modal="true" aria-labelledby="locTitle" style="position:relative">' +
        '<button class="modal-close" type="button" aria-label="Close">&times;</button>' +
        '<div class="modal-left">' +
          '<div class="modal-head">' +
            '<div class="eyebrow">Book your free session</div>' +
            '<h3 id="locTitle">Choose your studio</h3>' +
            "<p>Pick a location — or enter your address and we'll find the nearest studio for you.</p>" +
          "</div>" +
          '<div class="modal-search">' +
            '<div class="addr-row">' +
              '<input id="locSearch" type="text" placeholder="Your address or ZIP — e.g. 89012" autocomplete="off">' +
              '<button type="button" class="btn btn-primary" id="locFindBtn">Find nearest</button>' +
            "</div>" +
            '<div class="addr-hint" id="locHint">We only use your address to calculate the distance — nothing is stored.</div>' +
          "</div>" +
          '<div class="loc-list" id="locList"></div>' +
        "</div>" +
        '<div class="modal-map"><div id="locMap"></div></div>' +
      "</div>";
    document.body.appendChild(wrap);

    wrap.querySelector(".modal-close").addEventListener("click", close);
    wrap.addEventListener("click", function (e) { if (e.target === wrap) close(); });
    el("locFindBtn").addEventListener("click", findNearest);
    el("locSearch").addEventListener("keydown", function (e) { if (e.key === "Enter") findNearest(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !wrap.hidden) close(); });
    built = true;
  }

  function milesBetween(lat1, lng1, lat2, lng2) {
    var toR = Math.PI / 180, R = 3958.8;
    var dLat = (lat2 - lat1) * toR, dLng = (lng2 - lng1) * toR;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * toR) * Math.cos(lat2 * toR) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return R * 2 * Math.asin(Math.sqrt(h));
  }

  function sorted() {
    var arr = LOCS.slice();
    if (userPos) {
      arr.forEach(function (l) { l._mi = milesBetween(userPos.lat, userPos.lng, l.lat, l.lng); });
      arr.sort(function (a, b) { return a._mi - b._mi; });
    }
    return arr;
  }

  function renderList() {
    var list = el("locList");
    list.innerHTML = sorted().map(function (l, i) {
      var nearest = userPos && i === 0;
      var dist = userPos ? '<span class="dist-badge">' + l._mi.toFixed(1) + " mi</span>" : "";
      var tag = nearest ? '<span class="nearest-tag">Nearest</span>' : "";
      if (l.status !== "open") {
        return '<div class="loc-card soon"><span><b>' + l.name + "</b><span>" + l.city + ", " + l.state +
          " — opening soon</span></span><span class=\"go\">Soon</span></div>";
      }
      return '<button type="button" class="loc-card" data-id="' + l.id + '">' +
        "<span><b>" + l.name + tag + "</b><span>" + (l.address ? l.address + " · " : "") +
        l.city + ", " + l.state + " " + l.zip + "</span></span>" +
        '<span class="go">Select &rarr;' + dist + "</span></button>";
    }).join("");
    list.querySelectorAll("button.loc-card").forEach(function (b) {
      b.addEventListener("click", function () { go(b.getAttribute("data-id")); });
    });
  }

  /* Studio gewählt -> dedizierte Landingpage */
  function go(id) {
    var l = LOCS.find(function (x) { return x.id === id; });
    if (l && l.page) window.location.href = l.page;
  }
  window.csGoToStudio = go;

  /* --- Karte: Leaflet + OpenStreetMap, lazy geladen --- */
  function loadLeaflet() {
    if (window.L) return Promise.resolve();
    if (leafletLoading) return leafletLoading;
    leafletLoading = new Promise(function (resolve) {
      var css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(css);
      var js = document.createElement("script");
      js.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
      js.onload = resolve;
      js.onerror = resolve; // Karte optional — Auswahl funktioniert auch ohne
      document.head.appendChild(js);
    });
    return leafletLoading;
  }

  function initMap() {
    if (map || !window.L) return;
    map = L.map("locMap", { scrollWheelZoom: false }).setView([36.01, -115.07], 11);
    map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>');
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&copy; OpenStreetMap" }).addTo(map);
    LOCS.forEach(function (l, i) {
      var icon = L.divIcon({ className: "", html: '<div class="cs-pin"><span>' + (i + 1) + "</span></div>",
        iconSize: [30, 30], iconAnchor: [15, 28], popupAnchor: [0, -26] });
      L.marker([l.lat, l.lng], { icon: icon }).addTo(map)
        .bindPopup("<b>" + l.name + "</b><br>" + l.address + "<br>" + l.city + ", " + l.state + " " + l.zip +
          '<br><br><a href="' + l.page + '" style="color:#2563EB;font-weight:700">VIEW STUDIO &rarr;</a>');
    });
    fit();
  }

  function fit() {
    if (!map) return;
    var pts = LOCS.map(function (l) { return [l.lat, l.lng]; });
    if (userPos) pts.push([userPos.lat, userPos.lng]);
    map.fitBounds(pts, { padding: [36, 36] });
  }

  function showHome() {
    if (!map || !window.L) return;
    if (homeMarker) map.removeLayer(homeMarker);
    var icon = L.divIcon({ className: "", html: '<div class="cs-pin home"><span>&#8962;</span></div>',
      iconSize: [30, 30], iconAnchor: [15, 28] });
    homeMarker = L.marker([userPos.lat, userPos.lng], { icon: icon }).addTo(map).bindPopup("<b>Your address</b>");
    fit();
  }

  function findNearest() {
    var q = el("locSearch").value.trim(), hint = el("locHint");
    if (!q) { hint.textContent = "Please enter your address or ZIP first."; hint.className = "addr-hint err"; return; }
    hint.textContent = "Looking up your address …"; hint.className = "addr-hint";
    fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=us&q=" + encodeURIComponent(q))
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res.length) {
          hint.textContent = "Address not found — try adding city or ZIP (e.g. “… Henderson NV”).";
          hint.className = "addr-hint err"; return;
        }
        userPos = { lat: parseFloat(res[0].lat), lng: parseFloat(res[0].lon) };
        hint.textContent = "Found: " + res[0].display_name.split(",").slice(0, 3).join(",") + " — studios sorted by distance.";
        hint.className = "addr-hint";
        renderList(); showHome();
      })
      .catch(function () { hint.textContent = "Lookup failed — please try again."; hint.className = "addr-hint err"; });
  }

  function open() {
    buildModal();
    el("locBackdrop").hidden = false;
    document.body.style.overflow = "hidden";
    renderList();
    loadLeaflet().then(function () {
      initMap();
      setTimeout(function () { if (map) { map.invalidateSize(); fit(); } }, 60);
    });
    setTimeout(function () { el("locSearch").focus(); }, 60);
  }
  function close() {
    if (!built) return;
    el("locBackdrop").hidden = true;
    document.body.style.overflow = "";
  }
  window.csOpenBooking = open;
  window.csCloseBooking = close;

  /* Jeder Booking-CTA öffnet das Modal */
  document.addEventListener("click", function (e) {
    var t = e.target.closest('.js-book, a[href="#book"]');
    if (!t) return;
    e.preventDefault();
    open();
  });
})();
