# my-news

This project was created based on [Vue3/Vite](https://vuejs.org/guide/quick-start.html#with-build-tools) Quick Start template.


## News API Setup

- Open [News API](https://newsapi.org/docs) and get a Development API Key to run locally.
  - Create a env file and set your API Key
    ```sh
    cp .env.example .env

    # .env
    # VITE_NEWS_API_KEY=<YOUR_NEWS_API_KEY>
    ``` 


## Project Setup with docker

Start docker-compose containers

```sh
docker-compose up
```

<!-- If you are using docker [start here](#get-a-dataset). -->
<!-- This template should help get you started developing with Vue 3 in Vite. -->
<!-- ## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration
See [Vite Configuration Reference](https://vitejs.dev/config/). -->

## Project Setup with npm



```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
