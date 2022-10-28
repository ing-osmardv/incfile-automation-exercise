import puppeteer from "puppeteer";
import { randomList } from "../constants";

export const getTasks = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(randomList.URL);

  await browser.close();
};
