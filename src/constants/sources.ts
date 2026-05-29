export const SOURCES = {
  HACKER_NEWS: {
    ID: 1,
    NAME: "Hacker News",
    API_URL: "https://hn.algolia.com/api/v1", // https://hn.algolia.com/api
  },
  QIITA: {
    ID: 2,
    NAME: "Qiita",
    API_URL: "https://qiita.com/api/v2", // https://qiita.com/api/v2/docs
  },
  ZENN: {
    ID: 3,
    NAME: "Zenn RSS",
    RSS_URL: "https://zenn.dev/topics",
  },
} as const;
