const priority = {
  type: "object",
  additionalProperties: false,
  required: ["titulo", "descricao", "urgencia"],
  properties: {
    titulo: { type: "string" },
    descricao: { type: "string" },
    urgencia: { type: "string" },
  },
};

const professional = {
  type: "object",
  additionalProperties: false,
  required: ["tipo", "motivo", "prioridade", "quandoContratar"],
  properties: {
    tipo: { type: "string" },
    motivo: { type: "string" },
    prioridade: { type: "string" },
    quandoContratar: { type: "string" },
  },
};

const combo = {
  type: "object",
  additionalProperties: false,
  required: ["nome", "descricao", "servicosInclusos", "idealPara"],
  properties: {
    nome: { type: "string" },
    descricao: { type: "string" },
    servicosInclusos: { type: "array", items: { type: "string" }, minItems: 1, maxItems: 5 },
    idealPara: { type: "string" },
  },
};

const releaseStep = {
  type: "object",
  additionalProperties: false,
  required: ["fase", "acao", "prazoSugerido"],
  properties: {
    fase: { type: "string" },
    acao: { type: "string" },
    prazoSugerido: { type: "string" },
  },
};

export const nexoDiagnosisSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "diagnosticoGeral",
    "nivelAtual",
    "resumoDoMomento",
    "objetivoMaisProvavel",
    "principaisProblemas",
    "prioridades",
    "profissionaisRecomendados",
    "combosRecomendados",
    "mapaDeLancamento",
    "proximosPassos",
    "mensagemFinal",
  ],
  properties: {
    diagnosticoGeral: { type: "string" },
    nivelAtual: { type: "string" },
    resumoDoMomento: { type: "string" },
    objetivoMaisProvavel: { type: "string" },
    principaisProblemas: { type: "array", items: { type: "string" }, minItems: 1, maxItems: 6 },
    prioridades: { type: "array", items: priority, minItems: 1, maxItems: 5 },
    profissionaisRecomendados: { type: "array", items: professional, minItems: 1, maxItems: 4 },
    combosRecomendados: { type: "array", items: combo, minItems: 1, maxItems: 3 },
    mapaDeLancamento: { type: "array", items: releaseStep, minItems: 5, maxItems: 7 },
    proximosPassos: { type: "array", items: { type: "string" }, minItems: 3, maxItems: 5 },
    mensagemFinal: { type: "string" },
  },
};
