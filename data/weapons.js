/* ==========================================================================
   EDIT THIS FILE to change your site's content. No other file needs touching
   to add, remove or re-tier a weapon.
   ========================================================================== */

/* ---- Site settings ------------------------------------------------------ */
window.SITE = {
  name: "Weapon Stats",            // shown as the big title at the top
  spinLabel: "Simulate a faction drop spin"
};

/* ---- Star levels: card colour is set in css/style.css (.r1 ... .r5) -------
   weight = how likely this star level is to drop in the spinner.
   Higher number = more common. Odds are weight / (sum of weights in the pool). */
window.RARITY = {
  1: { weight: 30 },
  2: { weight: 26 },
  3: { weight: 20 },
  4: { weight: 12 },
  5: { weight: 7  }
};

/* ---- Sections (each one becomes a tab AND an option in the spin dropdown,
   unless spinOnly is set -- then it's spin-dropdown-only, no tab/page) ---- */
window.CATEGORIES = [
  { id: "refill",    tab: "Refill",    title: "Refill Weapons", spinOnly: true },
  { id: "1",         tab: "Tier 1",    title: "Tier 1 Weapons"   },
  { id: "1.5",       tab: "Tier 1.5",  title: "Tier 1.5 Weapons" },
  { id: "2",         tab: "Tier 2",    title: "Tier 2 Weapons"   }
];

/* ---- Weapons ---------------------------------------------------------------
   w(name, stars, categoryId, extras)

   name        text shown on the card
   stars       1-5 (sets card colour, star count and default drop chance)
   categoryId  one of the ids above ("1", "1.5", "2")
   extras      optional: {
                 image:  "images/weapons/my-gun.png",   // your render; falls back to placeholder
                 badge:  "images/badges/my-badge.png",  // small round icon, bottom-right
                 weight: 5                              // override drop weight for this one gun
               }

   All names below are made-up placeholders. Replace them with your own. */
function w(name, stars, tier, extras) {
  return Object.assign({ name: name, stars: stars, tier: tier }, extras || {});
}

window.WEAPONS = [
  /* Tier 1 -- drop images in images/weapons/Tier 1/ */
  w("Beretta M9", 1, "1", { image: "images/weapons/Tier 1/berreta-m9.png" }),
  w("Walther PPK", 1, "1", { image: "images/weapons/Tier 1/walter-ppk.png" }),
  w("Ghost Glock", 3, "1", { image: "images/weapons/Tier 1/ghost-glock.png" }),
  w("Glock 43X", 3, "1", { image: "images/weapons/Tier 1/glock-43x.png" }),
  w("Walther P88", 2, "1", { image: "images/weapons/Tier 1/walter-p88.png" }),

  /* Tier 1.5 -- drop images in images/weapons/Tier 1.5/ */
  w("1911", 4, "1.5", { image: "images/weapons/Tier 1.5/1911.png" }),
  w("Glock 19", 4, "1.5", { image: "images/weapons/Tier 1.5/glock-19.png" }),
  w("Glock 26", 4, "1.5", { image: "images/weapons/Tier 1.5/glock-26.png" }),
  w("HK 45", 5, "1.5", { image: "images/weapons/Tier 1.5/hk-45.png" }),
  w("Ruger 57", 5, "1.5", { image: "images/weapons/Tier 1.5/ruger-57.png" }),

  /* Tier 2 -- drop images in images/weapons/Tier 2/ */
  w("Glock 17", 4, "2", { image: "images/weapons/Tier 2/glock-17.png" }),
  w("Sig P320", 4, "2", { image: "images/weapons/Tier 2/sig-p320.png" }),
  w("Mac-10", 4, "2", { image: "images/weapons/Tier 2/mac-10.png" }),
  w("Tec-9", 5, "2", { image: "images/weapons/Tier 2/tec-9.png" }),
  w("Lebedev PL-14", 3, "2", { image: "images/weapons/Tier 2/lebedev-pl14.png" })
];
