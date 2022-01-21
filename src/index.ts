import * as dotenv from "dotenv"; // Env vars
import { retrieveAsset } from "./retrieve";

dotenv.config();

(async () => {
  await retrieveAsset();
})();
