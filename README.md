# Play Poker Odds monorepo

This is the repository for every service that relates to https://playpokerodds.com.

# App Structure

Code of this repo is found inside the `src` folder. This folder includes the following services:

- UI folder - Angular front end of the app
- web-api folder - The web api of the app, written in Express & Typescript
- core folder - This repo contains all the domain types + the business logic for core functional operations. This package is publised under `@moby-it/poker-core` on the npm registry.
- calc-odds-api - Contains a solution that currently only contains the `calculateWinningOdds` operation which is the most critical operation **and the most cpu expensive**. This is why it's deployed seperately, even if it's a single endpoint.
# How To Run

- Make sure you have [docker installed](https://docs.docker.com/desktop/) 
- This project you need access to a private npm registry. Ask the org admin for an npm token that reads from this registry.
- Run `run.sh` script.
