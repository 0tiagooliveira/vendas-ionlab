param(
  [string]$Versao = (Get-Date -Format "yyyyMMdd_HHmmss")
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$outputs = Join-Path $root "outputs"
New-Item -ItemType Directory -Force -Path $outputs | Out-Null

$zipPath = Join-Path $outputs "atualizacao_crm_segura_$Versao.zip"
$readmePath = Join-Path $outputs "LEIA-ME_ATUALIZACAO_SEGURA_$Versao.txt"

@"
PACOTE DE ATUALIZACAO SEGURA DO CRM

Use este pacote para atualizar o sistema publicado.

IMPORTANTE:
- Este pacote NAO contem a pasta data.
- Nao substitui usuarios, vendedores, clientes, vendas, estoque, bloqueios, Follow-UP ou orcamentos do site quente.
- Antes de aplicar, faca backup da pasta data do site publicado.
- Nunca use pacote "site completo" para atualizar um sistema que ja esta em uso.

Arquivos incluidos:
- server.py
- static/
- ferramentas e arquivos .bat de abertura
"@ | Set-Content -LiteralPath $readmePath -Encoding UTF8

$items = @(
  "server.py",
  "static",
  "abrir_crm_atualizado.bat",
  "rodar_servidor_crm.bat",
  "iniciar_crm.bat",
  "README.md",
  "ATUALIZACAO_SEGURA.md",
  "tools/gerar_pacote_atualizacao_seguro.ps1",
  (Resolve-Path -LiteralPath $readmePath).Path
)

$resolvedItems = foreach ($item in $items) {
  $path = Join-Path $root $item
  if (Test-Path -LiteralPath $path) {
    (Resolve-Path -LiteralPath $path).Path
  } elseif (Test-Path -LiteralPath $item) {
    (Resolve-Path -LiteralPath $item).Path
  }
}

Compress-Archive -Path $resolvedItems -DestinationPath $zipPath -Force

Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
try {
  $blocked = $zip.Entries | Where-Object {
    $_.FullName -match '(^|/)data/' -or
    $_.FullName -match '(^|/)_backups/' -or
    $_.FullName -match '(^|/)outputs/' -or
    $_.FullName -match '(^|/)node_modules/' -or
    $_.FullName -match 'usuarios\.json$' -or
    $_.FullName -match 'vendedores\.json$' -or
    $_.FullName -match 'vendas\.json$' -or
    $_.FullName -match 'clientes\.json$'
  }
  if ($blocked) {
    $names = ($blocked | Select-Object -First 20 | ForEach-Object { $_.FullName }) -join "`n"
    throw "Pacote inseguro: contem arquivos de dados:`n$names"
  }
} finally {
  $zip.Dispose()
}

Write-Host "Pacote seguro criado:"
Write-Host $zipPath
