import { generateXML, parseCrawlLog } from "../src/lib.ts";

const smallTestFile = await Deno.readTextFile("./test/small_crawl.log");
const largeTestFile = await Deno.readTextFile("./test/large_crawl.log");
const smallUrls = parseCrawlLog(smallTestFile, [200, 301]);
const largeUrls = parseCrawlLog(largeTestFile, [200, 301]);


Deno.bench(function parseSmallCrawlLog() {
  parseCrawlLog(smallTestFile, [200, 301]);
});

Deno.bench(function parseLargeCrawlLog() {
  parseCrawlLog(largeTestFile, [200, 301]);
});

Deno.bench(function generateSmallXML() {
  generateXML(smallUrls);
});

Deno.bench(function generateLargeXML() {
  generateXML(largeUrls);
});

// deno task bench
