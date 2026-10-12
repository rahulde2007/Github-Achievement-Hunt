# Contributing

Thank you for helping make GitHub Achievement Hunt more accurate, accessible, and useful. Contributions are welcome—from documentation corrections to focused improvements to the Explorer.

> [!NOTE]
> The project is a static HTML, CSS, and vanilla JavaScript site. It has no package manifest, dependency-install step, or build command.

## Contents

- [Before you begin](#before-you-begin)
- [Prerequisites](#prerequisites)
- [Set up the project](#set-up-the-project)
- [Development workflow](#development-workflow)
- [Branches and commits](#branches-and-commits)
- [Pull requests](#pull-requests)
- [Reporting an issue](#reporting-an-issue)
- [Accuracy and community standards](#accuracy-and-community-standards)

## Before you begin

- Check the [README](./README.md), existing issues, and open pull requests before starting.
- For a substantial change, open an issue first to discuss the scope and approach.
- Keep each change focused, explain its purpose, and avoid unrelated edits.
- Follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

## Prerequisites

- Git to clone the repository and create a branch.
- A modern browser to preview the site.
- Python 3 if you need a local static server.
- Node.js to run the automated tests.

No framework, package installation, or build tooling is required. The site loads its typography from Google Fonts and provides system-font fallbacks.

## Set up the project

Clone the repository and move into its directory:

```bash
git clone https://github.com/rahulde2007/Github-Achievement-Hunt.git
cd Github-Achievement-Hunt
```

From the project root, start a local server with Python 3:

```bash
python3 -m http.server 8000
```

On Windows, you can use the Python launcher:

```powershell
py -m http.server 8000
```

Then open <http://localhost:8000>. Alternatively, use an editor's static-site preview server. Do not open `index.html` directly as a `file:` URL: serving the page over HTTP ensures browser ES modules load correctly.

Run the test suite from the project root:

```bash
node --test
```

The tests use Node's built-in test runner and require no package installation.

## Development workflow

1. Create a branch from the current `main` branch.
2. Make a small, focused change and preserve existing behavior unless the issue calls for a change.
3. If you modify JavaScript behavior, run `node --test`.
4. Preview the site at desktop and mobile widths. Check keyboard interaction, the achievement details dialog, and reduced-motion preferences when relevant.
5. Review your diff for unrelated changes, broken links, and accidental generated files.
6. Push your branch and open a pull request with a clear summary and verification notes.

There is no separate lint, build, or deployment command configured in the repository. Do not report one as having passed unless you add and run it as part of your proposed change.

## Branches and commits

Use a short, descriptive branch name. Suggested prefixes:

| Change | Example |
| --- | --- |
| Documentation | `docs/clarify-local-setup` |
| Bug fix | `fix/dialog-focus-return` |
| Feature | `feature/category-filter` |
| Tests | `test/achievement-guides` |

Write concise commit messages in the imperative mood. A lightweight type prefix is encouraged:

```text
docs: clarify local setup
fix: restore focus after closing dialog
test: cover achievement category filtering
```

These are project recommendations, not an automated commit-message check.

## Pull requests

Before submitting, please:

- Keep the pull request focused and explain the problem and solution.
- Link a relevant issue when one exists.
- List the checks you actually performed; include failures or untested areas.
- Include before/after screenshots for visual changes when practical, with useful alternative text.
- Call out accessibility, responsive-layout, or behavior changes that reviewers should notice.
- Confirm that no credentials, private user data, or unrelated files are included.

Open a pull request from your branch using the repository's [pull request page](https://github.com/rahulde2007/Github-Achievement-Hunt/pulls).

## Reporting an issue

Search [existing issues](https://github.com/rahulde2007/Github-Achievement-Hunt/issues) first. When opening an issue, provide the relevant details:

- A clear title and a concise description of the problem or proposed improvement.
- Steps to reproduce a bug and what you expected versus what happened.
- Browser, operating system, and screen size for a user-interface issue.
- Relevant error messages or screenshots, after removing personal or sensitive information.

For an achievement-related correction, link the official GitHub documentation and distinguish a documented requirement from an assumption or commonly associated activity. Do not report an achievement as verified based on this static site.

## Accuracy and community standards

- GitHub's public documentation does not specify every achievement threshold or current eligibility rule. Do not present uncertain criteria as fact.
- Do not claim that this project checks profiles or verifies awards; it has no GitHub account integration.
- Never encourage spam, fabricated contributions or co-authorship, or bypassing required reviews and repository safeguards.
- Credit contributors accurately and respect the project's [Code of Conduct](./CODE_OF_CONDUCT.md).
