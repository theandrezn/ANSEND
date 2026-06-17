import { buildNexoDeveloperPrompt } from "./nexo/nexo-prompt.mjs";
import { nexoDiagnosisSchema } from "./nexo/nexo-schema.mjs";
import { validateNexoQuiz } from "./nexo/nexo-validation.mjs";

const rateLimitStore = globalThis.__ANSEND_RATE_LIMITS || new Map();
globalThis.__ANSEND_RATE_LIMITS = rateLimitStore;

function securityHeadersFor(request, contentType = "") {
  const url = new URL(request.url);
  const isHttps = url.protocol === "https:";
  const headers = new Headers({
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
    "X-Frame-Options": "DENY",
  });
  if (isHttps) headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  if (contentType.includes("text/html")) {
    headers.set("Content-Security-Policy", [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "script-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.jsdelivr.net https://static.cloudflareinsights.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://qxujynzqdursxaehchik.supabase.co https://i.ytimg.com https://lh3.googleusercontent.com https://*.googleusercontent.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "media-src 'self' blob: https://qxujynzqdursxaehchik.supabase.co",
      "connect-src 'self' https://qxujynzqdursxaehchik.supabase.co wss://qxujynzqdursxaehchik.supabase.co",
      "frame-src https://www.youtube-nocookie.com",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "));
  }
  return headers;
}

function withSecurityHeaders(response, request) {
  const headers = new Headers(response.headers);
  const securityHeaders = securityHeadersFor(request, headers.get("content-type") || "");
  securityHeaders.forEach((value, key) => {
    if (!headers.has(key)) headers.set(key, value);
  });
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function jsonResponse(payload, init = {}) {
  return Response.json(payload, {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-store",
      ...(init.headers || {}),
    },
  });
}

function extractOutputText(data) {
  if (typeof data?.output_text === "string" && data.output_text.trim()) return data.output_text;
  const chunks = [];
  for (const item of data?.output || []) {
    for (const content of item?.content || []) {
      if (typeof content?.text === "string") chunks.push(content.text);
    }
  }
  return chunks.join("\n").trim();
}

function safeOpenAiError(data) {
  const message = data?.error?.message || data?.message;
  if (!message || typeof message !== "string") return "Erro desconhecido da OpenAI.";
  return message.replace(/sk-[A-Za-z0-9_-]+/g, "[redacted]");
}

function nexoModelCandidates(env) {
  const primary = env.OPENAI_MODEL || "gpt-5.4-mini";
  const fallback = String(env.NEXO_FALLBACK_MODELS || "gpt-5-mini,gpt-4.1-mini")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return [...new Set([primary, ...fallback])];
}

function buildNexoChatPrompt(context = {}) {
  const safeContext = cleanRecommendationText(JSON.stringify({
    route: context.route || "",
    userId: context.userId || "",
    profile: context.profile || null,
    catalogCount: context.catalogCount || 0,
    publicCatalogCount: context.publicCatalogCount || 0,
  }), 2200);
  return `Voce e a NEXO IA, a inteligencia musical da ANSEND.
Sua funcao e conversar com artistas, beatmakers e profissionais da musica para transformar ideias soltas em planos praticos de lancamento.
Conduza a conversa naturalmente, sem quiz rigido.
Faca perguntas curtas, uma por vez, quando precisar de mais contexto.
Quando tiver informacao suficiente, entregue diagnostico musical, plano de acao, proximos passos, tipos de servicos/profissionais necessarios dentro da ANSEND, ordem de execucao e ideias de posicionamento, estetica, capa, conteudo e lancamento.
Nao invente profissionais reais, nomes de pessoas, dados de marketplace, promessas ou resultados.
Se nao houver dados reais de marketplace disponiveis, sugira apenas categorias de profissionais e servicos.
Seja objetivo, estrategico, profissional, util e escreva em portugues brasileiro.
Contexto real enviado pela plataforma, quando disponivel: ${safeContext || "{}"}. Use apenas como apoio e diga quando precisar de mais informacoes.`;
}

function supabaseServiceConfig(env) {
  const url = env.SUPABASE_URL || env.ANSEND_SUPABASE_URL || "";
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_KEY || "";
  const publishableKey = env.SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_ANON_KEY || "";
  return { url: String(url).replace(/\/$/, ""), serviceKey, publishableKey };
}

function clientKey(request, userId = "anonymous") {
  return [
    userId,
    request.headers.get("CF-Connecting-IP") || "",
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() || "",
    new URL(request.url).pathname,
  ].filter(Boolean).join(":");
}

function checkRateLimit(request, { userId = "anonymous", limit = 20, windowMs = 60_000 } = {}) {
  const key = clientKey(request, userId);
  const now = Date.now();
  const bucket = rateLimitStore.get(key);
  if (!bucket || bucket.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }
  bucket.count += 1;
  if (bucket.count > limit) {
    return jsonResponse({ success: false, error: "Muitas tentativas em pouco tempo. Aguarde um momento e tente novamente." }, {
      status: 429,
      headers: { "Retry-After": String(Math.max(1, Math.ceil((bucket.resetAt - now) / 1000))) },
    });
  }
  return null;
}

async function requireAuthenticatedUser(request, env) {
  const authHeader = request.headers.get("Authorization") || "";
  if (!/^Bearer\s+[-._~+/=A-Za-z0-9]+$/i.test(authHeader)) {
    return { ok: false, response: jsonResponse({ success: false, error: "Entre na sua conta ANSEND para continuar." }, { status: 401 }) };
  }
  const { url, publishableKey, serviceKey } = supabaseServiceConfig(env);
  const key = publishableKey || serviceKey;
  if (!url || !key) {
    return { ok: false, response: jsonResponse({ success: false, error: "Autenticacao indisponivel no momento." }, { status: 503 }) };
  }
  const response = await fetch(`${url}/auth/v1/user`, {
    headers: {
      apikey: key,
      Authorization: authHeader,
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data?.id) {
    return { ok: false, response: jsonResponse({ success: false, error: "Sessao expirada. Faca login novamente." }, { status: 401 }) };
  }
  return { ok: true, authHeader, user: data };
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ""));
}

function cleanRecommendationText(value, max = 6000) {
  return String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function cleanStringList(value, maxItems = 10) {
  return Array.isArray(value)
    ? value.map((item) => cleanRecommendationText(item, 80)).filter(Boolean).slice(0, maxItems)
    : [];
}

async function createEmbedding(text, env) {
  if (!env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY nao configurada.");
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: cleanRecommendationText(text, 8000),
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(safeOpenAiError(data));
  const embedding = data?.data?.[0]?.embedding;
  if (!Array.isArray(embedding) || embedding.length !== 1536) {
    throw new Error("Embedding invalido retornado pela OpenAI.");
  }
  return embedding;
}

async function supabaseRest(env, path, init = {}) {
  const { url, serviceKey } = supabaseServiceConfig(env);
  if (!url || !serviceKey) {
    return { configured: false, data: null, error: "SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY nao configurados." };
  }
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation,resolution=merge-duplicates",
      ...(init.headers || {}),
    },
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    return { configured: true, data: null, error: data?.message || data?.hint || text || "Erro Supabase." };
  }
  return { configured: true, data, error: null };
}

async function supabaseRpc(env, fn, payload, authHeader = "") {
  const { url, serviceKey, publishableKey } = supabaseServiceConfig(env);
  const key = serviceKey || publishableKey;
  if (!url || !key) {
    return { configured: false, data: null, error: "SUPABASE_URL e SUPABASE_PUBLISHABLE_KEY nao configurados." };
  }
  const response = await fetch(`${url}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: authHeader || `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload || {}),
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    return { configured: true, data: null, error: data?.message || data?.hint || text || "Erro Supabase." };
  }
  return { configured: true, data, error: null };
}

async function handleEmbedContent(request, env) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204 });
  if (request.method !== "POST") {
    return jsonResponse({ success: false, error: "Metodo nao permitido." }, { status: 405 });
  }
  const auth = await requireAuthenticatedUser(request, env);
  if (!auth.ok) return auth.response;
  const limited = checkRateLimit(request, { userId: auth.user.id, limit: 18, windowMs: 60_000 });
  if (limited) return limited;

  let payload;
  try {
    payload = await request.json();
  } catch (_error) {
    return jsonResponse({ success: false, error: "Payload invalido." }, { status: 400 });
  }

  const targetType = cleanRecommendationText(payload?.targetType, 40);
  const targetId = cleanRecommendationText(payload?.targetId, 80);
  const textContent = cleanRecommendationText(payload?.textContent, 8000);
  if (!["post", "beat", "professional", "service", "user_interest"].includes(targetType) || !isUuid(targetId) || textContent.length < 8) {
    return jsonResponse({ success: false, error: "Conteudo insuficiente para gerar embedding." }, { status: 400 });
  }

  try {
    const embedding = await createEmbedding(textContent, env);
    const write = await supabaseRest(env, "content_embeddings?on_conflict=target_type,target_id", {
      method: "POST",
      body: JSON.stringify([{
        target_type: targetType,
        target_id: targetId,
        text_content: textContent,
        embedding: `[${embedding.join(",")}]`,
        updated_at: new Date().toISOString(),
      }]),
    });
    if (write.error && !write.configured && request.headers.get("Authorization")) {
      const rpcWrite = await supabaseRpc(env, "upsert_content_embedding", {
        p_target_type: targetType,
        p_target_id: targetId,
        p_text_content: textContent,
        p_embedding: `[${embedding.join(",")}]`,
      }, request.headers.get("Authorization") || "");
      if (rpcWrite.error) {
        return jsonResponse({ success: false, configured: rpcWrite.configured, error: rpcWrite.error }, { status: rpcWrite.configured ? 502 : 200 });
      }
      return jsonResponse({ success: true, configured: true });
    }
    if (write.error) {
      return jsonResponse({ success: false, configured: write.configured, error: write.error }, { status: write.configured ? 502 : 200 });
    }
    return jsonResponse({ success: true, configured: true });
  } catch (error) {
    return jsonResponse({ success: false, error: error?.message || "Falha ao gerar embedding." }, { status: 502 });
  }
}

function buildInterestSummary(payload = {}) {
  const genres = cleanStringList(payload.genres, 8);
  const roles = cleanStringList(payload.rolesInterested, 8);
  const tags = cleanStringList(payload.intentTags, 12);
  const recentEvents = Array.isArray(payload.recentEvents) ? payload.recentEvents.slice(-20) : [];
  return cleanRecommendationText([
    payload.summary,
    genres.length ? `Generos de interesse: ${genres.join(", ")}.` : "",
    roles.length ? `Profissionais buscados: ${roles.join(", ")}.` : "",
    tags.length ? `Tags de intencao: ${tags.join(", ")}.` : "",
    recentEvents.length ? `Eventos recentes: ${recentEvents.map((event) => `${event.eventType || event.event_type || "evento"} em ${event.targetType || event.target_type || "conteudo"}`).join("; ")}.` : "",
  ].filter(Boolean).join(" "), 5000);
}

async function handleUpdateInterest(request, env) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204 });
  if (request.method !== "POST") {
    return jsonResponse({ success: false, error: "Metodo nao permitido." }, { status: 405 });
  }
  const auth = await requireAuthenticatedUser(request, env);
  if (!auth.ok) return auth.response;
  const limited = checkRateLimit(request, { userId: auth.user.id, limit: 20, windowMs: 60_000 });
  if (limited) return limited;

  let payload;
  try {
    payload = await request.json();
  } catch (_error) {
    return jsonResponse({ success: false, error: "Payload invalido." }, { status: 400 });
  }

  const summary = buildInterestSummary(payload);
  if (!summary) return jsonResponse({ success: false, error: "Resumo de interesse vazio." }, { status: 400 });

  try {
    const embedding = await createEmbedding(summary, env);
    const write = await supabaseRpc(env, "update_user_interest_profile", {
      p_summary: summary,
      p_embedding: `[${embedding.join(",")}]`,
      p_genres: cleanStringList(payload.genres, 8),
      p_roles_interested: cleanStringList(payload.rolesInterested, 8),
      p_budget_min: Number.isFinite(Number(payload.budgetMin)) ? Number(payload.budgetMin) : null,
      p_budget_max: Number.isFinite(Number(payload.budgetMax)) ? Number(payload.budgetMax) : null,
      p_intent_tags: cleanStringList(payload.intentTags, 12),
    }, auth.authHeader);
    if (write.error) {
      return jsonResponse({ success: false, configured: write.configured, summary, error: write.error }, { status: write.configured ? 502 : 200 });
    }
    return jsonResponse({ success: true, configured: true, summary });
  } catch (error) {
    return jsonResponse({ success: false, summary, error: error?.message || "Falha ao atualizar interesse." }, { status: 502 });
  }
}

function nexoIntentSchema() {
  return {
    type: "object",
    additionalProperties: false,
    required: ["intent", "needed_role", "genre", "style_reference", "urgency", "budget_max", "intent_tags"],
    properties: {
      intent: { type: "string" },
      needed_role: { type: "string" },
      genre: { type: "array", items: { type: "string" }, maxItems: 6 },
      style_reference: { type: "array", items: { type: "string" }, maxItems: 8 },
      urgency: { type: "string" },
      budget_max: { type: ["number", "null"] },
      intent_tags: { type: "array", items: { type: "string" }, maxItems: 10 },
    },
  };
}

async function handleNexoIntent(request, env) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204 });
  if (request.method !== "POST") {
    return jsonResponse({ success: false, error: "Metodo nao permitido." }, { status: 405 });
  }
  const auth = await requireAuthenticatedUser(request, env);
  if (!auth.ok) return auth.response;
  const limited = checkRateLimit(request, { userId: auth.user.id, limit: 12, windowMs: 60_000 });
  if (limited) return limited;
  let payload;
  try {
    payload = await request.json();
  } catch (_error) {
    return jsonResponse({ success: false, error: "Payload invalido." }, { status: 400 });
  }
  const message = cleanRecommendationText(payload?.message, 1800);
  if (!message) return jsonResponse({ success: false, error: "Mensagem vazia." }, { status: 400 });
  if (!env.OPENAI_API_KEY) return jsonResponse({ success: false, error: "OPENAI_API_KEY nao configurada." }, { status: 500 });

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: env.NEXO_INTENT_MODEL || "gpt-5-mini",
        reasoning: { effort: "low" },
        max_output_tokens: 700,
        input: [
          { role: "developer", content: "Extraia intencao musical estruturada para recomendacoes da ANSEND. Responda apenas no schema." },
          { role: "user", content: message },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "nexo_intent",
            strict: true,
            schema: nexoIntentSchema(),
          },
        },
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(safeOpenAiError(data));
    const output = extractOutputText(data);
    const intent = JSON.parse(output);
    return jsonResponse({ success: true, intent });
  } catch (error) {
    return jsonResponse({ success: false, error: error?.message || "Falha ao extrair intencao." }, { status: 502 });
  }
}

function cleanChatMessage(message) {
  const role = message?.role === "assistant" ? "assistant" : message?.role === "user" ? "user" : null;
  const content = String(message?.content || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 1800);
  return role && content ? { role, content } : null;
}

async function handleNexoChat(request, env) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204 });
  if (request.method !== "POST") {
    return jsonResponse({ success: false, error: "Metodo nao permitido." }, { status: 405 });
  }
  const auth = await requireAuthenticatedUser(request, env);
  if (!auth.ok) return auth.response;
  const limited = checkRateLimit(request, { userId: auth.user.id, limit: 10, windowMs: 60_000 });
  if (limited) return limited;

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 18000) {
    return jsonResponse({ success: false, error: "A conversa ficou grande demais. Resuma sua ultima mensagem e tente novamente." }, { status: 413 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch (_error) {
    return jsonResponse({ success: false, error: "Nao consegui ler sua mensagem." }, { status: 400 });
  }

  const messages = Array.isArray(payload?.messages)
    ? payload.messages.map(cleanChatMessage).filter(Boolean).slice(-12)
    : [];
  const context = payload?.context && typeof payload.context === "object" ? payload.context : {};

  if (!messages.length || messages[messages.length - 1]?.role !== "user") {
    return jsonResponse({ success: false, error: "Envie uma mensagem para conversar com a NEXO IA." }, { status: 400 });
  }

  if (!env.OPENAI_API_KEY) {
    return jsonResponse({
      success: false,
      error: "A NEXO IA ainda nao esta conectada. Configure OPENAI_API_KEY no Cloudflare para conversar com a IA.",
    }, { status: 500 });
  }

  const maxOutputTokens = Number(env.NEXO_CHAT_MAX_OUTPUT_TOKENS || env.NEXO_MAX_OUTPUT_TOKENS || 1800);
  const reasoningEffort = env.NEXO_REASONING_EFFORT || "low";
  const baseOpenAiPayload = {
    reasoning: { effort: reasoningEffort },
    max_output_tokens: Math.min(Math.max(maxOutputTokens, 700), 2600),
    input: [
      { role: "developer", content: buildNexoChatPrompt(context) },
      ...messages.map((message) => ({ role: message.role, content: message.content })),
    ],
  };

  try {
    const failures = [];
    for (const model of nexoModelCandidates(env)) {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...baseOpenAiPayload, model }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const message = safeOpenAiError(data);
        failures.push(`${model}: ${message}`);
        console.error("NEXO chat OpenAI error", response.status, model, message);
        continue;
      }

      const answer = extractOutputText(data);
      if (!answer) {
        failures.push(`${model}: resposta vazia.`);
        continue;
      }

      return jsonResponse({
        success: true,
        message: {
          role: "assistant",
          content: answer.slice(0, 6000),
          createdAt: new Date().toISOString(),
        },
        meta: {
          model,
          savedAt: new Date().toISOString(),
          usage: data?.usage || null,
        },
      });
    }

    return jsonResponse({
      success: false,
      error: "Nao consegui responder agora. Verifique a conexao da NEXO IA ou tente novamente em alguns instantes.",
      ...(env.ANSEND_DEBUG_ERRORS === "true" ? { details: failures.slice(0, 3).join(" | ") } : {}),
    }, { status: 502 });
  } catch (error) {
    console.error("NEXO chat failed", error?.message || error);
    return jsonResponse({
      success: false,
      error: "Nao consegui responder agora. Verifique a conexao da NEXO IA ou tente novamente em alguns instantes.",
    }, { status: 502 });
  }
}

async function handleNexoAnalysis(request, env) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204 });
  if (request.method !== "POST") {
    return jsonResponse({ success: false, error: "Metodo nao permitido." }, { status: 405 });
  }
  const auth = await requireAuthenticatedUser(request, env);
  if (!auth.ok) return auth.response;
  const limited = checkRateLimit(request, { userId: auth.user.id, limit: 6, windowMs: 60_000 });
  if (limited) return limited;

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 12000) {
    return jsonResponse({ success: false, error: "Seu diagnostico ficou grande demais. Resuma a ideia e tente novamente." }, { status: 413 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch (_error) {
    return jsonResponse({ success: false, error: "Nao consegui ler os dados enviados. Revise o formulario." }, { status: 400 });
  }

  const validation = validateNexoQuiz(payload?.quiz);
  if (!validation.valid) {
    return jsonResponse({ success: false, error: validation.error }, { status: 400 });
  }

  if (!env.OPENAI_API_KEY) {
    return jsonResponse({
      success: false,
      error: "A NEXO IA ainda nao esta conectada. Configure OPENAI_API_KEY no Cloudflare para gerar diagnosticos reais.",
    }, { status: 500 });
  }

  const maxOutputTokens = Number(env.NEXO_MAX_OUTPUT_TOKENS || 2200);
  const reasoningEffort = env.NEXO_REASONING_EFFORT || "low";

  const baseOpenAiPayload = {
    reasoning: { effort: reasoningEffort },
    max_output_tokens: Math.min(Math.max(maxOutputTokens, 800), 3200),
    input: [
      { role: "developer", content: buildNexoDeveloperPrompt() },
      {
        role: "user",
        content: JSON.stringify({
          tarefa: "Gerar diagnostico musical inteligente para a plataforma ANSEND.",
          quiz: validation.quiz,
        }),
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "nexo_diagnostico_musical",
        strict: true,
        schema: nexoDiagnosisSchema,
      },
    },
  };

  try {
    const failures = [];
    for (const model of nexoModelCandidates(env)) {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...baseOpenAiPayload, model }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const message = safeOpenAiError(data);
        failures.push(`${model}: ${message}`);
        console.error("NEXO OpenAI error", response.status, model, message);
        continue;
      }

      const outputText = extractOutputText(data);
      if (!outputText) {
        failures.push(`${model}: resposta vazia.`);
        continue;
      }

      try {
        const diagnostico = JSON.parse(outputText);
        return jsonResponse({
          success: true,
          diagnostico,
          meta: {
            model,
            savedAt: new Date().toISOString(),
            usage: data?.usage || null,
          },
        });
      } catch (_parseError) {
        failures.push(`${model}: resposta fora do formato JSON esperado.`);
      }
    }

    return jsonResponse({
      success: false,
      error: "A NEXO IA nao conseguiu gerar o diagnostico agora.",
      ...(env.ANSEND_DEBUG_ERRORS === "true" ? { details: failures.slice(0, 3).join(" | ") } : {}),
    }, { status: 502 });
  } catch (error) {
    console.error("NEXO analysis failed", error?.message || error);
    return jsonResponse({
      success: false,
      error: "A NEXO IA encontrou uma falha temporaria. Salve seu quiz e tente novamente.",
    }, { status: 502 });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let response;

    if (url.pathname === "/api/nexo/analisar") {
      response = await handleNexoAnalysis(request, env);
      return withSecurityHeaders(response, request);
    }

    if (url.pathname === "/api/nexo/chat") {
      response = await handleNexoChat(request, env);
      return withSecurityHeaders(response, request);
    }

    if (url.pathname === "/api/recommendations/embed-content") {
      response = await handleEmbedContent(request, env);
      return withSecurityHeaders(response, request);
    }

    if (url.pathname === "/api/recommendations/update-interest") {
      response = await handleUpdateInterest(request, env);
      return withSecurityHeaders(response, request);
    }

    if (url.pathname === "/api/recommendations/nexo-intent") {
      response = await handleNexoIntent(request, env);
      return withSecurityHeaders(response, request);
    }

    if (url.pathname === "/api/geo") {
      const country = request.cf?.country || "UNKNOWN";
      const region = request.cf?.region || null;
      const city = request.cf?.city || null;
      const locale = country === "BR" ? "pt-BR" : "en";

      response = Response.json({
        country,
        region,
        city,
        locale,
      });
      return withSecurityHeaders(response, request);
    }

    response = await env.ASSETS.fetch(request);
    if (response.ok && url.pathname.startsWith("/assets/")) {
      const headers = new Headers(response.headers);
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
      return withSecurityHeaders(response, request);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && (contentType.includes("text/html") || contentType.includes("javascript") || contentType.includes("text/css")) && !contentType.includes("charset")) {
      const newHeaders = new Headers(response.headers);
      newHeaders.set("content-type", `${contentType}; charset=utf-8`);
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });
      return withSecurityHeaders(response, request);
    }
    return withSecurityHeaders(response, request);
  },
};
