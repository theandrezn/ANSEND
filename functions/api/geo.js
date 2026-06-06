export async function onRequest(context) {
  const country = context.request.cf?.country || "UNKNOWN";
  const region = context.request.cf?.region || null;
  const city = context.request.cf?.city || null;
  const locale = country === "BR" ? "pt-BR" : "en";

  return Response.json({
    country,
    region,
    city,
    locale,
  });
}
