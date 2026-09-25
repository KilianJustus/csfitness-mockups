/* CS FITNESS — Studio-Landingpage
   Füllt die Seite aus der zentralen Datenquelle (locations.js). Welches Studio,
   steht in <body data-studio="...">. So bleiben beide Landingpages inhaltsgleich
   gepflegt und sind Admin-Panel-ready. */
(function () {
  var id = document.body.getAttribute("data-studio");
  var S = (window.CS_LOCATIONS || []).find(function (x) { return x.id === id; });
  if (!S) return;

  var hasPhone = S.phone && S.phone.indexOf("X") === -1;
  var fullAddr = (S.address ? S.address + ", " : "") + S.city + ", " + S.state + " " + S.zip;
  var mapsLink = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(S.name + " " + fullAddr);
  var telHref = hasPhone ? S.phone.replace(/[^+\d]/g, "") : "";

  function set(sel, html) { var e = document.querySelector(sel); if (e) e.innerHTML = html; }

  /* --- Hero --- */
  set("#sName", S.shortName + '<span class="grad-text">EMS Training Studio</span>');
  set("#sIntro", "Train smarter at " + S.name + ". Our EMS training combines Electro Muscle Stimulation with " +
    "certified coaches to deliver a personalized full-body workout in just 20 minutes, once a week.");

  set("#sFacts",
    '<div class="f"><span><b>' + S.name + "</b><br>" +
      '<a href="' + mapsLink + '" target="_blank" rel="noopener">' + fullAddr + "</a></span></div>" +
    (hasPhone ? '<div class="f"><span><b>Phone</b><br><a href="tel:' +
      telHref + '">' + S.phone + "</a></span></div>" : "") +
    (S.reviews ? '<div class="f"><span class="gmark"><span class="val">' + S.rating + "</span>" +
      '<span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>' +
      '<a href="' + S.googleUrl + '" target="_blank" rel="noopener">Google Reviews</a></span></div>' : ""));

  /* --- Hero-Formular (LeadConnector) --- */
  set("#sFormHead", '<span class="t">Book your free session</span>' +
    '<span class="s">' + S.name + "</span>");
  var formBox = document.querySelector("#sForm");
  if (formBox && S.formEmbed) {
    formBox.innerHTML = S.formEmbed;
    var fs = document.createElement("script");
    fs.src = "https://link.msgsndr.com/js/form_embed.js";
    document.body.appendChild(fs);
  }

  /* --- Foto-Slider (Platzhalter, Fotos folgen) --- */
  var track = document.querySelector("#sSlider .track");
  if (track) {
    var n = S.photoCount || 6, out = "";
    for (var i = 0; i < n; i++) out += '<div class="ph-img"></div>';
    track.innerHTML = out;
  }

  /* --- Studio-Details --- */
  set("#sDetailsIntro", S.name + " is a boutique EMS studio in " + S.city + ", " + S.state +
    " where strength training meets smart technology. Every session is coach-led, low-impact and built around your " +
    "goals, so you get results you can see and feel without spending hours in the gym.");
  set("#sContact",
    (hasPhone ? '<p><a href="tel:' + telHref + '">' + S.phone + "</a></p>" : "") +
    '<p><a href="mailto:' + S.email + '">' + S.email + "</a></p>");
  set("#sLocation", "<p>" + (S.address ? S.address.replace(", ", "<br>") + "<br>" : "") +
    S.city + ", " + S.state + " " + S.zip + "</p>" +
    '<p><a href="' + mapsLink + '" target="_blank" rel="noopener">Get directions &rarr;</a></p>');
  set("#sHours", '<ul class="hours-table">' + (S.hoursDetail || []).map(function (h) {
    return "<li><span>" + h[0] + "</span><span>" + h[1] + "</span></li>";
  }).join("") + "</ul>");

  /* --- Review-Bar: nur bei eigenem Google-Profil (sonst Sektion raus) --- */
  var revSec = document.querySelector("#sReviews");
  if (!S.reviews) {
    if (revSec) revSec.remove();
  } else {
    set("#sRating", S.rating);
    var gl = document.querySelector("#sGoogleLink");
    if (gl) gl.href = S.googleUrl;
  }

  /* --- CTA-Banner --- */
  set("#sCtaName", S.name);

  /* --- Karte (Leaflet nachgeladen) --- */
  if (document.querySelector("#sMap")) {
    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    document.head.appendChild(css);
    var js = document.createElement("script");
    js.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    js.onload = function () {
      var LF = window.L;
      var m = LF.map("sMap", { scrollWheelZoom: false }).setView([S.lat, S.lng], 15);
      m.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>');
      LF.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&copy; OpenStreetMap" }).addTo(m);
      var icon = LF.divIcon({ className: "", html: '<div class="cs-pin"><span>&#9733;</span></div>',
        iconSize: [30, 30], iconAnchor: [15, 28], popupAnchor: [0, -26] });
      LF.marker([S.lat, S.lng], { icon: icon }).addTo(m).bindPopup("<b>" + S.name + "</b><br>" + fullAddr);
    };
    document.head.appendChild(js);
  }

  /* --- Foto-Slider-Pfeile --- */
  var sl = document.querySelector("#sSlider");
  if (sl) {
    var tr = sl.querySelector(".track");
    var stepW = function () { var c = tr.children[0]; return c ? c.getBoundingClientRect().width + 16 : 340; };
    sl.querySelector(".prev").addEventListener("click", function () { tr.scrollBy({ left: -stepW(), behavior: "smooth" }); });
    sl.querySelector(".next").addEventListener("click", function () { tr.scrollBy({ left: stepW(), behavior: "smooth" }); });
  }
})();
