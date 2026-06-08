function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function getToken_() {
  var props = PropertiesService.getScriptProperties();
  return props.getProperty("RSVP_TOKEN") || "";
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("RSVP");
  if (!sheet) sheet = ss.insertSheet("RSVP");

  if (sheet.getLastRow() === 0) {
    sheet
      .getRange(1, 1, 1, 7)
      .setValues([
        [
          "Timestamp",
          "Name",
          "Email",
          "Phone",
          "Attendance",
          "Guest Count",
          "Message",
        ],
      ]);
  }

  return sheet;
}

function normalizeEmail_(email) {
  return String(email || "").trim().toLowerCase();
}

function normalizePhone_(phone) {
  return String(phone || "").trim().replace(/[^\d]/g, "");
}

function findRow_(values, email, phone) {
  var e = normalizeEmail_(email);
  var p = normalizePhone_(phone);
  for (var i = 2; i <= values.length; i++) {
    var row = values[i - 1];
    var rowEmail = normalizeEmail_(row[2]);
    var rowPhone = normalizePhone_(row[3]);
    if (e && rowEmail && rowEmail === e) return i;
    if (p && rowPhone && rowPhone === p) return i;
  }
  return -1;
}

function doPost(e) {
  try {
    var token = (e && e.parameter && e.parameter.token) || "";
    var headerToken = (e && e.headers && (e.headers["X-Token"] || e.headers["x-token"])) || "";
    var shared = getToken_();
    if (!shared || (headerToken !== shared && token !== shared)) {
      return jsonResponse({ ok: false, error: "Unauthorized" });
    }

    var body = {};
    try {
      body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    } catch (err) {
      return jsonResponse({ ok: false, error: "Invalid JSON" });
    }

    var action = String(body.action || "");
    var payload = body.payload || {};

    if (!action) return jsonResponse({ ok: false, error: "Missing action" });

    if (action === "upsert") {
      return upsert_(payload);
    }

    if (action === "lookup") {
      return lookup_(payload);
    }

    return jsonResponse({ ok: false, error: "Unknown action" });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function upsert_(payload) {
  var name = String(payload.name || "").trim();
  var email = normalizeEmail_(payload.email);
  var phone = String(payload.phone || "").trim();
  var attendance = String(payload.attendance || "").trim().toLowerCase();
  var guestCount = Number(payload.guestCount);
  var message = String(payload.message || "").trim();

  if (!name) return jsonResponse({ ok: false, error: "Name is required" });
  if (!email) return jsonResponse({ ok: false, error: "Email is required" });
  if (!phone) return jsonResponse({ ok: false, error: "Phone is required" });
  if (attendance !== "yes" && attendance !== "no")
    return jsonResponse({ ok: false, error: "Attendance must be yes/no" });
  if (!isFinite(guestCount)) guestCount = 0;
  if (guestCount < 0) guestCount = 0;
  if (guestCount > 12) guestCount = 12;
  if (attendance === "yes" && guestCount <= 0)
    return jsonResponse({ ok: false, error: "Guest count must be at least 1" });
  if (attendance === "no") guestCount = 0;

  var lock = LockService.getScriptLock();
  lock.waitLock(8000);
  try {
    var sheet = getSheet_();
    var values = sheet.getDataRange().getValues();
    var row = findRow_(values, email, phone);
    var ts = new Date().toISOString();

    if (row === -1) {
      sheet.appendRow([ts, name, email, phone, attendance, guestCount, message]);
      return jsonResponse({ ok: true, data: { upserted: true } });
    }

    sheet
      .getRange(row, 1, 1, 7)
      .setValues([[ts, name, email, phone, attendance, guestCount, message]]);
    return jsonResponse({ ok: true, data: { upserted: true } });
  } finally {
    lock.releaseLock();
  }
}

function lookup_(payload) {
  var email = payload.email ? normalizeEmail_(payload.email) : "";
  var phone = payload.phone ? String(payload.phone || "").trim() : "";
  if (!email && !phone) return jsonResponse({ ok: false, error: "Provide email or phone" });

  var sheet = getSheet_();
  var values = sheet.getDataRange().getValues();
  var row = findRow_(values, email, phone);
  if (row === -1) return jsonResponse({ ok: true, data: { found: false } });

  var r = values[row - 1];
  return jsonResponse({
    ok: true,
    data: {
      found: true,
      record: {
        timestamp: String(r[0] || ""),
        name: String(r[1] || ""),
        email: String(r[2] || ""),
        phone: String(r[3] || ""),
        attendance: String(r[4] || ""),
        guestCount: Number(r[5] || 0),
        message: String(r[6] || ""),
      },
    },
  });
}

