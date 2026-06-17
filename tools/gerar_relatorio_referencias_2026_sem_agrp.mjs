import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const root = "C:/Users/comer/Documents/CRM";
const dataDir = path.join(root, "data");
const outputDir = path.join(root, "outputs", "relatorios");
const outputPath = path.join(outputDir, "referencias_2026_sem_agrp.xlsx");

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

function isMissingAgrp(value) {
  const text = cleanText(value).toUpperCase();
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
  const text = cleanText(value);
  const br = text.match(/\d{1,2}\/\d{1,2}\/(\d{2,4})/);
  if (br) {
    const year = Number(br[1]);
    return year < 100 ? 2000 + year : year;
  }
  const iso = text.match(/^(\d{4})-\d{1,2}-\d{1,2}/);
  if (iso) return Number(iso[1]);
  const any = text.match(/(\d{4})/);
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

for (const [companyId, companyName] of companies) {
  const sales = await readJson(path.join(dataDir, companyId, "vendas.json"), []);
  const companyRefs = new Set();
  let companyOccurrences = 0;
  let companyRevenue = 0;

  for (const sale of sales) {
    if (parseYear(sale.NF_EMI) !== 2026 || !isMissingAgrp(sale.AGRP)) {
      continue;
    }
    const reference = cleanText(sale.PR_COD);
    const key = normalizeKey(reference);
    if (!key) {
      continue;
    }
    const invoice = cleanText(sale.NF_NUM || sale.ID_NF || sale.NF_NRO);
    const netRevenue = saleNetRevenue(sale);
    const row = references.get(key) || {
      referencia: reference,
      descricao: cleanText(sale.PR_DES),
      agrp_atual: cleanText(sale.AGRP),
      origem: cleanText(sale.Origem),
      empresas: new Set(),
      notas: new Set(),
      ocorrencias: 0,
      quantidade: 0,
      faturamento: 0,
    };
    if (!row.descricao && cleanText(sale.PR_DES)) row.descricao = cleanText(sale.PR_DES);
    if (!row.agrp_atual && cleanText(sale.AGRP)) row.agrp_atual = cleanText(sale.AGRP);
    if (!row.origem && cleanText(sale.Origem)) row.origem = cleanText(sale.Origem);
    row.empresas.add(companyName);
    if (invoice) row.notas.add(`${companyName}|${invoice}`);
    row.ocorrencias += 1;
    row.quantidade += parseNumber(sale.PR_QTD);
    row.faturamento += netRevenue;
    references.set(key, row);

    companyRefs.add(key);
    companyOccurrences += 1;
    companyRevenue += netRevenue;
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
    row.agrp_atual,
    row.origem,
    Array.from(row.empresas).sort().join(", "),
    row.ocorrencias,
    row.notas.size,
    row.quantidade,
    row.faturamento,
  ])
  .sort((a, b) => String(a[0]).localeCompare(String(b[0])));

const summaryRows = Array.from(companySummary.entries()).map(([companyName, item]) => [
  companyName,
  item.referencias,
  item.ocorrencias,
  item.faturamento,
]);
const totalSummary = [
  "Total",
  detailRows.length,
  summaryRows.reduce((sum, row) => sum + row[2], 0),
  summaryRows.reduce((sum, row) => sum + row[3], 0),
];

const workbook = Workbook.create();
const summarySheet = workbook.worksheets.add("Resumo");
const detailSheet = workbook.worksheets.add("Referencias unicas");
summarySheet.showGridLines = false;
detailSheet.showGridLines = false;

const generatedAt = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
summarySheet.getRange("A1:D1").merge();
summarySheet.getRange("A1").values = [["Referências únicas de notas fiscais 2026 sem AGRP"]];
summarySheet.getRange("A2:D2").merge();
summarySheet.getRange("A2").values = [[`Gerado em ${generatedAt}`]];
summarySheet.getRangeByIndexes(3, 0, summaryRows.length + 2, 4).values = [
  ["Empresa", "Referências únicas", "Ocorrências nas notas", "Faturamento líquido"],
  ...summaryRows,
  totalSummary,
];

detailSheet.getRangeByIndexes(0, 0, detailRows.length + 1, 9).values = [
  ["Referência", "Descrição item", "AGRP atual", "Origem", "Empresas", "Ocorrências", "Notas fiscais", "Quantidade", "Faturamento líquido"],
  ...detailRows,
];

summarySheet.getRange("A1").format.font.bold = true;
summarySheet.getRange("A1").format.font.size = 16;
summarySheet.getRange("A2").format.font.color = "#5f6f89";
summarySheet.getRange("A4:D4").format.font.bold = true;
summarySheet.getRange("A4:D4").format.fill.color = "#0b6f82";
summarySheet.getRange("A4:D4").format.font.color = "#ffffff";
summarySheet.getRangeByIndexes(4 + summaryRows.length, 0, 1, 4).format.font.bold = true;
summarySheet.getRangeByIndexes(4 + summaryRows.length, 0, 1, 4).format.fill.color = "#eef7f8";
summarySheet.getRangeByIndexes(4, 3, summaryRows.length + 1, 1).numberFormat = [["R$ #,##0.00"]];
summarySheet.getRange("A:D").format.autofitColumns();
summarySheet.freezePanes.freezeRows(4);

detailSheet.getRange("A1:I1").format.font.bold = true;
detailSheet.getRange("A1:I1").format.fill.color = "#0b6f82";
detailSheet.getRange("A1:I1").format.font.color = "#ffffff";
detailSheet.getRangeByIndexes(1, 7, Math.max(detailRows.length, 1), 1).numberFormat = [["#,##0.000"]];
detailSheet.getRangeByIndexes(1, 8, Math.max(detailRows.length, 1), 1).numberFormat = [["R$ #,##0.00"]];
detailSheet.getRange("A:I").format.autofitColumns();
detailSheet.freezePanes.freezeRows(1);

await fs.mkdir(outputDir, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

const inspect = await workbook.inspect({
  kind: "table",
  range: "Resumo!A1:D13",
  include: "values",
  tableMaxRows: 20,
  tableMaxCols: 6,
});
console.log(inspect.ndjson);
console.log(JSON.stringify({ outputPath, uniqueReferences: detailRows.length }));
