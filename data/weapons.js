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
  w("Rustbucket P1", 1, "1", { image: "images/weapons/rustbucket-p1.svg" }),
  w("Dusty Compact", 1, "1", { image: "images/weapons/dusty-compact.svg" }),
  w("Ranger 17", 2, "1", { image: "images/weapons/ranger-17.svg" }),
  w("Olive Guard", 2, "1", { image: "images/weapons/olive-guard.svg" }),
  w("Scout 19", 2, "1", { image: "images/weapons/scout-19.svg" }),
  w("Sprig 19X", 2, "1", { image: "images/weapons/sprig-19x.svg" }),
  w("Cadet 43", 2, "1", { image: "images/weapons/cadet-43.svg" }),
  w("Warden 45", 2, "1", { image: "images/weapons/warden-45.svg" }),
  w("Pine 22", 2, "1", { image: "images/weapons/pine-22.svg" }),
  w("Sage 41", 2, "1", { image: "images/weapons/sage-41.svg" }),
  w("Bolt 1911", 3, "1", { image: "images/weapons/bolt-1911.svg" }),
  w("Orion Gen 5", 3, "1", { image: "images/weapons/orion-gen-5.svg" }),
  w("Talon 45", 3, "1", { image: "images/weapons/talon-45.svg" }),
  w("Patriot 30", 3, "1", { image: "images/weapons/patriot-30.svg" }),
  w("Vector G19", 3, "1", { image: "images/weapons/vector-g19.svg" }),

  /* Tier 1.5 */
  w("Nova 19 Binary", 4, "1.5", { image: "images/weapons/nova-19-binary.svg" }),
  w("Nova 21 Binary", 4, "1.5", { image: "images/weapons/nova-21-binary.svg" }),
  w("Rook 41", 4, "1.5", { image: "images/weapons/rook-41.svg" }),
  w("Rook 47 Switch", 4, "1.5", { image: "images/weapons/rook-47-switch.svg" }),
  w("Cobra 57", 4, "1.5", { image: "images/weapons/cobra-57.svg" }),
  w("Desert PMR", 4, "1.5", { image: "images/weapons/desert-pmr.svg" }),
  w("Black Fang", 5, "1.5", { image: "images/weapons/black-fang.svg" }),
  w("Honey Bee", 5, "1.5", { image: "images/weapons/honey-bee.svg" }),
  w("Arc 4in", 5, "1.5", { image: "images/weapons/arc-4in.svg" }),

  /* Tier 2 */
  w("Fen 57", 4, "2", { image: "images/weapons/fen-57.svg" }),
  w("Fen X45", 4, "2", { image: "images/weapons/fen-x45.svg" }),
  w("Switch G", 4, "2", { image: "images/weapons/switch-g.svg" }),
  w("Switch 26", 4, "2", { image: "images/weapons/switch-26.svg" }),
  w("Switch 20", 4, "2", { image: "images/weapons/switch-20.svg" }),
  w("Mos 43", 4, "2", { image: "images/weapons/mos-43.svg" }),
  w("Mos 45", 4, "2", { image: "images/weapons/mos-45.svg" }),
  w("Mac Ten", 4, "2", { image: "images/weapons/mac-ten.svg" }),
  w("Tec Nine", 4, "2", { image: "images/weapons/tec-nine.svg" }),
  w("Arp Binary", 5, "2", { image: "images/weapons/arp-binary.svg" }),
  w("Fang", 5, "2", { image: "images/weapons/fang.svg" }),
  w("Olive Fang", 5, "2", { image: "images/weapons/olive-fang.svg" }),
  w("Boom 45", 5, "2", { image: "images/weapons/boom-45.svg" }),
  w("Volt Vector", 6, "2", { image: "images/weapons/volt-vector.svg" }),
  w("Apex CX", 6, "2", { image: "images/weapons/apex-cx.svg" }),

  /* Refill */
  w("Standard Issue", 1, "refill", { image: "images/weapons/standard-issue.svg" }),
  w("Supply Pistol", 1, "refill", { image: "images/weapons/supply-pistol.svg" }),
  w("Field Pistol", 2, "refill", { image: "images/weapons/field-pistol.svg" }),
  w("Ammo Runner", 2, "refill", { image: "images/weapons/ammo-runner.svg" }),
  w("Trooper 9", 2, "refill", { image: "images/weapons/trooper-9.svg" }),
  w("Patrol 40", 2, "refill", { image: "images/weapons/patrol-40.svg" })
];
