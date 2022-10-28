import * as dotenv from 'dotenv'
import { getTasks, setTasks } from "./functions";

dotenv.config();

(async () => {
   const tasks = await getTasks();
   console.info('Tasks to save:', tasks);
   await setTasks(tasks);
})();