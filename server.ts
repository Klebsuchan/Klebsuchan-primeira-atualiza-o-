import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { app as apiApp } from "./api/index.ts";
import { app as ssrApp } from "./api/ssr.ts";

export const app = express();

app.use(apiApp);

async function startServer() {
  const PORT = 3000;

  // Vite middleware para o ambiente de desenvolvimento
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // SSR handler after vite handles static files internally
    app.use(ssrApp);
    
  } else {
    // Modo de produção: serve os arquivos gerados em 'dist'
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: false }));
    
    app.use(ssrApp);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Em ambientes serverless (Vercel), não chamamos startServer(). O app é exportado acima.
if (!process.env.VERCEL && process.env.NODE_ENV !== "vercel") {
  startServer();
}
