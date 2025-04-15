let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1', { timeout: 5000 });
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  }, 10000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 5000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
      timeout: 5000
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  }, 5000);
});

describe("Github Explore page tests", () => {
  let page;

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/explore");
  });

  afterEach(() => {
    page.close();
  });

  test("Explore page title", async () => {
    await page.waitForSelector("h1", { timeout: 5000 });
    const title = await page.$eval("h1", (h1) => h1.textContent);
    expect(title).toContain("Explore GitHub");
  }, 10000);

  test("Check trending repositories link", async () => {
    const trendingLinkSelector = 'a[href="/trending"]';
    await page.waitForSelector(trendingLinkSelector, { timeout: 5000 });
    const trendingLinkText = await page.$eval(trendingLinkSelector, (a) => a.textContent);
    expect(trendingLinkText).toContain("Trending");
  }, 5000);

    test("Check topics link and content", async () => {
    const topicsLinkSelector = 'a[data-ga-click="Explore, go to topics, text:topics"]';
    await page.waitForSelector(topicsLinkSelector, { timeout: 5000 });
    await page.click(topicsLinkSelector);
    await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 });
    const title = await page.title();
    expect(title).toContain("Topics");
  }, 10000);
});