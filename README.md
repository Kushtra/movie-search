# Movie Search

## Dependencies
- node (>= 16.16.0)
- npm (>= 8.11.0)
- postgres (>= 9.4) || docker (>= 18.09)


## Installation
### Setup
- Run `yarn install`
- Run postgres and create database or start the dockerized version with `yarn run db:start`
- Copy example environment file `cp .env.example .env` and fill out *.env* file

### Extras
- For initial database setup run `npx mikro-orm schema:create -r`
- When changes (added/updated/removed) are made to _entity_ files update database by running `npx mikro-orm schema:update -r`

## Launch
### Development environment
- Server: `yarn run server:dev`
- Client: `yarn run client:dev`
