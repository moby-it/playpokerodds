# Play Poker Odds monorepo

This is the repository for every service that relates to https://playpokerodds.com.

# App Structure

Code of this repo is found inside the `src` folder. This folder includes the following services:

- UI folder - Angular front end of the app
- web-api folder - The web api of the app, written in Express & Typescript
- core folder - This repo contains all the domain types + the business logic for core functional operations. This package is publised under `@moby-it/ppo-core` on the npm registry.
- calc-odds-api - Contains a solution that currently only contains the `calculateWinningOdds` operation which is the most critical operation **and the most cpu expensive**. This is why it's deployed seperately, even if it's a single endpoint.
- calc-odds-api-serverless - Contains a port of the above service to a Azure Function Serverless Api. This was done to investigate potential performance gains.

# How To Run

Simply build the docker compose file found in the root of the repo. 

**Steps:**
- Make sure you have docker installed.
- Run "docker compsose build"
- Run "docker compose up"
