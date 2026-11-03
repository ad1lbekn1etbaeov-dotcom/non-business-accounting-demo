const STORAGE_KEY = "issiq-non-demo-documents-v1";
const LOGIN_KEY = "non-korxonasi-demo-user-v1";
const selectedYearKey = "non-korxonasi-demo-year-v1";
const months = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentyabr", "Oktabr", "Noyabr", "Dekabr"];
const accountNames = {
  "0100": "Asosiy vositalar", "0200": "Asosiy vositalar eskirishi", "1010": "Xomashyo va materiallar",
  "2014": "Ombordagi tayyor mahsulot", "4010": "Xaridorlar bilan hisob-kitob", "5010": "Kassa",
  "5110": "Hisob-kitob schyoti", "6010": "Yetkazib beruvchilar bilan hisob-kitob",
  "6410": "Byudjet bilan hisob-kitob", "6710": "Ish haqi bo'yicha hisob-kitob",
  "8300": "Ustav kapitali", "9010": "Mahsulot realizatsiyasidan daromad",
  "9110": "Realizatsiya tannarxi", "9420": "Ma'muriy xarajatlar"
};
const navGroups = [
  { title: "UMUMIY", pages: [["dashboard", "▦", "Bosh sahifa"]] },
  { title: "OPERATSIYALAR", pages: [["purchases", "↙", "Xaridlar"], ["purchaseInvoices", "▧", "Kirim hisob-fakturalari"], ["warehouse", "▤", "Ombor"], ["production", "⚙", "Ishlab chiqarish"], ["sales", "↗", "Savdo va realizatsiya"], ["pos", "▣", "KKM cheklari"], ["cashBank", "◉", "Kassa va bank"], ["counterparties", "♙", "Kontragentlar"]] },
  { title: "KORXONA", pages: [["employees", "♧", "Xodimlar"], ["payroll", "₽", "Ish haqi"], ["assets", "▥", "Asosiy vositalar"], ["expenses", "◌", "Xarajatlar"]] },
  { title: "HISOBOTLAR", pages: [["order3", "№", "Memorial order №3"], ["order5", "№", "Memorial order №5"], ["order7", "№", "Memorial order №7"], ["order15", "№", "Memorial order №15"], ["order20", "№", "Memorial order №20"], ["order23", "№", "Memorial order №23"], ["generalLedger", "▦", "Bosh kitob"], ["turnover4010", "↔", "Aylanma 4010"], ["turnover6010", "↔", "Aylanma 6010"], ["balance", "▤", "Balans"]] },
  { title: "BOSHQARUV", pages: [["import", "⇧", "Fayllarni ko'rish"], ["settings", "⚙", "Sozlamalar"]] }
];

const pageInfo = {
  purchases: { title: "Xaridlar", subtitle: "Xomashyo va tovarlarni xarid qilish, kirim hamda hisob-kitob.", kind: "documents", types: ["purchase"] },
  purchaseInvoices: { title: "Kirim hisob-fakturalari", subtitle: "Yetkazib beruvchilardan olingan hisob-fakturalar va ESF.", kind: "documents", types: ["purchase"] },
  warehouse: { title: "Ombor", subtitle: "Xomashyo va tayyor mahsulot qoldiqlari, kirim-chiqim harakati.", kind: "documents", types: ["warehouse", "purchase", "production", "sale"] },
  production: { title: "Ishlab chiqarish", subtitle: "Non sexi, retseptura, xomashyo sarfi va smena hisoboti.", kind: "documents", types: ["production"] },
  sales: { title: "Savdo va realizatsiya", subtitle: "Mahsulot realizatsiyasi, xaridorlar va tushum hujjatlari.", kind: "documents", types: ["sale"] },
  pos: { title: "KKM cheklari", subtitle: "Kassa cheklari, naqd va terminal tushumlari.", kind: "documents", types: ["pos"] },
  cashBank: { title: "Kassa va bank", subtitle: "Kassa kirim-chiqimi, bank ko'chirmalari va pul harakati.", kind: "documents", types: ["cash", "accounting"] },
  counterparties: { title: "Kontragentlar", subtitle: "Yetkazib beruvchilar va xaridorlar bo'yicha hisob-kitoblar.", kind: "documents", types: ["purchase", "sale"] },
  employees: { title: "Xodimlar", subtitle: "Xodimlar ro'yxati va mehnat ma'lumotlari uchun katalog.", kind: "catalog", items: ["Ishlab chiqarish xodimlari", "Ma'muriy xodimlar", "Savdo xodimlari"] },
  payroll: { title: "Ish haqi", subtitle: "Ish haqi hisoblash va 6710 hisobvarag'i bo'yicha majburiyatlar.", kind: "documents", types: ["payroll"] },
  assets: { title: "Asosiy vositalar", subtitle: "Bino, jihozlar, transport va eskirish hisobini yuritish.", kind: "catalog", items: ["Bino · 0121", "Машина ва оборудов. · 0130", "Мебел ва офис жиҳози · 0140"] },
  expenses: { title: "Xarajatlar", subtitle: "Xomashyo, ish haqi va davr xarajatlarini hisobga olish.", kind: "documents", types: ["expense", "payroll"] },
  order3: { title: "Memorial order №3", subtitle: "Kassa va bank bo'yicha aylanmalar jurnali · МО 3 shakli.", kind: "order", order: "3" },
  order5: { title: "Memorial order №5", subtitle: "Yetkazib beruvchilar bilan hisob-kitoblar · МО 5 shakli.", kind: "order", order: "5" },
  order7: { title: "Memorial order №7", subtitle: "Xaridorlar bilan hisob-kitoblar · МО 7 shakli.", kind: "order", order: "7" },
  order15: { title: "Memorial order №15", subtitle: "Ish haqi bo'yicha hisob-kitoblar · МО 15 shakli.", kind: "order", order: "15" },
  order20: { title: "Memorial order №20", subtitle: "Tayyor mahsulot va realizatsiya tannarxi · МО 20 shakli.", kind: "order", order: "20" },
  order23: { title: "Memorial order №23", subtitle: "Boshqa hisob-kitoblar va xarajatlar · МО 23 shakli.", kind: "order", order: "23" },
  generalLedger: { title: "Bosh kitob", subtitle: "Hisobvaraqlar bo'yicha debet, kredit va davr oxiridagi qoldiq.", kind: "ledger" },
  turnover4010: { title: "Aylanma qaydnomasi · 4010", subtitle: "Xaridorlar bilan hisob-kitoblarning kontragentlar kesimidagi aylanmasi.", kind: "turnover", account: "4010" },
  turnover6010: { title: "Aylanma qaydnomasi · 6010", subtitle: "Yetkazib beruvchilar bilan hisob-kitoblarning kontragentlar kesimidagi aylanmasi.", kind: "turnover", account: "6010" },
  balance: { title: "Buxgalteriya balansi", subtitle: "Aktivlar, majburiyatlar va xususiy kapital · oy yakuni yoki yillik.", kind: "balance" },
  import: { title: "Fayllarni ko'rish", subtitle: "Yuborilgan 2025 Excel va CSV shakllari bo'yicha faylni mahalliy tekshirish.", kind: "import" },
  settings: { title: "Sozlamalar", subtitle: "Demo korxona va hisob tizimi haqida.", kind: "settings" }
};

const seededDocuments = [
  { id: "seed-1", type: "purchase", number: "XK-00241", date: "2025-11-03", partner: "Yetkazib beruvchi A", description: "Bug'doy uni, 1-nav · 1 200 kg", amount: 12600000, status: "Tasdiqlangan", order: "5", debit: "1010", credit: "6010" },
  { id: "seed-2", type: "sale", number: "SR-00876", date: "2025-11-03", partner: "Chakana savdo nuqtasi A", description: "Non mahsulotlari realizatsiyasi", amount: 8420000, status: "Tasdiqlangan", order: "7", debit: "4010", credit: "9010" },
  { id: "seed-3", type: "production", number: "IS-00128", date: "2025-11-03", partner: "Non sexi · 3-smena", description: "3 240 dona tayyor non", amount: 3240000, status: "Yakunlangan", order: "20", debit: "2014", credit: "1010" },
  { id: "seed-4", type: "pos", number: "KKM-06412", date: "2025-11-03", partner: "Naqd 1 250 000 · Terminal 860 000", description: "Chakana savdo cheklari", amount: 2110000, status: "Tasdiqlangan", order: "3", debit: "5010", credit: "9010" },
  { id: "seed-5", type: "accounting", number: "MO-20-10", date: "2025-10-31", partner: "4010 / 9014 · Oktabr savdosi", description: "Memorial order №20 · Oktabr", amount: 78861111, status: "Qoralama", order: "20", debit: "4010", credit: "9014" },
  { id: "seed-6", type: "warehouse", number: "OK-00317", date: "2025-11-02", partner: "Bug'doy uni, 1-nav", description: "Omborlararo harakat", amount: 5400000, status: "Tasdiqlangan", order: "23", debit: "1010", credit: "2014" },
  { id: "seed-7", type: "payroll", number: "ISH-01025", date: "2025-10-31", partner: "Ishlab chiqarish xodimlari", description: "Oktabr ish haqi", amount: 8400000, status: "Tasdiqlangan", order: "15", debit: "9421", credit: "6710" },
  { id: "seed-8", type: "expense", number: "XAR-00412", date: "2025-10-29", partner: "Kommunal xizmatlar", description: "Elektr va gaz xarajati", amount: 2350000, status: "Kutilmoqda", order: "23", debit: "9430", credit: "6010" }
];

const typeLabels = { purchase: "Xarid kirimi", warehouse: "Ombor harakati", production: "Ishlab chiqarish", sale: "Savdo realizatsiyasi", pos: "KKM cheki", accounting: "Buxgalteriya yozuvi", cash: "Kassa / bank", payroll: "Ish haqi", expense: "Xarajat" };
const typeIcons = { purchase: "↙", warehouse: "▤", production: "⚙", sale: "↗", pos: "▣", accounting: "▧", cash: "◉", payroll: "₽", expense: "◌" };
const typeColors = { purchase: "orange", warehouse: "blue", production: "green", sale: "orange", pos: "purple", accounting: "blue", cash: "green", payroll: "purple", expense: "orange" };

let activePage = "dashboard";
let toastTimer;

function getDocuments() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    console.error("Demo hujjatlarini o'qib bo'lmadi:", error);
    return [];
  }
}

function allDocuments() {
  return [...seededDocuments, ...getDocuments()];
}

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString("uz-UZ")} so'm`;
}

function formatDate(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("uz-UZ", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${value}T00:00:00`));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function statusClass(status) {
  if (status === "Qoralama") return "draft";
  if (status === "Kutilmoqda") return "pending";
  return "";
}

function documentRow(doc, actions = false) {
  return `<tr>
    <td><span class="doc-type"><span class="doc-icon ${typeColors[doc.type] || "blue"}">${typeIcons[doc.type] || "•"}</span>${typeLabels[doc.type] || "Hujjat"}</span></td>
    <td>${escapeHtml(doc.number || "DEMO")}</td><td>${formatDate(doc.date)}</td>
    <td>${escapeHtml(doc.partner || doc.description || "—")}</td>
    <td><strong>${formatMoney(doc.amount)}</strong></td>
    <td><span class="status-pill ${statusClass(doc.status)}">${escapeHtml(doc.status || "Qoralama")}</span></td>
    ${actions ? `<td><button class="row-delete" data-delete="${escapeHtml(doc.id)}" title="Demo hujjatni o'chirish" aria-label="O'chirish">×</button></td>` : ""}
  </tr>`;
}

function renderNavigation() {
  const nav = document.getElementById("main-nav");
  nav.innerHTML = navGroups.map((group) => `<div class="nav-caption">${group.title}</div>${group.pages.map(([id, icon, title]) =>
    `<button class="nav-item ${id === activePage ? "active" : ""}" data-page="${id}"><span class="nav-icon">${icon}</span><span>${title}</span></button>`
  ).join("")}`).join("");
}

function renderDashboard() {
  document.getElementById("recent-documents").innerHTML = allDocuments().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6).map((doc) => documentRow(doc)).join("");
}

function renderDocuments(page, info) {
  const docs = allDocuments().filter((doc) => info.types.includes(doc.type)).sort((a, b) => b.date.localeCompare(a.date));
  const total = docs.reduce((sum, doc) => sum + Number(doc.amount || 0), 0);
  setStats(`${docs.length} ta`, formatMoney(total));
  document.getElementById("module-table").classList.remove("hidden");
  document.getElementById("module-table-title").textContent = info.title + " · hujjatlar";
  document.getElementById("module-documents").innerHTML = docs.map((doc) => documentRow(doc, !String(doc.id).startsWith("seed-"))).join("");
  document.getElementById("empty-state").classList.toggle("hidden", docs.length > 0);
  document.getElementById("module-note").classList.remove("hidden");
  document.getElementById("module-new-document").classList.remove("hidden");
}

function setStats(first, second) {
  document.getElementById("module-stats").innerHTML = `<div class="module-stat"><span>Yozuvlar</span><strong>${first}</strong></div><div class="module-stat"><span>Jami summa</span><strong>${second}</strong></div>`;
}

function setReportMode(info) {
  document.getElementById("module-table").classList.add("hidden");
  document.getElementById("import-panel").classList.toggle("hidden", info.kind !== "import");
  document.getElementById("report-panel").classList.toggle("hidden", !["order", "ledger", "turnover", "balance", "catalog", "settings"].includes(info.kind));
  document.getElementById("module-note").classList.toggle("hidden", info.kind === "import");
  document.getElementById("module-new-document").classList.toggle("hidden", !["catalog", "settings"].includes(info.kind));
  document.getElementById("balance-status").classList.add("hidden");
}

function renderOrder(info) {
  const selected = document.getElementById("report-period").value || "01";
  const year = document.getElementById("year-select").value;
  const rows = allDocuments().filter((doc) => doc.order === info.order && doc.date?.startsWith(`${year}-${selected}`));
  const monthlyRows = rows.length ? rows : [{
    description: `${months[Number(selected) - 1]} oyi · namunaviy provodka`,
    debit: info.order === "7" ? "4010" : info.order === "5" ? "1010" : info.order === "15" ? "9421" : "5010",
    credit: info.order === "7" ? "9010" : info.order === "5" ? "6010" : info.order === "15" ? "6710" : "5110",
    amount: [13500000, 8420000, 6110000][Number(selected) % 3],
    partner: "Demo operatsiya"
  }];
  const sum = monthlyRows.reduce((total, row) => total + Number(row.amount || 0), 0);
  renderReport(["Содержание / Mazmuni", "ДЕБЕТ", "КРЕДИТ", "СУММА", "ОБЩАЯ"], monthlyRows.map((row) =>
    `<tr><td>${escapeHtml(row.description || `${typeLabels[row.type] || "Hujjat"} · ${row.partner || ""}`)}</td><td>${escapeHtml(row.debit || "—")}</td><td>${escapeHtml(row.credit || "—")}</td><td>${formatMoney(row.amount)}</td><td>${formatMoney(row.amount)}</td></tr>`
  ), ["ИТОГО", "", "", formatMoney(sum), formatMoney(sum)]);
  document.getElementById("report-explainer").textContent = `МЕМОРИАЛЬНЫЙ ОРДЕР № ${info.order} · ${months[Number(selected) - 1]} ${year} · ustunlar yuborilgan MO Excel fayllari shakliga mos namoyish qilinadi.`;
  setStats(`${monthlyRows.length} ta yozuv`, formatMoney(sum));
}

function renderLedger() {
  const year = document.getElementById("year-select").value;
  const selectedPeriod = document.getElementById("report-period").value || "year";
  const annual = selectedPeriod === "year";
  const monthNumber = annual ? 12 : Number(selectedPeriod);
  const monthlyShare = annual ? 1 : 1 / 12;
  const selectedAccount = document.getElementById("report-account").value;
  const codes = Object.keys(accountNames).filter((code) => selectedAccount === "all" || code === selectedAccount);
  const rows = codes.map((code, index) => {
    const annualOpening = [125000000, 28800000, 64800000, 45200000, 71200000, 8500000, 116000000, 63400000, 12900000, 28100000, 450000000, 0, 0, 0][index];
    const annualDebit = [0, 0, 128000000, 79200000, 168400000, 48200000, 638000000, 174000000, 25800000, 117600000, 0, 824000000, 516000000, 97200000][index];
    const annualCredit = [0, 7900000, 90600000, 65400000, 126200000, 40100000, 601000000, 204000000, 25800000, 117600000, 0, 824000000, 516000000, 97200000][index];
    const movementPerMonth = annual ? 1 : 1 / 12;
    const opening = annual ? annualOpening : annualOpening + Math.round((annualDebit - annualCredit) * (monthNumber - 1) / 12);
    const debit = Math.round(annualDebit * movementPerMonth);
    const credit = Math.round(annualCredit * movementPerMonth);
    const ending = opening + debit - credit;
    return `<tr><td>${code}</td><td>${accountNames[code]}</td><td>${formatMoney(opening)}</td><td>${formatMoney(debit)}</td><td>${formatMoney(credit)}</td><td>${formatMoney(ending)}</td></tr>`;
  });
  renderReport(["СЧЁТ", "Ҳисобварақ номи", "Бошланғич қолдиқ", "ДЕБЕТ айланма", "КРЕДИТ айланма", "Охирги қолдиқ"], rows, []);
  const periodLabel = annual ? `${year}-йил` : `${months[monthNumber - 1]} ${year}`;
  document.getElementById("report-explainer").textContent = `БОШ КИТОБ · ${periodLabel} · Excel “Главный книга” шакли асосида. Суммалар demo учун ўйдирма.`;
  setStats(`${codes.length} ta hisob`, periodLabel);
}

function renderTurnover(info) {
  const year = document.getElementById("year-select").value;
  const selectedPeriod = document.getElementById("report-period").value || "year";
  const annual = selectedPeriod === "year";
  const monthNumber = annual ? 12 : Number(selectedPeriod);
  const share = annual ? 1 : 1 / 12;
  const isCustomer = info.account === "4010";
  const partners = isCustomer
    ? [["Chakana savdo nuqtasi A", 21600000, 48200000, 42100000], ["Ulgurji xaridor B", 12800000, 36700000, 28900000], ["Ijtimoiy agentlik C", 8400000, 15200000, 12100000]]
    : [["Yetkazib beruvchi A", 18500000, 42600000, 48200000], ["Un zavodi B", 12800000, 38300000, 36400000], ["Kommunal xizmat C", 7200000, 12600000, 11800000]];
  const rows = partners.map(([name, annualOpening, annualDebit, annualCredit]) => {
    const opening = annual ? annualOpening : annualOpening + Math.round((annualDebit - annualCredit) * (monthNumber - 1) / 12);
    const debit = Math.round(annualDebit * share);
    const credit = Math.round(annualCredit * share);
    const ending = opening + debit - credit;
    return `<tr><td>${escapeHtml(name)}</td><td>${formatMoney(opening)}</td><td>${formatMoney(debit)}</td><td>${formatMoney(credit)}</td><td>${formatMoney(ending)}</td></tr>`;
  });
  renderReport(["Контрагент", "Бошланғич қолдиқ", "ДЕБЕТ айланма", "КРЕДИТ айланма", "Охирги қолдиқ"], rows, []);
  const periodLabel = annual ? `${year}-йил` : `${months[monthNumber - 1]} ${year}`;
  document.getElementById("report-explainer").textContent = `${info.title} · ${periodLabel} · Kontragentlar kesimida. Summa demo.`;
  setStats(`${partners.length} ta kontragent`, periodLabel);
}

function renderBalance() {
  const period = document.getElementById("report-period").value || "year";
  const year = document.getElementById("year-select").value;
  const yearEnd = period === "year";
  const multiplier = yearEnd ? 1 : Number(period) / 12;
  const baseAssets = [
    ["Uzoq muddatli aktivlar", "", "", true], ["Bino va inshootlar · 0121", 980000000, "0100"], ["Mashina va jihozlar · 0130", 365000000, "0100"], ["Eskirish · 0221/0230", -145000000, "0200"],
    ["Joriy aktivlar", "", "", true], ["Xomashyo va materiallar · 1010", 184000000, "1010"], ["Tayyor mahsulot · 2014", 126000000, "2014"], ["Xaridorlar qarzi · 4010", 71300000, "4010"], ["Kassa va bank · 5010/5110", 96200000, "5010"]
  ];
  const assetValues = baseAssets.filter((row) => !row[3]).map((row) => Math.round(row[1] * multiplier));
  const assetTotal = assetValues.reduce((sum, value) => sum + value, 0);
  let assetIndex = 0;
  const assets = baseAssets.map(([name, value, code, section]) => section
    ? `<tr class="section-row"><td colspan="3">${name}</td></tr>`
    : `<tr><td>${name}</td><td>${formatMoney(assetValues[assetIndex++])}</td><td>${code}</td></tr>`);
  const capital = Math.round(450000000 * multiplier);
  const supplierDebt = Math.round(196000000 * multiplier);
  const payrollDebt = Math.round(31000000 * multiplier);
  const taxDebt = Math.round(25500000 * multiplier);
  const retainedEarnings = assetTotal - capital - supplierDebt - payrollDebt - taxDebt;
  const liabilityBase = [
    ["Xususiy kapital", "", "", true], ["Ustav kapitali · 8300", capital, "8300"], ["Taqsimlanmagan foyda", retainedEarnings, "8700"],
    ["Majburiyatlar", "", "", true], ["Yetkazib beruvchilar qarzi · 6010", supplierDebt, "6010"], ["Ish haqi bo'yicha qarz · 6710", payrollDebt, "6710"], ["Byudjet bilan hisob-kitob · 6410", taxDebt, "6410"]
  ];
  const liabilities = liabilityBase.map(([name, value, code, section]) => section
    ? `<tr class="section-row"><td colspan="3">${name}</td></tr>`
    : `<tr><td>${name}</td><td>${formatMoney(value)}</td><td>${code}</td></tr>`);
  const equityAndLiabilities = liabilityBase.filter((row) => !row[3]).reduce((sum, row) => sum + row[1], 0);
  const balanced = assetTotal === equityAndLiabilities;
  const combined = [...assets, `<tr class="total-row"><td>АКТИВЛАР ЖАМИ</td><td>${formatMoney(assetTotal)}</td><td></td></tr>`, ...liabilities, `<tr class="total-row"><td>КАПИТАЛ ВА МАЖБУРИЯТЛАР ЖАМИ</td><td>${formatMoney(equityAndLiabilities)}</td><td></td></tr>`];
  renderReport(["Баланс моддаси", "Давр охирида", "Ҳисоб"], combined, []);
  const dateLabel = yearEnd ? `31.12.${year}` : `${String(new Date(Number(year), Number(period), 0).getDate()).padStart(2, "0")}.${period}.${year}`;
  document.getElementById("report-explainer").textContent = `БУХГАЛТЕРИЯ БАЛАНСИ · ${dateLabel} ҳолатига · Oylik va yillik yakun. Barcha raqamlar namuna, Excel boshlang'ich qoldiqlari bilan hali solishtirilmagan.`;
  const balanceStatus = document.getElementById("balance-status");
  balanceStatus.textContent = balanced ? "✓ Demo balans teng: aktivlar jami kapital va majburiyatlarga teng. Bu faqat namuna raqamlari." : "⚠ Balans teng emas; boshlang'ich qoldiqlarni tekshiring.";
  balanceStatus.classList.toggle("balanced", balanced);
  balanceStatus.classList.remove("hidden");
  setStats("Balans " + (balanced ? "teng" : "tekshirilsin"), formatMoney(assetTotal));
}

function renderReport(headers, rows, totals) {
  document.getElementById("report-head").innerHTML = `<tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr>`;
  document.getElementById("report-body").innerHTML = rows.join("");
  document.getElementById("report-foot").innerHTML = totals.length ? `<tr>${totals.map((value) => `<td>${value}</td>`).join("")}</tr>` : "";
}

function renderCatalog(info) {
  const items = info.items || [];
  renderReport(["№", "Nomi", "Bo'lim", "Holati"], items.map((name, index) =>
    `<tr><td>${index + 1}</td><td>${escapeHtml(name)}</td><td>${info.title}</td><td><span class="status-pill">Demo</span></td></tr>`), []);
  document.getElementById("report-explainer").textContent = `${info.title} katalogi · demo elementlar. Bu ro'yxatlarni keyingi loyiha bosqichida Excel/1C ma'lumotlari bilan to'ldirish mumkin.`;
  setStats(`${items.length} ta namuna`, "Katalog");
}

function renderSettings() {
  renderReport(["Sozlama", "Qiymat", "Izoh"], [
    "<tr><td>Korxona</td><td>Non Korxonasi Demo</td><td>Ommaviy demo uchun umumiy nom</td></tr>",
    "<tr><td>Hisobot yili</td><td>2025</td><td>Yuborilgan hisobotlar davri</td></tr>",
    "<tr><td>Ma'lumot saqlash</td><td>Ushbu brauzer</td><td>Serverga yuborilmaydi</td></tr>",
    "<tr><td>Kirish himoyasi</td><td>Demo</td><td>Haqiqiy parol yoki foydalanuvchi huquqlari emas</td></tr>"
  ], []);
  document.getElementById("report-explainer").textContent = "Prototipda mavjud bo'lgan funksiyalar va chegaralar.";
  setStats("Prototip", "Mahalliy demo");
}

function renderModule(page) {
  const info = pageInfo[page];
  document.getElementById("module-symbol").textContent = navGroups.flatMap((group) => group.pages).find((item) => item[0] === page)?.[1] || "▤";
  document.getElementById("module-heading").textContent = info.title;
  document.getElementById("module-description").textContent = info.subtitle;
  setReportMode(info);
  if (info.kind === "documents") renderDocuments(page, info);
  else if (info.kind === "import") setStats("Excel va CSV", "Faqat ko'rish");
  else if (info.kind === "catalog") renderCatalog(info);
  else if (info.kind === "settings") renderSettings();
  else {
    const period = document.getElementById("report-period");
    const options = ["balance", "ledger", "turnover"].includes(info.kind)
      ? `<option value="year">Yil yakuni</option>${months.map((month, index) => `<option value="${String(index + 1).padStart(2, "0")}">${month} oxiri</option>`).join("")}`
      : months.map((month, index) => `<option value="${String(index + 1).padStart(2, "0")}">${month}</option>`).join("");
    const previousValue = period.value;
    period.innerHTML = options;
    period.value = Array.from(period.options).some((option) => option.value === previousValue) ? previousValue : (info.kind === "balance" ? "year" : "01");
    document.getElementById("report-account").classList.toggle("hidden", !["ledger"].includes(info.kind));
    if (info.kind === "order") renderOrder(info);
    if (info.kind === "ledger") renderLedger();
    if (info.kind === "turnover") renderTurnover(info);
    if (info.kind === "balance") renderBalance();
  }
}

function navigate(page) {
  if (page !== "dashboard" && !pageInfo[page]) return;
  activePage = page;
  renderNavigation();
  const dashboard = page === "dashboard";
  document.getElementById("dashboard-page").classList.toggle("hidden", !dashboard);
  document.getElementById("module-page").classList.toggle("hidden", dashboard);
  document.getElementById("page-title").textContent = dashboard ? "Bosh sahifa" : pageInfo[page].title;
  document.getElementById("page-subtitle").textContent = dashboard ? "Korxonangizning kundalik holati bir joyda." : pageInfo[page].subtitle;
  document.getElementById("crumb").textContent = dashboard ? "Bosh sahifa" : pageInfo[page].title;
  if (dashboard) renderDashboard();
  else renderModule(page);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add("hidden"), 3200);
}

function openModal() {
  const modal = document.getElementById("document-modal");
  document.getElementById("document-date").value = new Date().toISOString().slice(0, 10);
  const suggested = pageInfo[activePage]?.types?.[0] || "purchase";
  document.getElementById("document-type").value = suggested;
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
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char === '"' && quoted && text[index + 1] === '"') { value += '"'; index += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === delimiter && !quoted) { row.push(value); value = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && text[index + 1] === "\n") index += 1;
      row.push(value);
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      value = "";
    } else value += char;
  }
  row.push(value);
  if (row.some((cell) => cell.trim())) rows.push(row);
  return rows;
}

async function previewCsv(file) {
  const buffer = await file.arrayBuffer();
  let text;
  try { text = new TextDecoder("utf-8", { fatal: true }).decode(buffer); }
  catch { text = new TextDecoder("windows-1251").decode(buffer); }
  const rows = parseCsv(text);
  if (!rows.length) throw new Error("Faylda ko'rish uchun qator topilmadi.");
  const columns = Math.max(...rows.slice(0, 8).map((row) => row.length));
  document.getElementById("import-meta").textContent = `${file.name} · ${rows.length - 1} ta ma'lumot qatori · ${columns} ta ustun`;
  document.getElementById("import-head").innerHTML = `<tr>${Array.from({ length: columns }, (_, index) => `<th>${escapeHtml(rows[0][index] || `USTUN ${index + 1}`)}</th>`).join("")}</tr>`;
  document.getElementById("import-body").innerHTML = rows.slice(1, 21).map((row) => `<tr>${Array.from({ length: columns }, (_, index) => `<td>${escapeHtml(row[index] || "")}</td>`).join("")}</tr>`).join("");
  document.getElementById("import-result").classList.remove("hidden");
  showToast("CSV mahalliy ko'rib chiqildi, tarmoqqa yuborilmadi.");
}

async function previewXlsx(file) {
  if (typeof DecompressionStream === "undefined") throw new Error("Bu brauzer XLSX ochishni qo'llamaydi; CSV shaklidan foydalaning.");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const view = new DataView(bytes.buffer);
  let end = -1;
  for (let index = bytes.length - 22; index >= Math.max(0, bytes.length - 65558); index -= 1) {
    if (view.getUint32(index, true) === 0x06054b50) { end = index; break; }
  }
  if (end < 0) throw new Error("XLSX arxiv tuzilmasi topilmadi.");
  const count = view.getUint16(end + 10, true);
  let cursor = view.getUint32(end + 16, true);
  const entries = new Map();
  for (let entry = 0; entry < count; entry += 1) {
    if (view.getUint32(cursor, true) !== 0x02014b50) throw new Error("XLSX fayl indeksini o'qib bo'lmadi.");
    const method = view.getUint16(cursor + 10, true);
    const compressedSize = view.getUint32(cursor + 20, true);
    const nameLength = view.getUint16(cursor + 28, true);
    const extraLength = view.getUint16(cursor + 30, true);
    const commentLength = view.getUint16(cursor + 32, true);
    const localOffset = view.getUint32(cursor + 42, true);
    const name = new TextDecoder().decode(bytes.slice(cursor + 46, cursor + 46 + nameLength));
    entries.set(name, { method, compressedSize, localOffset });
    cursor += 46 + nameLength + extraLength + commentLength;
  }
  async function readZipEntry(path) {
    const entry = entries.get(path);
    if (!entry) return null;
    const offset = entry.localOffset;
    const nameLength = view.getUint16(offset + 26, true);
    const extraLength = view.getUint16(offset + 28, true);
    const start = offset + 30 + nameLength + extraLength;
    const data = bytes.slice(start, start + entry.compressedSize);
    if (entry.method === 0) return new TextDecoder().decode(data);
    if (entry.method !== 8) throw new Error("Bu XLSX siqish usuli qo'llanmaydi.");
    const stream = new Blob([data]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    return await new Response(stream).text();
  }
  const sharedText = await readZipEntry("xl/sharedStrings.xml");
  const shared = sharedText ? Array.from(new DOMParser().parseFromString(sharedText, "application/xml").getElementsByTagName("si"), (item) => Array.from(item.getElementsByTagName("t"), (node) => node.textContent).join("")) : [];
  const workbookText = await readZipEntry("xl/workbook.xml");
  if (!workbookText) throw new Error("Excel kitobini o'qib bo'lmadi.");
  const workbook = new DOMParser().parseFromString(workbookText, "application/xml");
  const firstSheet = workbook.getElementsByTagName("sheet")[0];
  if (!firstSheet) throw new Error("XLSX ichida varaq topilmadi.");
  const relationshipId = firstSheet.getAttribute("r:id");
  const relsText = await readZipEntry("xl/_rels/workbook.xml.rels");
  const rels = new DOMParser().parseFromString(relsText || "", "application/xml");
  const relation = Array.from(rels.getElementsByTagName("Relationship")).find((item) => item.getAttribute("Id") === relationshipId);
  if (!relation) throw new Error("Excel varag'ini topib bo'lmadi.");
  const sheetPath = `xl/${relation.getAttribute("Target").replace(/^\/?xl\//, "").replace(/^\//, "")}`;
  const sheetText = await readZipEntry(sheetPath);
  if (!sheetText) throw new Error("Excel varag'i ma'lumotini o'qib bo'lmadi.");
  const sheet = new DOMParser().parseFromString(sheetText, "application/xml");
  const rows = Array.from(sheet.getElementsByTagName("row"), (rowNode) => {
    const row = [];
    for (const cell of Array.from(rowNode.getElementsByTagName("c"))) {
      const ref = cell.getAttribute("r") || "A1";
      const col = ref.match(/^[A-Z]+/)[0];
      let columnIndex = 0;
      for (const char of col) columnIndex = columnIndex * 26 + char.charCodeAt(0) - 64;
      columnIndex -= 1;
      const valueNode = cell.getElementsByTagName("v")[0];
      let value = valueNode?.textContent || "";
      if (cell.getAttribute("t") === "s" && value) value = shared[Number(value)] || "";
      else if (cell.getAttribute("t") === "inlineStr") value = cell.getElementsByTagName("is")[0]?.textContent || "";
      row[columnIndex] = value;
    }
    return row.map((value) => value || "");
  }).filter((row) => row.some((value) => String(value).trim()));
  if (!rows.length) throw new Error("Excel varag'ida ko'rish uchun qator topilmadi.");
  const columns = Math.max(...rows.slice(0, 20).map((row) => row.length));
  document.getElementById("import-meta").textContent = `${file.name} · ${firstSheet.getAttribute("name")} varag'i · ${rows.length} ta qator`;
  document.getElementById("import-head").innerHTML = "";
  document.getElementById("import-body").innerHTML = rows.slice(0, 20).map((row) => `<tr>${Array.from({ length: columns }, (_, index) => `<td>${escapeHtml(row[index] || "")}</td>`).join("")}</tr>`).join("");
  document.getElementById("import-result").classList.remove("hidden");
  showToast("Excel faqat ko'rish uchun mahalliy ochildi, tarmoqqa yuborilmadi.");
}

function handleLogin(name) {
  const displayName = name.trim() || "Demo foydalanuvchi";
  localStorage.setItem(LOGIN_KEY, displayName);
  document.getElementById("user-name").textContent = displayName;
  document.getElementById("user-avatar").textContent = displayName.charAt(0).toUpperCase();
  document.getElementById("profile-button").textContent = displayName.charAt(0).toUpperCase();
  document.getElementById("login-screen").classList.add("hidden");
  document.querySelector(".app-shell").classList.remove("hidden");
}

document.getElementById("main-nav").addEventListener("click", (event) => {
  const item = event.target.closest("[data-page]");
  if (item) navigate(item.dataset.page);
});
document.querySelectorAll("[data-navigate]").forEach((button) => button.addEventListener("click", () => navigate(button.dataset.navigate)));
document.getElementById("new-document").addEventListener("click", openModal);
document.getElementById("module-new-document").addEventListener("click", openModal);
document.getElementById("close-modal").addEventListener("click", closeModal);
document.getElementById("cancel-modal").addEventListener("click", closeModal);
document.getElementById("document-modal").addEventListener("click", (event) => { if (event.target.id === "document-modal") closeModal(); });
document.getElementById("dismiss-notice").addEventListener("click", () => document.querySelector(".notice").remove());

document.getElementById("document-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const type = document.getElementById("document-type").value;
  const date = document.getElementById("document-date").value;
  const amount = Number(document.getElementById("document-amount").value);
  const partner = document.getElementById("document-partner").value.trim();
  if (!date || !partner || !Number.isFinite(amount) || amount <= 0) return showToast("Sana, musbat summa va izohni to'ldiring.");
  const docs = getDocuments();
  const order = ({ purchase: "5", sale: "7", production: "20", pos: "3", payroll: "15", accounting: "23", expense: "23", cash: "3", warehouse: "23" })[type] || "23";
  docs.push({ id: `demo-${Date.now()}`, type, number: `DEMO-${String(docs.length + 1).padStart(4, "0")}`, date, amount, partner, description: partner, status: "Qoralama", order });
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(docs)); }
  catch (error) { console.error("Demo hujjatini saqlab bo'lmadi:", error); return showToast("Brauzer xotirasiga saqlab bo'lmadi."); }
  closeModal();
  activePage === "dashboard" ? renderDashboard() : renderModule(activePage);
  showToast("Demo hujjat saqlandi. Bu yozuv buxgalteriya o'tkazmasi emas.");
});

document.getElementById("module-documents").addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete]");
  if (!button) return;
  const docs = getDocuments().filter((doc) => doc.id !== button.dataset.delete);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
  renderModule(activePage);
  showToast("Demo hujjat o'chirildi.");
});

document.getElementById("document-type").addEventListener("change", (event) => {
  const placeholders = { production: "Masalan: Non sexi, 1-smena", pos: "Naqd yoki terminal to'lovi", payroll: "Xodim yoki bo'lim", expense: "Xarajat mazmuni" };
  document.getElementById("document-partner").placeholder = placeholders[event.target.value] || "Kontragent yoki hujjat izohi";
});
document.getElementById("report-period").addEventListener("change", () => renderModule(activePage));
document.getElementById("report-account").addEventListener("change", () => renderModule(activePage));
document.getElementById("year-select").addEventListener("change", (event) => {
  localStorage.setItem(selectedYearKey, event.target.value);
  document.getElementById("chart-caption").textContent = `${event.target.value}-yil davomida, so'm`;
  document.getElementById("period-label").textContent = `${event.target.value}-YIL HISOBOT DAVRI`;
  renderModule(activePage);
  renderDashboard();
});
document.getElementById("chart-period").addEventListener("change", (event) => {
  const year = document.getElementById("year-select").value;
  document.getElementById("chart-caption").textContent = event.target.value === "quarter" ? `${year}-yil choraklari bo'yicha, so'm` : `${year}-yil davomida, so'm`;
});
document.getElementById("print-report").addEventListener("click", () => window.print());
document.getElementById("company-switch").addEventListener("click", () => showToast("Demo rejimida bitta korxona mavjud."));
document.getElementById("csv-file").addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    if (file.name.toLowerCase().endsWith(".xlsx")) await previewXlsx(file);
    else await previewCsv(file);
  } catch (error) {
    console.error("Hisobot faylini ko'rib bo'lmadi:", error);
    showToast(error.message || "Fayl formatini o'qib bo'lmadi.");
  }
});

document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  handleLogin(document.getElementById("login-name").value);
});
document.getElementById("logout-button").addEventListener("click", () => {
  localStorage.removeItem(LOGIN_KEY);
  document.querySelector(".app-shell").classList.add("hidden");
  document.getElementById("login-screen").classList.remove("hidden");
  document.getElementById("login-password").value = "";
});
document.getElementById("profile-button").addEventListener("click", () => showToast("Demo foydalanuvchi: " + (localStorage.getItem(LOGIN_KEY) || "mehmon")));
document.getElementById("notifications-button").addEventListener("click", () => showToast("Demo eslatma: oy yakuni hisoblarini tekshiring."));

document.getElementById("year-select").value = localStorage.getItem(selectedYearKey) || "2025";
document.getElementById("chart-caption").textContent = `${document.getElementById("year-select").value}-yil davomida, so'm`;
document.getElementById("period-label").textContent = `${document.getElementById("year-select").value}-YIL HISOBOT DAVRI`;
document.getElementById("csv-file").setAttribute("accept", ".csv,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
document.querySelector(".file-drop>span:last-of-type").textContent = "CSV va XLSX · fayl faqat shu brauzerda ko'riladi";
document.querySelector(".import-disclaimer").textContent = "Import hozircha faqat oldindan ko'rish uchun. Fayl serverga yuborilmaydi va 1C hisobiga yozilmaydi.";
renderNavigation();
navigate("dashboard");
const rememberedUser = localStorage.getItem(LOGIN_KEY);
if (rememberedUser) handleLogin(rememberedUser);
else {
  document.querySelector(".app-shell").classList.add("hidden");
  document.getElementById("login-screen").classList.remove("hidden");
}
