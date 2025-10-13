const BASE = "https://uae.oldtimerwarranties.workers.dev";

export async function callWorkerAPI(path, { method = "GET", data } = {}) {
  const options = { method };
  if (data !== undefined) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(data);
  }
  const res = await fetch(`${BASE}${path}`, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function submitForm(data){
  return callWorkerAPI("/claim", {method: "POST", data});
}

export async function mountHolidayStrip() {
  const main = document.querySelector("main");
  if (!main) return;

  // container
  const id = "holiday-strip";
  if (document.getElementById(id)) return;
  main.insertAdjacentHTML(
    "beforeend",
    `
    <section id="${id}" class="holiday-strip card hidden" aria-live="polite">
      <div class="holiday-strip__header">
        <span class="holiday-strip__title">Public Holidays (IM)</span>
        <button type="button" class="holiday-strip__toggle" aria-expanded="false">Show all</button>
      </div>
      <ul class="holiday-strip__list" role="list"></ul>
    </section>
    `
  );

  const host   = document.getElementById(id);
  const listEl = host.querySelector(".holiday-strip__list");
  const toggle = host.querySelector(".holiday-strip__toggle");

  // fetch once year
  const year = new Date().getFullYear();
let holidays = [];

try {
  const { ok, holidays: data = [] } = await callWorkerAPI(`/holidays?year=${year}`);
  if (!ok) throw new Error("holidays fetch failed");
  holidays = Array.isArray(data) ? data : [];
} catch (e) {
  console.error("Error fetching holidays:", e);
  holidays = []; 
  return holidays;
}


  //upcoming ones (today or later)
  const today = new Date();
  const toDate = (s) => {
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, m - 1, d);
  };
  const upcoming = holidays
    .map(h => ({ ...h, _d: toDate(h.date) }))
    .filter(h => h._d >= new Date(today.getFullYear(), today.getMonth(), today.getDate()))
    .sort((a, b) => a._d - b._d);

  // first 5 inline, rest collapsible
  const fmt = (d) =>
    d.toLocaleDateString(undefined, { weekday: "short", day: "2-digit", month: "short" });
  const makeItem = (h) => `
    <li class="holiday-chip" title="${h.name} on ${h.date}">
      <span class="holiday-chip__date">${fmt(h._d)}</span>
      <span class="holiday-chip__name">${h.name}</span>
    </li>`;

  const first = upcoming.slice(0, 5);
  const more  = upcoming.slice(5);

  listEl.innerHTML = [
    ...first.map(makeItem),
    ...(more.length
      ? [`<li class="holiday-chip holiday-chip--more" hidden>
            ${more.map(makeItem).join("")}
          </li>`]
      : [])
  ].join("");

  //wire toggle
  if (more.length) {
    toggle.addEventListener("click", () => {
      const moreEl = host.querySelector(".holiday-chip--more");
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      moreEl.hidden = expanded;
      toggle.textContent = expanded ? "Show all" : "Show less";
    });
  } else {
    toggle.remove();
  }

  host.classList.remove("hidden");
}
