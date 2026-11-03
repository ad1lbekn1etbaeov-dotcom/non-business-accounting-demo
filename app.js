const STORAGE_KEY = "issiq-non-demo-documents-v1";

const moduleInfo = {
  purchases: { title: "Xaridlar", subtitle: "Yetkazib beruvchilardan mahsulot va xomashyo xaridi.", symbol: "↙", description: "Xarid hujjatlari, kirim fakturalari va yetkazib beruvchi qarzlarini ko'rish.", label: "Xarid kirimi", types: ["purchase"] },
  warehouse: { title: "Ombor", subtitle: "Xomashyo, tayyor mahsulot va ombor harakatlari.", symbol: "▤", description: "Qoldiqlar, kirim-chiqim va mahsulotlar harakatini nazorat qilish.", label: "Ombor harakati", types: ["warehouse", "purchase", "production", "sale"] },
  production: { title: "Ishlab chiqarish", subtitle: "Non sexi smenalari va tayyor mahsulot hisoboti.", symbol: "⚙", description: "Ishlab chiqarilgan mahsulotlar, sarflangan xomashyo va smena natijalari.", label: "Ishlab chiqarish", types: ["production"] },
  sales: { title: "Savdo", subtitle: "Realizatsiya, mijozlar va tushumlar.", symbol: "↗", description: "Savdo hujjatlari, mijozlar qarzi va realizatsiya aylanmasi.", label: "Savdo realizatsiyasi", types: ["sale"] },
  pos: { title: "KKM cheklari", subtitle: "Kassa apparati cheklari va to'lovlar.", symbol: "▣", description: "Naqd va terminal tushumlarini mahsulot kesimida ko'rish.", label: "KKM cheki", types: ["pos"] },
  accounting: { title: "Buxgalteriya", subtitle: "Hisobvaraqlar, memorial orderlar va bosh kitob.", symbol: "▧", description: "2025-yil hisobotlari asosida buxgalteriya aylanmalarini ko'rish.", label: "Buxgalteriya yozuvi", types: ["accounting"] },
  import: { title: "2025 import", subtitle: "Excel va CSV fayllarini tekshirish va yuklashga tayyorlash.", symbol: "⇧", description: "Fayl mazmunini avval tekshirish, so'ng tasdiqlangan qatorlarni import qilish.", label: "Import yozuvi", types: [] }
};

const seededDocuments = [
  { type: "purchase", number: "XK-00241", date: "2025-11-03", partner: "Yetkazib beruvchi A", amount: 12600000, status: "Tasdiqlangan" },
  { type: "sale", number: "SR-00876", date: "2025-11-03", partner: "Chakana savdo nuqtasi A", amount: 8420000, status: "Tasdiqlangan" },
  { type: "production", number: "IS-00128", date: "2025-11-03", partner: "Non sexi · 3-smena", amount: 3240000, status: "Yakunlangan" },
  { type: "pos", number: "KKM-06412", date: "2025-11-03", partner: "Naqd 1 250 000 · Terminal 860 000", amount: 2110000, status: "Tasdiqlangan" },
  { type: "accounting", number: "MO-20-10", date: "2025-10-31", partner: "4010 / 9014 · Oktabr savdosi", amount: 78861111, status: "Qoralama" },
  { type: "warehouse", number: "OK-00317", date: "2025-11-02", partner: "Bug'doy uni, 1-nav", amount: 5400000, status: "Tasdiqlangan" }
];

const typeLabels = {
  purchase: "Xarid kirimi",
  warehouse: "Ombor harakati",
  production: "Ishlab chiqarish",
  sale: "Savdo realizatsiyasi",
  pos: "KKM cheki",
  accounting: "Buxgalteriya yozuvi"
};
const typeIcons = { purchase: "↙", warehouse: "▤", production: "⚙", sale: "↗", pos: "▣", accounting: "▧" };
const typeColors = { purchase: "orange", warehouse: "blue", production: "green", sale: "orange", pos: "purple", accounting: "blue" };

let activePage = "dashboard";
let toastTimer;

function readDocuments() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    console.error("Demo hujjatlarini o'qib bo'lmadi:", error);
    return [];
  }
}

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString("uz-UZ")} so'm`;
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("uz-UZ", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}

function statusClass(status) {
  if (status === "Qoralama") return "draft";
  if (status === "Kutilmoqda") return "pending";
  return "";
}

function documentRow(doc) {
  return `<tr>
    <td><span class="doc-type"><span class="doc-icon ${typeColors[doc.type] || "blue"}">${typeIcons[doc.type] || "•"}</span>${typeLabels[doc.type] || "Hujjat"}</span></td>
    <td>${escapeHtml(doc.number || "DEMO")}</td>
    <td>${formatDate(doc.date)}</td>
    <td>${escapeHtml(doc.partner || "—")}</td>
    <td><strong>${formatMoney(doc.amount)}</strong></td>
    <td><span class="status-pill ${statusClass(doc.status)}">${escapeHtml(doc.status || "Qoralama")}</span></td>
  </tr>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

function renderDashboard() {
  const rows = [...seededDocuments, ...readDocuments()].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  document.getElementById("recent-documents").innerHTML = rows.map(documentRow).join("");
}

function renderModule(page) {
  const info = moduleInfo[page];
  const documents = [...seededDocuments, ...readDocuments()].filter((doc) => info.types.includes(doc.type)).sort((a, b) => b.date.localeCompare(a.date));
  const isImport = page === "import";
  document.getElementById("module-symbol").textContent = info.symbol;
  document.getElementById("module-heading").textContent = info.title;
  document.getElementById("module-description").textContent = info.description;
  document.getElementById("module-table").classList.toggle("hidden", isImport);
  document.getElementById("import-panel").classList.toggle("hidden", !isImport);
  document.getElementById("module-note").classList.toggle("hidden", isImport);
  document.getElementById("module-table-title").textContent = info.label + " hujjatlari";
  document.getElementById("module-documents").innerHTML = documents.map(documentRow).join("");
  document.getElementById("empty-state").classList.toggle("hidden", documents.length > 0);

  const amount = documents.reduce((sum, doc) => sum + Number(doc.amount || 0), 0);
  document.getElementById("module-stats").innerHTML = isImport
    ? `<div class="module-stat"><span>Demo fayllar</span><strong>CSV <small>oldindan ko'rish</small></strong></div>
       <div class="module-stat"><span>Yuklash rejimi</span><strong>Tekshiruv <small>1C ga yozilmaydi</small></strong></div>`
    : `<div class="module-stat"><span>Hujjatlar soni</span><strong>${documents.length} <small>ta</small></strong></div>
       <div class="module-stat"><span>Jami summa</span><strong>${formatMoney(amount)}</strong></div>`;
}

function navigate(page) {
  activePage = page;
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.page === page));
  document.getElementById("dashboard-page").classList.toggle("hidden", page !== "dashboard");
  document.getElementById("module-page").classList.toggle("hidden", page === "dashboard");
  document.getElementById("page-title").textContent = page === "dashboard" ? "Bosh sahifa" : moduleInfo[page].title;
  document.getElementById("page-subtitle").textContent = page === "dashboard" ? "Korxonangizning kundalik holati bir joyda." : moduleInfo[page].subtitle;
  document.getElementById("crumb").textContent = page === "dashboard" ? "Bosh sahifa" : moduleInfo[page].title;
  if (page === "dashboard") renderDashboard();
  else renderModule(page);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add("hidden"), 3000);
}

function openModal() {
  const modal = document.getElementById("document-modal");
  document.getElementById("document-date").value = new Date().toISOString().slice(0, 10);
  const suggested = activePage !== "dashboard" && activePage !== "import" ? moduleInfo[activePage].types[0] : "purchase";
  document.getElementById("document-type").value = suggested || "purchase";
  modal.classList.remove("hidden");
  document.getElementById("document-partner").focus();
}

function closeModal() {
  document.getElementById("document-modal").classList.add("hidden");
  document.getElementById("document-form").reset();
}

function parseCsv(text) {
  const sample = text.split(/\r?\n/).slice(0, 5).join("\n");
  const candidates = [";", ",", "\t"];
  const delimiter = candidates.sort((a, b) => sample.split(b).length - sample.split(a).length)[0];
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (char === '"' && quoted && text[i + 1] === '"') {
      value += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      row.push(value);
      value = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && text[i + 1] === "\n") i += 1;
      row.push(value);
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }
  row.push(value);
  if (row.some((cell) => cell.trim())) rows.push(row);
  return rows;
}

document.getElementById("csv-file").addEventListener("change", async (event) => {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const result = document.getElementById("import-result");
  try {
    const buffer = await file.arrayBuffer();
    const utf8 = new TextDecoder("utf-8", { fatal: true });
    let text;
    try {
      text = utf8.decode(buffer);
    } catch {
      text = new TextDecoder("windows-1251").decode(buffer);
    }
    const rows = parseCsv(text);
    if (!rows.length) {
      showToast("CSV faylda ko'rish uchun qator topilmadi.");
      return;
    }
    const columns = Math.max(...rows.slice(0, 8).map((row) => row.length));
    const header = rows[0];
    document.getElementById("import-meta").textContent = `${file.name} · ${rows.length - 1} ta ma'lumot qatori · ${columns} ta ustun`;
    document.getElementById("import-head").innerHTML = `<tr>${Array.from({ length: columns }, (_, index) => `<th>${escapeHtml(header[index] || `USTUN ${index + 1}`)}</th>`).join("")}</tr>`;
    document.getElementById("import-body").innerHTML = rows.slice(1, 9).map((row) => `<tr>${Array.from({ length: columns }, (_, index) => `<td>${escapeHtml(row[index] || "")}</td>`).join("")}</tr>`).join("");
    result.classList.remove("hidden");
    showToast("Fayl mahalliy ravishda ko'rib chiqildi; ma'lumot yuborilmadi.");
  } catch (error) {
    console.error("CSV faylni o'qib bo'lmadi:", error);
    showToast("CSV faylni o'qib bo'lmadi. Kodlash yoki formatni tekshiring.");
  }
});

document.getElementById("main-nav").addEventListener("click", (event) => {
  const item = event.target.closest("[data-page]");
  if (item) navigate(item.dataset.page);
});
document.querySelectorAll("[data-navigate]").forEach((button) => button.addEventListener("click", () => navigate(button.dataset.navigate)));
document.getElementById("new-document").addEventListener("click", openModal);
document.getElementById("module-new-document").addEventListener("click", openModal);
document.getElementById("close-modal").addEventListener("click", closeModal);
document.getElementById("cancel-modal").addEventListener("click", closeModal);
document.getElementById("document-modal").addEventListener("click", (event) => {
  if (event.target.id === "document-modal") closeModal();
});
document.getElementById("dismiss-notice").addEventListener("click", () => document.querySelector(".notice").remove());

document.getElementById("document-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const type = document.getElementById("document-type").value;
  const date = document.getElementById("document-date").value;
  const amount = Number(document.getElementById("document-amount").value);
  const partner = document.getElementById("document-partner").value.trim();
  if (!date || !partner || !Number.isFinite(amount) || amount < 0) {
    showToast("Maydonlarni to'g'ri to'ldiring.");
    return;
  }
  const documents = readDocuments();
  documents.push({
    type,
    number: `DEMO-${String(documents.length + 1).padStart(4, "0")}`,
    date,
    amount,
    partner,
    status: "Qoralama"
  });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
  } catch (error) {
    console.error("Demo hujjatini saqlab bo'lmadi:", error);
    showToast("Brauzer xotirasiga saqlab bo'lmadi.");
    return;
  }
  closeModal();
  if (activePage === "dashboard") renderDashboard();
  else renderModule(activePage);
  showToast("Demo hujjat shu brauzerda saqlandi.");
});

document.getElementById("document-type").addEventListener("change", (event) => {
  if (event.target.value === "production") document.getElementById("document-partner").placeholder = "Masalan: Non sexi, 1-smena";
  else if (event.target.value === "pos") document.getElementById("document-partner").placeholder = "Masalan: Naqd yoki terminal to'lovi";
  else document.getElementById("document-partner").placeholder = "Masalan: Yetkazib beruvchi yoki mahsulot";
});

navigate("dashboard");
