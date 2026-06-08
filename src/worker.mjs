export default {
  async fetch(request, env) {
    const url = new URL(request.url);

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
