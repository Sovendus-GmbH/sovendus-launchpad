export interface SovendusLaunchpadFolder {
  [folder: string]: SovendusLaunchpadPackage | SovendusLaunchpadFolder;
}

export interface SovendusLaunchpadPackage {
  branch: string;
  repoUrl: string;
}

export interface SovendusLaunchpadConfig {
  packages: SovendusLaunchpadFolder;
}
