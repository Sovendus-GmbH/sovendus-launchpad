#!/usr/bin/env node
import inquirer from "inquirer";

import { logger, loggerError } from "../utils/logger.js";
import { cloneMissingRepos } from "./clone-missing.js";
import { updateAllRepos } from "./update-all.js";

async function main(): Promise<void> {
  logger("🚀 Sovendus Launchpad");

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
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

  try {
    logger(`Executing: ${action}...`);

    switch (action) {
      case "clone-missing":
        await cloneMissingRepos();
        break;
      case "update-all":
        await updateAllRepos(false);
        break;
      case "update-all-force":
        await updateAllRepos(true);
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
