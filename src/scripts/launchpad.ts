#!/usr/bin/env node
import inquirer from "inquirer";

import { getRootDirectory, loadConfig } from "../utils/config.js";
import { logger, loggerError } from "../utils/logger.js";
import { cloneMissingRepos } from "./clone-missing.js";
import { navigateFolders } from "./navigate-folders.js";
import { updateAllRepos } from "./update-all.js";

async function main(): Promise<void> {
  logger("🚀 Sovendus Launchpad");

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        {
          name: "Navigate folders and open in VS Code",
          value: "navigate-folders",
        },
        { name: "Clone missing repositories", value: "clone-missing" },
        { name: "Update all repositories", value: "update-all" },
        {
          name: "Update all repositories (auto stash and stash pop)",
          value: "update-all-force",
        },
        { name: "Exit", value: "exit" },
      ],
    },
  ]);

  if (action === "exit") {
    logger("Goodbye! 👋");
    return;
  }
  const config = await loadConfig();

  const rootDir = getRootDirectory();

  try {
    logger(`Executing: ${action}...`);

    switch (action) {
      case "clone-missing":
        await cloneMissingRepos(rootDir, config);
        break;
      case "update-all":
        await updateAllRepos(false, rootDir, config);
        break;
      case "update-all-force":
        await updateAllRepos(true, rootDir, config);
        break;
      case "navigate-folders":
        await navigateFolders(rootDir, config);
        break;
    }

    logger("Command completed successfully! ✅");
  } catch (error) {
    loggerError("Error executing command:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  loggerError("An unexpected error occurred:", error);
  process.exit(1);
});
