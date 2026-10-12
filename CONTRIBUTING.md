# Contributing

Thank you for helping make GitHub Achievement Hunt a useful, accurate, and accessible guide.

## Before you contribute

- Check the existing README and project guidance before proposing duplicate content.
- Open an issue to discuss larger changes before investing in implementation.
- Keep contributions focused and explain the reason for each change.
- Follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

## Accuracy matters

- Link to relevant official GitHub documentation when describing requirements or product behavior.
- Clearly distinguish documented requirements from general advice and unverified information.
- Do not promise that an achievement is guaranteed, currently earnable, or awarded to a person without verification.
- Do not encourage spam, misleading activity, or fabricated contributions.

## Working on the site

The site is a static project built with HTML, CSS, and vanilla JavaScript. It does not require a package manager or build step.

1. Create a branch for your change.
2. Make the smallest focused change that solves the problem.
3. Preview the page using a static file server, such as VS Code Live Preview. For example, if Python is already available, run `py -m http.server 8000` from the project root and open `http://localhost:8000`.
4. Check the page at desktop and mobile widths, try keyboard navigation, and respect reduced-motion settings.
5. Describe what changed and how you checked it when opening a pull request.

Keep JavaScript modules small and scoped to their responsibilities. Do not add frameworks, dependencies, automated achievement claims, or sensitive data storage.
