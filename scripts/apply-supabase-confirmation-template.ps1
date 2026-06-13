$ErrorActionPreference = "Stop"

$projectRef = "qxujynzqdursxaehchik"
$templatePath = Join-Path $PSScriptRoot "..\supabase\templates\confirmation.html"

if (-not $env:SUPABASE_ACCESS_TOKEN) {
  throw "Defina SUPABASE_ACCESS_TOKEN antes de executar este script."
}

if (-not (Test-Path -LiteralPath $templatePath)) {
  throw "Template nao encontrado em $templatePath"
}

$html = Get-Content -LiteralPath $templatePath -Raw -Encoding UTF8

$body = @{
  mailer_subjects_confirmation = "Confirme seu acesso a ANSEND"
  mailer_templates_confirmation_content = $html
} | ConvertTo-Json -Depth 4

Invoke-RestMethod `
  -Method Patch `
  -Uri "https://api.supabase.com/v1/projects/$projectRef/config/auth" `
  -Headers @{ Authorization = "Bearer $env:SUPABASE_ACCESS_TOKEN" } `
  -ContentType "application/json" `
  -Body $body

Write-Host "Template de confirmacao da ANSEND enviado para o Supabase."
