'use strict'

const puppeteer = require('puppeteer');
const fs = require('fs');
const exec = require('child_process').exec;
const { exit } = require('process');

function median(values) {
    if (values.length === 0) return 0;
    values.sort(function (a, b) {
        return a - b;
    });
    var half = Math.floor(values.length / 2);
    if (values.length % 2)
        return values[half];
    return (values[half - 1] + values[half]) / 2.0;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {

    const argv = require('minimist')(process.argv.slice(2), {
        boolean: ['fetch', 'firefox']
    });

    var config = {
        headless: false,
        defaultViewport: { width: 1920, height: 1080 }
    }

    if (argv.firefox) {
        config.product = "firefox";
        config.args = [
            '-width 1920',
            '-height 1080'
        ];
    } else {
        config.product = "chrome"
        config.args = [
            '--window-size=1920,1080'
            // '--no-sandbox', //running as root
            // '--disable-gpu',
            // '--disable-setuid-sandbox'
        ];
    }

    let filename = './output/PLT_' + config.product + '_' + ((argv.fetch) ? 'fetch' : '') + '.csv'
    console.log(filename);
    fs.writeFileSync(filename, '');
    let s = [];
    var start, end;
    for (let k = 0; k < 21; k++) {
        var browser = await puppeteer.launch(config);
        var context = browser; // var context = await browser.createIncognitoBrowserContext();
        var page = await context.newPage();
        await page.setCacheEnabled(false);
        await page.goto("http://127.0.0.1:8000");
        await sleep(2000);
        if (argv.fetch) {
            await page.click('body > div.controls > button:nth-child(3)')
            await sleep(1000);
        }
        await page.close();

        page = await context.newPage();
        await page.setCacheEnabled(false);
        page.on('load', msg => {
            end = Date.now()
        });
        start = Date.now();
        await page.goto("http://127.0.0.1:8000");
        await sleep(1000);

        let duration = end - start;
        console.log("start: " + start + " end: " + end);
        console.log("duration: " + duration);
        if (k > 0) {
            s.push(duration);
            fs.appendFileSync(filename, duration + '\n');
        }
        await page.close();
        await sleep(1000);

        await browser.close();
        await sleep(1000);
    }
    console.log("*********finished*********");
})();

