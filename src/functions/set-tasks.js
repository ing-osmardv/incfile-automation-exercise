import puppeteer from "puppeteer";
import { todoIst as constants } from "../constants";

export const setTasks = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(constants.URL);

  await browser.close();
};
