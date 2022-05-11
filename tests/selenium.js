/**
 * To run this test: `npx mocha --reporter spec`
 */

const assert = require("assert");
webdriver = require("selenium-webdriver");


describe("Home page", function () {
  it("Home nav link", async () => {
    const driver = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .build();
    await driver.get("http://localhost:3000/");
    await driver.sleep(7000);
    const navLink = await driver.findElement(
      webdriver.By.xpath("//a[text()='Home']")
    );
    const text = await navLink.getText();
    const fontWeight = await navLink.getCssValue("font-weight");
    assert.equal(fontWeight, "600");
    assert.equal(text, "Home");
  }).timeout(20000);
  it("API nav link", async () => {
    const driver = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .build();
    await driver.get("http://localhost:3000/");
    await driver.sleep(7000);
    const navLink = await driver.findElement(
      webdriver.By.xpath("//a[text()='API']")
    );
    const text = await navLink.getText();
    const fontWeight = await navLink.getCssValue("font-weight");
    assert.equal(fontWeight, "600");
    assert.equal(text, "API");
  }).timeout(20000);
  it("Check dropdown", async () => {
    const driver = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .build();
    await driver.get("http://localhost:3000/");
    await driver.sleep(7000);
    const profileDropdown = await driver.findElements(
      webdriver.By.css("#headlessui-menu-items-5")
    );
    assert.equal(profileDropdown.length, 0);
    await driver.findElement(webdriver.By.css("nav button")).click();
    const profileDropdownAfter = await driver.findElements(
      webdriver.By.css("#headlessui-menu-items-5")
    );
    assert.equal(profileDropdownAfter.length, 1);
  }).timeout(20000);
});
