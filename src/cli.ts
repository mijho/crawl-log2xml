import { generateXML, parseCrawlLog } from "./lib.ts";
import { parse } from "https://deno.land/std@0.203.0/flags/mod.ts";

const statusCodes: number[] = parse(Deno.args)._.map(Number);
if (statusCodes.length === 0) {
  console.log("Please provide status codes to filter by");
  Deno.exit(1);
}

const crawlLog = await Deno.readTextFile(parse(Deno.args).file);
const urls = parseCrawlLog(crawlLog, statusCodes);
const xml = generateXML(urls);
await Deno.writeTextFile("sitemap.xml", xml);
console.log("sitemap.xml generated");

// deno task run:cli
