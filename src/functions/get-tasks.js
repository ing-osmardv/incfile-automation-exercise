import puppeteer from "puppeteer";
import { randomList } from "../constants";

export const getTasks = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(randomList.URL);

  const tasks = await page.evaluate(
    ({ TASK_CARD_SELECTOR, TITLE_SELECTOR, DESCRIPTION_SELECTOR }) =>
      Array.from(document.querySelectorAll(TASK_CARD_SELECTOR), (element) => {
        const title = element.querySelector(TITLE_SELECTOR).textContent;
        const description =
          element.querySelector(DESCRIPTION_SELECTOR).textContent;
        return { title, description };
      }),
    randomList
  );
  
  await browser.close();
  return tasks.slice(0, 5);
};
