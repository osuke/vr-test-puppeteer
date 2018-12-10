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
      await page.setViewport({
        width: 1200,
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