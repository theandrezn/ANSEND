const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const migration = fs.readFileSync(path.join(root, "supabase", "migrations", "20260617103000_community_chat_integration.sql"), "utf8");
const proposalMigration = fs.readFileSync(path.join(root, "supabase", "migrations", "20260617104500_chat_proposal_status_rpc.sql"), "utf8");

const checks = [
  {
    name: "official chat route helper exists",
    pass: /const CHAT_ROUTE = "bate-papo"/.test(script) && /CHAT_ROUTES\.conversation/.test(script),
  },
  {
    name: "community actions use centralized chat handler",
    pass: /function handleCommunityChatAction/.test(script)
      && /sendHiringInterest\(postId\)[\s\S]*handleCommunityChatAction\(\{ postId, action: "interest" \}\)/.test(script)
      && /function openHiringProposalModal\(postId\)[\s\S]*handleCommunityChatAction\(\{ postId, action: "proposal" \}\)/.test(script),
  },
  {
    name: "community conversation RPC is used by frontend",
    pass: /get_or_create_community_conversation/.test(script),
  },
  {
    name: "proposal messages are real chat messages",
    pass: /messageType = "proposal"/.test(script)
      && /from\("hiring_proposals"\)[\s\S]*upsert/.test(script)
      && /chatProposalBodyFromMetadata/.test(script),
  },
  {
    name: "database migration prevents duplicate post conversations",
    pass: /get_or_create_community_conversation/.test(migration)
      && /pg_advisory_xact_lock/.test(migration)
      && /community_post_id/.test(migration),
  },
  {
    name: "proposal status changes run through secure rpc",
    pass: /update_chat_proposal_status/.test(proposalMigration)
      && /PROPOSAL_STATUS_FORBIDDEN/.test(proposalMigration)
      && /PROPOSAL_CANCEL_FORBIDDEN/.test(proposalMigration)
      && /updateChatProposalStatus/.test(script),
  },
];

const failed = checks.filter((check) => !check.pass);

if (failed.length) {
  console.error("Community chat integration check failed:");
  failed.forEach((check) => console.error(`- ${check.name}`));
  process.exit(1);
}

console.log(`Community chat integration checks passed (${checks.length}/${checks.length}).`);
