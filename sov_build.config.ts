import type { BuildConfig } from "sovendus-builder";

const buildConfig: BuildConfig = {
  foldersToClean: ["dist"],
  filesToCompile: [
    {
      input: "src/scripts/launchpad.ts",
      output: "dist/launchpad",
      options: {
        type: "vanilla",
        isPackage: true,
        modulesToExternalize: ["inquirer", "vite"],
      },
    },
    {
      input: "src/scripts/update-all.ts",
      output: "dist/index",
      options: {
        type: "vanilla",
        isPackage: true,
        modulesToExternalize: ["inquirer", "vite"],
      },
    },
  ],
};

export default buildConfig;
