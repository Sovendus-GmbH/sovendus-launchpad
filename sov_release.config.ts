import type { ReleaseConfig } from "sovendus-release-tool";

const releaseConfig: ReleaseConfig = {
  packages: [
    {
      directory: "./",
      lint: true,
      build: true,
      test: false,
      updateDeps: true,
      release: {
        version: "1.1.5",
        foldersToScanAndBumpThisPackage: [
          // scan the whole dev env folder
          { folder: "../../" },
        ],
      },
    },
  ],
};
export default releaseConfig;
