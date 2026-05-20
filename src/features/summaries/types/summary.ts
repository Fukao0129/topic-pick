export type Summary = {
  id: number;
  originalID: string;
  mainText: string;
  url: string;
  favorite: boolean;
  createdAt: Date;
  userId: string;
  topicId: number;
  sourceId: number;
  topic: {
    id: number;
    name: string;
  };
};

export type GroupedSummary = {
  topic: {
    id: number;
    name: string;
  };
  summaries: Summary[];
};
