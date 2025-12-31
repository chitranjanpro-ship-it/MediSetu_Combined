# MediSetu - Update Navigation Script (PowerShell)
# Updates all HTML pages with Version 3 Combined Navigation

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "  MEDISETU - UPDATE NAVIGATION TO VERSION 3" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$pagesPath = Join-Path $scriptPath "Combined_Pages"
$templatePath = Join-Path $scriptPath "Navigation_Versions\Templates\nav_version3_combined.html"

# Read the combined navigation template
if (Test-Path $templatePath) {
    $combinedNav = Get-Content $templatePath -Raw
    Write-Host "[OK] Loaded navigation template" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Navigation template not found!" -ForegroundColor Red
    Write-Host "Expected at: $templatePath" -ForegroundColor Yellow
    pause
    exit
}

# Combined navigation HTML (Version 3)
$newNav = @"
<nav class="navbar navbar-expand-lg navbar-dark bg-success">
  <div class="container">
    <a class="navbar-brand" href="index.html">MediSetu</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="about.html">About Us</a></li>
        <li class="nav-item"><a class="nav-link" href="register.html">Register</a></li>
        <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
        <li class="nav-item"><a class="nav-link" href="partner.html">Partner</a></li>
        
        <!-- Dashboard Links -->
        <li class="nav-item"><a class="nav-link" href="customer.html">Customer</a></li>
        <li class="nav-item"><a class="nav-link" href="doctor.html">Doctor</a></li>
        <li class="nav-item"><a class="nav-link" href="vendor.html">Vendor</a></li>
        <li class="nav-item"><a class="nav-link" href="delivery.html">Delivery</a></li>
        <li class="nav-item"><a class="nav-link" href="logistics.html">Logistics</a></li>
      </ul>
    </div>
  </div>
</nav>
"@

# HTML files to update
$htmlFiles = @(
    "about.html",
    "register.html",
    "login.html",
    "contact.html",
    "partner.html",
    "customer.html",
    "doctor.html",
    "vendor.html",
    "delivery.html",
    "logistics.html",
    "help.html",
    "adSubmit.html",
    "adminAds.html"
)

$updatedCount = 0
$errorCount = 0

foreach ($file in $htmlFiles) {
    $filePath = Join-Path $pagesPath $file
    
    if (Test-Path $filePath) {
        try {
            $content = Get-Content $filePath -Raw -Encoding UTF8
            
            # Pattern to match the entire nav section
            $navPattern = '(?s)<nav class="navbar[^>]*>.*?</nav>'
            
            # Determine active link based on current page
            $activeNav = $newNav
            if ($file -eq "about.html") {
                $activeNav = $newNav -replace 'href="about.html">About Us', 'href="about.html" class="active">About Us'
            } elseif ($file -eq "register.html") {
                $activeNav = $newNav -replace 'href="register.html">Register', 'href="register.html" class="active">Register'
            } elseif ($file -eq "login.html") {
                $activeNav = $newNav -replace 'href="login.html">Login', 'href="login.html" class="active">Login'
            } elseif ($file -eq "contact.html") {
                $activeNav = $newNav -replace 'href="contact.html">Contact', 'href="contact.html" class="active">Contact'
            } elseif ($file -eq "partner.html") {
                $activeNav = $newNav -replace 'href="partner.html">Partner', 'href="partner.html" class="active">Partner'
            } elseif ($file -eq "customer.html") {
                $activeNav = $newNav -replace 'href="customer.html">Customer', 'href="customer.html" class="active">Customer'
            } elseif ($file -eq "doctor.html") {
                $activeNav = $newNav -replace 'href="doctor.html">Doctor', 'href="doctor.html" class="active">Doctor'
            } elseif ($file -eq "vendor.html") {
                $activeNav = $newNav -replace 'href="vendor.html">Vendor', 'href="vendor.html" class="active">Vendor'
            } elseif ($file -eq "delivery.html") {
                $activeNav = $newNav -replace 'href="delivery.html">Delivery', 'href="delivery.html" class="active">Delivery'
            } elseif ($file -eq "logistics.html") {
                $activeNav = $newNav -replace 'href="logistics.html">Logistics', 'href="logistics.html" class="active">Logistics'
            } elseif ($file -eq "help.html") {
                $activeNav = $newNav -replace 'href="help.html">Help', 'href="help.html" class="active">Help'
            }
            
            # Replace the nav section
            if ($content -match $navPattern) {
                $updatedContent = $content -replace $navPattern, $activeNav
                Set-Content -Path $filePath -Value $updatedContent -Encoding UTF8 -NoNewline
                Write-Host "[OK] Updated $file" -ForegroundColor Green
                $updatedCount++
            } else {
                Write-Host "[WARNING] Could not find nav section in $file" -ForegroundColor Yellow
            }
        } catch {
            Write-Host "[ERROR] Failed to update $file : $_" -ForegroundColor Red
            $errorCount++
        }
    } else {
        Write-Host "[SKIP] $file not found" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "  UPDATE COMPLETE!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host "Updated: $updatedCount files" -ForegroundColor Green
Write-Host "Errors: $errorCount files" -ForegroundColor $(if ($errorCount -gt 0) { "Red" } else { "Green" })
Write-Host ""
Write-Host "All pages now have Combined Navigation (11 links)!" -ForegroundColor Cyan
Write-Host ""
pause

