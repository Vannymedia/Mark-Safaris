/* Mark Safaris — package data
   -----------------------------------------------------------
   This is the single source of truth for every safari package
   shown on the site. Edit prices, photos, and descriptions here
   directly, OR use /admin.html which edits a copy of this data
   in the browser and lets you export an updated version of this
   file. See /README.md for the full explanation. */

const BASE_PACKAGES = [
  {
    id: "serengeti-migration",
    park: "Serengeti National Park",
    name: "Serengeti Migration Explorer",
    tagline: "Endless plains and the greatest wildlife show on Earth",
    days: 4,
    nights: 3,
    price: 1450,
    groupSize: "1–6 travelers",
    bestTime: "June – October (migration), Dec – Mar (calving)",
    image: "images/serengeti.svg",
    thumb: "images/serengeti.svg",
    description: "The Serengeti is Tanzania's flagship park — endless golden plains, acacia-dotted horizons, and the single largest concentration of plains game left on the planet. This itinerary is timed around the great wildebeest migration and gives you long, unhurried game drives with a private guide, tracking predators and following the herds across the short-grass plains.",
    highlights: [
      "Big cats: lion, leopard and cheetah on the central plains",
      "Great Migration river crossings (seasonal)",
      "Hot air balloon safari option at dawn",
      "Maasai cultural visit near the park boundary"
    ],
    itinerary: [
      { day: 1, title: "Arusha to Serengeti", text: "Fly or drive from Arusha into the Serengeti, with a game drive en route as you enter the park in the afternoon." },
      { day: 2, title: "Central Serengeti", text: "Full day game drive across the Seronera plains, prime territory for lion and leopard sightings." },
      { day: 3, title: "Following the herds", text: "Track the migration (seasonal) or explore the western corridor and northern plains with a picnic lunch in the bush." },
      { day: 4, title: "Morning drive & departure", text: "Sunrise game drive, then transfer back to Arusha or on to your next park." }
    ]
  },
  {
    id: "ngorongoro-crater",
    park: "Ngorongoro Conservation Area",
    name: "Ngorongoro Crater Discovery",
    tagline: "A natural amphitheater holding one of Africa's densest wildlife populations",
    days: 2,
    nights: 1,
    price: 780,
    groupSize: "1–6 travelers",
    bestTime: "Year-round",
    image: "images/ngorongoro.svg",
    thumb: "images/ngorongoro.svg",
    gallery: [],
    description: "Ngorongoro Crater is a collapsed volcanic caldera whose floor holds around 25,000 large animals year-round, including one of Tanzania's best chances of spotting black rhino. A single descent onto the crater floor delivers an extraordinary concentration of wildlife against a dramatic backdrop of 600-metre walls.",
    highlights: [
      "Black rhino, lion, elephant and flamingo-lined soda lakes",
      "Crater floor game drive with packed bush breakfast",
      "Stay on the crater rim with panoramic views",
      "Optional Maasai boma visit"
    ],
    itinerary: [
      { day: 1, title: "Arusha to Ngorongoro rim", text: "Drive up the Rift Valley escarpment to your lodge on the crater rim, with an afternoon viewpoint stop." },
      { day: 2, title: "Crater floor & departure", text: "Descend at sunrise for a full morning game drive on the crater floor, then climb back out and transfer onward." }
    ]
  },
  {
    id: "tarangire-baobabs",
    park: "Tarangire National Park",
    name: "Tarangire Elephant & Baobab Trail",
    tagline: "Ancient baobabs and Tanzania's largest elephant herds",
    days: 3,
    nights: 2,
    price: 990,
    groupSize: "1–6 travelers",
    bestTime: "June – October (dry season herds)",
    image: "images/tarangire.svg",
    thumb: "images/tarangire.svg",
    gallery: [],
    description: "Tarangire is famous for its towering baobab trees and, in the dry season, herds of several hundred elephants gathering along the Tarangire River. It's quieter than the northern circuit's headline parks, making it a favourite for travelers who want space along with big game.",
    highlights: [
      "Some of Africa's largest elephant herds (dry season)",
      "Iconic baobab-studded landscapes",
      "Tree-climbing lions and abundant birdlife",
      "Optional walking safari with an armed ranger"
    ],
    itinerary: [
      { day: 1, title: "Arrival & afternoon drive", text: "Arrive at Tarangire, check in, and head straight into the park for an afternoon game drive along the river." },
      { day: 2, title: "Full day in the park", text: "A full day exploring the swamps and baobab woodlands, with a bush picnic lunch." },
      { day: 3, title: "Morning drive & departure", text: "Final sunrise drive, then transfer out of the park." }
    ]
  },
  {
    id: "manyara-treetops",
    park: "Lake Manyara National Park",
    name: "Lake Manyara Treetop & Flamingo Tour",
    tagline: "Tree-climbing lions, flamingo shorelines and a rift valley backdrop",
    days: 1,
    nights: 0,
    price: 320,
    groupSize: "1–6 travelers",
    bestTime: "Year-round",
    image: "images/manyara.svg",
    thumb: "images/manyara.svg",
    gallery: [],
    description: "Tucked beneath the Rift Valley escarpment, Lake Manyara packs groundwater forest, acacia woodland and an alkaline lake into a compact park. It's known for its unusual tree-climbing lions, large baboon troops, and — when water levels are right — vast flocks of flamingos along the shoreline.",
    highlights: [
      "Tree-climbing lions in the mahogany forest",
      "Flamingos and pelicans on the lake shore",
      "Treetop canopy walkway",
      "Easily combined as a day trip with Ngorongoro or Tarangire"
    ],
    itinerary: [
      { day: 1, title: "Full day game drive", text: "A full day exploring the forest, hippo pool and lake shore, ideal as a stand-alone day trip or added on to a longer safari." }
    ]
  },
  {
    id: "mikumi-getaway",
    park: "Mikumi National Park",
    name: "Mikumi Weekend Getaway",
    tagline: "The closest big-game park to Dar es Salaam",
    days: 2,
    nights: 1,
    price: 540,
    groupSize: "1–6 travelers",
    bestTime: "June – October",
    image: "images/mikumi.svg",
    thumb: "images/mikumi.svg",
    gallery: [],
    description: "Mikumi sits just a few hours from Dar es Salaam, making it the easiest short safari on the Tanzanian coast. Its open Mkata floodplain is reminiscent of the Serengeti on a smaller scale, with reliable sightings of lion, giraffe, zebra, elephant and buffalo.",
    highlights: [
      "Easiest safari to reach from Dar es Salaam",
      "Mkata floodplain game viewing",
      "Giraffe, zebra, elephant, buffalo and lion",
      "Great for a short weekend trip"
    ],
    itinerary: [
      { day: 1, title: "Depart Dar & afternoon drive", text: "Morning departure from Dar es Salaam, arriving in time for an afternoon game drive on the Mkata floodplain." },
      { day: 2, title: "Morning drive & return", text: "Sunrise game drive, then return to Dar es Salaam by the afternoon." }
    ]
  },
  {
    id: "ruaha-wild-south",
    park: "Ruaha National Park",
    name: "Ruaha Wild South Safari",
    tagline: "Tanzania's largest park — vast baobab wilderness with few other visitors",
    days: 4,
    nights: 3,
    price: 1620,
    groupSize: "1–6 travelers",
    bestTime: "June – November",
    image: "images/ruaha.svg",
    thumb: "images/ruaha.svg",
    gallery: [],
    description: "Ruaha is Tanzania's largest national park and one of East Africa's last true wilderness areas, with huge prides of lion, one of the region's biggest elephant populations, and a landscape of rolling hills and ancient baobabs cut by the Great Ruaha River. It sees a fraction of the visitors of the northern circuit.",
    highlights: [
      "Large lion prides and healthy leopard population",
      "One of East Africa's biggest elephant populations",
      "Dramatic baobab-studded scenery",
      "Remote, uncrowded game drives"
    ],
    itinerary: [
      { day: 1, title: "Fly into Ruaha", text: "Fly into Ruaha, transfer to camp, afternoon game drive along the Great Ruaha River." },
      { day: 2, title: "Full day exploring", text: "Full day game drive across the baobab plains and river circuits." },
      { day: 3, title: "Deeper into the park", text: "Explore further-flung areas of the park for a quieter, more remote experience." },
      { day: 4, title: "Morning drive & departure", text: "Final game drive before flying out." }
    ]
  },
  {
    id: "northern-circuit-grand-tour",
    park: "Multi-park",
    name: "Grand Northern Circuit",
    tagline: "Serengeti, Ngorongoro and Tarangire in one unforgettable journey",
    days: 7,
    nights: 6,
    price: 2890,
    groupSize: "1–6 travelers",
    bestTime: "June – October",
    image: "images/northern-circuit.svg",
    thumb: "images/northern-circuit.svg",
    gallery: [],
    description: "The complete northern circuit: elephant herds and baobabs in Tarangire, the wildlife-dense floor of Ngorongoro Crater, and multiple days chasing the drama of the Serengeti plains. This is the classic first-time Tanzania safari, paced to give each park the time it deserves.",
    highlights: [
      "All three flagship northern parks in one trip",
      "Private guide and vehicle throughout",
      "Balanced pacing — no single-night rushes",
      "Fully customizable lodge and camp tier"
    ],
    itinerary: [
      { day: 1, title: "Arusha to Tarangire", text: "Depart Arusha and head into Tarangire for an afternoon game drive." },
      { day: 2, title: "Tarangire full day", text: "A full day among the baobabs and elephant herds." },
      { day: 3, title: "On to Ngorongoro", text: "Transfer to the Ngorongoro highlands, afternoon at leisure with crater rim views." },
      { day: 4, title: "Crater floor", text: "Full morning descent into the crater, afternoon transfer to the Serengeti." },
      { day: 5, title: "Serengeti", text: "Full day game drive across the central Serengeti plains." },
      { day: 6, title: "Serengeti", text: "Second full day in the Serengeti, tracking predators or the migration herds." },
      { day: 7, title: "Departure", text: "Final morning drive, then transfer back to Arusha for your onward flight." }
    ]
  }
];

/* Merge in any admin edits saved in this browser's localStorage.
   See js/admin.js for how overrides are written. */
function getPackages() {
  try {
    const raw = localStorage.getItem("markSafarisPackages");
    if (raw) {
      const saved = JSON.parse(raw);
      if (Array.isArray(saved) && saved.length) return saved;
    }
  } catch (e) { /* fall through to base data */ }
  return BASE_PACKAGES;
}
