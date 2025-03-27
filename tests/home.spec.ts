import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should have correct metadata and elements", async ({ page }) => {
    await expect(page).toHaveTitle("Dream Travels");
    await expect(
      page.getByRole("heading", { level: 1, name: "The places you dream of" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Create a new trip" })
    ).toBeVisible();
  });

  test("Search functionality works", async ({ page }) => {
    const searchInput = page.getByRole("textbox", { name: "Search" });
    const searchButton = page.getByRole("button", { name: "Search" });

    await searchInput.fill("Slovenia");
    await searchButton.click();

    const tripCard = page.getByTestId("Slovenia");
    await expect(tripCard).toBeVisible();
  });

  test("Trip filters update URL correctly", async ({ page }) => {
    await page.waitForSelector('[role="tab"]');

    const tabs = page.getByRole("tab");
    await expect(tabs).toHaveCount(3);

    await page.getByRole("tab", { name: "Upcoming" }).click();
    await expect(page).toHaveURL("http://localhost:3000/?status=todo");

    await page.getByRole("tab", { name: "Completed" }).click();
    await expect(page).toHaveURL("http://localhost:3000/?status=done");

    await page.getByRole("tab", { name: "All" }).click();
    await expect(page).toHaveURL("http://localhost:3000/");
  });
});
