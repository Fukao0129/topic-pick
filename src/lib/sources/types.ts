export type SummaryInput = {
  originalID: string;
  mainText: string;
  url: string;
  userId: string;
  topicId: number;
  sourceId: number;
};

export type SourceFetcher = (
  topic: { id: number; name: string },
  userId: string,
) => Promise<SummaryInput[]>;
