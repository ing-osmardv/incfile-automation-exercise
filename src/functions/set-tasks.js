import puppeteer from "puppeteer";
import { todoIst as constants } from "../constants";
import { delay } from "../utils";

export const setTasks = async (tasks) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(constants.URL);
  await loginTodoPage(page);
  await addTasks(page, tasks);
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

const addTasks = async (page, tasks) => {
  await page.click(constants.ADD_BUTTON_SELECTOR);
  for (const task of tasks) {
    await page.type(constants.TASK_TITLE_SELECTOR, task.title);
    await page.type(constants.TASK_DESCRIPTION_SELECTOR, task.description);
    await page.click(constants.SAVE_TASK_BUTTON_SELECTOR);
    await page.waitForResponse(constants.SAVE_TASK_API_URL);
    console.info(`Task: '${task.title}' saved`);
  }
  await page.click(constants.CANCEL_TASK_BUTTON_SELECTOR);
};
