const puppeteer = require("puppeteer");

describe("Movies UI automated testing", function() {
  let page;
  before(async function() {
    page = await global.browser.newPage();
    await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });
  });

  after(async function() {
    const browser = await puppeteer.launch();
    page = await global.browser.newPage();
    await page.close();
  });
  it("should open the landing page and wait for the table data to be loaded, with a header 'One Movie Fund' and body title All Movies", async function() {
    const nav = await page.evaluate(() => {
      let header = document.querySelector(
        'nav[class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"] > a'
      ).innerText;
      let title = document.querySelector("h1[class=h2]").innerText;
      return { title, header };
    });
    expect(
      await page.$eval(
        'a[class="navbar-brand col-sm-3 col-md-2 mr-0"]',
        e => e.innerText
      )
    ).to.eql(nav.header);
    expect(await page.$eval("h1[class=h2]", e => e.innerText)).to.eql(
      nav.title
    );
  });
  it("should verify that the main table has entries with title, genre and rating", async function() {
    const movie = await page.evaluate(() => {
      let id = document.querySelector("td").getAttribute("data-attr");
      let title = document.querySelector(`td[data-attr="${id}"] > a`).innerText;
      let genre = document.querySelector("td > span").innerText;
      let rating = document.querySelector("td").innerText;
      return { title, id, genre, rating };
    });
    expect(
      await page.$eval(`td[data-attr="${movie.id}"] > a`, e => e.innerText)
    ).to.eql(movie.title);
    expect(await page.$eval("td > span", e => e.innerText)).to.eql(movie.genre);
    expect(await page.$eval("td", e => e.innerText)).to.eql(movie.rating);
  });
  it("It should redirect to a movie genre when clicked", async function() {
    const sideNav = await page.evaluate(() => {
      let sideNavText = document.querySelector('a[class="nav-link"]').innerText;
      return sideNavText;
    });
    const [response] = await Promise.all([
      page.waitForNavigation(res => res.url().endsWith(`/${sideNav}`)),
      page.click('a[class="nav-link"]'),
      page.waitFor(2000)
    ]);
    await response;
  });
  it("It should redirect to a specific movie detail page when clicked", async function() {
    const movieId = await page.evaluate(() => {
      let id = document.querySelector("td").getAttribute("data-attr");
      return id;
    });
    const [response] = await Promise.all([
      page.waitForNavigation(res => res.url().endsWith(`/${movieId}`)),
      page.click(`td[data-attr="${movieId}"] > a`),
      page.waitFor(2000)
    ]);
    await response;
  });
});
