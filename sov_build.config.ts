import type { BuildConfig } from "sovendus-builder";

const buildConfig: BuildConfig = {
  foldersToClean: ["dist"],
  filesToCompile: [
    {
      sovOptions: {
        input: "src/scripts/launchpad.ts",
        output: "dist/launchpad",
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
      sovOptions: {
        input: "src/scripts/update-all.ts",
        output: "dist/index",
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
