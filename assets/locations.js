// Studio-Locations — zentrale Datenquelle.
// Später Kandidat fürs Admin-Panel: diese Liste soll dann aus einer API/DB kommen,
// die Website liest nur noch LOCATIONS. Felder bewusst schon "verwaltbar" geschnitten.
// lat/lng: Näherungen für das Mockup — beim echten Build einmal sauber geocoden.
// formEmbed: HTML-Embed-Code des studio-eigenen Anfrage-Formulars (kommt von Chris).
//            Solange null: Platzhalter wird angezeigt. KEIN Self-Booking von Zeitslots!
window.CS_LOCATIONS = [
  {
    id: "henderson-1",
    name: "CS Fitness Henderson",
    address: "", // Straße noch offen (kommt von Chris) — leer = wird auf der Website nicht angezeigt
    city: "Henderson", state: "NV", zip: "89052",
    phone: "+1 (702) XXX-XXXX", // Platzhalter
    email: "henderson@csfitnessusa.com", // Platzhalter
    hours: "Mon – Sat · by appointment",
    status: "open", // open | soon
    lat: 36.0397, lng: -114.9819, // ~Henderson Zentrum, Platzhalter bis Adresse feststeht
    formEmbed: null // <- hier kommt Chris' Formular-Code für DIESES Studio rein
  },
  {
    id: "henderson-anthem",
    name: "CS Fitness — Anthem Village",
    address: "2540 Anthem Village Dr, Suite 180",
    city: "Henderson", state: "NV", zip: "89052",
    phone: "+1 (702) XXX-XXXX", // Platzhalter
    email: "anthem@csfitnessusa.com", // Platzhalter
    hours: "Mon – Sat · by appointment",
    status: "open",
    lat: 35.9857, lng: -115.0842, // Näherung Anthem Village Dr — beim Build geocoden
    formEmbed: null // <- hier kommt Chris' Formular-Code für DIESES Studio rein
  }
];
