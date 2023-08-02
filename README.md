# Connex One Tech Test

## Intro

This monorepo is split into two folders which are explained below.

### Requirements

Tested on Node v18.17.0

## Backend

The `/backend` folder contains the Express backend that should be run first.

To run the backend run `npm run start` for the normal production build or `npm run start:dev` for the dev mode with nodemon and automatic reloading on file changes.

The default port for the backend is `8000` and can be accessed on http://localhost:8000 once launched.

There are also tests set up that can be run using `npm run test`

The backend server must be live before running any tests.

## Frontend

The `/frontend` folder contains the React frontend that should be run after the backend has started.

To run the frontend, in the folder run `npm run start`

The default port for the frontend is `3000` and can be accessed on http://localhost:3000 once launched.

There are also tests set up that can be run using `npm run test`