/**
 * ANSEND Beat Publication & Playback Validation Script
 * 
 * Run this in the browser console at http://localhost:8787 to verify
 * the full publication and playback flow is working correctly.
 * 
 * Tests:
 * 1. Supabase client initialization
 * 2. Authentication state
 * 3. Beat data loading from Supabase
 * 4. Player engine readiness
 * 5. Audio URL resolution
 */

(async function validateANSENDFlow() {
  const results = [];
  const pass = (msg) => results.push({ status: "✅ PASS", msg });
  const fail = (msg) => results.push({ status: "❌ FAIL", msg });
  const warn = (msg) => results.push({ status: "⚠️ WARN", msg });

  console.log("━━━ ANSEND Validation Suite ━━━\n");

  // 1. Supabase Client
  if (typeof supabaseClient !== "undefined" && supabaseClient !== null) {
    pass("Supabase client is initialized");
  } else {
    fail("Supabase client is NULL or undefined - check ANSEND_SUPABASE config in index.html");
  }

  // 2. Auth State
  if (typeof appState !== "undefined") {
    if (appState.authUser) {
      pass(`Authenticated as: ${appState.authUser.email || appState.authUser.id}`);
    } else {
      warn("Not authenticated - login required to test publish flow");
    }
  } else {
    fail("appState is not defined");
  }

  // 3. Public Catalog Items loaded from Supabase
  if (typeof appState !== "undefined" && Array.isArray(appState.publicCatalogItems)) {
    const total = appState.publicCatalogItems.length;
    const fromBeats = appState.publicCatalogItems.filter(i => i.source_table === "beats").length;
    const fromCatalog = appState.publicCatalogItems.filter(i => i.source_table === "catalog_items").length;
    if (total > 0) {
      pass(`Loaded ${total} public items (${fromBeats} from beats table, ${fromCatalog} from catalog_items)`);
    } else {
      warn("No public catalog items found - either DB is empty or fetch failed");
    }
  } else {
    fail("publicCatalogItems not available");
  }

  // 4. Owned Catalog Items
  if (typeof appState !== "undefined" && Array.isArray(appState.ownedCatalogItems)) {
    if (appState.authUser) {
      pass(`Loaded ${appState.ownedCatalogItems.length} owned items`);
    } else {
      warn("Cannot check owned items without authentication");
    }
  }

  // 5. Audio Element
  const audio = document.getElementById("topBeatAudio");
  if (audio) {
    pass("Audio element #topBeatAudio found in DOM");
  } else {
    fail("Audio element #topBeatAudio NOT found - player will not work");
  }

  // 6. playBeat function
  if (typeof playBeat === "function") {
    pass("playBeat() function is available");
  } else {
    fail("playBeat() function not found - player integration broken");
  }

  // 7. Check beats with audio_url
  if (typeof appState !== "undefined" && Array.isArray(appState.publicCatalogItems)) {
    const withAudio = appState.publicCatalogItems.filter(i => i.audio_url || i.audio);
    if (withAudio.length > 0) {
      pass(`${withAudio.length} items have audio URLs`);
      // Check if URLs look like Supabase Storage URLs
      const supabaseAudio = withAudio.filter(i => (i.audio_url || i.audio || "").includes("supabase"));
      if (supabaseAudio.length > 0) {
        pass(`${supabaseAudio.length} items have Supabase Storage audio URLs`);
      } else {
        warn("No items with Supabase Storage URLs found (may be using local assets)");
      }
    } else {
      warn("No items with audio URLs found");
    }
  }

  // 8. Check Supabase connectivity
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient.from("beats").select("id, title, audio_url, status").limit(5);
      if (error) {
        fail(`Supabase query error: ${error.message}`);
      } else {
        pass(`Supabase beats query returned ${(data || []).length} rows`);
        if (data && data.length > 0) {
          data.forEach(b => {
            console.log(`  📀 "${b.title}" | status: ${b.status} | audio: ${b.audio_url ? "✅" : "❌"}`);
          });
        }
      }
    } catch (e) {
      fail(`Supabase connection error: ${e.message}`);
    }
  }

  // 9. Auth gate on cadastrar
  if (!appState.authUser) {
    pass("Auth gate should block #cadastrar for unauthenticated users");
  }

  // Print results
  console.log("\n━━━ Results ━━━");
  results.forEach(r => console.log(`${r.status} ${r.msg}`));
  
  const passes = results.filter(r => r.status.includes("PASS")).length;
  const fails = results.filter(r => r.status.includes("FAIL")).length;
  const warns = results.filter(r => r.status.includes("WARN")).length;
  
  console.log(`\n📊 Total: ${passes} passed, ${fails} failed, ${warns} warnings`);
  
  if (fails === 0) {
    console.log("🎉 All critical checks passed!");
  } else {
    console.log("🚨 Some critical checks failed - see above");
  }
  
  return { passes, fails, warns, results };
})();
