import { assertEquals } from "https://deno.land/std@0.182.0/testing/asserts.ts";
import { app } from "../src/server.ts";

const testFile = await Deno.readTextFile("./test/small_crawl.log");
const expectedOutput = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>https://www.nla.gov.au/robots.txt</loc><lastmod>2023-09-30</lastmod></url>
<url><loc>https://trove.nla.gov.au/robots.txt</loc><lastmod>2023-09-30</lastmod></url>
<url><loc>https://trove.nla.gov.au/</loc><lastmod>2023-09-30</lastmod></url>
<url><loc>https://www.nla.gov.au/</loc><lastmod>2023-09-30</lastmod></url>
<url><loc>https://www.google-analytics.com/robots.txt</loc><lastmod>2023-09-30</lastmod></url>
</urlset>`;

Deno.test("test valid convert request", async () => {
  const res = await app.request("/convert?status=200&status=301", {
    method: "POST",
    body: testFile,
  });

  assertEquals(res.status, 200);
  assertEquals(res.headers.get("Content-Type"), "application/xml");
  assertEquals(await res.text(), expectedOutput);
});

Deno.test("test invalid convert request", async () => {
  const res = await app.request("/convert", {
    method: "POST",
    body: testFile,
  });
  assertEquals(res.status, 400);
  assertEquals(await res.text(), "Please provide status codes to filter by");
});

Deno.test("test root path", async () => {
  const res = await app.request("/");
  assertEquals(res.status, 200);
  assertEquals(await res.text(), "Hello World!");
});

// deno task test
