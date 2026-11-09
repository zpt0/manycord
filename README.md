# Manycord

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vencord](https://img.shields.io/badge/Vencord-Custom_Plugin-purple.svg)](https://vencord.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A Vencord plugin that removes or customizes the default five-account limit in Discord's built-in account switcher.

## Features

- Removes the hardcoded 5-account restriction from the Discord client.
- Allows users to configure a custom maximum account count.
- Setting the limit to `0` enables an unlimited number of accounts.
- Preserves Discord's native account-switching functionality and session persistence.
- Requires no additional runtime services or external dependencies.
- Does not access, collect, or transmit Discord tokens or credentials.

## Installation

This is a custom userplugin and is not included in the official Vencord build. You must build Vencord from source.

1. Clone this repository into `Vencord/src/userplugins/manycord`:

    ```bash
    cd path/to/Vencord/src/userplugins
    git clone https://github.com/zpt0/manycord.git
    ```

2. Rebuild Vencord with `pnpm build` (or your equivalent build command).
3. Restart Discord and enable **Manycord** in `Settings > Vencord > Plugins`.

## Settings

| Setting          | Description                                                | Default |
| :--------------- | :--------------------------------------------------------- | :------ |
| **Max Accounts** | Number of accounts that can be added, or `0` for no limit. | `0`     |

## Disclaimer

This plugin only modifies Discord's internal account count checks. It does not manage accounts, automate actions, or collect user data. Use at your own risk.

## License

Distributed under the MIT License. See `LICENSE` for more information.
