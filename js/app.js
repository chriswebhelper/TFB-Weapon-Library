(function () {
  "use strict";

  var SITE = window.SITE;
  var RARITY = window.RARITY;
  var CATEGORIES = window.CATEGORIES;
  var WEAPONS = window.WEAPONS;

  var PLACEHOLDER = "images/placeholder.svg";
  var SPIN_MS = 5500;          // how long the spin animation lasts
  var STRIP_LENGTH = 60;       // number of cards in the reel
  var WIN_INDEX_MIN = 44;      // the winning card sits somewhere in this range
  var WIN_INDEX_MAX = 52;

  var viewEl = document.getElementById("view");
  var navEl = document.getElementById("nav");
  var drops = [];              // wins from this visit (in memory only)

  /* ---------------------------------------------------------------- utils */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  // Fair random float in [0, 1) from the browser's crypto source
  function rand() {
    var buf = new Uint32Array(1);
    window.crypto.getRandomValues(buf);
    return buf[0] / 4294967296;
  }

  function weightOf(weapon) {
    if (typeof weapon.weight === "number") return weapon.weight;
    var r = RARITY[weapon.stars];
    return r && typeof r.weight === "number" ? r.weight : 1;
  }

  function pickWeighted(pool) {
    var total = 0, i;
    for (i = 0; i < pool.length; i++) total += weightOf(pool[i]);
    var roll = rand() * total;
    for (i = 0; i < pool.length; i++) {
      roll -= weightOf(pool[i]);
      if (roll < 0) return pool[i];
    }
    return pool[pool.length - 1];
  }

  function poolFor(categoryId) {
    if (categoryId === "test") return WEAPONS.filter(function (w) { return w.tier === "1"; });
    return WEAPONS.filter(function (w) { return w.tier === categoryId; });
  }

  // Lowest tier first. A spin for a given tier also pulls from every tier
  // before it in this list, so higher spins can still land lower-tier guns.
  var TIER_ORDER = ["1", "1.5", "2"];

  function spinPoolFor(categoryId) {
    var idx = TIER_ORDER.indexOf(categoryId);
    if (idx === -1) return poolFor(categoryId);
    var allowedTiers = TIER_ORDER.slice(0, idx + 1);
    return WEAPONS.filter(function (w) { return allowedTiers.indexOf(w.tier) !== -1; });
  }

  /* ----------------------------------------------------------------- card */
  function makeCard(weapon) {
    var card = el("div", "card r" + Math.min(Math.max(weapon.stars || 1, 1), 6));

    card.appendChild(el("span", "name", weapon.name));

    var img = el("img", "gun");
    img.alt = weapon.name;
    img.loading = "lazy";
    img.draggable = false;
    img.src = weapon.image || PLACEHOLDER;
    img.onerror = function () {
      img.onerror = null;
      img.src = PLACEHOLDER;
    };
    card.appendChild(img);

    if (weapon.badge) {
      var badge = el("img", "badge");
      badge.alt = "";
      badge.src = weapon.badge;
      badge.onerror = function () { badge.remove(); };
      card.appendChild(badge);
    }
    return card;
  }

  /* ------------------------------------------------------------ tier page */
  function renderCategory(cat) {
    viewEl.innerHTML = "";
    viewEl.appendChild(el("h2", "section-title", cat.title));
    var grid = el("div", "grid");
    poolFor(cat.id).forEach(function (w) { grid.appendChild(makeCard(w)); });
    viewEl.appendChild(grid);
  }

  /* --------------------------------------------------------- spinner page */
  function renderSpinner() {
    viewEl.innerHTML = "";
    viewEl.appendChild(el("h2", "section-title", "Randomize"));
    viewEl.appendChild(el("div", "spin-sub", SITE.spinLabel || "Simulate a spin"));

    var controls = el("div", "controls");
    controls.appendChild(el("label", null, "Choose Tier:"));

    var select = el("select");
    select.id = "tierSelect";
    var opt = el("option", null, "Test Drops");
    opt.value = "test";
    select.appendChild(opt);
    CATEGORIES.forEach(function (c) {
      var o = el("option", null, c.tab);
      o.value = c.id;
      select.appendChild(o);
    });
    controls.appendChild(select);

    var spinBtn = el("button", null, "Spin");
    spinBtn.type = "button";
    controls.appendChild(spinBtn);
    viewEl.appendChild(controls);

    var wrap = el("div", "reel-wrap");
    var reel = el("div", "reel");
    reel.appendChild(el("div", "marker"));
    var strip = el("div", "strip");
    strip.id = "strip";
    reel.appendChild(strip);
    wrap.appendChild(reel);
    viewEl.appendChild(wrap);

    viewEl.appendChild(el("div", "drops-title", "Your drops"));
    var dropsEl = el("div", "drops");
    viewEl.appendChild(dropsEl);
    var clearBtn = el("button", "clear-btn", "Clear drops");
    clearBtn.type = "button";
    viewEl.appendChild(clearBtn);

    function renderDrops() {
      dropsEl.innerHTML = "";
      if (!drops.length) {
        dropsEl.appendChild(el("span", "empty", "Nothing yet. Hit Spin!"));
        return;
      }
      drops.forEach(function (w) { dropsEl.appendChild(makeCard(w)); });
    }
    renderDrops();

    // Show a preview reel before the first spin
    fillIdleStrip(strip, poolFor("test"));

    clearBtn.addEventListener("click", function () {
      drops = [];
      renderDrops();
    });

    var spinning = false;

    spinBtn.addEventListener("click", function () {
      if (spinning) return;
      var pool = spinPoolFor(select.value);
      if (!pool.length) {
        dropsEl.innerHTML = "";
        dropsEl.appendChild(el("span", "empty", "That section has no weapons yet."));
        return;
      }

      spinning = true;
      spinBtn.disabled = true;
      select.disabled = true;

      // 1. Decide the result FIRST, using weighted odds
      var winner = pickWeighted(pool);

      // 2. Build a reel that has that winner at a known position
      var winIndex = WIN_INDEX_MIN + Math.floor(rand() * (WIN_INDEX_MAX - WIN_INDEX_MIN + 1));
      var items = [];
      for (var i = 0; i < STRIP_LENGTH; i++) {
        items.push(i === winIndex ? winner : pickWeighted(pool));
      }
      strip.style.transition = "none";
      strip.style.transform = "translateX(0)";
      strip.innerHTML = "";
      items.forEach(function (w, idx) {
        var c = makeCard(w);
        if (idx === winIndex) c.dataset.win = "1";
        strip.appendChild(c);
      });

      // 3. Work out where to stop so the winner is under the marker
      var cards = strip.children;
      var first = cards[0].getBoundingClientRect();
      var second = cards[1].getBoundingClientRect();
      var step = second.left - first.left;
      var cardW = first.width;
      var reelW = reel.clientWidth;
      var jitter = (rand() - 0.5) * (cardW - 14);   // land anywhere inside the card
      var target = winIndex * step + cardW / 2 + jitter - reelW / 2;

      void strip.offsetWidth; // force reflow so the transition starts from 0
      strip.style.transition = "transform " + SPIN_MS + "ms cubic-bezier(0.12, 0.62, 0.08, 1)";
      strip.style.transform = "translateX(" + (-target) + "px)";

      var finished = false;
      function finish() {
        if (finished) return;
        finished = true;
        strip.removeEventListener("transitionend", onEnd);
        var winCard = strip.querySelector('[data-win="1"]');
        if (winCard) winCard.classList.add("winner");
        drops.push(winner);
        renderDrops();
        spinning = false;
        spinBtn.disabled = false;
        select.disabled = false;
      }
      function onEnd(e) {
        if (e.target === strip && e.propertyName === "transform") finish();
      }
      strip.addEventListener("transitionend", onEnd);
      window.setTimeout(finish, SPIN_MS + 400); // safety net
    });
  }

  function fillIdleStrip(strip, pool) {
    strip.innerHTML = "";
    for (var i = 0; i < 14; i++) strip.appendChild(makeCard(pickWeighted(pool)));
    // centre the preview a little so the marker sits over a card
    strip.style.transform = "translateX(-40px)";
  }

  /* ------------------------------------------------------------------ nav */
  function buildNav() {
    navEl.innerHTML = "";
    CATEGORIES.forEach(function (c) {
      if (c.spinOnly) return;
      var a = el("a", null, c.tab);
      a.href = "#" + c.id;
      a.dataset.route = c.id;
      navEl.appendChild(a);
    });
    var r = el("a", null, "Randomize");
    r.href = "#randomize";
    r.dataset.route = "randomize";
    navEl.appendChild(r);
  }

  function route() {
    var hash = decodeURIComponent(location.hash.replace(/^#/, "")) || CATEGORIES[0].id;
    Array.prototype.forEach.call(navEl.children, function (a) {
      a.classList.toggle("active", a.dataset.route === hash);
    });
    if (hash === "randomize") {
      renderSpinner();
      return;
    }
    var cat = CATEGORIES.filter(function (c) { return c.id === hash; })[0] || CATEGORIES[0];
    renderCategory(cat);
  }

  /* ----------------------------------------------------------------- init */
  document.title = SITE.name;
  document.getElementById("siteTitle").textContent = SITE.name;
  buildNav();
  window.addEventListener("hashchange", route);
  route();
})();
