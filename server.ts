import express from "express";
import path from "path";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

async function start() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    // Hashed build assets can be cached forever; HTML must always be revalidated.
    app.use(
      "/assets",
      express.static(path.join(distPath, "assets"), { immutable: true, maxAge: "1y" }),
    );
    app.use(express.static(distPath, { maxAge: "1h" }));
    app.get("*", (_req, res) => {
      res.setHeader("Cache-Control", "no-cache");
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Cake Fruition running at http://localhost:${PORT}`);
  });
}

start();
