# crawl-log2xml

## Description
Basic tools to:
  - parse a Heritrix3 crawl.log
  - extract URLs matching the specified status codes
  - generate a sitmap.xml

The tool comes in two versions cli and server. The cli is likely the more reliable, the server method is probably limited to smaller crawl.log due to POST body limits.

## Usage

```
deno task test # run tests
deno task test # run tests in watch mode
deno task bench # run benchmarks
deno task run:cli --file ./path/to/crawl.log 200 300 # run the cli add as many status codes as args they will be parsed into a list
deno task run:server --port 8000 # run the server
```

### Example Queries
```
curl -XPOST --data-binary "@./test/small_crawl.log" "http://localhost:8000/convert?status=200"
```