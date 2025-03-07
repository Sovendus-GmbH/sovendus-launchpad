/* eslint-disable no-console */
import { exec } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";

import chalk from "chalk";
import inquirer from "inquirer";

import type {
  SovendusLaunchpadConfig,
  SovendusLaunchpadFolder,
} from "../types/types.js";
import { logger, loggerError } from "../utils/logger.js";
import { cloneRepo } from "../utils/repo-utils.js";

const execAsync = promisify(exec);

/**
 * Opens a folder in VS Code
 * @param folderPath The path to open in VS Code
 * @returns Promise that resolves when the VS Code command completes
 */
async function openInVSCode(folderPath: string): Promise<void> {
  try {
    logger(`Opening ${folderPath} in VS Code...`);
    await execAsync(`code "${folderPath}"`);
    logger("VS Code opened successfully ✅");
  } catch (error) {
    loggerError("Failed to open VS Code:", error);
    throw new Error(
      "Failed to open VS Code. Is it installed and in your PATH?",
    );
  }
}

type NavigationItem = {
  name: string;
  value: string;
  short?: string;
  // Remove the "type" property from here
} & {
  // Add a custom property that doesn't conflict with inquirer
  itemType: "folder" | "package" | "action";
};

/**
 * Clears the terminal screen
 */
function clearScreen(): void {
  process.stdout.write("\x1Bc");
}

/**
 * Creates a decorated path string
 */
function formatPath(pathSegments: string[]): string {
  if (pathSegments.length === 0) {
    return "/";
  }
  return `/${pathSegments.join("/")}`;
}

/**
 * Renders a boxed header with gradient effect
 */
function renderHeader(title: string): void {
  const width = 70;
  const padding = Math.floor((width - title.length) / 2);
  const line = "━".repeat(width);

  console.log("\n");
  console.log(chalk.blue(line));
  console.log(chalk.blue("┃") + " ".repeat(width) + chalk.blue("┃"));
  console.log(
    chalk.blue("┃") +
      " ".repeat(padding) +
      chalk.bold.white(title) +
      " ".repeat(padding + (title.length % 2 === 0 ? 0 : 1)) +
      chalk.blue("┃"),
  );
  console.log(chalk.blue("┃") + " ".repeat(width) + chalk.blue("┃"));
  console.log(chalk.blue(line));
}

/**
 * Renders a section divider with title
 */
function renderSection(
  title: string,
  color: "blue" | "green" | "magenta" = "blue",
): string {
  const width = 66;
  const colorFn = chalk[color];
  const prefix = "┈┈┈┈ ";
  const suffix = " ";
  const remaining = width - prefix.length - title.length - suffix.length;

  return (
    colorFn(prefix) +
    chalk.bold[color](title) +
    colorFn(suffix + "┈".repeat(remaining))
  );
}

/**
 * Navigate through directories defined in the config and optionally open in VS Code
 */
export async function navigateFolders(
  rootDir: string,
  config: SovendusLaunchpadConfig,
): Promise<void> {
  try {
    // Use the config's directory as the root directory instead of process.cwd()
    let currentFolder: SovendusLaunchpadFolder = config.packages;
    let currentPath: string[] = []; // Track the path inside the config structure
    let navigating = true;

    while (navigating) {
      // Clear screen for better UI experience
      clearScreen();

      // Render main app header
      renderHeader("🚀 Sovendus Launchpad");

      // Display current path with styling
      const pathString = formatPath(currentPath);
      console.log(
        `\n${chalk.dim(
          "Current location: ",
        )}${chalk.green.bold(`📂 ${pathString}`)}`,
      );
      console.log(`${chalk.dim("─".repeat(70))}\n`);

      // Prepare choices
      const choices: Array<
        NavigationItem | InstanceType<typeof inquirer.Separator>
      > = [];

      // Add actions section
      choices.push(new inquirer.Separator(renderSection("ACTIONS", "green")));
      choices.push(new inquirer.Separator());

      choices.push({
        name: `${chalk.yellow("🚪 ")}Exit navigation`,
        value: "exit",
        itemType: "action",
        short: "Exit",
      });

      // Add "back" option if we're not at the root
      if (currentPath.length > 0) {
        choices.push({
          name: `${chalk.yellow("⬆️ ")}Go back to parent folder`,
          value: "back",
          itemType: "action",
          short: "Back",
        });
      }

      // Add "open in VS Code" option
      choices.push({
        name: `${chalk.yellow("💻 ")}Open current directory in VS Code`,
        value: "open-vscode",
        itemType: "action",
        short: "Open in VS Code",
      });

      choices.push(new inquirer.Separator("\n"));

      // Add directories & packages section
      choices.push(
        new inquirer.Separator(
          renderSection("DIRECTORIES & PACKAGES", "magenta"),
        ),
      );
      choices.push(new inquirer.Separator());

      // Filter and sort entries - folders first, then packages
      const folderEntries = Object.entries(currentFolder)
        .filter(
          ([_, item]) =>
            item && typeof item === "object" && !("branch" in item),
        )
        .sort(([a], [b]) => a.localeCompare(b));

      const packageEntries = Object.entries(currentFolder)
        .filter(
          ([_, item]) =>
            item &&
            typeof item === "object" &&
            "branch" in item &&
            "repoUrl" in item,
        )
        .sort(([a], [b]) => a.localeCompare(b));

      // Add folders with icons and description
      if (folderEntries.length > 0) {
        folderEntries.forEach(([name, _]) => {
          choices.push({
            name: chalk.cyan("📁 ") + name + chalk.dim(" [Directory]"),
            value: name,
            itemType: "folder",
            short: name,
          });
        });
      }

      // Add packages with icons and description
      if (packageEntries.length > 0) {
        packageEntries.forEach(([name, item]) => {
          const packageInfo = item as { branch: string; repoUrl: string };
          choices.push({
            name:
              chalk.magenta("📦 ") +
              name +
              chalk.dim(` [${packageInfo.branch}]`),
            value: name,
            itemType: "package",
            short: name,
          });
        });
      }

      // If no folders or packages, show a message
      if (folderEntries.length === 0 && packageEntries.length === 0) {
        choices.push(
          new inquirer.Separator(
            `  ${chalk.dim("📭 No directories or packages in this location")}`,
          ),
        );
      }

      // Get current physical path
      const physicalPath = path.join(rootDir, ...currentPath);

      // Prompt user to select an option with styled message
      const { selection } = await inquirer.prompt<{ selection: string }>({
        type: "list",
        name: "selection",
        message: chalk.blue("What would you like to do?"),
        choices: choices,
        pageSize: Math.min(25, process.stdout.rows - 10), // Reasonable size that fits well
        loop: true,
      });

      // Handle selection
      switch (selection) {
        case "exit":
          navigating = false;
          break;
        case "back": {
          if (currentPath.length > 0) {
            currentPath.pop();
            // Reset current folder to root and then navigate to current path
            currentFolder = config.packages;
            for (const segment of currentPath) {
              currentFolder = currentFolder[segment] as SovendusLaunchpadFolder;
            }
          }
          break;
        }
        case "open-vscode": {
          // Check if the directory actually exists before opening
          if (fs.existsSync(physicalPath)) {
            await openInVSCode(physicalPath);
          } else {
            console.log("\n");
            console.log(
              chalk.yellow(`⚠️  Directory does not exist: ${physicalPath}`),
            );
            const { createDir } = await inquirer.prompt([
              {
                type: "confirm",
                name: "createDir",
                message: "Would you like to create this directory?",
                default: false,
              },
            ]);

            if (createDir) {
              // Simply create the directory as we have no repo info here
              fs.mkdirSync(physicalPath, { recursive: true });
              logger(chalk.green(`✅ Created directory: ${physicalPath}`));
              await openInVSCode(physicalPath);
            }
          }
          break;
        }
        default: {
          const selectedItem = currentFolder[selection];
          // Check if it's a folder or package
          if (selectedItem && typeof selectedItem === "object") {
            if ("branch" in selectedItem && "repoUrl" in selectedItem) {
              // It's a package
              const packagePath = path.join(physicalPath, selection);
              if (fs.existsSync(packagePath)) {
                await openInVSCode(packagePath);
              } else {
                console.log("\n");
                console.log(
                  `⚠️  Package directory does not exist: ${packagePath}`,
                );
                const { shouldCloneRepo } = await inquirer.prompt([
                  {
                    type: "confirm",
                    name: "shouldCloneRepo",
                    message: "Would you like to clone this repository?",
                    default: true,
                  },
                ]);

                if (shouldCloneRepo) {
                  // Use the correct parameters from the selected package info
                  await cloneRepo(
                    selectedItem.repoUrl as string,
                    packagePath,
                    selectedItem.branch as string,
                    rootDir,
                  );
                  logger(chalk.green(`✅ Repository cloned successfully`));
                  await openInVSCode(packagePath);
                }
              }
            } else {
              // It's a folder, navigate into it
              currentPath.push(selection);
              currentFolder = selectedItem;
            }
          }
          break;
        }
      }
    }
    // Clear screen when exiting
    clearScreen();
  } catch (error) {
    loggerError("Error navigating folders:", error);
    throw error;
  }
}
