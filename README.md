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
+ Environment: Ubuntu 16.04, Intel Core i7-7700 CPU, 32GiB RAM.
+ Browsers: Chromium 90.0.4427.0, Firefox Nightly: 88.0a1
+ Measure the page load time (PLT) of [`index.html`](https://github.com/SHiftLin/service-worker-benchmark/blob/master/public/index.html) in Chromium and Firefox.
For each browser, load the page without service worker and with a service worker ([`empty_fetch.js`](https://github.com/SHiftLin/service-worker-benchmark/blob/master/public/empty-fetch.js)), respectively. Run each test case for 20 times. The [`webvisit.js`](https://github.com/SHiftLin/service-worker-benchmark/blob/master/webvisit.js) shows the test script.
+ As shown in the figure below, Firefox has much more overhead of the service worker than Chromium.

<img src="./output/sw_perf.png" width = "600px" alt="SW Performance of Chrome and Firefox"/>