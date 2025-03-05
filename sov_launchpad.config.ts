interface Package {
  name: string;
  gitUrl: string;
  branch?: string;
  path?: string;
}

export interface LaunchpadConfig {
  packages: Package[];
  rootDir?: string;
}

const config: LaunchpadConfig = {
  // Optional: Specify a custom root directory where repositories should be cloned
  // rootDir: './repos',

  // Define the packages/repositories to be managed
  packages: [
    {
      name: "example-repo",
      gitUrl: "https://github.com/sovendus/example-repo.git",
      branch: "main", // Optional: specify a default branch
      path: "./repos/example-repo", // Optional: specify a custom path
    },
    // Add more repositories as needed
  ],
};

export default config;
