/* ==========================================================================
   EDIT THIS FILE to change your site's content. No other file needs touching
   to add, remove or re-tier a weapon.
   ========================================================================== */

/* ---- Site settings ------------------------------------------------------ */
window.SITE = {
  name: "Weapon Stats",            // shown as the big title at the top
  spinLabel: "Simulate a faction drop spin"
};

/* ---- Star levels: card colour is set in css/style.css (.r1 ... .r6) -------
   weight = how likely this star level is to drop in the spinner.
   Higher number = more common. Odds are weight / (sum of weights in the pool). */
window.RARITY = {
  1: { weight: 30 },
  2: { weight: 26 },
  3: { weight: 20 },
  4: { weight: 12 },
  5: { weight: 7  },
  6: { weight: 2  }
};

/* ---- Sections (each one becomes a tab AND an option in the spin dropdown,
   unless spinOnly is set -- then it's spin-dropdown-only, no tab/page) ---- */
window.CATEGORIES = [
  { id: "1",         tab: "Tier 1",    title: "Tier 1 Weapons"   },
  { id: "1.5",       tab: "Tier 1.5",  title: "Tier 1.5 Weapons" },
  { id: "2",         tab: "Tier 2",    title: "Tier 2 Weapons"   },
  { id: "refill",    tab: "Refill",    title: "Refill Weapons", spinOnly: true }
];

/* ---- Weapons ---------------------------------------------------------------
   w(name, stars, categoryId, extras)

   name        text shown on the card
   stars       1-6 (sets card colour, star count and default drop chance)
   categoryId  one of the ids above ("1", "1.5", "2", "refill")
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
  /* Tier 1 */
  w("Rustbucket P1", 1, "1"),
  w("Dusty Compact", 1, "1"),
  w("Ranger 17", 2, "1"),
  w("Olive Guard", 2, "1"),
  w("Scout 19", 2, "1"),
  w("Sprig 19X", 2, "1"),
  w("Cadet 43", 2, "1"),
  w("Warden 45", 2, "1"),
  w("Pine 22", 2, "1"),
  w("Sage 41", 2, "1"),
  w("Bolt 1911", 3, "1"),
  w("Orion Gen 5", 3, "1"),
  w("Talon 45", 3, "1"),
  w("Patriot 30", 3, "1"),
  w("Vector G19", 3, "1"),

  /* Tier 1.5 */
  w("Nova 19 Binary", 4, "1.5"),
  w("Nova 21 Binary", 4, "1.5"),
  w("Rook 41", 4, "1.5"),
  w("Rook 47 Switch", 4, "1.5"),
  w("Cobra 57", 4, "1.5"),
  w("Desert PMR", 4, "1.5"),
  w("Black Fang", 5, "1.5"),
  w("Honey Bee", 5, "1.5"),
  w("Arc 4in", 5, "1.5"),

  /* Tier 2 */
  w("Fen 57", 4, "2"),
  w("Fen X45", 4, "2"),
  w("Switch G", 4, "2"),
  w("Switch 26", 4, "2"),
  w("Switch 20", 4, "2"),
  w("Mos 43", 4, "2"),
  w("Mos 45", 4, "2"),
  w("Mac Ten", 4, "2"),
  w("Tec Nine", 4, "2"),
  w("Arp Binary", 5, "2"),
  w("Fang", 5, "2"),
  w("Olive Fang", 5, "2"),
  w("Boom 45", 5, "2"),
  w("Volt Vector", 6, "2"),
  w("Apex CX", 6, "2"),

  /* Refill */
  w("Standard Issue", 1, "refill"),
  w("Supply Pistol", 1, "refill"),
  w("Field Pistol", 2, "refill"),
  w("Ammo Runner", 2, "refill"),
  w("Trooper 9", 2, "refill"),
  w("Patrol 40", 2, "refill")
];
