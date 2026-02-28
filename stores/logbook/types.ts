export type LogbookEntryType = "system" | "assistant" | "robot" | "user";

export interface LogbookEntry {
  id: string;
  type: LogbookEntryType;
  title?: string;
  content: string;
  timestamp: number;
}