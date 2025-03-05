import { exec } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { promisify } from "node:util";

import type {
  SovendusLaunchpadConfig,
  SovendusLaunchpadFolder,
  SovendusLaunchpadPackage,
} from "../types/types.js";
import { logger, loggerError } from "./logger.js";

const execAsync = promisify(exec);

// Create readline interface for user prompts
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

// Recursively process the config to extract all repository entries
export function extractRepos(
  obj: SovendusLaunchpadPackage | SovendusLaunchpadFolder,
  currentPath: string[] = [],
): { path: string[]; config: SovendusLaunchpadPackage }[] {
  if ("branch" in obj && "repoUrl" in obj) {
    // This is a package
    return [
      { path: [...currentPath], config: obj as SovendusLaunchpadPackage },
    ];
  } else {
    // This is a folder
    let results: { path: string[]; config: SovendusLaunchpadPackage }[] = [];
    for (const [key, value] of Object.entries(obj)) {
      results = [...results, ...extractRepos(value, [...currentPath, key])];
    }
    return results;
  }
}

// Get all repositories from config
export function getAllRepos(config: SovendusLaunchpadConfig): {
  config: SovendusLaunchpadPackage;
  path: string[];
}[] {
  let repos: { path: string[]; config: SovendusLaunchpadPackage }[] = [];
  for (const [key, value] of Object.entries(config.packages)) {
    repos = [...repos, ...extractRepos(value, [key])];
  }

  return repos;
}

// Check if repository exists locally
export function repoExists(repoPath: string[]): boolean {
  const folderPath = path.join(process.cwd(), ...repoPath);
  return (
    fs.existsSync(folderPath) && fs.existsSync(path.join(folderPath, ".git"))
  );
}

// Clone a repository
export async function cloneRepo(
  repoUrl: string,
  repoPath: string[],
  branch: string,
): Promise<void> {
  if (!repoUrl) {
    logger(`Skipping ${repoPath.join("/")} - No repository URL provided`);
    return;
  }

  const folderPath = path.join(process.cwd(), ...repoPath);

  // Create parent directories if they don't exist
  const parentDir = path.dirname(folderPath);
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
  }

  try {
    logger(`Cloning ${repoUrl} into ${folderPath}...`);
    await execAsync(`git clone -b ${branch} ${repoUrl} ${folderPath}`);
    logger(`Successfully cloned ${repoPath.join("/")}`);
  } catch (error) {
    loggerError(`Failed to clone ${repoPath.join("/")}:`, error);
  }
}

// Update a repository (stash, pull, pop stash)
export async function updateRepo(
  repoPath: string[],
  branch: string,
  force: boolean = false,
): Promise<void> {
  const folderPath = path.join(process.cwd(), ...repoPath);

  try {
    // Check for local changes
    const { stdout: statusOutput } = await execAsync("git status --porcelain", {
      cwd: folderPath,
    });
    const hasChanges = statusOutput.trim() !== "";

    if (hasChanges && !force) {
      const answer = await prompt(
        `Repository ${repoPath.join("/")} has local changes. Stash them before pulling? (y/n): `,
      );
      if (answer.toLowerCase() !== "y") {
        logger(`Skipping ${repoPath.join("/")}`);
        return;
      }
    }

    if (hasChanges) {
      logger(`Stashing changes in ${repoPath.join("/")}...`);
      await execAsync("git stash", { cwd: folderPath });
    }

    logger(`Pulling latest changes for ${repoPath.join("/")}...`);
    await execAsync(`git checkout ${branch} && git pull`, { cwd: folderPath });

    if (hasChanges) {
      logger(`Popping stashed changes in ${repoPath.join("/")}...`);
      await execAsync("git stash pop", { cwd: folderPath });
    }

    logger(`Successfully updated ${repoPath.join("/")}`);
  } catch (error) {
    loggerError(`Failed to update ${repoPath.join("/")}:`, error);
  }
}

// Update the root repository (the sovendus-launchpad itself)
export async function updateRootRepo(force: boolean = false): Promise<void> {
  const rootPath = process.cwd();

  try {
    // Check for local changes
    const { stdout: statusOutput } = await execAsync("git status --porcelain", {
      cwd: rootPath,
    });
    const hasChanges = statusOutput.trim() !== "";

    if (hasChanges && !force) {
      const answer = await prompt(
        "Root repository has local changes. Stash them before pulling? (y/n): ",
      );
      if (answer.toLowerCase() !== "y") {
        logger("Skipping root repository update");
        return;
      }
    }

    if (hasChanges) {
      logger("Stashing changes in root repository...");
      await execAsync("git stash", { cwd: rootPath });
    }

    logger("Pulling latest changes for root repository...");
    await execAsync("git pull", { cwd: rootPath });

    if (hasChanges) {
      logger("Popping stashed changes in root repository...");
      await execAsync("git stash pop", { cwd: rootPath });
    }

    logger("Successfully updated root repository");
  } catch (error) {
    loggerError(`Failed to update root repository:`, error);
  }
}

// Close readline interface
export function closePrompt(): void {
  rl.close();
}
