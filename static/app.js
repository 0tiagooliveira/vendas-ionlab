const companies = [];

const pageTitles = {
  home: "Pagina principal",
  dashboard: "Dashboard",
  prospect: "Prospect",
  cadastros: "Cadastros",
  "sales-table": "Vendas",
  "clients-table": "Clientes",
  "stock-table": "Estoque",
  "in-transit-table": "Em Transito",
  "mercado-livre": "Gestao Mercado Livre",
  "prices-table": "Tabela de precos",
  "products-table": "Cadastro de Produtos",
  "costing-table": "Custeio",
  "follow-up": "Follow-UP Atendimentos",
  vendors: "Vendedores",
  regions: "Regiões",
  "blocked-clients": "Bloqueios",
  users: "Usuarios",
  "vendor-page": "Painel do vendedor",
};

const formatNumber = new Intl.NumberFormat("pt-BR");
const formatCurrency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});
const formatCurrency2 = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const formatCurrency3 = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});
const formatCompactNumber = new Intl.NumberFormat("pt-BR", {
  notation: "compact",
  maximumFractionDigits: 1,
});
const formatShortCurrencyThousands = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 1,
});
const formatPercent2 = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const vendorSeedNames = {
  ionlab: [
    "ADRIANA FATIMA SCQUIAVON",
    "ANDERSON HENRIQUE DE SOUSA",
    "ANDREA APARECIDA DE ALMEIDA",
    "ANGELA PAULA MARINHO FRANCISCO",
    "CIORBRASIL IMPORTACAO E COMERCIO LTDA",
    "CLAUDIA LIMA DE SOUZA",
    "DANUSA MILDEMBERG",
    "EDILSON DE MOURA ROSA",
    "EDUARDO FELIPE DE FARIAS",
    "ELAINE DE OLIVEIRA",
    "ELISEU SCQUIAVON",
    "EVEN COMERCIAL LTDA",
    "FREDERICK FERNANDES VIEIRA",
    "GUSTAVO DE OLIVEIRA PERPETUO",
    "HELCIO PEREIRA DE SOUZA",
    "IONLAB EQUIP LAB E HOSPITALARES LTDA - ME",
    "KETLIN DE MEDEIROS CANUTO FERNANDES",
    "LAIS OLIVEIRA LOPES",
    "LUCIA IRENE DE BARROS CAMPOS",
    "LUIS ANGELO JAKRRSKI",
    "LUIS FELIPE AMERICANO DOS SANTOS",
    "NATIVA LAB PRODUTOS LABORATORIAIS LTDA",
    "REGIAO 01",
    "REGIAO 02",
    "REGIAO 03",
    "REGIAO 04",
    "REGIAO 05",
    "RODRIGO SAMUEL DOS SANTOS",
    "SAC - IONLAB",
    "SERGIO LUIS SILVEIRA LEITE JUNIOR",
    "TATIANE DE OLIVEIRA NASCIMENTO",
    "UERITON DIEGO GONCALVES JUZINSKA",
    "VENDA INTERNA",
    "VITOR FLORIANO GOOD MISSEL",
    "VITRALAB EQUIPAMENTOS E SUPRIMENTOS PARA LABORATORIOS E HOSPITAIS EIRELI",
    "WESLEY LEITE DE JESUS",
    "YGOR HENRIQUE DA SILVA",
    "AMBARLAB PRODUTOS LABORATORIAIS LTDA",
  ],
};
const brazilUfs = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
  "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
  "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];
const tableState = {
  sales: { loaded: false, timer: null, sortKey: "", sortDir: "asc" },
  clients: { loaded: false, timer: null, sortKey: "", sortDir: "asc" },
  stock: { loaded: false, timer: null, sortKey: "Total", sortDir: "desc" },
  "in-transit": { loaded: false, timer: null, sortKey: "Previsao", sortDir: "asc" },
  prices: { loaded: false, timer: null, sortKey: "PR_COD", sortDir: "asc" },
  products: { loaded: false, timer: null, sortKey: "Referencia", sortDir: "asc" },
  costing: { loaded: false, timer: null, sortKey: "", sortDir: "asc" },
  "costing-fabricated": { loaded: false, timer: null, sortKey: "", sortDir: "asc" },
};
let dashboardLoaded = false;
let currentDashboardChart = "uf";
let currentVendorRegionPayload = null;
let currentVendorPageGoalsPayload = null;
let currentVendorDayByDayPayload = null;
let currentVendorDayByDayClient = null;
let currentVendorAgendaPayload = null;
let currentVendorContactReportPayload = null;
let currentVendorDailyContactsPayload = null;
let currentVendorRegionDimension = "ufs";
let currentVendorRegionIndicator = "quant";
let currentVendorRegionTarget = "dashboard";
let currentVendorClientStatus = "all";
let currentVendorClientFilters = { uf: "", ddd: "", city: "" };
let vendorRegionClientsLoaded = false;
let currentVendorRegionClientsPayload = null;
let currentVendorRegionClientsCacheKey = "";
let currentVendorWorkspace = "day";
let currentQuoteContext = null;
let currentQuoteClient = null;
let currentQuoteProduct = null;
let currentQuoteItems = [];
let currentLoadedQuote = null;
let currentLoadedOrder = null;
let currentQuoteMode = "quote";
let loadingSavedCommercialDocument = false;
let currentQuoteLoadedFromSent = false;
let currentQuickConsultProduct = null;
let quoteClientTimer = null;
let quoteProductTimer = null;
let quickConsultTimer = null;
let quoteSavedTimer = null;
let orderSavedTimer = null;
let prospectOptionsLoaded = false;
let prospectClientTimer = null;
let vendorsTimer = null;
let vendorRegionsSearchTimer = null;
let slowItemsRows = [];
let slowItemsTimer = null;
let slowItemsSortKey = "_dias_sem_movimento";
let slowItemsSortDir = "desc";
let currentVendors = [];
let currentVendorColumns = [];
let currentVendorRegionsPayload = null;
let currentRegionSavedManagementPayload = null;
let currentVendorGoalsPayload = null;
let currentMonthlyItems = [];
let currentRegionsPayload = null;
let mercadoLivreAdsTimer = null;
let mercadoLivreGeneralTimer = null;
let mercadoLivreSalesTimer = null;
let mercadoLivreOverview = { companies: [] };
let currentMercadoLivreCompany = "onix";
let currentMercadoLivreKind = "anuncios";
let currentMercadoLivreImportId = "";
let selectedRegionClient = null;
let pendingRegionRules = [];
let monthlyItemSearchTimer = null;
let regionClientSearchTimer = null;
let dayByDayGroupClientSearchTimer = null;
let vendorAssignmentOptions = { ufs: brazilUfs, assigned_ufs: [], cities: [] };
let currentVendorCitySelectOptions = [];
let currentVendorAssignments = { ufs: [], cidades: [], clientes_especificos: [] };
let vendorUnassignedCities = [];
let vendorClientSearchTimer = null;
let pendingVendorSpecificClient = null;
let blockedTimer = null;
let blockedClientSearchTimer = null;
let currentBlockedClient = null;
let blockReasons = [];
let activeCostingTable = "costing";
let currentUser = null;
let currentUserCatalog = { groups: [], levels: [] };
let currentUsersPayload = null;
let usersTimer = null;
let currentFollowUpPayload = null;
let currentFollowUpOptions = null;
let followUpTimer = null;

const authTokenKey = "crm_auth_token";
const appAssetVersion = "20260618-botoes-home-ajuste1";
const apiMemoryCache = new Map();
const fastCacheMs = 60 * 1000;
const closedPeriodCacheMs = 60 * 60 * 1000;

function clonePayload(payload) {
  if (typeof structuredClone === "function") {
    return structuredClone(payload);
  }
  return JSON.parse(JSON.stringify(payload));
}

function normalizeCacheUrl(url) {
  const absolute = new URL(url, window.location.origin);
  absolute.searchParams.delete("_");
  const sorted = Array.from(absolute.searchParams.entries())
    .sort(([keyA, valueA], [keyB, valueB]) => keyA === keyB ? valueA.localeCompare(valueB) : keyA.localeCompare(keyB));
  absolute.search = "";
  sorted.forEach(([key, value]) => absolute.searchParams.append(key, value));
  return `${absolute.pathname}${absolute.search}`;
}

function isClosedPeriodUrl(cacheUrl) {
  const absolute = new URL(cacheUrl, window.location.origin);
  const yearValue = absolute.searchParams.get("year") || absolute.searchParams.get("ano");
  const currentYear = new Date().getFullYear();
  if (!yearValue || yearValue === "all" || yearValue === "todos") {
    return false;
  }
  const yearNumber = Number(yearValue);
  return Number.isFinite(yearNumber) && yearNumber < currentYear;
}

function cacheTtlForUrl(cacheUrl) {
  const heavyPrefixes = [
    "/api/dashboard/",
    "/api/vendor-regions-data",
    "/api/dashboard/vendor-regions",
    "/api/vendor-page-data",
    "/api/vendor-goals",
    "/api/mercado-livre/sales-dashboard",
    "/api/mercado-livre/general",
    "/api/mercado-livre/ads",
    "/api/mercado-livre/sales",
    "/api/slow-items",
    "/api/table/",
    "/api/stock-summary",
    "/api/vendors",
    "/api/regions",
  ];
  if (!heavyPrefixes.some((prefix) => cacheUrl.startsWith(prefix))) {
    return 0;
  }
  return isClosedPeriodUrl(cacheUrl) ? closedPeriodCacheMs : fastCacheMs;
}

function clearApiCache() {
  apiMemoryCache.clear();
}

function clearVendorWorkspaceCache() {
  currentVendorAgendaPayload = null;
  currentVendorContactReportPayload = null;
  currentVendorDailyContactsPayload = null;
  currentVendorPageGoalsPayload = null;
  currentVendorRegionClientsPayload = null;
  currentVendorRegionClientsCacheKey = "";
  vendorRegionClientsLoaded = false;
}

function invalidateLoadedViews() {
  Object.values(tableState).forEach((state) => {
    state.loaded = false;
    state.cacheKey = "";
  });
  dashboardLoaded = false;
  mercadoLivreOverview = { companies: [] };
  currentUsersPayload = null;
  clearVendorWorkspaceCache();
}

const viewPermissionMap = {
  dashboard: ["dashboard.uf", "dashboard.activity", "dashboard.vendor-regions", "dashboard.annual-sales", "dashboard.monthly-evolution", "dashboard.family-sales"],
  prospect: ["prospect"],
  cadastros: ["cadastros.sales", "cadastros.clients", "cadastros.stock", "cadastros.in-transit", "cadastros.slow-items", "cadastros.prices-import", "cadastros.products", "cadastros.costing", "cadastros.costing-fabricated", "cadastros.vendors", "cadastros.regions", "users"],
  "sales-table": ["sales-table"],
  "clients-table": ["clients-table"],
  "stock-table": ["stock-table"],
  "in-transit-table": ["in-transit-table"],
  "prices-table": ["prices-table"],
  "products-table": ["products-table"],
  "mercado-livre": ["mercado-livre"],
  "costing-table": ["costing-table"],
  "follow-up": ["follow-up"],
  "blocked-clients": ["blocked-clients"],
};

const dashboardPermissionMap = {
  uf: "dashboard.uf",
  activity: "dashboard.activity",
  "vendor-regions": "dashboard.vendor-regions",
  "annual-sales": "dashboard.annual-sales",
  "monthly-evolution": "dashboard.monthly-evolution",
  "family-sales": "dashboard.family-sales",
};

const routinePermissionMap = {
  sales: "cadastros.sales",
  clients: "cadastros.clients",
  stock: "cadastros.stock",
  "in-transit": "cadastros.in-transit",
  "slow-items": "cadastros.slow-items",
  "prices-import": "cadastros.prices-import",
  products: "cadastros.products",
  costing: "cadastros.costing",
  "costing-fabricated": "cadastros.costing-fabricated",
  users: "users",
};

async function fetchJson(url, options) {
  const requestOptions = options || {};
  const { force, ...fetchOptions } = requestOptions;
  const method = String(requestOptions.method || "GET").toUpperCase();
  const cacheKey = method === "GET" ? normalizeCacheUrl(url) : "";
  const ttl = cacheKey ? cacheTtlForUrl(cacheKey) : 0;
  if (ttl && !force) {
    const cached = apiMemoryCache.get(cacheKey);
    if (cached && Date.now() - cached.savedAt < ttl) {
      return clonePayload(cached.payload);
    }
  }
  const requestUrl = method === "GET" ? cacheKey : url;
  const response = await fetch(requestUrl, {
    ...fetchOptions,
    cache: method === "GET" && ttl ? "default" : "no-store",
    headers: {
      Accept: "application/json",
      ...(localStorage.getItem(authTokenKey) ? { "X-Auth-Token": localStorage.getItem(authTokenKey) } : {}),
      ...(requestOptions.headers || {}),
    },
  });
  const text = await response.text();
  let payload;
  try {
    payload = text ? JSON.parse(text) : {};
  } catch (error) {
    const isHtml = text.trim().startsWith("<");
    throw new Error(isHtml
      ? `O servidor retornou uma pagina em vez de dados na rota ${url}. Atualize a pagina e tente novamente.`
      : "A resposta do servidor nao esta em formato valido.");
  }
  if (!response.ok) {
    throw new Error(payload.error || "Nao foi possivel concluir a operacao.");
  }
  if (method === "GET" && ttl) {
    apiMemoryCache.set(cacheKey, { savedAt: Date.now(), payload: clonePayload(payload) });
  } else if (method !== "GET") {
    clearApiCache();
    invalidateLoadedViews();
  }
  return payload;
}

function updateHomeReturnButton(viewName) {
  const button = document.getElementById("home-return-button");
  if (!button) {
    return;
  }
  button.classList.toggle("hidden", viewName === "home" && !vendorPageRoute());
}

function userPermissionLevel(key) {
  if (!currentUser) {
    return "blocked";
  }
  if (currentUser.tipo === "master") {
    return "edit";
  }
  return currentUser.permissions?.[key] || "blocked";
}

function canAccessPermission(key) {
  return userPermissionLevel(key) !== "blocked";
}

function canEditPermission(key) {
  return userPermissionLevel(key) === "edit";
}

function canAccessView(viewName) {
  if (viewName === "home" || viewName === "vendor-page") {
    return true;
  }
  if (!currentUser) {
    return true;
  }
  if (viewName === "follow-up" && currentUser && currentUser.tipo !== "master") {
    return true;
  }
  return (viewPermissionMap[viewName] || [viewName]).some((key) => canAccessPermission(key));
}

function firstAllowedView() {
  const order = ["dashboard", "prospect", "cadastros", "sales-table", "clients-table", "stock-table", "in-transit-table", "mercado-livre", "costing-table", "follow-up", "blocked-clients"];
  return order.find((viewName) => canAccessView(viewName)) || "home";
}

function applyAccessControls() {
  document.querySelectorAll("[data-view]").forEach((element) => {
    const viewName = element.dataset.view;
    element.classList.toggle("access-hidden", viewName !== "home" && !canAccessView(viewName));
  });
  document.querySelectorAll("[data-dashboard-chart]").forEach((button) => {
    const key = dashboardPermissionMap[button.dataset.dashboardChart];
    button.classList.toggle("access-hidden", key && !canAccessPermission(key));
  });
  document.querySelectorAll("[data-routine]").forEach((button) => {
    const key = routinePermissionMap[button.dataset.routine];
    button.classList.toggle("access-hidden", key && !canAccessPermission(key));
  });
  document.querySelectorAll('[data-view="vendors"]').forEach((button) => {
    button.classList.toggle("access-hidden", !canAccessPermission("cadastros.vendors"));
  });
  document.querySelectorAll('[data-view="regions"]').forEach((button) => {
    button.classList.toggle("access-hidden", !canAccessPermission("cadastros.regions"));
  });
  const activeDashboardButton = document.querySelector("[data-dashboard-chart].active");
  if (activeDashboardButton && !canAccessPermission(dashboardPermissionMap[activeDashboardButton.dataset.dashboardChart])) {
    const firstDashboard = Object.keys(dashboardPermissionMap).find((key) => canAccessPermission(dashboardPermissionMap[key]));
    if (firstDashboard) {
      setDashboardChart(firstDashboard);
    }
  }
  const activeRoutineButton = document.querySelector("[data-routine].active");
  if (activeRoutineButton && !canAccessPermission(routinePermissionMap[activeRoutineButton.dataset.routine])) {
    const firstRoutine = Object.keys(routinePermissionMap).find((key) => canAccessPermission(routinePermissionMap[key]));
    if (firstRoutine) {
      setRoutine(firstRoutine);
    }
  }
  document.querySelectorAll('[data-edit-permission]').forEach((element) => {
    const key = element.dataset.editPermission;
    element.disabled = key && !canEditPermission(key);
  });
  [
    ["#sales-routine .primary-action, #sales-recalculate-cost-button", "cadastros.sales"],
    ["#clients-routine .primary-action", "cadastros.clients"],
    ["#stock-routine .primary-action, #stock-recalculate-value-button", "cadastros.stock"],
    ["#in-transit-routine .primary-action", "cadastros.in-transit"],
    ["#slow-items-save-button", "cadastros.slow-items"],
    ["#prices-import-routine .primary-action", "cadastros.prices-import"],
    ["#products-routine .primary-action", "cadastros.products"],
    ["#costing-routine .primary-action, #costing-recalculate-button", "cadastros.costing"],
    ["#costing-fabricated-routine .primary-action, #costing-fabricated-recalculate-button", "cadastros.costing-fabricated"],
    ["#vendor-section-register .primary-action, #vendor-section-register .danger, #vendor-add-city, #vendor-add-specific-client", "cadastros.vendors"],
    ["#vendor-section-regions .danger", "cadastros.regions"],
    ["#blocked-form .primary-action, #block-reason-form .secondary-action", "blocked-clients"],
    ["#ml-ads-import-form .primary-action, #ml-sales-import-form .primary-action", "mercado-livre"],
    ["#user-form .primary-action, #user-new-button", "users"],
  ].forEach(([selector, key]) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.disabled = !canEditPermission(key);
      element.title = element.disabled ? "Usuario com permissao somente de visualizacao." : "";
    });
  });
  const chip = document.getElementById("current-user-chip");
  if (chip && currentUser) {
    chip.textContent = `${currentUser.nome || currentUser.login} (${currentUser.tipo === "master" ? "Master" : "Usuario"})`;
  }
}

function goHome() {
  if (vendorPageRoute()) {
    window.location.href = `/?v=${appAssetVersion}`;
    return;
  }
  setView("home");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function restoreAdminShell() {
  document.querySelector(".sidebar")?.style.removeProperty("display");
  document.querySelector(".app-shell")?.classList.remove("vendor-shell");
  const strip = document.getElementById("company-strip");
  if (strip && !strip.children.length && companies.length) {
    renderCompanies();
  }
}

function setView(viewName) {
  if (!canAccessView(viewName)) {
    alert("Usuario sem permissao para acessar esta pagina.");
    viewName = firstAllowedView();
  }
  const targetView = document.getElementById(`${viewName}-view`);
  if (!targetView) {
    console.warn(`Tela nao encontrada: ${viewName}`);
    return;
  }
  if (viewName !== "vendor-page") {
    restoreAdminShell();
    document.title = "CRM Ionlab";
  }
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("visible"));
  targetView.classList.add("visible");
  document.getElementById("page-title").textContent = pageTitles[viewName] || "CRM";
  updateHomeReturnButton(viewName);

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.view === viewName);
  });

  if (viewName === "sales-table") {
    loadTable("sales");
  }
  if (viewName === "clients-table") {
    loadTable("clients");
  }
  if (viewName === "stock-table") {
    loadTable("stock");
  }
  if (viewName === "in-transit-table") {
    loadTable("in-transit");
  }
  if (viewName === "prices-table") {
    loadTable("prices");
  }
  if (viewName === "products-table") {
    loadTable("products");
  }
  if (viewName === "costing-table") {
    setCostingInternalTable(activeCostingTable);
  }
  if (viewName === "cadastros") {
    const activeRoutine = document.querySelector("[data-routine].active")?.dataset.routine || "sales";
    setRoutine(activeRoutine);
  }
  if (viewName === "mercado-livre") {
    const activeMlTab = document.querySelector("[data-ml-tab].active")?.dataset.mlTab || "ads";
    if (activeMlTab === "general") {
      loadMercadoLivreGeneral();
    } else if (activeMlTab === "dashboard") {
      loadMercadoLivreDashboard();
    } else if (activeMlTab === "sales") {
      loadMercadoLivreSales();
    } else {
      loadMercadoLivreAds();
    }
  }
  if (viewName === "dashboard") {
    loadDashboard();
  }
  if (viewName === "prospect") {
    loadProspectOptions();
  }
  if (viewName === "vendors") {
    loadVendors();
  }
  if (viewName === "regions") {
    loadRegions();
  }
  if (viewName === "follow-up") {
    loadFollowUpOptions().then(loadFollowUp).catch((error) => {
      const status = document.getElementById("follow-up-status");
      if (status) {
        status.textContent = error.message;
      }
    });
  }
  if (viewName === "blocked-clients") {
    loadBlockedPage();
  }
}

function handleGlobalNavigationClick(event) {
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) {
    const viewName = viewButton.dataset.view;
    if (viewName === "home" && vendorPageRoute()) {
      event.preventDefault();
      goHome();
      return;
    }
    if (viewName) {
      event.preventDefault();
      setView(viewName);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return;
  }

  const routineButton = event.target.closest("[data-routine]");
  if (routineButton?.dataset.routine) {
    event.preventDefault();
    setRoutine(routineButton.dataset.routine);
  }
}

function vendorPageRoute() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  if (parts[0] !== "vendedor" || parts.length < 3) {
    return null;
  }
  return { company: parts[1], vendorId: parts.slice(2).join("/") };
}

function setVendorRegionTarget(target) {
  currentVendorRegionTarget = target;
}

function vendorRegionElements() {
  if (currentVendorRegionTarget === "vendor-page") {
    return {
      summary: document.getElementById("vendor-page-summary"),
      sections: document.getElementById("vendor-page-sections"),
      status: document.getElementById("vendor-page-status"),
    };
  }
  return {
    summary: document.getElementById("vendor-region-summary"),
    sections: document.getElementById("vendor-region-sections"),
    status: document.getElementById("vendor-region-status"),
  };
}

function renderCompanies() {
  const strip = document.getElementById("company-strip");
  const selects = [
    document.getElementById("sales-company-select"),
    document.getElementById("clients-company-select"),
    document.getElementById("prices-import-company-select"),
    document.getElementById("prices-ipi-company-select"),
    document.getElementById("products-company-select"),
    document.getElementById("in-transit-company-select"),
    document.getElementById("sales-table-company"),
    document.getElementById("clients-table-company"),
    document.getElementById("stock-table-company"),
    document.getElementById("in-transit-table-company"),
    document.getElementById("prices-table-company"),
    document.getElementById("products-table-company"),
    document.getElementById("costing-table-company"),
    document.getElementById("costing-fabricated-table-company"),
    document.getElementById("dashboard-company"),
    document.getElementById("follow-up-company"),
    document.getElementById("prospect-company"),
    document.getElementById("vendors-company"),
    document.getElementById("regions-company"),
    document.getElementById("monthly-items-company"),
    document.getElementById("slow-items-company"),
    document.getElementById("ml-ads-company"),
    document.getElementById("ml-sales-company"),
    document.getElementById("ml-dashboard-company"),
    document.getElementById("blocked-company"),
    document.getElementById("stock-company-select"),
    document.getElementById("costing-company-select"),
    document.getElementById("costing-fabricated-company-select"),
  ];

  strip.innerHTML = companies.map((company) => (
    `<span class="company-pill">${company.name}</span>`
  )).join("");

  const options = companies.map((company) => (
    `<option value="${company.id}">${company.name}</option>`
  )).join("");

  selects.filter(Boolean).forEach((select) => {
    select.innerHTML = options;
  });
  const dashboardCompany = document.getElementById("dashboard-company");
  if (dashboardCompany) {
    dashboardCompany.innerHTML = `${options}<option value="ionlab_cior">Ionlab+Cior</option><option value="agrupado">Agrupado</option>`;
  }
  const mercadoLivreCompanies = [
    document.getElementById("ml-ads-company"),
    document.getElementById("ml-sales-company"),
  ].filter(Boolean);
  if (mercadoLivreCompanies.length) {
    const allowedMlCompanies = new Set(["onix", "vitralab", "nativalab"]);
    const mlOptions = companies
      .filter((company) => allowedMlCompanies.has(company.id))
      .map((company) => `<option value="${company.id}">${company.name}</option>`)
      .join("");
    mercadoLivreCompanies.forEach((select) => {
      select.innerHTML = mlOptions;
    });
  }
  ["ml-ads-company", "ml-sales-company"].forEach((id) => {
    const select = document.getElementById(id);
    if (select && companies.some((company) => company.id === "onix")) {
      select.value = "onix";
    }
  });
  const mercadoLivreDashboardCompany = document.getElementById("ml-dashboard-company");
  if (mercadoLivreDashboardCompany) {
    const allowedMlCompanies = new Set(["onix", "vitralab", "nativalab"]);
    const mlOptions = companies
      .filter((company) => allowedMlCompanies.has(company.id))
      .map((company) => `<option value="${company.id}">${company.name}</option>`)
      .join("");
    mercadoLivreDashboardCompany.innerHTML = `<option value="agrupado">Agrupado</option>${mlOptions}`;
    mercadoLivreDashboardCompany.value = "agrupado";
  }

  renderVendorAccessOptions();
}

function isMasterUser() {
  return currentUser?.tipo === "master";
}

function currentUserMatchesVendor(vendor) {
  const currentUserIdKey = normalizeSearchText(currentUser?.id || "");
  const currentLoginKey = normalizeSearchText(currentUser?.login || "");
  const linkedUserKey = normalizeSearchText(vendor?.usuario_vinculado_id || "");
  const vendorLoginKey = normalizeSearchText(vendor?.login_acesso || vendor?.login || "");
  const vendorIdKey = normalizeSearchText(vendor?.id || "");
  return Boolean(
    (currentUserIdKey && linkedUserKey === currentUserIdKey)
    || (currentLoginKey && vendorLoginKey === currentLoginKey)
    || (currentUserIdKey && vendorIdKey === currentUserIdKey)
  );
}

function applyDashboardVendorMode() {
  const restricted = currentUser && !isMasterUser();
  document.querySelectorAll("[data-dashboard-chart]").forEach((button) => {
    const allowed = !restricted || button.dataset.dashboardChart === "vendor-regions";
    button.classList.toggle("hidden", !allowed);
  });
  if (restricted && currentDashboardChart !== "vendor-regions") {
    currentDashboardChart = "vendor-regions";
  }
  document.querySelectorAll(".dashboard-chart-panel").forEach((panel) => {
    panel.classList.toggle("visible", panel.id === `dashboard-chart-${currentDashboardChart}`);
  });
  document.querySelectorAll(".dashboard-chart-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.dashboardChart === currentDashboardChart);
  });
}

async function renderStats(selection = {}) {
  const grid = document.getElementById("stats-grid");
  if (!grid) {
    return;
  }
  grid.innerHTML = '<div class="table-status">Carregando indicadores do vendedor...</div>';
  try {
    const params = new URLSearchParams();
    if (selection.company) {
      params.set("company", selection.company);
    }
    if (selection.vendorId) {
      params.set("vendor_id", selection.vendorId);
    }
    const query = params.toString();
    const payload = await fetchJson(`/api/home/vendor-panel${query ? `?${query}` : ""}`, { force: true });
    renderHomeVendorCharts(payload);
  } catch (error) {
    grid.innerHTML = `
      <section class="home-vendor-insights-empty">
        <p class="eyebrow">Indicadores do vendedor</p>
        <h3>Nenhum painel individual vinculado</h3>
        <p class="muted">${escapeHtml(error.message)}</p>
      </section>
    `;
  }
}

function homeVendorChartCard(title, totalLabel, rows, valueKey, options = {}) {
  const maxValue = Math.max(1, ...rows.map((row) => Number(row[valueKey] || 0)));
  const formatter = options.currency ? formatCurrency : formatNumber;
  const averageValue = Number(options.averageValue || 0);
  const averageLabel = options.averageLabel || "";
  const metaLabel = options.metaLabel || "";
  const valueLabel = (value) => {
    if (options.currency && Math.abs(value) >= 1000) {
      return formatShortCurrencyThousands.format(value / 1000);
    }
    if (!options.currency && Math.abs(value) >= 1000) {
      return formatCompactNumber.format(value);
    }
    return formatter.format(value);
  };
  return `
    <article class="home-vendor-chart-card">
      <div class="home-vendor-chart-head">
        <div>
          <p class="eyebrow">${escapeHtml(title)}</p>
          <strong>${escapeHtml(totalLabel)}</strong>
          ${metaLabel ? `<span class="home-chart-meta-line">${escapeHtml(metaLabel)}</span>` : ""}
          ${averageLabel ? `<small>${escapeHtml(averageLabel)}</small>` : ""}
        </div>
      </div>
      <div class="home-mini-bars">
        ${rows.map((row) => {
          const value = Number(row[valueKey] || 0);
          const height = Math.max(value > 0 ? 8 : 0, Math.round((value / maxValue) * 84));
          const belowAverage = averageValue > 0 && value < averageValue;
          return `
            <span class="home-mini-bar ${belowAverage ? "below-average" : ""}" title="${escapeHtml(row.data_label || row.data)}: ${escapeHtml(formatter.format(value))}">
              <span class="home-mini-bar-plot">
                ${value > 0 ? `<span class="home-mini-bar-value">${escapeHtml(valueLabel(value))}</span>` : ""}
                <i style="height:${height}%"></i>
              </span>
              <em>${escapeHtml(String(row.data || "").slice(-2))}</em>
            </span>
          `;
        }).join("")}
      </div>
    </article>
  `;
}

function homeVendorContactsCard(payload) {
  const rows = payload.rows || [];
  const maxValue = Math.max(1, ...rows.map((row) => Number(row.contatos_total || 0)));
  const contactsGoal = Number(payload.meta?.contatos_diarios || 0);
  return `
    <article class="home-vendor-chart-card">
      <div class="home-vendor-chart-head">
        <div>
          <p class="eyebrow">Contatos diários</p>
          <strong>${formatNumber.format(payload.totals?.contatos_total || 0)} contatos</strong>
          <small>Meta ${formatNumber.format(contactsGoal)} por dia · Inativos ${formatNumber.format(payload.totals?.contatos_inativos || 0)} · Nunca comprou ${formatNumber.format(payload.totals?.contatos_nunca_comprou || 0)}</small>
        </div>
      </div>
      <div class="home-mini-bars stacked">
        ${rows.map((row) => {
          const inactive = Number(row.contatos_inativos || 0);
          const never = Number(row.contatos_nunca_comprou || 0);
          const total = inactive + never;
          const inactiveHeight = Math.round((inactive / maxValue) * 84);
          const neverHeight = Math.round((never / maxValue) * 84);
          const goalReached = contactsGoal > 0 && total >= contactsGoal;
          const mood = contactsGoal > 0 ? (goalReached ? "☺" : "☹") : "";
          return `
            <span class="home-mini-bar" title="${escapeHtml(row.data_label || row.data)}: ${formatNumber.format(total)} contatos · Meta ${formatNumber.format(contactsGoal)}">
              <span class="home-mini-bar-plot">
                ${total > 0 ? `<span class="home-mini-bar-value">${escapeHtml(formatNumber.format(total))}</span>` : ""}
                <i class="inactive" style="height:${inactiveHeight}%"></i>
                <i class="never" style="height:${neverHeight}%"></i>
              </span>
              ${mood ? `<span class="home-mini-bar-mood ${goalReached ? "happy" : "sad"}" title="${goalReached ? "Meta atingida" : "Meta nao atingida"}">${mood}</span>` : ""}
              <em>${escapeHtml(String(row.data || "").slice(-2))}</em>
            </span>
          `;
        }).join("")}
      </div>
      <div class="home-chart-legend">
        <span><i class="inactive"></i>Inativos</span>
        <span><i class="never"></i>Nunca comprou</span>
      </div>
    </article>
  `;
}

function renderHomeVendorCharts(payload) {
  const grid = document.getElementById("stats-grid");
  if (!grid) {
    return;
  }
  const rows = payload.rows || [];
  const vendorOptions = payload.vendedores || [];
  const selectedVendorKey = `${payload.empresa_id || ""}|${payload.vendedor?.id || ""}`;
  const salesGoal = Number(payload.meta?.vendas_liquidas_mes || 0);
  const requiredSalesAverage = Number(payload.meta?.media_diaria_necessaria || 0);
  const businessDays = Number(payload.meta?.dias_uteis_mes || 0);
  const currentSalesAverage = rows.length ? Number(payload.totals?.vendas_liquidas || 0) / rows.length : 0;
  const clientsGoal = Number(payload.meta?.clientes_atendidos_mes || 0);
  const reactivationsGoal = Number(payload.meta?.reativacoes_mes || 0);
  grid.innerHTML = `
    <section class="home-vendor-insights-title">
      <div>
        <p class="eyebrow">Indicadores do vendedor</p>
        <h2>${escapeHtml(payload.vendedor?.nome_completo || "Vendedor")}</h2>
        <p class="muted">${escapeHtml(payload.empresa || "")} · Mês corrente ${escapeHtml(payload.month_label || "")}</p>
      </div>
      ${payload.selecionavel ? `
        <label class="home-vendor-selector">
          <span>Selecionar vendedor</span>
          <select id="home-vendor-indicator-select">
            ${vendorOptions.map((vendor) => {
              const key = `${vendor.empresa_id || ""}|${vendor.id || ""}`;
              return `<option value="${escapeHtml(key)}" ${key === selectedVendorKey ? "selected" : ""}>${escapeHtml(vendor.nome_completo || "Vendedor")} - ${escapeHtml(vendor.empresa || "")}</option>`;
            }).join("")}
          </select>
        </label>
      ` : ""}
    </section>
    <div class="home-vendor-insights-grid">
      ${homeVendorChartCard("Vendas líquidas diárias", formatCurrency.format(payload.totals?.vendas_liquidas || 0), rows, "vendas_liquidas", {
        currency: true,
        averageValue: requiredSalesAverage,
        metaLabel: `Meta ${formatCurrency.format(salesGoal)}`,
        averageLabel: `Média atual ${formatCurrency.format(currentSalesAverage)} · Média necessária ${formatCurrency.format(requiredSalesAverage)} (${formatNumber.format(businessDays)} dias úteis)`,
      })}
      ${homeVendorChartCard("Clientes atendidos por dia", `${formatNumber.format(payload.totals?.clientes_atendidos || 0)} clientes`, rows, "clientes_atendidos", {
        metaLabel: `Meta ${formatNumber.format(clientsGoal)} clientes no mês`,
      })}
      ${homeVendorChartCard("Reativação de inativos", `${formatNumber.format(payload.totals?.reativacoes || 0)} reativações`, rows, "reativacoes", {
        metaLabel: `Meta ${formatNumber.format(reactivationsGoal)} reativações no mês`,
      })}
      ${homeVendorContactsCard(payload)}
    </div>
  `;
  const selector = document.getElementById("home-vendor-indicator-select");
  if (selector) {
    selector.addEventListener("change", () => {
      const [company, vendorId] = String(selector.value || "").split("|");
      renderStats({ company, vendorId });
    });
  }
}

async function renderHomeVendorPages() {
  const grid = document.getElementById("home-vendor-grid");
  const panelBox = document.getElementById("home-vendor-panel-box");
  const panelList = document.getElementById("home-vendor-panel-list");
  const panelSummary = document.getElementById("home-vendor-panel-summary");
  if (!grid && !panelBox) {
    return;
  }
  if (panelList) {
    panelList.innerHTML = '<span class="vendor-panel-empty">Carregando...</span>';
  }
  if (panelSummary) {
    panelSummary.textContent = "Carregando vendedores...";
  }

  if (grid) {
    grid.innerHTML = '<div class="table-status">Carregando vendedores ativos...</div>';
  }
  let activeVendors = [];
  try {
    const payload = await fetchJson("/api/vendor-page-links");
    activeVendors = payload.rows || [];
  } catch (error) {
    const companyPayloads = await Promise.all(companies.map(async (company) => {
      try {
        return await fetchJson(`/api/vendors?company=${encodeURIComponent(company.id)}&q=`);
      } catch (fetchError) {
        return { empresa: company.name, rows: [] };
      }
    }));
    activeVendors = companyPayloads.flatMap((payload) =>
      (payload.rows || [])
        .filter((vendor) => vendor.status === "Ativo")
        .map((vendor) => ({
          ...vendor,
          empresa: payload.empresa,
          pagina_vendedor: vendor.pagina_vendedor || `/vendedor/${vendor._empresa_id || "ionlab"}/${vendor.id}`,
        }))
    );
  }

  const allActiveVendors = [...activeVendors];
  const isMaster = currentUser?.tipo === "master";
  const currentUserId = currentUser?.id || "";
  const currentUserIdKey = normalizeSearchText(currentUserId);
  const currentLogin = currentUser?.login || "";
  const currentLoginKey = normalizeSearchText(currentLogin);
  const linkedUserVendors = allActiveVendors.filter((vendor) => String(vendor.usuario_vinculado_id || "").trim());
  const filledLoginVendors = allActiveVendors.filter((vendor) => String(vendor.login_acesso || vendor.login || "").trim());
  if (!isMaster) {
    activeVendors = activeVendors.filter((vendor) =>
      (currentUserIdKey && normalizeSearchText(vendor.usuario_vinculado_id || "") === currentUserIdKey)
      || (currentLoginKey && normalizeSearchText(vendor.login_acesso || vendor.login || "") === currentLoginKey)
    );
  }

  const cards = activeVendors.map((vendor) => `
    <a class="home-vendor-card" href="${escapeHtml(vendor.pagina_vendedor)}?v=${appAssetVersion}">
      <span>${escapeHtml(vendor.empresa || vendor.empresa_nome || "")}</span>
      <strong>${escapeHtml(vendor.nome_completo || "Vendedor")}</strong>
      <small>Entrar no painel individual</small>
    </a>
  `).join("");
  if (panelList) {
    if (activeVendors.length) {
      panelSummary.textContent = isMaster
        ? `${formatNumber.format(activeVendors.length)} vendedores ativos`
        : activeVendors[0]?.nome_completo || "Vendedor vinculado";
      panelList.innerHTML = activeVendors.map((vendor) => `
        <button class="vendor-panel-pill" type="button" data-vendor-page="${escapeHtml(vendor.pagina_vendedor || "")}">
          <span>${escapeHtml(vendor.nome_completo || "Vendedor")}</span>
          <small>${escapeHtml(vendor.empresa || vendor.empresa_nome || "")}</small>
        </button>
      `).join("");
      panelList.querySelectorAll("[data-vendor-page]").forEach((button) => {
        button.addEventListener("click", () => {
          const page = button.dataset.vendorPage || "";
          if (page) {
            window.location.href = `${page}?v=${appAssetVersion}`;
          }
        });
      });
    } else {
      panelSummary.textContent = "Nenhum painel vinculado";
      panelList.innerHTML = '<span class="vendor-panel-empty">Sem vendedor disponível para este login.</span>';
    }
  }
  if (cards) {
    if (grid) {
      grid.innerHTML = cards;
    }
    return;
  }
  if (isMaster) {
    if (grid) {
      grid.innerHTML = '<div class="table-status">Nenhum vendedor ativo encontrado.</div>';
    }
    return;
  }
  const diagnosticMessage = !currentLoginKey
    ? "a sessão atual não informou um login de usuário válido."
    : linkedUserVendors.length
      ? `existem ${formatNumber.format(linkedUserVendors.length)} vendedor(es) ativo(s) com Usuário vinculado preenchido, mas nenhum está com o código do usuário atual "${escapeHtml(currentUserId || currentLogin)}".`
      : filledLoginVendors.length
      ? `existem ${formatNumber.format(filledLoginVendors.length)} vendedor(es) ativo(s) com Login de acesso preenchido, mas nenhum está igual ao login atual "${escapeHtml(currentLogin)}".`
      : "nenhum vendedor ativo está com Usuário vinculado ou Login de acesso preenchido.";
  if (grid) {
    grid.innerHTML = `
    <div class="table-status vendor-link-warning">
      <strong>Nenhuma página de vendedor vinculada ao seu login.</strong>
      <p>Motivo: ${diagnosticMessage}</p>
      <p>Usuário atual identificado: <b>${escapeHtml(currentUserId || "sem código")}</b>. Login: <b>${escapeHtml(currentLogin || "não identificado")}</b>. Tipo de usuário: <b>${escapeHtml(currentUser?.tipo || "não identificado")}</b>.</p>
      <p>Confirme se o vendedor está Ativo, se o usuário está Ativo e se o campo Usuário vinculado no cadastro do vendedor aponta para o código deste usuário. O Login de acesso fica apenas como compatibilidade. Depois clique em Sair e entre novamente.</p>
    </div>
  `;
  }
}

function setupProspectPeriodControls() {
  const months = [
    ["1", "Janeiro"], ["2", "Fevereiro"], ["3", "Marco"], ["4", "Abril"],
    ["5", "Maio"], ["6", "Junho"], ["7", "Julho"], ["8", "Agosto"],
    ["9", "Setembro"], ["10", "Outubro"], ["11", "Novembro"], ["12", "Dezembro"],
  ];
  const monthOptions = '<option value="">Selecione</option>' + months
    .map(([value, label]) => `<option value="${value}">${label}</option>`)
    .join("");
  document.getElementById("prospect-start-month").innerHTML = monthOptions;
  document.getElementById("prospect-end-month").innerHTML = monthOptions;

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = 2021; year <= currentYear; year += 1) {
    years.push(year);
  }
  const yearOptions = '<option value="">Selecione</option>' + years
    .map((year) => `<option value="${year}">${year}</option>`)
    .join("");
  document.getElementById("prospect-start-year").innerHTML = yearOptions;
  document.getElementById("prospect-end-year").innerHTML = yearOptions;

  document.getElementById("prospect-start-month").value = "1";
  document.getElementById("prospect-end-month").value = String(new Date().getMonth() + 1);
  document.getElementById("prospect-start-year").value = "2021";
  document.getElementById("prospect-end-year").value = String(currentYear);
}

async function loadProspectOptions() {
  const company = document.getElementById("prospect-company").value || "ionlab";
  const selectedUf = document.getElementById("prospect-uf").value || "";
  const options = await fetchJson(`/api/prospect/options?company=${encodeURIComponent(company)}&uf=${encodeURIComponent(selectedUf)}`);

  const ufSelect = document.getElementById("prospect-uf");
  const previousUf = ufSelect.value;
  ufSelect.innerHTML = '<option value="">Todas</option>' + options.ufs
    .map((uf) => `<option value="${escapeHtml(uf)}">${escapeHtml(uf)}</option>`)
    .join("");
  ufSelect.value = options.ufs.includes(previousUf) ? previousUf : "";

  const citySelect = document.getElementById("prospect-city");
  const previousCity = citySelect.value;
  citySelect.innerHTML = '<option value="">Todas</option>' + options.cities
    .map((city) => `<option value="${escapeHtml(city)}">${escapeHtml(city)}</option>`)
    .join("");
  citySelect.value = options.cities.includes(previousCity) ? previousCity : "";

  document.getElementById("prospect-reference-list").innerHTML = options.references
    .map((reference) => `<option value="${escapeHtml(reference)}"></option>`)
    .join("");

  prospectOptionsLoaded = true;
}

function clearProspectClientSelection() {
  document.getElementById("prospect-client-id").value = "";
}

async function searchProspectClients() {
  const query = document.getElementById("prospect-client-search").value.trim();
  const suggestions = document.getElementById("prospect-client-suggestions");
  clearProspectClientSelection();

  if (query.length < 2) {
    suggestions.classList.remove("visible");
    suggestions.innerHTML = "";
    return;
  }

  const company = document.getElementById("prospect-company").value || "ionlab";
  const uf = document.getElementById("prospect-uf").value;
  const city = document.getElementById("prospect-city").value;
  const payload = await fetchJson(`/api/prospect/clients?company=${encodeURIComponent(company)}&uf=${encodeURIComponent(uf)}&city=${encodeURIComponent(city)}&q=${encodeURIComponent(query)}`);
  const blockedCodes = localBlockedCodeSet(company);
  payload.clients = payload.clients.filter((client) => !blockedCodes.has(normalizeLocalText(client.id)));

  suggestions.innerHTML = payload.clients.map((client) => `
    <button class="prospect-suggestion" type="button" data-client-id="${escapeHtml(client.id)}" data-client-label="${escapeHtml(client.label)}">
      <strong>${escapeHtml(client.label)}</strong>
      <span>${escapeHtml(client.city || "")} ${escapeHtml(client.uf || "")}</span>
    </button>
  `).join("");
  suggestions.classList.toggle("visible", payload.clients.length > 0);

  suggestions.querySelectorAll(".prospect-suggestion").forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById("prospect-client-search").value = button.dataset.clientLabel;
      document.getElementById("prospect-client-id").value = button.dataset.clientId;
      suggestions.classList.remove("visible");
    });
  });
}

function scheduleProspectClientSearch() {
  clearTimeout(prospectClientTimer);
  prospectClientTimer = setTimeout(searchProspectClients, 220);
}

async function handleProspectSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const params = new URLSearchParams(new FormData(form));
  const status = document.getElementById("prospect-status");
  status.textContent = "Pesquisando prospects...";

  try {
    const payload = await fetchJson(`/api/prospect?${params.toString()}`);
    renderProspectResults(filterProspectBlocked(payload, params.get("company") || "ionlab"));
  } catch (error) {
    status.textContent = error.message;
    document.getElementById("prospect-table-head").innerHTML = "";
    document.getElementById("prospect-table-body").innerHTML = "";
  }
}

function renderProspectResults(payload) {
  const summary = document.getElementById("prospect-summary");
  summary.innerHTML = `
    <article><span>Base filtrada</span><strong>${formatNumber.format(payload.total_base)}</strong></article>
    <article><span>Ativos</span><strong>${formatNumber.format(payload.ativos)}</strong></article>
    <article><span>Inativos</span><strong>${formatNumber.format(payload.inativos)}</strong></article>
    <article><span>Nunca comprou</span><strong>${formatNumber.format(payload.nunca_comprou || 0)}</strong></article>
    <article><span>Faturamento liquido</span><strong>${formatCurrency.format(payload.faturamento_liquido || 0)}</strong></article>
  `;

  document.getElementById("prospect-status").textContent =
    `${payload.empresa}: exibindo ${formatNumber.format(payload.rows.length)} de ${formatNumber.format(payload.total_resultado)} clientes encontrados.`;

  document.getElementById("prospect-table-head").innerHTML = `
    <tr>${payload.columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}</tr>
  `;
  document.getElementById("prospect-table-body").innerHTML = payload.rows.map((row) => `
    <tr>
      ${payload.columns.map((column) => `<td>${formatProspectCell(row, column.key)}</td>`).join("")}
    </tr>
  `).join("") || `
    <tr><td colspan="${payload.columns.length}">Nenhum cliente encontrado para os filtros selecionados.</td></tr>
  `;
}

function localBlockedCodeSet(company) {
  return new Set(localBlockedRows(company).map((row) => normalizeLocalText(row.codigo_cliente)));
}

function isLocalGroupCompanyClient(client) {
  const name = normalizeLocalText(`${client.NOM || client.name || ""} ${client.FAN || ""}`);
  return companies.some((company) => name.includes(normalizeLocalText(company.name)));
}

function localDddFromClient(client) {
  const digits = String(client.TEL || client.telefone || "")
    .replace(/\D/g, "");
  return digits.length >= 2 ? digits.slice(0, 2) : "";
}

function filterProspectBlocked(payload, company) {
  const blockedCodes = localBlockedCodeSet(company);
  if (blockedCodes.size === 0) {
    return payload;
  }

  const rows = payload.rows.filter((row) => !blockedCodes.has(normalizeLocalText(row.ID)));
  const filtered = { ...payload, rows };
  filtered.total_resultado = rows.length;
  filtered.total_base = Math.max(0, payload.total_base - (payload.rows.length - rows.length));
  filtered.ativos = rows.filter((row) => row.status === "Ativo").length;
  filtered.inativos = rows.filter((row) => row.status !== "Ativo").length;
  filtered.nunca_comprou = rows.filter((row) => row.status === "Nunca Comprou").length;
  filtered.faturamento_liquido = rows.reduce((total, row) => total + Number(row.faturamento_liquido || 0), 0);
  return filtered;
}

function formatProspectCell(row, key) {
  if (key === "status") {
    const active = row.status === "Ativo";
    const never = row.status === "Nunca Comprou";
    return `<span class="status-pill ${active ? "active" : never ? "never" : "inactive"}">${escapeHtml(row.status)}</span>`;
  }
  if (key === "faturamento_liquido") {
    return escapeHtml(formatCurrency.format(row[key] || 0));
  }
  if (key === "ultima_compra") {
    return escapeHtml(formatCell(row[key]));
  }
  return escapeHtml(formatCell(row[key]));
}

async function loadDashboard() {
  applyDashboardVendorMode();
  const companySelect = document.getElementById("dashboard-company");
  const company = companySelect.value || "ionlab";
  const chart = document.getElementById("uf-chart");

  if (["annual-sales", "monthly-evolution", "family-sales"].includes(currentDashboardChart)) {
    await loadDashboardSalesCharts();
    dashboardLoaded = true;
    return;
  }

  if (currentDashboardChart === "vendor-regions") {
    await loadDashboardVendors();
    await loadVendorRegionsChart();
    dashboardLoaded = true;
    return;
  }

  if (!dashboardLoaded || currentDashboardChart === "uf" || currentDashboardChart === "activity") {
    chart.innerHTML = '<div class="table-status">Carregando dashboard...</div>';

    try {
      const payload = await fetchJson(`/api/dashboard/clients-by-uf?company=${encodeURIComponent(company)}`);
      renderUfChart(payload);
      renderActivityChart(payload);
      dashboardLoaded = true;
    } catch (error) {
      chart.innerHTML = `<div class="table-status">${escapeHtml(error.message)}</div>`;
      document.getElementById("activity-chart").innerHTML = `<div class="table-status">${escapeHtml(error.message)}</div>`;
    }
  }
}

function setDashboardChart(chartName) {
  if (currentUser && !isMasterUser()) {
    chartName = "vendor-regions";
  }
  const permissionKey = dashboardPermissionMap[chartName];
  if (permissionKey && !canAccessPermission(permissionKey)) {
    alert("Usuario sem permissao para este indicador.");
    chartName = Object.keys(dashboardPermissionMap).find((key) => canAccessPermission(dashboardPermissionMap[key])) || "uf";
  }
  currentDashboardChart = chartName;
  document.querySelectorAll(".dashboard-chart-panel").forEach((panel) => {
    panel.classList.toggle("visible", panel.id === `dashboard-chart-${chartName}`);
  });
  document.querySelectorAll(".dashboard-chart-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.dashboardChart === chartName);
  });
  loadDashboard();
}

async function loadDashboardVendors() {
  const companySelect = document.getElementById("dashboard-company");
  let company = companySelect.value || "ionlab";
  const select = document.getElementById("dashboard-vendor-select");
  const previous = select.value;
  const restricted = currentUser && !isMasterUser();
  if (company === "agrupado" || company === "ionlab_cior") {
    if (restricted) {
      company = "ionlab";
      companySelect.value = company;
    } else {
      select.innerHTML = '<option value="">Selecione uma empresa individual</option>';
      select.disabled = false;
      return;
    }
  }
  if (restricted) {
    companySelect.disabled = true;
  } else {
    companySelect.disabled = false;
  }

  async function moveToLinkedVendorCompany() {
    if (!restricted) {
      return false;
    }
    const linksPayload = await fetchJson("/api/vendor-page-links", { force: true });
    const linked = (linksPayload.rows || []).filter(currentUserMatchesVendor);
    if (linked.length && linked[0].empresa_id && linked[0].empresa_id !== company) {
      companySelect.value = linked[0].empresa_id;
      return true;
    }
    return false;
  }

  if (restricted && company === "ionlab") {
    try {
      const moved = await moveToLinkedVendorCompany();
      if (moved) {
        return loadDashboardVendors();
      }
    } catch (_error) {
      // A lista de vendedores da empresa atual ainda será usada como fallback.
    }
  }

  if (company === "agrupado" || company === "ionlab_cior") {
    select.innerHTML = '<option value="">Selecione uma empresa individual</option>';
    select.disabled = false;
    return;
  }
  select.innerHTML = '<option value="">Carregando vendedores...</option>';

  try {
    const payload = await fetchJson(`/api/vendors?company=${encodeURIComponent(company)}&q=`);
    let activeVendors = payload.rows.filter((vendor) => vendor.status === "Ativo");
    if (restricted) {
      activeVendors = activeVendors.filter(currentUserMatchesVendor);
      if (!activeVendors.length) {
        const moved = await moveToLinkedVendorCompany();
        if (moved) {
          return loadDashboardVendors();
        }
      }
    }
    select.innerHTML = (restricted ? "" : '<option value="">Selecione</option>') + activeVendors
      .map((vendor) => `<option value="${escapeHtml(vendor.id)}">${escapeHtml(vendor.nome_completo || "")}</option>`)
      .join("");
    select.disabled = restricted && activeVendors.length <= 1;
    if (restricted && activeVendors.length) {
      select.value = activeVendors[0].id;
    } else if (activeVendors.some((vendor) => vendor.id === previous)) {
      select.value = previous;
    } else if (!restricted) {
      select.value = "";
    }
    if (restricted && !activeVendors.length) {
      select.innerHTML = '<option value="">Nenhum vendedor vinculado ao seu login</option>';
    }
  } catch (error) {
    select.innerHTML = '<option value="">Nao foi possivel carregar</option>';
    select.disabled = false;
  }
}

function setupDashboardSalesYearSelects() {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = 2021; year <= currentYear; year += 1) {
    years.push(year);
  }
  ["dashboard-annual-year", "dashboard-monthly-year", "dashboard-family-year"].forEach((id) => {
    const select = document.getElementById(id);
    if (!select || select.dataset.ready === "true") {
      return;
    }
    select.innerHTML = '<option value="all">Todos os anos</option>' + years
      .map((year) => `<option value="${year}">${year}</option>`)
      .join("");
    select.value = "all";
    select.dataset.ready = "true";
  });
}

async function loadDashboardSalesCharts() {
  setupDashboardSalesYearSelects();
  const company = document.getElementById("dashboard-company").value || "ionlab";
  const yearSelectId = currentDashboardChart === "monthly-evolution"
    ? "dashboard-monthly-year"
    : currentDashboardChart === "family-sales"
      ? "dashboard-family-year"
      : "dashboard-annual-year";
  const year = document.getElementById(yearSelectId)?.value || "all";
  const annualChart = document.getElementById("dashboard-annual-chart");
  const monthlyChart = document.getElementById("dashboard-monthly-chart");
  const familyChart = document.getElementById("dashboard-family-chart");
  const status = document.getElementById(currentDashboardChart === "monthly-evolution"
    ? "dashboard-monthly-status"
    : currentDashboardChart === "family-sales"
      ? "dashboard-family-status"
      : "dashboard-annual-status");
  if (currentDashboardChart === "monthly-evolution") {
    monthlyChart.innerHTML = '<div class="table-status">Carregando evolucao mensal...</div>';
  } else if (currentDashboardChart === "family-sales") {
    familyChart.innerHTML = '<div class="table-status">Carregando faturamento por familia...</div>';
  } else {
    annualChart.innerHTML = '<div class="table-status">Carregando vendas anuais...</div>';
  }
  status.textContent = "Calculando faturamento liquido...";
  try {
    const endpoint = currentDashboardChart === "family-sales" ? "sales-family" : "sales-annual";
    const origin = currentDashboardChart === "family-sales"
      ? document.getElementById("dashboard-family-origin")?.value || "all"
      : currentDashboardChart === "monthly-evolution"
        ? document.getElementById("dashboard-monthly-origin")?.value || "all"
        : "all";
    const agrp = currentDashboardChart === "monthly-evolution"
      ? document.getElementById("dashboard-monthly-agrp")?.value || "all"
      : "all";
    const payload = await fetchJson(`/api/dashboard/${endpoint}?company=${encodeURIComponent(company)}&year=${encodeURIComponent(year)}&origin=${encodeURIComponent(origin)}&agrp=${encodeURIComponent(agrp)}`);
    if (currentDashboardChart === "monthly-evolution") {
      renderDashboardMonthlyEvolution(payload);
    } else if (currentDashboardChart === "family-sales") {
      renderDashboardFamilySales(payload);
    } else {
      renderDashboardAnnualSales(payload);
    }
    status.textContent = `${payload.empresa}: faturamento liquido calculado. Vendas entre empresas do grupo excluidas: ${formatNumber.format(payload.vendas_grupo_excluidas || 0)}.`;
  } catch (error) {
    if (currentDashboardChart === "monthly-evolution") {
      monthlyChart.innerHTML = `<div class="table-status">${escapeHtml(error.message)}</div>`;
    } else if (currentDashboardChart === "family-sales") {
      familyChart.innerHTML = `<div class="table-status">${escapeHtml(error.message)}</div>`;
    } else {
      annualChart.innerHTML = `<div class="table-status">${escapeHtml(error.message)}</div>`;
    }
    status.textContent = error.message;
  }
}

function renderDashboardAnnualSales(payload) {
  document.getElementById("dashboard-annual-title").textContent = `Vendas Anuais - ${payload.empresa}`;
  document.getElementById("dashboard-annual-subtitle").textContent = `Faturamento liquido: ${payload.calculo_faturamento}.`;
  document.getElementById("dashboard-annual-chart").innerHTML = dashboardAnnualBars(payload);
}

function renderDashboardMonthlyEvolution(payload) {
  const originSelect = document.getElementById("dashboard-monthly-origin");
  const agrpSelect = document.getElementById("dashboard-monthly-agrp");
  const previousOrigin = originSelect?.value || payload.selected_origin || "all";
  const previousAgrp = agrpSelect?.value || payload.selected_agrp || "all";
  if (originSelect) {
    const origins = payload.origins || [
      { id: "all", name: "Todas as origens" },
      { id: "imported", name: "Importado" },
      { id: "fabricated_br", name: "Fabricados BR" },
    ];
    originSelect.innerHTML = origins
      .map((origin) => `<option value="${escapeHtml(origin.id)}">${escapeHtml(origin.name)}</option>`)
      .join("");
    originSelect.value = origins.some((origin) => origin.id === previousOrigin)
      ? previousOrigin
      : payload.selected_origin || "all";
  }
  if (agrpSelect) {
    const families = payload.families || [];
    agrpSelect.innerHTML = '<option value="all">Todos os AGRP</option>' + families
      .map((family) => `<option value="${escapeHtml(family)}">${escapeHtml(family)}</option>`)
      .join("");
    agrpSelect.value = families.includes(previousAgrp) ? previousAgrp : "all";
  }
  document.getElementById("dashboard-monthly-title").textContent = `Evolucao Mensal - ${payload.empresa}`;
  const originLabel = originSelect?.selectedOptions?.[0]?.textContent || "Todas as origens";
  const agrpLabel = agrpSelect?.selectedOptions?.[0]?.textContent || "Todos os AGRP";
  document.getElementById("dashboard-monthly-subtitle").textContent = `Origem: ${originLabel}. AGRP: ${agrpLabel}. Faturamento liquido: ${payload.calculo_faturamento}.`;
  document.getElementById("dashboard-monthly-chart").innerHTML = dashboardMonthlyEvolution(payload);
}

function renderDashboardFamilySales(payload) {
  const select = document.getElementById("dashboard-family-agrp");
  const originSelect = document.getElementById("dashboard-family-origin");
  const previous = select.value || "all";
  const previousOrigin = originSelect?.value || payload.selected_origin || "all";
  const families = payload.families || [];
  if (originSelect) {
    const origins = payload.origins || [
      { id: "all", name: "Todas as origens" },
      { id: "imported", name: "Importado" },
      { id: "fabricated_br", name: "Fabricados BR" },
    ];
    originSelect.innerHTML = origins
      .map((origin) => `<option value="${escapeHtml(origin.id)}">${escapeHtml(origin.name)}</option>`)
      .join("");
    originSelect.value = origins.some((origin) => origin.id === previousOrigin)
      ? previousOrigin
      : payload.selected_origin || "all";
  }
  select.innerHTML = '<option value="all">Todos os AGRP</option>' + families
    .map((family) => `<option value="${escapeHtml(family)}">${escapeHtml(family)}</option>`)
    .join("");
  select.value = families.includes(previous) ? previous : "all";
  document.getElementById("dashboard-family-title").textContent = `Faturamento por Familia - ${payload.empresa}`;
  const originLabel = originSelect?.selectedOptions?.[0]?.textContent || "Todas as origens";
  document.getElementById("dashboard-family-subtitle").textContent = `Origem: ${originLabel}. Faturamento liquido: ${payload.calculo_faturamento}.`;
  document.getElementById("dashboard-family-chart").innerHTML = dashboardFamilyBars(payload, select.value);
}

function dashboardAnnualBars(payload) {
  const selectedYear = String(payload.selected_year || "all");
  const years = payload.years || [];
  const series = payload.empresa_id === "agrupado" ? payload.companies : payload.companies;
  const isGroupedSelection = (payload.companies || []).length > 1;
  let bars = [];
  if (selectedYear === "all" && isGroupedSelection) {
    const grouped = payload.agrupado || { empresa: payload.empresa, faturamento_por_ano: {} };
    bars = years.map((year) => ({
      label: String(year),
      detail: payload.empresa,
      value: Number(grouped.faturamento_por_ano?.[String(year)] || 0),
    }));
  } else if (selectedYear === "all") {
    const company = series[0] || { empresa: payload.empresa, faturamento_por_ano: {} };
    bars = years.map((year) => ({
      label: String(year),
      detail: company.empresa,
      value: Number(company.faturamento_por_ano?.[String(year)] || 0),
    }));
  } else if (isGroupedSelection) {
    bars = [{
      label: payload.empresa,
      detail: selectedYear,
      value: Number(payload.agrupado?.faturamento_por_ano?.[selectedYear] || 0),
    }];
  } else {
    bars = series.map((company) => ({
      label: company.empresa,
      detail: selectedYear,
      value: Number(company.faturamento_por_ano?.[selectedYear] || 0),
    }));
  }
  const total = bars.reduce((sum, item) => sum + item.value, 0);
  document.getElementById("dashboard-annual-total").textContent = formatCurrency.format(total);
  return dashboardBarChart(bars, selectedYear === "all" && isGroupedSelection ? "yearly-grouped" : "");
}

function dashboardMonthlyEvolution(payload) {
  const selectedYear = String(payload.selected_year || "all");
  const years = selectedYear === "all" ? payload.years || [] : [Number(selectedYear)];
  const source = (payload.companies || []).length > 1 ? payload.agrupado : (payload.companies[0] || payload.agrupado);
  const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const blocks = years.map((year) => {
    const months = Array.from({ length: 12 }, (_, index) => ({
      label: monthNames[index],
      detail: String(year),
      value: Number(source.faturamento_por_mes?.[String(year)]?.[String(index + 1)] || 0),
    }));
    return {
      year,
      total: months.reduce((sum, item) => sum + item.value, 0),
      html: dashboardBarChart(months, "monthly"),
    };
  });
  const total = blocks.reduce((sum, item) => sum + item.total, 0);
  document.getElementById("dashboard-monthly-total").textContent = formatCurrency.format(total);
  return blocks.map((block) => `
    <article class="dashboard-monthly-block">
      <div class="sales-chart-title">
        <h5>${escapeHtml(source.empresa)} - ${block.year}</h5>
        <span>${formatCurrency.format(block.total)}</span>
      </div>
      ${block.html}
    </article>
  `).join("") || '<div class="table-status">Sem vendas para exibir.</div>';
}

function dashboardFamilyBars(payload, selectedFamily = "all") {
  const selectedYear = String(payload.selected_year || "all");
  const rows = payload.rows || [];
  const years = payload.years || [];
  let bars = [];

  if (selectedFamily === "all") {
    bars = rows.map((row) => ({
      label: row.agrp || "Sem AGRP",
      detail: selectedYear === "all" ? "Todos os anos" : selectedYear,
      value: selectedYear === "all"
        ? Number(row.total || 0)
        : Number(row.faturamento_por_ano?.[selectedYear] || 0),
    })).sort((a, b) => b.value - a.value);
  } else {
    const row = rows.find((item) => item.agrp === selectedFamily);
    if (row && selectedYear === "all") {
      bars = years.map((year) => ({
        label: String(year),
        detail: selectedFamily,
        value: Number(row.faturamento_por_ano?.[String(year)] || 0),
      }));
    } else if (row && payload.empresa_id === "agrupado") {
      bars = (row.empresas || []).map((company) => ({
        label: company.empresa,
        detail: selectedYear,
        value: Number(company.faturamento_por_ano?.[selectedYear] || 0),
      })).sort((a, b) => b.value - a.value);
    } else if (row) {
      bars = [{
        label: selectedFamily,
        detail: selectedYear,
        value: Number(row.faturamento_por_ano?.[selectedYear] || 0),
      }];
    }
  }

  const total = bars.reduce((sum, item) => sum + item.value, 0);
  document.getElementById("dashboard-family-total").textContent = formatCurrency.format(total);
  return dashboardBarChart(bars.slice(0, 30), "family");
}

function dashboardChartLabel(text, maxLength = 24) {
  const value = String(text || "").trim().replace(/^Equipamento\s*-\s*/i, "");
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, maxLength - 1).trim()}...`;
}

function dashboardBarChart(items, extraClass = "") {
  if (!items.length) {
    return '<div class="table-status">Sem vendas para exibir.</div>';
  }
  const maxValue = Math.max(1, ...items.map((item) => item.value));
  const step = dashboardAxisStep(maxValue);
  const scaleMax = Math.max(step, Math.ceil(maxValue / step) * step);
  const rulerValues = [];
  for (let value = scaleMax; value >= 0; value -= step) {
    rulerValues.push(value);
  }
  return `
    <div class="dashboard-bars ${extraClass}" style="--bar-count:${items.length};">
      <div class="dashboard-bar-ruler">
        ${rulerValues.map((value) => `<span style="--mark:${(value / scaleMax) * 100}%">${formatAxisCurrency(value)}</span>`).join("")}
      </div>
      <div class="dashboard-bars-plot">
        ${items.map((item, index) => {
          const barHeight = Math.max(0, (item.value / scaleMax) * 100);
          return `
          <div class="dashboard-bar-column" title="${escapeHtml(item.label)} ${escapeHtml(item.detail)}: ${formatCurrency.format(item.value)}">
            <div class="dashboard-bar-fill color-${index % 7} ${barHeight < 12 ? "tiny-bar" : ""}" style="--bar-height:${barHeight}%">
              ${item.value > 0 ? `<span>${formatCurrency.format(item.value)}</span>` : ""}
            </div>
            <strong>${escapeHtml(dashboardChartLabel(item.label))}</strong>
            <small>${escapeHtml(dashboardChartLabel(item.detail, 18))}</small>
          </div>
        `;
        }).join("")}
      </div>
    </div>
  `;
}

function dashboardAxisStep(maxValue) {
  const targetTicks = 6;
  const rawStep = Math.max(1, maxValue / targetTicks);
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const normalized = rawStep / magnitude;
  const niceMultiplier = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return niceMultiplier * magnitude;
}

function formatAxisCurrency(value) {
  if (value >= 1000000) {
    const millions = value / 1000000;
    return `R$ ${formatNumber.format(Number.isInteger(millions) ? millions : Number(millions.toFixed(1)))} mi`;
  }
  if (value >= 1000) {
    const thousands = value / 1000;
    return `R$ ${formatNumber.format(Number.isInteger(thousands) ? thousands : Number(thousands.toFixed(0)))} mil`;
  }
  return formatCurrency.format(value);
}

async function loadVendorRegionsChart() {
  setVendorRegionTarget("dashboard");
  const company = document.getElementById("dashboard-company").value || "ionlab";
  const vendorId = document.getElementById("dashboard-vendor-select").value;
  const { status, summary, sections } = vendorRegionElements();

  if (company === "agrupado" || company === "ionlab_cior") {
    summary.innerHTML = "";
    sections.innerHTML = "";
    status.textContent = "Selecione uma empresa individual para visualizar regioes por vendedor.";
    return;
  }

  if (!vendorId) {
    summary.innerHTML = "";
    sections.innerHTML = "";
    status.textContent = "Selecione um vendedor para visualizar as regiões atendidas.";
    return;
  }

  status.textContent = "Carregando regiões atendidas...";
  try {
    const payload = await fetchJson(`/api/vendor-regions-data?company=${encodeURIComponent(company)}&vendor_id=${encodeURIComponent(vendorId)}`);
    renderVendorRegions(payload);
    status.textContent = `${payload.empresa}: regiões calculadas para ${payload.vendedor.nome_completo}.`;
  } catch (error) {
    summary.innerHTML = "";
    sections.innerHTML = "";
    status.textContent = error.message;
  }
}

async function loadVendorPage() {
  const route = vendorPageRoute();
  if (!route) {
    return;
  }

  setVendorRegionTarget("vendor-page");
  const { status, summary, sections } = vendorRegionElements();
  setView("vendor-page");
  document.querySelector(".sidebar").style.display = "none";
  document.querySelector(".app-shell").classList.add("vendor-shell");
  document.getElementById("company-strip").innerHTML = "";
  summary.innerHTML = "";
  sections.innerHTML = "";
  status.textContent = "Carregando pagina individual do vendedor...";
  vendorRegionClientsLoaded = false;
  currentVendorClientStatus = "all";
  currentVendorClientFilters = { uf: "", ddd: "", city: "" };
  resetVendorRegionClientsPanel();
  setupVendorPageGoalsMonthSelect();
  setVendorWorkspaceSection("day");
  document.title = "CRM - Painel do vendedor";
  document.getElementById("vendor-page-title").textContent = "Painel individual";
  document.getElementById("vendor-page-company").textContent = route.company.toUpperCase();
  document.getElementById("vendor-page-subtitle").textContent =
    "Rotinas do vendedor carregadas sob demanda para manter o painel rapido.";
  status.textContent = "Abra Indicadores para carregar o painel analitico completo.";
}

async function loadVendorPageIndicators() {
  const route = vendorPageRoute();
  if (!route || currentVendorRegionPayload) {
    return;
  }
  setVendorRegionTarget("vendor-page");
  const { status, summary, sections } = vendorRegionElements();
  summary.innerHTML = "";
  sections.innerHTML = "";
  status.textContent = "Carregando indicadores do vendedor...";

  try {
    const payload = await fetchJson(`/api/vendor-page-data?company=${encodeURIComponent(route.company)}&vendor_id=${encodeURIComponent(route.vendorId)}`);
    document.title = `CRM - ${payload.vendedor.nome_completo || "Vendedor"}`;
    document.getElementById("vendor-page-title").textContent = payload.vendedor.nome_completo || "Painel do vendedor";
    document.getElementById("vendor-page-company").textContent = payload.empresa;
    document.getElementById("vendor-page-subtitle").textContent =
      "Indicadores exclusivos das regioes, DDDs e cidades definidos para este vendedor.";
    renderVendorRegions(payload);
    status.textContent = `${payload.empresa}: painel individual atualizado para ${payload.vendedor.nome_completo}.`;
  } catch (error) {
    summary.innerHTML = "";
    sections.innerHTML = "";
    status.textContent = error.message;
  }
}

function setVendorWorkspaceSection(section) {
  currentVendorWorkspace = section;
  if (section !== "sent-quotes") {
    moveQuoteEditorHome();
  }
  document.querySelectorAll("[data-vendor-workspace]").forEach((button) => {
    button.classList.toggle("active", button.dataset.vendorWorkspace === section);
  });
  document.querySelectorAll(".vendor-workspace-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `vendor-workspace-${section}`);
  });
  if (section === "clients") {
    loadVendorRegionClients(false);
  }
  if (section === "indicators") {
    loadVendorPageIndicators();
    loadVendorDailyContactsChart();
  }
  if (section === "agenda") {
    loadVendorAgenda();
  }
  if (section === "contact-report") {
    loadVendorContactReport();
  }
  if (section === "goals") {
    if (currentVendorPageGoalsPayload) {
      renderVendorPageGoals();
    } else {
      loadVendorPageGoals();
    }
  }
  if (section === "quick-consult") {
    setTimeout(() => document.getElementById("quick-consult-search")?.focus(), 50);
  }
  if (section === "quotes") {
    if (!loadingSavedCommercialDocument) {
      resetQuoteEditor();
      loadQuoteWorkspace();
    }
    document.getElementById("vendor-workspace-quotes")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (section === "sent-quotes") {
    moveQuoteEditorHome();
    const status = document.getElementById("sent-quote-status");
    if (status) {
      status.textContent = "Busque um orcamento ou pedido salvo para abrir na tela de edicao.";
    }
  }
  if (section === "day") {
    if (!currentVendorDayByDayPayload) {
      loadVendorDayByDay();
    } else {
      renderVendorDayByDay();
    }
  }
}

function moveQuoteEditorHome() {
  const anchor = document.getElementById("quote-panel-anchor");
  const panel = document.getElementById("vendor-workspace-quotes");
  if (!anchor || !panel) {
    return;
  }
  if (panel.previousElementSibling !== anchor) {
    anchor.after(panel);
  }
  panel.classList.remove("sent-commercial-editor");
  const title = document.getElementById("quote-workspace-title");
  const subtitle = document.getElementById("quote-workspace-subtitle");
  if (title) title.textContent = "Orçamentos/Pedidos";
  if (subtitle) subtitle.textContent = "Monte o orçamento, confira disponibilidade e gere o PDF para envio ao cliente.";
}

function moveQuoteEditorToSent() {
  const sentPanel = document.getElementById("vendor-workspace-sent-quotes");
  const quotePanel = document.getElementById("vendor-workspace-quotes");
  if (!sentPanel || !quotePanel) {
    return;
  }
  sentPanel.appendChild(quotePanel);
  quotePanel.classList.add("active", "sent-commercial-editor");
  const title = document.getElementById("quote-workspace-title");
  const subtitle = document.getElementById("quote-workspace-subtitle");
  if (title) title.textContent = "Orçamentos/Pedidos Enviados";
  if (subtitle) subtitle.textContent = "Revise orçamentos e pedidos salvos, converta em pedido ou gere o PDF atualizado.";
}

function renderSimpleVendorTable(payload, headId, bodyId, emptyText) {
  const head = document.getElementById(headId);
  const body = document.getElementById(bodyId);
  if (!head || !body) {
    return;
  }
  const columns = payload.columns || [];
  head.innerHTML = `<tr>${columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}</tr>`;
  body.innerHTML = (payload.rows || []).map((row) => `
    <tr>
      ${columns.map((column) => `<td>${escapeHtml(formatCell(row[column.key]))}</td>`).join("")}
    </tr>
  `).join("") || `<tr><td colspan="${Math.max(1, columns.length)}">${escapeHtml(emptyText)}</td></tr>`;
}

async function loadQuoteWorkspace() {
  const route = vendorPageRoute();
  const status = document.getElementById("quote-status");
  if (!route || !status) {
    return;
  }
  status.textContent = "Carregando ambiente de orcamentos...";
  try {
    currentQuoteContext = await fetchJson(`/api/quotes/context?company=${encodeURIComponent(route.company)}&vendor_id=${encodeURIComponent(route.vendorId)}&_=${Date.now()}`);
    document.getElementById("quote-number").textContent = currentQuoteContext.proximo_orcamento || "";
    renderQuoteItems();
    status.textContent = "Ambiente de orcamentos pronto.";
  } catch (error) {
    status.textContent = error.message;
  }
}

function clearQuoteSuggestions(type) {
  const map = {
    client: "quote-client-suggestions",
    product: "quote-product-suggestions",
    quote: "quote-saved-suggestions",
    order: "order-saved-suggestions",
  };
  const suggestions = document.getElementById(map[type] || "quote-product-suggestions");
  if (suggestions) {
    suggestions.innerHTML = "";
    suggestions.classList.remove("visible");
  }
}

function selectQuoteClient(client) {
  currentQuoteClient = client;
  document.getElementById("quote-client-search").value = client.codigo || "";
  document.getElementById("quote-client-name").value = client.nome || "";
  document.getElementById("quote-client-phone").value = client.telefone || "";
  document.getElementById("quote-client-whatsapp").value = client.whatsapp || "";
  document.getElementById("quote-client-email").value = client.email || "";
  document.getElementById("quote-client-buyer").value = client.comprador || "";
  clearQuoteSuggestions("client");
}

async function searchQuoteClients() {
  const route = vendorPageRoute();
  const input = document.getElementById("quote-client-search");
  const suggestions = document.getElementById("quote-client-suggestions");
  if (!route || !input || !suggestions) {
    return;
  }
  const query = input.value.trim();
  currentQuoteClient = null;
  if (query.length < 2) {
    clearQuoteSuggestions("client");
    return;
  }
  suggestions.innerHTML = '<div class="table-status">Buscando clientes...</div>';
  suggestions.classList.add("visible");
  try {
    const payload = await fetchJson(`/api/quotes/client-search?company=${encodeURIComponent(route.company)}&q=${encodeURIComponent(query)}&_=${Date.now()}`);
    suggestions.innerHTML = (payload.clients || []).map((client, index) => `
      <button class="prospect-suggestion" type="button" data-index="${index}">
        <strong>${escapeHtml(client.codigo)} - ${escapeHtml(client.nome)}</strong>
        <span>${escapeHtml(client.documento || "")} ${escapeHtml(client.cidade || "")} ${escapeHtml(client.uf || "")}</span>
      </button>
    `).join("") || '<div class="table-status">Nenhum cliente encontrado.</div>';
    suggestions.classList.add("visible");
    suggestions.querySelectorAll(".prospect-suggestion").forEach((button) => {
      button.addEventListener("click", () => selectQuoteClient(payload.clients[Number(button.dataset.index)]));
    });
  } catch (error) {
    suggestions.innerHTML = `<div class="table-status">${escapeHtml(error.message)}</div>`;
  }
}

function scheduleQuoteClientSearch() {
  clearTimeout(quoteClientTimer);
  quoteClientTimer = setTimeout(searchQuoteClients, 250);
}

function loadCommercialDocument(commercialDocument, mode = "quote", fromSent = false) {
  currentQuoteMode = mode;
  currentQuoteLoadedFromSent = fromSent;
  currentLoadedQuote = mode === "quote" ? commercialDocument : null;
  currentLoadedOrder = mode === "order" ? commercialDocument : null;
  const client = commercialDocument.cliente || {};
  currentQuoteClient = {
    codigo: client.codigo || "",
    nome: client.nome || "",
    documento: client.documento || "",
    telefone: client.telefone || "",
    whatsapp: client.whatsapp || "",
    email: client.email || "",
    comprador: client.comprador || "",
    cidade: client.cidade || "",
    uf: client.uf || "",
  };
  selectQuoteClient(currentQuoteClient);
  document.getElementById("quote-description-type").value = commercialDocument.tipo_descricao || "resumida";
  document.getElementById("quote-number").textContent = commercialDocument.numero || "";
  currentQuoteItems = (commercialDocument.itens || []).map((item) => ({ ...item }));
  renderQuoteItems();
  document.getElementById("quote-close").classList.toggle("hidden", mode === "order");
  document.getElementById("quote-convert-order").classList.toggle("hidden", !(mode === "quote" && fromSent));
  document.getElementById("order-save").classList.toggle("hidden", mode !== "order");
  document.getElementById("quote-status").textContent = mode === "order"
    ? `Pedido ${commercialDocument.numero} carregado para edicao.`
    : `Orcamento ${commercialDocument.numero} carregado para edicao.`;
}

function resetQuoteEditor() {
  currentQuoteMode = "quote";
  currentQuoteLoadedFromSent = false;
  currentLoadedQuote = null;
  currentLoadedOrder = null;
  currentQuoteClient = null;
  currentQuoteProduct = null;
  currentQuoteItems = [];
  ["quote-client-search", "quote-client-name", "quote-client-phone", "quote-client-whatsapp", "quote-client-email", "quote-client-buyer", "quote-product-search"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.value = "";
  });
  document.getElementById("quote-product-quantity").value = "1";
  document.getElementById("quote-product-discount").value = "0";
  document.getElementById("quote-description-type").value = "resumida";
  document.getElementById("quote-close").classList.remove("hidden");
  document.getElementById("quote-convert-order").classList.add("hidden");
  document.getElementById("order-save").classList.add("hidden");
  document.getElementById("quote-pdf-link").classList.add("hidden");
  renderQuoteItems();
}

function openSavedCommercialDocument(row, kind, input = null) {
  if (!row || !row.documento) {
    return;
  }
  if (input) {
    input.value = row.numero || "";
  }
  clearQuoteSuggestions(kind);
  loadingSavedCommercialDocument = true;
  setVendorWorkspaceSection("sent-quotes");
  loadCommercialDocument(row.documento, kind, true);
  moveQuoteEditorToSent();
  loadingSavedCommercialDocument = false;
  const status = document.getElementById("sent-quote-status");
  if (status) {
    status.textContent = kind === "order"
      ? `Pedido ${row.numero || ""} aberto para edicao.`
      : `Orcamento ${row.numero || ""} aberto para edicao.`;
  }
}

async function searchSavedCommercialDocuments(kind) {
  const route = vendorPageRoute();
  const input = document.getElementById(kind === "order" ? "order-saved-search" : "quote-saved-search");
  const suggestions = document.getElementById(kind === "order" ? "order-saved-suggestions" : "quote-saved-suggestions");
  if (!route || !input || !suggestions) {
    return;
  }
  const query = input.value.trim();
  if (query.length < 2) {
    clearQuoteSuggestions(kind);
    return;
  }
  suggestions.innerHTML = '<div class="table-status">Buscando registros...</div>';
  suggestions.classList.add("visible");
  const url = kind === "order" ? "/api/orders/search" : "/api/quotes/search";
  try {
    const payload = await fetchJson(`${url}?company=${encodeURIComponent(route.company)}&vendor_id=${encodeURIComponent(route.vendorId)}&q=${encodeURIComponent(query)}&_=${Date.now()}`);
    suggestions.innerHTML = (payload.rows || []).map((row, index) => `
      <button class="prospect-suggestion" type="button" data-index="${index}">
        <strong>${escapeHtml(row.numero)} - ${escapeHtml(row.cliente || "")}</strong>
        <span>${escapeHtml(row.cliente_documento || "")} | ${escapeHtml(formatCurrency2.format(row.total || 0))}</span>
      </button>
    `).join("") || '<div class="table-status">Nenhum registro encontrado.</div>';
    suggestions.querySelectorAll(".prospect-suggestion").forEach((button) => {
      button.addEventListener("click", () => {
        const row = payload.rows[Number(button.dataset.index)];
        openSavedCommercialDocument(row, kind, input);
      });
    });
    const exact = (payload.rows || []).find((row) => normalizeTextClient(row.numero) === normalizeTextClient(query));
    if (exact) {
      openSavedCommercialDocument(exact, kind, input);
    }
  } catch (error) {
    suggestions.innerHTML = `<div class="table-status">${escapeHtml(error.message)}</div>`;
  }
}

async function openSavedCommercialDocumentFromSearch(kind) {
  const route = vendorPageRoute();
  const input = document.getElementById(kind === "order" ? "order-saved-search" : "quote-saved-search");
  const status = document.getElementById("sent-quote-status");
  if (!route || !input) {
    return;
  }
  const query = input.value.trim();
  if (query.length < 2) {
    if (status) status.textContent = "Digite o numero, cliente ou CNPJ para abrir.";
    return;
  }
  if (status) status.textContent = "Abrindo registro salvo...";
  const url = kind === "order" ? "/api/orders/search" : "/api/quotes/search";
  try {
    const payload = await fetchJson(`${url}?company=${encodeURIComponent(route.company)}&vendor_id=${encodeURIComponent(route.vendorId)}&q=${encodeURIComponent(query)}&_=${Date.now()}`);
    const rows = payload.rows || [];
    const row = rows.find((item) => normalizeTextClient(item.numero) === normalizeTextClient(query)) || (rows.length === 1 ? rows[0] : null);
    if (!row) {
      if (status) status.textContent = "Encontrei mais de um registro. Clique na opcao correta da lista para abrir.";
      await searchSavedCommercialDocuments(kind);
      return;
    }
    openSavedCommercialDocument(row, kind, input);
  } catch (error) {
    if (status) status.textContent = error.message;
  }
}

function scheduleSavedQuoteSearch() {
  clearTimeout(quoteSavedTimer);
  quoteSavedTimer = setTimeout(() => searchSavedCommercialDocuments("quote"), 250);
}

function scheduleSavedOrderSearch() {
  clearTimeout(orderSavedTimer);
  orderSavedTimer = setTimeout(() => searchSavedCommercialDocuments("order"), 250);
}

function selectQuoteProduct(product) {
  currentQuoteProduct = product;
  document.getElementById("quote-product-search").value = product.referencia || "";
  const alert = document.getElementById("quote-product-alert");
  if (!product.preco_encontrado) {
    alert.textContent = product.mensagem || "Item nao cadastrado na tabela de precos";
    alert.classList.add("visible");
  } else {
    alert.textContent = "";
    alert.classList.remove("visible");
  }
  clearQuoteSuggestions("product");
}

async function searchQuoteProducts() {
  const route = vendorPageRoute();
  const input = document.getElementById("quote-product-search");
  const suggestions = document.getElementById("quote-product-suggestions");
  if (!route || !input || !suggestions) {
    return;
  }
  const query = input.value.trim();
  currentQuoteProduct = null;
  document.getElementById("quote-product-alert").textContent = "";
  document.getElementById("quote-product-alert").classList.remove("visible");
  if (query.length < 2) {
    clearQuoteSuggestions("product");
    return;
  }
  suggestions.innerHTML = '<div class="table-status">Buscando itens...</div>';
  suggestions.classList.add("visible");
  try {
    const payload = await fetchJson(`/api/quotes/product-search?company=${encodeURIComponent(route.company)}&q=${encodeURIComponent(query)}&_=${Date.now()}`);
    suggestions.innerHTML = (payload.rows || []).map((item, index) => `
      <button class="prospect-suggestion ${item.preco_encontrado ? "" : "quote-missing-price"}" type="button" data-index="${index}">
        <strong>${escapeHtml(item.referencia)} - ${escapeHtml(item.descricao_resumida)}</strong>
        <span>${item.preco_encontrado ? escapeHtml(formatCurrency2.format(item.valor_unitario || 0)) : "Item nao cadastrado na tabela de precos"}</span>
      </button>
    `).join("") || '<div class="table-status">Nenhum item encontrado.</div>';
    suggestions.querySelectorAll(".prospect-suggestion").forEach((button) => {
      button.addEventListener("click", () => selectQuoteProduct(payload.rows[Number(button.dataset.index)]));
    });
  } catch (error) {
    suggestions.innerHTML = `<div class="table-status">${escapeHtml(error.message)}</div>`;
  }
}

function scheduleQuoteProductSearch() {
  clearTimeout(quoteProductTimer);
  quoteProductTimer = setTimeout(searchQuoteProducts, 120);
}

function clearQuickConsultSuggestions() {
  const suggestions = document.getElementById("quick-consult-suggestions");
  if (suggestions) {
    suggestions.innerHTML = "";
    suggestions.classList.remove("visible");
  }
}

function renderQuickConsultProduct(product) {
  const panel = document.getElementById("quick-consult-result");
  if (!panel) {
    return;
  }
  if (!product) {
    panel.innerHTML = '<div class="table-status">Selecione um item para ver a consulta.</div>';
    return;
  }
  const priceText = product.preco_encontrado && product.valor_unitario !== null && product.valor_unitario !== undefined
    ? formatCurrency2.format(product.valor_unitario || 0)
    : "Nao cadastrado na tabela de precos";
  const unitPrice = Number(product.valor_unitario || 0);
  const ipiPercent = Number(product.aliquota_ipi || 0);
  const priceWithIpi = product.preco_encontrado
    ? formatCurrency2.format(unitPrice * (1 + ipiPercent / 100))
    : "Nao disponivel";
  const transit = product.previsoes_importacao && product.previsoes_importacao.length
    ? product.previsoes_importacao.map((item) => `<li>${escapeHtml(item)}</li>`).join("")
    : "<li>Sem previsao cadastrada.</li>";
  panel.innerHTML = `
    <div class="quick-consult-card">
      <div>
        <p class="eyebrow">Produto</p>
        <h3>${escapeHtml(product.referencia || "")}</h3>
        <p class="muted">${escapeHtml(product.descricao_resumida || "")}</p>
      </div>
      <div class="quick-consult-metrics">
        <article>
          <span>Valor Unitario</span>
          <strong class="${product.preco_encontrado ? "" : "text-danger"}">${escapeHtml(priceText)}</strong>
        </article>
        <article>
          <span>Aliquota do IPI</span>
          <strong>${formatPercent2.format(product.aliquota_ipi || 0)}%</strong>
        </article>
        <article class="quick-consult-highlight">
          <span>Valor com IPI</span>
          <strong>${escapeHtml(priceWithIpi)}</strong>
        </article>
        <article>
          <span>Saldo do Estoque</span>
          <strong>${formatNumber.format(product.saldo_estoque || 0)}</strong>
        </article>
      </div>
      <div class="quick-consult-transit">
        <strong>Previsao de Importacao</strong>
        <ul>${transit}</ul>
      </div>
    </div>
  `;
}

function selectQuickConsultProduct(product) {
  currentQuickConsultProduct = product;
  document.getElementById("quick-consult-search").value = product.referencia || "";
  clearQuickConsultSuggestions();
  renderQuickConsultProduct(product);
}

async function searchQuickConsultProducts() {
  const route = vendorPageRoute();
  const input = document.getElementById("quick-consult-search");
  const suggestions = document.getElementById("quick-consult-suggestions");
  if (!route || !input || !suggestions) {
    return;
  }
  const query = input.value.trim();
  currentQuickConsultProduct = null;
  if (query.length < 2) {
    clearQuickConsultSuggestions();
    renderQuickConsultProduct(null);
    return;
  }
  suggestions.innerHTML = '<div class="table-status">Buscando itens...</div>';
  suggestions.classList.add("visible");
  try {
    const payload = await fetchJson(`/api/quick-consult/products?company=${encodeURIComponent(route.company)}&q=${encodeURIComponent(query)}&_=${Date.now()}`);
    suggestions.innerHTML = (payload.rows || []).map((item, index) => `
      <button class="prospect-suggestion ${item.preco_encontrado ? "" : "quote-missing-price"}" type="button" data-index="${index}">
        <strong>${escapeHtml(item.referencia)} - ${escapeHtml(item.descricao_resumida || "")}</strong>
        <span>${item.preco_encontrado ? escapeHtml(formatCurrency2.format(item.valor_unitario || 0)) : "Sem preco"} | Estoque ${escapeHtml(formatNumber.format(item.saldo_estoque || 0))}</span>
      </button>
    `).join("") || '<div class="table-status">Nenhum item encontrado.</div>';
    suggestions.querySelectorAll(".prospect-suggestion").forEach((button) => {
      button.addEventListener("click", () => selectQuickConsultProduct(payload.rows[Number(button.dataset.index)]));
    });
  } catch (error) {
    suggestions.innerHTML = `<div class="table-status">${escapeHtml(error.message)}</div>`;
  }
}

function scheduleQuickConsultSearch() {
  clearTimeout(quickConsultTimer);
  quickConsultTimer = setTimeout(searchQuickConsultProducts, 120);
}

function openQuickConsultShortcut() {
  const vendorView = document.getElementById("vendor-page-view");
  if (!vendorView || !vendorView.classList.contains("visible")) {
    return;
  }
  setVendorWorkspaceSection("quick-consult");
  setTimeout(() => document.getElementById("quick-consult-search")?.focus(), 50);
}

async function addQuoteItem() {
  const route = vendorPageRoute();
  const status = document.getElementById("quote-status");
  const alert = document.getElementById("quote-product-alert");
  const reference = (currentQuoteProduct?.referencia || document.getElementById("quote-product-search").value || "").trim();
  const quantity = Number(document.getElementById("quote-product-quantity").value || 0);
  const discount = Number(document.getElementById("quote-product-discount").value || 0);
  if (!route || !reference || quantity <= 0) {
    alert.textContent = "Informe a referencia e a quantidade.";
    alert.classList.add("visible");
    return;
  }
  try {
    const item = await fetchJson(`/api/quotes/item-preview?company=${encodeURIComponent(route.company)}&reference=${encodeURIComponent(reference)}&quantity=${encodeURIComponent(quantity)}&discount=${encodeURIComponent(discount)}&_=${Date.now()}`);
    currentQuoteItems.push(item);
    document.getElementById("quote-product-search").value = "";
    document.getElementById("quote-product-quantity").value = "1";
    document.getElementById("quote-product-discount").value = "0";
    currentQuoteProduct = null;
    alert.textContent = "";
    alert.classList.remove("visible");
    renderQuoteItems();
    status.textContent = "Item adicionado ao orcamento.";
  } catch (error) {
    alert.textContent = error.message;
    alert.classList.add("visible");
  }
}

function removeQuoteItem(index) {
  currentQuoteItems.splice(index, 1);
  renderQuoteItems();
}

async function refreshQuoteItem(index) {
  const route = vendorPageRoute();
  const item = currentQuoteItems[index];
  if (!route || !item) {
    return;
  }
  const status = document.getElementById("quote-status");
  try {
    const updated = await fetchJson(`/api/quotes/item-preview?company=${encodeURIComponent(route.company)}&reference=${encodeURIComponent(item.referencia)}&quantity=${encodeURIComponent(item.quantidade)}&discount=${encodeURIComponent(item.desconto || 0)}&_=${Date.now()}`);
    currentQuoteItems[index] = updated;
    renderQuoteItems();
  } catch (error) {
    status.textContent = error.message;
    renderQuoteItems();
  }
}

function updateQuoteItemField(index, field, value) {
  const item = currentQuoteItems[index];
  if (!item) {
    return;
  }
  item[field] = Number(value || 0);
  refreshQuoteItem(index);
}

function renderQuoteItems() {
  const body = document.getElementById("quote-items-body");
  if (!body) {
    return;
  }
  if (!currentQuoteItems.length) {
    body.innerHTML = `<tr class="quote-empty-row"><td colspan="13">Nenhum item adicionado. Busque um produto acima para iniciar o documento.</td></tr>`;
  } else {
    body.innerHTML = currentQuoteItems.map((item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${escapeHtml(item.referencia)}</td>
        <td>${escapeHtml(item.descricao_resumida || "")}</td>
        <td>${escapeHtml(item.descricao_detalhada || "")}</td>
        <td>${escapeHtml(item.marca || "")}</td>
        <td><input class="quote-line-input" type="number" min="0" step="0.001" value="${escapeHtml(item.quantidade || 0)}" data-quote-field="quantidade" data-index="${index}"></td>
        <td>${formatCurrency2.format(item.valor_unitario || 0)}</td>
        <td><input class="quote-line-input" type="number" min="0" step="0.01" max="${escapeHtml(item.desconto_maximo || 0)}" value="${escapeHtml(item.desconto || 0)}" data-quote-field="desconto" data-index="${index}"><small>Max ${formatPercent2.format(item.desconto_maximo || 0)}%</small></td>
        <td>${formatPercent2.format(item.aliq_ipi || 0)}%</td>
        <td>${formatCurrency2.format(item.valor_ipi || 0)}</td>
        <td><strong>${formatCurrency2.format(item.total_item || 0)}</strong></td>
        <td>${escapeHtml(item.disponibilidade || "")}</td>
        <td><button class="mini-action danger quote-remove-button" type="button" data-quote-remove="${index}">Remover</button></td>
      </tr>
    `).join("");
    body.querySelectorAll("[data-quote-remove]").forEach((button) => {
      button.addEventListener("click", () => removeQuoteItem(Number(button.dataset.quoteRemove)));
    });
    body.querySelectorAll("[data-quote-field]").forEach((input) => {
      input.addEventListener("change", () => updateQuoteItemField(Number(input.dataset.index), input.dataset.quoteField, input.value));
    });
  }
  const totalIpi = currentQuoteItems.reduce((sum, item) => sum + ((Number(item.valor_ipi) || 0) * (Number(item.quantidade) || 0)), 0);
  const totalBudget = currentQuoteItems.reduce((sum, item) => sum + (Number(item.total_item) || 0), 0);
  const totalItems = totalBudget - totalIpi;
  document.getElementById("quote-total-items").textContent = formatCurrency2.format(totalItems);
  document.getElementById("quote-total-ipi").textContent = formatCurrency2.format(totalIpi);
  document.getElementById("quote-total-budget").textContent = formatCurrency2.format(totalBudget);
}

function quoteClientPayload() {
  return {
    codigo: currentQuoteClient?.codigo || document.getElementById("quote-client-search").value.trim(),
    nome: document.getElementById("quote-client-name").value.trim(),
    telefone: document.getElementById("quote-client-phone").value.trim(),
    whatsapp: document.getElementById("quote-client-whatsapp").value.trim(),
    email: document.getElementById("quote-client-email").value.trim(),
    comprador: document.getElementById("quote-client-buyer").value.trim(),
    documento: currentQuoteClient?.documento || "",
    cidade: currentQuoteClient?.cidade || "",
    uf: currentQuoteClient?.uf || "",
  };
}

function askQuoteDescriptionType() {
  const detailed = window.confirm("Deseja gerar o PDF com DESCRICAO DETALHADA?\n\nOK = Detalhada\nCancelar = Resumida");
  const type = detailed ? "detalhada" : "resumida";
  document.getElementById("quote-description-type").value = type;
  return type;
}

async function closeQuote() {
  const route = vendorPageRoute();
  const status = document.getElementById("quote-status");
  const link = document.getElementById("quote-pdf-link");
  if (!route) {
    return;
  }
  const client = quoteClientPayload();
  if (!client.codigo || !client.nome) {
    status.textContent = "Selecione o cliente antes de encerrar o orcamento.";
    return;
  }
  if (!client.telefone || !client.whatsapp || !client.email || !client.comprador) {
    status.textContent = "Preencha telefone, WhatsApp, email e nome do comprador.";
    return;
  }
  if (!currentQuoteItems.length) {
    status.textContent = "Inclua ao menos um item no orcamento.";
    return;
  }
  status.textContent = "Salvando orcamento e gerando PDF...";
  link.classList.add("hidden");
  const descriptionType = askQuoteDescriptionType();
  try {
    const quote = await fetchJson("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: currentLoadedQuote?.id || "",
        company: route.company,
        vendor_id: route.vendorId,
        tipo_descricao: descriptionType,
        cliente: client,
        itens: currentQuoteItems.map((item) => ({
          referencia: item.referencia,
          quantidade: item.quantidade,
          desconto: item.desconto || 0,
        })),
      }),
    });
    document.getElementById("quote-number").textContent = quote.numero;
    link.href = `/api/quotes/pdf?company=${encodeURIComponent(route.company)}&id=${encodeURIComponent(quote.id)}&_=${Date.now()}`;
    link.classList.remove("hidden");
    clearVendorWorkspaceCache();
    status.textContent = `Orcamento ${quote.numero} gerado com sucesso. Use o botao Baixar PDF para enviar ao cliente.`;
    if (currentQuoteLoadedFromSent) {
      loadCommercialDocument(quote, "quote", true);
    } else {
      resetQuoteEditor();
      document.getElementById("quote-number").textContent = quote.numero;
      link.href = `/api/quotes/pdf?company=${encodeURIComponent(route.company)}&id=${encodeURIComponent(quote.id)}&_=${Date.now()}`;
      link.classList.remove("hidden");
      status.textContent = `Orcamento ${quote.numero} gerado com sucesso. Tela pronta para novo orcamento.`;
      currentQuoteContext = null;
      await loadQuoteWorkspace();
      status.textContent = `Orcamento ${quote.numero} gerado com sucesso. Clique em Enviar orçamento por e-mail para enviar ao cliente.`;
    }
  } catch (error) {
    status.textContent = error.message;
  }
}

async function convertQuoteToOrder() {
  const route = vendorPageRoute();
  const status = document.getElementById("quote-status");
  if (!route) {
    return;
  }
  if (!currentLoadedQuote || !currentQuoteLoadedFromSent) {
    status.textContent = "A conversao em pedido deve ser feita em Orcamentos/Pedidos Enviados.";
    return;
  }
  status.textContent = "Convertendo orcamento em pedido...";
  try {
    const order = await fetchJson("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company: route.company,
        vendor_id: route.vendorId,
        quote_id: currentLoadedQuote.id,
        numero: currentLoadedQuote.numero,
        orcamento_origem: currentLoadedQuote.numero,
        tipo_descricao: document.getElementById("quote-description-type").value,
        cliente: quoteClientPayload(),
        itens: currentQuoteItems.map((item) => ({
          referencia: item.referencia,
          quantidade: item.quantidade,
          desconto: item.desconto || 0,
        })),
      }),
    });
    loadCommercialDocument(order, "order");
    const link = document.getElementById("quote-pdf-link");
    link.href = `/api/orders/pdf?company=${encodeURIComponent(route.company)}&id=${encodeURIComponent(order.id)}&_=${Date.now()}`;
    link.classList.remove("hidden");
    clearVendorWorkspaceCache();
    status.textContent = `Pedido ${order.numero} salvo com sucesso.`;
  } catch (error) {
    status.textContent = error.message;
  }
}

async function saveOrder() {
  const route = vendorPageRoute();
  const status = document.getElementById("quote-status");
  if (!route || !currentLoadedOrder) {
    status.textContent = "Busque e selecione um pedido salvo antes de salvar alteracoes.";
    return;
  }
  status.textContent = "Salvando revisao do pedido...";
  try {
    const order = await fetchJson("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: currentLoadedOrder.id,
        company: route.company,
        vendor_id: route.vendorId,
        numero: currentLoadedOrder.numero,
        tipo_descricao: document.getElementById("quote-description-type").value,
        cliente: quoteClientPayload(),
        itens: currentQuoteItems.map((item) => ({
          referencia: item.referencia,
          quantidade: item.quantidade,
          desconto: item.desconto || 0,
        })),
      }),
    });
    loadCommercialDocument(order, "order");
    const link = document.getElementById("quote-pdf-link");
    link.href = `/api/orders/pdf?company=${encodeURIComponent(route.company)}&id=${encodeURIComponent(order.id)}&_=${Date.now()}`;
    link.classList.remove("hidden");
    clearVendorWorkspaceCache();
    status.textContent = `Pedido ${order.numero} salvo com sucesso.`;
  } catch (error) {
    status.textContent = error.message;
  }
}

async function loadVendorAgenda(force = false) {
  const route = vendorPageRoute();
  const status = document.getElementById("vendor-agenda-status");
  if (!route || !status) {
    return;
  }
  if (currentVendorAgendaPayload && !force) {
    renderSimpleVendorTable(currentVendorAgendaPayload, "vendor-agenda-head", "vendor-agenda-body", "Nenhum contato agendado.");
    status.textContent = `${currentVendorAgendaPayload.empresa}: ${formatNumber.format(currentVendorAgendaPayload.total || 0)} agendamento(s) encontrado(s).`;
    return;
  }
  status.textContent = "Carregando agenda...";
  try {
    const payload = await fetchJson(`/api/vendor-day-by-day/agenda?company=${encodeURIComponent(route.company)}&vendor_id=${encodeURIComponent(route.vendorId)}`, { force });
    currentVendorAgendaPayload = payload;
    renderSimpleVendorTable(payload, "vendor-agenda-head", "vendor-agenda-body", "Nenhum contato agendado.");
    status.textContent = `${payload.empresa}: ${formatNumber.format(payload.total || 0)} agendamento(s) encontrado(s).`;
  } catch (error) {
    status.textContent = error.message;
  }
}

async function loadVendorContactReport(force = false) {
  const route = vendorPageRoute();
  const status = document.getElementById("vendor-contact-report-status");
  if (!route || !status) {
    return;
  }
  const params = new URLSearchParams({
    company: route.company,
    vendor_id: route.vendorId,
    start_date: document.getElementById("vendor-contact-report-start")?.value || "",
    end_date: document.getElementById("vendor-contact-report-end")?.value || "",
    q: document.getElementById("vendor-contact-report-client")?.value || "",
  });
  const cacheKey = params.toString();
  if (currentVendorContactReportPayload?.cacheKey === cacheKey && !force) {
    const cached = currentVendorContactReportPayload.payload;
    renderSimpleVendorTable(cached, "vendor-contact-report-head", "vendor-contact-report-body", "Nenhum contato encontrado.");
    status.textContent = `${cached.empresa}: ${formatNumber.format(cached.total || 0)} contato(s) encontrado(s).`;
    return;
  }
  status.textContent = "Carregando relatorio...";
  try {
    const payload = await fetchJson(`/api/vendor-day-by-day/report?${cacheKey}`, { force });
    currentVendorContactReportPayload = { cacheKey, payload };
    renderSimpleVendorTable(payload, "vendor-contact-report-head", "vendor-contact-report-body", "Nenhum contato encontrado.");
    status.textContent = `${payload.empresa}: ${formatNumber.format(payload.total || 0)} contato(s) encontrado(s).`;
  } catch (error) {
    status.textContent = error.message;
  }
}

async function loadVendorDayByDay() {
  const route = vendorPageRoute();
  if (!route) {
    return;
  }
  const status = document.getElementById("vendor-daybyday-status");
  const summary = document.getElementById("vendor-daybyday-summary");
  const content = document.getElementById("vendor-daybyday-content");
  if (!status || !summary || !content) {
    return;
  }
  status.textContent = "Carregando rotina diária...";
  summary.innerHTML = "";
  content.innerHTML = "";
  try {
    const payload = await fetchJson(`/api/vendor-day-by-day?company=${encodeURIComponent(route.company)}&vendor_id=${encodeURIComponent(route.vendorId)}`);
    currentVendorDayByDayPayload = payload;
    currentVendorDayByDayClient = null;
    renderVendorDayByDay();
    status.textContent = payload.aviso_gravacao
      ? payload.aviso_gravacao
      : `${payload.empresa}: lista diária de ${payload.data_label} carregada.`;
  } catch (error) {
    currentVendorDayByDayPayload = null;
    status.textContent = error.message;
  }
}

function renderVendorDayByDay() {
  const payload = currentVendorDayByDayPayload;
  const summary = document.getElementById("vendor-daybyday-summary");
  const content = document.getElementById("vendor-daybyday-content");
  if (!payload || !summary || !content) {
    return;
  }
  if (payload.dia_util === false) {
    summary.innerHTML = `
      <article class="daybyday-progress-card">
        <span>Rotina diária</span>
        <strong>Sem Day by Day hoje</strong>
        <small>${escapeHtml(payload.mensagem || "O Day by Day considera somente dias úteis.")}</small>
      </article>
      <article><span>Data</span><strong>${escapeHtml(payload.data_label || "")}</strong></article>
      <article><span>Próximo dia útil</span><strong>${escapeHtml(payload.proximo_dia_util_label || "")}</strong></article>
    `;
    content.innerHTML = `
      <section class="daybyday-list-card">
        <div class="empty-state">
          ${escapeHtml(payload.mensagem || "O Day by Day considera somente dias úteis, de segunda-feira a sexta-feira.")}
        </div>
      </section>
    `;
    return;
  }
  const savedContacts = Number(payload.contagem?.salvos || 0);
  const dailyGoal = Number(payload.contagem?.meta_diaria || 50);
  const missingContacts = Number(payload.contagem?.faltam || 0);
  const progressPercent = dailyGoal > 0 ? Math.min(100, Math.round((savedContacts / dailyGoal) * 100)) : 0;
  const eligibleWallet = (payload.resumo?.candidatos_inativos || 0) + (payload.resumo?.candidatos_nunca_comprou || 0);
  const recontactWallet = payload.resumo?.candidatos_ja_contatados || 0;
  summary.innerHTML = `
    <article class="daybyday-progress-card">
      <span>Progresso da rotina</span>
      <strong>${formatNumber.format(savedContacts)} / ${formatNumber.format(dailyGoal)}</strong>
      <div class="daybyday-progress"><i style="width: ${progressPercent}%"></i></div>
      <small>${missingContacts > 0 ? `${formatNumber.format(missingContacts)} contato(s) restantes` : "Meta concluída"}</small>
    </article>
    <article><span>Data</span><strong>${escapeHtml(payload.data_label || "")}</strong></article>
    <article><span>Clientes do dia</span><strong>${formatNumber.format(payload.resumo?.total || 0)}</strong></article>
    <article><span>Inativos</span><strong>${formatNumber.format(payload.resumo?.inativos || 0)}</strong></article>
    <article><span>Nunca comprou</span><strong>${formatNumber.format(payload.resumo?.nunca_comprou || 0)}</strong></article>
    <article><span>Já contatados</span><strong>${formatNumber.format(payload.resumo?.ja_contatados || 0)}</strong></article>
    <article><span>Carteira elegível</span><strong>${formatNumber.format(eligibleWallet)}</strong></article>
    <article><span>Base de retorno</span><strong>${formatNumber.format(recontactWallet)}</strong></article>
    <article><span>UFs</span><strong>${escapeHtml((payload.resumo?.ufs_consideradas || []).join(", ") || "Sem UF")}</strong></article>
  `;
  content.innerHTML = `
    <div class="daybyday-lists">
      ${renderVendorDayByDayList("Clientes Inativos", payload.inativos || [], "inactive")}
      ${renderVendorDayByDayList("Nunca Comprou", payload.nunca_comprou || [], "never")}
      ${(payload.recontatos || []).length ? renderVendorDayByDayList("Clientes já contatados", payload.recontatos || [], "recontact") : ""}
    </div>
    ${payload.contagem?.faltam === 0 ? renderVendorDayByDayPreviousContacts(payload.contatos_anteriores || []) : ""}
  `;
  content.querySelectorAll("[data-daybyday-client]").forEach((button) => {
    button.addEventListener("click", () => openVendorDayByDayClient(button.dataset.daybydayClient));
  });
  content.querySelectorAll("[data-daybyday-year]").forEach((button) => {
    button.addEventListener("click", () => toggleVendorDayByDayPurchases(button.dataset.daybydayClientYear, button.dataset.daybydayYear));
  });
}

function renderVendorDayByDayPreviousContacts(rows) {
  return `
    <section class="daybyday-list-card">
      <div class="daybyday-list-head">
        <div>
          <p class="eyebrow">Historico</p>
          <h4>Clientes contatados anteriormente</h4>
        </div>
        <strong>${formatNumber.format(rows.length)}</strong>
      </div>
      <div class="daybyday-client-list">
        ${rows.map((row) => `
          <article class="daybyday-client-card saved">
            <span class="client-code">${escapeHtml(row.cliente_codigo || row.client_id || "")}</span>
            <strong>${escapeHtml(row.cliente_nome || "")}</strong>
            <span>Ultimo contato: ${escapeHtml(row.data_label || "")} | ${escapeHtml(row.status || "")}</span>
            <span>${escapeHtml(row.resumo || "")}</span>
            <span>Probabilidade: ${escapeHtml(row.probabilidade_compra_futura || "")} | Agenda: ${escapeHtml(row.data_agendamento_contato || "Sem agenda")}</span>
          </article>
        `).join("") || '<div class="empty-state">Nenhum contato anterior encontrado.</div>'}
      </div>
    </section>
  `;
}

function renderVendorDayByDayList(title, rows, statusKey) {
  const quota = statusKey === "inactive" ? 35 : (statusKey === "never" ? 15 : 50);
  const plannedLabel = statusKey === "recontact" ? "retornos em ordem antiga" : "contatos planejados";
  return `
    <section class="daybyday-list-card">
      <div class="daybyday-list-head">
        <div>
          <p class="eyebrow">${formatNumber.format(quota)} ${plannedLabel}</p>
          <h4>${escapeHtml(title)}</h4>
          <span>${formatNumber.format(rows.length)} cliente(s) disponíveis nesta fila</span>
        </div>
        <strong>${formatNumber.format(rows.length)}</strong>
      </div>
      <div class="daybyday-client-list">
        ${rows.map((client) => `
          <article class="daybyday-client-card ${client.atendimento_salvo ? "saved" : ""}">
            <div class="daybyday-client-main">
              <span class="client-code">${escapeHtml(client.codigo || client.id || "")}</span>
              <strong>${escapeHtml(client.nome || "")}</strong>
              <span>CNPJ: ${escapeHtml(client.documento || "Não informado")}</span>
              <span>${escapeHtml([client.cidade, client.uf].filter(Boolean).join(" - ") || "Localidade não informada")}</span>
            </div>
            <div class="daybyday-client-meta">
              <span>DDD ${escapeHtml(client.ddd || "Não informado")}</span>
              <span>Última compra: ${escapeHtml(client.ultima_compra || "")}</span>
              ${statusKey === "recontact" ? `<span>Contato mais antigo: ${escapeHtml(client.primeiro_contato_label || client.primeiro_contato || "")}</span>` : ""}
            </div>
            ${statusKey === "recontact" && client.resumo_contato ? `<span>${escapeHtml(client.resumo_contato)}</span>` : ""}
            ${renderVendorDayByDayYearCounts(client)}
            <div class="daybyday-card-actions">
              <button class="mini-action" type="button" data-daybyday-client="${escapeHtml(client.id)}">${client.atendimento_salvo ? "Editar ficha" : "Abrir ficha"}</button>
            </div>
            ${Object.keys(client.compras_por_ano || {}).sort().map((year) => `
              <div class="daybyday-purchases-panel" data-daybyday-purchases-panel="${escapeHtml(client.id)}|${escapeHtml(year)}">
                ${renderVendorDayByDayPurchases(client.compras_ano_detalhe?.[year] || [], year)}
              </div>
            `).join("")}
          </article>
        `).join("") || '<div class="empty-state">Nenhum cliente encontrado nessa categoria.</div>'}
      </div>
    </section>
  `;
}

function renderVendorDayByDayYearCounts(client) {
  const counts = client.compras_por_ano || {};
  const years = Object.keys(counts || {}).sort();
  if (!years.length) {
    return "";
  }
  return `
    <div class="daybyday-year-counts">
      ${years.map((year) => `
        <button type="button" data-daybyday-client-year="${escapeHtml(client.id)}" data-daybyday-year="${escapeHtml(year)}">
          <small>${escapeHtml(year)}</small>
          <strong>${formatNumber.format(Number(counts[year] || 0))}</strong>
        </button>
      `).join("")}
    </div>
  `;
}

function renderVendorDayByDayPurchases(purchases, year) {
  if (!purchases.length) {
    return `<div class="empty-state">Nenhuma compra encontrada em ${escapeHtml(year || "")}.</div>`;
  }
  return `
    <h5>Compras de ${escapeHtml(year || "")}</h5>
    <table>
      <thead>
        <tr>
          <th>Data</th>
          <th>NF</th>
          <th>Itens</th>
          <th>Faturamento líquido</th>
        </tr>
      </thead>
      <tbody>
        ${purchases.map((purchase) => `
          <tr>
            <td>${escapeHtml(purchase.data || "")}</td>
            <td>${escapeHtml(purchase.nf_num || "")}</td>
            <td>${formatNumber.format(Number(purchase.itens || 0))}</td>
            <td>${formatCurrency.format(Number(purchase.faturamento_liquido || 0))}</td>
          </tr>
          <tr class="daybyday-items-row">
            <td colspan="4">
              ${renderVendorDayByDayPurchaseItems(purchase.itens_detalhe || [])}
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderVendorDayByDayPurchaseItems(items) {
  if (!items.length) {
    return '<span class="muted">Sem itens detalhados nessa nota.</span>';
  }
  return `
    <div class="daybyday-items-list">
      ${items.map((item) => `
        <div>
          <strong>${escapeHtml(item.referencia || "")}</strong>
          <span>${escapeHtml(item.descricao || "")}</span>
          <em>Qtd ${formatNumber.format(Number(item.quantidade || 0))} | ${formatCurrency.format(Number(item.faturamento_liquido || 0))}</em>
        </div>
      `).join("")}
    </div>
  `;
}

function toggleVendorDayByDayPurchases(clientId, year) {
  const targetKey = `${clientId}|${year}`;
  document.querySelectorAll("[data-daybyday-purchases-panel]").forEach((panel) => {
    const active = panel.dataset.daybydayPurchasesPanel === targetKey && !panel.classList.contains("active");
    panel.classList.toggle("active", active);
  });
}

async function openVendorDayByDayClient(clientId) {
  const route = vendorPageRoute();
  const payload = currentVendorDayByDayPayload;
  if (!route || !payload || !clientId) {
    return;
  }
  const status = document.getElementById("vendor-daybyday-status");
  status.textContent = "Abrindo ficha do cliente...";
  try {
    const params = new URLSearchParams({
      company: route.company,
      vendor_id: route.vendorId,
      client_id: clientId,
      date: payload.data,
    });
    currentVendorDayByDayClient = await fetchJson(`/api/vendor-day-by-day/client?${params.toString()}`);
    renderVendorDayByDayClientForm();
    status.textContent = "Ficha pronta para preenchimento.";
  } catch (error) {
    status.textContent = error.message;
  }
}

function yesNoSelect(name, value = "") {
  return `
    <select name="${escapeHtml(name)}">
      <option value="">Selecione</option>
      <option value="Sim" ${value === "Sim" ? "selected" : ""}>Sim</option>
      <option value="Não" ${value === "Não" ? "selected" : ""}>Não</option>
    </select>
  `;
}

function noPurchaseReasonSelect(value = "") {
  const options = [
    "Falta de demanda",
    "Teve problema com SAC",
    "Tem melhor preço com outro fornecedor",
    "O valor de frete inviabiliza a compra",
    "Sem motivo",
  ];
  return `
    <select name="motivo_sem_compra">
      <option value="">Selecione</option>
      ${options.map((option) => `<option value="${escapeHtml(option)}" ${value === option ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}
    </select>
  `;
}

function futurePurchaseProbabilitySelect(value = "") {
  const labels = { 0: "0 - Sem chance", 10: "10 - Grande chance" };
  return `
    <select name="probabilidade_compra_futura">
      <option value="">Selecione</option>
      ${Array.from({ length: 11 }, (_, index) => `<option value="${index}" ${String(value) === String(index) ? "selected" : ""}>${escapeHtml(labels[index] || String(index))}</option>`).join("")}
    </select>
  `;
}

function dayByDayIsYes(value) {
  return normalizeTextClient(value) === "SIM";
}

function dayByDayIsNo(value) {
  return normalizeTextClient(value) === "NAO";
}

function renderVendorDayByDayHistory(history) {
  if (!history.length) {
    return '<div class="empty-state">Nenhum contato anterior salvo para este cliente.</div>';
  }
  return `
    <h5>Contatos Anteriores</h5>
    ${history.map((item) => `
      <article class="daybyday-history-item">
        <strong>${escapeHtml(item.data_label || item.data || "")} - ${escapeHtml(item.status || "")}</strong>
        <p>${escapeHtml(item.resumo || "Sem resumo informado.")}</p>
        <small>Probabilidade: ${escapeHtml(item.probabilidade_compra_futura || "")} | Agenda: ${escapeHtml(item.data_agendamento_contato || "Sem agenda")}</small>
      </article>
    `).join("")}
  `;
}

function dayByDayContactRow(contact = {}) {
  return `
    <div class="daybyday-extra-contact-row">
      <label>Nome do contato <input type="text" data-extra-contact-field="nome" value="${escapeHtml(contact.nome || "")}" placeholder="Nome do contato"></label>
      <label>Telefone com DDD <input type="text" data-extra-contact-field="telefone_ddd" value="${escapeHtml(contact.telefone_ddd || "")}" placeholder="(00) 0000-0000"></label>
      <label>WhatsApp <input type="text" data-extra-contact-field="whatsapp" value="${escapeHtml(contact.whatsapp || "")}" placeholder="(00) 00000-0000"></label>
      <label>E-mails de contato <input type="text" data-extra-contact-field="emails_contato" value="${escapeHtml(contact.emails_contato || "")}" placeholder="email@cliente.com.br"></label>
      <button class="mini-action danger" type="button" data-remove-extra-contact>Remover</button>
    </div>
  `;
}

function setupDayByDayExtraContacts(contacts = []) {
  const list = document.getElementById("daybyday-extra-contacts-list");
  const addButton = document.getElementById("daybyday-add-contact");
  if (!list || !addButton) {
    return;
  }
  const renderRows = (items) => {
    list.innerHTML = (items || []).map(dayByDayContactRow).join("") || '<div class="empty-state compact">Nenhum contato adicional cadastrado.</div>';
    list.querySelectorAll("[data-remove-extra-contact]").forEach((button) => {
      button.addEventListener("click", () => {
        button.closest(".daybyday-extra-contact-row")?.remove();
        if (!list.querySelector(".daybyday-extra-contact-row")) {
          list.innerHTML = '<div class="empty-state compact">Nenhum contato adicional cadastrado.</div>';
        }
      });
    });
  };
  addButton.addEventListener("click", () => {
    list.querySelector(".empty-state")?.remove();
    list.insertAdjacentHTML("beforeend", dayByDayContactRow());
    list.querySelectorAll("[data-remove-extra-contact]").forEach((button) => {
      button.onclick = () => {
        button.closest(".daybyday-extra-contact-row")?.remove();
        if (!list.querySelector(".daybyday-extra-contact-row")) {
          list.innerHTML = '<div class="empty-state compact">Nenhum contato adicional cadastrado.</div>';
        }
      };
    });
  });
  renderRows(contacts);
}

function collectDayByDayExtraContacts(formElement) {
  return Array.from(formElement.querySelectorAll(".daybyday-extra-contact-row")).map((row) => {
    const contact = {};
    row.querySelectorAll("[data-extra-contact-field]").forEach((input) => {
      contact[input.dataset.extraContactField] = input.value.trim();
    });
    return contact;
  }).filter((contact) => Object.values(contact).some(Boolean));
}

function renderVendorDayByDayClientForm() {
  const detail = currentVendorDayByDayClient;
  const content = document.getElementById("vendor-daybyday-content");
  if (!detail || !content) {
    return;
  }
  const client = detail.cliente || {};
  const form = detail.form || {};
  const selectedAgrps = new Set(form.interesse_agrp || []);
  const isInactiveClient = detail.status_key === "inactive";
  content.innerHTML = `
    <section class="daybyday-detail">
      <div class="daybyday-detail-head">
        <button class="secondary" type="button" id="daybyday-back-list">Voltar para lista</button>
        <div>
          <p class="eyebrow">${escapeHtml(client.status || "")}</p>
          <h4>${escapeHtml(client.nome || "")}</h4>
          <span>${escapeHtml(client.codigo || "")} | CNPJ: ${escapeHtml(client.documento || "Não informado")} | ${escapeHtml([client.cidade, client.uf].filter(Boolean).join(" - "))} | Última compra: ${escapeHtml(client.ultima_compra || "")}</span>
          <button class="mini-action" type="button" id="daybyday-history-button">Contatos Anteriores</button>
        </div>
      </div>
      <div class="daybyday-purchases-panel" id="daybyday-history-panel">
        ${renderVendorDayByDayHistory(detail.historico || [])}
      </div>
      <form class="daybyday-form" id="daybyday-client-form">
        <label>Cliente Revenda ${yesNoSelect("cliente_revenda", form.cliente_revenda || "")}</label>
        <div class="daybyday-main-fields" id="daybyday-main-fields">
        <label>Cliente ainda em operação ${yesNoSelect("cliente_ainda_operacao", form.cliente_ainda_operacao || "")}</label>
        <div class="daybyday-closed-fields" id="daybyday-closed-fields">
          <label>Empresa baixada no CNPJ ${yesNoSelect("empresa_baixada_cnpj", form.empresa_baixada_cnpj || "")}</label>
          <label>Cliente mudou ramo de atividade ${yesNoSelect("cliente_mudou_ramo", form.cliente_mudou_ramo || "")}</label>
          <label class="full">Observações <textarea name="observacoes" rows="4">${escapeHtml(form.observacoes || "")}</textarea></label>
        </div>
        <label>Nome do Contato <input name="nome_contato" value="${escapeHtml(form.nome_contato || "")}" placeholder="Nome do contato"></label>
        <label>Telefone com DDD <input name="telefone_ddd" value="${escapeHtml(form.telefone_ddd || client.telefone || "")}" placeholder="(00) 0000-0000"></label>
        <label>WhatsApp <input name="whatsapp" value="${escapeHtml(form.whatsapp || "")}" placeholder="(00) 00000-0000"></label>
        <label>E-mails de contato <input name="emails_contato" value="${escapeHtml(form.emails_contato || client.email || "")}" placeholder="email@cliente.com.br"></label>
        <section class="daybyday-extra-contacts full">
          <div class="daybyday-extra-contacts-head">
            <div>
              <strong>Contatos adicionais</strong>
              <span>Cadastre quantos contatos forem necessários para este cliente.</span>
            </div>
            <button class="secondary" type="button" id="daybyday-add-contact">Adicionar novo contato</button>
          </div>
          <div class="daybyday-extra-contacts-list" id="daybyday-extra-contacts-list"></div>
        </section>
        <label>Cliente vende apenas em Licitação ${yesNoSelect("vende_licitacao", form.vende_licitacao || "")}</label>
        ${isInactiveClient ? `<label>Motivo de nao ter mais compra ${noPurchaseReasonSelect(form.motivo_sem_compra || "")}</label>` : ""}
        <label>Cliente tem ecommerce ${yesNoSelect("tem_ecommerce", form.tem_ecommerce || "")}</label>
        <label>Cliente tem site ${yesNoSelect("tem_site", form.tem_site || "")}</label>
        <label>Cliente tem nossos produtos no site ou ecommerce ${yesNoSelect("produtos_site_ecommerce", form.produtos_site_ecommerce || "")}</label>
        <label>Cliente relatou algum problema ocorrido antes ${yesNoSelect("relatou_problema_antes", form.relatou_problema_antes || "")}</label>
        <label class="full daybyday-problem-field" id="daybyday-problem-field">Descritivo resumido do problema relatado
          <textarea name="descritivo_problema_relatado" rows="3">${escapeHtml(form.descritivo_problema_relatado || "")}</textarea>
        </label>
        <label>Cliente pertence a um grupo Econômico ${yesNoSelect("pertence_grupo_economico", form.pertence_grupo_economico || "")}</label>
        <label class="daybyday-group-client-field" id="daybyday-group-client-field">Código do Cliente Matriz do grupo
          <input id="daybyday-group-client-search" type="search" value="${escapeHtml(form.cliente_matriz_grupo_id ? `${form.cliente_matriz_grupo_id} - ${form.cliente_matriz_grupo_nome || ""}` : "")}" placeholder="Digite código ou nome do cliente matriz">
          <input name="cliente_matriz_grupo_id" id="daybyday-group-client-id" type="hidden" value="${escapeHtml(form.cliente_matriz_grupo_id || "")}">
          <input name="cliente_matriz_grupo_nome" id="daybyday-group-client-name" type="hidden" value="${escapeHtml(form.cliente_matriz_grupo_nome || "")}">
          <div class="prospect-suggestions" id="daybyday-group-client-suggestions"></div>
        </label>
        <label class="full">Cliente relatou interesse em algum produto
          <div class="agrp-multi-list">
            ${(detail.agrp_options || []).map((agrp) => `
              <label><input type="checkbox" name="interesse_agrp" value="${escapeHtml(agrp)}" ${selectedAgrps.has(agrp) ? "checked" : ""}> ${escapeHtml(agrp)}</label>
            `).join("") || '<span class="muted">Nenhum AGRP cadastrado.</span>'}
          </div>
        </label>
        <label>Probabilidade de Compra Futura ${futurePurchaseProbabilitySelect(form.probabilidade_compra_futura || "")}</label>
        <label>Quer agendar uma data para entrar em contato? ${yesNoSelect("quer_agendar_contato", form.quer_agendar_contato || "")}</label>
        <label class="daybyday-schedule-field" id="daybyday-schedule-date-field">Data do novo contato
          <input name="data_agendamento_contato" value="${escapeHtml(form.data_agendamento_contato || "")}" placeholder="dd/mm/aaaa">
        </label>
        <label class="full daybyday-schedule-field" id="daybyday-schedule-notes-field">O que sera tratado no novo contato
          <textarea name="descritivo_novo_contato" rows="3">${escapeHtml(form.descritivo_novo_contato || "")}</textarea>
        </label>
        </div>
        <div class="daybyday-actions">
          <button class="primary" type="submit">Salvar atendimento</button>
          <button class="secondary" type="button" id="daybyday-cancel-form">Cancelar</button>
        </div>
      </form>
    </section>
  `;
  const resellerSelect = content.querySelector('[name="cliente_revenda"]');
  const operationSelect = content.querySelector('[name="cliente_ainda_operacao"]');
  const problemSelect = content.querySelector('[name="relatou_problema_antes"]');
  const groupSelect = content.querySelector('[name="pertence_grupo_economico"]');
  const scheduleSelect = content.querySelector('[name="quer_agendar_contato"]');
  const syncResellerFields = () => {
    const mainFields = content.querySelector("#daybyday-main-fields");
    mainFields.classList.toggle("hidden", dayByDayIsNo(resellerSelect.value));
  };
  const syncClosedFields = () => {
    content.querySelector("#daybyday-closed-fields").classList.toggle("active", dayByDayIsNo(operationSelect.value));
  };
  const syncProblemFields = () => {
    content.querySelector("#daybyday-problem-field").classList.toggle("active", dayByDayIsYes(problemSelect.value));
  };
  const syncGroupFields = () => {
    const groupField = content.querySelector("#daybyday-group-client-field");
    const active = dayByDayIsYes(groupSelect.value);
    groupField.classList.toggle("active", active);
    if (!active) {
      content.querySelector("#daybyday-group-client-search").value = "";
      content.querySelector("#daybyday-group-client-id").value = "";
      content.querySelector("#daybyday-group-client-name").value = "";
      content.querySelector("#daybyday-group-client-suggestions").classList.remove("visible");
    }
  };
  const syncScheduleFields = () => {
    const active = dayByDayIsYes(scheduleSelect.value);
    content.querySelector("#daybyday-schedule-date-field").classList.toggle("active", active);
    content.querySelector("#daybyday-schedule-notes-field").classList.toggle("active", active);
  };
  resellerSelect.addEventListener("change", syncResellerFields);
  operationSelect.addEventListener("change", syncClosedFields);
  problemSelect.addEventListener("change", syncProblemFields);
  groupSelect.addEventListener("change", syncGroupFields);
  scheduleSelect.addEventListener("change", syncScheduleFields);
  content.querySelector("#daybyday-group-client-search").addEventListener("input", scheduleDayByDayGroupClientSearch);
  content.querySelector("#daybyday-history-button").addEventListener("click", () => {
    content.querySelector("#daybyday-history-panel").classList.toggle("active");
  });
  syncResellerFields();
  syncClosedFields();
  syncProblemFields();
  syncGroupFields();
  syncScheduleFields();
  setupDayByDayExtraContacts(form.contatos_adicionais || []);
  content.querySelector("#daybyday-back-list").addEventListener("click", renderVendorDayByDay);
  content.querySelector("#daybyday-cancel-form").addEventListener("click", renderVendorDayByDay);
  content.querySelector("#daybyday-client-form").addEventListener("submit", saveVendorDayByDayClient);
}

async function searchDayByDayGroupClients() {
  const route = vendorPageRoute();
  const input = document.getElementById("daybyday-group-client-search");
  const suggestions = document.getElementById("daybyday-group-client-suggestions");
  if (!route || !input || !suggestions) {
    return;
  }
  document.getElementById("daybyday-group-client-id").value = "";
  document.getElementById("daybyday-group-client-name").value = "";
  const query = input.value.trim();
  if (query.length < 2) {
    suggestions.classList.remove("visible");
    suggestions.innerHTML = "";
    return;
  }
  try {
    const payload = await fetchJson(`/api/vendors/client-search?company=${encodeURIComponent(route.company)}&q=${encodeURIComponent(query)}`);
    const clients = payload.clients || [];
    suggestions.innerHTML = clients.map((client) => `
      <button class="prospect-suggestion" type="button"
        data-client-id="${escapeHtml(client.id)}"
        data-client-name="${escapeHtml(client.name)}"
        data-client-label="${escapeHtml(client.label || `${client.id} - ${client.name}`)}">
        <strong>${escapeHtml(client.label || `${client.id} - ${client.name}`)}</strong>
        <span>${escapeHtml(client.city || "")} ${escapeHtml(client.uf || "")}${client.ddd ? ` - DDD ${escapeHtml(client.ddd)}` : ""}</span>
      </button>
    `).join("");
    suggestions.classList.toggle("visible", clients.length > 0);
    suggestions.querySelectorAll(".prospect-suggestion").forEach((button) => {
      button.addEventListener("click", () => {
        input.value = button.dataset.clientLabel;
        document.getElementById("daybyday-group-client-id").value = button.dataset.clientId;
        document.getElementById("daybyday-group-client-name").value = button.dataset.clientName;
        suggestions.classList.remove("visible");
      });
    });
  } catch (error) {
    suggestions.innerHTML = `<div class="table-status">${escapeHtml(error.message)}</div>`;
    suggestions.classList.add("visible");
  }
}

function scheduleDayByDayGroupClientSearch() {
  clearTimeout(dayByDayGroupClientSearchTimer);
  dayByDayGroupClientSearchTimer = setTimeout(searchDayByDayGroupClients, 220);
}

function validateVendorDayByDayForm(formElement) {
  const status = document.getElementById("vendor-daybyday-status");
  formElement.querySelectorAll(".daybyday-field-error").forEach((item) => {
    item.classList.remove("daybyday-field-error");
  });
  const missing = [];
  const markMissing = (name, label) => {
    const field = formElement.querySelector(`[name="${name}"]`);
    if (!field || String(field.value || "").trim()) {
      return;
    }
    missing.push(label);
    (field.closest("label") || field).classList.add("daybyday-field-error");
  };

  markMissing("cliente_revenda", "Cliente Revenda");
  const resellerValue = formElement.querySelector('[name="cliente_revenda"]')?.value || "";
  if (dayByDayIsNo(resellerValue)) {
    return true;
  }
  markMissing("cliente_ainda_operacao", "Cliente ainda em operação");
  const operationValue = formElement.querySelector('[name="cliente_ainda_operacao"]')?.value || "";
  if (dayByDayIsNo(operationValue)) {
    markMissing("empresa_baixada_cnpj", "Empresa baixada no CNPJ");
    markMissing("cliente_mudou_ramo", "Cliente mudou ramo de atividade");
    markMissing("observacoes", "Observações");
  }
  if (currentVendorDayByDayClient?.status_key === "inactive") {
    markMissing("motivo_sem_compra", "Motivo de nao ter mais compra");
  }
  [
    ["nome_contato", "Nome do Contato"],
    ["telefone_ddd", "Telefone com DDD"],
    ["whatsapp", "WhatsApp"],
    ["emails_contato", "E-mails de contato"],
    ["vende_licitacao", "Cliente vende apenas em Licitação"],
    ["tem_ecommerce", "Cliente tem ecommerce"],
    ["tem_site", "Cliente tem site"],
    ["produtos_site_ecommerce", "Cliente tem nossos produtos no site ou ecommerce"],
    ["relatou_problema_antes", "Cliente relatou algum problema ocorrido antes"],
    ["pertence_grupo_economico", "Cliente pertence a um grupo Econômico"],
  ].forEach(([name, label]) => markMissing(name, label));

  const problemValue = formElement.querySelector('[name="relatou_problema_antes"]')?.value || "";
  if (dayByDayIsYes(problemValue)) {
    markMissing("descritivo_problema_relatado", "Descritivo resumido do problema relatado");
  }

  const groupValue = formElement.querySelector('[name="pertence_grupo_economico"]')?.value || "";
  if (dayByDayIsYes(groupValue)) {
    const matrixId = formElement.querySelector('[name="cliente_matriz_grupo_id"]');
    if (!String(matrixId?.value || "").trim()) {
      missing.push("Código do Cliente Matriz do grupo");
      formElement.querySelector("#daybyday-group-client-field")?.classList.add("daybyday-field-error");
    }
  }

  const agrpList = formElement.querySelector(".agrp-multi-list");
  if (!formElement.querySelector('[name="interesse_agrp"]:checked')) {
    missing.push("Cliente relatou interesse em algum produto");
    agrpList?.classList.add("daybyday-field-error");
  }
  markMissing("probabilidade_compra_futura", "Probabilidade de Compra Futura");
  markMissing("quer_agendar_contato", "Quer agendar uma data para entrar em contato?");
  const scheduleValue = formElement.querySelector('[name="quer_agendar_contato"]')?.value || "";
  if (dayByDayIsYes(scheduleValue)) {
    markMissing("data_agendamento_contato", "Data do novo contato");
    markMissing("descritivo_novo_contato", "O que sera tratado no novo contato");
  }

  if (missing.length) {
    status.textContent = `Preencha todos os campos obrigatórios antes de salvar. Faltando: ${missing.join(", ")}.`;
    const firstError = formElement.querySelector(".daybyday-field-error");
    firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
    return false;
  }
  return true;
}

async function saveVendorDayByDayClient(event) {
  event.preventDefault();
  const route = vendorPageRoute();
  const detail = currentVendorDayByDayClient;
  const payload = currentVendorDayByDayPayload;
  const status = document.getElementById("vendor-daybyday-status");
  if (!route || !detail || !payload) {
    return;
  }
  const formElement = event.currentTarget;
  if (!validateVendorDayByDayForm(formElement)) {
    return;
  }
  const formData = new FormData(formElement);
  const form = Object.fromEntries(formData.entries());
  form.interesse_agrp = formData.getAll("interesse_agrp");
  form.contatos_adicionais = collectDayByDayExtraContacts(formElement);
  status.textContent = "Salvando atendimento...";
  try {
    const saved = await fetchJson("/api/vendor-day-by-day/client", {
      method: "POST",
      body: JSON.stringify({
        company: route.company,
        vendor_id: route.vendorId,
        client_id: detail.cliente?.id,
        date: payload.data,
        form,
      }),
    });
    currentVendorDayByDayClient = saved;
    currentVendorDayByDayPayload = null;
    clearVendorWorkspaceCache();
    await loadVendorDayByDay();
    status.textContent = `${saved.message || "Atendimento salvo."} Contagem do dia: ${formatNumber.format(saved.contagem?.salvos || 0)} de ${formatNumber.format(saved.contagem?.meta_diaria || 50)}.`;
  } catch (error) {
    status.textContent = error.message;
  }
}

function setupVendorPageGoalsMonthSelect() {
  const select = document.getElementById("vendor-page-goals-month");
  if (!select) {
    return;
  }
  select.innerHTML = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    return `<option value="${month}">${monthLabel(month)}</option>`;
  }).join("");
  select.value = String(new Date().getMonth() + 1);
}

async function loadVendorPageGoals() {
  const route = vendorPageRoute();
  if (!route) {
    return;
  }
  const status = document.getElementById("vendor-page-goals-status");
  const summary = document.getElementById("vendor-page-goals-summary");
  const list = document.getElementById("vendor-page-goals-list");
  status.textContent = "Carregando metas e objetivos...";
  try {
    const payload = await fetchJson(`/api/vendor-goals?company=${encodeURIComponent(route.company)}&vendor_id=${encodeURIComponent(route.vendorId)}&year=${new Date().getFullYear()}`);
    currentVendorPageGoalsPayload = payload;
    renderVendorPageGoals();
    status.textContent = `${payload.empresa}: metas carregadas para ${payload.vendedor?.nome_completo || "vendedor"}.`;
  } catch (error) {
    currentVendorPageGoalsPayload = null;
    summary.innerHTML = "";
    list.innerHTML = "";
    status.textContent = error.message;
  }
}

function renderVendorPageGoals() {
  const payload = currentVendorPageGoalsPayload;
  if (!payload) {
    return;
  }
  const selectedMonth = document.getElementById("vendor-page-goals-month")?.value || String(new Date().getMonth() + 1);
  const monthData = payload.goals.months?.[selectedMonth] || {};
  const objectives = payload.objectives || [];
  const summary = document.getElementById("vendor-page-goals-summary");
  const list = document.getElementById("vendor-page-goals-list");
  const base = payload.sales_base || {};
  const commissionPercent = Number(payload.goals.comissao_percentual || 0);
  const netSalesGoal = Number(monthData.objetivos?.vendas_liquidas?.meta || 0);
  const netSalesRegion = Number(monthData.objetivos?.vendas_liquidas?.valor_atingido || 0);
  const netSalesOtherRegions = Number(monthData.objetivos?.vendas_liquidas?.valor_atingido_outras_regioes || 0);
  const netSalesAchieved = Number(monthData.objetivos?.vendas_liquidas?.valor_atingido_total || (netSalesRegion + netSalesOtherRegions));
  const netSalesPercent = netSalesGoal > 0 ? (netSalesAchieved / netSalesGoal) * 100 : 0;
  const commissionEnabled = netSalesPercent >= 30;
  const formatGoalValue = (objective, value, field = "meta") => {
    if (objective.key === "novos_clientes" && field === "meta") {
      return formatCurrency.format(value || 0);
    }
    if (objective.key === "sem_giro" && field === "meta") {
      return `${formatNumber.format(value || 0)}%`;
    }
    if (objective.key === "sem_giro" && field === "achieved") {
      return formatCurrency.format(value || 0);
    }
    if (objective.kind === "currency") {
      return formatCurrency.format(value || 0);
    }
    if (objective.kind === "percent") {
      return `${formatNumber.format(value || 0)}%`;
    }
    return formatNumber.format(Math.round(value || 0));
  };
  const goalHelpTexts = {
    vendas_liquidas: "Vendas liquidas da regiao/carteira do vendedor. A linha de subtotal soma tambem vendas feitas pelo vendedor para clientes de outras regioes, identificadas pelo vendedor informado na nota fiscal.",
    reativacao_inativos: "Conta clientes que ja compraram no passado, ficaram mais de 180 dias sem compra e voltaram a comprar no mes selecionado. Clientes novos ou que nunca compraram nao entram.",
    clientes_com_vendas: "Conta quantos clientes diferentes da carteira do vendedor compraram no mes selecionado. Nao conta quantidade de notas; clientes do mesmo grupo economico devem contar como uma unidade.",
    contatos_inativos_nunca: "Meta manual de contatos diarios com clientes inativos ou que nunca compraram. O valor atingido sera integrado quando a rotina de contatos for cadastrada.",
    novos_clientes: "Conta novos clientes que fizeram compra no mes e nao faziam parte da base antes. Clientes de grupo economico que ja compra nao devem ser considerados novos.",
    sem_giro: "Soma o valor liquido vendido no mes de itens/equipamentos sem giro, ou seja, itens cuja ultima venda anterior foi ha mais de 12 meses.",
  };
  const goalNameWithHelp = (objective) => {
    const help = goalHelpTexts[objective.key] || "Meta configurada pelo supervisor. O valor atingido segue a regra operacional definida para este objetivo.";
    return `
      <div class="goal-name-with-help">
        <strong>${escapeHtml(objective.label)}</strong>
        <span class="goal-help-icon" title="${escapeHtml(help)}" tabindex="0" aria-label="${escapeHtml(help)}">?</span>
      </div>
    `;
  };
  summary.innerHTML = `
    <article><span>Mes selecionado</span><strong>${monthLabel(selectedMonth)} / ${payload.year}</strong></article>
    <article><span>% Comissao</span><strong>${formatNumber.format(payload.goals.comissao_percentual || 0)}%</strong></article>
    <article><span>Meta vendas sugerida</span><strong>${formatCurrency.format(monthData.meta_vendas_liquidas_sugerida || 0)}</strong></article>
    <article><span>Base: media dos 3 maiores meses dos 2 anos fechados</span><strong>${formatCurrency.format(base.media_base || 0)}</strong></article>
    <article><span>Gatilho de comissao</span><strong>${commissionEnabled ? "Liberado" : `Bloqueado (${formatNumber.format(netSalesPercent)}%)`}</strong></article>
  `;
  const standardGoalRow = (objective, item) => {
    const percent = Number(item.percentual_atingido || 0);
    const maxCommission = vendorGoalMaxCommission(commissionPercent, objective, item);
    const effectiveCommissionPercent = maxCommission * Math.min(100, Math.max(0, percent)) / 100;
    let commissionValue = commissionEnabled ? netSalesAchieved * effectiveCommissionPercent / 100 : 0;
    if (objective.key === "sem_giro") {
      commissionValue = commissionEnabled ? Number(item.comissao_valor || 0) : 0;
    } else if (objective.key === "novos_clientes") {
      commissionValue = Number(item.valor_atingido || 0);
    }
    return `
      <tr>
        <td>${goalNameWithHelp(objective)}</td>
        <td>${escapeHtml(formatGoalValue(objective, item.meta || 0, "meta"))}</td>
        <td class="achieved-value">${escapeHtml(formatGoalValue(objective, item.valor_atingido || 0, "achieved"))}</td>
        <td>
          <div class="goal-progress">
            <span style="width: ${Math.min(100, Math.max(0, percent))}%"></span>
            <strong>${formatNumber.format(percent)}%</strong>
          </div>
        </td>
        <td>${objective.key === "novos_clientes" || objective.key === "sem_giro" ? "Sem peso" : `${formatNumber.format(item.peso || 0)}%`}</td>
        <td class="commission-value">${objective.key === "novos_clientes" ? "Valor fixo" : objective.key === "sem_giro" ? "% por item" : `${formatPercent2.format(maxCommission)}%`}</td>
        <td class="commission-money">${formatCurrency.format(commissionValue)}</td>
      </tr>
    `;
  };
  const netSalesRows = () => {
    const objective = objectives.find((item) => item.key === "vendas_liquidas") || { key: "vendas_liquidas", label: "Vendas Liquidas sua regiao", kind: "currency" };
    const item = monthData.objetivos?.vendas_liquidas || {};
    const maxCommission = vendorGoalMaxCommission(commissionPercent, objective, item);
    const totalPercent = Number(item.percentual_atingido_total || netSalesPercent || 0);
    const effectiveCommissionPercent = maxCommission * Math.min(100, Math.max(0, totalPercent)) / 100;
    const commissionValue = commissionEnabled ? netSalesAchieved * effectiveCommissionPercent / 100 : 0;
    const subtotalObjective = { ...objective, label: "Subtotal Vendas Liquidas" };
    return `
      <tr>
        <td>${goalNameWithHelp(objective)}</td>
        <td>${escapeHtml(formatGoalValue(objective, item.meta || 0, "meta"))}</td>
        <td class="achieved-value">${escapeHtml(formatCurrency.format(netSalesRegion))}</td>
        <td>
          <div class="goal-progress">
            <span style="width: ${Math.min(100, Math.max(0, Number(item.percentual_atingido || 0)))}%"></span>
            <strong>${formatNumber.format(Number(item.percentual_atingido || 0))}%</strong>
          </div>
        </td>
        <td>${formatNumber.format(item.peso || 0)}%</td>
        <td class="commission-value">Somado no subtotal</td>
        <td class="commission-money">-</td>
      </tr>
      <tr>
        <td>
          <div class="goal-name-with-help">
            <strong>Vendas Liquidas outras regioes</strong>
            <span class="goal-help-icon" title="Vendas feitas pelo vendedor, conforme VN_NOM da nota fiscal, para clientes que nao pertencem a regiao/carteira definida para ele." tabindex="0">?</span>
          </div>
        </td>
        <td>-</td>
        <td class="achieved-value">${escapeHtml(formatCurrency.format(netSalesOtherRegions))}</td>
        <td>-</td>
        <td>-</td>
        <td class="commission-value">Somado no subtotal</td>
        <td class="commission-money">-</td>
      </tr>
      <tr class="vendor-goal-subtotal-row">
        <td>${goalNameWithHelp(subtotalObjective)}</td>
        <td>${escapeHtml(formatGoalValue(objective, item.meta || 0, "meta"))}</td>
        <td class="achieved-value">${escapeHtml(formatCurrency.format(netSalesAchieved))}</td>
        <td>
          <div class="goal-progress">
            <span style="width: ${Math.min(100, Math.max(0, totalPercent))}%"></span>
            <strong>${formatNumber.format(totalPercent)}%</strong>
          </div>
        </td>
        <td>${formatNumber.format(item.peso || 0)}%</td>
        <td class="commission-value">${formatPercent2.format(maxCommission)}%</td>
        <td class="commission-money">${formatCurrency.format(commissionValue)}</td>
      </tr>
    `;
  };
  const rows = [
    netSalesRows(),
    ...objectives
      .filter((objective) => objective.key !== "vendas_liquidas")
      .map((objective) => standardGoalRow(objective, monthData.objetivos?.[objective.key] || {})),
  ].join("");
  list.innerHTML = `
    <div class="vendor-page-goal-context">
      <span>Aumento definido: ${formatNumber.format(monthData.percentual_aumento || 0)}%</span>
      <span>Clientes com vendas: ${formatNumber.format(monthData.objetivos?.clientes_com_vendas?.meta || 0)}</span>
      <span>Contatos diarios: ${formatNumber.format(monthData.objetivos?.contatos_inativos_nunca?.meta || 0)}</span>
      <span>Novo cliente: ${formatCurrency.format(monthData.objetivos?.novos_clientes?.meta || 0)}</span>
    </div>
    <div class="table-scroll compact">
      <table class="vendor-page-goal-table">
        <thead>
          <tr>
            <th>Meta / Objetivo</th>
            <th>Meta do mes</th>
            <th>Valor Atingido</th>
            <th>% Atingido</th>
            <th>Peso</th>
            <th>% Comissão Máx.</th>
            <th>Comissão R$</th>
          </tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="7">Nenhuma meta cadastrada para este mes.</td></tr>'}</tbody>
      </table>
    </div>
  `;
}

function resetVendorRegionClientsPanel() {
  const panel = document.getElementById("vendor-region-clients-panel");
  if (!panel) {
    return;
  }
  document.querySelectorAll("[data-vendor-client-status]").forEach((button) => {
    button.classList.toggle("active", button.dataset.vendorClientStatus === currentVendorClientStatus);
  });
  ["uf", "ddd", "city"].forEach((key) => {
    const select = document.getElementById(`vendor-client-filter-${key}`);
    if (select) {
      select.innerHTML = '<option value="">Todos</option>';
      select.value = "";
    }
  });
  const search = document.getElementById("vendor-client-filter-search");
  if (search) {
    search.value = "";
  }
  document.getElementById("vendor-region-clients-summary").innerHTML = "";
  document.getElementById("vendor-region-clients-head").innerHTML = "";
  document.getElementById("vendor-region-clients-body").innerHTML = "";
  document.getElementById("vendor-region-clients-status").textContent = "";
}

function renderVendorRegions(payload) {
  currentVendorRegionPayload = payload;
  const { summary } = vendorRegionElements();
  summary.innerHTML = `
    <article><span>Vendedor</span><strong>${escapeHtml(payload.vendedor.nome_completo || "")}</strong></article>
    <article><span>Clientes na carteira</span><strong>${formatNumber.format(payload.resumo.clientes || 0)}</strong></article>
    <article><span>Periodo</span><strong>${payload.ano_inicial} a ${payload.ano_corrente}</strong></article>
  `;

  renderVendorRegionCharts();
}

async function loadVendorDailyContactsChart(force = false) {
  const route = vendorPageRoute();
  const chart = document.getElementById("vendor-daily-contact-chart");
  const status = document.getElementById("vendor-daily-contact-status");
  const total = document.getElementById("vendor-daily-contacts-total");
  const monthInput = document.getElementById("vendor-daily-contact-month");
  if (!route || !chart || !status || !total) {
    return;
  }
  if (monthInput && !monthInput.value) {
    monthInput.value = new Date().toISOString().slice(0, 7);
  }
  const selectedMonth = monthInput?.value || new Date().toISOString().slice(0, 7);
  const cacheKey = `${route.company}|${route.vendorId}|${selectedMonth}`;
  if (currentVendorDailyContactsPayload?.cacheKey === cacheKey && !force) {
    renderVendorDailyContactsChart(currentVendorDailyContactsPayload.payload);
    return;
  }
  status.textContent = "Carregando contatos diários...";
  chart.innerHTML = "";
  total.textContent = "Carregando...";
  try {
    const payload = await fetchJson(`/api/vendor-day-by-day/daily-contacts?company=${encodeURIComponent(route.company)}&vendor_id=${encodeURIComponent(route.vendorId)}&month=${encodeURIComponent(selectedMonth)}`, { force });
    currentVendorDailyContactsPayload = { cacheKey, payload };
    renderVendorDailyContactsChart(payload);
  } catch (error) {
    try {
      const { start, end } = dailyContactsMonthRange(selectedMonth);
      const report = await fetchJson(`/api/vendor-day-by-day/report?company=${encodeURIComponent(route.company)}&vendor_id=${encodeURIComponent(route.vendorId)}&start_date=${encodeURIComponent(start)}&end_date=${encodeURIComponent(end)}`, { force });
      const fallbackPayload = buildDailyContactsPayloadFromReport(report, selectedMonth);
      currentVendorDailyContactsPayload = { cacheKey, payload: fallbackPayload };
      renderVendorDailyContactsChart(fallbackPayload);
      status.textContent += " Dados carregados pelo relatório de contatos.";
    } catch (fallbackError) {
      chart.innerHTML = "";
      total.textContent = "Sem dados";
      status.textContent = fallbackError.message || error.message;
    }
  }
}

function dailyContactsMonthRange(monthValue) {
  const [year, month] = String(monthValue || new Date().toISOString().slice(0, 7)).split("-").map(Number);
  const lastDay = new Date(year, month, 0).getDate();
  const monthText = String(month).padStart(2, "0");
  return {
    start: `${year}-${monthText}-01`,
    end: `${year}-${monthText}-${String(lastDay).padStart(2, "0")}`,
  };
}

function parseBrDateForSort(value) {
  const match = String(value || "").match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  return match ? `${match[3]}-${match[2]}-${match[1]}` : String(value || "").slice(0, 10);
}

function isBusinessDayIso(value) {
  const date = new Date(`${value}T00:00:00`);
  const day = date.getDay();
  return day >= 1 && day <= 5;
}

function buildDailyContactsPayloadFromReport(report, monthValue = "") {
  const grouped = {};
  (report.rows || []).forEach((row) => {
    const data = parseBrDateForSort(row.data_label || row.data);
    if (!data || !isBusinessDayIso(data)) {
      return;
    }
    if (monthValue && data.slice(0, 7) !== monthValue) {
      return;
    }
    const status = normalizeTextClient(row.status || "");
    const isInactive = status.includes("INATIVO") || status === "INACTIVE";
    const isNever = status.includes("NUNCA") || status === "NEVER";
    if (!isInactive && !isNever) {
      return;
    }
    const item = grouped[data] || {
      data,
      data_label: row.data_label || data,
      inativos: 0,
      nunca_comprou: 0,
      total: 0,
    };
    if (isInactive) {
      item.inativos += 1;
    } else if (isNever) {
      item.nunca_comprou += 1;
    }
    item.total += 1;
    grouped[data] = item;
  });
  const rows = Object.values(grouped).sort((left, right) => String(left.data).localeCompare(String(right.data)));
  return {
    empresa: report.empresa || "",
    month: monthValue,
    rows,
    totals: {
      inativos: rows.reduce((total, row) => total + Number(row.inativos || 0), 0),
      nunca_comprou: rows.reduce((total, row) => total + Number(row.nunca_comprou || 0), 0),
      total: rows.reduce((total, row) => total + Number(row.total || 0), 0),
    },
  };
}

function renderVendorDailyContactsChart(payload) {
  const chart = document.getElementById("vendor-daily-contact-chart");
  const status = document.getElementById("vendor-daily-contact-status");
  const total = document.getElementById("vendor-daily-contacts-total");
  if (!chart || !status || !total) {
    return;
  }
  const rows = payload.rows || [];
  const maxValue = Math.max(1, ...rows.map((row) => Number(row.total || 0)));
  total.textContent = `${formatNumber.format(payload.totals?.total || 0)} contatos | Inativos ${formatNumber.format(payload.totals?.inativos || 0)} | Nunca Comprou ${formatNumber.format(payload.totals?.nunca_comprou || 0)}`;
  if (!rows.length) {
    chart.innerHTML = '<div class="empty-state">Nenhum contato diário encontrado para este vendedor.</div>';
    status.textContent = "Nenhum contato diário encontrado.";
    return;
  }
  chart.innerHTML = `
    <div class="vendor-daily-contact-bars">
      ${rows.map((row) => {
        const inactive = Number(row.inativos || 0);
        const never = Number(row.nunca_comprou || 0);
        const inactivePct = Math.max(0, (inactive / maxValue) * 100);
        const neverPct = Math.max(0, (never / maxValue) * 100);
        return `
          <article class="vendor-daily-contact-day">
            <div class="vendor-daily-contact-stack" title="${escapeHtml(row.data_label || row.data || "")}: ${formatNumber.format(row.total || 0)} contatos">
              <i class="inactive" style="height:${inactivePct}%"><span>${inactive ? formatNumber.format(inactive) : ""}</span></i>
              <i class="never" style="height:${neverPct}%"><span>${never ? formatNumber.format(never) : ""}</span></i>
            </div>
            <strong>${escapeHtml(row.data_label || row.data || "")}</strong>
            <span>${formatNumber.format(row.total || 0)}</span>
          </article>
        `;
      }).join("")}
    </div>
    <div class="vendor-daily-contact-legend">
      <span><i class="inactive"></i>Inativos</span>
      <span><i class="never"></i>Nunca Comprou</span>
    </div>
  `;
  status.textContent = `${payload.empresa}: ${formatNumber.format(rows.length)} dia(s) com contatos no mês selecionado.`;
}

function setVendorRegionDimension(dimension) {
  currentVendorRegionDimension = dimension;
  document.querySelectorAll("[data-region-dimension]").forEach((button) => {
    button.classList.toggle("active", button.dataset.regionDimension === dimension);
  });
  renderVendorRegionCharts();
}

function setVendorRegionIndicator(indicator) {
  currentVendorRegionIndicator = indicator;
  document.querySelectorAll("[data-region-indicator]").forEach((button) => {
    button.classList.toggle("active", button.dataset.regionIndicator === indicator);
  });
  renderVendorRegionCharts();
}

function renderVendorRegionCharts() {
  if (!currentVendorRegionPayload) {
    return;
  }
  const payload = currentVendorRegionPayload;
  const labels = { ufs: "UF atendida", ddds: "DDD atendido", cidades: "Cidades atendidas", agrupado: "Agrupado" };
  const rows = payload[currentVendorRegionDimension] || [];
  const { sections } = vendorRegionElements();
  if (currentVendorRegionIndicator === "quant") {
    sections.innerHTML = vendorQuantCharts(labels[currentVendorRegionDimension], rows, payload.anos, payload.meses_fechados || payload.meses);
    return;
  }
  if (currentVendorRegionIndicator === "annual-sales") {
    sections.innerHTML = vendorAnnualSalesCharts(labels[currentVendorRegionDimension], rows, payload.anos);
    return;
  }
  sections.innerHTML = vendorSalesCharts(labels[currentVendorRegionDimension], rows, payload.anos, payload.meses, payload.meses_fechados || payload.meses);
}

function setVendorClientStatus(status) {
  currentVendorClientStatus = status;
  document.querySelectorAll("[data-vendor-client-status]").forEach((button) => {
    button.classList.toggle("active", button.dataset.vendorClientStatus === status);
  });
  loadVendorRegionClients(true);
}

function vendorClientFilterParams() {
  const route = vendorPageRoute();
  if (!route) {
    return null;
  }
  return new URLSearchParams({
    company: route.company,
    vendor_id: route.vendorId,
    status: currentVendorClientStatus,
    q: document.getElementById("vendor-client-filter-search")?.value.trim() || "",
    uf: currentVendorClientFilters.uf || "",
    ddd: currentVendorClientFilters.ddd || "",
    city: currentVendorClientFilters.city || "",
  });
}

function fillVendorClientFilter(selectId, values, selectedValue, labelKey = null) {
  const select = document.getElementById(selectId);
  if (!select) {
    return;
  }
  const current = selectedValue || "";
  const options = values.map((item) => {
    const value = labelKey ? item.value : item;
    const label = labelKey ? item[labelKey] : item;
    return `<option value="${escapeHtml(value)}" ${String(value) === String(current) ? "selected" : ""}>${escapeHtml(label)}</option>`;
  }).join("");
  select.innerHTML = `<option value="">Todos</option>${options}`;
  if ([...select.options].some((option) => option.value === current)) {
    select.value = current;
  } else {
    select.value = "";
    if (selectId.endsWith("-uf")) currentVendorClientFilters.uf = "";
    if (selectId.endsWith("-ddd")) currentVendorClientFilters.ddd = "";
    if (selectId.endsWith("-city")) currentVendorClientFilters.city = "";
  }
}

function renderVendorRegionClientsPayload(payload) {
  const status = document.getElementById("vendor-region-clients-status");
  const summary = document.getElementById("vendor-region-clients-summary");
  const head = document.getElementById("vendor-region-clients-head");
  const body = document.getElementById("vendor-region-clients-body");
  if (!status || !summary || !head || !body) {
    return;
  }
  fillVendorClientFilter("vendor-client-filter-uf", payload.options.ufs || [], currentVendorClientFilters.uf);
  fillVendorClientFilter("vendor-client-filter-ddd", payload.options.ddds || [], currentVendorClientFilters.ddd);
  fillVendorClientFilter(
    "vendor-client-filter-city",
    (payload.options.cities || []).map((city) => ({ value: city.city, label: city.label })),
    currentVendorClientFilters.city,
    "label"
  );
  summary.innerHTML = `
    <article><span>Total carteira</span><strong>${formatNumber.format(payload.total_carteira || 0)}</strong></article>
    <article><span>Ativos</span><strong>${formatNumber.format(payload.counts.active || 0)}</strong></article>
    <article><span>Inativos</span><strong>${formatNumber.format(payload.counts.inactive || 0)}</strong></article>
    <article><span>Nunca Comprou</span><strong>${formatNumber.format(payload.counts.never || 0)}</strong></article>
    <article><span>Resultado</span><strong>${formatNumber.format(payload.total_resultado || 0)}</strong></article>
  `;
  head.innerHTML = `<tr>${payload.columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}</tr>`;
  body.innerHTML = payload.rows.map((row) => `
    <tr>
      ${payload.columns.map((column) => {
        const value = column.key === "faturamento_liquido" ? formatCurrency.format(row[column.key] || 0) : formatCell(row[column.key]);
        return `<td>${escapeHtml(value)}</td>`;
      }).join("")}
    </tr>
  `).join("") || `<tr><td colspan="${payload.columns.length}">Nenhum cliente encontrado para esta seleção.</td></tr>`;
  status.textContent = payload.total_resultado > payload.rows.length
    ? `Mostrando ${formatNumber.format(payload.rows.length)} de ${formatNumber.format(payload.total_resultado)} clientes.`
    : `${formatNumber.format(payload.total_resultado)} clientes encontrados.`;
}

async function loadVendorRegionClients(force = false) {
  const panel = document.getElementById("vendor-region-clients-panel");
  if (!panel || currentVendorWorkspace !== "clients") {
    return;
  }
  const status = document.getElementById("vendor-region-clients-status");
  const summary = document.getElementById("vendor-region-clients-summary");
  const head = document.getElementById("vendor-region-clients-head");
  const body = document.getElementById("vendor-region-clients-body");
  const params = vendorClientFilterParams();
  if (!params) {
    return;
  }
  const cacheKey = params.toString();
  if (vendorRegionClientsLoaded && currentVendorRegionClientsCacheKey === cacheKey && currentVendorRegionClientsPayload && !force) {
    renderVendorRegionClientsPayload(currentVendorRegionClientsPayload);
    return;
  }
  status.textContent = "Carregando clientes da região...";
  try {
    const payload = await fetchJson(`/api/vendor-region-clients?${cacheKey}`, { force });
    currentVendorRegionClientsPayload = payload;
    currentVendorRegionClientsCacheKey = cacheKey;
    renderVendorRegionClientsPayload(payload);
    vendorRegionClientsLoaded = true;
  } catch (error) {
    summary.innerHTML = "";
    head.innerHTML = "";
    body.innerHTML = "";
    status.textContent = error.message;
  }
}

function toggleVendorRegionClients() {
  setVendorWorkspaceSection("clients");
}

function vendorRegionMetricValue(row, metric, periodType, period) {
  const key = String(period);
  if (metric === "ativos") {
    return periodType === "year" ? row.ativos_anos?.[key] || 0 : row.ativos_meses?.[key] || 0;
  }
  if (metric === "inativos") {
    return periodType === "year" ? row.inativos_anos?.[key] || 0 : row.inativos_meses?.[key] || 0;
  }
  if (metric === "nunca") {
    return periodType === "year" ? row.nunca_anos?.[key] || 0 : row.nunca_meses?.[key] || 0;
  }
  return periodType === "year" ? row.vendas_anos?.[key] || 0 : row.vendas_meses?.[key] || 0;
}

function formatVendorRegionMetric(value, metric) {
  return ["vendas", "media"].includes(metric) ? formatCurrency.format(value || 0) : formatNumber.format(value || 0);
}

function vendorRegionMonthlyAverage(row, year, closedMonths) {
  const currentYear = new Date().getFullYear();
  if (Number(year) === currentYear) {
    const divisor = Math.max(1, closedMonths.length);
    const closedTotal = closedMonths.reduce((total, month) => total + vendorRegionMetricValue(row, "vendas", "month", month), 0);
    return closedTotal / divisor;
  }
  return vendorRegionMetricValue(row, "vendas", "year", year) / 12;
}

function vendorRegionTrend(row, closedMonths) {
  return vendorRegionMonthlyAverage(row, new Date().getFullYear(), closedMonths) * 12;
}

function vendorQuantCharts(title, rows, years, closedMonths) {
  if (!rows.length) {
    return `<div class="table-status">Nenhum dado encontrado para ${escapeHtml(title)}.</div>`;
  }
  const closedYears = years.filter((year) => Number(year) < new Date().getFullYear());
  return `
    <section class="vendor-region-chart-block">
      <h4>${escapeHtml(title)} - Indicadores Quantitativos</h4>
      <div class="donut-grid">
        ${rows.map((row) => vendorQuantChart(row, closedYears, closedMonths)).join("")}
      </div>
    </section>
  `;
}

function vendorQuantChart(row, closedYears, closedMonths) {
  const currentYear = new Date().getFullYear();
  const lastClosedMonth = closedMonths[closedMonths.length - 1] || 1;
  const totalClients = Math.max(0, row.clientes || 0);
  const averageMetric = (metric) => (
    closedMonths.reduce((total, month) => total + vendorRegionMetricValue(row, metric, "month", month), 0) / Math.max(1, closedMonths.length)
  );
  const donuts = [
    ...closedYears.map((year) => ({
      label: String(year),
      ativos: vendorRegionMetricValue(row, "ativos", "year", year),
      inativos: vendorRegionMetricValue(row, "inativos", "year", year),
      nunca: vendorRegionMetricValue(row, "nunca", "year", year),
      mediaAtivos: vendorRegionMetricValue(row, "ativos", "year", year) / 12,
    })),
    {
      label: `Media ${currentYear}`,
      media: true,
      ativos: averageMetric("ativos"),
      inativos: averageMetric("inativos"),
      nunca: averageMetric("nunca"),
      mediaAtivos: averageMetric("ativos"),
    },
    {
      label: `Mes ${String(lastClosedMonth).padStart(2, "0")}`,
      ativos: vendorRegionMetricValue(row, "ativos", "month", lastClosedMonth),
      inativos: vendorRegionMetricValue(row, "inativos", "month", lastClosedMonth),
      nunca: vendorRegionMetricValue(row, "nunca", "month", lastClosedMonth),
      mediaAtivos: vendorRegionMetricValue(row, "ativos", "month", lastClosedMonth),
    },
  ];
  return `
    <article class="quant-donut-card">
      <div class="quant-title full">
        <h5>${escapeHtml(row.label)}</h5>
        <span>Total de clientes: ${formatNumber.format(totalClients)}</span>
      </div>
      <div class="period-donut-grid">
        ${donuts.map((item) => {
          const total = Math.max(1, totalClients);
          const ativos = Math.max(0, item.ativos || 0);
          const inativos = Math.max(0, item.inativos || 0);
          const nunca = Math.max(0, item.nunca || 0);
          const mediaAtivos = Math.max(0, item.mediaAtivos || 0);
          const activeDeg = Math.min(360, (ativos / total) * 360);
          const inactiveDeg = Math.min(360, activeDeg + ((inativos / total) * 360));
          const neverDeg = Math.min(360, inactiveDeg + ((nunca / total) * 360));
          return `
            <div class="period-donut-item">
              <div class="period-donut ${item.media ? "average" : ""}" style="--active-deg:${activeDeg}deg;--inactive-deg:${inactiveDeg}deg;--never-deg:${neverDeg}deg;">
                <strong>${formatNumber.format(totalClients)}</strong>
                <span>${escapeHtml(item.label)}</span>
              </div>
              <div class="period-donut-metrics">
                <span><i class="dot active"></i>Ativos ${formatNumber.format(Math.round(ativos))}</span>
                <span><i class="dot inactive"></i>Inativos ${formatNumber.format(Math.round(inativos))}</span>
                <span><i class="dot never"></i>Nunca comprou ${formatNumber.format(Math.round(nunca))}</span>
                <span><i class="dot average"></i>Media ativos ${formatNumber.format(Math.round(mediaAtivos))}</span>
              </div>
            </div>
          `;
        }).join("")}
      </div>
      <div class="quant-legend">
        <span><i class="dot active"></i>Ativos</span>
        <span><i class="dot inactive"></i>Inativos</span>
        <span><i class="dot never"></i>Nunca Comprou</span>
        <span><i class="dot average"></i>Media Ativos</span>
      </div>
    </article>
  `;
}

function vendorSalesCharts(title, rows, years, months, closedMonths) {
  if (!rows.length) {
    return `<div class="table-status">Nenhum dado encontrado para ${escapeHtml(title)}.</div>`;
  }
  const closedYears = years.filter((year) => Number(year) < new Date().getFullYear());
  const stacked = ["ddds", "cidades", "agrupado"].includes(currentVendorRegionDimension);
  return `
    <section class="vendor-region-chart-block ${stacked ? "stacked-sales" : ""}">
      <h4>${escapeHtml(title)} - Indicadores de Vendas</h4>
      <div class="sales-chart-list">
        ${rows.map((row) => vendorSalesChart(row, closedYears, months, closedMonths)).join("")}
      </div>
    </section>
  `;
}

function vendorSalesChart(row, closedYears, months, closedMonths) {
  const currentYear = new Date().getFullYear();
  const yearValues = closedYears.map((year) => vendorRegionMetricValue(row, "vendas", "year", year));
  const closedTotal = closedMonths.reduce((total, month) => total + vendorRegionMetricValue(row, "vendas", "month", month), 0);
  const trend = vendorRegionTrend(row, closedMonths);
  const averageClosedYears = closedYears.length
    ? yearValues.reduce((total, value) => total + (value / 12), 0) / closedYears.length
    : 0;
  const rawMaxValue = Math.max(1, ...yearValues, closedTotal, trend, averageClosedYears);
  const scaleMax = Math.max(100000, Math.ceil(rawMaxValue / 100000) * 100000);
  const bars = [
    ...closedYears.map((year, index) => ({ label: String(year), value: yearValues[index], type: "history" })),
    { label: `${currentYear} ate mes fechado`, value: closedTotal, type: "current" },
    { label: `Tendencia ${currentYear}`, value: trend, type: "trend" },
  ];
  const rulerValues = [];
  for (let value = scaleMax; value >= 0; value -= 100000) {
    rulerValues.push(value);
  }
  const chartHeight = Math.max(460, Math.ceil(scaleMax / 100000) * 14);
  const avgPercent = Math.min(100, (averageClosedYears / scaleMax) * 100);
  const currentAverageProjected = trend / 12;
  const currentAvgPercent = Math.min(100, (currentAverageProjected / scaleMax) * 100);
  return `
    <article class="sales-chart-card">
      <div class="sales-chart-title">
        <h5>${escapeHtml(row.label)}</h5>
        <span>Media hist. mensal: ${formatCurrency.format(averageClosedYears)} | Media ${currentYear}: ${formatCurrency.format(closedTotal / Math.max(1, closedMonths.length))}</span>
      </div>
      <div class="bar-chart-wrap" style="--chart-height:${chartHeight}px;--bar-count:${bars.length};">
        <div class="bar-ruler">
          ${rulerValues.map((value) => `<span style="--mark:${(value / scaleMax) * 100}%">${formatCurrency.format(value)}</span>`).join("")}
        </div>
        <div class="bar-3d-chart">
        <div class="plot-area">
          <div class="average-line history" style="--avg:${avgPercent}%"><span>Media mensal anos fechados ${formatCurrency.format(averageClosedYears)}</span></div>
          <div class="average-line current" style="--avg:${currentAvgPercent}%"><span>Tendencia media mensal projetada ${currentYear} ${formatCurrency.format(currentAverageProjected)}</span></div>
          <div class="bars-row">
        ${bars.map((bar) => {
          const barHeight = Math.max(0, (bar.value / scaleMax) * 100);
          return `
          <div class="bar-column ${bar.type}">
            <div class="bar-shape ${barHeight < 12 ? "tiny-bar" : ""}" style="--bar-height:${barHeight}%">
              ${bar.value > 0 ? `<div class="bar-value">${formatCurrency.format(bar.value)}</div>` : ""}
            </div>
            <span>${escapeHtml(bar.label)}</span>
          </div>
        `;
        }).join("")}
          </div>
        </div>
        </div>
      </div>
    </article>
  `;
}

function vendorAnnualSalesCharts(title, rows, years) {
  if (!rows.length) {
    return `<div class="table-status">Nenhum dado encontrado para ${escapeHtml(title)}.</div>`;
  }
  const stacked = ["ddds", "cidades", "agrupado"].includes(currentVendorRegionDimension);
  return `
    <section class="vendor-region-chart-block ${stacked ? "stacked-sales" : ""}">
      <h4>${escapeHtml(title)} - Grafico Anual Faturamento</h4>
      <div class="annual-sales-list">
        ${rows.map((row) => vendorAnnualSalesChart(row, years)).join("")}
      </div>
    </section>
  `;
}

function vendorAnnualSalesChart(row, years) {
  const monthLabels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const series = years.map((year) => ({
    year,
    months: Array.from({ length: 12 }, (_, index) => Number(row.vendas_meses_anos?.[String(year)]?.[String(index + 1)] || 0)),
  }));
  const maxValue = Math.max(1, ...series.flatMap((item) => item.months));
  const scaleMax = Math.max(100000, Math.ceil(maxValue / 100000) * 100000);
  const rulerValues = [];
  for (let value = scaleMax; value >= 0; value -= 100000) {
    rulerValues.push(value);
  }
  const chartHeight = Math.max(360, Math.ceil(scaleMax / 100000) * 12);
  return `
    <article class="annual-sales-card">
      <div class="sales-chart-title">
        <h5>${escapeHtml(row.label)}</h5>
        <span>Faturamento mensal de janeiro a dezembro por ano</span>
      </div>
      <div class="annual-sales-scroll">
        <div class="annual-sales-chart" style="--chart-height:${chartHeight}px;--scale-max:${scaleMax};">
          <div class="annual-ruler">
            ${rulerValues.map((value) => `<span style="--mark:${(value / scaleMax) * 100}%">${formatCurrency.format(value)}</span>`).join("")}
          </div>
          <div class="annual-years">
            ${series.map((yearItem) => `
              <div class="annual-year-group">
                <strong>${yearItem.year}</strong>
                <div class="annual-month-bars">
                  ${yearItem.months.map((value, index) => {
                    const barHeight = Math.max(0, (value / scaleMax) * 100);
                    return `
                    <div class="annual-month" title="${monthLabels[index]} ${yearItem.year}: ${formatCurrency.format(value)}">
                      <div class="annual-bar ${barHeight < 12 ? "tiny-bar" : ""}" style="--bar-height:${barHeight}%">
                        ${value > 0 ? `<span>${formatCurrency.format(value)}</span>` : ""}
                      </div>
                      <small>${monthLabels[index]}</small>
                    </div>
                  `;
                  }).join("")}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </article>
  `;
}

function vendorRegionTable(title, rows, years, months, closedMonths) {
  const monthHeaders = months.map((month) => `<th>${String(month).padStart(2, "0")}/${new Date().getFullYear()}</th>`).join("");
  const metrics = [
    { key: "ativos", label: "Clientes ativos" },
    { key: "inativos", label: "Clientes inativos" },
    { key: "nunca", label: "Nunca comprou" },
    { key: "vendas", label: "Vendas por ano/mes" },
    { key: "media", label: "Media mes" },
  ];
  const body = rows.flatMap((row) => metrics.map((metric, index) => `
    <tr class="${metric.key === "media" ? "region-average-row" : ""}">
      <td>${index === 0 ? `<strong>${escapeHtml(row.label)}</strong>` : ""}</td>
      <td>${escapeHtml(metric.label)}</td>
      ${years.map((year) => `<td>${formatVendorRegionMetric(metric.key === "media" ? vendorRegionMonthlyAverage(row, year, closedMonths) : vendorRegionMetricValue(row, metric.key, "year", year), metric.key)}</td>`).join("")}
      ${months.map((month) => `<td>${metric.key === "media" ? "" : formatVendorRegionMetric(vendorRegionMetricValue(row, metric.key, "month", month), metric.key)}</td>`).join("")}
      <td class="${metric.key === "vendas" ? "trend-cell" : ""}">${metric.key === "vendas" ? formatCurrency.format(vendorRegionTrend(row, closedMonths)) : ""}</td>
    </tr>
  `)).join("") || `
    <tr><td colspan="${3 + years.length + months.length}">Nenhum dado encontrado para este vendedor.</td></tr>
  `;
  const totals = metrics.map((metric) => `
    <tr class="region-total-row ${metric.key === "media" ? "region-average-row" : ""}">
      <td><strong>Total</strong></td>
      <td>${escapeHtml(metric.label)}</td>
      ${years.map((year) => `<td>${formatVendorRegionMetric(metric.key === "media" ? rows.reduce((total, row) => total + vendorRegionMonthlyAverage(row, year, closedMonths), 0) : rows.reduce((total, row) => total + vendorRegionMetricValue(row, metric.key, "year", year), 0), metric.key)}</td>`).join("")}
      ${months.map((month) => `<td>${metric.key === "media" ? "" : formatVendorRegionMetric(rows.reduce((total, row) => total + vendorRegionMetricValue(row, metric.key, "month", month), 0), metric.key)}</td>`).join("")}
      <td class="${metric.key === "vendas" ? "trend-cell" : ""}">${metric.key === "vendas" ? formatCurrency.format(rows.reduce((total, row) => total + vendorRegionTrend(row, closedMonths), 0)) : ""}</td>
    </tr>
  `).join("");

  return `
    <section class="vendor-region-table">
      <h4>${escapeHtml(title)}</h4>
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Região</th>
              <th>Indicador</th>
              ${years.map((year) => `<th>${year}</th>`).join("")}
              ${monthHeaders}
              <th class="trend-cell">Tendencia ${new Date().getFullYear()}</th>
            </tr>
          </thead>
          <tbody>${body}</tbody>
          <tfoot>${rows.length ? totals : ""}</tfoot>
        </table>
      </div>
    </section>
  `;
}

function renderUfChart(payload) {
  const chart = document.getElementById("uf-chart");
  const maxValue = Math.max(...payload.rows.map((row) => row.clientes), 0);

  document.getElementById("uf-chart-title").textContent = `Clientes e faturamento por UF - ${payload.empresa}`;
  document.getElementById("uf-chart-subtitle").textContent = `Faturamento liquido: ${payload.calculo_faturamento}`;
  document.getElementById("uf-chart-total").textContent = formatNumber.format(payload.total_clientes);
  document.getElementById("dashboard-total-clients").textContent = formatNumber.format(payload.total_clientes);
  document.getElementById("dashboard-active-ufs").textContent = `${payload.ufs_com_clientes}/27`;
  document.getElementById("dashboard-top-uf").textContent = payload.maior_uf.uf
    ? `${payload.maior_uf.uf} · ${formatNumber.format(payload.maior_uf.clientes)}`
    : "-";
  document.getElementById("dashboard-total-revenue").textContent = formatCurrency.format(payload.faturamento_total || 0);
  document.getElementById("dashboard-top-revenue-uf").textContent = payload.maior_faturamento_uf.uf
    ? `${payload.maior_faturamento_uf.uf} · ${formatCurrency.format(payload.maior_faturamento_uf.faturamento_total || 0)}`
    : "-";

  const notes = [];
  notes.push(payload.sem_uf > 0
    ? `${formatNumber.format(payload.sem_uf)} clientes estao sem UF cadastrada.`
    : "Todos os clientes desta empresa possuem UF cadastrada.");
  if (payload.vendas_grupo_excluidas > 0) {
    notes.push(`${formatNumber.format(payload.vendas_grupo_excluidas)} linhas de venda para empresas do grupo foram excluidas do faturamento.`);
  }
  if (payload.vendas_sem_uf > 0) {
    notes.push(`${formatNumber.format(payload.vendas_sem_uf)} linhas de venda estao sem UF e nao entraram no grafico.`);
  }
  document.getElementById("dashboard-note").textContent = notes.join(" ");

  chart.style.setProperty("--year-count", payload.years.length);
  const header = `
    <div class="uf-row header">
      <div class="uf-label">UF</div>
      <div class="uf-client-cell">Clientes</div>
      ${payload.years.map((year) => `<div class="uf-money">${year}</div>`).join("")}
      <div class="uf-total">Total</div>
    </div>
  `;

  const rows = payload.rows.map((row) => {
    const percent = maxValue === 0 ? 0 : Math.round((row.clientes / maxValue) * 100);
    const minWidth = row.clientes > 0 ? "18px" : "0";
    return `
      <div class="uf-row">
        <div class="uf-label">${escapeHtml(row.uf)}</div>
        <div class="uf-client-cell">
          <div class="uf-track" aria-label="${escapeHtml(row.uf)}: ${formatNumber.format(row.clientes)} clientes">
            <div class="uf-fill" style="--bar-width: ${percent}%; --bar-min: ${minWidth};"></div>
          </div>
          <div class="uf-value">${formatNumber.format(row.clientes)}</div>
        </div>
        ${payload.years.map((year) => `<div class="uf-money">${formatCurrency.format(row.faturamento_liquido[String(year)] || 0)}</div>`).join("")}
        <div class="uf-total">${formatCurrency.format(row.faturamento_total || 0)}</div>
      </div>
    `;
  }).join("");

  chart.innerHTML = header + rows;
}

function renderActivityChart(payload) {
  const chart = document.getElementById("activity-chart");
  chart.style.setProperty("--year-count", payload.years.length);
  document.getElementById("activity-chart-title").textContent = `Clientes Ativos/Inativos por UF - ${payload.empresa}`;

  const header = `
    <div class="activity-row header">
      <div>UF</div>
      <div>Total</div>
      ${payload.years.map((year) => `<div>${year}</div>`).join("")}
    </div>
  `;

  const rows = payload.rows.map((row) => {
    const total = row.clientes || 0;
    return `
      <div class="activity-row">
        <div class="activity-uf">${escapeHtml(row.uf)}</div>
        <div class="activity-total">${formatNumber.format(total)}</div>
        ${payload.years.map((year) => {
          const activity = row.atividade[String(year)] || { ativos: 0, inativos: total };
          const activePercent = total === 0 ? 0 : (activity.ativos / total) * 100;
          const inactivePercent = total === 0 ? 0 : (activity.inativos / total) * 100;
          return `
            <div class="activity-year" title="${escapeHtml(row.uf)} ${year}: ${formatNumber.format(activity.ativos)} ativos e ${formatNumber.format(activity.inativos)} inativos">
              <div class="activity-stack">
                <div class="activity-active ${activity.ativos > 0 ? "has-value" : ""}" style="--active-width: ${activePercent}%;">
                  ${activity.ativos > 0 ? `<span>${formatNumber.format(activity.ativos)}</span>` : ""}
                </div>
                <div class="activity-inactive ${activity.inativos > 0 ? "has-value" : ""}" style="--inactive-width: ${inactivePercent}%;">
                  ${activity.inativos > 0 ? `<span>${formatNumber.format(activity.inativos)}</span>` : ""}
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }).join("");

  chart.innerHTML = header + rows;
}

function escapeHtml(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatCell(value) {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  if (typeof value === "number") {
    return formatNumber.format(value);
  }

  const text = String(value);
  if (/^\d{4}-\d{2}-\d{2}(?:T| |$)/.test(text)) {
    return text.slice(0, 10).split("-").reverse().join("/");
  }

  return text;
}

function formatMercadoLivreCell(columnKey, value) {
  if (value === null || value === undefined || value === "") {
    return "";
  }
  if (["Preço", "Preço de venda Ionlab", "MKPC", "MKPPV", "Preço Onix", "Preço Vitralab", "Preço Nativalab"].includes(columnKey)) {
    const number = Number(value);
    return Number.isFinite(number) ? formatPercent2.format(number) : formatCell(value);
  }
  if (["Estoque no depósito", "Estoque Ionlab", "Estoque no depósito Onix", "Estoque no depósito Vitralab", "Estoque no depósito Nativalab"].includes(columnKey)) {
    const number = Number(value);
    return Number.isFinite(number) ? new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 3 }).format(number) : formatCell(value);
  }
  return formatCell(value);
}

function formatTableCell(tableName, key, value) {
  if (tableName === "stock" && (key === "Quantidade" || key === "V.Unitario" || key === "Total")) {
    if (value === null || value === undefined || value === "") {
      return "";
    }
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: key === "Total" ? 2 : 3,
      maximumFractionDigits: key === "Total" ? 2 : 3,
    }).format(Number(value));
  }
  if (tableName === "in-transit" && key === "QTY") {
    if (value === null || value === undefined || value === "") {
      return "";
    }
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    }).format(Number(value));
  }
  if ((tableName === "costing" || tableName === "costing-fabricated") && (key === "Preco Dollar" || key === "Custo BRL Indice" || key === "Custo BRL Ultima Importacao")) {
    if (value === null || value === undefined || value === "") {
      return "";
    }
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(Number(value));
  }
  if (tableName === "prices" && key === "Custo BRL Indice") {
    if (value === null || value === undefined || value === "") {
      return "";
    }
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(Number(value));
  }
  if (tableName === "prices" && (key === "VAL_VEND" || key === "PER_DESC" || key === "PER_COM" || key === "Aliquota IPI")) {
    if (value === null || value === undefined || value === "") {
      return "";
    }
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value));
  }
  return formatCell(value);
}

function tableCellClass(tableName, key) {
  if (tableName === "stock" && (key === "Quantidade" || key === "V.Unitario" || key === "Total")) {
    return key === "Total" ? "costing-value-cell stock-total-cell" : "costing-value-cell";
  }
  if (tableName === "in-transit" && key === "QTY") {
    return "costing-value-cell";
  }
  if ((tableName === "costing" || tableName === "costing-fabricated") && (key === "Preco Dollar" || key === "Custo BRL Indice" || key === "Custo BRL Ultima Importacao")) {
    return key === "Custo BRL Indice" ? "costing-value-cell costing-index-cell" : "costing-value-cell";
  }
  if (tableName === "prices" && key === "Custo BRL Indice") {
    return "costing-value-cell costing-index-cell";
  }
  if (tableName === "prices" && (key === "VAL_VEND" || key === "PER_DESC" || key === "PER_COM" || key === "Aliquota IPI" || key === "ID_TAB" || key === "ID_EST" || key === "LC_COD")) {
    return "costing-value-cell";
  }
  return "";
}

function tableElements(tableName) {
  return {
    company: document.getElementById(`${tableName}-table-company`),
    search: document.getElementById(`${tableName}-table-search`),
    status: document.getElementById(`${tableName}-table-status`),
    head: document.getElementById(`${tableName}-table-head`),
    body: document.getElementById(`${tableName}-table-body`),
  };
}

function setCostingInternalTable(tableName) {
  activeCostingTable = tableName;
  document.querySelectorAll("[data-costing-table]").forEach((button) => {
    button.classList.toggle("active", button.dataset.costingTable === tableName);
  });
  document.querySelectorAll("[data-costing-panel]").forEach((panel) => {
    panel.classList.toggle("hidden", panel.dataset.costingPanel !== tableName);
  });
  loadTable(tableName);
}

async function loadTable(tableName, force = false) {
  const elements = tableElements(tableName);
  const company = elements.company.value || "ionlab";
  const query = elements.search.value.trim();
  const state = tableState[tableName];
  const tableLabels = { sales: "vendas", clients: "clientes", stock: "estoque", "in-transit": "em transito", prices: "tabela de precos", products: "cadastro de produtos", costing: "custeio", "costing-fabricated": "custeio fabricado" };
  const label = tableLabels[tableName] || tableName;
  const requestKey = JSON.stringify({
    company,
    query,
    sortKey: state.sortKey || "",
    sortDir: state.sortDir || "asc",
  });
  if (!force && state.loaded && state.cacheKey === requestKey) {
    return;
  }

  elements.status.textContent = `Carregando ${label}...`;

  try {
    const payload = await fetchJson(`/api/table/${tableName}?company=${encodeURIComponent(company)}&q=${encodeURIComponent(query)}&limit=200&sort_key=${encodeURIComponent(state.sortKey || "")}&sort_dir=${encodeURIComponent(state.sortDir || "asc")}`, { force });
    elements.head.innerHTML = `
      <tr>
        ${payload.columns.map((column) => {
          const active = payload.sort_key === column.key;
          const arrow = active ? (payload.sort_dir === "desc" ? " ?" : " ?") : "";
          return `<th><button class="table-sort-button ${active ? "active" : ""}" type="button" data-table="${escapeHtml(tableName)}" data-key="${escapeHtml(column.key)}">${escapeHtml(column.label)}<span>${arrow}</span></button></th>`;
        }).join("")}
      </tr>
    `;
    elements.head.querySelectorAll(".table-sort-button").forEach((button) => {
      button.addEventListener("click", () => {
        const key = button.dataset.key;
        const currentState = tableState[tableName];
        if (currentState.sortKey === key) {
          currentState.sortDir = currentState.sortDir === "asc" ? "desc" : "asc";
        } else {
          currentState.sortKey = key;
          currentState.sortDir = "asc";
        }
        loadTable(tableName);
      });
    });

    elements.body.innerHTML = payload.rows.map((row) => `
      <tr>
        ${payload.columns.map((column) => `<td class="${tableCellClass(tableName, column.key)}">${escapeHtml(formatTableCell(tableName, column.key, row[column.key]))}</td>`).join("")}
      </tr>
    `).join("");

    if (payload.rows.length === 0) {
      elements.body.innerHTML = `
        <tr>
          <td colspan="${payload.columns.length}">Nenhum registro encontrado.</td>
        </tr>
      `;
    }

    const shown = formatNumber.format(payload.rows.length);
    const total = formatNumber.format(payload.total_filtrado);
    const all = formatNumber.format(payload.total_registros);
    elements.status.textContent = `${payload.empresa}: exibindo ${shown} de ${total} encontrados (${all} registros no cadastro).`;
    tableState[tableName].loaded = true;
    tableState[tableName].cacheKey = requestKey;
    if (tableName === "stock") {
      await loadStockSummary();
    }
  } catch (error) {
    elements.status.textContent = error.message;
    elements.head.innerHTML = "";
    elements.body.innerHTML = "";
  }
}

async function loadStockSummary(selectedCompany) {
  const company = selectedCompany
    || document.getElementById("stock-table-company")?.value
    || document.getElementById("stock-company-select")?.value
    || "ionlab";
  const totalSku = document.getElementById("stock-total-sku");
  const totalValue = document.getElementById("stock-total-value");
  const costStatus = document.getElementById("stock-cost-status");
  if (!totalSku || !totalValue) {
    return;
  }

  try {
    const payload = await fetchJson(`/api/stock-summary?company=${encodeURIComponent(company)}`);
    totalSku.textContent = formatNumber.format(payload.total_sku || 0);
    totalValue.textContent = formatCurrency3.format(payload.valor_total_estoque || 0);
    if (costStatus) {
      costStatus.textContent = `Com custo: ${formatNumber.format(payload.sku_com_custo || 0)} | Sem custo: ${formatNumber.format(payload.sku_sem_custo || 0)}`;
    }
  } catch (error) {
    totalSku.textContent = "0";
    totalValue.textContent = "R$ 0,000";
    if (costStatus) {
      costStatus.textContent = "Com custo: 0 | Sem custo: 0";
    }
  }
}

function scheduleTableLoad(tableName) {
  clearTimeout(tableState[tableName].timer);
  tableState[tableName].timer = setTimeout(() => loadTable(tableName), 250);
}

function renderVendorAccessOptions(selected = null) {
  const container = document.getElementById("vendor-access-options");
  if (!container) {
    return;
  }

  const defaultCompany = document.getElementById("vendors-company")?.value || "ionlab";
  const selectedCompanies = selected || [defaultCompany];
  container.innerHTML = companies.map((company) => `
    <label class="check-option">
      <input type="checkbox" value="${escapeHtml(company.id)}" ${selectedCompanies.includes(company.id) ? "checked" : ""}>
      <span>${escapeHtml(company.name)}</span>
    </label>
  `).join("");
}

function selectedVendorAccess() {
  return Array.from(document.querySelectorAll("#vendor-access-options input:checked"))
    .map((input) => input.value);
}

function vendorStorageKey(company) {
  return `crm-vendedores-${company}`;
}

function normalizeSearchText(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[ß]/g, "SS")
    .replace(/[Ææ]/g, "AE")
    .replace(/[Œœ]/g, "OE")
    .replace(/[Øø]/g, "O")
    .replace(/[Ðð]/g, "D")
    .replace(/[Þþ]/g, "TH")
    .replace(/[Ll]/g, "L")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Z0-9]/gi, "")
    .toUpperCase();
}

const searchStopWords = new Set(["A", "O", "OS", "AS", "E", "DE", "DA", "DO", "DAS", "DOS", "PARA", "POR", "COM"]);

function normalizeSearchTokens(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[ß]/g, "SS")
    .replace(/[Ææ]/g, "AE")
    .replace(/[Œœ]/g, "OE")
    .replace(/[Øø]/g, "O")
    .replace(/[Ðð]/g, "D")
    .replace(/[Þþ]/g, "TH")
    .replace(/[Ll]/g, "L")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^A-Z0-9]+/i)
    .map((token) => normalizeSearchText(token))
    .filter((token) => token && !searchStopWords.has(token));
}

function searchTextMatches(query, value) {
  const queryKey = normalizeSearchText(query);
  if (!queryKey) {
    return true;
  }
  const valueKey = normalizeSearchText(value);
  if (valueKey.includes(queryKey)) {
    return true;
  }
  const tokens = normalizeSearchTokens(query);
  return tokens.length > 0 && tokens.every((token) => valueKey.includes(token));
}

function normalizeLocalText(value) {
  return normalizeSearchText(value);
}

function localVendorId(company, name) {
  return `${company}-${normalizeLocalText(name).toLowerCase().slice(0, 48)}`;
}

function localVendorRows(company) {
  const stored = localStorage.getItem(vendorStorageKey(company));
  if (stored) {
    return JSON.parse(stored);
  }

  const rows = (vendorSeedNames[company] || []).map((name) => ({
    id: localVendorId(company, name),
    nome_completo: name,
    telefone: "",
    whatsapp: "",
    email: "",
    foto_vendedor: "",
    login_acesso: "",
    senha_acesso: "",
    tipo_usuario: "Vendedor",
    status: "Inativo",
    empresas_acesso: [company],
    empresas_acesso_nomes: companies.find((item) => item.id === company)?.name || company,
    clientes_atendidos: { ufs: [], cidades: [], clientes_especificos: [] },
    origem: "Notas fiscais",
  }));
  localStorage.setItem(vendorStorageKey(company), JSON.stringify(rows));
  return rows;
}

function saveLocalVendorRows(company, rows) {
  localStorage.setItem(vendorStorageKey(company), JSON.stringify(rows));
}

function localUserRows() {
  const stored = localStorage.getItem("crm-usuarios-cache");
  return stored ? JSON.parse(stored) : [];
}

async function loadVendorLinkedUserOptions(selectedUserId = "") {
  const select = document.getElementById("vendor-linked-user");
  if (!select) {
    return;
  }
  let users = currentUsersPayload?.rows || [];
  if (!users.length) {
    try {
      const payload = await fetchJson("/api/users?q=");
      users = payload.rows || [];
      currentUsersPayload = payload;
      localStorage.setItem("crm-usuarios-cache", JSON.stringify(users));
    } catch (error) {
      users = localUserRows();
    }
  }
  select.innerHTML = '<option value="">Selecione um usuário cadastrado</option>' + users
    .filter((user) => (user.status || "Ativo") === "Ativo")
    .map((user) => `<option value="${escapeHtml(user.id || "")}">${escapeHtml(`${user.id || ""} - ${user.nome || user.login || ""} (${user.login || "sem login"})`)}</option>`)
    .join("");
  select.value = selectedUserId || "";
}

function localVendorsPayload(company, query = "") {
  const rows = localVendorRows(company);
  const normalizedQuery = normalizeLocalText(query);
  const enriched = rows.map((row) => ({
    ...row,
    acesso_configurado: row.senha_acesso ? "Configurado" : "Pendente",
    empresas_acesso_nomes: (row.empresas_acesso || [])
      .map((companyId) => companies.find((item) => item.id === companyId)?.name || companyId)
      .join(", "),
  }));
  const matches = enriched.filter((row) => !normalizedQuery || searchTextMatches(normalizedQuery, Object.values(row).join(" ")));

  return {
    empresa: companies.find((item) => item.id === company)?.name || company,
    total_registros: rows.length,
    total_filtrado: matches.length,
    ativos: rows.filter((row) => row.status === "Ativo").length,
    inativos: rows.filter((row) => row.status !== "Ativo").length,
    columns: [
      { key: "foto_vendedor", label: "Foto" },
      { key: "status", label: "Status" },
      { key: "tipo_usuario", label: "Tipo usuario" },
      { key: "nome_completo", label: "Nome completo" },
      { key: "usuario_vinculado_nome", label: "Usuario vinculado" },
      { key: "login_acesso", label: "Login" },
      { key: "acesso_configurado", label: "Acesso" },
      { key: "telefone", label: "Telefone" },
      { key: "whatsapp", label: "WhatsApp" },
      { key: "email", label: "Email" },
      { key: "empresas_acesso_nomes", label: "Empresas de acesso" },
      { key: "origem", label: "Origem" },
    ],
    rows: matches,
  };
}

function localVendorAssignedUfs(company) {
  const assigned = new Map();
  localVendorRows(company).forEach((vendor) => {
    (vendor.clientes_atendidos?.ufs || []).forEach((uf) => {
      const ufKey = String(uf || "").trim().toUpperCase();
      if (!ufKey) {
        return;
      }
      const names = assigned.get(ufKey) || [];
      if (vendor.nome_completo && !names.includes(vendor.nome_completo)) {
        names.push(vendor.nome_completo);
      }
      assigned.set(ufKey, names);
    });
  });
  return Array.from(assigned.entries()).map(([uf, vendors]) => ({ uf, vendors: vendors.sort() }));
}

function saveLocalVendor(payload) {
  if (!["master", "supervisor"].includes(payload.actor_role)) {
    throw new Error("Somente Usuario Master ou Vendedor Lider/Supervisor pode incluir ou alterar vendedores.");
  }

  const company = payload.company;
  const rows = localVendorRows(company);
  const name = payload.nome_completo.trim();
  const id = payload.id || localVendorId(company, name);
  let row = rows.find((item) => item.id === id || normalizeLocalText(item.nome_completo) === normalizeLocalText(name));

  if (!row) {
    row = { id, origem: "Cadastro manual" };
    rows.push(row);
  }

  Object.assign(row, {
    id: row.id || id,
    nome_completo: name,
    telefone: payload.telefone,
    whatsapp: payload.whatsapp,
    email: payload.email,
    foto_vendedor: payload.foto_vendedor || row.foto_vendedor || "",
    login_acesso: payload.login_acesso,
    usuario_vinculado_id: payload.usuario_vinculado_id,
    usuario_vinculado_nome: payload.usuario_vinculado_nome,
    tipo_usuario: payload.tipo_usuario === "Vendedor Lider/Supervisor" ? "Vendedor Lider/Supervisor" : "Vendedor",
    status: payload.status === "Ativo" ? "Ativo" : "Inativo",
    empresas_acesso: payload.empresas_acesso.length ? payload.empresas_acesso : [company],
    clientes_atendidos: payload.clientes_atendidos || { ufs: [], cidades: [], clientes_especificos: [] },
    origem: row.origem || "Cadastro manual",
  });
  if (payload.senha_acesso) {
    row.senha_acesso = payload.senha_acesso;
  }
  row.acesso_configurado = row.senha_acesso ? "Configurado" : "Pendente";

  rows.sort((a, b) => normalizeLocalText(a.nome_completo).localeCompare(normalizeLocalText(b.nome_completo)));
  saveLocalVendorRows(company, rows);
  return { message: "Vendedor salvo com sucesso." };
}

function blockReasonsStorageKey() {
  return "crm-motivos-bloqueio";
}

function defaultBlockReasons() {
  return [
    { id: "financeiro", motivo: "Financeiro" },
    { id: "solicitacao-diretoria", motivo: "Solicitação Diretoria" },
    { id: "empresa-encerrada", motivo: "Empresa Encerrada" },
  ];
}

function localBlockReasons() {
  const stored = localStorage.getItem(blockReasonsStorageKey());
  if (stored) {
    return JSON.parse(stored);
  }
  const rows = defaultBlockReasons();
  localStorage.setItem(blockReasonsStorageKey(), JSON.stringify(rows));
  return rows;
}

function saveLocalBlockReasons(rows) {
  localStorage.setItem(blockReasonsStorageKey(), JSON.stringify(rows));
}

function blockedStorageKey(company) {
  return `crm-clientes-bloqueados-${company}`;
}

function localBlockedRows(company) {
  const stored = localStorage.getItem(blockedStorageKey(company));
  return stored ? JSON.parse(stored) : [];
}

function saveLocalBlockedRows(company, rows) {
  localStorage.setItem(blockedStorageKey(company), JSON.stringify(rows));
}

function blockedColumns() {
  return [
    { key: "codigo_cliente", label: "Codigo" },
    { key: "nome_cliente", label: "Cliente" },
    { key: "motivo", label: "Motivo" },
    { key: "empresa_nome", label: "Empresa" },
    { key: "bloqueado_em", label: "Bloqueado em" },
  ];
}

function localBlockedPayload(company, query = "") {
  const companyName = companies.find((item) => item.id === company)?.name || company;
  const rows = localBlockedRows(company).map((row) => ({ ...row, empresa_nome: companyName }));
  const normalizedQuery = normalizeLocalText(query);
  const matches = rows.filter((row) => !normalizedQuery || searchTextMatches(normalizedQuery, Object.values(row).join(" ")));
  return {
    empresa: companyName,
    total_registros: rows.length,
    total_filtrado: matches.length,
    columns: blockedColumns(),
    rows: matches,
  };
}

async function localClientLookup(company, code) {
  const payload = await fetchJson(`/api/table/clients?company=${encodeURIComponent(company)}&q=${encodeURIComponent(code)}&limit=500`);
  const normalizedCode = normalizeLocalText(code);
  const client = payload.rows.find((row) => normalizeLocalText(row.ID) === normalizedCode);
  if (!client) {
    throw new Error("Cliente nao encontrado nesta empresa.");
  }
  return {
    codigo_cliente: client.ID,
    nome_cliente: client.NOM,
    cidade: client.CID,
    uf: client.UF,
  };
}

async function localClientSearch(company, query) {
  const payload = await fetchJson(`/api/table/clients?company=${encodeURIComponent(company)}&q=${encodeURIComponent(query)}&limit=20`);
  return {
    clients: payload.rows.map((client) => ({
      id: client.ID,
      name: client.NOM,
      city: client.CID,
      uf: client.UF,
      label: `${client.ID} - ${client.NOM}`,
    })),
  };
}

function renderBlockReasons() {
  const select = document.getElementById("blocked-reason");
  if (!select) {
    return;
  }
  select.innerHTML = '<option value="">Selecione</option>' + blockReasons
    .map((reason) => `<option value="${escapeHtml(reason.motivo)}">${escapeHtml(reason.motivo)}</option>`)
    .join("");
}

async function loadBlockReasons() {
  try {
    const payload = await fetchJson("/api/block-reasons");
    blockReasons = payload.rows;
  } catch (error) {
    blockReasons = localBlockReasons();
  }
  renderBlockReasons();
}

async function addBlockReason(event) {
  event.preventDefault();
  const input = document.getElementById("new-block-reason");
  const status = document.getElementById("block-reason-status");
  const reason = input.value.trim();
  if (!reason) {
    status.textContent = "Informe o novo motivo.";
    return;
  }

  try {
    const payload = await fetchJson("/api/block-reasons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ motivo: reason }),
    });
    status.textContent = payload.message;
    input.value = "";
    await loadBlockReasons();
  } catch (error) {
    const rows = localBlockReasons();
    const exists = rows.some((item) => normalizeLocalText(item.motivo) === normalizeLocalText(reason));
    if (!exists) {
      rows.push({ id: normalizeLocalText(reason).toLowerCase(), motivo: reason });
      rows.sort((a, b) => normalizeLocalText(a.motivo).localeCompare(normalizeLocalText(b.motivo)));
      saveLocalBlockReasons(rows);
    }
    blockReasons = rows;
    renderBlockReasons();
    input.value = "";
    status.textContent = "Motivo salvo com sucesso. Base local ativa ate o servidor reiniciar a rota de bloqueios.";
  }
}

function renderBlockedPayload(payload) {
  document.getElementById("blocked-head").innerHTML = `
    <tr>${payload.columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}</tr>
  `;
  document.getElementById("blocked-body").innerHTML = payload.rows.map((row) => `
    <tr>${payload.columns.map((column) => `<td>${escapeHtml(formatCell(row[column.key]))}</td>`).join("")}</tr>
  `).join("") || `
    <tr><td colspan="${payload.columns.length}">Nenhum cliente bloqueado encontrado.</td></tr>
  `;
  document.getElementById("blocked-status").textContent =
    `${payload.empresa}: ${formatNumber.format(payload.total_filtrado)} bloqueios encontrados.`;
}

async function loadBlockedClients() {
  const company = document.getElementById("blocked-company").value || "ionlab";
  const query = document.getElementById("blocked-search").value.trim();
  const status = document.getElementById("blocked-status");
  status.textContent = "Carregando bloqueios...";

  try {
    const payload = await fetchJson(`/api/blocked-clients?company=${encodeURIComponent(company)}&q=${encodeURIComponent(query)}`);
    renderBlockedPayload(payload);
  } catch (error) {
    const payload = localBlockedPayload(company, query);
    renderBlockedPayload(payload);
    status.textContent += " Base local ativa ate o servidor reiniciar a rota de bloqueios.";
  }
}

function scheduleBlockedLoad() {
  clearTimeout(blockedTimer);
  blockedTimer = setTimeout(loadBlockedClients, 250);
}

function setBlockedClient(client) {
  currentBlockedClient = {
    codigo_cliente: client.id || client.codigo_cliente,
    nome_cliente: client.name || client.nome_cliente,
    cidade: client.city || client.cidade,
    uf: client.uf,
  };
  document.getElementById("blocked-client-code").value =
    `${currentBlockedClient.codigo_cliente} - ${currentBlockedClient.nome_cliente}`;
  const nameBox = document.getElementById("blocked-client-name");
  nameBox.textContent = `${currentBlockedClient.nome_cliente} - ${currentBlockedClient.cidade || ""} ${currentBlockedClient.uf || ""}`;
  nameBox.classList.add("found");
  nameBox.classList.remove("missing");
  document.getElementById("blocked-client-suggestions").classList.remove("visible");
}

async function searchBlockedClients() {
  const query = document.getElementById("blocked-client-code").value.trim();
  const suggestions = document.getElementById("blocked-client-suggestions");
  const company = document.getElementById("blocked-company").value || "ionlab";

  if (query.length < 2) {
    suggestions.classList.remove("visible");
    suggestions.innerHTML = "";
    return;
  }

  let payload;
  try {
    payload = await fetchJson(`/api/prospect/clients?company=${encodeURIComponent(company)}&q=${encodeURIComponent(query)}`);
  } catch (error) {
    payload = await localClientSearch(company, query);
  }

  suggestions.innerHTML = payload.clients.map((client) => `
    <button class="prospect-suggestion" type="button"
      data-client-id="${escapeHtml(client.id)}"
      data-client-name="${escapeHtml(client.name)}"
      data-client-city="${escapeHtml(client.city || "")}"
      data-client-uf="${escapeHtml(client.uf || "")}">
      <strong>${escapeHtml(client.label || `${client.id} - ${client.name}`)}</strong>
      <span>${escapeHtml(client.city || "")} ${escapeHtml(client.uf || "")}</span>
    </button>
  `).join("");
  suggestions.classList.toggle("visible", payload.clients.length > 0);

  suggestions.querySelectorAll(".prospect-suggestion").forEach((button) => {
    button.addEventListener("click", () => setBlockedClient({
      id: button.dataset.clientId,
      name: button.dataset.clientName,
      city: button.dataset.clientCity,
      uf: button.dataset.clientUf,
    }));
  });
}

function scheduleBlockedClientSearch() {
  clearTimeout(blockedClientSearchTimer);
  blockedClientSearchTimer = setTimeout(searchBlockedClients, 220);
}

async function lookupBlockedClient() {
  const company = document.getElementById("blocked-company").value || "ionlab";
  const code = document.getElementById("blocked-client-code").value.trim();
  const nameBox = document.getElementById("blocked-client-name");
  currentBlockedClient = null;

  if (!code) {
    nameBox.textContent = "Digite o codigo para localizar o cliente.";
    nameBox.classList.remove("found", "missing");
    return;
  }

  nameBox.textContent = "Localizando cliente...";
  try {
    currentBlockedClient = await fetchJson(`/api/client-lookup?company=${encodeURIComponent(company)}&code=${encodeURIComponent(code)}`);
  } catch (error) {
    try {
      currentBlockedClient = await localClientLookup(company, code);
    } catch (lookupError) {
      nameBox.textContent = lookupError.message;
      nameBox.classList.remove("found");
      nameBox.classList.add("missing");
      return;
    }
  }

  nameBox.textContent = `${currentBlockedClient.nome_cliente} - ${currentBlockedClient.cidade || ""} ${currentBlockedClient.uf || ""}`;
  nameBox.classList.add("found");
  nameBox.classList.remove("missing");
}

async function saveBlockedClient(event) {
  event.preventDefault();
  const company = document.getElementById("blocked-company").value || "ionlab";
  let code = document.getElementById("blocked-client-code").value.trim();
  const reason = document.getElementById("blocked-reason").value;
  const status = document.getElementById("blocked-form-status");

  if (!currentBlockedClient) {
    await lookupBlockedClient();
  }
  if (!currentBlockedClient) {
    status.textContent = "Selecione um cliente valido antes de bloquear.";
    return;
  }
  code = currentBlockedClient.codigo_cliente;

  try {
    const payload = await fetchJson("/api/blocked-clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, codigo_cliente: code, motivo: reason }),
    });
    status.textContent = payload.message;
    await loadBlockedClients();
  } catch (error) {
    const rows = localBlockedRows(company);
    const companyName = companies.find((item) => item.id === company)?.name || company;
    const existing = rows.find((row) => normalizeLocalText(row.codigo_cliente) === normalizeLocalText(code));
    const row = existing || {};
    Object.assign(row, {
      codigo_cliente: currentBlockedClient.codigo_cliente,
      nome_cliente: currentBlockedClient.nome_cliente,
      motivo: reason,
      empresa_nome: companyName,
      bloqueado_em: new Date().toISOString(),
    });
    if (!existing) {
      rows.push(row);
    }
    rows.sort((a, b) => normalizeLocalText(a.nome_cliente).localeCompare(normalizeLocalText(b.nome_cliente)));
    saveLocalBlockedRows(company, rows);
    status.textContent = "Cliente bloqueado com sucesso. Base local ativa ate o servidor reiniciar a rota de bloqueios.";
    await loadBlockedClients();
  }
}

async function loadBlockedPage() {
  await loadBlockReasons();
  await loadBlockedClients();
}

function renderVendorPhotoPreview(photo) {
  const preview = document.getElementById("vendor-photo-preview");
  if (!preview) {
    return;
  }
  preview.innerHTML = photo
    ? `<img src="${escapeHtml(photo)}" alt="Foto do vendedor">`
    : "Sem foto";
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Nao foi possivel ler a foto."));
    reader.readAsDataURL(file);
  });
}

async function updateVendorPhotoPreview() {
  const file = document.getElementById("vendor-photo").files[0];
  if (!file) {
    renderVendorPhotoPreview(document.getElementById("vendor-current-photo").value);
    return;
  }
  const photo = await readFileAsDataUrl(file);
  document.getElementById("vendor-current-photo").value = photo;
  renderVendorPhotoPreview(photo);
}

function canManageVendors() {
  return ["master", "supervisor"].includes(document.getElementById("vendor-actor-role")?.value || "vendedor");
}

function applyVendorPermissionState() {
  const form = document.getElementById("vendor-form");
  const allowed = canManageVendors();
  form.classList.toggle("locked", !allowed);
  form.querySelectorAll("input, select, button").forEach((field) => {
    if (field.id === "vendor-actor-role") {
      return;
    }
    field.disabled = !allowed;
  });
  const status = document.getElementById("vendor-form-status");
  if (!allowed) {
    status.innerHTML = '<span class="permission-note">Somente Usuario Master ou Vendedor Lider/Supervisor pode incluir ou alterar vendedores.</span>';
  } else if (status.textContent.includes("Somente Usuario Master")) {
    status.textContent = "";
  }
}

function setVendorTab(tabName) {
  document.querySelectorAll(".vendor-form-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.vendorTab === tabName);
  });
  document.querySelectorAll(".vendor-tab-panel").forEach((panel) => {
    panel.classList.toggle("visible", panel.id === `${tabName}-panel`);
  });
}

function normalizeAssignments(assignments = {}) {
  return {
    ufs: Array.isArray(assignments.ufs) ? assignments.ufs : [],
    cidades: Array.isArray(assignments.cidades) ? assignments.cidades : [],
    clientes_especificos: Array.isArray(assignments.clientes_especificos) ? assignments.clientes_especificos : [],
  };
}

function renderVendorUfOptions(selected = []) {
  const container = document.getElementById("vendor-uf-options");
  if (!container) {
    return;
  }
  const selectedSet = new Set((selected || []).map((uf) => String(uf || "").trim().toUpperCase()));
  const ufs = vendorAssignmentOptions.ufs?.length ? vendorAssignmentOptions.ufs : brazilUfs;
  const assignedMap = new Map((vendorAssignmentOptions.assigned_ufs || []).map((item) => [
    String(item.uf || "").trim().toUpperCase(),
    item.vendors || [],
  ]));
  currentVendors.forEach((vendor) => {
    if (vendor.id === document.getElementById("vendor-id")?.value) {
      return;
    }
    (vendor.clientes_atendidos?.ufs || []).forEach((uf) => {
      const ufKey = String(uf || "").trim().toUpperCase();
      if (!ufKey) {
        return;
      }
      const names = assignedMap.get(ufKey) || [];
      if (vendor.nome_completo && !names.includes(vendor.nome_completo)) {
        names.push(vendor.nome_completo);
      }
      assignedMap.set(ufKey, names);
    });
  });
  container.innerHTML = ufs.map((uf) => `
    <label class="check-option ${selectedSet.has(uf) ? "uf-selected-current" : ""} ${assignedMap.has(uf) ? "uf-assigned" : ""}" title="${escapeHtml((assignedMap.get(uf) || []).join(", "))}">
      <input type="checkbox" value="${escapeHtml(uf)}" ${selectedSet.has(uf) ? "checked" : ""}>
      <span>${escapeHtml(uf)}</span>
    </label>
  `).join("");
  container.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", async () => {
      const selectedUfSet = new Set(selectedVendorUfs());
      currentVendorAssignments.ufs = Array.from(selectedUfSet);
      renderVendorUfSummary();
      const removedCities = currentVendorAssignments.cidades.filter((city) =>
        selectedUfSet.size > 0 && !selectedUfSet.has(String(city.uf || "").trim().toUpperCase())
      );
      vendorUnassignedCities.push(...removedCities);
      currentVendorAssignments.cidades = currentVendorAssignments.cidades.filter((city) =>
        selectedUfSet.size === 0 || selectedUfSet.has(String(city.uf || "").trim().toUpperCase())
      );
      renderVendorCitySelect();
      renderVendorAssignmentLists();
      await autoSaveVendorAssignments("UF atualizada e salva automaticamente.");
    });
  });
  renderVendorUfSummary();
}

function selectedVendorUfs() {
  return Array.from(document.querySelectorAll("#vendor-uf-options input:checked"))
    .map((input) => String(input.value || "").trim().toUpperCase())
    .filter(Boolean);
}

function renderVendorUfSummary() {
  const target = document.getElementById("vendor-selected-uf-summary");
  if (!target) {
    return;
  }
  const ufs = selectedVendorUfs();
  target.textContent = ufs.length ? ufs.join(", ") : "Nenhuma UF";
}

function vendorCityAlreadyAdded(city) {
  return currentVendorAssignments.cidades.some((item) =>
    item.uf === city.uf && normalizeLocalText(item.cidade) === normalizeLocalText(city.cidade)
  );
}

function renderAssignedVendorCitySelect() {
  const select = document.getElementById("vendor-assigned-city-select");
  if (!select) {
    return;
  }
  select.innerHTML = currentVendorAssignments.cidades.map((city, index) => {
    const dddText = city.ddds?.length ? ` - DDD ${city.ddds.join(", ")}` : "";
    return `<option value="${index}">${escapeHtml(city.uf)} - ${escapeHtml(city.cidade)}${escapeHtml(dddText)}</option>`;
  }).join("") || '<option value="">Nenhuma cidade cadastrada para este vendedor</option>';
}

function renderVendorCitySelect() {
  const select = document.getElementById("vendor-city-select");
  if (!select) {
    return;
  }
  const selectedUfs = selectedVendorUfs();
  currentVendorCitySelectOptions = availableVendorCityOptions(selectedUfs);

  select.innerHTML = '<option value="all">Todas</option>'
    + currentVendorCitySelectOptions.map((city, index) => {
    const dddText = city.ddds?.length ? ` - DDD ${city.ddds.join(", ")}` : "";
    const added = vendorCityAlreadyAdded(city);
    const addedClass = added ? ' class="city-option-added"' : "";
    const addedText = added ? " - JA ADICIONADA" : "";
    return `<option value="${index}"${addedClass}>${escapeHtml(city.uf)} - ${escapeHtml(city.cidade)}${escapeHtml(dddText)}${addedText}</option>`;
  }).join("");
  renderVendorDddOptions();
  renderAvailableVendorCities();
  renderAssignedVendorCitySelect();
}

function renderVendorDddOptions() {
  const box = document.getElementById("vendor-ddd-box");
  const select = document.getElementById("vendor-city-select");
  if (!box || !select) {
    return;
  }
  const values = Array.from(select.selectedOptions).map((option) => option.value);
  const city = values.length === 1 && values[0] !== "all"
    ? currentVendorCitySelectOptions[Number(values[0])]
    : null;
  if (!city || !city.exige_ddd) {
    box.classList.remove("visible");
    box.innerHTML = "";
    return;
  }
  box.classList.add("visible");
  box.innerHTML = `
    <span class="muted">Esta cidade possui mais de um DDD. Selecione o atendimento deste vendedor.</span>
    ${city.ddds.map((ddd) => `
      <label class="check-option">
        <input type="checkbox" value="${escapeHtml(ddd)}">
        <span>DDD ${escapeHtml(ddd)}</span>
      </label>
    `).join("")}
  `;
}

function vendorCityKey(city) {
  return `${String(city.uf || "").trim().toUpperCase()}|${normalizeLocalText(city.cidade)}`;
}

function assignedCitiesFromVendors(vendors = currentVendors) {
  const rows = [];
  (vendors || []).forEach((vendor) => {
    (vendor.clientes_atendidos?.cidades || []).forEach((city) => {
      rows.push({
        vendor_id: vendor.id,
        vendor_name: vendor.nome_completo || "",
        uf: city.uf,
        cidade: city.cidade,
        ddds: city.ddds || [],
      });
    });
  });
  return rows;
}

function cityAssignedDdds(city, excludeVendorId = "") {
  const key = vendorCityKey(city);
  const assigned = new Set();
  let fullCityAssigned = false;
  const assignedRows = vendorAssignmentOptions.assigned_cities?.length
    ? vendorAssignmentOptions.assigned_cities
    : assignedCitiesFromVendors();
  assignedRows.forEach((item) => {
    if (item.vendor_id === excludeVendorId) {
      return;
    }
    if (vendorCityKey(item) !== key) {
      return;
    }
    const ddds = (item.ddds || []).map((ddd) => String(ddd || "").trim()).filter(Boolean);
    if (!ddds.length) {
      fullCityAssigned = true;
    }
    ddds.forEach((ddd) => assigned.add(ddd));
  });
  return { assigned, fullCityAssigned };
}

function availableVendorCityOptions(selectedUfs = selectedVendorUfs(), excludeCurrentVendor = true) {
  const selectedUfSet = new Set(selectedUfs);
  const currentVendorId = excludeCurrentVendor ? (document.getElementById("vendor-id")?.value || "") : "";
  return (vendorAssignmentOptions.cities || [])
    .filter((city) => selectedUfSet.size === 0 || selectedUfSet.has(city.uf))
    .map((city, index) => {
      const { assigned, fullCityAssigned } = cityAssignedDdds(city, currentVendorId);
      const ddds = (city.ddds || []).map((ddd) => String(ddd || "").trim()).filter(Boolean);
      const freeDdds = fullCityAssigned ? [] : ddds.filter((ddd) => !assigned.has(ddd));
      const cityWithoutDddIsFree = !fullCityAssigned && !ddds.length && !assigned.size;
      const available = ddds.length ? freeDdds.length > 0 : cityWithoutDddIsFree;
      return {
        ...city,
        ddds: ddds.length ? freeDdds : [],
        exige_ddd: freeDdds.length > 1,
        originalIndex: index,
        available,
      };
    })
    .filter((city) => city.available);
}

function cityAssignedToVendor(city, vendorId = document.getElementById("vendor-id")?.value || "") {
  const key = vendorCityKey(city);
  return (vendorAssignmentOptions.assigned_cities || assignedCitiesFromVendors()).find((item) =>
    item.vendor_id === vendorId && vendorCityKey(item) === key
  );
}

function renderExcludedVendorCities() {
  const list = document.getElementById("vendor-excluded-city-list");
  const status = document.getElementById("vendor-excluded-city-status");
  if (!list || !status) {
    return;
  }
  const selectedUfSet = new Set(selectedVendorUfs());
  if (!selectedUfSet.size) {
    status.textContent = "Selecione uma UF para visualizar.";
    list.innerHTML = '<div class="client-found">Nenhuma UF selecionada.</div>';
    return;
  }
  const vendorCityKeys = new Set(currentVendorAssignments.cidades.map((city) => vendorCityKey(city)));
  const rows = (vendorAssignmentOptions.cities || [])
    .filter((city) => selectedUfSet.has(city.uf))
    .filter((city) => !vendorCityKeys.has(vendorCityKey(city)))
    .map((city) => {
      const assignedTo = (vendorAssignmentOptions.assigned_cities || assignedCitiesFromVendors())
        .filter((item) => item.vendor_id !== (document.getElementById("vendor-id")?.value || "") && vendorCityKey(item) === vendorCityKey(city))
        .map((item) => item.vendor_name)
        .filter(Boolean);
      const available = availableVendorCityOptions([city.uf]).some((item) => vendorCityKey(item) === vendorCityKey(city));
      return { ...city, assignedTo, available };
    })
    .sort((a, b) => `${a.uf}${normalizeLocalText(a.cidade)}`.localeCompare(`${b.uf}${normalizeLocalText(b.cidade)}`));
  status.textContent = `${formatNumber.format(rows.length)} cidade(s) fora da carteira deste vendedor nas UFs selecionadas.`;
  list.innerHTML = rows.slice(0, 300).map((city) => {
    const dddText = city.ddds?.length ? `DDD ${city.ddds.join(", ")}` : "Sem DDD";
    const ownerText = city.assignedTo.length
      ? `Com outro vendedor: ${city.assignedTo.join(", ")}`
      : (city.available ? "Disponível para seleção" : "Sem vendedor definido");
    return `
      <div class="assignment-item ${city.assignedTo.length ? "pending" : "available"}">
        <div><strong>${escapeHtml(city.cidade)} - ${escapeHtml(city.uf)}</strong><span>${escapeHtml(`${dddText} | ${ownerText}`)}</span></div>
      </div>
    `;
  }).join("") || '<div class="client-found">Nenhuma cidade excluída para as UFs selecionadas.</div>';
}

function renderAvailableVendorCities() {
  const ufFilter = document.getElementById("vendor-available-uf-filter");
  const list = document.getElementById("vendor-available-city-list");
  if (!ufFilter || !list) {
    return;
  }
  const selected = ufFilter.value;
  const ufsWithCities = Array.from(new Set(availableVendorCityOptions([], false).map((city) => city.uf))).sort();
  ufFilter.innerHTML = '<option value="">Todas</option>'
    + ufsWithCities.map((uf) => `<option value="${escapeHtml(uf)}">${escapeHtml(uf)}</option>`).join("");
  if (selected && ufsWithCities.includes(selected)) {
    ufFilter.value = selected;
  }
  const filterUf = ufFilter.value;
  const rows = availableVendorCityOptions(filterUf ? [filterUf] : [], false);
  list.innerHTML = rows.slice(0, 250).map((city) => {
    const dddText = city.ddds?.length ? `DDD livre ${city.ddds.join(", ")}` : "Livre por cidade";
    return `
      <div class="assignment-item available">
        <div><strong>${escapeHtml(city.cidade)} - ${escapeHtml(city.uf)}</strong><span>${escapeHtml(dddText)}</span></div>
      </div>
    `;
  }).join("") || '<div class="client-found">Nenhuma UF/cidade disponivel sem vendedor.</div>';
  ufFilter.onchange = renderAvailableVendorCities;
  renderExcludedVendorCities();
}

function renderVendorAssignmentLists() {
  renderAssignedVendorCitySelect();
  renderExcludedVendorCities();
  const cityList = document.getElementById("vendor-city-list");
  const filterInput = document.getElementById("vendor-city-filter");
  const filterStatus = document.getElementById("vendor-city-filter-status");
  const query = normalizeLocalText(filterInput?.value || "");
  const filteredCities = currentVendorAssignments.cidades
    .map((city, index) => ({ ...city, assignmentIndex: index }))
    .filter((city) => {
      if (!query) {
        return true;
      }
      const dddText = (city.ddds || []).join(" ");
      return searchTextMatches(query, `${city.cidade} ${city.uf} ${dddText}`);
    });
  if (filterStatus) {
    filterStatus.textContent = query
      ? `Mostrando ${formatNumber.format(filteredCities.length)} de ${formatNumber.format(currentVendorAssignments.cidades.length)} cidades.`
      : `Mostrando ${formatNumber.format(currentVendorAssignments.cidades.length)} cidades.`;
  }
  cityList.innerHTML = filteredCities.map((city) => {
    const dddText = city.ddds?.length ? `DDD ${city.ddds.join(", ")}` : "Padrao cidade";
    return `
      <label class="assignment-item selectable">
        <input type="checkbox" data-select-city="${city.assignmentIndex}">
        <div><strong>${escapeHtml(city.cidade)} - ${escapeHtml(city.uf)}</strong><span>${escapeHtml(dddText)}</span></div>
      </label>
    `;
  }).join("") || '<div class="client-found">Nenhuma cidade encontrada para o filtro informado.</div>';

  const clientList = document.getElementById("vendor-specific-client-list");
  clientList.innerHTML = currentVendorAssignments.clientes_especificos.map((client, index) => `
    <div class="assignment-item">
      <div><strong>${escapeHtml(client.id)} - ${escapeHtml(client.name)}</strong><span>${escapeHtml(client.city || "")} ${escapeHtml(client.uf || "")}${client.ddd ? ` - DDD ${escapeHtml(client.ddd)}` : ""}</span></div>
      <button class="mini-action" type="button" data-remove-client="${index}">Remover</button>
    </div>
  `).join("") || '<div class="client-found">Nenhum cliente especifico selecionado.</div>';

  const unassignedList = document.getElementById("vendor-unassigned-city-list");
  if (unassignedList) {
    const unique = new Map();
    vendorUnassignedCities.forEach((city) => {
      const key = `${city.uf}|${normalizeLocalText(city.cidade)}|${(city.ddds || []).join(",")}`;
      unique.set(key, city);
    });
    vendorUnassignedCities = Array.from(unique.values());
    unassignedList.innerHTML = vendorUnassignedCities.map((city) => {
      const dddText = city.ddds?.length ? `DDD ${city.ddds.join(", ")}` : "Livre para selecao";
      return `
        <div class="assignment-item pending">
          <div><strong>${escapeHtml(city.cidade)} - ${escapeHtml(city.uf)}</strong><span>${escapeHtml(dddText)}</span></div>
        </div>
      `;
    }).join("") || '<div class="client-found">Nenhuma cidade liberada nesta edicao.</div>';
  }

  document.querySelectorAll("[data-remove-client]").forEach((button) => {
    button.addEventListener("click", async () => {
      currentVendorAssignments.clientes_especificos.splice(Number(button.dataset.removeClient), 1);
      renderVendorAssignmentLists();
      await autoSaveVendorAssignments("Cliente especifico removido e salvo automaticamente.");
    });
  });
}

function addVendorCityAssignment() {
  const select = document.getElementById("vendor-city-select");
  const values = Array.from(select.selectedOptions).map((option) => option.value);
  if (values.includes("all")) {
    addAllVisibleVendorCities();
    return;
  }

  const selectedIndexes = values
    .map((value) => Number(value))
    .filter((value) => Number.isInteger(value));
  if (selectedIndexes.length === 0) {
    return;
  }

  if (selectedIndexes.length > 1) {
    selectedIndexes.forEach((index) => {
      const city = currentVendorCitySelectOptions[index];
      if (city) {
        addVendorCity(city, city.ddds?.length ? city.ddds : []);
      }
    });
    renderVendorAssignmentLists();
    renderVendorCitySelect();
    document.getElementById("vendor-form-status").textContent =
      `${formatNumber.format(selectedIndexes.length)} cidades selecionadas foram adicionadas.`;
    autoSaveVendorAssignments("Cidades adicionadas e salvas automaticamente.");
    return;
  }

  const city = currentVendorCitySelectOptions[selectedIndexes[0]];
  if (!city) {
    return;
  }
  const selectedDdds = Array.from(document.querySelectorAll("#vendor-ddd-box input:checked")).map((input) => input.value);
  if (city.exige_ddd && selectedDdds.length === 0) {
    document.getElementById("vendor-form-status").textContent = "Selecione ao menos um DDD para esta cidade.";
    return;
  }
  const ddds = city.exige_ddd ? selectedDdds : (city.ddds?.length === 1 ? city.ddds : []);
  const exists = currentVendorAssignments.cidades.some((item) =>
    item.uf === city.uf && normalizeLocalText(item.cidade) === normalizeLocalText(city.cidade)
    && JSON.stringify(item.ddds || []) === JSON.stringify(ddds || [])
  );
  if (!exists) {
    currentVendorAssignments.cidades.push({ uf: city.uf, cidade: city.cidade, ddds });
  }
  renderVendorAssignmentLists();
  renderVendorCitySelect();
  autoSaveVendorAssignments("Cidade adicionada e salva automaticamente.");
}

function addVendorCity(city, ddds) {
  const exists = currentVendorAssignments.cidades.some((item) =>
    item.uf === city.uf && normalizeLocalText(item.cidade) === normalizeLocalText(city.cidade)
    && JSON.stringify(item.ddds || []) === JSON.stringify(ddds || [])
  );
  if (!exists) {
    currentVendorAssignments.cidades.push({ uf: city.uf, cidade: city.cidade, ddds });
  }
}

function addAllVisibleVendorCities() {
  const visibleCities = availableVendorCityOptions(selectedVendorUfs());

  visibleCities.forEach((city) => {
    const ddds = city.ddds?.length ? city.ddds : [];
    addVendorCity(city, ddds);
  });
  renderVendorAssignmentLists();
  renderVendorCitySelect();
  document.getElementById("vendor-form-status").textContent =
    `${formatNumber.format(visibleCities.length)} cidades adicionadas para o vendedor.`;
  autoSaveVendorAssignments("Cidades adicionadas e salvas automaticamente.");
}

async function removeSelectedVendorCities() {
  const selectedIndexes = Array.from(document.querySelectorAll("[data-select-city]:checked"))
    .map((input) => Number(input.dataset.selectCity))
    .filter((index) => Number.isInteger(index));
  if (!selectedIndexes.length) {
    document.getElementById("vendor-form-status").textContent = "Selecione uma ou mais cidades na lista do vendedor.";
    return;
  }
  const selectedSet = new Set(selectedIndexes);
  const removed = [];
  currentVendorAssignments.cidades = currentVendorAssignments.cidades.filter((city, index) => {
    if (selectedSet.has(index)) {
      removed.push(city);
      return false;
    }
    return true;
  });
  vendorUnassignedCities.push(...removed);
  renderVendorAssignmentLists();
  renderVendorCitySelect();
  await autoSaveVendorAssignments(`${formatNumber.format(removed.length)} cidade(s) removidas da lista do vendedor.`);
  await loadVendorAssignmentOptions();
  renderVendorUfOptions(currentVendorAssignments.ufs);
  renderVendorCitySelect();
  renderVendorAssignmentLists();
}

async function clearVendorAssignments() {
  if (!document.getElementById("vendor-id").value) {
    document.getElementById("vendor-form-status").textContent = "Selecione um vendedor salvo antes de limpar a carteira.";
    return;
  }
  vendorUnassignedCities.push(...currentVendorAssignments.cidades);
  currentVendorAssignments = {
    ...currentVendorAssignments,
    ufs: [],
    cidades: [],
  };
  renderVendorUfOptions([]);
  renderVendorCitySelect();
  renderVendorAssignmentLists();
  await autoSaveVendorAssignments("UFs e cidades limpas para este vendedor.");
}

async function loadVendorAssignmentOptions() {
  const company = document.getElementById("vendors-company").value || "ionlab";
  try {
    vendorAssignmentOptions = await fetchJson(`/api/vendors/assignment-options?company=${encodeURIComponent(company)}`);
    if (!Array.isArray(vendorAssignmentOptions.assigned_cities)) {
      try {
        const vendorsPayload = await fetchJson(`/api/vendors?company=${encodeURIComponent(company)}&q=`);
        vendorAssignmentOptions.assigned_cities = assignedCitiesFromVendors(vendorsPayload.rows || []);
      } catch (vendorError) {
        vendorAssignmentOptions.assigned_cities = assignedCitiesFromVendors();
      }
    }
  } catch (error) {
    try {
      const payload = await fetchJson(`/api/table/clients?company=${encodeURIComponent(company)}&q=&limit=500`);
      const blocked = localBlockedCodeSet(company);
      const cities = new Map();
      payload.rows
        .filter((client) => !blocked.has(normalizeLocalText(client.ID)) && !isLocalGroupCompanyClient(client))
        .forEach((client) => {
          const uf = String(client.UF || "").trim().toUpperCase();
          const cidade = String(client.CID || "").trim();
          if (!uf || !cidade) {
            return;
          }
          const key = `${uf}|${normalizeLocalText(cidade)}`;
          const entry = cities.get(key) || { uf, cidade, ddds: new Set(), clientes: 0 };
          const ddd = localDddFromClient(client);
          if (ddd) {
            entry.ddds.add(ddd);
          }
          entry.clientes += 1;
          cities.set(key, entry);
        });
      vendorAssignmentOptions = {
        ufs: brazilUfs,
        assigned_ufs: localVendorAssignedUfs(company),
        assigned_cities: assignedCitiesFromVendors(),
        cities: Array.from(cities.values())
          .map((city) => ({
            ...city,
            ddds: Array.from(city.ddds).sort(),
            exige_ddd: city.ddds.size > 1,
          }))
          .sort((a, b) => `${a.uf}${normalizeLocalText(a.cidade)}`.localeCompare(`${b.uf}${normalizeLocalText(b.cidade)}`)),
      };
    } catch (fallbackError) {
      vendorAssignmentOptions = { ufs: brazilUfs, assigned_ufs: [], assigned_cities: assignedCitiesFromVendors(), cities: [] };
    }
  }
  renderVendorUfOptions(currentVendorAssignments.ufs);
  renderVendorCitySelect();
}

function setVendorSpecificClient(client) {
  pendingVendorSpecificClient = client;
  document.getElementById("vendor-client-search").value = `${client.id} - ${client.name}`;
  document.getElementById("vendor-client-suggestions").classList.remove("visible");
  document.getElementById("vendor-form-status").textContent = "Cliente selecionado. Clique em Adicionar cliente para incluir na lista.";
}

const expandedRegionUfs = new Set();
const expandedRegionCities = new Set();
const expandedRegionDdds = new Set();
let currentRegionsVendorFilter = "all";

function regionRuleTimestamp(rule) {
  return String(rule?._atualizado_em || rule?._criado_em || "");
}

function regionLatestRule(predicate) {
  return [...(currentRegionsPayload?.rules || [])]
    .filter(predicate)
    .sort((a, b) => regionRuleTimestamp(a).localeCompare(regionRuleTimestamp(b)))
    .at(-1) || null;
}

function regionDirectOwner(scope, data) {
  const uf = data.uf || "";
  const cidadeKey = normalizeLocalText(data.cidade || "");
  const ddd = String(data.ddd || "");
  if (scope === "uf") {
    return regionLatestRule((rule) => rule.tipo === "uf" && rule.uf === uf)?.vendor_id || "";
  }
  if (scope === "cidade") {
    return regionLatestRule((rule) => rule.tipo === "cidade" && rule.uf === uf && normalizeLocalText(rule.cidade) === cidadeKey && !rule.ddd)?.vendor_id || "";
  }
  if (scope === "ddd") {
    return regionLatestRule((rule) => rule.tipo === "cidade" && rule.uf === uf && normalizeLocalText(rule.cidade) === cidadeKey && String(rule.ddd || "") === ddd)?.vendor_id || "";
  }
  if (scope === "cliente") {
    const clientId = normalizeLocalText(data.clienteId || data.cliente_id || "");
    return regionLatestRule((rule) => rule.tipo === "cliente" && normalizeLocalText(rule.cliente_id) === clientId)?.vendor_id || "";
  }
  return "";
}

function regionEffectiveOwner(scope, data) {
  if (scope === "uf") {
    return regionDirectOwner("uf", data);
  }
  if (scope === "cidade") {
    return regionDirectOwner("cidade", data) || regionDirectOwner("uf", data);
  }
  if (scope === "ddd") {
    return regionDirectOwner("ddd", data) || regionDirectOwner("cidade", data) || regionDirectOwner("uf", data);
  }
  if (scope === "cliente") {
    return regionDirectOwner("cliente", data) || regionDirectOwner("ddd", data) || regionDirectOwner("cidade", data) || regionDirectOwner("uf", data);
  }
  return "";
}

function regionVendorName(vendorId) {
  const vendor = (currentRegionsPayload?.vendors || []).find((item) => item.id === vendorId);
  return vendor?.nome_completo || "Sem vendedor";
}

function regionVendorSelect(scope, data, ownerId, settings = {}) {
  const vendorOptions = ['<option value="">Sem vendedor</option>'].concat((currentRegionsPayload?.vendors || []).map((vendor) =>
    `<option value="${escapeHtml(vendor.id)}" ${vendor.id === ownerId ? "selected" : ""}>${escapeHtml(vendor.nome_completo || "Vendedor")}</option>`
  ));
  return `<select class="region-owner-select" data-region-scope="${escapeHtml(scope)}" data-uf="${escapeHtml(data.uf || "")}" data-cidade="${escapeHtml(data.cidade || "")}" data-ddd="${escapeHtml(data.ddd || "")}" data-cliente-id="${escapeHtml(data.clienteId || "")}" ${settings.disabled ? "disabled" : ""}>${vendorOptions.join("")}</select>`;
}

function setupRegionsVendorFilter() {
  const select = document.getElementById("regions-vendor-filter");
  if (!select || !currentRegionsPayload) {
    return;
  }
  const previous = select.value || currentRegionsVendorFilter || "all";
  select.innerHTML = `
    <option value="all">Todos</option>
    <option value="none">Sem Vendedor</option>
    ${(currentRegionsPayload.vendors || []).map((vendor) => `
      <option value="${escapeHtml(vendor.id)}">${escapeHtml(vendor.nome_completo || "Vendedor")}</option>
    `).join("")}
  `;
  select.value = [...select.options].some((option) => option.value === previous) ? previous : "all";
  currentRegionsVendorFilter = select.value || "all";
}

function regionOwnerMatchesFilter(ownerId) {
  if (currentRegionsVendorFilter === "all") {
    return true;
  }
  if (currentRegionsVendorFilter === "none") {
    return !ownerId;
  }
  return ownerId === currentRegionsVendorFilter;
}

function regionCitiesForUf(uf) {
  return (currentRegionsPayload?.cities || [])
    .filter((city) => city.uf === uf)
    .sort((a, b) => normalizeLocalText(a.cidade).localeCompare(normalizeLocalText(b.cidade)));
}

function regionClientGroupKey(city, ddd) {
  return `${city.uf}|${normalizeLocalText(city.cidade)}|${ddd || ""}`;
}

function regionClientsForDdd(city, ddd) {
  return currentRegionsPayload?.clients_by_region?.[regionClientGroupKey(city, ddd)] || [];
}

function regionFilteredClientsForDdd(city, ddd) {
  return regionClientsForDdd(city, ddd).filter((client) =>
    regionOwnerMatchesFilter(regionEffectiveOwner("cliente", {
      uf: city.uf,
      cidade: city.cidade,
      ddd,
      clienteId: client.id,
    }))
  );
}

function regionFilteredDddsForCity(city) {
  return (city.ddds || []).filter((ddd) =>
    regionOwnerMatchesFilter(regionEffectiveOwner("ddd", { uf: city.uf, cidade: city.cidade, ddd }))
    || regionFilteredClientsForDdd(city, ddd).length > 0
  );
}

function regionCityMatchesFilter(city) {
  return regionOwnerMatchesFilter(regionEffectiveOwner("cidade", { uf: city.uf, cidade: city.cidade }))
    || regionFilteredDddsForCity(city).length > 0;
}

function regionFilteredCitiesForUf(uf) {
  return regionCitiesForUf(uf).filter(regionCityMatchesFilter);
}

function regionUfMatchesFilter(uf) {
  return regionOwnerMatchesFilter(regionEffectiveOwner("uf", { uf }))
    || regionFilteredCitiesForUf(uf).length > 0;
}

function renderRegions() {
  const root = document.getElementById("region-hierarchy-root");
  if (!root || !currentRegionsPayload) {
    return;
  }
  setupRegionsVendorFilter();
  const ufs = (currentRegionsPayload.ufs || brazilUfs).filter(regionUfMatchesFilter);
  root.innerHTML = `
    <div class="region-tree-head">
      <span>UF / Cidade / DDD / Cliente</span>
      <span>Clientes</span>
      <span>Vendedor responsavel</span>
    </div>
    ${ufs.map((uf) => renderRegionUfRow(uf)).join("") || '<div class="empty-state">Nenhuma regiao encontrada para este filtro.</div>'}
  `;
  root.querySelectorAll("[data-region-toggle-uf]").forEach((button) => {
    button.addEventListener("click", () => {
      const uf = button.dataset.regionToggleUf;
      if (expandedRegionUfs.has(uf)) {
        expandedRegionUfs.delete(uf);
      } else {
        expandedRegionUfs.add(uf);
      }
      renderRegions();
    });
  });
  root.querySelectorAll("[data-region-toggle-city]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.regionToggleCity;
      if (expandedRegionCities.has(key)) {
        expandedRegionCities.delete(key);
      } else {
        expandedRegionCities.add(key);
      }
      renderRegions();
    });
  });
  root.querySelectorAll("[data-region-toggle-ddd]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.regionToggleDdd;
      if (expandedRegionDdds.has(key)) {
        expandedRegionDdds.delete(key);
      } else {
        expandedRegionDdds.add(key);
      }
      renderRegions();
    });
  });
  root.querySelectorAll("[data-region-scope]").forEach((select) => {
    select.addEventListener("change", saveRegionOwnerSelection);
  });
}

function renderRegionUfRow(uf) {
  const allCities = regionCitiesForUf(uf);
  const cities = currentRegionsVendorFilter === "all" ? allCities : regionFilteredCitiesForUf(uf);
  const clients = cities.reduce((total, city) => total + Number(city.clientes || 0), 0);
  const owner = regionEffectiveOwner("uf", { uf });
  const open = expandedRegionUfs.has(uf);
  return `
    <div class="region-tree-row region-tree-uf-row">
      <button class="region-expand-button" type="button" data-region-toggle-uf="${escapeHtml(uf)}">${open ? "-" : "+"}</button>
      <strong>${escapeHtml(uf)}</strong>
      <span>${formatNumber.format(clients)} clientes</span>
      ${regionVendorSelect("uf", { uf }, owner)}
    </div>
    ${open ? `<div class="region-tree-children">${cities.map((city) => renderRegionCityRow(city, owner)).join("") || '<div class="empty-state">Sem cidades cadastradas nessa UF.</div>'}</div>` : ""}
  `;
}

function renderRegionCityRow(city, ufOwner) {
  const key = `${city.uf}|${normalizeLocalText(city.cidade)}`;
  const owner = regionEffectiveOwner("cidade", { uf: city.uf, cidade: city.cidade });
  const directOwner = regionDirectOwner("cidade", { uf: city.uf, cidade: city.cidade });
  const open = expandedRegionCities.has(key);
  const inherited = !directOwner && ufOwner;
  return `
    <div class="region-tree-row region-tree-city-row">
      <button class="region-expand-button" type="button" data-region-toggle-city="${escapeHtml(key)}">${open ? "-" : "+"}</button>
      <strong>${escapeHtml(city.cidade)} - ${escapeHtml(city.uf)}</strong>
      <span>${formatNumber.format(city.clientes || 0)} clientes${inherited ? ` | herdado de ${escapeHtml(city.uf)}` : ""}</span>
      ${regionVendorSelect("cidade", { uf: city.uf, cidade: city.cidade }, owner)}
    </div>
    ${open ? `<div class="region-tree-children region-tree-ddd-children">${(currentRegionsVendorFilter === "all" ? (city.ddds || []) : regionFilteredDddsForCity(city)).map((ddd) => renderRegionDddRow(city, ddd, owner)).join("") || '<div class="empty-state">Sem DDD identificado nessa cidade.</div>'}</div>` : ""}
  `;
}

function renderRegionDddRow(city, ddd, cityOwner) {
  const owner = regionEffectiveOwner("ddd", { uf: city.uf, cidade: city.cidade, ddd });
  const directOwner = regionDirectOwner("ddd", { uf: city.uf, cidade: city.cidade, ddd });
  const inherited = !directOwner && cityOwner;
  const key = regionClientGroupKey(city, ddd);
  const open = expandedRegionDdds.has(key);
  const clients = currentRegionsVendorFilter === "all" ? regionClientsForDdd(city, ddd) : regionFilteredClientsForDdd(city, ddd);
  const clientCount = city.clientes_por_ddd?.[ddd || ""] ?? clients.length;
  const dddLabel = ddd ? `DDD ${escapeHtml(ddd)}` : "Sem DDD";
  return `
    <div class="region-tree-row region-tree-ddd-row">
      <button class="region-expand-button" type="button" data-region-toggle-ddd="${escapeHtml(key)}">${open ? "-" : "+"}</button>
      <strong>${dddLabel} - ${escapeHtml(city.cidade)}</strong>
      <span>${formatNumber.format(clientCount)} clientes${inherited ? " | herdado" : ""}</span>
      ${regionVendorSelect("ddd", { uf: city.uf, cidade: city.cidade, ddd }, owner, { disabled: !ddd })}
    </div>
    ${open ? `<div class="region-tree-children region-tree-client-children">${clients.map((client) => renderRegionClientRow(city, ddd, client, owner)).join("") || '<div class="empty-state">Sem clientes nesse DDD.</div>'}</div>` : ""}
  `;
}

function renderRegionClientRow(city, ddd, client, dddOwner) {
  const owner = regionEffectiveOwner("cliente", { uf: city.uf, cidade: city.cidade, ddd, clienteId: client.id });
  const directOwner = regionDirectOwner("cliente", { clienteId: client.id });
  const inherited = !directOwner && dddOwner;
  return `
    <div class="region-tree-row region-tree-client-row">
      <span></span>
      <strong>${escapeHtml(client.id)} - ${escapeHtml(client.nome || "")}</strong>
      <span>${inherited ? "herdado" : "cliente definido"}</span>
      ${regionVendorSelect("cliente", { uf: city.uf, cidade: city.cidade, ddd, clienteId: client.id }, owner)}
    </div>
  `;
}

async function loadRegions() {
  const company = document.getElementById("regions-company")?.value || "ionlab";
  const status = document.getElementById("regions-status");
  if (status) {
    status.textContent = "Carregando regioes...";
  }
  try {
    currentRegionsPayload = await fetchJson(`/api/regions?company=${encodeURIComponent(company)}`);
    setupRegionsVendorFilter();
    renderRegions();
    if (status) {
      status.textContent = `${currentRegionsPayload.empresa}: selecione os vendedores por UF, cidade ou DDD.`;
    }
  } catch (error) {
    if (status) {
      status.textContent = error.message;
    }
  }
}

async function saveRegionOwnerSelection(event) {
  const select = event.currentTarget;
  const status = document.getElementById("regions-status");
  const scope = select.dataset.regionScope;
  const vendorId = select.value;
  const payload = {
    company: document.getElementById("regions-company")?.value || "ionlab",
    vendor_id: vendorId,
    uf: select.dataset.uf || "",
    cidade: select.dataset.cidade || "",
    ddd: select.dataset.ddd || "",
  };
  if (!vendorId) {
    status.textContent = "Selecione um vendedor para gravar a regiao.";
    renderRegions();
    return;
  }
  if (scope === "uf") {
    payload.tipo = "uf";
  } else if (scope === "cidade") {
    payload.tipo = "cidade";
    payload.ddd = "";
  } else if (scope === "ddd") {
    payload.tipo = "cidade";
  } else if (scope === "cliente") {
    payload.tipo = "cliente";
    payload.cliente_id = select.dataset.clienteId || "";
  }
  status.textContent = "Salvando responsavel da regiao...";
  try {
    currentRegionsPayload = await fetchJson("/api/regions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    renderRegions();
    status.textContent = `Regiao salva para ${regionVendorName(vendorId)}.`;
  } catch (error) {
    status.textContent = error.message;
    renderRegions();
  }
}

function addPendingVendorSpecificClient() {
  if (!pendingVendorSpecificClient) {
    document.getElementById("vendor-form-status").textContent = "Pesquise e selecione um cliente antes de adicionar.";
    return;
  }
  const client = pendingVendorSpecificClient;
  const exists = currentVendorAssignments.clientes_especificos.some((item) => normalizeLocalText(item.id) === normalizeLocalText(client.id));
  if (!exists) {
    currentVendorAssignments.clientes_especificos.push(client);
  }
  pendingVendorSpecificClient = null;
  document.getElementById("vendor-client-search").value = "";
  document.getElementById("vendor-client-suggestions").classList.remove("visible");
  document.getElementById("vendor-form-status").textContent = exists
    ? "Este cliente ja estava na lista."
    : "Cliente especifico adicionado. Voce pode pesquisar e adicionar outro.";
  renderVendorAssignmentLists();
  autoSaveVendorAssignments("Cliente especifico salvo automaticamente.");
}

async function searchVendorClients() {
  const query = document.getElementById("vendor-client-search").value.trim();
  const suggestions = document.getElementById("vendor-client-suggestions");
  const company = document.getElementById("vendors-company").value || "ionlab";
  if (query.length < 2) {
    suggestions.classList.remove("visible");
    suggestions.innerHTML = "";
    return;
  }

  let payload;
  try {
    payload = await fetchJson(`/api/vendors/client-search?company=${encodeURIComponent(company)}&q=${encodeURIComponent(query)}`);
  } catch (error) {
    payload = await localClientSearch(company, query);
  }

  const blockedCodes = localBlockedCodeSet(company);
  const clients = payload.clients.filter((client) =>
    !blockedCodes.has(normalizeLocalText(client.id)) && !isLocalGroupCompanyClient(client)
  );
  suggestions.innerHTML = clients.map((client) => `
    <button class="prospect-suggestion" type="button"
      data-client-id="${escapeHtml(client.id)}"
      data-client-name="${escapeHtml(client.name)}"
      data-client-city="${escapeHtml(client.city || "")}"
      data-client-uf="${escapeHtml(client.uf || "")}"
      data-client-ddd="${escapeHtml(client.ddd || "")}">
      <strong>${escapeHtml(client.label || `${client.id} - ${client.name}`)}</strong>
      <span>${escapeHtml(client.city || "")} ${escapeHtml(client.uf || "")}${client.ddd ? ` - DDD ${escapeHtml(client.ddd)}` : ""}</span>
    </button>
  `).join("");
  suggestions.classList.toggle("visible", clients.length > 0);
  suggestions.querySelectorAll(".prospect-suggestion").forEach((button) => {
    button.addEventListener("click", () => setVendorSpecificClient({
      id: button.dataset.clientId,
      name: button.dataset.clientName,
      city: button.dataset.clientCity,
      uf: button.dataset.clientUf,
      ddd: button.dataset.clientDdd,
    }));
  });
}

function scheduleVendorClientSearch() {
  pendingVendorSpecificClient = null;
  clearTimeout(vendorClientSearchTimer);
  vendorClientSearchTimer = setTimeout(searchVendorClients, 220);
}

function currentVendorAssignmentPayload() {
  const ufs = selectedVendorUfs();
  currentVendorAssignments.ufs = ufs;
  const selectedUfSet = new Set(ufs);
  return {
    ...currentVendorAssignments,
    ufs,
    cidades: currentVendorAssignments.cidades.filter((city) =>
      selectedUfSet.size === 0 || selectedUfSet.has(String(city.uf || "").trim().toUpperCase())
    ),
  };
}

function showVendorEditor(title = "Novo vendedor") {
  document.getElementById("vendor-register-shell")?.classList.add("editing");
  const titleElement = document.getElementById("vendor-editor-title");
  if (titleElement) {
    titleElement.textContent = title;
  }
}

function showVendorList() {
  document.getElementById("vendor-register-shell")?.classList.remove("editing");
  document.getElementById("vendor-form-status").textContent = "";
}

function clearVendorForm() {
  document.getElementById("vendor-id").value = "";
  document.getElementById("vendor-current-photo").value = "";
  document.getElementById("vendor-photo").value = "";
  document.getElementById("vendor-name").value = "";
  document.getElementById("vendor-phone").value = "";
  document.getElementById("vendor-whatsapp").value = "";
  document.getElementById("vendor-email").value = "";
  document.getElementById("vendor-login").value = "";
  document.getElementById("vendor-linked-user").value = "";
  document.getElementById("vendor-password").value = "";
  document.getElementById("vendor-status").value = "Inativo";
  document.getElementById("vendor-user-type").value = "Vendedor";
  document.getElementById("vendor-form-status").textContent = "";
  pendingVendorSpecificClient = null;
  vendorUnassignedCities = [];
  currentVendorAssignments = { ufs: [], cidades: [], clientes_especificos: [] };
  renderVendorPhotoPreview("");
  renderVendorAccessOptions();
  loadVendorLinkedUserOptions("");
  renderVendorUfOptions([]);
  renderVendorAssignmentLists();
  applyVendorPermissionState();
  showVendorEditor("Novo vendedor");
}

async function editVendor(vendorId) {
  await loadVendorAssignmentOptions();
  const vendor = currentVendors.find((item) => item.id === vendorId);
  if (!vendor) {
    return;
  }

  document.getElementById("vendor-id").value = vendor.id || "";
  document.getElementById("vendor-current-photo").value = vendor.foto_vendedor || "";
  document.getElementById("vendor-photo").value = "";
  renderVendorPhotoPreview(vendor.foto_vendedor || "");
  document.getElementById("vendor-name").value = vendor.nome_completo || "";
  document.getElementById("vendor-phone").value = vendor.telefone || "";
  document.getElementById("vendor-whatsapp").value = vendor.whatsapp || "";
  document.getElementById("vendor-email").value = vendor.email || "";
  document.getElementById("vendor-login").value = vendor.login_acesso || "";
  await loadVendorLinkedUserOptions(vendor.usuario_vinculado_id || "");
  document.getElementById("vendor-password").value = "";
  document.getElementById("vendor-status").value = vendor.status === "Ativo" ? "Ativo" : "Inativo";
  document.getElementById("vendor-user-type").value = vendor.tipo_usuario === "Vendedor Lider/Supervisor" ? "Vendedor Lider/Supervisor" : "Vendedor";
  pendingVendorSpecificClient = null;
  vendorUnassignedCities = [];
  currentVendorAssignments = normalizeAssignments(vendor.clientes_atendidos);
  renderVendorAccessOptions(vendor.empresas_acesso || []);
  renderVendorUfOptions(currentVendorAssignments.ufs);
  renderVendorCitySelect();
  renderVendorAssignmentLists();
  document.getElementById("vendor-form-status").textContent = "Editando vendedor selecionado.";
  showVendorEditor(vendor.nome_completo || "Editar vendedor");
  applyVendorPermissionState();
}

async function loadVendors() {
  const company = document.getElementById("vendors-company").value || "ionlab";
  const query = document.getElementById("vendors-search").value.trim();
  const status = document.getElementById("vendors-status");
  status.textContent = "Carregando vendedores...";
  await loadVendorLinkedUserOptions(document.getElementById("vendor-linked-user")?.value || "");
  await loadVendorAssignmentOptions();

  try {
    const payload = await fetchJson(`/api/vendors?company=${encodeURIComponent(company)}&q=${encodeURIComponent(query)}`);
    renderVendorsPayload(payload);
  } catch (error) {
    const payload = localVendorsPayload(company, query);
    renderVendorsPayload(payload);
    status.textContent += " Base local ativa ate o servidor reiniciar a rota de vendedores.";
  }
}

function renderVendorsPayload(payload) {
  currentVendors = payload.rows;
  currentVendorColumns = payload.columns || currentVendorColumns;
  const statusFilter = document.getElementById("vendors-status-filter")?.value || "Ativo";
  document.querySelectorAll("[data-vendor-status-filter]").forEach((button) => {
    button.classList.toggle("active", button.dataset.vendorStatusFilter === statusFilter);
  });
  const visibleRows = statusFilter
    ? currentVendors.filter((row) => (row.status === "Ativo" ? "Ativo" : "Inativo") === statusFilter)
    : currentVendors;
  renderVendorUfOptions(currentVendorAssignments.ufs);
  renderVendorCitySelect();
  renderVendorGoalsVendorOptions(document.getElementById("vendor-goals-vendor")?.value || "");
  renderVendorRegionsVendorOptions(document.getElementById("vendor-regions-vendor")?.value || "");
  document.getElementById("vendors-head").innerHTML = `
    <tr>
      ${payload.columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}
      <th>Acao</th>
    </tr>
  `;
  document.getElementById("vendors-body").innerHTML = visibleRows.map((row) => `
    <tr>
      ${payload.columns.map((column) => `<td>${formatVendorCell(row, column.key)}</td>`).join("")}
      <td><button class="mini-action" type="button" data-vendor-id="${escapeHtml(row.id)}">Editar</button></td>
    </tr>
  `).join("") || `
    <tr><td colspan="${payload.columns.length + 1}">Nenhum vendedor encontrado.</td></tr>
  `;

  document.querySelectorAll("[data-vendor-id]").forEach((button) => {
    button.addEventListener("click", () => editVendor(button.dataset.vendorId));
  });

  document.getElementById("vendors-status").textContent =
    `${payload.empresa}: exibindo ${formatNumber.format(visibleRows.length)} de ${formatNumber.format(payload.total_filtrado)} vendedores encontrados. Ativos: ${formatNumber.format(payload.ativos)} | Inativos: ${formatNumber.format(payload.inativos)}.`;
}

function formatVendorCell(row, key) {
  if (key === "foto_vendedor") {
    return row.foto_vendedor
      ? `<img class="vendor-photo-thumb" src="${escapeHtml(row.foto_vendedor)}" alt="Foto de ${escapeHtml(row.nome_completo || "vendedor")}">`
      : `<span class="vendor-photo-empty">Sem foto</span>`;
  }
  if (key === "status") {
    const active = row.status === "Ativo";
    return `<span class="status-pill ${active ? "active" : "inactive"}">${escapeHtml(row.status || "Inativo")}</span>`;
  }
  if (key === "acesso_configurado") {
    const configured = row.acesso_configurado === "Configurado";
    return `<span class="status-pill ${configured ? "active" : "never"}">${escapeHtml(row.acesso_configurado || "Pendente")}</span>`;
  }
  if (key === "pagina_vendedor") {
    return row.status === "Ativo" && row.pagina_vendedor
      ? `<a class="mini-action vendor-page-link" href="${escapeHtml(row.pagina_vendedor)}?v=${appAssetVersion}">Abrir pagina</a>`
      : `<span class="vendor-photo-empty">Disponivel ao ativar</span>`;
  }
  if (key === "tipo_usuario") {
    const supervisor = row.tipo_usuario === "Vendedor Lider/Supervisor";
    return `<span class="status-pill ${supervisor ? "active" : "never"}">${escapeHtml(row.tipo_usuario || "Vendedor")}</span>`;
  }
  return escapeHtml(formatCell(row[key]));
}

function parsePtNumber(value) {
  if (typeof value === "number") {
    return value;
  }
  const text = String(value || "").trim();
  if (!text) {
    return 0;
  }
  const normalized = text.includes(",")
    ? text.replace(/\./g, "").replace(",", ".")
    : text;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function monthLabel(month) {
  return ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][Number(month) - 1] || String(month);
}

function setVendorSection(sectionName) {
  document.querySelectorAll(".vendor-page-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.vendorSection === sectionName);
  });
  document.querySelectorAll(".vendor-section-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `vendor-section-${sectionName}`);
  });
  if (sectionName === "goals") {
    loadVendorGoals();
  }
  if (sectionName === "monthly-items") {
    loadMonthlyItems();
  }
  if (sectionName === "regions") {
    loadVendorRegisterRegions();
  }
  if (sectionName === "register") {
    showVendorList();
  }
}

function renderVendorRegionsVendorOptions(selectedVendorId = "") {
  const select = document.getElementById("vendor-regions-vendor");
  if (!select) {
    return;
  }
  const activeVendors = currentVendors.filter((vendor) => vendor.status === "Ativo");
  select.innerHTML = '<option value="">Selecione</option>' + activeVendors.map((vendor) =>
    `<option value="${escapeHtml(vendor.id)}">${escapeHtml(vendor.nome_completo || "Vendedor")}</option>`
  ).join("");
  if (selectedVendorId && activeVendors.some((vendor) => vendor.id === selectedVendorId)) {
    select.value = selectedVendorId;
  }
}

function renderVendorRegisterRegionsSummary(payload) {
  const summary = document.getElementById("vendor-regions-summary");
  const rows = payload?.rows || [];
  const ufs = new Set(rows.map((row) => row.UF).filter(Boolean));
  const cities = new Set(rows.map((row) => `${row.UF}|${normalizeLocalText(row.CID)}`).filter((value) => value !== "|"));
  const ddds = new Set(rows.map((row) => row.DDD).filter(Boolean));
  summary.innerHTML = `
    <div><span>UF</span><strong>${formatNumber.format(ufs.size)}</strong></div>
    <div><span>Cidades</span><strong>${formatNumber.format(cities.size)}</strong></div>
    <div><span>DDD</span><strong>${formatNumber.format(ddds.size)}</strong></div>
    <div><span>Clientes</span><strong>${formatNumber.format(payload?.total_carteira || rows.length)}</strong></div>
  `;
}

function renderVendorRegisterRegionsTable(payload) {
  const head = document.getElementById("vendor-regions-head");
  const body = document.getElementById("vendor-regions-body");
  const query = normalizeLocalText(document.getElementById("vendor-regions-search")?.value || "");
  const columns = payload.columns || [
    { key: "ID", label: "Codigo" },
    { key: "NOM", label: "Cliente" },
    { key: "UF", label: "UF" },
    { key: "CID", label: "Cidade" },
    { key: "DDD", label: "DDD" },
    { key: "status", label: "Status" },
  ];
  const rows = (payload.rows || []).filter((row) => {
    if (!query) {
      return true;
    }
    return searchTextMatches(query, `${row.ID} ${row.NOM} ${row.UF} ${row.CID} ${row.DDD} ${row.status}`);
  });
  head.innerHTML = `<tr>${columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}</tr>`;
  body.innerHTML = rows.map((row) => `
    <tr>
      ${columns.map((column) => `<td>${column.key === "faturamento_liquido" ? formatCurrency.format(row[column.key] || 0) : escapeHtml(formatCell(row[column.key]))}</td>`).join("")}
    </tr>
  `).join("") || `<tr><td colspan="${columns.length}">Nenhum cliente encontrado para este vendedor.</td></tr>`;
  document.getElementById("vendor-regions-status").textContent =
    `${payload.empresa}: exibindo ${formatNumber.format(rows.length)} de ${formatNumber.format(payload.total_carteira || 0)} clientes da carteira.`;
}

function renderVendorRegionsManager(payload) {
  const ufSelect = document.getElementById("vendor-regions-uf-filter");
  const dddList = document.getElementById("vendor-regions-ddd-list");
  const cityList = document.getElementById("vendor-regions-city-list");
  const status = document.getElementById("vendor-regions-manager-status");
  const rows = payload?.rows || [];
  const ufs = [...new Set(rows.map((row) => row.UF).filter(Boolean))].sort();
  const currentUf = ufSelect.value;
  ufSelect.innerHTML = ufs.map((uf) => `<option value="${escapeHtml(uf)}">${escapeHtml(uf)}</option>`).join("");
  if (currentUf && ufs.includes(currentUf)) {
    ufSelect.value = currentUf;
  }
  const selectedUf = ufSelect.value || ufs[0] || "";
  if (selectedUf) {
    ufSelect.value = selectedUf;
  }
  const rowsByUf = rows.filter((row) => row.UF === selectedUf);
  const ddds = [...new Set(rowsByUf.map((row) => row.DDD).filter(Boolean))].sort();
  const cityFilter = normalizeLocalText(document.getElementById("vendor-regions-city-filter")?.value || "");
  const citiesMap = new Map();
  rowsByUf.forEach((row) => {
    const city = row.CID || "";
    if (!city) {
      return;
    }
    const key = `${row.UF}|${normalizeLocalText(city)}`;
    if (!citiesMap.has(key)) {
      citiesMap.set(key, { uf: row.UF, cidade: city, ddds: new Set(), clientes: 0 });
    }
    const item = citiesMap.get(key);
    if (row.DDD) {
      item.ddds.add(row.DDD);
    }
    item.clientes += 1;
  });
  const cities = [...citiesMap.values()]
    .filter((item) => !cityFilter || searchTextMatches(cityFilter, `${item.cidade} ${item.uf} ${[...item.ddds].join(" ")}`))
    .sort((a, b) => normalizeLocalText(a.cidade).localeCompare(normalizeLocalText(b.cidade)));
  dddList.innerHTML = ddds.map((ddd) => `
    <label class="assignment-item selectable">
      <input type="checkbox" data-vendor-region-exclude-ddd="${escapeHtml(ddd)}" data-uf="${escapeHtml(selectedUf)}">
      <span><strong>DDD ${escapeHtml(ddd)}</strong><span>${escapeHtml(selectedUf)}</span></span>
    </label>
  `).join("") || '<div class="empty-state">Nenhum DDD para esta UF.</div>';
  cityList.innerHTML = cities.map((item) => `
    <label class="assignment-item selectable">
      <input type="checkbox" data-vendor-region-exclude-city="${escapeHtml(item.cidade)}" data-uf="${escapeHtml(item.uf)}">
      <span><strong>${escapeHtml(item.cidade)} - ${escapeHtml(item.uf)}</strong><span>DDD ${escapeHtml([...item.ddds].join(", ") || "-")} | ${formatNumber.format(item.clientes)} cliente(s)</span></span>
    </label>
  `).join("") || '<div class="empty-state">Nenhuma cidade para esta UF.</div>';
  status.textContent = selectedUf
    ? `${selectedUf}: ${formatNumber.format(ddds.length)} DDD, ${formatNumber.format(cities.length)} cidades visiveis.`
    : "Este vendedor ainda nao tem UF/cidades na carteira.";
}

async function excludeSelectedVendorRegions() {
  const company = document.getElementById("vendors-company")?.value || "ionlab";
  const vendorId = document.getElementById("vendor-regions-vendor")?.value || "";
  const status = document.getElementById("vendor-regions-manager-status");
  const dddItems = Array.from(document.querySelectorAll("[data-vendor-region-exclude-ddd]:checked")).map((input) => ({
    tipo: "ddd",
    uf: input.dataset.uf,
    ddd: input.dataset.vendorRegionExcludeDdd,
  }));
  const cityItems = Array.from(document.querySelectorAll("[data-vendor-region-exclude-city]:checked")).map((input) => ({
    tipo: "cidade",
    uf: input.dataset.uf,
    cidade: input.dataset.vendorRegionExcludeCity,
  }));
  const items = [...dddItems, ...cityItems];
  if (!vendorId) {
    status.textContent = "Selecione um vendedor.";
    return;
  }
  if (!items.length) {
    status.textContent = "Selecione ao menos um DDD ou cidade para excluir.";
    return;
  }
  status.textContent = "Excluindo da carteira...";
  try {
    const payload = await fetchJson("/api/vendor-region-exclusions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, vendor_id: vendorId, items }),
    });
    currentVendorRegionsPayload = payload;
    renderVendorRegisterRegionsSummary(payload);
    renderVendorRegisterRegionsTable(payload);
    renderVendorRegionsManager(payload);
    status.textContent = `${formatNumber.format(items.length)} item(ns) excluido(s) da carteira do vendedor.`;
  } catch (error) {
    status.textContent = error.message;
  }
}

async function loadVendorRegisterRegions() {
  if (!currentVendors.length) {
    await loadVendors();
  }
  renderVendorRegionsVendorOptions(document.getElementById("vendor-regions-vendor")?.value || "");
  const company = document.getElementById("vendors-company")?.value || "ionlab";
  const vendorId = document.getElementById("vendor-regions-vendor")?.value || "";
  const status = document.getElementById("vendor-regions-status");
  if (!vendorId) {
    currentVendorRegionsPayload = null;
    renderVendorRegisterRegionsSummary({ rows: [], total_carteira: 0 });
    renderVendorRegionsManager({ rows: [] });
    document.getElementById("vendor-regions-head").innerHTML = "";
    document.getElementById("vendor-regions-body").innerHTML = '<tr><td>Selecione um vendedor para visualizar.</td></tr>';
    status.textContent = "Selecione um vendedor para visualizar os clientes da carteira.";
    return;
  }
  status.textContent = "Carregando clientes do vendedor...";
  try {
    const params = new URLSearchParams({ company, vendor_id: vendorId, status: "all" });
    const payload = await fetchJson(`/api/vendor-region-management?${params.toString()}`);
    currentVendorRegionsPayload = payload;
    renderVendorRegisterRegionsSummary(payload);
    renderVendorRegisterRegionsTable(payload);
    renderVendorRegionsManager(payload);
  } catch (error) {
    status.textContent = error.message;
  }
}

function renderVendorGoalsVendorOptions(selectedVendorId = "") {
  const select = document.getElementById("vendor-goals-vendor");
  if (!select) {
    return;
  }
  const activeVendors = currentVendors.filter((vendor) => vendor.status === "Ativo");
  select.innerHTML = activeVendors.map((vendor) =>
    `<option value="${escapeHtml(vendor.id)}">${escapeHtml(vendor.nome_completo || "Vendedor")}</option>`
  ).join("");
  if (selectedVendorId && activeVendors.some((vendor) => vendor.id === selectedVendorId)) {
    select.value = selectedVendorId;
  }
}

function renderVendorGoalsYears(years = [], selectedYear = new Date().getFullYear()) {
  const select = document.getElementById("vendor-goals-year");
  if (!select) {
    return;
  }
  const options = years.length ? years : [selectedYear];
  select.innerHTML = options.map((year) => `<option value="${year}">${year}</option>`).join("");
  select.value = String(selectedYear);
}

function renderVendorGoalsMonthOptions(selectedMonth = new Date().getMonth() + 1) {
  const select = document.getElementById("vendor-goals-month");
  if (!select) {
    return;
  }
  const currentValue = select.value || String(selectedMonth);
  select.innerHTML = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    return `<option value="${month}">${monthLabel(month)}</option>`;
  }).join("");
  select.value = currentValue;
}

function setupMonthlyItemsPeriodControls() {
  const yearSelect = document.getElementById("monthly-items-year");
  const monthSelect = document.getElementById("monthly-items-month");
  if (yearSelect) {
    const currentYear = new Date().getFullYear();
    yearSelect.innerHTML = Array.from({ length: 7 }, (_, index) => {
      const year = 2021 + index;
      return `<option value="${year}">${year}</option>`;
    }).join("");
    yearSelect.value = String(currentYear);
  }
  if (monthSelect) {
    monthSelect.innerHTML = Array.from({ length: 12 }, (_, index) => {
      const month = index + 1;
      return `<option value="${month}">${monthLabel(month)}</option>`;
    }).join("");
    monthSelect.value = String(new Date().getMonth() + 1);
  }
}

function vendorGoalInput(name, month, objective, value, extraClass = "") {
  return `<input class="${extraClass}" data-goal-field="${name}" data-month="${month}" data-objective="${objective || ""}" type="text" inputmode="decimal" value="${escapeHtml(String(value ?? ""))}">`;
}

function updateVendorSalesGoalForMonth(monthData) {
  if (!monthData || !currentVendorGoalsPayload) {
    return;
  }
  const base = currentVendorGoalsPayload.sales_base || {};
  const increase = Number(monthData.percentual_aumento || 0);
  const suggestedGoal = Math.round((Number(base.media_base || 0) * (1 + increase / 100)) * 100) / 100;
  monthData.objetivos = monthData.objetivos || {};
  monthData.objetivos.vendas_liquidas = monthData.objetivos.vendas_liquidas || { meta: 0, peso: 0 };
  monthData.objetivos.vendas_liquidas.meta = suggestedGoal;
  monthData.meta_vendas_liquidas_sugerida = suggestedGoal;
}

function vendorGoalMetaHeader(objective) {
  if (objective.key === "novos_clientes") {
    return "R$ por novo cliente";
  }
  if (objective.key === "sem_giro") {
    return "% fixo";
  }
  return "Valor / Quantidade";
}

function vendorGoalWeightCell(month, objective, item) {
  if (objective.key === "novos_clientes" || objective.key === "sem_giro") {
    return '<span class="vendor-goal-static">Sem peso</span>';
  }
  return vendorGoalInput("peso", month, objective.key, String(item.peso || 0).replace(".", ","));
}

function vendorGoalMaxCommission(commissionPercent, objective, item) {
  if (objective.key === "sem_giro") {
    return Number(item.meta || 0);
  }
  if (objective.key === "novos_clientes") {
    return 0;
  }
  return commissionPercent * Number(item.peso || 0) / 100;
}

function renderVendorGoals(payload) {
  currentVendorGoalsPayload = payload;
  renderVendorGoalsVendorOptions(payload.vendedor?.id || "");
  renderVendorGoalsYears(payload.years || [], payload.year);
  renderVendorGoalsMonthOptions();
  document.getElementById("vendor-goals-commission").value = String(payload.goals.comissao_percentual || 1).replace(".", ",");
  const base = payload.sales_base || {};
  const clientBase = payload.client_sales_base || {};
  const selectedMonth = document.getElementById("vendor-goals-month")?.value || String(new Date().getMonth() + 1);
  const baseMonths = (base.meses_base || []).map((item) => `${String(item.mes).padStart(2, "0")}/${item.ano}: ${formatCurrency.format(item.valor || 0)}`).join(" | ") || "Sem historico suficiente";
  const bestClientMonth = clientBase.maior_mes
    ? `${String(clientBase.maior_mes.mes).padStart(2, "0")}/${clientBase.maior_mes.ano}: ${formatNumber.format(clientBase.maior_mes.clientes || 0)} clientes`
    : "Sem historico suficiente";
  document.getElementById("vendor-goals-summary").innerHTML = `
    <article><span>Criterio</span><strong>Media dos 3 maiores meses dos 2 anos fechados</strong></article>
    <article><span>Meses usados</span><strong>${escapeHtml(baseMonths)}</strong></article>
    <article><span>Base da meta sugerida</span><strong>${formatCurrency.format(base.media_base || 0)}</strong></article>
    <article><span>Maior mes em clientes</span><strong>${escapeHtml(bestClientMonth)}</strong></article>
    <article><span>Clientes sugeridos</span><strong>${formatNumber.format(clientBase.quantidade_sugerida || 0)}</strong></article>
    <article><span>Mes em edicao</span><strong>${monthLabel(selectedMonth)} / ${payload.year}</strong></article>
  `;

  const objectives = payload.objectives || [];
  const months = payload.goals.months || {};
  const commissionPercent = Number(payload.goals.comissao_percentual || 0);
  document.getElementById("vendor-goals-months").innerHTML = [selectedMonth].map((month) => {
    const monthData = months[month] || {};
    const objectiveRows = objectives.map((objective) => {
      const item = monthData.objetivos?.[objective.key] || {};
      const readonly = objective.key === "vendas_liquidas" ? "vendor-goal-suggested" : "";
      const maxCommission = vendorGoalMaxCommission(commissionPercent, objective, item);
      return `
        <tr>
          <td>${escapeHtml(objective.label)}</td>
          <td>${vendorGoalInput("meta", month, objective.key, String(item.meta || 0).replace(".", ","), readonly)}</td>
          <td>${vendorGoalWeightCell(month, objective, item)}</td>
          <td class="commission-value">${objective.key === "novos_clientes" ? "Valor fixo" : `${formatPercent2.format(maxCommission)}%`}</td>
        </tr>
      `;
    }).join("");
    return `
      <section class="vendor-goal-month">
        <header>
          <h3>${monthLabel(month)} / ${payload.year}</h3>
          <span>Meta venda sugerida: ${formatCurrency.format(monthData.meta_vendas_liquidas_sugerida || 0)} | Clientes sugeridos: ${formatNumber.format(monthData.meta_clientes_com_vendas_sugerida || 0)}</span>
        </header>
        <div class="vendor-goal-month-inputs">
          <label>% aumento sobre meta ${vendorGoalInput("percentual_aumento", month, "", String(monthData.percentual_aumento || 0).replace(".", ","))}</label>
        </div>
        <div class="table-scroll compact">
          <table class="vendor-goal-table">
            <thead><tr><th>Meta / Objetivo</th><th>Valor / Quantidade</th><th>Peso</th><th>% Comissão Máx.</th></tr></thead>
            <tbody>${objectiveRows}</tbody>
          </table>
        </div>
      </section>
    `;
  }).join("");
}

function syncVendorGoalFormIntoPayload() {
  if (!currentVendorGoalsPayload?.goals?.months) {
    return;
  }
  document.querySelectorAll("[data-goal-field]").forEach((input) => {
    const month = input.dataset.month;
    const field = input.dataset.goalField;
    const objective = input.dataset.objective;
    if (!month || !field) {
      return;
    }
    const monthData = currentVendorGoalsPayload.goals.months[month] = currentVendorGoalsPayload.goals.months[month] || {
      percentual_aumento: 0,
      quantidade_minima_clientes: 0,
      objetivos: {},
    };
    if (objective) {
      monthData.objetivos = monthData.objetivos || {};
      monthData.objetivos[objective] = monthData.objetivos[objective] || { meta: 0, peso: 0 };
      monthData.objetivos[objective][field] = parsePtNumber(input.value);
    } else {
      monthData[field] = parsePtNumber(input.value);
    }
    updateVendorSalesGoalForMonth(monthData);
  });
}

function replicateVendorGoalsNextMonths() {
  const status = document.getElementById("vendor-goals-status");
  if (!currentVendorGoalsPayload?.goals?.months) {
    status.textContent = "Carregue um vendedor antes de replicar as metas.";
    return;
  }
  syncVendorGoalFormIntoPayload();
  const selectedMonth = Number(document.getElementById("vendor-goals-month")?.value || 0);
  if (!selectedMonth || selectedMonth >= 12) {
    status.textContent = "Selecione um mes anterior a dezembro para replicar.";
    return;
  }
  const months = currentVendorGoalsPayload.goals.months;
  const source = months[String(selectedMonth)] || {};
  const sourceObjectives = source.objetivos || {};
  const objectiveKeys = [
    "reativacao_inativos",
    "clientes_com_vendas",
    "contatos_inativos_nunca",
    "novos_clientes",
    "sem_giro",
  ];
  for (let month = selectedMonth + 1; month <= 12; month += 1) {
    const monthKey = String(month);
    const target = months[monthKey] = months[monthKey] || { objetivos: {} };
    target.percentual_aumento = Number(source.percentual_aumento || 0);
    target.objetivos = target.objetivos || {};
    objectiveKeys.forEach((key) => {
      const sourceObjective = sourceObjectives[key] || {};
      target.objetivos[key] = {
        ...(target.objetivos[key] || {}),
        meta: Number(sourceObjective.meta || 0),
        peso: Number(sourceObjective.peso || 0),
      };
    });
    target.objetivos.vendas_liquidas = target.objetivos.vendas_liquidas || { meta: 0, peso: 0 };
    target.objetivos.vendas_liquidas.peso = Number((sourceObjectives.vendas_liquidas || {}).peso || 0);
    updateVendorSalesGoalForMonth(target);
  }
  renderVendorGoals(currentVendorGoalsPayload);
  status.textContent = `Valores de ${monthLabel(selectedMonth)} replicados ate dezembro. Clique em Salvar metas para gravar.`;
}

async function loadVendorGoals() {
  const company = document.getElementById("vendors-company").value || "ionlab";
  const vendorSelect = document.getElementById("vendor-goals-vendor");
  const yearSelect = document.getElementById("vendor-goals-year");
  const vendorId = vendorSelect?.value || "";
  const year = yearSelect?.value || new Date().getFullYear();
  const status = document.getElementById("vendor-goals-status");
  status.textContent = "Carregando metas e objetivos...";
  try {
    const payload = await fetchJson(`/api/vendor-goals?company=${encodeURIComponent(company)}&vendor_id=${encodeURIComponent(vendorId)}&year=${encodeURIComponent(year)}`);
    renderVendorGoals(payload);
    status.textContent = "Metas carregadas. Selecione o mes, ajuste os campos e salve quando terminar.";
  } catch (error) {
    status.textContent = error.message;
  }
}

function collectVendorGoalsPayload() {
  syncVendorGoalFormIntoPayload();
  const months = JSON.parse(JSON.stringify(currentVendorGoalsPayload?.goals?.months || {}));
  for (let month = 1; month <= 12; month += 1) {
    months[String(month)] = months[String(month)] || {
      percentual_aumento: 0,
      quantidade_minima_clientes: 0,
      valor_novo_cliente: 0,
      objetivos: {},
    };
  }
  document.querySelectorAll("[data-goal-field]").forEach((input) => {
    const month = input.dataset.month;
    const field = input.dataset.goalField;
    const objective = input.dataset.objective;
    if (!month || !field) {
      return;
    }
    if (objective) {
      months[month].objetivos[objective] = months[month].objetivos[objective] || { meta: 0, peso: 0 };
      months[month].objetivos[objective][field] = parsePtNumber(input.value);
    } else {
      months[month][field] = parsePtNumber(input.value);
    }
  });
  return {
    company: document.getElementById("vendors-company").value || "ionlab",
    actor_role: document.getElementById("vendor-actor-role").value,
    vendor_id: document.getElementById("vendor-goals-vendor").value,
    year: document.getElementById("vendor-goals-year").value,
    comissao_percentual: parsePtNumber(document.getElementById("vendor-goals-commission").value),
    months,
  };
}

async function saveVendorGoals() {
  const status = document.getElementById("vendor-goals-status");
  if (!canManageVendors()) {
    status.textContent = "Somente Usuario Master ou Vendedor Lider/Supervisor pode alterar metas.";
    return;
  }
  status.textContent = "Salvando metas...";
  try {
    const payload = await fetchJson("/api/vendor-goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collectVendorGoalsPayload()),
    });
    status.textContent = payload.message;
    await loadVendorGoals();
  } catch (error) {
    status.textContent = error.message;
  }
}

function renderMonthlyItems() {
  const body = document.getElementById("monthly-items-body");
  if (!body) {
    return;
  }
  body.innerHTML = currentMonthlyItems.map((item, index) => `
    <tr>
      <td><strong>${escapeHtml(item.referencia || "")}</strong></td>
      <td>${escapeHtml(item.descricao || "")}</td>
      <td class="costing-value-cell">${formatNumber.format(item.estoque || 0)}</td>
      <td>${escapeHtml(formatCell(item.ultima_venda || ""))}</td>
      <td class="costing-value-cell">${formatCurrency.format(item.valor_unitario_tabela || 0)}</td>
      <td><button class="mini-action" type="button" data-remove-monthly-item="${index}">Remover</button></td>
    </tr>
  `).join("") || '<tr><td colspan="6">Nenhum item adicionado para este mes.</td></tr>';
  document.querySelectorAll("[data-remove-monthly-item]").forEach((button) => {
    button.addEventListener("click", () => {
      currentMonthlyItems.splice(Number(button.dataset.removeMonthlyItem), 1);
      renderMonthlyItems();
    });
  });
}

async function loadMonthlyItems() {
  const company = document.getElementById("monthly-items-company")?.value || document.getElementById("vendors-company")?.value || "ionlab";
  const year = document.getElementById("monthly-items-year")?.value || new Date().getFullYear();
  const month = document.getElementById("monthly-items-month")?.value || new Date().getMonth() + 1;
  const status = document.getElementById("monthly-items-status");
  if (status) {
    status.textContent = "Carregando itens/equipamentos do mes...";
  }
  try {
    const payload = await fetchJson(`/api/vendor-monthly-items?company=${encodeURIComponent(company)}&year=${encodeURIComponent(year)}&month=${encodeURIComponent(month)}`);
    currentMonthlyItems = payload.items || [];
    renderMonthlyItems();
    if (status) {
      status.textContent = `${payload.empresa}: ${formatNumber.format(currentMonthlyItems.length)} itens cadastrados para ${monthLabel(month)} / ${year}.`;
    }
  } catch (error) {
    currentMonthlyItems = [];
    renderMonthlyItems();
    if (status) {
      status.textContent = error.message;
    }
  }
}

function addMonthlyItem(item) {
  if (currentMonthlyItems.some((current) => normalizeTextClient(current.referencia) === normalizeTextClient(item.referencia))) {
    document.getElementById("monthly-items-status").textContent = "Este item ja esta na lista do mes.";
    return;
  }
  currentMonthlyItems.push(item);
  document.getElementById("monthly-item-search").value = "";
  document.getElementById("monthly-item-suggestions").innerHTML = "";
  document.getElementById("monthly-item-suggestions").classList.remove("visible");
  renderMonthlyItems();
}

function normalizeTextClient(value) {
  return normalizeSearchText(value);
}

async function searchMonthlyItems() {
  const input = document.getElementById("monthly-item-search");
  const suggestions = document.getElementById("monthly-item-suggestions");
  const company = document.getElementById("monthly-items-company")?.value || "ionlab";
  const query = input?.value.trim() || "";
  if (!suggestions || query.length < 2) {
    if (suggestions) {
      suggestions.innerHTML = "";
      suggestions.classList.remove("visible");
    }
    return;
  }
  suggestions.innerHTML = '<div class="table-status">Buscando itens...</div>';
  suggestions.classList.add("visible");
  try {
    const payload = await fetchJson(`/api/product-search?company=${encodeURIComponent(company)}&q=${encodeURIComponent(query)}`);
    suggestions.innerHTML = (payload.rows || []).map((item) => `
      <button class="prospect-suggestion" type="button"
        data-reference="${escapeHtml(item.referencia)}"
        data-description="${escapeHtml(item.descricao || "")}"
        data-stock="${escapeHtml(item.estoque || 0)}"
        data-last-sale="${escapeHtml(item.ultima_venda || "")}"
        data-unit-price="${escapeHtml(item.valor_unitario_tabela || 0)}">
        <strong>${escapeHtml(item.referencia)} - ${escapeHtml(item.descricao || "")}</strong>
        <span>Estoque ${formatNumber.format(item.estoque || 0)} | Ultima venda ${escapeHtml(formatCell(item.ultima_venda || ""))} | ${formatCurrency.format(item.valor_unitario_tabela || 0)}</span>
      </button>
    `).join("") || '<div class="table-status">Nenhum item encontrado.</div>';
    suggestions.classList.add("visible");
    suggestions.querySelectorAll(".prospect-suggestion").forEach((button) => {
      button.addEventListener("click", () => addMonthlyItem({
        referencia: button.dataset.reference,
        descricao: button.dataset.description,
        estoque: parsePtNumber(button.dataset.stock),
        ultima_venda: button.dataset.lastSale,
        valor_unitario_tabela: parsePtNumber(button.dataset.unitPrice),
      }));
    });
  } catch (error) {
    suggestions.innerHTML = `<div class="table-status">${escapeHtml(error.message)}</div>`;
    suggestions.classList.add("visible");
  }
}

async function saveMonthlyItems() {
  const status = document.getElementById("monthly-items-status");
  const company = document.getElementById("monthly-items-company")?.value || "ionlab";
  const year = document.getElementById("monthly-items-year")?.value || new Date().getFullYear();
  const month = document.getElementById("monthly-items-month")?.value || new Date().getMonth() + 1;
  status.textContent = "Salvando lista de itens/equipamentos...";
  try {
    const payload = await fetchJson("/api/vendor-monthly-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, year, month, items: currentMonthlyItems }),
    });
    status.textContent = `${payload.message} Total: ${formatNumber.format(payload.total || 0)}.`;
    await loadMonthlyItems();
  } catch (error) {
    status.textContent = error.message;
  }
}

function scheduleVendorsLoad() {
  clearTimeout(vendorsTimer);
  vendorsTimer = setTimeout(loadVendors, 250);
}

function vendorPayloadFromForm() {
  const linkedUserSelect = document.getElementById("vendor-linked-user");
  return {
    company: document.getElementById("vendors-company").value || "ionlab",
    actor_role: document.getElementById("vendor-actor-role").value,
    id: document.getElementById("vendor-id").value,
    foto_vendedor: document.getElementById("vendor-current-photo").value,
    nome_completo: document.getElementById("vendor-name").value,
    tipo_usuario: document.getElementById("vendor-user-type").value,
    telefone: document.getElementById("vendor-phone").value,
    whatsapp: document.getElementById("vendor-whatsapp").value,
    email: document.getElementById("vendor-email").value,
    login_acesso: document.getElementById("vendor-login").value,
    usuario_vinculado_id: linkedUserSelect.value,
    usuario_vinculado_nome: linkedUserSelect.selectedOptions?.[0]?.textContent || "",
    senha_acesso: document.getElementById("vendor-password").value,
    status: document.getElementById("vendor-status").value,
    empresas_acesso: selectedVendorAccess(),
    clientes_atendidos: currentVendorAssignmentPayload(),
  };
}

async function persistVendorPayload(vendorPayload) {
  try {
    const payload = await fetchJson("/api/vendors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vendorPayload),
    });
    currentVendorAssignments = normalizeAssignments(payload.vendor?.clientes_atendidos || vendorPayload.clientes_atendidos);
    await loadVendorAssignmentOptions();
    await loadVendors();
    return payload.message;
  } catch (error) {
    throw new Error(`Vendedor nao foi salvo no banco: ${error.message}`);
  }
}

async function autoSaveVendorAssignments(message = "Carteira salva automaticamente.") {
  const status = document.getElementById("vendor-form-status");
  if (!document.getElementById("vendor-id").value) {
    status.textContent = "Selecione um vendedor salvo para atualizar a carteira automaticamente.";
    return;
  }
  if (!canManageVendors()) {
    status.textContent = "Somente Usuario Master ou Vendedor Lider/Supervisor pode alterar a carteira.";
    return;
  }
  status.textContent = "Salvando carteira do vendedor...";
  try {
    await persistVendorPayload(vendorPayloadFromForm());
    status.textContent = message;
  } catch (error) {
    status.textContent = error.message;
  }
}

async function saveVendor(event) {
  event.preventDefault();
  if (!canManageVendors()) {
    document.getElementById("vendor-form-status").textContent = "Somente Usuario Master ou Vendedor Lider/Supervisor pode incluir ou alterar vendedores.";
    return;
  }

  const company = document.getElementById("vendors-company").value || "ionlab";
  const status = document.getElementById("vendor-form-status");
  status.textContent = "Salvando vendedor...";
  const photoFile = document.getElementById("vendor-photo").files[0];
  const photo = photoFile
    ? await readFileAsDataUrl(photoFile)
    : document.getElementById("vendor-current-photo").value;

  const vendorPayload = { ...vendorPayloadFromForm(), foto_vendedor: photo };

  try {
    status.textContent = await persistVendorPayload(vendorPayload);
  } catch (error) {
    status.textContent = error.message;
  }
}

function renderResult(summary) {
  const panel = document.getElementById("sales-result-panel");
  panel.innerHTML = `
    <p class="eyebrow">Resultado</p>
    <h3>${summary.empresa}</h3>
    <p class="muted">${summary.arquivo} · aba ${summary.aba}</p>
    <div class="result-grid">
      <div class="result-item">
        <span>Linhas lidas</span>
        <strong>${formatNumber.format(summary.linhas_lidas)}</strong>
      </div>
      <div class="result-item">
        <span>Importadas</span>
        <strong>${formatNumber.format(summary.linhas_importadas)}</strong>
      </div>
      <div class="result-item">
        <span>Ignoradas</span>
        <strong>${formatNumber.format(summary.linhas_ignoradas)}</strong>
      </div>
      <div class="result-item">
        <span>Notas novas</span>
        <strong>${formatNumber.format(summary.notas_importadas)}</strong>
      </div>
    </div>
  `;
}

function renderClientResult(summary) {
  const panel = document.getElementById("clients-result-panel");
  panel.innerHTML = `
    <p class="eyebrow">Resultado</p>
    <h3>${summary.empresa}</h3>
    <p class="muted">${summary.arquivo} · aba ${summary.aba}</p>
    <div class="result-grid">
      <div class="result-item">
        <span>Linhas lidas</span>
        <strong>${formatNumber.format(summary.linhas_lidas)}</strong>
      </div>
      <div class="result-item">
        <span>Importados</span>
        <strong>${formatNumber.format(summary.clientes_importados)}</strong>
      </div>
      <div class="result-item">
        <span>Ignorados</span>
        <strong>${formatNumber.format(summary.clientes_ignorados)}</strong>
      </div>
      <div class="result-item">
        <span>Fora de clientes</span>
        <strong>${formatNumber.format(summary.clientes_descartados || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Total da empresa</span>
        <strong>${formatNumber.format(summary.total_clientes_empresa)}</strong>
      </div>
    </div>
  `;
}

function renderStockResult(summary) {
  const panel = document.getElementById("stock-result-panel");
  panel.innerHTML = `
    <p class="eyebrow">Resultado</p>
    <h3>${summary.empresa}</h3>
    <p class="muted">${summary.arquivo} · ${summary.aba}</p>
    <div class="result-grid">
      <div class="result-item">
        <span>Linhas lidas</span>
        <strong>${formatNumber.format(summary.linhas_lidas)}</strong>
      </div>
      <div class="result-item">
        <span>Referencias atualizadas</span>
        <strong>${formatNumber.format(summary.referencias_atualizadas)}</strong>
      </div>
      <div class="result-item">
        <span>Linhas ignoradas</span>
        <strong>${formatNumber.format(summary.linhas_ignoradas)}</strong>
      </div>
      <div class="result-item">
        <span>Regra aplicada</span>
        <strong>Saldo atual substituido</strong>
      </div>
    </div>
  `;
  tableState.stock.loaded = false;
  loadStockSummary(document.getElementById("stock-company-select").value || "ionlab");
}

function renderInTransitResult(summary) {
  const panel = document.getElementById("in-transit-result-panel");
  panel.innerHTML = `
    <p class="eyebrow">Resultado</p>
    <h3>${summary.empresa}</h3>
    <p class="muted">${summary.arquivo} - ${summary.aba}</p>
    <div class="result-grid">
      <div class="result-item">
        <span>Linhas lidas</span>
        <strong>${formatNumber.format(summary.linhas_lidas || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Itens em transito</span>
        <strong>${formatNumber.format(summary.itens_importados || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Linhas ignoradas</span>
        <strong>${formatNumber.format(summary.linhas_ignoradas || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Regra aplicada</span>
        <strong>Base substituida</strong>
      </div>
    </div>
  `;
  tableState["in-transit"].loaded = false;
}

function renderPriceImportResult(summary) {
  const panel = document.getElementById("prices-import-result-panel");
  panel.innerHTML = `
    <p class="eyebrow">Resultado</p>
    <h3>${summary.empresa}</h3>
    <p class="muted">${summary.arquivo} - ${summary.aba}</p>
    <div class="result-grid">
      <div class="result-item">
        <span>Linhas lidas</span>
        <strong>${formatNumber.format(summary.linhas_lidas || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Itens importados</span>
        <strong>${formatNumber.format(summary.itens_importados || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Linhas ignoradas</span>
        <strong>${formatNumber.format(summary.linhas_ignoradas || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Regra aplicada</span>
        <strong>Base substituida</strong>
      </div>
    </div>
    <p class="muted">${escapeHtml(summary.lembrete_ipi || "Depois de importar a tabela de precos, atualize as aliquotas do IPI no botao Atualizar IPI.")}</p>
  `;
  tableState.prices.loaded = false;
}

function renderPriceIpiResult(summary) {
  const panel = document.getElementById("prices-import-result-panel");
  panel.innerHTML = `
    <p class="eyebrow">Resultado</p>
    <h3>${escapeHtml(summary.empresa || "")}</h3>
    <p class="muted">${escapeHtml(summary.mensagem || "Aliquotas de IPI atualizadas.")}</p>
    <div class="result-grid">
      <div class="result-item">
        <span>Linhas lidas</span>
        <strong>${formatNumber.format(summary.linhas_lidas || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Referencias com IPI</span>
        <strong>${formatNumber.format(summary.referencias_com_ipi || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Itens atualizados</span>
        <strong>${formatNumber.format(summary.itens_atualizados || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Nao encontradas na tabela</span>
        <strong>${formatNumber.format(summary.referencias_nao_encontradas || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Ultima atualizacao</span>
        <strong>${escapeHtml(summary.ultima_atualizacao_ipi || "")}</strong>
      </div>
    </div>
  `;
  tableState.prices.loaded = false;
}

function renderProductsImportResult(summary) {
  const panel = document.getElementById("products-result-panel");
  panel.innerHTML = `
    <p class="eyebrow">Resultado</p>
    <h3>${summary.empresa}</h3>
    <p class="muted">${summary.arquivo} · ${summary.aba}</p>
    <div class="result-grid">
      <div class="result-item">
        <span>Linhas lidas</span>
        <strong>${formatNumber.format(summary.linhas_lidas || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Produtos importados</span>
        <strong>${formatNumber.format(summary.itens_importados || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Linhas ignoradas</span>
        <strong>${formatNumber.format(summary.linhas_ignoradas || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Regra aplicada</span>
        <strong>Base substituida</strong>
      </div>
    </div>
  `;
  tableState.products.loaded = false;
}

function renderStockRecalculation(summary) {
  const panel = document.getElementById("stock-result-panel");
  panel.innerHTML = `
    <p class="eyebrow">Resultado</p>
    <h3>${summary.empresa}</h3>
    <p class="muted">Valores do estoque recalculados com base no Custo BRL Indice.</p>
    <div class="result-grid">
      <div class="result-item">
        <span>Referencias em estoque</span>
        <strong>${formatNumber.format(summary.referencias_estoque || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Atualizadas</span>
        <strong>${formatNumber.format(summary.referencias_atualizadas || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Sem custo</span>
        <strong>${formatNumber.format(summary.referencias_sem_custo || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Valor total em estoque</span>
        <strong>${formatCurrency3.format(summary.valor_total_estoque || 0)}</strong>
      </div>
    </div>
  `;
  tableState.stock.loaded = false;
  loadStockSummary(document.getElementById("stock-company-select").value || "ionlab");
}

function renderCostingResult(summary) {
  const panel = document.getElementById("costing-result-panel");
  panel.innerHTML = `
    <p class="eyebrow">Resultado</p>
    <h3>${summary.empresa}</h3>
    <p class="muted">${summary.arquivo} · ${summary.aba}</p>
    <div class="result-grid">
      <div class="result-item">
        <span>Indice de Custeio</span>
        <strong>${formatNumber.format(summary.indice_custeio || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Linhas lidas</span>
        <strong>${formatNumber.format(summary.linhas_lidas)}</strong>
      </div>
      <div class="result-item">
        <span>Referencias importadas</span>
        <strong>${formatNumber.format(summary.referencias_importadas)}</strong>
      </div>
      <div class="result-item">
        <span>Precos preenchidos</span>
        <strong>${formatNumber.format(summary.referencias_atualizadas_preco || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Total na base</span>
        <strong>${formatNumber.format(summary.total_referencias_base || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Ja existentes</span>
        <strong>${formatNumber.format(summary.referencias_ja_existentes || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Ignoradas por origem</span>
        <strong>${formatNumber.format(summary.linhas_ignoradas_origem || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Duplicadas ignoradas</span>
        <strong>${formatNumber.format(summary.linhas_ignoradas_duplicadas || 0)}</strong>
      </div>
    </div>
  `;
  tableState.costing.loaded = false;
}

function renderCostingRecalculation(summary) {
  const panel = document.getElementById("costing-result-panel");
  panel.innerHTML = `
    <p class="eyebrow">Resultado</p>
    <h3>${summary.empresa}</h3>
    <p class="muted">Indice recalculado para toda a base de custeio.</p>
    <div class="result-grid">
      <div class="result-item">
        <span>Indice de Custeio</span>
        <strong>${formatNumber.format(summary.indice_custeio || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Referencias recalculadas</span>
        <strong>${formatNumber.format(summary.referencias_recalculadas || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Sem Preco Dollar</span>
        <strong>${formatNumber.format(summary.referencias_sem_preco_dollar || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Total na base</span>
        <strong>${formatNumber.format(summary.total_referencias_base || 0)}</strong>
      </div>
    </div>
  `;
  tableState.costing.loaded = false;
}

function renderCostingFabricatedResult(summary, actionText = "Custeio fabricado atualizado.") {
  const panel = document.getElementById("costing-fabricated-result-panel");
  panel.innerHTML = `
    <p class="eyebrow">Resultado</p>
    <h3>${summary.empresa}</h3>
    <p class="muted">${actionText}</p>
    <div class="result-grid">
      <div class="result-item">
        <span>% aumento Custo</span>
        <strong>${formatPercent2.format(summary.percentual_aumento_custo || 0)}%</strong>
      </div>
      <div class="result-item">
        <span>Linhas lidas</span>
        <strong>${formatNumber.format(summary.linhas_lidas || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Referencias importadas</span>
        <strong>${formatNumber.format(summary.referencias_importadas || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Referencias atualizadas</span>
        <strong>${formatNumber.format(summary.referencias_atualizadas || summary.referencias_recalculadas || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Sem custo base</span>
        <strong>${formatNumber.format(summary.referencias_sem_custo_base || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Total na base</span>
        <strong>${formatNumber.format(summary.total_referencias_base || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Ignoradas por origem</span>
        <strong>${formatNumber.format(summary.linhas_ignoradas_origem || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Duplicadas ignoradas</span>
        <strong>${formatNumber.format(summary.linhas_ignoradas_duplicadas || 0)}</strong>
      </div>
    </div>
  `;
  tableState["costing-fabricated"].loaded = false;
}

function renderSalesCostRecalculation(summary) {
  const panel = document.getElementById("sales-result-panel");
  panel.innerHTML = `
    <p class="eyebrow">Resultado</p>
    <h3>${summary.empresa}</h3>
    <p class="muted">Custos recalculados de ${summary.data_inicial} ate ${summary.data_final}.</p>
    <div class="result-grid">
      <div class="result-item">
        <span>Itens no periodo</span>
        <strong>${formatNumber.format(summary.itens_periodo || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Itens atualizados</span>
        <strong>${formatNumber.format(summary.itens_atualizados || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Sem custeio</span>
        <strong>${formatNumber.format(summary.itens_sem_custeio || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Sem quantidade</span>
        <strong>${formatNumber.format(summary.itens_sem_quantidade || 0)}</strong>
      </div>
    </div>
  `;
  tableState.sales.loaded = false;
}

async function recalculateSalesCost() {
  const button = document.getElementById("sales-recalculate-cost-button");
  const panel = document.getElementById("sales-result-panel");
  const company = document.getElementById("sales-company-select").value || "ionlab";
  const startDate = document.getElementById("sales-export-start-date").value.trim();
  const endDate = document.getElementById("sales-export-end-date").value.trim();

  if (!startDate || !endDate) {
    panel.innerHTML = `
      <p class="eyebrow">Resultado</p>
      <h3>Periodo obrigatorio</h3>
      <p class="muted">Informe Data inicial e Data final para recalcular o custo.</p>
    `;
    return;
  }

  button.disabled = true;
  button.textContent = "Recalculando...";
  panel.innerHTML = `
    <p class="eyebrow">Resultado</p>
    <h3>Recalculando custo</h3>
    <p class="muted">Zerando PR_CUSN somente no periodo informado e buscando os custos na base de custeio.</p>
  `;

  try {
    const params = new URLSearchParams({
      company,
      start_date: startDate,
      end_date: endDate,
      _: Date.now().toString(),
    });
    const summary = await fetchJson(`/api/recalculate-sales-cost?${params.toString()}`);
    renderSalesCostRecalculation(summary);
  } catch (error) {
    panel.innerHTML = `
      <p class="eyebrow">Resultado</p>
      <h3>Nao foi possivel recalcular</h3>
      <p class="muted">${error.message}</p>
    `;
  } finally {
    button.disabled = false;
    button.textContent = "Recalcular custo";
  }
}

async function recalculateCosting() {
  const button = document.getElementById("costing-recalculate-button");
  const panel = document.getElementById("costing-result-panel");
  const company = document.getElementById("costing-company-select").value || "ionlab";
  const indice = document.getElementById("costing-index-input").value;

  button.disabled = true;
  button.textContent = "Recalculando...";
  panel.innerHTML = `
    <p class="eyebrow">Resultado</p>
    <h3>Recalculando indice</h3>
    <p class="muted">Aplicando o indice informado em toda a base de custeio.</p>
  `;

  try {
    const summary = await fetchJson(`/api/recalculate-costing?company=${encodeURIComponent(company)}&indice_custeio=${encodeURIComponent(indice)}`);
    renderCostingRecalculation(summary);
  } catch (error) {
    panel.innerHTML = `
      <p class="eyebrow">Resultado</p>
      <h3>Nao foi possivel recalcular</h3>
      <p class="muted">${error.message}</p>
    `;
  } finally {
    button.disabled = false;
    button.textContent = "Recalcular indice";
  }
}

async function recalculateCostingFabricated() {
  const button = document.getElementById("costing-fabricated-recalculate-button");
  const panel = document.getElementById("costing-fabricated-result-panel");
  const company = document.getElementById("costing-fabricated-company-select").value || "ionlab";
  const increase = document.getElementById("costing-fabricated-increase-input").value || "0";

  button.disabled = true;
  button.textContent = "Recalculando...";
  panel.innerHTML = `
    <p class="eyebrow">Resultado</p>
    <h3>Recalculando custo</h3>
    <p class="muted">Aplicando o percentual informado em toda a base Fabricado BR.</p>
  `;

  try {
    const summary = await fetchJson(`/api/recalculate-costing-fabricated?company=${encodeURIComponent(company)}&cost_increase=${encodeURIComponent(increase)}`);
    renderCostingFabricatedResult(summary, "Percentual aplicado em toda a base Fabricado BR.");
  } catch (error) {
    panel.innerHTML = `
      <p class="eyebrow">Resultado</p>
      <h3>Nao foi possivel recalcular</h3>
      <p class="muted">${error.message}</p>
    `;
  } finally {
    button.disabled = false;
    button.textContent = "Recalcular custo";
  }
}

function exportCosting() {
  const company = document.getElementById("costing-company-select").value || "ionlab";
  window.location.href = `/api/export-costing?company=${encodeURIComponent(company)}&_=${Date.now()}`;
}

function exportCostingFabricated() {
  const company = document.getElementById("costing-fabricated-company-select").value || "ionlab";
  window.location.href = `/api/export-costing-xlsx?company=${encodeURIComponent(company)}&kind=fabricated&_=${Date.now()}`;
}

function exportCostingTable(tableName) {
  const company = document.getElementById(`${tableName}-table-company`).value || "ionlab";
  const kind = tableName === "costing-fabricated" ? "fabricated" : "imported";
  window.location.href = `/api/export-costing-xlsx?company=${encodeURIComponent(company)}&kind=${encodeURIComponent(kind)}&_=${Date.now()}`;
}

function exportClientsTable() {
  const company = document.getElementById("clients-table-company").value || "ionlab";
  const query = document.getElementById("clients-table-search").value.trim();
  window.location.href = `/api/export-clients-xlsx?company=${encodeURIComponent(company)}&q=${encodeURIComponent(query)}&_=${Date.now()}`;
}

async function recalculateStockValue() {
  const button = document.getElementById("stock-recalculate-value-button");
  const panel = document.getElementById("stock-result-panel");
  const company = document.getElementById("stock-company-select").value || "ionlab";

  button.disabled = true;
  button.textContent = "Recalculando...";
  panel.innerHTML = `
    <p class="eyebrow">Resultado</p>
    <h3>Recalculando estoque</h3>
    <p class="muted">Buscando V.Unitario na base de custeio e atualizando o total do estoque.</p>
  `;

  try {
    const summary = await fetchJson(`/api/recalculate-stock-value?company=${encodeURIComponent(company)}&_=${Date.now()}`);
    renderStockRecalculation(summary);
  } catch (error) {
    panel.innerHTML = `
      <p class="eyebrow">Resultado</p>
      <h3>Nao foi possivel recalcular</h3>
      <p class="muted">${error.message}</p>
    `;
  } finally {
    button.disabled = false;
    button.textContent = "Recalcular valor do estoque";
  }
}

function exportStock() {
  const company = document.getElementById("stock-company-select").value || "ionlab";
  window.location.href = `/api/export-stock?company=${encodeURIComponent(company)}&_=${Date.now()}`;
}

function exportStockTable() {
  const company = document.getElementById("stock-table-company").value || "ionlab";
  window.location.href = `/api/export-stock?company=${encodeURIComponent(company)}&_=${Date.now()}`;
}

function exportInTransit() {
  const company = document.getElementById("in-transit-company-select").value || "ionlab";
  window.location.href = `/api/export-in-transit?company=${encodeURIComponent(company)}&_=${Date.now()}`;
}

function exportInTransitTable() {
  const company = document.getElementById("in-transit-table-company").value || "ionlab";
  window.location.href = `/api/export-in-transit?company=${encodeURIComponent(company)}&_=${Date.now()}`;
}

function exportPriceTable() {
  const company = document.getElementById("prices-table-company").value || "ionlab";
  window.location.href = `/api/export-prices?company=${encodeURIComponent(company)}&_=${Date.now()}`;
}

function exportProducts() {
  const company = document.getElementById("products-company-select").value || "ionlab";
  window.location.href = `/api/export-products?company=${encodeURIComponent(company)}&_=${Date.now()}`;
}

function exportProductsTable() {
  const company = document.getElementById("products-table-company").value || "ionlab";
  window.location.href = `/api/export-products?company=${encodeURIComponent(company)}&_=${Date.now()}`;
}

function exportStockMissingCost() {
  const company = document.getElementById("stock-company-select").value || "ionlab";
  window.location.href = `/api/export-stock-missing-cost?company=${encodeURIComponent(company)}&_=${Date.now()}`;
}

function slowItemsElements() {
  return {
    company: document.getElementById("slow-items-company"),
    search: document.getElementById("slow-items-search"),
    status: document.getElementById("slow-items-status"),
    head: document.getElementById("slow-items-table-head"),
    body: document.getElementById("slow-items-table-body"),
    loadButton: document.getElementById("slow-items-load-button"),
    saveButton: document.getElementById("slow-items-save-button"),
    exportButton: document.getElementById("slow-items-export-button"),
  };
}

function formatSlowItemsValue(key, value) {
  if (["quantidade", "valor_unitario", "percentual"].includes(key)) {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(Number(value || 0));
  }
  if (key === "total") {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value || 0));
  }
  return formatCell(value);
}

function slowItemMovementValue(value) {
  const text = String(value || "").toLowerCase();
  if (text.includes("nunca")) {
    return 999999;
  }
  const monthsMatch = text.match(/(\d+)\s+mes/);
  const daysMatch = text.match(/(\d+)\s+dia/);
  return (monthsMatch ? Number(monthsMatch[1]) * 30 : 0) + (daysMatch ? Number(daysMatch[1]) : 0);
}

function slowItemSortValue(row, key) {
  if (["quantidade", "valor_unitario", "total", "percentual"].includes(key)) {
    return Number(row[key] || 0);
  }
  if (key === "ultima_saida") {
    const parts = String(row[key] || "").split("/");
    if (parts.length === 3) {
      return Number(`${parts[2]}${parts[1]}${parts[0]}`);
    }
    return 0;
  }
  if (key === "dias_sem_movimento" || key === "_dias_sem_movimento") {
    const rawDays = Number(row._dias_sem_movimento);
    return Number.isFinite(rawDays) ? rawDays : slowItemMovementValue(row.dias_sem_movimento);
  }
  return normalizeSearchText(row[key]);
}

function captureSlowItemsPercentages() {
  const elements = slowItemsElements();
  const percentages = new Map(Array.from(elements.body.querySelectorAll("[data-slow-ref]")).map((input) => [
    input.dataset.slowRef,
    parsePtNumber(input.value),
  ]));
  slowItemsRows = slowItemsRows.map((row) => (
    percentages.has(row.referencia)
      ? { ...row, percentual: percentages.get(row.referencia) }
      : row
  ));
}

function sortSlowItemsRows(rows) {
  const key = slowItemsSortKey === "_dias_sem_movimento" ? "dias_sem_movimento" : slowItemsSortKey;
  const direction = slowItemsSortDir === "desc" ? -1 : 1;
  return [...rows].sort((left, right) => {
    const leftValue = slowItemSortValue(left, key);
    const rightValue = slowItemSortValue(right, key);
    if (typeof leftValue === "number" && typeof rightValue === "number") {
      return (leftValue - rightValue) * direction;
    }
    return String(leftValue).localeCompare(String(rightValue), "pt-BR") * direction;
  });
}

function setSlowItemsSort(key) {
  captureSlowItemsPercentages();
  const normalizedKey = key === "dias_sem_movimento" ? "_dias_sem_movimento" : key;
  if (slowItemsSortKey === normalizedKey) {
    slowItemsSortDir = slowItemsSortDir === "asc" ? "desc" : "asc";
  } else {
    slowItemsSortKey = normalizedKey;
    slowItemsSortDir = ["quantidade", "valor_unitario", "total", "percentual", "dias_sem_movimento"].includes(key) ? "desc" : "asc";
  }
  renderSlowItemsTable({ columns: currentSlowItemsColumns, rows: slowItemsRows, empresa: currentSlowItemsCompany, total: slowItemsRows.length });
}

let currentSlowItemsColumns = [];
let currentSlowItemsCompany = "";

function renderSlowItemsTable(payload) {
  const elements = slowItemsElements();
  currentSlowItemsColumns = payload.columns || currentSlowItemsColumns;
  currentSlowItemsCompany = payload.empresa || currentSlowItemsCompany;
  slowItemsRows = sortSlowItemsRows(payload.rows || []);
  elements.head.innerHTML = `
    <tr>
      ${currentSlowItemsColumns.map((column) => {
        const active = (slowItemsSortKey === column.key) || (slowItemsSortKey === "_dias_sem_movimento" && column.key === "dias_sem_movimento");
        const arrow = active ? (slowItemsSortDir === "desc" ? " ?" : " ?") : "";
        return `<th><button class="table-sort-button ${active ? "active" : ""}" type="button" data-slow-sort="${escapeHtml(column.key)}">${escapeHtml(column.label)}<span>${arrow}</span></button></th>`;
      }).join("")}
    </tr>
  `;
  elements.head.querySelectorAll("[data-slow-sort]").forEach((button) => {
    button.addEventListener("click", () => setSlowItemsSort(button.dataset.slowSort));
  });
  elements.body.innerHTML = slowItemsRows.map((row) => `
    <tr>
      ${currentSlowItemsColumns.map((column) => {
        if (column.key === "percentual") {
          return `
            <td class="slow-items-percent-cell">
              <input type="text" inputmode="decimal" data-slow-ref="${escapeHtml(row.referencia)}" value="${escapeHtml(formatSlowItemsValue("percentual", row.percentual))}">
            </td>
          `;
        }
        const valueClass = [
          ["quantidade", "valor_unitario", "total"].includes(column.key) ? "costing-value-cell" : "",
          column.key === "valor_unitario" && row.sem_preco_tabela ? "slow-items-missing-price" : "",
        ].filter(Boolean).join(" ");
        return `<td class="${valueClass}">${escapeHtml(formatSlowItemsValue(column.key, row[column.key]))}</td>`;
      }).join("")}
    </tr>
  `).join("");

  if (!slowItemsRows.length) {
    elements.body.innerHTML = `
      <tr>
        <td colspan="${currentSlowItemsColumns.length}">Nenhum item sem giro encontrado.</td>
      </tr>
    `;
  }

  elements.status.textContent = `${currentSlowItemsCompany}: ${formatNumber.format(payload.total || slowItemsRows.length || 0)} item(ns) sem giro no estoque.`;
}

async function loadSlowItems() {
  const elements = slowItemsElements();
  if (!elements.company) {
    return;
  }
  const company = elements.company.value || "ionlab";
  const query = elements.search.value.trim();
  elements.status.textContent = "Carregando itens sem giro...";
  elements.loadButton.disabled = true;
  try {
    const payload = await fetchJson(`/api/slow-items?company=${encodeURIComponent(company)}&q=${encodeURIComponent(query)}&_=${Date.now()}`);
    renderSlowItemsTable(payload);
  } catch (error) {
    elements.status.textContent = error.message;
    elements.head.innerHTML = "";
    elements.body.innerHTML = "";
  } finally {
    elements.loadButton.disabled = false;
  }
}

function scheduleSlowItemsLoad() {
  clearTimeout(slowItemsTimer);
  slowItemsTimer = setTimeout(loadSlowItems, 300);
}

function exportSlowItems() {
  const elements = slowItemsElements();
  const params = new URLSearchParams({
    company: elements.company.value || "ionlab",
    q: elements.search.value.trim(),
    _: Date.now().toString(),
  });
  window.location.href = `/api/export-slow-items?${params.toString()}`;
}

function mercadoLivreAdsElements() {
  return {
    search: document.getElementById("ml-ads-search"),
    status: document.getElementById("ml-ads-status"),
    head: document.getElementById("ml-ads-table-head"),
    body: document.getElementById("ml-ads-table-body"),
    companyTabs: document.getElementById("ml-company-tabs"),
    kindTabs: document.getElementById("ml-kind-tabs"),
    fileTabs: document.getElementById("ml-file-tabs"),
    exportSummaryButton: document.getElementById("ml-summary-export-button"),
  };
}

function mercadoLivreKindLabel(kind) {
  if (kind === "resumo") return "Resumo";
  return kind === "ficha_tecnica" ? "Ficha Tecnica" : "Anuncios";
}

function mercadoLivreImportsForCurrentKind(company) {
  return (company?.imports || []).filter((item) => (item.tipo || "anuncios") === currentMercadoLivreKind);
}

function renderMercadoLivreTabs() {
  const elements = mercadoLivreAdsElements();
  const companiesList = mercadoLivreOverview.companies || [];
  elements.companyTabs.innerHTML = companiesList.map((company) => `
    <button class="routine-tab ${company.id === currentMercadoLivreCompany ? "active" : ""}" type="button" data-ml-company="${escapeHtml(company.id)}">
      ${escapeHtml(company.name)}
    </button>
  `).join("");
  elements.companyTabs.querySelectorAll("[data-ml-company]").forEach((button) => {
    button.addEventListener("click", () => {
      currentMercadoLivreCompany = button.dataset.mlCompany || "onix";
      const selectedCompany = (mercadoLivreOverview.companies || []).find((company) => company.id === currentMercadoLivreCompany);
      currentMercadoLivreImportId = currentMercadoLivreKind === "resumo" ? "resumo" : mercadoLivreImportsForCurrentKind(selectedCompany)[0]?.id || "";
      document.getElementById("ml-ads-company").value = currentMercadoLivreCompany;
      renderMercadoLivreTabs();
      loadMercadoLivreAds();
    });
  });

  elements.kindTabs.innerHTML = ["anuncios", "ficha_tecnica", "resumo"].map((kind) => `
    <button class="routine-tab ${kind === currentMercadoLivreKind ? "active" : ""}" type="button" data-ml-kind="${escapeHtml(kind)}">
      ${escapeHtml(mercadoLivreKindLabel(kind))}
    </button>
  `).join("");
  elements.kindTabs.querySelectorAll("[data-ml-kind]").forEach((button) => {
    button.addEventListener("click", () => {
      currentMercadoLivreKind = button.dataset.mlKind || "anuncios";
      if (currentMercadoLivreKind !== "resumo") {
        document.getElementById("ml-ads-kind").value = currentMercadoLivreKind;
      }
      const selectedCompany = (mercadoLivreOverview.companies || []).find((company) => company.id === currentMercadoLivreCompany);
      currentMercadoLivreImportId = currentMercadoLivreKind === "resumo" ? "resumo" : mercadoLivreImportsForCurrentKind(selectedCompany)[0]?.id || "";
      renderMercadoLivreTabs();
      loadMercadoLivreAds();
    });
  });

  const selectedCompany = companiesList.find((company) => company.id === currentMercadoLivreCompany) || { imports: [] };
  const typedImports = mercadoLivreImportsForCurrentKind(selectedCompany);
  if (currentMercadoLivreKind === "resumo") {
    currentMercadoLivreImportId = "resumo";
    elements.fileTabs.innerHTML = '<span class="muted">Resumo unificado de Anuncios e Ficha Tecnica, classificado por SKU.</span>';
    return;
  }
  if (!currentMercadoLivreImportId && typedImports.length) {
    currentMercadoLivreImportId = typedImports[0].id;
  }
  elements.fileTabs.innerHTML = typedImports.map((item) => `
    <button class="routine-tab ${item.id === currentMercadoLivreImportId ? "active" : ""}" type="button" data-ml-import="${escapeHtml(item.id)}">
      ${escapeHtml(item.nome || item.arquivo || "Arquivo")}
    </button>
  `).join("") || `<span class="muted">Nenhum arquivo do tipo ${escapeHtml(mercadoLivreKindLabel(currentMercadoLivreKind))} importado para esta empresa.</span>`;
  elements.fileTabs.querySelectorAll("[data-ml-import]").forEach((button) => {
    button.addEventListener("click", () => {
      currentMercadoLivreImportId = button.dataset.mlImport || "";
      renderMercadoLivreTabs();
      loadMercadoLivreAds();
    });
  });
}

async function loadMercadoLivreOverview() {
  mercadoLivreOverview = await fetchJson("/api/mercado-livre/overview");
  if (!mercadoLivreOverview.companies?.some((company) => company.id === currentMercadoLivreCompany)) {
    currentMercadoLivreCompany = mercadoLivreOverview.companies?.[0]?.id || "onix";
  }
  const selectedCompany = mercadoLivreOverview.companies?.find((company) => company.id === currentMercadoLivreCompany);
  const typedImports = mercadoLivreImportsForCurrentKind(selectedCompany);
  if (currentMercadoLivreKind === "resumo") {
    currentMercadoLivreImportId = "resumo";
  } else if (!typedImports.some((item) => item.id === currentMercadoLivreImportId)) {
    currentMercadoLivreImportId = typedImports[0]?.id || "";
  }
  const importSelect = document.getElementById("ml-ads-company");
  if (importSelect) {
    importSelect.value = currentMercadoLivreCompany;
  }
  const kindSelect = document.getElementById("ml-ads-kind");
  if (kindSelect) {
    kindSelect.value = currentMercadoLivreKind === "resumo" ? "anuncios" : currentMercadoLivreKind;
  }
  renderMercadoLivreTabs();
}

async function loadMercadoLivreAds() {
  const elements = mercadoLivreAdsElements();
  if (!elements.search) {
    return;
  }
  if (!mercadoLivreOverview.companies.length) {
    await loadMercadoLivreOverview();
  }
  const selectedCompany = mercadoLivreOverview.companies.find((company) => company.id === currentMercadoLivreCompany);
  const typedImports = mercadoLivreImportsForCurrentKind(selectedCompany);
  if (currentMercadoLivreKind === "resumo") {
    currentMercadoLivreImportId = "resumo";
  } else if (!currentMercadoLivreImportId && typedImports.length) {
    currentMercadoLivreImportId = typedImports[0].id;
  }
  const company = currentMercadoLivreCompany || "onix";
  const query = elements.search.value.trim();
  elements.status.textContent = `Carregando ${mercadoLivreKindLabel(currentMercadoLivreKind).toLowerCase()}...`;
  try {
    const payload = await fetchJson(`/api/mercado-livre/ads?company=${encodeURIComponent(company)}&type=${encodeURIComponent(currentMercadoLivreKind)}&import_id=${encodeURIComponent(currentMercadoLivreImportId)}&q=${encodeURIComponent(query)}&limit=300`);
    currentMercadoLivreImportId = payload.import_id || currentMercadoLivreImportId;
    currentMercadoLivreKind = payload.tipo || currentMercadoLivreKind;
    renderMercadoLivreTabs();
    elements.head.innerHTML = `
      <tr>
        ${payload.columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}
      </tr>
    `;
    elements.body.innerHTML = payload.rows.map((row) => `
      <tr class="${currentMercadoLivreKind === "resumo" && normalizeTextClient(row.Estado) === "INATIVO" ? "ml-summary-inactive-row" : ""}">
        ${payload.columns.map((column) => `<td>${escapeHtml(formatMercadoLivreCell(column.key, row[column.key]))}</td>`).join("")}
      </tr>
    `).join("");
    if (!payload.rows.length) {
      elements.body.innerHTML = `<tr><td colspan="${Math.max(1, payload.columns.length)}">Nenhum registro encontrado.</td></tr>`;
    }
    elements.status.textContent = `${payload.empresa} - ${payload.tipo_nome || mercadoLivreKindLabel(currentMercadoLivreKind)} - ${payload.import_name || "Arquivo"}: exibindo ${formatNumber.format(payload.rows.length)} de ${formatNumber.format(payload.total_filtrado)} encontrado(s). Base com ${formatNumber.format(payload.total_registros)} registro(s).`;
    if (elements.exportSummaryButton) {
      elements.exportSummaryButton.classList.toggle("hidden", currentMercadoLivreKind !== "resumo");
    }
  } catch (error) {
    elements.status.textContent = error.message;
    elements.head.innerHTML = "";
    elements.body.innerHTML = "";
    if (elements.exportSummaryButton) {
      elements.exportSummaryButton.classList.add("hidden");
    }
  }
}

function scheduleMercadoLivreAdsLoad() {
  clearTimeout(mercadoLivreAdsTimer);
  mercadoLivreAdsTimer = setTimeout(loadMercadoLivreAds, 300);
}

function exportMercadoLivreSummary() {
  const company = currentMercadoLivreCompany || document.getElementById("ml-ads-company")?.value || "onix";
  window.location.href = `/api/export-mercado-livre-summary?company=${encodeURIComponent(company)}&_=${Date.now()}`;
}

function mercadoLivreSalesElements() {
  return {
    company: document.getElementById("ml-sales-company"),
    search: document.getElementById("ml-sales-search"),
    status: document.getElementById("ml-sales-status"),
    head: document.getElementById("ml-sales-table-head"),
    body: document.getElementById("ml-sales-table-body"),
  };
}

async function loadMercadoLivreSales() {
  const elements = mercadoLivreSalesElements();
  if (!elements.search) {
    return;
  }
  const company = elements.company.value || "onix";
  const query = elements.search.value.trim();
  elements.status.textContent = "Carregando vendas...";
  try {
    const payload = await fetchJson(`/api/mercado-livre/sales?company=${encodeURIComponent(company)}&q=${encodeURIComponent(query)}&limit=300`);
    elements.head.innerHTML = `
      <tr>
        ${payload.columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}
      </tr>
    `;
    elements.body.innerHTML = payload.rows.map((row) => `
      <tr>
        ${payload.columns.map((column) => `<td>${escapeHtml(formatCell(row[column.key]))}</td>`).join("")}
      </tr>
    `).join("");
    if (!payload.rows.length) {
      elements.body.innerHTML = `<tr><td colspan="${Math.max(1, payload.columns.length)}">Nenhuma venda encontrada.</td></tr>`;
    }
    elements.status.textContent = `${payload.empresa}: exibindo ${formatNumber.format(payload.rows.length)} de ${formatNumber.format(payload.total_filtrado)} encontrada(s). Base com ${formatNumber.format(payload.total_registros)} venda(s).`;
  } catch (error) {
    elements.status.textContent = error.message;
    elements.head.innerHTML = "";
    elements.body.innerHTML = "";
  }
}

function scheduleMercadoLivreSalesLoad() {
  clearTimeout(mercadoLivreSalesTimer);
  mercadoLivreSalesTimer = setTimeout(loadMercadoLivreSales, 300);
}

async function renderMercadoLivreSalesImportResult(summary) {
  const panel = document.getElementById("ml-sales-result-panel");
  panel.innerHTML = `
    <p class="eyebrow">Resultado</p>
    <h3>${escapeHtml(summary.empresa)}</h3>
    <p class="muted">${escapeHtml(summary.arquivo)} - aba ${escapeHtml(summary.aba)} - cabecalho na linha ${formatNumber.format(summary.linha_cabecalho || 0)}</p>
    <div class="result-grid">
      <div class="result-item"><span>Linhas lidas</span><strong>${formatNumber.format(summary.linhas_lidas || 0)}</strong></div>
      <div class="result-item"><span>Novas vendas</span><strong>${formatNumber.format(summary.linhas_incluidas || 0)}</strong></div>
      <div class="result-item"><span>Vendas alteradas</span><strong>${formatNumber.format(summary.linhas_alteradas || 0)}</strong></div>
      <div class="result-item"><span>Sem alteracao</span><strong>${formatNumber.format(summary.linhas_sem_alteracao || 0)}</strong></div>
      <div class="result-item"><span>Total na empresa</span><strong>${formatNumber.format(summary.total_vendas_empresa || 0)}</strong></div>
    </div>
  `;
  loadMercadoLivreSales();
}

function mercadoLivreDashboardElements() {
  return {
    company: document.getElementById("ml-dashboard-company"),
    year: document.getElementById("ml-dashboard-year"),
    status: document.getElementById("ml-dashboard-status"),
    chart: document.getElementById("ml-dashboard-chart"),
  };
}

function updateMercadoLivreDashboardYears(payload, selectedYear) {
  const yearSelect = document.getElementById("ml-dashboard-year");
  if (!yearSelect) {
    return;
  }
  const years = Array.from(new Set([...(payload.years || []), 2025])).sort((a, b) => a - b);
  const currentValue = selectedYear || yearSelect.value || "todos";
  yearSelect.innerHTML = `
    <option value="todos">Todos</option>
    ${years.map((year) => `<option value="${year}">${year}</option>`).join("")}
  `;
  yearSelect.value = [...yearSelect.options].some((option) => option.value === currentValue)
    ? currentValue
    : "todos";
}

function renderMercadoLivreDashboardChart(payload) {
  const elements = mercadoLivreDashboardElements();
  const points = payload.chart?.points || [];
  const maxValue = Math.max(...points.map((point) => Number(point.value) || 0), 1);
  const total = Number(payload.chart?.total || 0);
  const scaleLabels = [1, 0.75, 0.5, 0.25, 0].map((ratio) => ({
    value: maxValue * ratio,
    top: `${(1 - ratio) * 100}%`,
  }));

  elements.chart.innerHTML = `
    <div class="ml-chart-header">
      <div>
        <p class="eyebrow">Vendas</p>
        <h3>${escapeHtml(payload.chart?.title || "Vendas")} - ${escapeHtml(payload.empresa || "")}</h3>
        <p class="muted">Valor liquido: produtos + taxas, tarifas, envios, cancelamentos e reembolsos.</p>
      </div>
      <strong>${formatCurrency2.format(total)}</strong>
    </div>
    <div class="ml-column-chart">
      <div class="ml-chart-scale" aria-hidden="true">
        ${scaleLabels.map((label) => `
          <span style="top:${label.top}">${formatCurrency.format(label.value)}</span>
        `).join("")}
      </div>
      <div class="ml-chart-plot">
        ${scaleLabels.map((label) => `<i style="top:${label.top}"></i>`).join("")}
        <div class="ml-chart-bars">
          ${points.map((point) => {
            const value = Math.max(0, Number(point.value) || 0);
            const height = value > 0 ? Math.max(2, (value / maxValue) * 100) : 1;
            return `
              <div class="ml-chart-bar-item">
                <div class="ml-chart-bar-wrap">
                  <div class="ml-chart-bar" style="height:${height}%">
                    <span>${value > 0 ? escapeHtml(formatCurrency2.format(value)) : ""}</span>
                  </div>
                </div>
                <strong>${escapeHtml(point.label || "")}</strong>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    </div>
  `;
}

async function loadMercadoLivreDashboard() {
  const elements = mercadoLivreDashboardElements();
  if (!elements.company || !elements.year || !elements.chart) {
    return;
  }
  const company = elements.company.value || "agrupado";
  const year = elements.year.value || "todos";
  elements.status.textContent = "Carregando dashboard...";
  elements.chart.innerHTML = "";
  try {
    const payload = await fetchJson(`/api/mercado-livre/sales-dashboard?company=${encodeURIComponent(company)}&year=${encodeURIComponent(year)}`);
    updateMercadoLivreDashboardYears(payload, year);
    renderMercadoLivreDashboardChart(payload);
    elements.status.textContent = `${payload.empresa}: ${formatNumber.format(payload.linhas_consideradas || 0)} venda(s) consideradas.`;
  } catch (error) {
    elements.status.textContent = error.message;
    elements.chart.innerHTML = "";
  }
}

function mercadoLivreGeneralElements() {
  return {
    search: document.getElementById("ml-general-search"),
    status: document.getElementById("ml-general-status"),
    head: document.getElementById("ml-general-table-head"),
    body: document.getElementById("ml-general-table-body"),
  };
}

async function loadMercadoLivreGeneral() {
  const elements = mercadoLivreGeneralElements();
  if (!elements.search) {
    return;
  }
  const query = elements.search.value.trim();
  elements.status.textContent = "Carregando gestao geral...";
  try {
    const payload = await fetchJson(`/api/mercado-livre/general?q=${encodeURIComponent(query)}&limit=300`);
    elements.head.innerHTML = `
      <tr>
        ${payload.columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}
      </tr>
    `;
    elements.body.innerHTML = payload.rows.map((row) => `
      <tr>
        ${payload.columns.map((column) => `<td>${escapeHtml(formatMercadoLivreCell(column.key, row[column.key]))}</td>`).join("")}
      </tr>
    `).join("");
    if (!payload.rows.length) {
      elements.body.innerHTML = `<tr><td colspan="${Math.max(1, payload.columns.length)}">Nenhum SKU encontrado.</td></tr>`;
    }
    elements.status.textContent = `Gestao Geral: exibindo ${formatNumber.format(payload.rows.length)} de ${formatNumber.format(payload.total_filtrado)} encontrado(s). Base com ${formatNumber.format(payload.total_registros)} SKU(s).`;
  } catch (error) {
    elements.status.textContent = error.message;
    elements.head.innerHTML = "";
    elements.body.innerHTML = "";
  }
}

function scheduleMercadoLivreGeneralLoad() {
  clearTimeout(mercadoLivreGeneralTimer);
  mercadoLivreGeneralTimer = setTimeout(loadMercadoLivreGeneral, 300);
}

function exportMercadoLivreGeneral() {
  window.location.href = `/api/export-mercado-livre-general?_=${Date.now()}`;
}

function setMercadoLivreTab(tabName) {
  document.querySelectorAll("[data-ml-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.mlTab === tabName);
  });
  document.querySelectorAll("#mercado-livre-view .ml-panel").forEach((panel) => {
    panel.classList.remove("active");
  });
  const panelId = tabName === "general"
    ? "ml-general-panel"
    : tabName === "dashboard"
      ? "ml-dashboard-panel"
      : tabName === "sales"
        ? "ml-sales-panel"
        : "ml-ads-panel";
  document.getElementById(panelId).classList.add("active");
  if (tabName === "general") {
    loadMercadoLivreGeneral();
  } else if (tabName === "dashboard") {
    loadMercadoLivreDashboard();
  } else if (tabName === "sales") {
    loadMercadoLivreSales();
  } else {
    loadMercadoLivreAds();
  }
}

async function renderMercadoLivreImportResult(summary) {
  const panel = document.getElementById("ml-ads-result-panel");
  panel.innerHTML = `
    <p class="eyebrow">Resultado</p>
    <h3>${escapeHtml(summary.empresa)}</h3>
    <p class="muted"><strong>${escapeHtml(summary.tipo_nome || mercadoLivreKindLabel(currentMercadoLivreKind))}</strong></p>
    <p class="muted">${escapeHtml(summary.arquivo)} - aba ${escapeHtml(summary.aba)} - cabecalho na linha ${formatNumber.format(summary.linha_cabecalho || 0)}</p>
    <div class="result-grid">
      <div class="result-item">
        <span>Linhas lidas</span>
        <strong>${formatNumber.format(summary.linhas_lidas || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Incluidos/alterados</span>
        <strong>${formatNumber.format(summary.linhas_importadas || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Novos itens</span>
        <strong>${formatNumber.format(summary.linhas_incluidas || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Itens alterados</span>
        <strong>${formatNumber.format(summary.linhas_alteradas || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Sem alteracao</span>
        <strong>${formatNumber.format(summary.linhas_sem_alteracao || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Linhas ignoradas</span>
        <strong>${formatNumber.format(summary.linhas_ignoradas || 0)}</strong>
      </div>
      <div class="result-item">
        <span>Total do arquivo</span>
        <strong>${formatNumber.format(summary.total_registros_empresa || summary.total_anuncios_empresa || 0)}</strong>
      </div>
    </div>
  `;
  currentMercadoLivreCompany = document.getElementById("ml-ads-company").value || "onix";
  currentMercadoLivreKind = summary.tipo || document.getElementById("ml-ads-kind").value || "anuncios";
  currentMercadoLivreImportId = summary.import_id || "";
  mercadoLivreOverview = { companies: [] };
  await loadMercadoLivreOverview();
  loadMercadoLivreAds();
}

async function saveSlowItemsPercentages() {
  const elements = slowItemsElements();
  const inputs = Array.from(elements.body.querySelectorAll("[data-slow-ref]"));
  const items = inputs.map((input) => ({
    referencia: input.dataset.slowRef,
    percentual: parsePtNumber(input.value),
  }));

  elements.saveButton.disabled = true;
  elements.saveButton.textContent = "Salvando...";
  elements.status.textContent = "Salvando percentuais...";
  try {
    const payload = await fetchJson("/api/slow-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company: elements.company.value || "ionlab",
        query: elements.search.value.trim(),
        items,
      }),
    });
    renderSlowItemsTable(payload);
    elements.status.textContent = `${payload.empresa}: ${payload.message}`;
  } catch (error) {
    elements.status.textContent = error.message;
  } finally {
    elements.saveButton.disabled = false;
    elements.saveButton.textContent = "Salvar percentuais";
  }
}

function exportSales() {
  const company = document.getElementById("sales-company-select").value || "ionlab";
  const params = new URLSearchParams({
    company,
    start_date: document.getElementById("sales-export-start-date").value.trim(),
    end_date: document.getElementById("sales-export-end-date").value.trim(),
    client: document.getElementById("sales-export-client").value.trim(),
    product: document.getElementById("sales-export-product").value.trim(),
    _: Date.now().toString(),
  });
  window.location.href = `/api/export-sales?${params.toString()}`;
}

function exportSalesMissingCost() {
  const panel = document.getElementById("sales-result-panel");
  const company = document.getElementById("sales-company-select").value || "ionlab";
  const startDate = document.getElementById("sales-export-start-date").value.trim();
  const endDate = document.getElementById("sales-export-end-date").value.trim();

  if (!startDate || !endDate) {
    panel.innerHTML = `
      <p class="eyebrow">Resultado</p>
      <h3>Periodo obrigatorio</h3>
      <p class="muted">Informe Data inicial e Data final para gerar o Log Sem Custo.</p>
    `;
    return;
  }

  const params = new URLSearchParams({
    company,
    start_date: startDate,
    end_date: endDate,
    _: Date.now().toString(),
  });
  window.location.href = `/api/export-sales-missing-cost?${params.toString()}`;
}

async function handleImport(event, options) {
  event.preventDefault();

  const form = event.currentTarget;
  const button = form.querySelector("button");
  const panel = document.getElementById(options.panelId);

  button.disabled = true;
  button.textContent = options.loadingButton;
  panel.innerHTML = `
    <p class="eyebrow">Resultado</p>
    <h3>Processando arquivo</h3>
    <p class="muted">A importacao esta conferindo duplicidades antes de gravar.</p>
  `;

  try {
    const summary = await fetchJson(options.url, {
      method: "POST",
      body: new FormData(form),
    });
    await options.render(summary);
    await renderStats();
  } catch (error) {
    panel.innerHTML = `
      <p class="eyebrow">Resultado</p>
      <h3>Nao foi possivel importar</h3>
      <p class="muted">${error.message}</p>
    `;
  } finally {
    button.disabled = false;
    button.textContent = options.defaultButton;
  }
}

function setRoutine(routineName) {
  const permissionKey = routinePermissionMap[routineName];
  if (permissionKey && !canAccessPermission(permissionKey)) {
    alert("Usuario sem permissao para esta rotina.");
    routineName = Object.keys(routinePermissionMap).find((key) => canAccessPermission(routinePermissionMap[key])) || "sales";
  }
  const targetRoutine = document.getElementById(`${routineName}-routine`);
  if (!targetRoutine) {
    console.warn(`Rotina nao encontrada: ${routineName}`);
    return;
  }
  document.querySelectorAll(".routine").forEach((routine) => routine.classList.remove("visible"));
  targetRoutine.classList.add("visible");

  document.querySelectorAll(".routine-tab").forEach((tabButton) => {
    tabButton.classList.toggle("active", tabButton.dataset.routine === routineName);
  });

  if (routineName === "slow-items") {
    loadSlowItems();
  }
  if (routineName === "users") {
    loadUsers();
  }
}

function showLoginScreen(message = "") {
  document.getElementById("login-screen").classList.remove("auth-hidden");
  document.getElementById("password-change-screen").classList.add("auth-hidden");
  document.getElementById("app-shell").classList.add("auth-hidden");
  if (message) {
    document.getElementById("login-status").textContent = message;
  }
}

function showPasswordChangeScreen(message = "") {
  document.getElementById("login-screen").classList.add("auth-hidden");
  document.getElementById("password-change-screen").classList.remove("auth-hidden");
  document.getElementById("app-shell").classList.add("auth-hidden");
  document.getElementById("password-change-new").value = "";
  document.getElementById("password-change-confirm").value = "";
  document.getElementById("password-change-status").textContent = message || "A senha precisa ter pelo menos 6 caracteres.";
  setTimeout(() => document.getElementById("password-change-new")?.focus(), 50);
}

function showAppScreen() {
  document.getElementById("login-screen").classList.add("auth-hidden");
  document.getElementById("password-change-screen").classList.add("auth-hidden");
  document.getElementById("app-shell").classList.remove("auth-hidden");
}

function repairReconstructedLayout() {
  const vendorView = document.getElementById("vendor-page-view");
  const insertBefore = document.getElementById("vendor-workspace-indicators");
  if (!vendorView || !insertBefore) {
    return;
  }
  ["vendor-workspace-quick-consult", "quote-panel-anchor", "vendor-workspace-quotes", "vendor-workspace-sent-quotes"].forEach((id) => {
    const node = document.getElementById(id);
    if (node && node.parentElement !== vendorView) {
      vendorView.insertBefore(node, insertBefore);
    }
  });
}

async function handleLogin(event) {
  event.preventDefault();
  const status = document.getElementById("login-status");
  status.textContent = "Validando acesso...";
  try {
    const payload = await fetchJson("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login: document.getElementById("login-user").value.trim(),
        password: document.getElementById("login-password").value,
      }),
    });
    localStorage.setItem(authTokenKey, payload.token);
    currentUser = payload.user;
    currentUserCatalog = { groups: payload.groups || [], levels: payload.levels || [] };
    if (payload.force_password_change || payload.user?.trocar_senha_primeiro_acesso) {
      showPasswordChangeScreen("Defina uma nova senha para liberar seu acesso.");
      return;
    }
    window.location.reload();
  } catch (error) {
    status.textContent = error.message;
  }
}

async function checkAuthSession() {
  const token = localStorage.getItem(authTokenKey);
  if (!token) {
    showLoginScreen();
    return false;
  }
  try {
    const payload = await fetchJson("/api/auth/session");
    currentUserCatalog = { groups: payload.groups || [], levels: payload.levels || [] };
    if (!payload.authenticated) {
      localStorage.removeItem(authTokenKey);
      showLoginScreen("Sessao expirada. Entre novamente.");
      return false;
    }
    currentUser = payload.user;
    if (payload.force_password_change || payload.user?.trocar_senha_primeiro_acesso) {
      showPasswordChangeScreen("Defina uma nova senha para liberar seu acesso.");
      return false;
    }
    return true;
  } catch (error) {
    localStorage.removeItem(authTokenKey);
    showLoginScreen(`Nao foi possivel validar a sessao: ${error.message}`);
    return false;
  }
}

async function logout() {
  try {
    await fetchJson("/api/auth/logout", { method: "POST" });
  } catch (_error) {
    // Mesmo se o servidor nao responder, a sessao local deve sair.
  }
  localStorage.removeItem(authTokenKey);
  currentUser = null;
  showLoginScreen("Sessao encerrada.");
}

async function handlePasswordChange(event) {
  event.preventDefault();
  const status = document.getElementById("password-change-status");
  const newPassword = document.getElementById("password-change-new").value;
  const confirmPassword = document.getElementById("password-change-confirm").value;
  status.textContent = "Salvando nova senha...";
  try {
    const payload = await fetchJson("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nova_senha: newPassword, confirmar_senha: confirmPassword }),
    });
    currentUser = payload.user;
    currentUserCatalog = { groups: payload.groups || [], levels: payload.levels || [] };
    status.textContent = payload.message || "Senha alterada com sucesso.";
    window.location.reload();
  } catch (error) {
    status.textContent = error.message;
  }
}

function usersElements() {
  return {
    search: document.getElementById("users-search"),
    status: document.getElementById("users-status"),
    head: document.getElementById("users-table-head"),
    body: document.getElementById("users-table-body"),
    formStatus: document.getElementById("user-form-status"),
  };
}

function renderUserPermissionGroups(permissions = {}) {
  const levels = currentUserCatalog.levels?.length
    ? currentUserCatalog.levels
    : [
      { id: "edit", label: "Incluir/Alterar" },
      { id: "view", label: "Visualizar" },
      { id: "blocked", label: "Bloqueado" },
    ];
  const groups = currentUserCatalog.groups || [];
  document.getElementById("user-permission-groups").innerHTML = groups.map((group) => `
    <section class="permission-group">
      <h4>${escapeHtml(group.label)}</h4>
      ${group.items.map((item) => `
        <label class="permission-row">
          <span>${escapeHtml(item.label)}</span>
          <select data-user-permission="${escapeHtml(item.key)}">
            ${levels.map((level) => `
              <option value="${escapeHtml(level.id)}" ${(permissions[item.key] || "blocked") === level.id ? "selected" : ""}>${escapeHtml(level.label)}</option>
            `).join("")}
          </select>
        </label>
      `).join("")}
    </section>
  `).join("");
}

function clearUserForm() {
  document.getElementById("user-id").value = "";
  document.getElementById("user-name").value = "";
  document.getElementById("user-login").value = "";
  document.getElementById("user-email").value = "";
  document.getElementById("user-password").value = "";
  document.getElementById("user-status").value = "Ativo";
  document.getElementById("user-type").value = "usuario";
  document.getElementById("user-force-password-change").checked = true;
  renderUserPermissionGroups({});
  document.getElementById("user-form-status").textContent = "Novo usuario pronto para cadastro.";
  document.getElementById("user-name").focus();
}

function fillUserForm(user, options = {}) {
  document.getElementById("user-id").value = user.id || "";
  document.getElementById("user-name").value = user.nome || "";
  document.getElementById("user-login").value = user.login || "";
  document.getElementById("user-email").value = user.email || "";
  document.getElementById("user-password").value = "";
  document.getElementById("user-status").value = user.status || "Ativo";
  document.getElementById("user-type").value = user.tipo || "usuario";
  document.getElementById("user-force-password-change").checked = Boolean(user.trocar_senha_primeiro_acesso);
  renderUserPermissionGroups(user.permissions || {});
  if (!options.keepStatus) {
    document.getElementById("user-form-status").textContent = `Editando ${user.nome || user.login}.`;
  }
}

async function loadUsers() {
  const elements = usersElements();
  if (!elements.search) {
    return;
  }
  elements.status.textContent = "Carregando usuarios...";
  try {
    const payload = await fetchJson(`/api/users?q=${encodeURIComponent(elements.search.value.trim())}`);
    currentUsersPayload = payload;
    currentUserCatalog = { groups: payload.groups || currentUserCatalog.groups || [], levels: payload.levels || currentUserCatalog.levels || [] };
    elements.head.innerHTML = `<tr>${payload.columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}<th>Acao</th></tr>`;
    elements.body.innerHTML = payload.rows.map((user) => `
      <tr>
        ${payload.columns.map((column) => `<td>${escapeHtml(formatCell(user[column.key]))}</td>`).join("")}
        <td><button class="secondary-action compact-action" type="button" data-edit-user="${escapeHtml(user.id)}">Editar</button></td>
      </tr>
    `).join("") || `<tr><td colspan="${payload.columns.length + 1}">Nenhum usuario encontrado.</td></tr>`;
    elements.body.querySelectorAll("[data-edit-user]").forEach((button) => {
      button.addEventListener("click", () => {
        const user = (currentUsersPayload.rows || []).find((item) => item.id === button.dataset.editUser);
        if (user) {
          fillUserForm(user);
        }
      });
    });
    elements.status.textContent = `${formatNumber.format(payload.total_filtrado)} usuario(s) encontrado(s).`;
    if (!document.getElementById("user-permission-groups").innerHTML.trim()) {
      clearUserForm();
    }
  } catch (error) {
    elements.status.textContent = error.message;
  }
}

function scheduleUsersLoad() {
  clearTimeout(usersTimer);
  usersTimer = setTimeout(loadUsers, 250);
}

async function saveUser(event) {
  event.preventDefault();
  const permissions = {};
  document.querySelectorAll("[data-user-permission]").forEach((select) => {
    permissions[select.dataset.userPermission] = select.value;
  });
  const payload = {
    id: document.getElementById("user-id").value,
    nome: document.getElementById("user-name").value,
    login: document.getElementById("user-login").value,
    email: document.getElementById("user-email").value,
    senha: document.getElementById("user-password").value,
    status: document.getElementById("user-status").value,
    tipo: document.getElementById("user-type").value,
    trocar_senha_primeiro_acesso: document.getElementById("user-force-password-change").checked,
    permissions,
  };
  const status = document.getElementById("user-form-status");
  status.textContent = "Salvando...";
  try {
    const response = await fetchJson("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    await loadUsers();
    fillUserForm(response.user, { keepStatus: true });
    status.textContent = "Salvo.";
  } catch (error) {
    status.textContent = error.message;
  }
}

function followUpElements() {
  return {
    company: document.getElementById("follow-up-company"),
    vendor: document.getElementById("follow-up-vendor"),
    region: document.getElementById("follow-up-region"),
    uf: document.getElementById("follow-up-uf"),
    city: document.getElementById("follow-up-city"),
    client: document.getElementById("follow-up-client"),
    start: document.getElementById("follow-up-start"),
    end: document.getElementById("follow-up-end"),
    probability: document.getElementById("follow-up-probability"),
    scheduled: document.getElementById("follow-up-scheduled"),
    status: document.getElementById("follow-up-status"),
    summary: document.getElementById("follow-up-summary"),
    head: document.getElementById("follow-up-head"),
    body: document.getElementById("follow-up-body"),
  };
}

function renderFollowUpOptions(payload) {
  const elements = followUpElements();
  const vendorValue = elements.vendor.value;
  const regionValue = elements.region.value;
  const ufValue = elements.uf.value;
  const cityValue = elements.city.value;
  elements.vendor.innerHTML = `${payload.is_admin ? '<option value="">Todos</option>' : ""}${(payload.vendors || []).map((vendor) => (
    `<option value="${escapeHtml(vendor.id)}">${escapeHtml(vendor.nome || vendor.id)}</option>`
  )).join("")}`;
  if (vendorValue && [...elements.vendor.options].some((option) => option.value === vendorValue)) {
    elements.vendor.value = vendorValue;
  }
  if (!payload.is_admin && (payload.vendors || []).length === 1) {
    elements.vendor.value = payload.vendors[0].id;
    elements.vendor.disabled = true;
  } else {
    elements.vendor.disabled = false;
  }

  elements.region.innerHTML = '<option value="">Todas</option>' + (payload.regions || []).map((item) => (
    `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`
  )).join("");
  elements.uf.innerHTML = '<option value="">Todas</option>' + (payload.ufs || []).map((item) => (
    `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`
  )).join("");
  elements.city.innerHTML = '<option value="">Todas</option>' + (payload.cities || []).map((item) => (
    `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`
  )).join("");
  if (regionValue && [...elements.region.options].some((option) => option.value === regionValue)) {
    elements.region.value = regionValue;
  }
  if (ufValue && [...elements.uf.options].some((option) => option.value === ufValue)) {
    elements.uf.value = ufValue;
  }
  if (cityValue && [...elements.city.options].some((option) => option.value === cityValue)) {
    elements.city.value = cityValue;
  }
}

async function loadFollowUpOptions() {
  const elements = followUpElements();
  if (!elements.company) {
    return null;
  }
  elements.status.textContent = "Carregando filtros do Follow-UP...";
  const company = elements.company.value || "ionlab";
  const payload = await fetchJson(`/api/follow-up/options?company=${encodeURIComponent(company)}`, { force: true });
  currentFollowUpOptions = payload;
  renderFollowUpOptions(payload);
  elements.status.textContent = `${payload.empresa}: ${formatNumber.format(payload.total || 0)} atendimento(s) salvo(s) na base.`;
  return payload;
}

function followUpParams() {
  const elements = followUpElements();
  return new URLSearchParams({
    company: elements.company.value || "ionlab",
    vendor_id: elements.vendor.value || "",
    region: elements.region.value || "",
    uf: elements.uf.value || "",
    city: elements.city.value || "",
    q: elements.client.value || "",
    start_date: elements.start.value || "",
    end_date: elements.end.value || "",
    probability: elements.probability.value || "",
    scheduled: elements.scheduled.value || "",
  });
}

function exportFollowUp() {
  const params = followUpParams();
  const token = localStorage.getItem(authTokenKey) || "";
  params.set("token", token);
  params.set("_", String(Date.now()));
  window.location.href = `/api/follow-up/export-xlsx?${params.toString()}`;
}

async function loadFollowUp() {
  const elements = followUpElements();
  if (!elements.company) {
    return;
  }
  elements.status.textContent = "Buscando atendimentos...";
  try {
    const payload = await fetchJson(`/api/follow-up?${followUpParams().toString()}`, { force: true });
    currentFollowUpPayload = payload;
    renderFollowUp(payload);
    elements.status.textContent = `${payload.empresa}: exibindo ${formatNumber.format(payload.rows?.length || 0)} de ${formatNumber.format(payload.total || 0)} atendimento(s) encontrado(s).`;
  } catch (error) {
    currentFollowUpPayload = null;
    elements.head.innerHTML = "";
    elements.body.innerHTML = "";
    elements.summary.innerHTML = "";
    elements.status.textContent = error.message;
  }
}

function scheduleFollowUpLoad() {
  clearTimeout(followUpTimer);
  followUpTimer = setTimeout(loadFollowUp, 250);
}

function renderFollowUp(payload) {
  const elements = followUpElements();
  const rows = payload.rows || [];
  const scheduled = rows.filter((row) => row.data_agendamento_contato).length;
  const highProbability = rows.filter((row) => Number(row.probabilidade_compra_futura || 0) >= 7).length;
  const clients = new Set(rows.map((row) => row.client_id).filter(Boolean)).size;
  elements.summary.innerHTML = `
    <article><span>Atendimentos</span><strong>${formatNumber.format(payload.total || 0)}</strong></article>
    <article><span>Clientes únicos</span><strong>${formatNumber.format(clients)}</strong></article>
    <article><span>Com agenda</span><strong>${formatNumber.format(scheduled)}</strong></article>
    <article><span>Prob. 7 a 10</span><strong>${formatNumber.format(highProbability)}</strong></article>
  `;
  elements.head.innerHTML = `
    <tr>
      ${(payload.columns || []).map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}
      <th>Ficha</th>
    </tr>
  `;
  elements.body.innerHTML = rows.map((row, index) => `
    <tr>
      ${(payload.columns || []).map((column) => `<td>${escapeHtml(row[column.key] || "")}</td>`).join("")}
      <td><button class="mini-action" type="button" data-follow-up-detail="${index}">Ver respostas</button></td>
    </tr>
    <tr class="follow-up-detail-row" data-follow-up-detail-row="${index}">
      <td colspan="${(payload.columns || []).length + 1}">
        ${renderFollowUpDetail(row)}
      </td>
    </tr>
  `).join("") || `<tr><td colspan="${(payload.columns || []).length + 1}">Nenhum atendimento encontrado.</td></tr>`;
  elements.body.querySelectorAll("[data-follow-up-detail]").forEach((button) => {
    button.addEventListener("click", () => toggleFollowUpDetail(button.dataset.followUpDetail));
  });
}

function renderFollowUpDetail(row) {
  const answers = row.answers || [];
  return `
    <div class="follow-up-detail">
      <div>
        <p class="eyebrow">Resumo</p>
        <h4>${escapeHtml(row.cliente_nome || "")}</h4>
        <p>${escapeHtml(row.resumo || "Sem resumo informado.")}</p>
        <small>${escapeHtml(row.vendedor || "")} | ${escapeHtml(row.regiao || "")} | salvo em ${escapeHtml(row.saved_at || "")}</small>
      </div>
      <div class="follow-up-answers">
        ${answers.map((answer) => `
          <article>
            <span>${escapeHtml(answer.label)}</span>
            <strong>${escapeHtml(answer.value)}</strong>
          </article>
        `).join("") || '<div class="empty-state">Ficha sem respostas detalhadas.</div>'}
      </div>
    </div>
  `;
}

function toggleFollowUpDetail(index) {
  document.querySelectorAll("[data-follow-up-detail-row]").forEach((row) => {
    const active = row.dataset.followUpDetailRow === String(index) && !row.classList.contains("active");
    row.classList.toggle("active", active);
  });
}

async function init() {
  document.getElementById("login-form").addEventListener("submit", handleLogin);
  document.getElementById("password-change-form").addEventListener("submit", handlePasswordChange);
  document.getElementById("password-change-logout").addEventListener("click", logout);
  document.getElementById("logout-button").addEventListener("click", logout);
  repairReconstructedLayout();
  if (!await checkAuthSession()) {
    return;
  }
  companies.push(...await fetchJson("/api/companies"));
  renderCompanies();
  setupProspectPeriodControls();
  setupMonthlyItemsPeriodControls();
  applyAccessControls();

  document.getElementById("home-return-button").addEventListener("click", goHome);
  document.getElementById("users-search").addEventListener("input", scheduleUsersLoad);
  document.getElementById("user-new-button").addEventListener("click", clearUserForm);
  document.getElementById("user-clear-button").addEventListener("click", clearUserForm);
  document.getElementById("user-form").addEventListener("submit", saveUser);

  document.querySelectorAll("[data-costing-table]").forEach((button) => {
    button.addEventListener("click", () => setCostingInternalTable(button.dataset.costingTable));
  });

  ["sales", "clients", "stock", "in-transit", "prices", "products", "costing", "costing-fabricated"].forEach((tableName) => {
    const elements = tableElements(tableName);
    elements.company.addEventListener("change", () => loadTable(tableName));
    elements.search.addEventListener("input", () => scheduleTableLoad(tableName));
  });

  document.getElementById("slow-items-company").addEventListener("change", loadSlowItems);
  document.getElementById("slow-items-search").addEventListener("input", scheduleSlowItemsLoad);
  document.getElementById("slow-items-load-button").addEventListener("click", loadSlowItems);
  document.getElementById("slow-items-save-button").addEventListener("click", saveSlowItemsPercentages);
  document.getElementById("slow-items-export-button").addEventListener("click", exportSlowItems);

  document.getElementById("ml-ads-search").addEventListener("input", scheduleMercadoLivreAdsLoad);
  document.getElementById("ml-ads-company").addEventListener("change", () => {
    currentMercadoLivreCompany = document.getElementById("ml-ads-company").value || "onix";
    const selectedCompany = (mercadoLivreOverview.companies || []).find((company) => company.id === currentMercadoLivreCompany);
    currentMercadoLivreImportId = currentMercadoLivreKind === "resumo" ? "resumo" : mercadoLivreImportsForCurrentKind(selectedCompany)[0]?.id || "";
    renderMercadoLivreTabs();
    loadMercadoLivreAds();
  });
  document.getElementById("ml-ads-kind").addEventListener("change", () => {
    currentMercadoLivreKind = document.getElementById("ml-ads-kind").value || "anuncios";
    const selectedCompany = (mercadoLivreOverview.companies || []).find((company) => company.id === currentMercadoLivreCompany);
    currentMercadoLivreImportId = currentMercadoLivreKind === "resumo" ? "resumo" : mercadoLivreImportsForCurrentKind(selectedCompany)[0]?.id || "";
    renderMercadoLivreTabs();
    loadMercadoLivreAds();
  });
  document.getElementById("ml-summary-export-button").addEventListener("click", exportMercadoLivreSummary);
  document.querySelectorAll("[data-ml-tab]").forEach((button) => {
    button.addEventListener("click", () => setMercadoLivreTab(button.dataset.mlTab || "ads"));
  });
  document.getElementById("ml-sales-company").addEventListener("change", loadMercadoLivreSales);
  document.getElementById("ml-sales-search").addEventListener("input", scheduleMercadoLivreSalesLoad);
  document.getElementById("ml-dashboard-company").addEventListener("change", loadMercadoLivreDashboard);
  document.getElementById("ml-dashboard-year").addEventListener("change", loadMercadoLivreDashboard);
  document.getElementById("ml-general-search").addEventListener("input", scheduleMercadoLivreGeneralLoad);
  document.getElementById("ml-general-export-button").addEventListener("click", exportMercadoLivreGeneral);

  document.getElementById("dashboard-company").addEventListener("change", () => {
    dashboardLoaded = false;
    document.getElementById("dashboard-vendor-select").innerHTML = "";
    loadDashboard();
  });
  document.getElementById("dashboard-annual-year").addEventListener("change", () => {
    if (currentDashboardChart === "annual-sales") {
      loadDashboardSalesCharts();
    }
  });
  document.getElementById("dashboard-monthly-year").addEventListener("change", () => {
    if (currentDashboardChart === "monthly-evolution") {
      loadDashboardSalesCharts();
    }
  });
  document.getElementById("dashboard-monthly-origin").addEventListener("change", () => {
    if (currentDashboardChart === "monthly-evolution") {
      loadDashboardSalesCharts();
    }
  });
  document.getElementById("dashboard-monthly-agrp").addEventListener("change", () => {
    if (currentDashboardChart === "monthly-evolution") {
      loadDashboardSalesCharts();
    }
  });
  document.getElementById("dashboard-family-year").addEventListener("change", () => {
    if (currentDashboardChart === "family-sales") {
      loadDashboardSalesCharts();
    }
  });
  document.getElementById("dashboard-family-origin").addEventListener("change", () => {
    if (currentDashboardChart === "family-sales") {
      loadDashboardSalesCharts();
    }
  });
  document.getElementById("dashboard-family-agrp").addEventListener("change", () => {
    if (currentDashboardChart === "family-sales") {
      loadDashboardSalesCharts();
    }
  });
  document.querySelectorAll("[data-dashboard-chart]").forEach((button) => {
    button.addEventListener("click", () => setDashboardChart(button.dataset.dashboardChart));
  });
  document.querySelectorAll("[data-region-dimension]").forEach((button) => {
    button.addEventListener("click", () => setVendorRegionDimension(button.dataset.regionDimension));
  });
  document.querySelectorAll("[data-region-indicator]").forEach((button) => {
    button.addEventListener("click", () => setVendorRegionIndicator(button.dataset.regionIndicator));
  });
  document.querySelectorAll("[data-vendor-workspace]").forEach((button) => {
    button.addEventListener("click", () => setVendorWorkspaceSection(button.dataset.vendorWorkspace));
  });
  document.getElementById("quote-client-search").addEventListener("input", scheduleQuoteClientSearch);
  document.getElementById("quick-consult-search").addEventListener("input", scheduleQuickConsultSearch);
  document.getElementById("quote-saved-search").addEventListener("input", scheduleSavedQuoteSearch);
  document.getElementById("order-saved-search").addEventListener("input", scheduleSavedOrderSearch);
  document.getElementById("quote-saved-open").addEventListener("click", () => openSavedCommercialDocumentFromSearch("quote"));
  document.getElementById("order-saved-open").addEventListener("click", () => openSavedCommercialDocumentFromSearch("order"));
  document.getElementById("quote-saved-search").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      openSavedCommercialDocumentFromSearch("quote");
    }
  });
  document.getElementById("order-saved-search").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      openSavedCommercialDocumentFromSearch("order");
    }
  });
  document.getElementById("quote-product-search").addEventListener("input", scheduleQuoteProductSearch);
  document.getElementById("quote-add-item").addEventListener("click", addQuoteItem);
  document.getElementById("quote-close").addEventListener("click", closeQuote);
  document.getElementById("quote-convert-order").addEventListener("click", convertQuoteToOrder);
  document.getElementById("order-save").addEventListener("click", saveOrder);
  document.addEventListener("keydown", (event) => {
    const tagName = document.activeElement?.tagName || "";
    const isEditing = ["INPUT", "TEXTAREA", "SELECT"].includes(tagName);
    if (event.ctrlKey && !event.shiftKey && !event.altKey && event.key.toLowerCase() === "c" && !isEditing) {
      const vendorView = document.getElementById("vendor-page-view");
      if (vendorView?.classList.contains("visible")) {
        event.preventDefault();
        openQuickConsultShortcut();
      }
    }
  });
  document.getElementById("vendor-daybyday-refresh").addEventListener("click", loadVendorDayByDay);
  document.getElementById("vendor-agenda-refresh").addEventListener("click", loadVendorAgenda);
  document.getElementById("vendor-contact-report-load").addEventListener("click", loadVendorContactReport);
  document.getElementById("vendor-daily-contact-month")?.addEventListener("change", loadVendorDailyContactsChart);
  document.getElementById("vendor-page-goals-month").addEventListener("change", renderVendorPageGoals);
  document.querySelectorAll("[data-vendor-client-status]").forEach((button) => {
    button.addEventListener("click", () => setVendorClientStatus(button.dataset.vendorClientStatus));
  });
  ["uf", "ddd", "city"].forEach((filterName) => {
    const select = document.getElementById(`vendor-client-filter-${filterName}`);
    if (select) {
      select.addEventListener("change", () => {
        currentVendorClientFilters[filterName] = select.value;
        vendorRegionClientsLoaded = false;
        loadVendorRegionClients(true);
      });
    }
  });
  document.getElementById("vendor-client-filter-search")?.addEventListener("input", () => {
    vendorRegionClientsLoaded = false;
    clearTimeout(regionClientSearchTimer);
    regionClientSearchTimer = setTimeout(() => loadVendorRegionClients(true), 250);
  });
  document.getElementById("dashboard-vendor-select").addEventListener("change", loadVendorRegionsChart);
  document.getElementById("follow-up-company").addEventListener("change", async () => {
    await loadFollowUpOptions();
    await loadFollowUp();
  });
  document.getElementById("follow-up-load").addEventListener("click", loadFollowUp);
  document.getElementById("follow-up-export").addEventListener("click", exportFollowUp);
  ["follow-up-vendor", "follow-up-region", "follow-up-uf", "follow-up-city", "follow-up-start", "follow-up-end", "follow-up-probability", "follow-up-scheduled"].forEach((id) => {
    document.getElementById(id).addEventListener("change", loadFollowUp);
  });
  document.getElementById("follow-up-client").addEventListener("input", scheduleFollowUpLoad);
  document.getElementById("clients-table-export-button").addEventListener("click", exportClientsTable);
  document.getElementById("stock-table-export-button").addEventListener("click", exportStockTable);
  document.getElementById("in-transit-table-export-button").addEventListener("click", exportInTransitTable);
  document.getElementById("prices-table-export-button").addEventListener("click", exportPriceTable);
  document.getElementById("products-table-export-button").addEventListener("click", exportProductsTable);
  document.getElementById("costing-table-export-button").addEventListener("click", () => exportCostingTable("costing"));
  document.getElementById("costing-fabricated-table-export-button").addEventListener("click", () => exportCostingTable("costing-fabricated"));

  if (vendorPageRoute()) {
    showAppScreen();
    await loadVendorPage();
    return;
  }

  setTimeout(() => {
    renderStats().catch((error) => {
      const grid = document.getElementById("stats-grid");
      if (grid) {
        grid.innerHTML = `<div class="table-status">Nao foi possivel carregar o resumo inicial: ${escapeHtml(error.message)}</div>`;
      }
    });
    renderHomeVendorPages().catch((error) => {
      const grid = document.getElementById("home-vendor-grid");
      if (grid) {
        grid.innerHTML = `<div class="table-status">Nao foi possivel carregar os acessos dos vendedores: ${escapeHtml(error.message)}</div>`;
      }
    });
  }, 800);

  document.getElementById("prospect-company").addEventListener("change", async () => {
    document.getElementById("prospect-client-search").value = "";
    clearProspectClientSelection();
    await loadProspectOptions();
  });
  document.getElementById("prospect-uf").addEventListener("change", async () => {
    document.getElementById("prospect-client-search").value = "";
    clearProspectClientSelection();
    await loadProspectOptions();
  });
  document.getElementById("prospect-city").addEventListener("change", () => {
    document.getElementById("prospect-client-search").value = "";
    clearProspectClientSelection();
  });
  document.getElementById("prospect-client-search").addEventListener("input", scheduleProspectClientSearch);
  document.getElementById("prospect-form").addEventListener("submit", handleProspectSubmit);
  document.getElementById("regions-company").addEventListener("change", loadRegions);
  document.getElementById("regions-vendor-filter").addEventListener("change", (event) => {
    currentRegionsVendorFilter = event.currentTarget.value || "all";
    renderRegions();
  });
  document.getElementById("vendors-company").addEventListener("change", () => {
    clearVendorForm();
    showVendorList();
    loadVendors();
    loadVendorGoals();
    loadVendorRegisterRegions();
  });
  document.getElementById("vendor-actor-role").addEventListener("change", applyVendorPermissionState);
  document.getElementById("vendors-search").addEventListener("input", scheduleVendorsLoad);
  document.getElementById("vendor-new-from-list").addEventListener("click", clearVendorForm);
  document.getElementById("vendor-back-to-list").addEventListener("click", showVendorList);
  document.getElementById("vendors-status-filter").addEventListener("change", loadVendors);
  document.querySelectorAll("[data-vendor-status-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById("vendors-status-filter").value = button.dataset.vendorStatusFilter;
      renderVendorsPayload({
        empresa: companies.find((item) => item.id === (document.getElementById("vendors-company")?.value || "ionlab"))?.name || "Empresa",
        columns: currentVendorColumns,
        rows: currentVendors,
        total_filtrado: currentVendors.length,
        ativos: currentVendors.filter((item) => item.status === "Ativo").length,
        inativos: currentVendors.filter((item) => item.status !== "Ativo").length,
      });
    });
  });
  document.querySelectorAll("[data-vendor-section]").forEach((button) => {
    button.addEventListener("click", () => setVendorSection(button.dataset.vendorSection));
  });
  document.getElementById("vendor-regions-vendor").addEventListener("change", loadVendorRegisterRegions);
  document.getElementById("vendor-regions-search").addEventListener("input", () => {
    clearTimeout(vendorRegionsSearchTimer);
    vendorRegionsSearchTimer = setTimeout(loadVendorRegisterRegions, 250);
  });
  document.getElementById("vendor-regions-uf-filter").addEventListener("change", () => renderVendorRegionsManager(currentVendorRegionsPayload || { rows: [] }));
  document.getElementById("vendor-regions-city-filter").addEventListener("input", () => renderVendorRegionsManager(currentVendorRegionsPayload || { rows: [] }));
  document.getElementById("vendor-regions-exclude-button").addEventListener("click", excludeSelectedVendorRegions);
  document.getElementById("vendor-goals-vendor").addEventListener("change", loadVendorGoals);
  document.getElementById("vendor-goals-year").addEventListener("change", loadVendorGoals);
  document.getElementById("vendor-goals-month").addEventListener("change", () => {
    if (currentVendorGoalsPayload) {
      syncVendorGoalFormIntoPayload();
      renderVendorGoals(currentVendorGoalsPayload);
    }
  });
  document.getElementById("vendor-goals-save").addEventListener("click", saveVendorGoals);
  document.getElementById("vendor-goals-reload").addEventListener("click", loadVendorGoals);
  document.getElementById("vendor-goals-replicate").addEventListener("click", replicateVendorGoalsNextMonths);
  ["monthly-items-company", "monthly-items-year", "monthly-items-month"].forEach((id) => {
    document.getElementById(id).addEventListener("change", loadMonthlyItems);
  });
  document.getElementById("monthly-items-save").addEventListener("click", saveMonthlyItems);
  document.getElementById("monthly-items-reload").addEventListener("click", loadMonthlyItems);
  document.getElementById("monthly-item-search").addEventListener("input", () => {
    clearTimeout(monthlyItemSearchTimer);
    monthlyItemSearchTimer = setTimeout(searchMonthlyItems, 250);
  });
  document.querySelectorAll("[data-vendor-tab]").forEach((button) => {
    button.addEventListener("click", () => setVendorTab(button.dataset.vendorTab));
  });
  document.getElementById("vendor-city-select").addEventListener("change", renderVendorDddOptions);
  document.getElementById("vendor-city-filter").addEventListener("input", renderVendorAssignmentLists);
  document.getElementById("vendor-add-city").addEventListener("click", addVendorCityAssignment);
  document.getElementById("vendor-remove-selected-cities").addEventListener("click", removeSelectedVendorCities);
  document.getElementById("vendor-clear-assignments").addEventListener("click", clearVendorAssignments);
  document.getElementById("vendor-client-search").addEventListener("input", scheduleVendorClientSearch);
  document.getElementById("vendor-add-specific-client").addEventListener("click", addPendingVendorSpecificClient);
  document.getElementById("vendor-photo").addEventListener("change", updateVendorPhotoPreview);
  document.getElementById("vendor-form").addEventListener("submit", saveVendor);
  document.getElementById("vendor-clear").addEventListener("click", clearVendorForm);
  document.getElementById("blocked-company").addEventListener("change", async () => {
    currentBlockedClient = null;
    document.getElementById("blocked-client-code").value = "";
    document.getElementById("blocked-client-name").textContent = "Digite o codigo para localizar o cliente.";
    document.getElementById("blocked-client-suggestions").classList.remove("visible");
    document.getElementById("blocked-client-suggestions").innerHTML = "";
    await loadBlockedClients();
  });
  document.getElementById("blocked-search").addEventListener("input", scheduleBlockedLoad);
  document.getElementById("blocked-client-code").addEventListener("input", () => {
    currentBlockedClient = null;
    document.getElementById("blocked-client-name").textContent = "Digite o codigo para localizar o cliente.";
    document.getElementById("blocked-client-name").classList.remove("found", "missing");
    scheduleBlockedClientSearch();
  });
  document.getElementById("blocked-client-code").addEventListener("change", lookupBlockedClient);
  document.getElementById("blocked-form").addEventListener("submit", saveBlockedClient);
  document.getElementById("block-reason-form").addEventListener("submit", addBlockReason);

  document.getElementById("sales-import-form").addEventListener("submit", (event) => handleImport(event, {
    url: "/api/import-sales",
    panelId: "sales-result-panel",
    defaultButton: "Importar notas",
    loadingButton: "Importando...",
    render: renderResult,
  }));
  document.getElementById("sales-recalculate-cost-button").addEventListener("click", recalculateSalesCost);
  document.getElementById("sales-missing-cost-button").addEventListener("click", exportSalesMissingCost);
  document.getElementById("sales-export-button").addEventListener("click", exportSales);

  document.getElementById("clients-import-form").addEventListener("submit", (event) => handleImport(event, {
    url: "/api/import-clients",
    panelId: "clients-result-panel",
    defaultButton: "Importar clientes",
    loadingButton: "Importando...",
    render: renderClientResult,
  }));

  document.getElementById("stock-import-form").addEventListener("submit", (event) => handleImport(event, {
    url: "/api/import-stock",
    panelId: "stock-result-panel",
    defaultButton: "Importar estoque",
    loadingButton: "Importando...",
    render: renderStockResult,
  }));
  document.getElementById("stock-recalculate-value-button").addEventListener("click", recalculateStockValue);
  document.getElementById("stock-missing-cost-button").addEventListener("click", exportStockMissingCost);
  document.getElementById("stock-export-button").addEventListener("click", exportStock);

  document.getElementById("in-transit-import-form").addEventListener("submit", (event) => handleImport(event, {
    url: "/api/import-in-transit",
    panelId: "in-transit-result-panel",
    defaultButton: "Importar Em Transito",
    loadingButton: "Importando...",
    render: renderInTransitResult,
  }));
  document.getElementById("in-transit-export-button").addEventListener("click", exportInTransit);

  document.getElementById("prices-import-form").addEventListener("submit", (event) => handleImport(event, {
    url: "/api/import-prices",
    panelId: "prices-import-result-panel",
    defaultButton: "Importar tabela de preços",
    loadingButton: "Importando...",
    render: renderPriceImportResult,
  }));
  document.getElementById("prices-ipi-form").addEventListener("submit", (event) => handleImport(event, {
    url: "/api/import-prices-ipi",
    panelId: "prices-import-result-panel",
    defaultButton: "Atualizar IPI",
    loadingButton: "Atualizando IPI...",
    render: renderPriceIpiResult,
  }));
  document.getElementById("products-import-form").addEventListener("submit", (event) => handleImport(event, {
    url: "/api/import-products",
    panelId: "products-result-panel",
    defaultButton: "Importar produtos",
    loadingButton: "Importando...",
    render: renderProductsImportResult,
  }));
  document.getElementById("products-export-button").addEventListener("click", exportProducts);

  document.getElementById("ml-ads-import-form").addEventListener("submit", (event) => handleImport(event, {
    url: "/api/import-mercado-livre-ads",
    panelId: "ml-ads-result-panel",
    defaultButton: "Importar arquivo",
    loadingButton: "Importando...",
    render: renderMercadoLivreImportResult,
  }));

  document.getElementById("ml-sales-import-form").addEventListener("submit", (event) => handleImport(event, {
    url: "/api/import-mercado-livre-sales",
    panelId: "ml-sales-result-panel",
    defaultButton: "Importar vendas",
    loadingButton: "Importando...",
    render: renderMercadoLivreSalesImportResult,
  }));

  document.getElementById("costing-import-form").addEventListener("submit", (event) => handleImport(event, {
    url: "/api/import-costing",
    panelId: "costing-result-panel",
    defaultButton: "Importar custeio",
    loadingButton: "Importando...",
    render: renderCostingResult,
  }));
  document.getElementById("costing-recalculate-button").addEventListener("click", recalculateCosting);
  document.getElementById("costing-export-button").addEventListener("click", exportCosting);

  document.getElementById("costing-fabricated-import-form").addEventListener("submit", (event) => handleImport(event, {
    url: "/api/import-costing-fabricated",
    panelId: "costing-fabricated-result-panel",
    defaultButton: "Importar custeio fabricado",
    loadingButton: "Importando...",
    render: (summary) => renderCostingFabricatedResult(summary, `${summary.arquivo || "Arquivo"} importado para a base Fabricado BR.`),
  }));
  document.getElementById("costing-fabricated-recalculate-button").addEventListener("click", recalculateCostingFabricated);
  document.getElementById("costing-fabricated-export-button").addEventListener("click", exportCostingFabricated);
  showAppScreen();
}

document.addEventListener("click", handleGlobalNavigationClick);

init();

