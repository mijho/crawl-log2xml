import { generateXML, parseCrawlLog } from "../src/lib.ts";

const smallTestFile = await Deno.readTextFile("./test/small_crawl.log");
const urls = parseCrawlLog(smallTestFile, [200, 301]);

Deno.bench(function parseSmallCrawlLog() {
  parseCrawlLog(smallTestFile, [200, 301]);
});

Deno.bench(function generateSmallXML() {
  generateXML(urls);
});

// deno task bench
