// server.mjs
import { createServer } from "http";
import { parse } from "url";
import next from "next";

const app = next({ dev: false });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(PORT, () => {
    console.log(`> EdgeCloud ready on port ${PORT}`);
  });
});
