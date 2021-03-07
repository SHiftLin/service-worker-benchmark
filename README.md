A little tool to test the speed of service worker for a page with 300 requests.

# Install

```sh
npm install
```

# Run

```sh
npm run serve
```

You can also change the port number or run an HTTP2 (HTTPS) server:

```sh
npm run serve -- --http2 --port=8081
```

# Test Results
<img src="./output/sw_perf.png" width = "600px" alt="SW Performance of Chrome and Firefox"/>