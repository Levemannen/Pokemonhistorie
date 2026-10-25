Add-Type -AssemblyName System.Drawing
$auditRoot = (Get-Location).Path
$auditManifest = Get-Content 'public/images/illustration-manifest.json' -Raw | ConvertFrom-Json
$auditEntries = [System.Collections.Generic.List[object]]::new()
$auditSeen = [System.Collections.Generic.HashSet[string]]::new()
foreach ($scene in $auditManifest.scenes.PSObject.Properties) {
  foreach ($base in $scene.Value.base.PSObject.Properties) {
    if ($base.Value.EndsWith('.png') -and $auditSeen.Add($base.Value)) { $auditEntries.Add(@{label=$scene.Name+' / '+$base.Name;path=$base.Value}) }
  }
  foreach ($variant in $scene.Value.variants) {
    if ($auditSeen.Add($variant.path)) { $auditEntries.Add(@{label=$scene.Name+' / '+$variant.needs;path=$variant.path}) }
  }
}
$auditOutput = Join-Path $auditRoot 'docs/art-review'
New-Item -ItemType Directory -Path $auditOutput -Force | Out-Null
$auditFont = New-Object System.Drawing.Font 'Arial',16
for ($offset=0; $offset -lt $auditEntries.Count; $offset+=9) {
  $sheet = New-Object System.Drawing.Bitmap 1800,1008
  $graphics = [System.Drawing.Graphics]::FromImage($sheet)
  $graphics.Clear([System.Drawing.Color]::White)
  for ($slot=0; $slot -lt 9 -and ($offset+$slot) -lt $auditEntries.Count; $slot++) {
    $entry=$auditEntries[$offset+$slot]; $x=($slot%3)*600; $y=[math]::Floor($slot/3)*336
    $source=[System.Drawing.Image]::FromFile((Join-Path $auditRoot ('public/'+$entry.path)))
    $graphics.DrawImage($source,$x,$y,600,300)
    $graphics.DrawString($entry.label,$auditFont,[System.Drawing.Brushes]::Black,$x+8,$y+305)
    $source.Dispose()
  }
  $path=Join-Path $auditOutput ('sheet-'+([int]($offset/9)+1)+'.jpg')
  $sheet.Save($path,[System.Drawing.Imaging.ImageFormat]::Jpeg)
  $graphics.Dispose();$sheet.Dispose()
}
$auditFont.Dispose()
$auditEntries | ConvertTo-Json | Set-Content (Join-Path $auditOutput 'index.json')
Write-Output ('Prepared visual review of '+$auditEntries.Count+' distinct selected paintings.')
