import { buildNexoDeveloperPrompt } from "./nexo/nexo-prompt.mjs";
import { nexoDiagnosisSchema } from "./nexo/nexo-schema.mjs";
import { validateNexoQuiz } from "./nexo/nexo-validation.mjs";

function jsonResponse(payload, init = {}) {
  return Response.json(payload, {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
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

function buildNexoChatPrompt() {
  return `Voce e a NEXO IA, a inteligencia musical da ANSEND.
Sua funcao e conversar com artistas, beatmakers e profissionais da musica para transformar ideias soltas em planos praticos de lancamento.
Conduza a conversa naturalmente, sem quiz rigido.
Faca perguntas curtas, uma por vez, quando precisar de mais contexto.
Quando tiver informacao suficiente, entregue diagnostico musical, plano de acao, proximos passos, tipos de servicos/profissionais necessarios dentro da ANSEND, ordem de execucao e ideias de posicionamento, estetica, capa, conteudo e lancamento.
Nao invente profissionais reais, nomes de pessoas, dados de marketplace, promessas ou resultados.
Se nao houver dados reais de marketplace disponiveis, sugira apenas categorias de profissionais e servicos.
Seja objetivo, estrategico, profissional, util e escreva em portugues brasileiro.`;
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
      { role: "developer", content: buildNexoChatPrompt() },
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
      details: failures.slice(0, 3).join(" | "),
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
      details: failures.slice(0, 3).join(" | "),
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

    if (url.pathname === "/api/nexo/analisar") {
      return handleNexoAnalysis(request, env);
    }

    if (url.pathname === "/api/nexo/chat") {
      return handleNexoChat(request, env);
    }

    if (url.pathname === "/api/geo") {
      const country = request.cf?.country || "UNKNOWN";
      const region = request.cf?.region || null;
      const city = request.cf?.city || null;
      const locale = country === "BR" ? "pt-BR" : "en";

      return Response.json({
        country,
        region,
        city,
        locale,
      });
    }

    return env.ASSETS.fetch(request);
  },
};
