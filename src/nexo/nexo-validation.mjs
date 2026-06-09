const allowedStringFields = new Set([
  "nomeArtistico",
  "generoMusical",
  "subgenero",
  "nivelCarreira",
  "objetivoPrincipal",
  "descricaoIdeiaMusical",
  "tipoProjeto",
  "prazoLancamento",
  "orcamento",
  "principalDificuldade",
  "referenciasArtisticas",
  "publicoAlvo",
  "vibeDaMusica",
]);

const allowedBooleanFields = new Set([
  "jaTemMusicaGravada",
  "jaTemBeat",
  "jaTemCapa",
  "jaTemMixMaster",
]);

function cleanString(value, max = 700) {
  return String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function validateNexoQuiz(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { valid: false, error: "Envie as respostas do quiz para gerar o diagnostico." };
  }

  const quiz = {};
  for (const field of allowedStringFields) {
    quiz[field] = cleanString(input[field]);
  }
  for (const field of allowedBooleanFields) {
    quiz[field] = Boolean(input[field]);
  }

  if (!quiz.generoMusical) return { valid: false, error: "Informe o genero musical principal." };
  if (!quiz.objetivoPrincipal) return { valid: false, error: "Informe o objetivo principal do projeto." };
  if (!quiz.descricaoIdeiaMusical || quiz.descricaoIdeiaMusical.length < 12) {
    return { valid: false, error: "Descreva sua ideia musical com um pouco mais de detalhe." };
  }

  const serialized = JSON.stringify(quiz);
  if (serialized.length > 6500) {
    return { valid: false, error: "O quiz ficou grande demais. Reduza as referencias e tente novamente." };
  }

  return { valid: true, quiz };
}
