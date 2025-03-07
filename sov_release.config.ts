import type { ReleaseConfig } from "sovendus-release-tool";

const releaseConfig: ReleaseConfig = {
  packages: [
    {
      directory: "./",
      version: "1.1.0",
      release: true,
      lintAndBuild: true,
      test: false,
      updateDeps: true,
      releaseOptions: {
        foldersToScanAndBumpThisPackage: [
          // scan the whole dev env folder
          { folder: "../" },
        ],
      },
    },
  ],
};
export default releaseConfig;
