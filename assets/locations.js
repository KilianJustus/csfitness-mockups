// Studio-Locations — zentrale Datenquelle.
// Später Kandidat fürs Admin-Panel: diese Liste soll dann aus einer API/DB kommen,
// die Website liest nur noch LOCATIONS. Felder bewusst schon "verwaltbar" geschnitten.
// lat/lng: Näherungen für das Mockup — beim echten Build einmal sauber geocoden.
// formEmbed: LeadConnector-Formular (iframe) des Studios. Das zugehörige Script
// https://link.msgsndr.com/js/form_embed.js wird einmalig in book.html geladen.
// ACHTUNG: Stand 09/2026 haben BEIDE Studios dieselbe Form-ID (anpBVCUhwk6MtLYKFad6)
// — so von Kilian/Chris geliefert. Sobald es eine eigene ID je Studio gibt: hier tauschen.
window.CS_LOCATIONS = [
  {
    id: "green-valley",
    name: "CS Fitness Green Valley",
    address: "", // Straße noch offen (kommt von Chris) — leer = wird auf der Website nicht angezeigt
    city: "Henderson", state: "NV", zip: "89052",
    phone: "+1 (702) XXX-XXXX", // Platzhalter — wird nicht angezeigt, solange XXX enthalten
    email: "greenvalley@csfitnessusa.com", // Platzhalter
    hours: "Mon – Sat · by appointment",
    status: "open", // open | soon
    lat: 36.0289, lng: -115.0810, // Näherung Green Valley — geocoden, sobald Adresse feststeht
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
    name: "CS Fitness Anthem",
    address: "2540 Anthem Village Dr, Suite 180",
    city: "Henderson", state: "NV", zip: "89052",
    phone: "+1 (702) XXX-XXXX", // Platzhalter — wird nicht angezeigt, solange XXX enthalten
    email: "anthem@csfitnessusa.com", // Platzhalter
    hours: "Mon – Sat · by appointment",
    status: "open",
    lat: 35.9857, lng: -115.0842, // Näherung Anthem Village Dr — beim Build geocoden
    formEmbed: `<iframe
    src="https://api.leadconnectorhq.com/widget/form/anpBVCUhwk6MtLYKFad6"
    style="width:100%;height:100%;border:none;border-radius:8px"
    id="inline-anpBVCUhwk6MtLYKFad6-anthem"
    data-layout="{'id':'INLINE'}"
    data-trigger-type="alwaysShow"
    data-trigger-value=""
    data-activation-type="alwaysActivated"
    data-activation-value=""
    data-deactivation-type="neverDeactivate"
    data-deactivation-value=""
    data-form-name="Leadgen Form"
    data-height="undefined"
    data-layout-iframe-id="inline-anpBVCUhwk6MtLYKFad6-anthem"
    data-form-id="anpBVCUhwk6MtLYKFad6"
    data-cookie-consent="true"
    data-cookie-consent-provider="auto"
    title="Leadgen Form"
></iframe>`
  }
];
