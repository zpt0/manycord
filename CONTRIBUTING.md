# Contributing to Manycord

## Development Setup

1. Clone the repository into `Vencord/src/userplugins/manycord`:

    ```bash
    cd path/to/Vencord/src/userplugins
    git clone https://github.com/zpt0/manycord.git
    ```

2. Generate a local TypeScript config (gitignored, because it overrides Vencord's module resolution and breaks `pnpm build`):

    ```bash
    cd manycord
    cp tsconfig.template.json tsconfig.json
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Rebuild Vencord with `pnpm build` and restart Discord to test changes.

> **Important:** Do NOT commit `tsconfig.json`. It exists only for standalone typechecking and would break the Vencord build.

## Scripts

| Command                | What it does                    |
| ---------------------- | ------------------------------- |
| `npm run typecheck`    | Type-check without emitting     |
| `npm run lint`         | Check for lint errors           |
| `npm run lint:fix`     | Auto-fix lint errors            |
| `npm run format`       | Auto-format with Prettier       |
| `npm run format:check` | Check formatting                |
| `npm run check`        | Typecheck + lint + format check |

## Pull Request Process

1. Fork the repository and create a feature branch (`git checkout -b feature/foo-bar`).
2. Make your changes to `index.ts`.
3. Run `npm run check` and verify the Vencord build compiles.
4. Test the plugin in Discord.
5. Submit a pull request with a clear description.

## Code of Conduct

Please read and follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Security Reporting

If you discover a security issue, please report it responsibly via the [Security](SECURITY.md) channel.
