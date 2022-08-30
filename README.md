# my-news

[![Build and Deploy](https://github.com/chicobentojr/my-news/actions/workflows/gh-pages-deploy.yml/badge.svg)](https://github.com/chicobentojr/my-news/actions/workflows/gh-pages-deploy.yml)
[![testing](https://github.com/chicobentojr/my-news/actions/workflows/testing.yml/badge.svg)](https://github.com/chicobentojr/my-news/actions/workflows/testing.yml)
[![ESLint](https://github.com/chicobentojr/my-news/actions/workflows/lint.yml/badge.svg)](https://github.com/chicobentojr/my-news/actions/workflows/lint.yml)


This project was created based on [Vue3/Vite](https://vuejs.org/guide/quick-start.html#with-build-tools) Quick Start template.

## Live Demo

- Install [CORS Unblock](https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino) to fetch the news.
- Open [demo here](https://chicobento.dev/my-news/)


## News API Setup

- Open [News API](https://newsapi.org/docs) and get a Development API Key to run locally.
  - Create a env file and set your API Key
    ```sh
    cp .env.example .env

    # .env
    # VITE_NEWS_API_KEY=<YOUR_NEWS_API_KEY>
    ``` 

## Install packages

```sh
npm install
```
## Running project with docker

Start docker-compose containers

```sh
docker-compose up
```

Open http://localhost:4000 
## Running project with npm

Compile and Hot-Reload for Development

```sh
npm run dev
```

Open http://localhost:4000 

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Testing with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
