# Personal-Portfoliowebsite

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Security before publishing

- Keep local values in `.env.local` (or another ignored `.env.*` file); `.env.example` is safe to commit only when it contains placeholders.
- Never put passwords, private keys, or server-only API secrets in frontend code or `VITE_*` variables. Vite embeds `VITE_*` values in the public browser bundle.
- Run `npm run security:check` before pushing. GitHub Actions runs the same dependency audit and secret scan on pushes and pull requests.
- Enable GitHub secret scanning and push protection in the repository's **Settings → Code security and analysis** when available. Require the security workflow to pass before merging.
- Review `git status` and the staged diff before committing. Ignore rules do not untrack files already committed; remove sensitive files from Git and rotate any exposed credentials immediately.
- This app stores portfolio data in the browser's localStorage. Do not commit exported portfolios or real user data; deploying the site does not make that browser data private from the person using that browser.
