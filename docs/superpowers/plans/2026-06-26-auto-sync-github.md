# Auto-Sync GitHub Repository (origin/main) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Automatically synchronize the local Antigravity workspace with `origin/main` on GitHub so Codex edits on the remote main branch immediately reflect here.

**Architecture:** A PowerShell script `scripts/auto-sync-github.ps1` runs in a loop in the background of the OS. It fetches `origin/main`, detects changes, and performs a hard reset (`git reset --hard origin/main`) when differences are found.

**Tech Stack:** Git, PowerShell, Windows Background Process management.

## Global Constraints
- Target platform: Windows (PowerShell)
- Must not interfere with user local work (safe because user explicitly stated they won't edit locally)

---

## User Review Required
> [!IMPORTANT]
> The auto-sync script will perform `git reset --hard origin/main` every 10 seconds. Any local, uncommitted changes in this worktree will be overwritten to ensure it acts as a perfect mirror of GitHub.

---

## Proposed Changes

### Scripts

#### [NEW] [auto-sync-github.ps1](file:///C:/Users/games/.gemini/antigravity/worktrees/Ansend%203.0%20-%20AntiGravity/sync-github-files-automatically/scripts/auto-sync-github.ps1)
PowerShell script to run in the background.

```powershell
# scripts/auto-sync-github.ps1
Write-Output "Starting auto-sync daemon with origin/main..."

while ($true) {
    try {
        # Fetch remote main silently
        git fetch origin main -q
        
        $local_hash = git rev-parse HEAD
        $remote_hash = git rev-parse origin/main
        
        if ($local_hash -ne $remote_hash) {
            Write-Output "$(Get-Date -Format 'HH:mm:ss') - Remote changes detected on origin/main. Syncing..."
            git reset --hard origin/main
            Write-Output "Successfully updated workspace to match origin/main."
        }
    } catch {
        Write-Error "Error during auto-sync: $_"
    }
    
    Start-Sleep -Seconds 10
}
```

---

## Task 1: Create Auto-Sync Script and Launch Daemon

**Files:**
- Create: `scripts/auto-sync-github.ps1`

- [ ] **Step 1: Write `scripts/auto-sync-github.ps1` implementation**
  Create the script under `scripts/auto-sync-github.ps1`.

- [ ] **Step 2: Run verification check**
  Run: `powershell -File scripts/auto-sync-github.ps1` to verify it starts and successfully fetches and does reset. (Kill after verifying).

- [ ] **Step 3: Launch in background**
  Launch the script using:
  `Start-Process powershell -ArgumentList "-NoProfile -File scripts/auto-sync-github.ps1" -WindowStyle Hidden`
  This launches it as a hidden process so it runs continuously in the background on your machine.

---

## Verification Plan

### Manual Verification
- We will verify the background process is running.
- We will check `git rev-parse HEAD` and confirm it matches `git rev-parse origin/main`.
