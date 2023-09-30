import { Hono } from "https://deno.land/x/hono@v3.7.2/mod.ts";
import { parse } from "https://deno.land/std@0.203.0/flags/mod.ts";
import { generateXML, parseCrawlLog } from "./lib.ts";

const PORT = parse(Deno.args).port || 8000;

export const app = new Hono();

app.get("/", (c) => c.text("Hello World!"));

app.post("/convert", async (c) => {
  const body = await c.req.arrayBuffer();
  const statusCodes: number[] = c.req.queries("status")?.map(Number) || [];
  if (statusCodes.length === 0) {
    return c.text("Please provide status codes to filter by", { status: 400 });
  }
  const crawlLog = new TextDecoder().decode(body);
  const urls = parseCrawlLog(crawlLog, statusCodes);
  if (urls.length > 0) {
    c.header("Content-Type", "application/xml");
    return c.body(generateXML(urls), {
      headers: { "Content-Type": "application/xml" },
    });
  } else {
    return c.text("No urls found");
  }
});

Deno.serve({ port: PORT }, app.fetch);

// deno task run:server
