import puppeteer from "puppeteer";
import { todoIst as constants } from "../constants";
import { delay } from "../utils";

export const setTasks = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(constants.URL);
  await loginTodoPage(page);
  await browser.close();
};

const loginTodoPage = async (page) => {
  try {
    await page.type(constants.EMAIL_INPUT_SELECTOR, process.env.TODOIST_USER);
    await page.type(constants.PASSWORD_INPUT_SELECTOR, process.env.TODOIST_PASSWORD);
    await page.click(constants.LOGIN_BUTTON_SELECTOR);
    await page.waitForNavigation({ waitUntil: "networkidle2" });
    await delay(250);
  } catch (err) {
    throw new Error(
      "An error occurred while logging in. Please check your credentials"
    );
  }
};