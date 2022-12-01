This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [tailwindcss](https://tailwindcss.com/).

## Local dev

1. Copy and rename `.env.example` to `.env`
2. Fill the `.env` file with appropriate values
3. Run `npm run dev`

Since the frontend depends on multiple api services, to make the standalone frontend dev easier and not run into CORS issues we can communicate with the currently deployed api services by:

1. Install https://www.npmjs.com/package/local-cors-proxy
2. Make sure `START_PROXY_CMD` env variable in .env file is as needed
3. For required api root env variable in the `.env` file append '/proxy' to the end; for eg `NEXT_PUBLIC_PUBLIC_API_ROOT=http://127.0.0.1:8001/proxy`
4. Run `npm run startproxy`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

Each page will be contained within its own folder. This page folder will usually contain a `<pagename>.page.tsx`(view), `<pagename>.vm.tsx`(view model) and a `components` folder for all the page specific components (the root `components` folder would only contain components that are used across the web app. This is roughly based on the MVVM(Model View View Model) architecture. We aim to have `<pagename>.page.tsx` containing only the UI as much as possible separated from the business logic and `<pagename>.vm.tsx` would contain all the business logic.

### Folder structure

The general folder structure remains same as the default nextjs folder structure.

- `/components`: all the global components used throughout the webapp
- `/common`: common utilities
- `/store`: redux store
- `/models`: js classes which represents the json data the frontend recieves via the apis; the `vm` would usually parse the json from the api to a model instance
- `/services`: services eg Authentication service which handles authentication related functionality

### Naming convention

- filenames are camel_cased

## Code Formating

- Eslint (not sure, but I believe eslint and its code formatting rules comes as part of the default nextjs installation; and I use the vscode `ctrl+shift+i` command to format the code; I also have eslint plugin installed on my vscode; will update this section).

## Deployment/CICD

The project is deployed using google cloud run(containerized deployments). We have gitlab CICD setup so that every commit pushed results in a new docker image build which is deployed.

## Tests

1. Use appropriate values for env variables defined on `.env` file for testing
2. Run a specific test file by `npx playwright test tests/pages/datasets/like_dataset.spec.ts --project=chromium --headed`


### For user-vocabulary-generator
`npx playwright test tests/pages/user-vocabulary-generator/submit.spec.ts --project=chromium --headed`
