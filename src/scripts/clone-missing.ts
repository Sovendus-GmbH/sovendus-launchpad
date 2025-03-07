import { join } from "node:path";

import type { SovendusLaunchpadConfig } from "../types/types.js";
import { logger } from "../utils/logger.js";
import {
  cloneRepo,
  closePrompt,
  getAllRepos,
  repoExists,
  updateRootRepo,
} from "../utils/repo-utils.js";

export async function cloneMissingRepos(
  rootDir: string,
  config: SovendusLaunchpadConfig,
): Promise<void> {
  await updateRootRepo(false, rootDir);

  logger("Checking for missing repositories...");
  const repos = getAllRepos(config);
  let clonedCount = 0;

  // Clone missing repos
  for (const repo of repos) {
    if (!repoExists(repo.path, rootDir) && repo.config.repoUrl) {
      await cloneRepo(
        repo.config.repoUrl,
        join(...repo.path),
        repo.config.branch,
        rootDir,
      );
      clonedCount++;
    }
  }

  if (clonedCount === 0) {
    logger("No missing repositories found.");
  } else {
    logger(`Cloned ${clonedCount} missing repositories.`);
  }

  // Update root repository

  closePrompt();
}
