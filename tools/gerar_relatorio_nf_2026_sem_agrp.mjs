import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const root = "C:/Users/comer/Documents/CRM";
const dataDir = path.join(root, "data");
const outputDir = path.join(root, "outputs", "relatorios");
const outputPath = path.join(outputDir, "notas_fiscais_2026_sem_agrp.xlsx");

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

function normalizeClassification(value) {
  return cleanText(value).toUpperCase();
}

function isMissingAgrp(value) {
  const text = normalizeClassification(value);
  return !text || text === "-1" || text === "SEM AGRP";
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
  if (value instanceof Date) return value.getFullYear();
  const text = cleanText(value);
  const match = text.match(/(\d{4})/);
  if (match) return Number(match[1]);
  const br = text.match(/\d{1,2}\/\d{1,2}\/(\d{2,4})/);
  if (br) {
    const year = Number(br[1]);
    return year < 100 ? 2000 + year : year;
  }
  return 0;
}

function formatDateText(value) {
  const text = cleanText(value);
  if (!text) return "";
  const br = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})/);
  if (br) {
    const year = br[3].length === 2 ? `20${br[3]}` : br[3];
    return `${br[1].padStart(2, "0")}/${br[2].padStart(2, "0")}/${year}`;
  }
  const iso = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (iso) return `${iso[3].padStart(2, "0")}/${iso[2].padStart(2, "0")}/${iso[1]}`;
  return text;
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return fallback;
  }
}

function saleNetRevenue(row) {
  return parseNumber(row.PR_SBT) - parseNumber(row.V_FRETE_NF) - parseNumber(row.V_DESCONTO);
}

const detailRows = [];
const summary = new Map();

for (const [companyId, companyName] of companies) {
  const sales = await readJson(path.join(dataDir, companyId, "vendas.json"), []);
  let companyRows = 0;
  let companyRevenue = 0;
  const invoiceIds = new Set();
  const references = new Set();

  for (const sale of sales) {
    if (parseYear(sale.NF_EMI) !== 2026 || !isMissingAgrp(sale.AGRP)) {
      continue;
    }

    const netRevenue = saleNetRevenue(sale);
    const invoice = cleanText(sale.NF_NUM || sale.ID_NF || sale.NF_NRO);
    const reference = cleanText(sale.PR_COD);
    companyRows += 1;
    companyRevenue += netRevenue;
    if (invoice) invoiceIds.add(invoice);
    if (reference) references.add(reference);

    detailRows.push([
      companyName,
      formatDateText(sale.NF_EMI),
      invoice,
      cleanText(sale.ID_NF),
      cleanText(sale.ID_CL),
      cleanText(sale.CL_NOM),
      cleanText(sale.CL_UF),
      cleanText(sale.CL_CID),
      reference,
      cleanText(sale.PR_DES),
      cleanText(sale.AGRP),
      cleanText(sale.Origem),
      parseNumber(sale.PR_QTD),
      parseNumber(sale.PR_SBT),
      parseNumber(sale.V_FRETE_NF),
      parseNumber(sale.V_DESCONTO),
      netRevenue,
    ]);
  }

  summary.set(companyId, {
    companyName,
    rows: companyRows,
    invoices: invoiceIds.size,
    references: references.size,
    revenue: companyRevenue,
  });
}

detailRows.sort((a, b) => `${a[0]}|${a[1]}|${a[2]}|${a[8]}`.localeCompare(`${b[0]}|${b[1]}|${b[2]}|${b[8]}`));

const workbook = Workbook.create();
const summarySheet = workbook.worksheets.add("Resumo");
const detailSheet = workbook.worksheets.add("Notas 2026 sem AGRP");
summarySheet.showGridLines = false;
detailSheet.showGridLines = false;

const generatedAt = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
summarySheet.getRange("A1:E1").merge();
summarySheet.getRange("A1").values = [["Notas fiscais emitidas em 2026 sem AGRP"]];
summarySheet.getRange("A2:E2").merge();
summarySheet.getRange("A2").values = [[`Gerado em ${generatedAt}`]];

const summaryHeaders = [["Empresa", "Itens sem AGRP", "Notas fiscais", "Referencias", "Faturamento liquido"]];
const summaryRows = Array.from(summary.values()).map((item) => [
  item.companyName,
  item.rows,
  item.invoices,
  item.references,
  item.revenue,
]);
const total = summaryRows.reduce((acc, row) => {
  acc[1] += row[1];
  acc[2] += row[2];
  acc[3] += row[3];
  acc[4] += row[4];
  return acc;
}, ["Total", 0, 0, 0, 0]);
summarySheet.getRangeByIndexes(3, 0, summaryRows.length + 2, 5).values = [
  ...summaryHeaders,
  ...summaryRows,
  total,
];

const detailHeaders = [[
  "Empresa",
  "Data emissao",
  "NF",
  "ID NF",
  "Codigo cliente",
  "Cliente",
  "UF",
  "Cidade",
  "Referencia",
  "Descricao produto",
  "AGRP atual",
  "Origem",
  "Quantidade",
  "PR_SBT",
  "V_FRETE_NF",
  "V_DESCONTO",
  "Faturamento liquido",
]];
detailSheet.getRangeByIndexes(0, 0, detailRows.length + 1, detailHeaders[0].length).values = [
  ...detailHeaders,
  ...detailRows,
];

summarySheet.getRange("A1").format.font.bold = true;
summarySheet.getRange("A1").format.font.size = 16;
summarySheet.getRange("A2").format.font.color = "#5f6f89";
summarySheet.getRange("A4:E4").format.font.bold = true;
summarySheet.getRange("A4:E4").format.fill.color = "#0b6f82";
summarySheet.getRange("A4:E4").format.font.color = "#ffffff";
summarySheet.getRangeByIndexes(4 + summaryRows.length, 0, 1, 5).format.font.bold = true;
summarySheet.getRangeByIndexes(4 + summaryRows.length, 0, 1, 5).format.fill.color = "#eef7f8";
summarySheet.getRangeByIndexes(4, 4, summaryRows.length + 1, 1).numberFormat = [["R$ #,##0.00"]];
summarySheet.getRange("A:E").format.autofitColumns();
summarySheet.freezePanes.freezeRows(4);

detailSheet.getRange("A1:Q1").format.font.bold = true;
detailSheet.getRange("A1:Q1").format.fill.color = "#0b6f82";
detailSheet.getRange("A1:Q1").format.font.color = "#ffffff";
detailSheet.getRangeByIndexes(1, 12, Math.max(detailRows.length, 1), 1).numberFormat = [["#,##0.000"]];
detailSheet.getRangeByIndexes(1, 13, Math.max(detailRows.length, 1), 4).numberFormat = [["R$ #,##0.00"]];
detailSheet.getRange("A:Q").format.autofitColumns();
detailSheet.freezePanes.freezeRows(1);

await fs.mkdir(outputDir, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

const preview = await workbook.render({ sheetName: "Resumo", range: "A1:E13", scale: 1 });
await fs.writeFile(path.join(outputDir, "notas_fiscais_2026_sem_agrp_resumo.png"), new Uint8Array(await preview.arrayBuffer()));

const inspect = await workbook.inspect({
  kind: "table",
  range: "Resumo!A1:E13",
  include: "values",
  tableMaxRows: 20,
  tableMaxCols: 8,
});
console.log(inspect.ndjson);
console.log(JSON.stringify({ outputPath, totalRows: detailRows.length }));
