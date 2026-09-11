// Studio-Locations — zentrale Datenquelle.
// Später Kandidat fürs Admin-Panel: diese Liste soll dann aus einer API/DB kommen,
// die Website liest nur noch LOCATIONS. Felder bewusst schon "verwaltbar" geschnitten.
// lat/lng: für die Karten-Marker. Werte hier sind NÄHERUNGEN für das Mockup —
// beim echten Build einmal sauber geocoden (Google Geocoding API).
window.CS_LOCATIONS = [
  {
    id: "henderson-1",
    name: "CS Fitness Henderson",
    address: "Address TBD", // Platzhalter — echte Adresse von Chris nachtragen
    city: "Henderson", state: "NV", zip: "89052",
    phone: "+1 (702) XXX-XXXX",
    status: "open", // open | soon
    lat: 36.0397, lng: -114.9819, // ~Henderson Zentrum, Platzhalter bis Adresse feststeht
    bookingUrl: "#booking" // später: location-spezifischer Mindbody-Link
  },
  {
    id: "henderson-anthem",
    name: "CS Fitness — Anthem Village",
    address: "2540 Anthem Village Dr, Suite 180",
    city: "Henderson", state: "NV", zip: "89052",
    phone: "",
    status: "open",
    lat: 35.9857, lng: -115.0842, // Näherung Anthem Village Dr — beim Build geocoden
    bookingUrl: "#booking"
  }
];
