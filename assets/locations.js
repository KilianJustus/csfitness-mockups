// Studio-Locations — zentrale Datenquelle.
// Später Kandidat fürs Admin-Panel: diese Liste soll dann aus einer API/DB kommen,
// die Website liest nur noch LOCATIONS. Felder bewusst schon "verwaltbar" geschnitten.
window.CS_LOCATIONS = [
  {
    id: "henderson",
    name: "CS Fitness Henderson",
    address: "Address TBD", // Platzhalter — echte Adresse von Chris
    city: "Henderson", state: "NV", zip: "89052",
    phone: "+1 (702) XXX-XXXX",
    status: "open", // open | soon
    bookingUrl: "#booking" // später: location-spezifischer Mindbody-Link
  },
  {
    id: "lv-summerlin",
    name: "CS Fitness Las Vegas — Summerlin",
    address: "Platzhalter-Standort",
    city: "Las Vegas", state: "NV", zip: "89135",
    phone: "",
    status: "soon",
    bookingUrl: ""
  },
  {
    id: "lv-downtown",
    name: "CS Fitness Las Vegas — Downtown",
    address: "Platzhalter-Standort",
    city: "Las Vegas", state: "NV", zip: "89101",
    phone: "",
    status: "soon",
    bookingUrl: ""
  }
];
