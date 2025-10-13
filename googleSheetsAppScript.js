function doPost(e) {
  const lock = LockService.getDocumentLock();
  try {
    lock.waitLock(5000);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Claims') || ss.getActiveSheet();

    const data = JSON.parse(e?.postData?.contents || "{}");

    // Base fields from HTML
    const now = new Date();
    const brand         = data.brand?.trim() || "";
    const staff         = data.staff?.trim() || "";
    const claimant      = data.claimant?.trim() || "";
    const sku           = data.sku?.trim() || "";
    const issue         = data.issue?.trim() || "";
    const status        = (data.status || "Submitted").trim();

    const datePurchased = parseAsDate(data.datePurchased);
    const dateReturned  = parseAsDate(data.dateReturned);

    // Basic validation
    if (!brand || !issue || !staff) {
      return json({ ok: false, error: "Missing brand/issue/staff" });
    }

    // headers in row 1, map by position
    const BASE_HEADERS = [
      "Timestamp",
      "Brand",
      "Staff",
      "Claimant",
      "SKU",
      "Date Purchased",
      "Date Returned",
      "Issue",
      "Status",
      "Extras"
    ];

    // header map from row 1 (header to column index)
    const headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const headerMap = headerRow.reduce((m, h, i) => {
      if (h) m[String(h).trim()] = i; // zero-based
      return m;
    }, {});

    for (const h of BASE_HEADERS) {
      if (!(h in headerMap)) {
        return json({ ok: false, error: `Missing expected header: "${h}"` });
      }
    }

    // dynamic brand-specific fields into Extras JSON
    const baseKeys = new Set([
      "brand", "staff", "claimant", "sku",
      "datePurchased", "dateReturned", "issue", "status"
    ]);
    const extras = {};
    Object.keys(data).forEach(k => {
      if (!baseKeys.has(k)) extras[k] = data[k];
    });

    // aligned to current header order
    const row = headerRow.map(() => "");

    put(row, headerMap, "Timestamp", now);
    put(row, headerMap, "Brand", brand);
    put(row, headerMap, "Staff", staff);
    put(row, headerMap, "Claimant", claimant);
    put(row, headerMap, "SKU", sku);
    put(row, headerMap, "Date Purchased", datePurchased);
    put(row, headerMap, "Date Returned",  dateReturned);
    put(row, headerMap, "Issue", issue);
    put(row, headerMap, "Status", status);
    put(row, headerMap, "Extras", Object.keys(extras).length ? JSON.stringify(extras) : "");

    sheet.appendRow(row);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }

  // --- helpers ---

  function json(obj) {
    return ContentService
      .createTextOutput(JSON.stringify(obj))
      .setMimeType(ContentService.MimeType.JSON);
  }

  function put(row, map, header, value) {
    const idx = map[header]; 
    if (idx >= 0) row[idx] = value;
  }

  function parseAsDate(v) {
    if (!v) return "";
    if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v)) {
      const [y, m, d] = v.split("-").map(Number);
      return new Date(y, m - 1, d);
    }
    const d = new Date(v);
    return isNaN(d.getTime()) ? String(v) : d;
  }
}
