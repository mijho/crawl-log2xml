// parseCrawlLog is a function that parses a crawl log string and returns urls that match the specified status codes
export function parseCrawlLog(
  logLines: string,
  statusCode: number[],
): string[] {
  const urls: string[] = [];
  const lines = logLines.split("\n");
  for (const line of lines) {
    const splitLine = line.split(/\s/).filter((item) => item);
    if (statusCode.includes(Number(splitLine[1]))) {
      const url = splitLine[3];
      urls.push(url);
    }
  }
  return urls;
}

// generateXML is a function that generates a sitemap.xml file from a list of urls
export function generateXML(urls: string[]): string {
  const date = new Date().toLocaleDateString("en-CA");
  let siteMap = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  siteMap += urls.map((url) =>
    `<url><loc>${url}</loc><lastmod>${date}</lastmod></url>`
  ).join("\n");
  siteMap += `\n</urlset>`;
  return siteMap;
}
