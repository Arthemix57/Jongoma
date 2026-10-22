// Header + footer partagés, statut ouvert/fermé, rendu du menu, formulaires.
const NAV = [
  ["index.html", "Accueil"],
  ["specialites.html", "Spécialités"],
  ["commander.html", "Commander", [["commander.html#en-ligne", "En ligne"], ["commander.html#livraison", "Livraison à domicile"]]],
  ["traiteur.html", "Traiteur"],
  ["contacts.html", "Contacts"],
];

function tel(p) { return "tel:+33" + p.replace(/\s/g, "").slice(1); }

function renderLayout() {
  const current = location.pathname.split("/").pop() || "index.html";
  const links = NAV.map(([href, label, sub]) => `
    <li class="${sub ? "has-sub" : ""}">
      <a href="${href}" class="${href === current ? "active" : ""}">${label}${sub ? '<span class="chev"></span>' : ""}</a>
      ${sub ? `<ul class="sub">${sub.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul>` : ""}
    </li>`).join("");
  document.getElementById("site-header").innerHTML = `
    <div class="container nav">
      <a class="logo" href="index.html">${RESTO.name}<small>Restaurant africain</small></a>
      <nav id="main-nav" aria-label="Navigation principale"><ul>${links}</ul></nav>
      <div class="nav-actions">
        <a class="nav-phone" href="${tel(RESTO.phones[0])}">${RESTO.phones[0]}</a>
        <a class="btn nav-cta" href="reserver.html">Réserver</a>
        <button class="burger" id="burger" aria-label="Ouvrir le menu" aria-expanded="false"><span></span><span></span></button>
      </div>
    </div>`;

  const hdr = document.getElementById("site-header");
  const burger = document.getElementById("burger");
  const setMenu = open => {
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open);
  };
  burger.onclick = () => setMenu(!document.body.classList.contains("menu-open"));
  document.getElementById("main-nav").addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  addEventListener("keydown", e => e.key === "Escape" && setMenu(false));
  addEventListener("resize", () => innerWidth > 900 && setMenu(false));
  const onScroll = () => hdr.classList.toggle("scrolled", scrollY > 24);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // Barre d'actions mobile
  const bar = document.createElement("div");
  bar.className = "action-bar";
  bar.innerHTML = `<a href="${tel(RESTO.phones[0])}">Appeler</a><a href="reserver.html">Réserver</a><a href="commander.html" class="main">Commander</a>`;
  document.body.appendChild(bar);

  document.getElementById("site-footer").innerHTML = `
    <div class="container">
      <div class="foot">
        <div><h4>${RESTO.name}</h4><p>${RESTO.tagline}</p></div>
        <div><h4>Contact</h4>
          <p>${RESTO.phones.map(p => `<a href="${tel(p)}">${p}</a>`).join("<br>")}</p>
          <p>${RESTO.address}</p></div>
        <div><h4>Navigation</h4>${NAV.map(([h, l]) => `<p><a href="${h}">${l}</a></p>`).join("")}<p><a href="reserver.html">Réserver</a></p></div>
        <div><h4>Paiements acceptés</h4><p>Visa · Mastercard · Ticket Restaurant</p></div>
      </div>
      <p class="copy">© ${new Date().getFullYear()} ${RESTO.name}. Allergènes : ${ALLERGENS}.</p>
    </div>`;
}

const toMin = t => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };

function isOpenNow(d = new Date()) {
  const slots = RESTO.hours[d.getDay()].slots;
  const now = d.getHours() * 60 + d.getMinutes();
  return slots.some(([a, b]) => now >= toMin(a) && now < toMin(b));
}

function renderHours(el) {
  const today = new Date().getDay();
  const order = [1, 2, 3, 4, 5, 6, 0];
  el.innerHTML = order.map(i => {
    const h = RESTO.hours[i];
    return `<tr class="${i === today ? "today" : ""}"><td>${h.day}</td><td>${h.slots.map(s => s.join(" – ").replace(/:/g, "h")).join(" · ")}</td></tr>`;
  }).join("");
}

function renderStatus() {
  document.querySelectorAll(".js-status").forEach(el => {
    const open = isOpenNow();
    el.className = "status js-status " + (open ? "open" : "closed");
    el.textContent = open ? "● Ouvert maintenant" : "● Fermé actuellement";
  });
}

function renderMenu(root, tabs) {
  root.innerHTML = MENU.map(c => `
    <div class="menu-cat" id="${c.id}"><h2>${c.title}</h2>
    ${c.items.map(i => `<div class="dish"><span class="name">${i.n}</span><span class="dots"></span><span class="price">${i.p}</span></div>${i.d ? `<p class="dish-desc">${i.d}</p>` : ""}`).join("")}
    </div>`).join("") + `<p class="note"><strong>Allergènes :</strong> ${ALLERGENS}</p>`;
  tabs.innerHTML = MENU.map(c => `<button data-id="${c.id}">${c.title.replace("Nos ", "")}</button>`).join("");
  const btns = [...tabs.querySelectorAll("button")];
  const spy = new IntersectionObserver(es => es.forEach(x => {
    if (x.isIntersecting) btns.forEach(b => {
      const on = b.dataset.id === x.target.id; b.classList.toggle("active", on);
      if (on) tabs.scrollTo({ left: b.offsetLeft - 20, behavior: "smooth" });
    });
  }), { rootMargin: "-35% 0px -60% 0px" });
  root.querySelectorAll(".menu-cat").forEach(c => spy.observe(c));
  tabs.onclick = e => {
    const id = e.target.dataset.id; if (!id) return;
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };
}

// Formulaires : sans serveur, on ouvre WhatsApp / mail pré-rempli.
// Remplacer par un vrai backend (Formspree, Netlify Forms, API) en production.
function wireForm(id, subject, buildBody) {
  const f = document.getElementById(id); if (!f) return;
  f.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(f));
    const body = buildBody(data);
    location.href = `mailto:${RESTO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    f.querySelector(".success").style.display = "block";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderLayout();
  renderStatus();
  const hrs = document.getElementById("hours-body"); if (hrs) renderHours(hrs);
  const m = document.getElementById("menu-root"); if (m) renderMenu(m, document.getElementById("menu-tabs"));
  document.querySelectorAll(".js-phone").forEach(a => { a.href = tel(RESTO.phones[0]); a.textContent = RESTO.phones[0]; });
  document.querySelectorAll("[data-link]").forEach(a => a.href = RESTO.links[a.dataset.link]);
  const date = document.getElementById("date"); if (date) date.min = new Date().toISOString().split("T")[0];

  wireForm("form-reserver", "Réservation - " + RESTO.name, d =>
    `Nom: ${d.nom}\nTéléphone: ${d.tel}\nDate: ${d.date}\nHeure: ${d.heure}\nPersonnes: ${d.personnes}\nMessage: ${d.message || "-"}`);
  wireForm("form-traiteur", "Demande traiteur - " + RESTO.name, d =>
    `Nom: ${d.nom}\nSociété: ${d.societe || "-"}\nTéléphone: ${d.tel}\nType: ${d.type}\nDate: ${d.date}\nInvités: ${d.invites}\nDétails: ${d.message || "-"}`);
});

// Apparition douce au scroll
document.addEventListener("DOMContentLoaded", () => {
  const els = document.querySelectorAll(".card,.formule,.menu-cat,.form-box,.hero .container,.hours,.note,.split-img,.split-txt");
  els.forEach(e => e.classList.add("reveal"));
  const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: .12 });
  els.forEach(e => io.observe(e));
});
