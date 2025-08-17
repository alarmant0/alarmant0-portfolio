export interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname.toLowerCase();

    const ROUTES: Record<string, string | null> = {
      "/": "/index.html",
      "/home": "/index.html",
      "/work": "/work/work.html",
      "/projects": "/projects.html",
      "/cv": "/assets/cv/CV_DavidPinheiro.pdf",
    };

    if (ROUTES[path]) {
      const assetUrl = new URL(ROUTES[path]!, request.url);
      return env.ASSETS.fetch(new Request(assetUrl, request));
    }

    return new Response("<h1>404 Not Found</h1>", {
      status: 404,
      headers: { "Content-Type": "text/html" },
    });
  },
} satisfies ExportedHandler<Env>;
