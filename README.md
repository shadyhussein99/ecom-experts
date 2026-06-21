## Tech-Stack used

- React 19 (Vite)
- tailwindcss
- Zustand (for Global State Management)
- vitest (unit testing)
- husky (commit & push guards)

## Tech Features

- CI/CD pipeline to ensure unit tests succeed before merging to "main" branch and block merging if it fails
- commit message and pre-push guards to control naming conventions
- SEO optimization using react-helmet-async

## Documentation for System Architecture

https://6a381d498ad80d6d08966a31--curious-strudel-e235e1.netlify.app/

## If I have more time

- Add more unit tests (currently only added for critical logic hooks)
- Implement E2E testing

## Installation

To run the chrome extention locally, use the following commands

`git clone https://github.com/shadyhussein99/ecom-experts`

Install the dependencies

`pnpm install`

Run the application

`pnpm dev`

## To clear local storage after persisting products (frest start)

Kill the running server and run `pnpm dev` again, I added a small logic to reset the persisted products on fresh start

## Deployment Link

https://ecom-experts.netlify.app/

