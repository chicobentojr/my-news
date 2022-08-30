// Disclaimer:
// Since News API is not free to custom domains,
// it is used other custom API that simulate News API entities in GitHub demo.
// Open https://github.com/chicobentojr/my-news to run project locally
export const NEWS_API_HOST =
  import.meta.env.VITE_NEWS_API_HOST ||
  "https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json";

export const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || "";
