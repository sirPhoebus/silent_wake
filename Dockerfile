FROM node:24-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY angular.json tsconfig.json tsconfig.app.json ./
COPY public ./public
COPY src ./src
COPY tests ./tests
COPY lib ./lib
COPY scripts ./scripts
COPY server.js scenario_1.json short_scenario.json ./

ENV NG_CLI_ANALYTICS=false
RUN npm run build

FROM node:24-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY lib ./lib
COPY public ./public
COPY scripts ./scripts
COPY server.js scenario_1.json short_scenario.json ./
COPY --from=build /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=3000
ENV DEFAULT_SCENARIO_FILE=short_scenario.json

EXPOSE 3000

CMD ["npm", "start"]
