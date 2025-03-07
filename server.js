import { createRequestHandler } from "@remix-run/express";
import { installGlobals } from "@remix-run/node";
import express from "express";
import * as path from "node:path";
import * as url from "node:url";
import { broadcastDevReady } from '@remix-run/node';

installGlobals();

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const BUILD_DIR = path.join(__dirname, "../build/client");

async function getBuild() {
  // @ts-ignore
  let build = await import(BUILD_DIR);
  return build;
}

async function createApp() {
    const app = express();

    app.use(express.static(path.join(__dirname, "../build/client/assets")));

    app.all(
        "*",
        createRequestHandler({
            getLoadContext(req, res) {
                // You can add any context you want to be available in your loaders here
                return {};
            },
            build: await getBuild(),
            mode: process.env.NODE_ENV,
        })
    );
    return app;
}

createApp().then( async (app) => {
    const port = process.env.PORT || 3000;
    const build = await getBuild();

    const server = app.listen(port, () => {
        console.log(`Express server started on http://localhost:${port}`);
        if (process.env.NODE_ENV === 'development') {
          broadcastDevReady(build);
        }
      }
    );
});
