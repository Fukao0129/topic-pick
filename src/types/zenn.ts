export type ZennFeedItem = {
  title: string;
  link: string;
  guid: string;
  contentSnippet: string;
};

export type ZennFeed = {
  items: ZennFeedItem[];
};
