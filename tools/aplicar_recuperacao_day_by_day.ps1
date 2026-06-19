param(
  [Parameter(Mandatory = $true)]
  [string]$Recuperacao,

  [string]$ArquivoDayByDay = (Join-Path (Split-Path -Parent $PSScriptRoot) "data\ionlab\day_by_day_vendedores.json")
)

$ErrorActionPreference = "Stop"

$arquivoResolvido = (Resolve-Path -LiteralPath $ArquivoDayByDay).Path
$recuperacaoResolvida = (Resolve-Path -LiteralPath $Recuperacao).Path
$root = Split-Path -Parent (Split-Path -Parent $arquivoResolvido)
$backupDir = Join-Path $root "_backups\recuperacao_day_by_day"
$backupPath = Join-Path $backupDir ("day_by_day_vendedores_antes_" + (Get-Date -Format "yyyyMMdd_HHmmss") + ".json")

New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
Copy-Item -LiteralPath $arquivoResolvido -Destination $backupPath -Force

$data = Get-Content -LiteralPath $arquivoResolvido -Raw | ConvertFrom-Json
$payloadRecuperacao = Get-Content -LiteralPath $recuperacaoResolvida -Raw | ConvertFrom-Json
if ($payloadRecuperacao -is [array]) { $payloadRecuperacao = $payloadRecuperacao[0] }

if (-not $data.atendimentos) {
  $data | Add-Member -NotePropertyName atendimentos -NotePropertyValue ([PSCustomObject]@{})
}
if (-not $data.historico) {
  $data | Add-Member -NotePropertyName historico -NotePropertyValue @()
}
if (-not $data.contagens) {
  $data | Add-Member -NotePropertyName contagens -NotePropertyValue ([PSCustomObject]@{})
}

$marcador = [string]$payloadRecuperacao.PSObject.Properties["marcador"].Value
if (-not $marcador) {
  throw "Arquivo de recuperacao sem campo marcador."
}

$data.historico = @($data.historico | Where-Object { $_.restaurado_por -ne $marcador })

foreach ($record in @($payloadRecuperacao.atendimentos)) {
  $key = "$($record.data)|$($record.vendor_id)|$($record.client_id)"
  $prop = $data.atendimentos.PSObject.Properties[$key]
  if ($prop) {
    $prop.Value = $record
  } else {
    $data.atendimentos | Add-Member -NotePropertyName $key -NotePropertyValue $record
  }
}

foreach ($record in @($payloadRecuperacao.historico)) {
  $data.historico += $record
}

foreach ($counter in @($payloadRecuperacao.contagens)) {
  $key = "$($counter.data)|$($counter.vendor_id)"
  $existing = $data.contagens.PSObject.Properties[$key]
  if (-not $existing) {
    $data.contagens | Add-Member -NotePropertyName $key -NotePropertyValue $counter
    continue
  }

  $targetCounter = $existing.Value
  $targetCounter.eventos = @($targetCounter.eventos | Where-Object { $_.restaurado_por -ne $marcador })
  foreach ($event in @($counter.eventos)) {
    $targetCounter.eventos += $event
  }
  $targetCounter.meta_diaria = $counter.meta_diaria
  $targetCounter.total_salvos = @($targetCounter.eventos).Count
  $targetCounter.updated_at = $counter.updated_at
}

$data | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $arquivoResolvido -Encoding UTF8

Write-Host "Recuperacao aplicada com sucesso."
Write-Host "Backup criado em: $backupPath"



