import type { BuildConfig } from "sovendus-builder";

const buildConfig: BuildConfig = {
  foldersToClean: ["dist"],
  filesToCompile: [
    {
      input: "src/scripts/launchpad.ts",
      output: "dist/launchpad",
      options: {
        type: "vanilla",
        packageConfig: {
          dtsEntryRoot: "src",
          dtsInclude: ["src/**/*"],
          isPackage: true,
        },
        modulesToExternalize: [
          "inquirer",
          "chalk",
          "vite",
          "simple-git",
          "spawn",
        ],
      },
    },
    {
      input: "src/scripts/update-all.ts",
      output: "dist/index",
      options: {
        type: "vanilla",
        packageConfig: {
          dtsEntryRoot: "src",
          dtsInclude: ["src/**/*"],
          isPackage: true,
        },
        modulesToExternalize: [
          "inquirer",
          "chalk",
          "vite",
          "simple-git",
          "spawn",
        ],
      },
    },
  ],
};

export default buildConfig;
