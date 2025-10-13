const ALLOWED_ORIGINS = [
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "https://bnewvillage.github.io"
];

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : "null";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}

function preflight(req) {
  const origin = req.headers.get("Origin") || "";
  return new Response(null, { headers: corsHeaders(origin), status: 204 });
}

export default {
  async fetch(req, env) {
    const origin = req.headers.get("Origin") || "";
    const url = new URL(req.url);
    const path = (url.pathname.replace(/\/+$/, "") || "/");

    if (!env.APPSCRIPT_URL) {
      return new Response(JSON.stringify({ ok: false, error: "Missing APPSCRIPT_URL secret" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (req.method === "OPTIONS") return preflight(req);

    if (req.method === "GET" && path === "/time") {
      const timezone = "Asia/Dubai";
      const apiURL = `https://worldtimeapi.org/api/timezone/${encodeURIComponent(timezone)}`;

      try {
        const response = await fetch(apiURL, { headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error(`WorldTimeAPI HTTP ${response.status}`);
        const data = await response.json();
        const time = { ok: true, datetime: data.datetime };
        return new Response(JSON.stringify(time), {
          headers: { "Content-Type": "application/json", ...corsHeaders(origin) }
        });
      } catch (_) {
        const now = new Date();
        const parts = new Intl.DateTimeFormat("en-CA", {
          timeZone: timezone, hour12: false,
          year: "numeric", month: "2-digit", day: "2-digit",
          hour: "2-digit", minute: "2-digit", second: "2-digit"
        }).formatToParts(now);
        const map = Object.fromEntries(parts.map(p => [p.type, p.value]));
        const tzPart = new Intl.DateTimeFormat("en-US", {
          timeZone: timezone, timeZoneName: "shortOffset"
        }).formatToParts(now).find(p => p.type === "timeZoneName")?.value || "GMT+00";
        let offset = "+00:00";
        const m = tzPart.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/);
        if (m) {
          const sign = m[1];
          const hh = m[2].padStart(2, "0");
          const mm = (m[3] ?? "00").padStart(2, "0");
          offset = `${sign}${hh}:${mm}`;
        }
        const datetime = `${map.year}-${map.month}-${map.day}T${map.hour}:${map.minute}:${map.second}${offset}`;
        const time = { ok: true, datetime };
        return new Response(JSON.stringify(time), {
          headers: { "Content-Type": "application/json", ...corsHeaders(origin) }
        });
      }
    }

    if (req.method === "POST" && path === "/claim") {
      try {
        const body = await req.json().catch(() => ({}));
        const payload = { ...body };

        if (!payload.status) payload.status = "Submitted";

        const r = await fetch(env.APPSCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const out = await r.json().catch(() => ({ ok: false, error: "Bad JSON from Apps Script" }));
        const status = out.ok ? 200 : 502;
        return new Response(JSON.stringify(out), {
          status,
          headers: { "Content-Type": "application/json", ...corsHeaders(origin) }
        });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: String(err) }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders(origin) }
        });
      }
    }

    // GET /holidays?year=2025 defaults to current year
    if (req.method === "GET" && path === "/holidays") {
      const origin = req.headers.get("Origin") || "";
      const headers = { "Content-Type": "application/json", ...corsHeaders(origin) };

      const { searchParams } = new URL(req.url);
      const year = searchParams.get("year") || new Date().getFullYear();
      const url = `https://date.nager.at/api/v3/PublicHolidays/${encodeURIComponent(year)}/IM`;

      try {
        const r = await fetch(url, {
          headers: { Accept: "application/json" },
          cf: { cacheTtl: 3600}
        });

        if (r.status !== 200) throw new Error(`Nager HTTP ${r.status}`);
        const list = await r.json();
        if (!list) {
          throw new Error("Empty response body from holiday API");
        }

        const holidays = list.map(h => ({ date: h.date, name: h.localName || h.name }));
        return new Response(JSON.stringify({ ok: true, holidays }), { headers });
      } catch (e) {
        return new Response(JSON.stringify({ ok: false, error: String(e) }), { status: 502, headers });
      }
    }


    return new Response("Not found", {
      status: 404,
      headers: corsHeaders(origin)
    });
  }
};
