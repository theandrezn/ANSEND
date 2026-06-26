# scripts/auto-sync-github.ps1
# Auto-sync script to sync local workspace with origin/main

Write-Output "Starting auto-sync daemon with origin/main..."

# Set repository directory to the parent of scripts
$repoDir = Split-Path -Parent $PSScriptRoot
if (-not $repoDir) {
    $repoDir = "C:\Users\games\.gemini\antigravity\worktrees\Ansend 3.0 - AntiGravity\sync-github-files-automatically"
}

# Change directory to the repository to ensure git commands run in the correct path
Push-Location $repoDir

try {
    # Ensure git knows this directory is safe in case of permission issues
    git config --global --add safe.directory $repoDir 2>$null
} catch {}

while ($true) {
    try {
        # Fetch remote main silently
        git fetch origin main -q
        
        $local_hash = git rev-parse HEAD
        $remote_hash = git rev-parse origin/main
        
        if ($local_hash -ne $remote_hash) {
            Write-Output "$(Get-Date -Format 'HH:mm:ss') - Remote changes detected on origin/main. Syncing..."
            # Reset hard to match the remote main exactly
            git reset --hard origin/main
            Write-Output "Successfully updated workspace to match origin/main."
        }
    } catch {
        Write-Error "Error during auto-sync: $_"
    }
    
    Start-Sleep -Seconds 10
}

Pop-Location
