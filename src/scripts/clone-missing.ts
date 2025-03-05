import { loadConfig } from "../utils/config.js";
import { logger } from "../utils/logger.js";
import {
  cloneRepo,
  closePrompt,
  getAllRepos,
  repoExists,
  updateRootRepo,
} from "../utils/repo-utils.js";

export async function cloneMissingRepos(): Promise<void> {
  logger("Checking for missing repositories...");
  const config = await loadConfig("./sov_launchpad.config.ts");
  const repos = getAllRepos(config);
  let clonedCount = 0;

  // Clone missing repos
  for (const repo of repos) {
    if (!repoExists(repo.path) && repo.config.repoUrl) {
      await cloneRepo(repo.config.repoUrl, repo.path, repo.config.branch);
      clonedCount++;
    }
  }

  if (clonedCount === 0) {
    logger("No missing repositories found.");
  } else {
    logger(`Cloned ${clonedCount} missing repositories.`);
  }

  // Update root repository
  await updateRootRepo();

  closePrompt();
}
