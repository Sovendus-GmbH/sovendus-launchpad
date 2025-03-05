import { loadConfig } from "../utils/config.js";
import { logger } from "../utils/logger.js";
import {
  cloneRepo,
  closePrompt,
  getAllRepos,
  repoExists,
  updateRepo,
  updateRootRepo,
} from "../utils/repo-utils.js";

export async function updateAllRepos(force: boolean): Promise<void> {
  logger("Updating all repositories...");
  logger(
    force
      ? "Force mode enabled: Changes will be stashed automatically"
      : "Interactive mode: You will be prompted before stashing changes",
  );

  const config = await loadConfig("./sov_launchpad.config.ts");
  const repos = getAllRepos(config);
  let updatedCount = 0;
  let clonedCount = 0;

  // Process each repo
  for (const repo of repos) {
    // Skip repos with no URL
    if (!repo.config.repoUrl) {
      logger(`Skipping ${repo.path.join("/")} - No repository URL provided`);
      continue;
    }

    if (!repoExists(repo.path)) {
      // Clone missing repo
      await cloneRepo(repo.config.repoUrl, repo.path, repo.config.branch);
      clonedCount++;
    } else {
      // Update existing repo
      await updateRepo(repo.path, repo.config.branch, force);
      updatedCount++;
    }
  }

  logger(
    `Operations complete: ${clonedCount} repositories cloned, ${updatedCount} repositories updated.`,
  );

  // Update root repository
  await updateRootRepo(force);

  closePrompt();
}
