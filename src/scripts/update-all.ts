import { join } from "node:path";

import type { SovendusLaunchpadConfig } from "../types/types.js";
import { logger } from "../utils/logger.js";
import {
  cloneRepo,
  closePrompt,
  getAllRepos,
  repoExists,
  updateRepo,
  updateRootRepo,
} from "../utils/repo-utils.js";

export async function updateAllRepos(
  force: boolean = false,
  rootDir: string,
  config: SovendusLaunchpadConfig,
): Promise<void> {
  logger("Updating all repositories...");
  const repos = getAllRepos(config);

  let clonedCount = 0;
  let updatedCount = 0;

  // Process each repo
  for (const repo of repos) {
    if (!repoExists(repo.path, rootDir) && repo.config.repoUrl) {
      // Clone missing repos
      await cloneRepo(
        repo.config.repoUrl,
        join(...repo.path),
        repo.config.branch,
        rootDir,
      );
      clonedCount++;
    } else if (repoExists(repo.path, rootDir)) {
      // Update existing repos
      await updateRepo(repo.path, repo.config.branch, force, rootDir);
      updatedCount++;
    }
  }

  logger(`Cloned ${clonedCount} missing repositories.`);
  logger(`Updated ${updatedCount} existing repositories.`);

  // Also update the root repository
  await updateRootRepo(force, rootDir);

  closePrompt();
}
