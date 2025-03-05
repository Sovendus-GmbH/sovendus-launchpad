# Sovendus Launchpad

A tool for managing multiple sub repositories in a single repository without using git submodules.

## Table of Contents

- [Setup](#setup)
- [Available Commands](#available-options)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Setup

```bash
npm install sovendus-launchpad
```

## Add to your package.json

```json
{
  "scripts": {
    "pad": "sovendus-launchpad"
  }
}
```

## Available Options

### Clone Missing Repositories

Clones any repositories defined in the config that don't exist locally

### Update All Repositories

Updates all repositories (clone missing ones, pull latest changes for existing ones)

## Configuration

Repositories are defined in `sov_launchpad.config.ts`. Each repository entry needs:

- `branch`: The branch to clone/pull
- `repoUrl`: The URL of the git repository

The root repository (sovendus-launchpad itself) will also be updated when running these commands.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue to discuss improvements or bugs.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
