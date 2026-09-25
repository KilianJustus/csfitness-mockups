// Studio-Locations — zentrale Datenquelle für Buchungs-Modal, Studio-Landingpages,
// Contact-Banner und Karten. Später Kandidat fürs Admin-Panel: diese Liste soll dann
// aus einer API/DB kommen, die Website liest nur noch LOCATIONS.
// lat/lng: exakt geocodet (Nominatim) — bei Adressänderung neu geocoden.
// formEmbed: LeadConnector-Formular (iframe) des Studios; form_embed.js wird von
//   booking-modal.js / der Landingpage einmalig nachgeladen.
//   Green Valley: anpBVCUhwk6MtLYKFad6 · Anthem: BeUkM8eqwn52I4RZMMJW
window.CS_LOCATIONS = [
  {
    id: "green-valley",
    page: "studio-green-valley.html",
    name: "CS FITNESS Green Valley",
    shortName: "Green Valley",
    address: "180 S Stephanie St, Suite 120",
    city: "Henderson", state: "NV", zip: "89012",
    phone: "+1 (702) XXX-XXXX", // Platzhalter — wird ausgeblendet, solange XXX enthalten
    email: "greenvalley@csfitnessusa.com", // Platzhalter
    hours: "Mon – Sat · by appointment",
    hoursDetail: [
      ["Mon", "By appointment"], ["Tue", "By appointment"], ["Wed", "By appointment"],
      ["Thu", "By appointment"], ["Fri", "By appointment"], ["Sat", "By appointment"],
      ["Sun", "Closed"]
    ],
    rating: "5.0",
    googleUrl: "https://maps.app.goo.gl/L5aSCx4kzmqcKFig8",
    reviews: true, // Google-Profil vorhanden -> Bewertungs-Sektion + Rating im Hero
    status: "open", // open | soon
    lat: 36.0229559, lng: -115.0465799,
    photoCount: 6, // Slider-Slots (Fotos folgen)
    formEmbed: `<iframe
    src="https://api.leadconnectorhq.com/widget/form/anpBVCUhwk6MtLYKFad6"
    style="width:100%;height:100%;border:none;border-radius:8px"
    id="inline-anpBVCUhwk6MtLYKFad6"
    data-layout="{'id':'INLINE'}"
    data-trigger-type="alwaysShow"
    data-trigger-value=""
    data-activation-type="alwaysActivated"
    data-activation-value=""
    data-deactivation-type="neverDeactivate"
    data-deactivation-value=""
    data-form-name="Leadgen Form"
    data-height="undefined"
    data-layout-iframe-id="inline-anpBVCUhwk6MtLYKFad6"
    data-form-id="anpBVCUhwk6MtLYKFad6"
    data-cookie-consent="true"
    data-cookie-consent-provider="auto"
    title="Leadgen Form"
></iframe>`
  },
  {
    id: "anthem",
    page: "studio-anthem.html",
    name: "CS FITNESS Anthem",
    shortName: "Anthem",
    address: "2540 Anthem Village Dr, Suite 180",
    city: "Henderson", state: "NV", zip: "89052",
    phone: "+1 (702) XXX-XXXX", // Platzhalter
    email: "anthem@csfitnessusa.com", // Platzhalter
    hours: "Mon – Sat · by appointment",
    hoursDetail: [
      ["Mon", "By appointment"], ["Tue", "By appointment"], ["Wed", "By appointment"],
      ["Thu", "By appointment"], ["Fri", "By appointment"], ["Sat", "By appointment"],
      ["Sun", "Closed"]
    ],
    rating: "",
    googleUrl: "", // eigenes Google-Profil folgt
    reviews: false, // ohne eigenes Profil: keine Bewertungs-Sektion, kein Rating im Hero
    status: "open",
    lat: 35.9798619, lng: -115.0985626,
    photoCount: 6,
    formEmbed: `<iframe
    src="https://api.leadconnectorhq.com/widget/form/BeUkM8eqwn52I4RZMMJW"
    style="width:100%;height:100%;border:none;border-radius:8px"
    id="inline-BeUkM8eqwn52I4RZMMJW"
    data-layout="{'id':'INLINE'}"
    data-trigger-type="alwaysShow"
    data-trigger-value=""
    data-activation-type="alwaysActivated"
    data-activation-value=""
    data-deactivation-type="neverDeactivate"
    data-deactivation-value=""
    data-form-name="Lead Form Trial Session Anthem"
    data-height="755"
    data-layout-iframe-id="inline-BeUkM8eqwn52I4RZMMJW"
    data-form-id="BeUkM8eqwn52I4RZMMJW"
    data-cookie-consent="true"
    data-cookie-consent-provider="auto"
    title="Lead Form Trial Session Anthem"
></iframe>`
  }
];
