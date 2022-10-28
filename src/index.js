import { getTasks } from "./functions";

(async () => {
   const tasks = await getTasks();
   console.info('Tasks to save:', tasks);
})();