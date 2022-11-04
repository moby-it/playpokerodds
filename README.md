# Play Poker Odds monorepo

This is the repository for every service that relates to https://playpokerodds.com.

# App Structure

Code of this repo is found inside the `src` folder. This folder includes the following services:

- UI folder - Angular front end of the app
- web-api folder - The web api of the app, written in Express & Typescript
- core folder - This repo contains all the domain types + the business logic for core functional operations. This package is publised under `@moby-it/ppo-core` on the npm registry.
- calc-odds-api folder - Contains a solution that currently only contains the `calculateWinningOdds` operation which is the most critical operation of the api. It is deployed seperately on an Azure Function App Service environment.

# How To Run

Simply build the docker compose file found in the root of the repo. 

**Steps:**
- Make sure you have docker installed.
- **Change the authLevel of the calcOdds Endpoint in the calc-odds-api solution from `function` to `anonymous`.**. You should be able to change that on path `/src/calc-odds-api/calcOdds/function.json`.
- Make sure you are at the root level of the repo and run `docker compose build` to build every project of the solution.
- At the same directory level as above, run `docker compose up` to attach your terminal to the docker process. If you need to run it detached, you can run `docker compose up -d`. You can stop every service by running `docker compose down`

