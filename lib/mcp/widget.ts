import { avatarDataUri } from "./avatar";

/**
 * MCP App arayüzü (ChatGPT, Claude ve MCP Apps destekleyen diğer istemcilerde sohbet içinde görünür).
 * Tek HTML dosyası; dış bağımlılık ve dış kaynak yok (fotoğraf gömülü, linkler host üzerinden açılır).
 * Host ile postMessage üzerinden JSON-RPC konuşur (spec: @modelcontextprotocol/ext-apps, protokol 2026-01-26).
 * Araç sonucu `structuredContent.kind` alanına göre çizilir: profile | services | service | availability | booking.
 * Eski ChatGPT Apps SDK çalışma ortamı (`window.openai`) için de basit bir yedek yol var.
 */
export const WIDGET_MIME_TYPE = "text/html;profile=mcp-app";

// Arayüz değiştiğinde URI’deki sürümü artırın: hostlar şablonları önbelleğe alabilir.
export const WIDGET_URI = "ui://huntayazerturk/assistant-v2.html";

export const widgetHtml = String.raw`<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  :root { --bg:#ffffff; --card:#f8fafc; --fg:#0f172a; --muted:#475569; --accent:#0f766e; --on-accent:#ffffff; --border:rgba(15,23,42,.12); }
  :root[data-theme="dark"] { --bg:#0d1219; --card:#111923; --fg:#e8edf5; --muted:#8b98ab; --accent:#22d3ee; --on-accent:#0a0a0a; --border:rgba(148,163,184,.18); }
  * { box-sizing: border-box; }
  html, body { margin:0; background:transparent; color:var(--fg); font: 14px/1.5 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; }
  .wrap { padding:16px; background:var(--bg); border-radius:16px; }
  .head { display:flex; gap:12px; align-items:center; }
  .avatar { width:52px; height:52px; border-radius:999px; object-fit:cover; border:2px solid var(--accent); flex:none; }
  .name { font-weight:600; font-size:16px; }
  .sub { color:var(--muted); font-size:13px; }
  h2 { font-size:15px; margin:16px 0 8px; }
  p { margin:8px 0; color:var(--muted); }
  .chips { display:flex; flex-wrap:wrap; gap:6px; margin-top:10px; }
  .chip { border:1px solid var(--border); background:var(--card); border-radius:999px; padding:3px 10px; font-size:12px; }
  .list { display:grid; gap:8px; margin-top:12px; }
  .item { text-align:left; width:100%; border:1px solid var(--border); background:var(--card); color:var(--fg); border-radius:12px; padding:10px 12px; cursor:pointer; font:inherit; }
  .item:hover { border-color:var(--accent); }
  .item b { display:block; font-weight:600; }
  .item span { color:var(--muted); font-size:13px; }
  .item .why { display:block; margin-top:4px; font-size:12px; color:var(--accent); }
  ul { margin:6px 0 0; padding-left:18px; color:var(--muted); }
  .actions { display:flex; flex-wrap:wrap; gap:8px; margin-top:14px; }
  .btn { border:1px solid var(--border); background:var(--card); color:var(--fg); border-radius:10px; padding:8px 12px; cursor:pointer; font:inherit; font-weight:500; }
  .btn.primary { background:var(--accent); color:var(--on-accent); border-color:transparent; }
  .day { margin-top:12px; }
  .day-label { font-weight:600; font-size:13px; margin-bottom:6px; }
  .slots { display:flex; flex-wrap:wrap; gap:6px; }
  .slot { border:1px solid var(--border); background:var(--card); color:var(--fg); border-radius:8px; padding:6px 10px; cursor:pointer; font:inherit; font-size:13px; }
  .slot:hover, .slot.on { border-color:var(--accent); color:var(--accent); }
  .ok { border:1px solid var(--accent); border-radius:12px; padding:12px; margin-top:12px; }
  .ok b { display:block; }
  .muted { color:var(--muted); font-size:12px; margin-top:12px; }
</style>
</head>
<body>
<div class="wrap" id="root"><p>…</p></div>
<script>
(function () {
  var AVATAR = "${avatarDataUri}";
  var T = {
    en: { book: "Book a 30-min call", services: "All services", website: "Website", details: "Details", pick: "Pick a time (times in", calendar: "Booking page", noSlots: "No open times in this range. Open the booking page to see more dates.", fitFor: "Best fit for: ", noMatch: "No direct match for your need; all services:", match: "Match: ", booked: "Your intro call is booked", meet: "Join link", sent: "A confirmation email with the calendar invite is on its way.", whatsapp: "WhatsApp", want: "I'd like to book the intro call on ", at: " at ", start: " (start: ", tz: ", time zone: ", end: ").", fallback: "Online booking isn't available right now. Pick a time on the booking page or send a quick message.", failed: "This time could not be booked.", tip: "Tip: click a time and I'll book it for you." },
    tr: { book: "30 dk görüşme planla", services: "Tüm hizmetler", website: "Web sitesi", details: "Detaylar", pick: "Bir saat seçin (saatler:", calendar: "Randevu sayfası", noSlots: "Bu aralıkta boş saat yok. Diğer tarihler için randevu sayfasını açın.", fitFor: "İhtiyacınıza en uygun: ", noMatch: "İhtiyacınızla doğrudan eşleşen hizmet yok; tüm hizmetler:", match: "Eşleşen: ", booked: "Tanışma görüşmeniz planlandı", meet: "Görüşme linki", sent: "Takvim davetini içeren onay e-postası gönderiliyor.", whatsapp: "WhatsApp", want: "Tanışma görüşmesini şu saate almak istiyorum: ", at: " ", start: " (başlangıç: ", tz: ", saat dilimi: ", end: ").", fallback: "Çevrim içi randevu şu an kullanılamıyor. Randevu sayfasından bir saat seçin veya kısa bir mesaj gönderin.", failed: "Bu saat için randevu oluşturulamadı.", tip: "İpucu: bir saate tıklayın, randevuyu sizin için oluşturayım." }
  };
  var data = null, lang = "en", nextId = 1, pending = {};
  var root = document.getElementById("root");

  function post(msg) { window.parent.postMessage(msg, "*"); }
  function request(method, params) {
    var id = nextId++;
    post({ jsonrpc: "2.0", id: id, method: method, params: params || {} });
    return new Promise(function (resolve, reject) {
      pending[id] = { resolve: resolve, reject: reject };
      setTimeout(function () { if (pending[id]) { delete pending[id]; reject(new Error("timeout")); } }, 15000);
    });
  }
  function notify(method, params) { post({ jsonrpc: "2.0", method: method, params: params || {} }); }
  function fallbackOpen(url) {
    var o = window.openai;
    if (o && typeof o.openExternal === "function") { try { o.openExternal({ href: url }); return; } catch (e) {} }
    window.open(url, "_blank", "noopener");
  }
  function openLink(url) {
    if (!url) return;
    var o = window.openai;
    if (o && typeof o.openExternal === "function") { fallbackOpen(url); return; }
    request("ui/open-link", { url: url }).then(function (r) {
      if (r && r.isError) fallbackOpen(url);
    }).catch(function () { fallbackOpen(url); });
  }
  function say(text) {
    request("ui/message", { role: "user", content: [{ type: "text", text: text }] }).catch(function () {
      var o = window.openai;
      if (o && typeof o.sendFollowUpMessage === "function") { try { o.sendFollowUpMessage({ prompt: text }); } catch (e) {} }
    });
  }
  function applyTheme(ctx) {
    var theme = ctx && ctx.theme;
    if (!theme && window.openai && window.openai.theme) theme = window.openai.theme;
    if (!theme) theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function button(label, cls, onClick) {
    var b = el("button", cls, label);
    b.type = "button";
    b.addEventListener("click", onClick);
    return b;
  }
  function header(d) {
    var h = el("div", "head");
    var img = el("img", "avatar"); img.src = AVATAR; img.alt = ""; h.appendChild(img);
    var box = el("div");
    box.appendChild(el("div", "name", d.name || "Huntay AzerTürk"));
    if (d.headline) box.appendChild(el("div", "sub", d.headline));
    h.appendChild(box);
    return h;
  }
  function actions(d, extra) {
    var t = T[lang], a = el("div", "actions"), links = d.links || {};
    if (links.book) a.appendChild(button(t.book, "btn primary", function () { openLink(links.book); }));
    (extra || []).forEach(function (x) { a.appendChild(x); });
    if (links.whatsapp) a.appendChild(button(t.whatsapp, "btn", function () { openLink(links.whatsapp); }));
    return a;
  }

  function render() {
    if (!data) return;
    var t = T[lang], links = data.links || {};
    root.innerHTML = "";
    root.appendChild(header(data));

    if (data.kind === "profile") {
      if (data.summary) root.appendChild(el("p", null, data.summary));
      var chips = el("div", "chips");
      (data.highlights || []).forEach(function (c) { chips.appendChild(el("span", "chip", c)); });
      root.appendChild(chips);
      root.appendChild(actions(data, [
        button(t.services, "btn", function () { openLink(links.services); }),
        button(t.website, "btn", function () { openLink(links.website); })
      ]));
    }

    if (data.kind === "services") {
      if (data.need) root.appendChild(el("p", null, data.matched ? t.fitFor + "“" + data.need + "”" : t.noMatch));
      var list = el("div", "list");
      (data.services || []).forEach(function (s) {
        var b = button("", "item", function () { openLink(s.url); });
        b.appendChild(el("b", null, s.title));
        b.appendChild(el("span", null, s.tagline));
        if (s.reason) b.appendChild(el("span", "why", t.match + s.reason));
        list.appendChild(b);
      });
      root.appendChild(list);
      root.appendChild(actions(data, [button(t.services, "btn", function () { openLink(links.services); })]));
    }

    if (data.kind === "service" && data.service) {
      var s = data.service;
      root.appendChild(el("h2", null, s.title));
      root.appendChild(el("p", null, s.summary));
      var ul = el("ul");
      (s.deliverables || []).forEach(function (x) { ul.appendChild(el("li", null, x)); });
      root.appendChild(ul);
      root.appendChild(actions(data, [button(t.details, "btn", function () { openLink(s.url); })]));
    }

    if (data.kind === "availability") {
      if (!data.configured) {
        root.appendChild(el("p", null, t.fallback));
      } else {
        root.appendChild(el("p", null, t.pick + " " + data.timeZone + ")"));
        var days = data.days || [];
        if (!days.length) root.appendChild(el("p", null, t.noSlots));
        days.forEach(function (day) {
          var box = el("div", "day");
          box.appendChild(el("div", "day-label", day.label));
          var row = el("div", "slots");
          (day.slots || []).forEach(function (slot) {
            var b = button(slot.label, "slot", function () {
              Array.prototype.forEach.call(root.querySelectorAll(".slot.on"), function (x) { x.className = "slot"; });
              b.className = "slot on";
              say(t.want + day.label + t.at + slot.label + t.start + slot.start + t.tz + data.timeZone + t.end);
            });
            row.appendChild(b);
          });
          box.appendChild(row);
          root.appendChild(box);
        });
        if (days.length) root.appendChild(el("p", "muted", t.tip));
      }
      var extra = [];
      if (links.calendar && links.calendar !== links.book) extra.push(button(t.calendar, "btn", function () { openLink(links.calendar); }));
      root.appendChild(actions(data, extra));
    }

    if (data.kind === "booking") {
      var ok = el("div", "ok");
      if (data.status === "confirmed" || data.status === "pending") {
        ok.appendChild(el("b", null, t.booked));
        if (data.startLabel) ok.appendChild(el("p", null, data.startLabel + " (" + data.timeZone + ")"));
        if (data.meetingUrl) ok.appendChild(button(t.meet, "btn primary", function () { openLink(data.meetingUrl); }));
        ok.appendChild(el("p", null, t.sent));
        root.appendChild(ok);
      } else {
        ok.appendChild(el("b", null, t.failed));
        if (data.message) ok.appendChild(el("p", null, data.message));
        root.appendChild(ok);
        root.appendChild(actions(data, links.calendar && links.calendar !== links.book ? [button(t.calendar, "btn", function () { openLink(links.calendar); })] : []));
      }
    }
    resize();
  }

  function resize() {
    requestAnimationFrame(function () {
      var height = Math.ceil(document.documentElement.scrollHeight);
      notify("ui/notifications/size-changed", { height: height });
      var o = window.openai;
      if (o && typeof o.notifyIntrinsicHeight === "function") { try { o.notifyIntrinsicHeight(height); } catch (e) {} }
    });
  }

  function show(sc) {
    if (sc && sc.kind) { data = sc; lang = sc.lang === "tr" ? "tr" : "en"; render(); }
  }

  window.addEventListener("message", function (event) {
    var m = event.data;
    if (!m || m.jsonrpc !== "2.0") return;
    if (m.id != null && !m.method && pending[m.id]) {
      var p = pending[m.id]; delete pending[m.id];
      if (m.error) p.reject(m.error); else p.resolve(m.result);
      return;
    }
    if (m.method === "ui/notifications/tool-result") {
      show(m.params && m.params.structuredContent);
    } else if (m.method === "ui/notifications/host-context-changed") {
      applyTheme(m.params);
    } else if (m.method && m.id != null) {
      // Host’tan gelen istekler (ör. ui/resource-teardown): boş sonuçla onayla.
      post({ jsonrpc: "2.0", id: m.id, result: {} });
    }
  });

  // Eski ChatGPT Apps SDK ortamı: sonuç window.openai.toolOutput içinde gelir.
  function fromOpenAI() {
    var o = window.openai;
    if (o && o.toolOutput && !data) show(o.toolOutput);
    if (o && o.theme) applyTheme({ theme: o.theme });
  }
  window.addEventListener("openai:set_globals", fromOpenAI);

  applyTheme(null);
  fromOpenAI();
  request("ui/initialize", {
    appInfo: { name: "huntayazerturk-assistant", version: "1.0.0" },
    appCapabilities: {},
    protocolVersion: "2026-01-26"
  }).then(function (result) {
    applyTheme(result && result.hostContext);
    notify("ui/notifications/initialized", {});
  }).catch(function () {});
  if (window.ResizeObserver) new ResizeObserver(resize).observe(document.body);
})();
</script>
</body>
</html>`;
