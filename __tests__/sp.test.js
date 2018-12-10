const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');
const pages = require('../config.js').pages;

jest.setTimeout('10000');
expect.extend({ toMatchImageSnapshot });

pages.map((url) => {
  describe(url, () => {
    let browser;

    beforeAll(async () => {
      browser = await puppeteer.launch();
    });

    it('works', async () => {
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
      await page.setViewport({
        width: 375,
        height: 667
      });
      await page.goto(url);
      const image = await page.screenshot({fullPage: true});

      expect(image).toMatchImageSnapshot({
        customDiffConfig: {
          threshold: 0.0
        }
      });
    });

    afterAll(async () => {
      await browser.close();
    });
  });
});