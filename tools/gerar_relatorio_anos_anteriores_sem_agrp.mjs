import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const root = "C:/Users/comer/Documents/CRM";
const dataDir = path.join(root, "data");
const outputDir = path.join(root, "outputs", "relatorios");
const outputPath = path.join(outputDir, "referencias_anos_anteriores_sem_agrp.xlsx");

const companies = [
  ["ionlab", "Ionlab"],
  ["ciorbrasil", "CiorBrasil"],
  ["even", "Even"],
  ["onix", "Onix"],
  ["vitralab", "Vitralab"],
  ["ambarlab", "Ambarlab"],
  ["nativalab", "Nativalab"],
];

function cleanText(value) {
  return String(value ?? "").trim();
}

function normalizeKey(value) {
  return cleanText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9]+/g, "")
    .toUpperCase();
}

function isMissingClassification(value) {
  const text = cleanText(value).toUpperCase();
  return !text || text === "-1" || text === "SEM AGRP" || text === "SEM CADASTRO DE CUSTEIO";
}

function parseNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const text = cleanText(value);
  if (!text) return 0;
  const normalized = text
    .replace(/\s/g, "")
    .replace(/\.(?=\d{3}(?:\D|$))/g, "")
    .replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseYear(value) {
  const text = cleanText(value);
  const br = text.match(/\d{1,2}\/\d{1,2}\/(\d{2,4})/);
  if (br) {
    const year = Number(br[1]);
    return year < 100 ? 2000 + year : year;
  }
  const iso = text.match(/^(\d{4})-\d{1,2}-\d{1,2}/);
  if (iso) return Number(iso[1]);
  const any = text.match(/(20\d{2})/);
  return any ? Number(any[1]) : 0;
}

function saleNetRevenue(row) {
  return parseNumber(row.PR_SBT) - parseNumber(row.V_FRETE_NF) - parseNumber(row.V_DESCONTO);
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return fallback;
  }
}

const references = new Map();
const companySummary = new Map();
const yearSummary = new Map();

for (const [companyId, companyName] of companies) {
  const sales = await readJson(path.join(dataDir, companyId, "vendas.json"), []);
  const companyRefs = new Set();
  let companyOccurrences = 0;
  let companyRevenue = 0;

  for (const sale of sales) {
    const year = parseYear(sale.NF_EMI);
    if (!year || year >= 2026) continue;
    if (!isMissingClassification(sale.AGRP) && !isMissingClassification(sale.Origem)) continue;

    const reference = cleanText(sale.PR_COD || sale.Referencia);
    const key = normalizeKey(reference);
    if (!key) continue;

    const invoice = cleanText(sale.NF_NUM || sale.ID_NF || sale.NF_NRO);
    const netRevenue = saleNetRevenue(sale);
    const row = references.get(key) || {
      referencia: reference,
      descricao: cleanText(sale.PR_DES || sale["Descricao item"]),
      agrpAtual: cleanText(sale.AGRP),
      origemAtual: cleanText(sale.Origem),
      empresas: new Set(),
      anos: new Set(),
      notas: new Set(),
      ocorrencias: 0,
      quantidade: 0,
      faturamento: 0,
      agrp: "",
      origem: "",
    };
    if (!row.descricao && cleanText(sale.PR_DES)) row.descricao = cleanText(sale.PR_DES);
    if (!row.agrpAtual && cleanText(sale.AGRP)) row.agrpAtual = cleanText(sale.AGRP);
    if (!row.origemAtual && cleanText(sale.Origem)) row.origemAtual = cleanText(sale.Origem);
    row.empresas.add(companyName);
    row.anos.add(year);
    if (invoice) row.notas.add(`${companyName}|${invoice}`);
    row.ocorrencias += 1;
    row.quantidade += parseNumber(sale.PR_QTD);
    row.faturamento += netRevenue;
    references.set(key, row);

    companyRefs.add(key);
    companyOccurrences += 1;
    companyRevenue += netRevenue;

    const y = yearSummary.get(year) || { referencias: new Set(), ocorrencias: 0, faturamento: 0 };
    y.referencias.add(key);
    y.ocorrencias += 1;
    y.faturamento += netRevenue;
    yearSummary.set(year, y);
  }

  companySummary.set(companyName, {
    referencias: companyRefs.size,
    ocorrencias: companyOccurrences,
    faturamento: companyRevenue,
  });
}

const detailRows = Array.from(references.values())
  .map((row) => [
    row.referencia,
    row.descricao,
    row.agrpAtual,
    row.origemAtual,
    Array.from(row.empresas).sort().join(", "),
    Array.from(row.anos).sort((a, b) => a - b).join(", "),
    row.ocorrencias,
    row.notas.size,
    row.quantidade,
    row.faturamento,
    row.agrp,
    row.origem,
  ])
  .sort((a, b) => String(a[0]).localeCompare(String(b[0]), "pt-BR"));

const summaryRows = Array.from(companySummary.entries()).map(([companyName, item]) => [
  companyName,
  item.referencias,
  item.ocorrencias,
  item.faturamento,
]);
summaryRows.push([
  "Total",
  detailRows.length,
  summaryRows.reduce((sum, row) => sum + row[2], 0),
  summaryRows.reduce((sum, row) => sum + row[3], 0),
]);

const yearRows = Array.from(yearSummary.entries())
  .sort((a, b) => a[0] - b[0])
  .map(([year, item]) => [year, item.referencias.size, item.ocorrencias, item.faturamento]);

const workbook = Workbook.create();
const summarySheet = workbook.worksheets.add("Resumo");
const detailSheet = workbook.worksheets.add("Referencias unicas");
const yearsSheet = workbook.worksheets.add("Resumo por ano");
summarySheet.showGridLines = false;
detailSheet.showGridLines = false;
yearsSheet.showGridLines = false;

const generatedAt = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
summarySheet.getRange("A1:D1").merge();
summarySheet.getRange("A1").values = [["Referencias unicas sem AGRP/Origem em anos anteriores a 2026"]];
summarySheet.getRange("A2:D2").merge();
summarySheet.getRange("A2").values = [[`Gerado em ${generatedAt}`]];
summarySheet.getRangeByIndexes(3, 0, summaryRows.length + 1, 4).values = [
  ["Empresa", "Referencias unicas", "Ocorrencias nas notas", "Faturamento liquido"],
  ...summaryRows,
];

yearsSheet.getRangeByIndexes(0, 0, yearRows.length + 1, 4).values = [
  ["Ano", "Referencias unicas", "Ocorrencias nas notas", "Faturamento liquido"],
  ...yearRows,
];

detailSheet.getRangeByIndexes(0, 0, detailRows.length + 1, 12).values = [
  ["Referencia", "Descricao item", "AGRP atual", "Origem atual", "Empresas", "Anos", "Ocorrencias", "Notas fiscais", "Quantidade", "Faturamento liquido", "AGRP", "Origem"],
  ...detailRows,
];

for (const sheet of [summarySheet, detailSheet, yearsSheet]) {
  const used = sheet.getUsedRange();
  used.format.font.name = "Arial";
  used.format.font.size = 10;
}

summarySheet.getRange("A1").format.font.bold = true;
summarySheet.getRange("A1").format.font.size = 16;
summarySheet.getRange("A2").format.font.color = "#5f6f89";
summarySheet.getRange("A4:D4").format.font.bold = true;
summarySheet.getRange("A4:D4").format.fill.color = "#0b6f82";
summarySheet.getRange("A4:D4").format.font.color = "#ffffff";
summarySheet.getRangeByIndexes(4 + summaryRows.length - 1, 0, 1, 4).format.font.bold = true;
summarySheet.getRangeByIndexes(4 + summaryRows.length - 1, 0, 1, 4).format.fill.color = "#eef7f8";
summarySheet.getRangeByIndexes(4, 3, Math.max(summaryRows.length, 1), 1).numberFormat = [["R$ #,##0.00"]];
summarySheet.freezePanes.freezeRows(4);
summarySheet.getRange("A:D").format.autofitColumns();

yearsSheet.getRange("A1:D1").format.font.bold = true;
yearsSheet.getRange("A1:D1").format.fill.color = "#0b6f82";
yearsSheet.getRange("A1:D1").format.font.color = "#ffffff";
yearsSheet.getRangeByIndexes(1, 3, Math.max(yearRows.length, 1), 1).numberFormat = [["R$ #,##0.00"]];
yearsSheet.freezePanes.freezeRows(1);
yearsSheet.getRange("A:D").format.autofitColumns();

detailSheet.getRange("A1:L1").format.font.bold = true;
detailSheet.getRange("A1:L1").format.fill.color = "#0b6f82";
detailSheet.getRange("A1:L1").format.font.color = "#ffffff";
detailSheet.getRangeByIndexes(1, 8, Math.max(detailRows.length, 1), 1).numberFormat = [["#,##0.000"]];
detailSheet.getRangeByIndexes(1, 9, Math.max(detailRows.length, 1), 1).numberFormat = [["R$ #,##0.00"]];
detailSheet.getRange("A:L").format.autofitColumns();
detailSheet.getRange("B:B").format.columnWidth = 52;
detailSheet.getRange("B:B").format.wrapText = true;
detailSheet.freezePanes.freezeRows(1);

await fs.mkdir(outputDir, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(JSON.stringify({ outputPath, uniqueReferences: detailRows.length, totalOccurrences: summaryRows.at(-1)[2] }, null, 2));
