const { expect } = require("chai");
const puppeteer = require("puppeteer");
const _ = require("lodash");
const globalVariables = _.pick(global, ["browser", "expect"]);

// puppeteer options
const opts = {
  headless: false,
  slowMo: 50,
  timeout: 10000,
  devtools: true
};

// expose variables
before(async function() {
  global.expect = expect;
  global.browser = await puppeteer.launch(opts);
});

// close browser and reset global variables
after(async function() {
  global.browser.close();

  global.browser = globalVariables.browser;
  global.expect = globalVariables.expect;
});
